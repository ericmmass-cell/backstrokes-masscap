import { useEffect, useRef, useState, useCallback } from "react";
import { PROTOCOL_V1, type Block } from "@/lib/session-protocol";

export type TimerStatus = "idle" | "running" | "paused" | "complete";

export function useSessionTimer(blocks: Block[] = PROTOCOL_V1) {
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [blockIndex, setBlockIndex] = useState(0);
  const [elapsedInBlock, setElapsedInBlock] = useState(0); // seconds within current block
  const lastTickRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const current = blocks[blockIndex];

  const tick = useCallback(
    (ts: number) => {
      if (lastTickRef.current == null) lastTickRef.current = ts;
      const delta = (ts - lastTickRef.current) / 1000;
      lastTickRef.current = ts;

      setElapsedInBlock((e) => {
        const next = e + delta;
        if (!current) return next;
        if (next >= current.durationSec) {
          // advance
          setBlockIndex((i) => {
            if (i + 1 >= blocks.length) {
              setStatus("complete");
              return i;
            }
            return i + 1;
          });
          return 0;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    },
    [blocks, current],
  );

  useEffect(() => {
    if (status === "running") {
      lastTickRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
  }, [status, tick]);

  const start = useCallback(() => setStatus("running"), []);
  const pause = useCallback(() => setStatus("paused"), []);
  const resume = useCallback(() => setStatus("running"), []);
  const skip = useCallback(() => {
    setElapsedInBlock(0);
    setBlockIndex((i) => {
      if (i + 1 >= blocks.length) {
        setStatus("complete");
        return i;
      }
      return i + 1;
    });
  }, [blocks.length]);
  const reset = useCallback(() => {
    setStatus("idle");
    setBlockIndex(0);
    setElapsedInBlock(0);
  }, []);

  const remainingInBlock = current ? Math.max(0, current.durationSec - elapsedInBlock) : 0;
  const totalDuration = blocks.reduce((s, b) => s + b.durationSec, 0);
  const totalElapsed =
    blocks.slice(0, blockIndex).reduce((s, b) => s + b.durationSec, 0) + elapsedInBlock;
  const totalRemaining = Math.max(0, totalDuration - totalElapsed);
  const progressPct = Math.min(100, (totalElapsed / totalDuration) * 100);

  return {
    status,
    current,
    blockIndex,
    blocksCount: blocks.length,
    next: blocks[blockIndex + 1],
    remainingInBlock,
    totalRemaining,
    totalElapsed,
    progressPct,
    start,
    pause,
    resume,
    skip,
    reset,
  };
}

export function fmt(sec: number): string {
  const s = Math.max(0, Math.ceil(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
