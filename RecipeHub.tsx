"use client";

import { useState, useEffect, useRef } from "react";
import { searchRecipes, getSearchSuggestions } from "@/utils/recipeSearch";
import { Recipe, RecommendedSpice } from "@/types/recipe";
import CookingAnimation from "./CookingAnimation";
import { 
  Search, Mic, Heart, Share2, Printer, Volume2, VolumeX, 
  Clock, Flame, Star, BookOpen, AlertCircle, ShoppingBag, X, Check 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RecipeHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  
  // Voice Read State
  const [isReading, setIsReading] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Voice Search Recognition State
  const [isListening, setIsListening] = useState(false);

  // Filters State
  const [dietFilter, setDietFilter] = useState<string | null>(null);
  const [cuisineFilter, setCuisineFilter] = useState<string | null>(null);

  useEffect(() => {
    // Load favorites from local storage
    const saved = localStorage.getItem("semola_favorite_recipes");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
    
    // Init speech synthesis
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setSuggestions(getSearchSuggestions(val));
  };

  const selectSuggestion = (val: string) => {
    setSearchQuery(val);
    setSuggestions([]);
  };

  const startVoiceSearch = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice Recognition is not supported by your browser.");
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.lang = "en-IN";
    rec.interimResults = false;

    rec.onstart = () => {
      setIsListening(true);
    };

    rec.onresult = (e: any) => {
      const resultText = e.results[0][0].transcript;
      // Clean query (e.g. remove "show", "search for")
      const cleaned = resultText.replace(/show|search|for|find/gi, "").trim();
      setSearchQuery(cleaned);
      setIsListening(false);
    };

    rec.onerror = () => {
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    rec.start();
  };

  const toggleFavorite = (slug: string) => {
    let updated = [...favorites];
    if (favorites.includes(slug)) {
      updated = updated.filter((item) => item !== slug);
    } else {
      updated.push(slug);
    }
    setFavorites(updated);
    localStorage.setItem("semola_favorite_recipes", JSON.stringify(updated));
  };

  const printRecipe = () => {
    window.print();
  };

  const shareRecipe = (title: string, slug: string) => {
    if (navigator.share) {
      navigator.share({
        title: `Semola Recipe: ${title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/recipes/${slug}`);
      alert("Recipe link copied to clipboard!");
    }
  };

  const startVoiceRead = (text: string) => {
    if (!synthRef.current) return;
    
    // Cancel any ongoing speech
    synthRef.current.cancel();

    if (isReading) {
      setIsReading(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    utterance.onend = () => {
      setIsReading(false);
    };

    utterance.onerror = () => {
      setIsReading(false);
    };

    setIsReading(true);
    synthRef.current.speak(utterance);
  };

  const stopVoiceRead = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsReading(false);
    }
  };

  const matchedRecipes = searchRecipes(searchQuery).filter((r) => {
    if (dietFilter && r.diet !== dietFilter && r.category !== dietFilter) return false;
    if (cuisineFilter && r.cuisine !== cuisineFilter) return false;
    return true;
  });

  return (
    <section id="recipes" className="py-24 relative z-10 border-t border-brand-border/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-brand-gold text-sm font-semibold tracking-[3px] uppercase mb-3">🍳 Recipe Desk</p>
          <h2 className="font-serif font-bold text-4xl sm:text-5xl text-foreground mb-4">Interactive Recipe Hub</h2>
          <p className="text-foreground/70 font-sans">
            Instantly search any traditional Indian or fusion recipe. Powered by Semola smart matching and step-by-step voice guidance.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="max-w-xl mx-auto mb-12 relative">
          <div className="flex items-center gap-3 bg-brand-cardBg border border-brand-border/60 rounded-full px-6 py-4 backdrop-blur-md focus-within:border-brand-gold transition-colors duration-300">
            <Search className="text-foreground/40 shrink-0" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search any recipe (e.g. Paneer Butter Masala, Biryani)..."
              className="w-full bg-transparent text-foreground placeholder:text-foreground/30 focus:outline-none text-sm font-sans"
            />
            <button
              onClick={startVoiceSearch}
              className={`p-2 rounded-full hover:bg-white/5 transition-colors shrink-0 ${
                isListening ? "text-brand-red animate-pulse" : "text-brand-gold"
              }`}
              title="Voice Search"
            >
              <Mic size={20} />
            </button>
          </div>

          {/* Search suggestions dropdown */}
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-[110%] left-0 w-full glass-panel border border-brand-border/60 rounded-2xl p-4 z-40 flex flex-col gap-2.5 shadow-2xl"
              >
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectSuggestion(s)}
                    className="w-full text-left text-sm text-foreground/80 hover:text-brand-gold py-1 transition-colors"
                  >
                    🔍 {s}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filters Panel */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl mx-auto">
          {/* Veg Category */}
          <button
            onClick={() => setDietFilter(dietFilter === "veg" ? null : "veg")}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${
              dietFilter === "veg" ? "bg-green-700/20 border-green-500 text-green-400" : "border-brand-border/40 text-foreground/80"
            }`}
          >
            🟢 Pure Veg
          </button>
          <button
            onClick={() => setDietFilter(dietFilter === "non-veg" ? null : "non-veg")}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${
              dietFilter === "non-veg" ? "bg-red-700/20 border-red-500 text-red-400" : "border-brand-border/40 text-foreground/80"
            }`}
          >
            🔴 Non-Veg
          </button>
          <button
            onClick={() => setDietFilter(dietFilter === "High Protein" ? null : "High Protein")}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${
              dietFilter === "High Protein" ? "bg-brand-red border-brand-gold text-white" : "border-brand-border/40 text-foreground/80"
            }`}
          >
            💪 High Protein
          </button>
          <button
            onClick={() => setDietFilter(dietFilter === "Quick" ? null : "Quick")}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${
              dietFilter === "Quick" ? "bg-brand-red border-brand-gold text-white" : "border-brand-border/40 text-foreground/80"
            }`}
          >
            ⏱️ Under 15 Min
          </button>
        </div>

        {/* Results Grid */}
        {matchedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {matchedRecipes.map((r, i) => (
              <motion.div
                layout
                key={r.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl glass-card flex flex-col justify-between group relative"
              >
                {/* Favorite Heart Tag */}
                <button
                  onClick={() => toggleFavorite(r.slug)}
                  className="absolute top-6 right-6 z-20 text-foreground/40 hover:text-brand-red transition-colors"
                >
                  <Heart
                    size={20}
                    fill={favorites.includes(r.slug) ? "#B71C1C" : "none"}
                    className={favorites.includes(r.slug) ? "text-brand-red" : ""}
                  />
                </button>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-2">
                    {r.cuisine} Cuisine • {r.category}
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-foreground mb-3 group-hover:text-brand-gold transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-xs text-foreground/70 leading-relaxed mb-6">
                    {r.imageDescription}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-brand-border/20">
                  <div className="flex gap-4 text-xs text-foreground/60">
                    <span className="flex items-center gap-1"><Clock size={14} /> {r.totalTimeMinutes}m</span>
                    <span className="flex items-center gap-1"><Flame size={14} /> {r.difficulty}</span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveRecipe(r);
                      setActiveStep(0);
                    }}
                    className="px-4 py-2 rounded-full bg-brand-red/10 border border-brand-gold/20 hover:bg-brand-red text-white text-xs font-semibold tracking-wider transition-all"
                  >
                    View Steps
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass-panel rounded-2xl max-w-xl mx-auto border border-brand-border/40">
            <AlertCircle className="text-brand-gold mx-auto mb-4" size={48} />
            <h3 className="font-serif font-bold text-xl mb-2">No Recipes Found</h3>
            <p className="text-sm text-foreground/75 px-6">
              Try search keywords like "chicken", "paneer", or "dal". Or adjust your category filters above.
            </p>
          </div>
        )}
      </div>

      {/* Complete Recipe Modal Drawer */}
      <AnimatePresence>
        {activeRecipe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 print:relative print:z-0 print:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-sm print:hidden"
              onClick={() => {
                stopVoiceRead();
                setActiveRecipe(null);
              }}
            />

            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl glass-panel rounded-3xl p-8 border border-brand-gold/30 z-10 relative overflow-y-auto max-h-[90vh] flex flex-col gap-6 shadow-2xl print:max-w-full print:border-none print:bg-white print:text-black print:p-0 print:max-h-full"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  stopVoiceRead();
                  setActiveRecipe(null);
                }}
                className="absolute top-6 right-6 text-foreground/75 hover:text-brand-gold print:hidden"
              >
                <X size={24} />
              </button>

              {/* Header Details */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                  {activeRecipe.cuisine} • {activeRecipe.category}
                </span>
                <h3 className="font-serif font-bold text-3xl text-foreground print:text-black">
                  {activeRecipe.title}
                </h3>
                <p className="text-sm text-foreground/80 print:text-black">{activeRecipe.imageDescription}</p>

                {/* Actions Toolbar */}
                <div className="flex flex-wrap gap-3 mt-4 print:hidden">
                  <button
                    onClick={() => {
                      const text = `Cooking steps for ${activeRecipe.title}. Step ${activeRecipe.instructions[activeStep].step}: ${activeRecipe.instructions[activeStep].instruction}`;
                      startVoiceRead(text);
                    }}
                    className={`px-4 py-2 rounded-full border text-xs font-semibold tracking-wider flex items-center gap-2 transition-all ${
                      isReading ? "bg-brand-gold text-background border-brand-gold" : "border-brand-border hover:bg-white/5"
                    }`}
                  >
                    {isReading ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    {isReading ? "Mute Read" : "Read Step Aloud"}
                  </button>
                  <button
                    onClick={() => toggleFavorite(activeRecipe.slug)}
                    className="px-4 py-2 rounded-full border border-brand-border hover:bg-white/5 text-xs font-semibold tracking-wider flex items-center gap-2"
                  >
                    <Heart size={16} fill={favorites.includes(activeRecipe.slug) ? "#B71C1C" : "none"} className={favorites.includes(activeRecipe.slug) ? "text-brand-red" : ""} />
                    {favorites.includes(activeRecipe.slug) ? "Saved" : "Save Recipe"}
                  </button>
                  <button
                    onClick={() => shareRecipe(activeRecipe.title, activeRecipe.slug)}
                    className="px-4 py-2 rounded-full border border-brand-border hover:bg-white/5 text-xs font-semibold tracking-wider flex items-center gap-2"
                  >
                    <Share2 size={16} /> Share Link
                  </button>
                  <button
                    onClick={printRecipe}
                    className="px-4 py-2 rounded-full border border-brand-border hover:bg-white/5 text-xs font-semibold tracking-wider flex items-center gap-2"
                  >
                    <Printer size={16} /> Print Card
                  </button>
                </div>
              </div>

              {/* Main Content Split Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                
                {/* Left Side: Cooking Animation / Steps Tracker */}
                <div className="flex flex-col gap-6">
                  {/* Cooking State Animation Loop */}
                  <CookingAnimation state={activeRecipe.instructions[activeStep].animationState} />

                  {/* Step Tracker Details */}
                  <div className="p-6 rounded-2xl bg-background/50 border border-brand-border/40">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-2 block">
                      Instructions step {activeRecipe.instructions[activeStep].step} of {activeRecipe.instructions.length}
                    </span>
                    <p className="font-serif text-lg leading-relaxed mb-6 print:text-black">
                      {activeRecipe.instructions[activeStep].instruction}
                    </p>

                    {/* Step Nav Indicators */}
                    <div className="flex justify-between print:hidden">
                      <button
                        onClick={() => {
                          stopVoiceRead();
                          setActiveStep((prev) => Math.max(0, prev - 1));
                        }}
                        disabled={activeStep === 0}
                        className="px-4 py-2 rounded-lg border border-brand-border hover:border-brand-gold disabled:opacity-30 text-xs font-bold"
                      >
                        Prev Step
                      </button>
                      <button
                        onClick={() => {
                          stopVoiceRead();
                          setActiveStep((prev) => Math.min(activeRecipe.instructions.length - 1, prev + 1));
                        }}
                        disabled={activeStep === activeRecipe.instructions.length - 1}
                        className="px-4 py-2 rounded-lg bg-brand-red text-white hover:bg-brand-red/90 disabled:opacity-30 text-xs font-bold"
                      >
                        Next Step
                      </button>
                    </div>
                  </div>

                  {/* Nutrition details */}
                  <div className="grid grid-cols-4 gap-4 text-center">
                    {Object.entries(activeRecipe.nutrition).map(([key, val]) => (
                      <div key={key} className="p-3 rounded-xl bg-brand-cardBg border border-brand-border/30">
                        <span className="text-2xl block">{val}</span>
                        <span className="text-[10px] uppercase font-bold text-foreground/40 mt-1 block">{key}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Ingredients, tips, recommended spices */}
                <div className="flex flex-col gap-6">
                  {/* Ingredients */}
                  <div className="p-6 rounded-2xl bg-background/30 border border-brand-border/30">
                    <h4 className="font-serif font-bold text-lg text-foreground mb-4 print:text-black">Required Ingredients</h4>
                    <ul className="flex flex-col gap-2.5 text-sm text-foreground/80 print:text-black">
                      {activeRecipe.ingredients.map((ing, idx) => (
                        <li key={idx} className="flex gap-3 items-center">
                          <Check size={16} className="text-brand-gold shrink-0" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tips & Warnings */}
                  <div className="p-6 rounded-2xl bg-brand-red/5 border border-brand-border/40">
                    <h4 className="font-serif font-bold text-lg text-foreground mb-3 flex items-center gap-2">
                      💡 Chef Guidelines
                    </h4>
                    <p className="text-xs text-foreground/75 leading-relaxed mb-4">
                      <strong>Tip:</strong> {activeRecipe.tips[0]}
                    </p>
                    <p className="text-xs text-brand-goldLight leading-relaxed">
                      <strong>Avoid:</strong> {activeRecipe.mistakes[0]}
                    </p>
                  </div>

                  {/* Recommended Spices */}
                  <div className="p-6 rounded-2xl bg-background/50 border border-brand-gold/30">
                    <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-brand-gold mb-4">
                      Recommended Semola Spices
                    </h4>
                    <div className="flex flex-col gap-4">
                      {activeRecipe.recommendedSpices.map((spice, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2 border-b border-brand-border/20 last:border-0">
                          <div className="flex gap-3 items-center">
                            <span className="text-2xl">{spice.image}</span>
                            <div>
                              <h5 className="text-sm font-bold">{spice.name}</h5>
                              <p className="text-xs text-foreground/50">{spice.price}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => alert(`Added ${spice.name} to checkout pantry!`)}
                            className="px-4 py-1.5 rounded-full bg-brand-red text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-brand-red/90 transition-colors"
                          >
                            <ShoppingBag size={12} /> Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
