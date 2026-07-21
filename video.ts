export interface Review {
  username: string;
  rating: number;
  comment: string;
  date: string;
}

export interface VideoRecipe {
  id: string;
  title: string;
  description: string;
  slug: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: "Breakfast" | "Lunch" | "Dinner" | "Snacks" | "Festival Specials" | "Quick Recipes";
  diet: "veg" | "non-veg" | "healthy";
  cookingTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  featured: boolean;
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  recommendedSpices: string[];
  likes: number;
  rating: number;
  reviews: Review[];
}
