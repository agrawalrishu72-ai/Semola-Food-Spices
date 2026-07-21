"use client";

import { useState } from "react";
import { Scale, Calculator } from "lucide-react";

// Density factors relative to grams
const converterData: Record<string, { cupGrams: number; tbspGrams: number }> = {
  ghee: { cupGrams: 220, tbspGrams: 14 },
  spices: { cupGrams: 120, tbspGrams: 8 },
  rice: { cupGrams: 180, tbspGrams: 12 },
  flour: { cupGrams: 125, tbspGrams: 8 }
};

// Nutritional values per 10g
const nutritionalData: Record<string, { calories: number; protein: number; carbs: number; fat: number }> = {
  ghee: { calories: 90, protein: 0, carbs: 0, fat: 10 },
  spices: { calories: 25, protein: 1, carbs: 4, fat: 0.5 },
  rice: { calories: 35, protein: 0.8, carbs: 7.5, fat: 0.1 },
  paneer: { calories: 28, protein: 1.8, carbs: 0.4, fat: 2.2 }
};

export default function CulinaryTools() {
  // Converter State
  const [convType, setConvType] = useState("spices");
  const [convAmount, setConvAmount] = useState(1);
  const [convUnit, setConvUnit] = useState("tbsp");

  // Calculator State
  const [calcType, setCalcType] = useState("spices");
  const [calcGrams, setCalcGrams] = useState(10);

  // Convert calculations
  const factor = converterData[convType];
  const convertedGrams = convUnit === "cup" 
    ? convAmount * factor.cupGrams 
    : convAmount * factor.tbspGrams;

  // Nutritional calculations
  const nutrFactor = calcGrams / 10;
  const itemNutr = nutritionalData[calcType];
  const calculatedNutrition = {
    calories: Math.round(itemNutr.calories * nutrFactor),
    protein: (itemNutr.protein * nutrFactor).toFixed(1),
    carbs: (itemNutr.carbs * nutrFactor).toFixed(1),
    fat: (itemNutr.fat * nutrFactor).toFixed(1)
  };

  return (
    <section className="py-24 relative z-10 border-t border-brand-border/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-brand-gold text-sm font-semibold tracking-[3px] uppercase mb-3">🛠️ Kitchen desk</p>
          <h2 className="font-serif font-bold text-4xl sm:text-5xl text-foreground mb-4">Culinary Tools Panel</h2>
          <p className="text-foreground/70 font-sans">
            Quickly convert recipe volumetric measures into weight grams, and calculate precise macronutrients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Component: Measurement Converter */}
          <div className="p-8 rounded-3xl glass-panel border border-brand-border/40 flex flex-col gap-5">
            <h4 className="font-serif font-bold text-xl text-brand-gold flex items-center gap-2">
              <Scale size={20} /> Metric Converter
            </h4>
            
            <div className="flex flex-col gap-4 text-sm text-foreground/80 mt-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">Ingredient</span>
                <select
                  value={convType}
                  onChange={(e) => setConvType(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-background border border-brand-border/40 text-foreground text-sm focus:outline-none"
                >
                  <option value="spices">Spices & Powders</option>
                  <option value="ghee">Cow Ghee</option>
                  <option value="rice">Basmati Rice</option>
                  <option value="flour">Wheat Flour</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">Amount</span>
                  <input
                    type="number"
                    value={convAmount}
                    onChange={(e) => setConvAmount(parseFloat(e.target.value) || 0)}
                    className="px-4 py-3 rounded-xl bg-background border border-brand-border/40 text-foreground text-sm focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">Volumetric Unit</span>
                  <select
                    value={convUnit}
                    onChange={(e) => setConvUnit(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-background border border-brand-border/40 text-foreground text-sm focus:outline-none"
                  >
                    <option value="tbsp">Tablespoon (tbsp)</option>
                    <option value="cup">Cup</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-brand-red/5 border border-brand-border/20 text-center font-serif text-lg">
                Equivalent Weight: <span className="font-bold text-brand-gold">{convertedGrams} Grams</span>
              </div>
            </div>
          </div>

          {/* Component: Nutrition Calculator */}
          <div className="p-8 rounded-3xl glass-panel border border-brand-border/40 flex flex-col gap-5">
            <h4 className="font-serif font-bold text-xl text-brand-gold flex items-center gap-2">
              <Calculator size={20} /> Macro Calculator
            </h4>

            <div className="flex flex-col gap-4 text-sm text-foreground/80 mt-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">Food Item</span>
                <select
                  value={calcType}
                  onChange={(e) => setCalcType(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-background border border-brand-border/40 text-foreground text-sm focus:outline-none"
                >
                  <option value="spices">Spices (Blend/Pure)</option>
                  <option value="ghee">Cow Ghee</option>
                  <option value="rice">Basmati Rice</option>
                  <option value="paneer">Paneer Cottage Cheese</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">Weight (Grams)</span>
                <input
                  type="number"
                  value={calcGrams}
                  onChange={(e) => setCalcGrams(parseFloat(e.target.value) || 0)}
                  className="px-4 py-3 rounded-xl bg-background border border-brand-border/40 text-foreground text-sm focus:outline-none"
                />
              </div>

              {/* Display Calculated Macros */}
              <div className="grid grid-cols-4 gap-3 text-center mt-3">
                <div className="p-2 rounded-lg bg-background/50 border border-brand-border/20">
                  <span className="font-bold block text-sm">{calculatedNutrition.calories}</span>
                  <span className="text-[9px] uppercase text-foreground/40 font-semibold block mt-0.5">kcal</span>
                </div>
                <div className="p-2 rounded-lg bg-background/50 border border-brand-border/20">
                  <span className="font-bold block text-sm">{calculatedNutrition.protein}g</span>
                  <span className="text-[9px] uppercase text-foreground/40 font-semibold block mt-0.5">Protein</span>
                </div>
                <div className="p-2 rounded-lg bg-background/50 border border-brand-border/20">
                  <span className="font-bold block text-sm">{calculatedNutrition.carbs}g</span>
                  <span className="text-[9px] uppercase text-foreground/40 font-semibold block mt-0.5">Carbs</span>
                </div>
                <div className="p-2 rounded-lg bg-background/50 border border-brand-border/20">
                  <span className="font-bold block text-sm">{calculatedNutrition.fat}g</span>
                  <span className="text-[9px] uppercase text-foreground/40 font-semibold block mt-0.5">Fat</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
