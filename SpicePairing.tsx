"use client";

import { useState } from "react";
import { Check, Info, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface Pairing {
  ingredient: string;
  spices: string[];
  notes: string;
  benefit: string;
  dishes: string[];
}

const pairingsData: Pairing[] = [
  {
    ingredient: "Paneer (Cottage Cheese)",
    spices: ["Garam Masala", "Turmeric Powder", "Kashmiri Mirch"],
    notes: "Creamy dairy bases require fragrant, sweet-warm masalas and low-heat coloring agents to bring out a golden visual appeal without masking the cheese texture.",
    benefit: "Enhances fat digestion and prevents post-meal heaviness.",
    dishes: ["Paneer Butter Masala", "Shahi Paneer", "Kadai Paneer"]
  },
  {
    ingredient: "Chicken & White Meats",
    spices: ["Chicken Masala", "Red Chilli Powder", "Coriander Powder"],
    notes: "Requires deep, robust aromatics like garlic-infused masala, combined with dry heat chilli powder to penetrate thick meat cuts.",
    benefit: "Proteins breakdown assistance and metabolism boost.",
    dishes: ["Chicken Tikka", "Punjabi Chicken Curry", "Tandoori Wings"]
  },
  {
    ingredient: "Lentils & Dals",
    spices: ["Turmeric Powder", "Jeera Powder", "Coriander Powder"],
    notes: "Earthy legumes require cooling coriander seed base and smoky roasted cumin seeds to balance natural heavy textures.",
    benefit: "Reduces gas, bloating, and aids legume absorption.",
    dishes: ["Dal Tadka", "Dal Makhani", "Sambar"]
  },
  {
    ingredient: "Potato & Root Veggies",
    spices: ["Kitchen King", "Jeera Powder", "Red Chilli Powder"],
    notes: "Carb-rich root vegetables pair perfectly with all-in-one curry seasonings and roasted cumin to add instant smoky, savory notes.",
    benefit: "Increases mineral uptake and enhances carbohydrate processing.",
    dishes: ["Aloo Gobhi", "Jeera Aloo", "Potato Samosa Stuffing"]
  },
  {
    ingredient: "Rice & Grains",
    spices: ["Magic Masala", "Garam Masala", "Bilona Ghee"],
    notes: "Grain plates are best enhanced with sweet-warm spices (cardamom/clove) and slow-churned ghee to coat grains and preserve fluffy individual separation.",
    benefit: "Lowers glycemic load and provides healthy fats energy.",
    dishes: ["Chicken Biryani", "Jeera Rice", "Pulao"]
  }
];

export default function SpicePairing() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activePairing = pairingsData[selectedIdx];

  return (
    <section className="py-24 relative z-10 border-t border-brand-border/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-brand-gold text-sm font-semibold tracking-[3px] uppercase mb-3">🍃 Flavor science</p>
          <h2 className="font-serif font-bold text-4xl sm:text-5xl text-foreground mb-4">Spice Pairing Guide</h2>
          <p className="text-foreground/70 font-sans">
            Understand how different base ingredients coordinate with Semola spices to produce legendary dishes and healthy digestion.
          </p>
        </div>

        {/* Dynamic Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Ingredient list */}
          <div className="flex flex-col gap-3 lg:col-span-1">
            {pairingsData.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`w-full px-6 py-4.5 rounded-2xl text-left text-sm font-semibold uppercase tracking-wider transition-all duration-300 border ${
                  selectedIdx === idx
                    ? "bg-brand-red border-brand-gold text-white"
                    : "glass-card border-brand-border/30 text-foreground/80 hover:border-brand-gold/30"
                }`}
              >
                🍳 {p.ingredient}
              </button>
            ))}
          </div>

          {/* Details Card */}
          <div className="lg:col-span-2 p-8 rounded-3xl glass-panel border border-brand-gold/30 flex flex-col gap-6 relative overflow-hidden">
            
            {/* Ambient visual badge */}
            <div className="absolute top-6 right-6 text-brand-gold opacity-20">
              <Sparkles size={36} />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold block mb-1">
                Perfect Spice Pairing
              </span>
              <h3 className="font-serif font-bold text-2xl text-foreground">
                {activePairing.ingredient}
              </h3>
            </div>

            {/* Spices tags */}
            <div className="flex flex-wrap gap-2.5 my-2">
              {activePairing.spices.map((spice, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-gold/30 text-xs font-bold text-brand-gold"
                >
                  🌶️ {spice}
                </span>
              ))}
            </div>

            {/* Science note */}
            <div className="text-sm text-foreground/80 leading-relaxed font-sans font-light">
              <h4 className="font-bold text-foreground mb-1 text-xs uppercase tracking-wider">Culinary Science Notes</h4>
              <p>{activePairing.notes}</p>
            </div>

            {/* Health benefit */}
            <div className="p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/20 flex gap-3 items-start text-xs text-brand-goldLight leading-relaxed">
              <Info size={16} className="shrink-0 mt-0.5" />
              <div>
                <strong>Digestive Benefit:</strong> {activePairing.benefit}
              </div>
            </div>

            {/* Matching dishes list */}
            <div>
              <h4 className="font-bold text-foreground mb-2 text-xs uppercase tracking-wider">Recommended Dishes</h4>
              <div className="flex flex-wrap gap-2">
                {activePairing.dishes.map((dish, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1 rounded-lg bg-background/50 border border-brand-border/40 text-xs text-foreground/75"
                  >
                    🍲 {dish}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
