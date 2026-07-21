"use client";

import { useEffect, useRef, useState } from "react";
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  Settings, Pip, Subtitles 
} from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster: string;
  autoplayVisible?: boolean;
}

export default function VideoPlayer({ src, poster, autoplayVisible = true }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const controlsTimeoutRef = useRef<any>(null);

  // Intersection Observer for autoplay when visible
  useEffect(() => {
    if (!autoplayVisible || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
            setIsPlaying(true);
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
    };
  }, [autoplayVisible]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const pct = parseFloat(e.target.value);
    const duration = videoRef.current.duration;
    if (duration > 0) {
      videoRef.current.currentTime = (pct / 100) * duration;
      setProgress(pct);
    }
  };

  const handleSpeedChange = (speed: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
    setPlaybackRate(speed);
  };

  const handlePipToggle = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.error("PIP failed", err);
    }
  };

  const handleFullscreenToggle = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-brand-border/40 group z-10"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onClick={handlePlayPause}
        playsInline
        loop
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Premium Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none transition-opacity duration-300 ${
        showControls ? "opacity-100" : "opacity-0"
      }`} />

      {/* Center Big Play/Pause Button */}
      <button
        onClick={handlePlayPause}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-brand-red/90 border border-brand-gold/30 text-white flex items-center justify-center transition-all duration-300 ${
          showControls ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} className="translate-x-0.5" />}
      </button>

      {/* Video Custom Controller Bar */}
      <div className={`absolute bottom-0 left-0 w-full p-4 flex flex-col gap-3 transition-opacity duration-300 z-20 ${
        showControls ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
        {/* Progress Timeline Slider */}
        <div className="flex items-center gap-2 w-full">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-red hover:h-1.5 transition-all"
          />
        </div>

        {/* Toolbar Controls */}
        <div className="flex justify-between items-center text-white text-xs">
          <div className="flex items-center gap-4">
            {/* Play Button */}
            <button onClick={handlePlayPause} className="hover:text-brand-gold transition-colors">
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            {/* Mute Button */}
            <button onClick={handleMuteToggle} className="hover:text-brand-gold transition-colors">
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Speed Selector */}
            <div className="relative group/speed">
              <button className="hover:text-brand-gold transition-colors flex items-center gap-1">
                <Settings size={18} /> <span>{playbackRate}x</span>
              </button>
              <div className="absolute bottom-full right-0 mb-2 rounded-lg bg-black/90 border border-brand-border p-2 hidden group-hover/speed:flex flex-col gap-1.5">
                {[0.5, 1, 1.5, 2].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSpeedChange(s)}
                    className={`hover:text-brand-gold px-2.5 py-1 rounded transition-colors text-left ${
                      playbackRate === s ? "text-brand-gold font-bold" : ""
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>

            {/* Picture in Picture */}
            <button onClick={handlePipToggle} className="hover:text-brand-gold transition-colors" title="Picture in Picture">
              <Pip size={18} />
            </button>

            {/* Fullscreen */}
            <button onClick={handleFullscreenToggle} className="hover:text-brand-gold transition-colors">
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
