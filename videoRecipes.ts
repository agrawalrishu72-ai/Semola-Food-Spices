import { VideoRecipe } from "@/types/video";

export const defaultVideoRecipes: VideoRecipe[] = [
  {
    id: "v-paneer-butter",
    title: "Paneer Butter Masala Masterclass",
    description: "Learn how to make the ultimate restaurant-style Paneer Butter Masala using Semola Kitchen King and Garam Masala.",
    slug: "paneer-butter-masala-video",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-frying-diced-onions-in-a-pot-41584-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80",
    category: "Dinner",
    diet: "veg",
    cookingTime: "25 Mins",
    difficulty: "Medium",
    featured: true,
    ingredients: [
      "250g Paneer cottage cheese",
      "2 tbsp Butter",
      "1 tbsp Oil",
      "1 cup Tomato puree",
      "1/2 cup Cashew paste",
      "1 tbsp Semola Kitchen King Masala",
      "1 tsp Semola Garam Masala",
      "Salt to taste"
    ],
    instructions: [
      "Heat butter and oil in a deep pan.",
      "Sauté tomato puree and ginger garlic paste.",
      "Add Semola spices and cook until oils release.",
      "Stir in cashew cream and paneer cubes, simmering gently."
    ],
    nutrition: {
      calories: 380,
      protein: "14g",
      carbs: "12g",
      fat: "29g"
    },
    recommendedSpices: ["Kitchen King Masala", "Garam Masala"],
    likes: 124,
    rating: 4.9,
    reviews: [
      { username: "Amit K.", rating: 5, comment: "Amazing rich texture, the Kitchen King masala holds the flavor perfectly!", date: "2026-07-15" }
    ]
  },
  {
    id: "v-chicken-biryani",
    title: "Royal Dum Chicken Biryani",
    description: "Master the art of layering chicken and Basmati rice cooked under low flame Dum steam with Semola Biryani Spices.",
    slug: "chicken-biryani-video",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-rice-being-stirred-in-a-wok-34440-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    category: "Lunch",
    diet: "non-veg",
    cookingTime: "45 Mins",
    difficulty: "Hard",
    featured: false,
    ingredients: [
      "500g Marinated Chicken",
      "2 cups Aged Basmati Rice",
      "4 tbsp Premium Ghee",
      "2 Fried Onions sliced",
      "2 tbsp Semola Garam Masala",
      "1 tsp Saffron strands"
    ],
    instructions: [
      "Parboil rice with whole spices until 70% cooked.",
      "Sear marinated chicken in ghee inside a thick bottom pot.",
      "Layer rice over chicken, garnish with mint and fried onions.",
      "Seal container and steam on slow heat for 20 minutes."
    ],
    nutrition: {
      calories: 540,
      protein: "34g",
      carbs: "56g",
      fat: "18g"
    },
    recommendedSpices: ["Garam Masala", "Red Chilli Powder"],
    likes: 245,
    rating: 5.0,
    reviews: [
      { username: "Nisha S.", rating: 5, comment: "My family absolutely loved this biryani recipe. So fragrant!", date: "2026-07-18" }
    ]
  },
  {
    id: "v-dal-tadka",
    title: "Dhaba Style Dal Tadka",
    description: "A quick, comforting yellow lentil soup tempered with sizzling ghee, roasted cumin, and garlic.",
    slug: "dal-tadka-video",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-seasoning-vegetables-in-a-frying-pan-41578-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
    category: "Quick Recipes",
    diet: "veg",
    cookingTime: "15 Mins",
    difficulty: "Easy",
    featured: false,
    ingredients: [
      "1 cup Yellow Toor Dal",
      "1 small Onion chopped",
      "1 tsp Cumin Seeds",
      "1 pinch Asafoetida",
      "1 tbsp Ghee",
      "1 tsp Semola Turmeric"
    ],
    instructions: [
      "Boil dal with turmeric and salt in a pressure cooker.",
      "Prepare tempering by heating ghee, popping cumin, and adding garlic.",
      "Pour hot sizzling tadka over cooked dal."
    ],
    nutrition: {
      calories: 190,
      protein: "10g",
      carbs: "24g",
      fat: "5g"
    },
    recommendedSpices: ["Turmeric Powder", "Coriander Powder"],
    likes: 89,
    rating: 4.8,
    reviews: []
  }
];
