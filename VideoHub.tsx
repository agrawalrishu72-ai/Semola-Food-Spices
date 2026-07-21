"use client";

import { useEffect, useState } from "react";
import { defaultVideoRecipes } from "@/data/videoRecipes";
import { VideoRecipe } from "@/types/video";
import VideoPlayer from "./VideoPlayer";
import { 
  Heart, Share2, Printer, Download, Star, 
  Clock, Award, BookOpen, AlertCircle, ShoppingBag, X, Search 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoHub() {
  const [recipes, setRecipes] = useState<VideoRecipe[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedRecipe, setSelectedRecipe] = useState<VideoRecipe | null>(null);
  
  // Likes and Favorites tracking
  const [likedList, setLikedList] = useState<string[]>([]);
  const [favoriteList, setFavoriteList] = useState<string[]>([]);

  useEffect(() => {
    // Load custom recipes from localStorage if present
    const savedCustom = localStorage.getItem("semola_custom_videos");
    if (savedCustom) {
      setRecipes(JSON.parse(savedCustom));
    } else {
      setRecipes(defaultVideoRecipes);
      localStorage.setItem("semola_custom_videos", JSON.stringify(defaultVideoRecipes));
    }

    // Load user interactions
    const savedLikes = localStorage.getItem("semola_liked_videos");
    if (savedLikes) setLikedList(JSON.parse(savedLikes));

    const savedFavs = localStorage.getItem("semola_fav_videos");
    if (savedFavs) setFavoriteList(JSON.parse(savedFavs));
  }, []);

  const handleLike = (id: string) => {
    let updatedLikes = [...likedList];
    let updatedRecipes = recipes.map((r) => {
      if (r.id === id) {
        const hasLiked = likedList.includes(id);
        const diff = hasLiked ? -1 : 1;
        
        if (hasLiked) {
          updatedLikes = updatedLikes.filter((x) => x !== id);
        } else {
          updatedLikes.push(id);
        }

        return { ...r, likes: r.likes + diff };
      }
      return r;
    });

    setRecipes(updatedRecipes);
    setLikedList(updatedLikes);
    localStorage.setItem("semola_custom_videos", JSON.stringify(updatedRecipes));
    localStorage.setItem("semola_liked_videos", JSON.stringify(updatedLikes));
  };

  const handleFavorite = (id: string) => {
    let updatedFavs = [...favoriteList];
    if (favoriteList.includes(id)) {
      updatedFavs = updatedFavs.filter((x) => x !== id);
    } else {
      updatedFavs.push(id);
    }
    setFavoriteList(updatedFavs);
    localStorage.setItem("semola_fav_videos", JSON.stringify(updatedFavs));
  };

  const handleDownloadPDF = (recipe: VideoRecipe) => {
    alert(`Starting PDF download for "${recipe.title}"... (Simulated)`);
  };

  const handleShare = (recipe: VideoRecipe) => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/recipes/${recipe.slug}`);
      alert("Recipe link copied to clipboard!");
    }
  };

  // Filtering
  const filtered = recipes.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || r.category === activeCategory || r.diet === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const featuredRecipe = recipes.find((r) => r.featured) || recipes[0];

  return (
    <section id="videohub" className="py-24 relative z-10 border-t border-brand-border/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-brand-gold text-sm font-semibold tracking-[3px] uppercase mb-3">🎥 Video Desk</p>
          <h2 className="font-serif font-bold text-4xl sm:text-5xl text-foreground mb-4">Recipe Video Hub</h2>
          <p className="text-foreground/70 font-sans">
            Watch step-by-step masterclass recipes made with Semola Food & Spices. Learn secret tips from native chefs.
          </p>
        </div>

        {/* Search & Category Filters */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          {/* Search bar */}
          <div className="w-full md:max-w-sm flex items-center gap-3 bg-brand-cardBg border border-brand-border/40 rounded-full px-5 py-3 focus-within:border-brand-gold transition-colors">
            <Search className="text-foreground/30 shrink-0" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search video recipes..."
              className="w-full bg-transparent text-sm text-foreground focus:outline-none placeholder:text-foreground/30"
            />
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2.5 max-w-full overflow-x-auto pb-2 md:pb-0">
            {["All", "Dinner", "Lunch", "Quick Recipes", "veg", "non-veg"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4.5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                  activeCategory === cat
                    ? "bg-brand-red border-brand-gold text-white"
                    : "bg-transparent border-brand-border/40 text-foreground/85 hover:border-brand-gold"
                }`}
              >
                {cat === "veg" ? "🥬 Vegetarian" : cat === "non-veg" ? "🍖 Non-Veg" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Video (Top Banner) */}
        {featuredRecipe && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-brand-cardBg border border-brand-border/30 rounded-3xl p-6 md:p-8 mb-16 relative overflow-hidden">
            <div className="lg:col-span-7 w-full">
              <VideoPlayer src={featuredRecipe.videoUrl} poster={featuredRecipe.thumbnailUrl} />
            </div>
            
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="px-3.5 py-1 rounded-full bg-brand-red/10 border border-brand-gold/30 text-[10px] font-bold uppercase tracking-wider text-brand-gold align-self-start w-fit">
                Featured Masterclass
              </span>
              <h3 className="font-serif font-bold text-3xl text-foreground">
                {featuredRecipe.title}
              </h3>
              <p className="text-sm text-foreground/75 leading-relaxed font-sans font-light">
                {featuredRecipe.description}
              </p>

              <div className="flex gap-4 items-center text-xs text-foreground/60 my-2">
                <span className="flex items-center gap-1"><Clock size={14} /> {featuredRecipe.cookingTime}</span>
                <span className="flex items-center gap-1"><Award size={14} /> {featuredRecipe.difficulty}</span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedRecipe(featuredRecipe)}
                  className="flex-grow py-3 rounded-full bg-brand-red text-white text-xs font-bold uppercase tracking-wider border border-brand-gold/20 hover:border-brand-gold transition-all"
                >
                  View Details & Steps
                </button>
                <button
                  onClick={() => handleLike(featuredRecipe.id)}
                  className={`px-4 rounded-full border border-brand-border flex items-center justify-center transition-colors ${
                    likedList.includes(featuredRecipe.id) ? "text-brand-red border-brand-red" : "text-foreground/60"
                  }`}
                >
                  <Heart size={18} fill={likedList.includes(featuredRecipe.id) ? "#B71C1C" : "none"} />
                  <span className="text-xs ml-1.5 font-bold">{featuredRecipe.likes}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Video Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((r) => (
            <motion.div
              layout
              key={r.id}
              className="rounded-2xl glass-card border border-brand-border/40 overflow-hidden group flex flex-col justify-between"
            >
              {/* Media slot */}
              <div className="w-full relative aspect-video bg-black/40">
                <img
                  src={r.thumbnailUrl}
                  alt={r.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Floating tags */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 border border-brand-gold/20 text-[9px] font-bold uppercase tracking-wider text-brand-gold">
                  {r.category}
                </span>
              </div>

              {/* Text content */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-xl text-foreground mb-2 group-hover:text-brand-gold transition-colors">
                    {r.title}
                  </h4>
                  <p className="text-xs text-foreground/70 leading-relaxed mb-4">
                    {r.description.slice(0, 110)}...
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-brand-border/20 mt-4">
                  <span className="text-xs text-foreground/50 font-bold">{r.cookingTime}</span>
                  <button
                    onClick={() => setSelectedRecipe(r)}
                    className="px-4 py-2 rounded-full bg-brand-red/10 border border-brand-gold/20 hover:bg-brand-red text-white text-xs font-semibold tracking-wider transition-all"
                  >
                    Watch Recipe
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Recipe details and cooking checklist popup modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-sm"
              onClick={() => setSelectedRecipe(null)}
            />

            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              className="w-full max-w-4xl glass-panel rounded-3xl p-8 border border-brand-gold/30 z-10 relative overflow-y-auto max-h-[90vh] flex flex-col gap-6"
            >
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-6 right-6 text-foreground/75 hover:text-brand-gold"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* Left Column: Player & Steps */}
                <div className="flex flex-col gap-5">
                  <VideoPlayer src={selectedRecipe.videoUrl} poster={selectedRecipe.thumbnailUrl} />

                  <div className="p-6 rounded-2xl bg-background/50 border border-brand-border/40">
                    <h4 className="font-serif font-bold text-lg text-brand-gold mb-3 flex items-center gap-2">
                      <BookOpen size={18} /> Cooking Instructions
                    </h4>
                    <ol className="flex flex-col gap-3 text-xs text-foreground/80 list-decimal list-inside pl-1">
                      {selectedRecipe.instructions.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Right Column: Ingredients & interactions */}
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-gold block mb-1">
                      {selectedRecipe.category} • {selectedRecipe.diet}
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-foreground">
                      {selectedRecipe.title}
                    </h3>
                  </div>

                  {/* Quick stats toolbar */}
                  <div className="flex gap-4 justify-between items-center py-2.5 border-y border-brand-border/20">
                    <div className="flex gap-1.5 items-center">
                      <Star size={16} fill="#D4AF37" className="text-brand-gold" />
                      <span className="text-sm font-bold">{selectedRecipe.rating}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLike(selectedRecipe.id)}
                        className={`p-2 rounded-full border border-brand-border hover:bg-white/5 transition-colors text-xs flex items-center gap-1 ${
                          likedList.includes(selectedRecipe.id) ? "text-brand-red border-brand-red" : ""
                        }`}
                      >
                        <Heart size={14} fill={likedList.includes(selectedRecipe.id) ? "#B71C1C" : "none"} />
                        <span>{selectedRecipe.likes}</span>
                      </button>
                      <button
                        onClick={() => handleFavorite(selectedRecipe.id)}
                        className="p-2 rounded-full border border-brand-border hover:bg-white/5 transition-colors"
                      >
                        <Heart size={14} fill={favoriteList.includes(selectedRecipe.id) ? "#B71C1C" : "none"} className={favoriteList.includes(selectedRecipe.id) ? "text-brand-red" : ""} />
                      </button>
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/50 mb-2">Ingredients</h4>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/80">
                      {selectedRecipe.ingredients.map((ing, idx) => (
                        <li key={idx} className="flex gap-2 items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Spices */}
                  <div className="p-5 rounded-2xl bg-brand-gold/5 border border-brand-gold/35">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-3">Recommended Spices</h4>
                    <div className="flex flex-col gap-3">
                      {selectedRecipe.recommendedSpices.map((spice, idx) => (
                        <div key={idx} className="flex justify-between items-center py-1 border-b border-brand-border/10 last:border-none">
                          <span className="text-xs font-bold text-foreground">{spice}</span>
                          <button
                            onClick={() => alert(`Added ${spice} to cart!`)}
                            className="px-3 py-1 rounded-full bg-brand-red text-white text-[10px] font-bold flex items-center gap-1"
                          >
                            <ShoppingBag size={10} /> Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PDF download / Share Actions */}
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <button
                      onClick={() => handleDownloadPDF(selectedRecipe)}
                      className="py-3 rounded-full border border-brand-border hover:bg-white/5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download size={14} /> Download PDF
                    </button>
                    <button
                      onClick={() => handleShare(selectedRecipe)}
                      className="py-3 rounded-full border border-brand-border hover:bg-white/5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Share2 size={14} /> Share Recipe
                    </button>
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
