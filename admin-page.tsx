"use client";

import { useEffect, useState } from "react";
import { defaultVideoRecipes } from "@/data/videoRecipes";
import { VideoRecipe } from "@/types/video";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import { Plus, Trash2, Edit3, Save, CheckCircle } from "lucide-react";

export default function AdminPage() {
  const [recipes, setRecipes] = useState<VideoRecipe[]>([]);
  const [successMsg, setSuccessMsg] = useState("");

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [category, setCategory] = useState<any>("Dinner");
  const [diet, setDiet] = useState<any>("veg");
  const [cookingTime, setCookingTime] = useState("");
  const [difficulty, setDifficulty] = useState<any>("Medium");
  const [featured, setFeatured] = useState(false);
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructionsText, setInstructionsText] = useState("");
  const [recommendedSpicesText, setRecommendedSpicesText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("semola_custom_videos");
    if (saved) {
      setRecipes(JSON.parse(saved));
    } else {
      setRecipes(defaultVideoRecipes);
      localStorage.setItem("semola_custom_videos", JSON.stringify(defaultVideoRecipes));
    }
  }, []);

  const handleAddRecipe = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecipe: VideoRecipe = {
      id: "v-" + Date.now(),
      title,
      description,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      videoUrl: videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-frying-diced-onions-in-a-pot-41584-large.mp4",
      thumbnailUrl: thumbnailUrl || "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80",
      category,
      diet,
      cookingTime: cookingTime || "20 Mins",
      difficulty,
      featured,
      ingredients: ingredientsText.split("\n").map((x) => x.trim()).filter(Boolean),
      instructions: instructionsText.split("\n").map((x) => x.trim()).filter(Boolean),
      nutrition: { calories: 320, protein: "12g", carbs: "20g", fat: "15g" },
      recommendedSpices: recommendedSpicesText.split(",").map((x) => x.trim()).filter(Boolean),
      likes: 0,
      rating: 5.0,
      reviews: []
    };

    let updated = [...recipes];
    if (featured) {
      // Toggle other featured flags off
      updated = updated.map((r) => ({ ...r, featured: false }));
    }
    updated.push(newRecipe);

    setRecipes(updated);
    localStorage.setItem("semola_custom_videos", JSON.stringify(updated));

    // Reset Form
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setThumbnailUrl("");
    setFeatured(false);
    setIngredientsText("");
    setInstructionsText("");
    setRecommendedSpicesText("");
    setCookingTime("");

    setSuccessMsg("Recipe added successfully to database!");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleDelete = (id: string) => {
    const updated = recipes.filter((r) => r.id !== id);
    setRecipes(updated);
    localStorage.setItem("semola_custom_videos", JSON.stringify(updated));
  };

  return (
    <main className="relative min-h-screen w-full bg-background overflow-hidden">
      <CursorGlow />
      <BackgroundBlobs />
      <Navbar activeSection="" setActiveSection={() => {}} />

      <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Form entries (Col 7) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-8 border border-brand-gold/20 flex flex-col gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Administrative Desk</span>
            <h1 className="font-serif font-bold text-3xl text-foreground mt-1">Recipe & Video Hub Admin</h1>
            <p className="text-xs text-foreground/50 mt-1">Add dynamic recipes directly to the client runtime database.</p>
          </div>

          {successMsg && (
            <div className="p-4 rounded-xl bg-green-700/10 border border-green-500 text-xs text-green-400 flex items-center gap-2">
              <CheckCircle size={16} /> {successMsg}
            </div>
          )}

          <form onSubmit={handleAddRecipe} className="flex flex-col gap-5 text-sm text-foreground/80">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Recipe Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Kashmiri Rogan Josh"
                className="w-full px-4 py-3 rounded-xl bg-background border border-brand-border/40 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-brand-gold"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                placeholder="Short attractive review or summary..."
                className="w-full px-4 py-3 rounded-xl bg-background border border-brand-border/40 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-brand-gold resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-brand-border/40 text-foreground focus:outline-none"
                >
                  <option value="Dinner">Dinner</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Festival Specials">Festival Specials</option>
                  <option value="Quick Recipes">Quick Recipes</option>
                </select>
              </div>

              {/* Diet */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Diet</label>
                <select
                  value={diet}
                  onChange={(e) => setDiet(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-brand-border/40 text-foreground focus:outline-none"
                >
                  <option value="veg">Vegetarian</option>
                  <option value="non-veg">Non-Veg</option>
                  <option value="healthy">Healthy Diet</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Prep/Cook Time */}
              <div className="flex flex-col col-span-2 gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Cooking Time</label>
                <input
                  type="text"
                  value={cookingTime}
                  onChange={(e) => setCookingTime(e.target.value)}
                  placeholder="e.g. 35 Mins"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-brand-border/40 text-foreground placeholder:text-foreground/30 focus:outline-none"
                />
              </div>

              {/* Difficulty */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-brand-border/40 text-foreground focus:outline-none"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Video URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Video URL (MP4 / WebM)</label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Leave blank for default placeholder frying loop"
                className="w-full px-4 py-3 rounded-xl bg-background border border-brand-border/40 text-foreground placeholder:text-foreground/30 focus:outline-none"
              />
            </div>

            {/* Thumbnail URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Thumbnail Image URL</label>
              <input
                type="text"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="Leave blank for placeholder curry photo"
                className="w-full px-4 py-3 rounded-xl bg-background border border-brand-border/40 text-foreground placeholder:text-foreground/30 focus:outline-none"
              />
            </div>

            {/* Ingredients (Newline separation) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Ingredients (One per line)</label>
              <textarea
                value={ingredientsText}
                onChange={(e) => setIngredientsText(e.target.value)}
                required
                rows={4}
                placeholder="e.g.&#10;500g Lamb mutton chops&#10;2 tbsp Semola Garam Masala&#10;1 cup fresh yogurt"
                className="w-full px-4 py-3 rounded-xl bg-background border border-brand-border/40 text-foreground placeholder:text-foreground/30 focus:outline-none resize-none font-mono text-xs"
              />
            </div>

            {/* Instructions (Newline separation) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Instructions (One per line)</label>
              <textarea
                value={instructionsText}
                onChange={(e) => setInstructionsText(e.target.value)}
                required
                rows={4}
                placeholder="e.g.&#10;Clean and marinate the mutton slices.&#10;Fry cumin seeds in ghee.&#10;Add Semola masalas and cook."
                className="w-full px-4 py-3 rounded-xl bg-background border border-brand-border/40 text-foreground placeholder:text-foreground/30 focus:outline-none resize-none font-mono text-xs"
              />
            </div>

            {/* Recommended Spices */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Recommended Spices (Comma-separated)</label>
              <input
                type="text"
                value={recommendedSpicesText}
                onChange={(e) => setRecommendedSpicesText(e.target.value)}
                placeholder="Garam Masala, Red Chilli Powder, Turmeric Powder"
                className="w-full px-4 py-3 rounded-xl bg-background border border-brand-border/40 text-foreground placeholder:text-foreground/30 focus:outline-none"
              />
            </div>

            {/* Featured toggle */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 accent-brand-red cursor-pointer"
              />
              <label htmlFor="featured" className="text-xs font-bold uppercase tracking-wider text-foreground/75 cursor-pointer">
                Mark as Featured Banner Recipe
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-brand-red text-white text-xs font-bold uppercase tracking-wider border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-red/90 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <Plus size={16} /> Save Recipe to Hub
            </button>
          </form>
        </div>

        {/* Right Column: Existing entries lists (Col 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 rounded-3xl glass-panel border border-brand-border/40">
            <h3 className="font-serif font-bold text-xl text-foreground mb-4">Recipes List ({recipes.length})</h3>
            <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2">
              {recipes.map((r) => (
                <div key={r.id} className="p-4 rounded-xl bg-background/50 border border-brand-border/30 flex justify-between items-center gap-4">
                  <div>
                    <h5 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                      {r.title}
                      {r.featured && <span className="text-[8px] bg-brand-gold text-background font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">Featured</span>}
                    </h5>
                    <p className="text-xs text-foreground/50 mt-1">{r.category} • {r.diet}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-2 rounded-full hover:bg-brand-red/10 text-foreground/50 hover:text-brand-red transition-colors shrink-0"
                    title="Delete Recipe"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
