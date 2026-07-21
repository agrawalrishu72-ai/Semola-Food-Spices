export interface NutritionFacts {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

export interface RecommendedSpice {
  name: string;
  price: string;
  image: string;
}

export interface CookingStep {
  step: number;
  instruction: string;
  animationState: "preparing" | "cutting" | "frying" | "stirring" | "serving";
}

export interface Recipe {
  title: string;
  slug: string;
  category: "veg" | "non-veg";
  cuisine: "Indian" | "Chinese" | "Italian";
  course: "Breakfast" | "Lunch" | "Dinner" | "Festival";
  diet: "Healthy" | "Spicy" | "Low Oil" | "High Protein" | "Kids" | "Quick";
  prepTime: string;
  cookTime: string;
  totalTimeMinutes: number;
  difficulty: "Easy" | "Medium" | "Hard";
  servings: number;
  imageDescription: string;
  ingredients: string[];
  instructions: CookingStep[];
  nutrition: NutritionFacts;
  tips: string[];
  mistakes: string[];
  recommendedSpices: RecommendedSpice[];
  rating: number;
}
