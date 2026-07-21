"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, AlertTriangle, Bell } from "lucide-react";

export default function CookingTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    let interval: any = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      playAlarm();
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };

  const setPreset = (mins: number) => {
    setIsActive(false);
    setSeconds(mins * 60);
  };

  // Play synthetic alarm tone using Web Audio API
  const playAlarm = () => {
    try {
      if (typeof window === "undefined") return;
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime); // High pitch A note
      
      // Pulse volume to sound like an alarm
      gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.5);
      
      alert("⏱️ Culinary Timer complete! Check your pot!");
    } catch {
      alert("⏱️ Culinary Timer complete! Check your pot!");
    }
  };

  const formatTime = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-6 rounded-2xl glass-panel border border-brand-border/40 flex flex-col items-center gap-4 relative overflow-hidden max-w-sm mx-auto">
      <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
        ⏱️ Culinary Timer
      </span>

      {/* Main Digital Clock */}
      <div className="font-serif font-bold text-4xl text-foreground my-2 tracking-[2px]">
        {formatTime(seconds)}
      </div>

      {/* Preset buttons */}
      <div className="flex gap-2">
        {[3, 5, 10, 15].map((m) => (
          <button
            key={m}
            onClick={() => setPreset(m)}
            className="px-3 py-1.5 rounded-lg bg-background/50 border border-brand-border/40 hover:border-brand-gold text-xs font-bold text-foreground/80 hover:text-brand-gold transition-colors"
          >
            {m} Min
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-3 mt-2">
        <button
          onClick={toggleTimer}
          disabled={seconds === 0}
          className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white disabled:opacity-30 hover:bg-brand-red/90 transition-colors"
        >
          {isActive ? <Pause size={18} /> : <Play size={18} className="translate-x-0.5" />}
        </button>
        
        <button
          onClick={resetTimer}
          className="w-10 h-10 rounded-full bg-transparent border border-brand-border flex items-center justify-center text-foreground hover:bg-white/5 transition-colors"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
}
