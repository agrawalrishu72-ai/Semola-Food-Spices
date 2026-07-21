"use client";

import { motion } from "framer-motion";

interface CookingAnimationProps {
  state: "preparing" | "cutting" | "frying" | "stirring" | "serving";
}

export default function CookingAnimation({ state }: CookingAnimationProps) {
  // SVG drawings and animations based on state
  return (
    <div className="w-full h-48 bg-brand-red/5 border border-brand-gold/10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden p-6">
      
      {/* Background ambient circular glow */}
      <div className="absolute w-32 h-32 rounded-full bg-brand-gold/5 blur-[30px] z-0 animate-pulse-slow" />

      {/* Animation Canvas */}
      <div className="relative w-32 h-32 flex items-center justify-center z-10">
        
        {/* State: Preparing ingredients */}
        {state === "preparing" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-2"
          >
            {/* Animated floating ingredients */}
            <div className="flex gap-3 text-4xl">
              <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>🍅</motion.span>
              <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5, ease: "easeInOut" }}>🧅</motion.span>
              <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 1, ease: "easeInOut" }}>🧄</motion.span>
            </div>
            <p className="text-xs text-brand-gold font-serif uppercase tracking-widest mt-2">Preparing fresh produce</p>
          </motion.div>
        )}

        {/* State: Cutting vegetables */}
        {state === "cutting" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            {/* Knife slicing board */}
            <div className="relative w-16 h-12 flex items-center justify-center">
              <div className="w-14 h-2 bg-yellow-950/20 border border-brand-gold/30 rounded-full absolute bottom-1" />
              <motion.span 
                animate={{ rotate: [0, -20, 0], y: [0, -4, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                className="text-4xl absolute top-0 origin-bottom-right"
              >
                🔪
              </motion.span>
            </div>
            <p className="text-xs text-brand-gold font-serif uppercase tracking-widest mt-4">Slicing & Chopping</p>
          </motion.div>
        )}

        {/* State: Frying spices */}
        {state === "frying" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            {/* Pan with sparks/fire */}
            <div className="relative w-20 h-16 flex items-center justify-center">
              <span className="text-5xl">🍳</span>
              {/* Floating spice sparkles */}
              <motion.span 
                animate={{ y: [0, -15, 0], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeOut" }}
                className="absolute text-xs top-[-5px] left-4"
              >
                🌶️
              </motion.span>
              <motion.span 
                animate={{ y: [0, -15, 0], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.4, ease: "easeOut" }}
                className="absolute text-xs top-[-5px] right-4"
              >
                ✨
              </motion.span>
            </div>
            <p className="text-xs text-brand-gold font-serif uppercase tracking-widest mt-2">Roasting Semola Spices</p>
          </motion.div>
        )}

        {/* State: Stirring curry */}
        {state === "stirring" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            {/* Pot with steam */}
            <div className="relative w-20 h-16 flex items-center justify-center">
              <span className="text-5xl">🍲</span>
              {/* Steams */}
              <motion.div 
                animate={{ y: [0, -12, 0], opacity: [0.2, 0.8, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                className="absolute w-2 h-6 bg-foreground/20 rounded-full blur-[2px] top-[-10px] left-6"
              />
              <motion.div 
                animate={{ y: [0, -12, 0], opacity: [0.2, 0.8, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="absolute w-2 h-6 bg-foreground/20 rounded-full blur-[2px] top-[-10px] right-6"
              />
            </div>
            <p className="text-xs text-brand-gold font-serif uppercase tracking-widest mt-2">Simmering Dum Gravy</p>
          </motion.div>
        )}

        {/* State: Final serving */}
        {state === "serving" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-5xl animate-bounce">🍽️</span>
            <p className="text-xs text-brand-gold font-serif uppercase tracking-widest mt-2">Garnished & Served hot!</p>
          </motion.div>
        )}
        
      </div>
    </div>
  );
}
