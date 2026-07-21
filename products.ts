export interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  category: "masalas" | "whole" | "blends" | "premium" | "ghee";
  description: string;
  detailedDescription: string;
  origin: string;
  packagingOptions: string[];
  spiceLevel: number;
  benefits: string[];
  pairings: string[]; // matching ingredients or dishes
}

export const products: Product[] = [
  {
    id: "garam-masala",
    name: "Garam Masala",
    slug: "garam-masala",
    price: "₹65",
    category: "blends",
    description: "A royal imperial blend of 15 roasted spices offering warm, sweet, and pungent flavors.",
    detailedDescription: "Crafted from a recipe handed down through generations of master spice blenders, our Garam Masala is a balanced blend of black pepper, cardamom, cloves, cinnamon, nutmeg, and mace, roasted at low temperatures to lock in aromatics.",
    origin: "North India",
    packagingOptions: ["10g Sachet", "100g Box", "250g Jar", "1kg Bulk Bag"],
    spiceLevel: 4,
    benefits: ["Boosts metabolism", "Enhances nutrient absorption", "Rich in antioxidants"],
    pairings: ["Paneer Curries", "Chicken Gravy", "Lentil Dal", "Potato Dry Fry"]
  },
  {
    id: "haldi-powder",
    name: "Haldi Powder (Turmeric)",
    slug: "haldi-powder",
    price: "₹38",
    category: "masalas",
    description: "Premium high-curcumin turmeric powder processed naturally to preserve absolute purity.",
    detailedDescription: "Grown in the mineral-rich soils of Sangli, Maharashtra, our turmeric is harvested at peak maturity and processed hygienically to guarantee a minimum of 3.5% Curcumin content, ensuring intense golden color and high anti-inflammatory value.",
    origin: "Sangli, Maharashtra",
    packagingOptions: ["10g Sachet", "100g Box", "500g Bag"],
    spiceLevel: 0,
    benefits: ["Powerful anti-inflammatory", "Boosts immune system", "Promotes glowing skin"],
    pairings: ["Everyday Curries", "Turmeric Latte", "Stir Fries", "Rice Dishes"]
  },
  {
    id: "red-chilli",
    name: "Red Chilli Powder",
    slug: "red-chilli",
    price: "₹45",
    category: "masalas",
    description: "Vibrant hot ground red peppers to add instant heat and golden-orange oil release.",
    detailedDescription: "Made from sun-dried chillies sourced from Guntur, Andhra Pradesh, our Red Chilli Powder delivers the signature heat and natural oily sheen desired in traditional hot Indian curries, processed with zero artificial colorants.",
    origin: "Guntur, Andhra Pradesh",
    packagingOptions: ["10g Sachet", "100g Box", "500g Bag"],
    spiceLevel: 5,
    benefits: ["Aids in digestion", "Relieves congestion", "Rich in Vitamin C"],
    pairings: ["Mutton Curry", "Spicy stir-fry", "Lentils", "Pickles"]
  },
  {
    id: "coriander-powder",
    name: "Coriander Powder",
    slug: "coriander-powder",
    price: "₹35",
    category: "masalas",
    description: "Aromatic and sweet ground dhaniya seeds providing cooling notes to rich gravies.",
    detailedDescription: "Milled from the plumpest coriander seeds sourced from Rajasthan, this powder adds a mild thickening texture and an earthy, citrusy base flavor profile to curries, stews, and marinades.",
    origin: "Rajasthan",
    packagingOptions: ["100g Box", "250g Jar", "1kg Bulk Bag"],
    spiceLevel: 1,
    benefits: ["Rich in essential dietary fiber", "Aids cholesterol balance", "Cooling properties"],
    pairings: ["Veg Curries", "Chicken Tikka", "Biryani Marinations"]
  },
  {
    id: "kitchen-king",
    name: "Kitchen King Masala",
    slug: "kitchen-king",
    price: "₹70",
    category: "blends",
    description: "The ultimate all-purpose kitchen curry powder that balances flavor, aroma, and color.",
    detailedDescription: "A classic blend of coriander, cumin, turmeric, black pepper, ginger, garlic, and dried fenugreek leaves. Perfect for enhancing the flavor of everyday vegetable dishes and classic dry stir fries.",
    origin: "Multi-Region Sourced",
    packagingOptions: ["100g Box", "250g Jar"],
    spiceLevel: 3,
    benefits: ["Aids nutrient absorption", "Universal seasoning convenience", "Enhances raw food flavor"],
    pairings: ["Mix Veg Sabzi", "Aloo Gobhi", "Matar Paneer"]
  },
  {
    id: "chicken-masala",
    name: "Chicken Masala",
    slug: "chicken-masala",
    price: "₹75",
    category: "blends",
    description: "Bold, rustic masala blend designed for chicken curries and tandoori marinations.",
    detailedDescription: "A highly aromatic, rich spice mixture that adds the authentic Punjabi Dhaba flavor and deep red-brown color to chicken curries, roasts, and grill dishes without relying on MSG.",
    origin: "Punjab Region Sourced",
    packagingOptions: ["100g Box", "250g Jar", "1kg Masterpack"],
    spiceLevel: 4,
    benefits: ["Imparts rich, traditional aroma", "Rich in gut-friendly ginger & garlic", "Tenderizes meat fibers"],
    pairings: ["Chicken Curry", "Chicken Tikka", "Tandoori Wings"]
  },
  {
    id: "jeera-powder",
    name: "Jeera Powder (Cumin)",
    slug: "jeera-powder",
    price: "₹40",
    category: "masalas",
    description: "Earthy, dry-roasted cumin seed powder that adds a smoky, savory touch.",
    detailedDescription: "Milled from cumin seeds grown in Gujarat and roasted slowly before grinding to bring out the volatile organic oils that provide cumin with its distinctive warm, smoky scent.",
    origin: "Gujarat",
    packagingOptions: ["100g Box", "250g Jar"],
    spiceLevel: 2,
    benefits: ["Improves digestion", "High source of iron", "Promotes glycemic balance"],
    pairings: ["Raita (Yogurt)", "Jeera Rice", "Dal Tempering", "Kabab Rubs"]
  },
  {
    id: "kashmiri-mirch",
    name: "Kashmiri Mirch Powder",
    slug: "kashmiri-mirch",
    price: "₹95",
    category: "premium",
    description: "Curated premium red pepper powder valued for its rich crimson color and mild sweet taste.",
    detailedDescription: "Sourced directly from the Kashmiri foothills, these mild red peppers are cleaned and milled under cryogenic conditions to guarantee the retention of their brilliant ruby-red capsanthin oils without excessive heat.",
    origin: "Kashmir Foothills",
    packagingOptions: ["100g Box", "250g Jar", "500g Bag"],
    spiceLevel: 2,
    benefits: ["Gives intense natural color without heat", "Excellent vitamin A source", "Rich in minerals"],
    pairings: ["Tandoori Marinade", "Rogan Josh", "Butter Chicken", "Kadai Paneer"]
  },
  {
    id: "magic-masala",
    name: "Magic Masala Sprinkle",
    slug: "magic-masala",
    price: "₹50",
    category: "blends",
    description: "Zesty, hot-and-sweet spice sprinkles to add immediate magic to noodles, rice, and fried snacks.",
    detailedDescription: "The ultimate flavor enhancer composed of onion powder, garlic powder, dried mango powder, cumin, pepper, and a touch of sweetness to instantly elevate everyday stir-fried dishes, fries, and instant noodles.",
    origin: "Multi-Region Sourced",
    packagingOptions: ["100g Shaker Jar", "250g Refill Bag"],
    spiceLevel: 3,
    benefits: ["Kids' favorite flavor", "Instant seasoning shortcut", "Rich in savory onion-garlic extracts"],
    pairings: ["Instant Noodles", "French Fries", "Masala Fried Rice", "Egg Bhurji"]
  },
  {
    id: "desi-cow-ghee",
    name: "Premium Bilona Cow Ghee",
    slug: "desi-cow-ghee",
    price: "₹1300",
    category: "ghee",
    description: "Slow-simmered granulated A2 cow ghee cooked using the traditional Vedic Bilona method.",
    detailedDescription: "Our signature product. Slowly churned from curd (not cream) using the traditional two-way wooden Bilona method, then slowly simmered to form rich gold granules and a heavenly aromatic profile that elevates every Indian recipe.",
    origin: "Jharkhand Farms",
    packagingOptions: ["500ml Glass Jar", "1L Glass Jar", "5L Tin"],
    spiceLevel: 0,
    benefits: ["Rich in butyric acid", "Good source of fat-soluble vitamins (A, D, E, K)", "Perfect for lactose sensitive individuals"],
    pairings: ["Khichdi", "Halwa", "Naan & Roti spreads", "Tadka Tempering"]
  }
];
