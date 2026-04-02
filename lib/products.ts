export interface Product {
  id: number;
  name: string;
  tagline: string;
  protein: string;
  calories: number;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  badge: string;
  color: string;
  gradient: string;
  ingredients: string[];
  tags: string[];
  image: string;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

export const products: Product[] = [
  {
    id: 1,
    name: "Berry Blast",
    tagline: "Dark Chocolate + Berries",
    protein: "22g",
    calories: 210,
    price: 3.00,
    originalPrice: 3.80,
    rating: 4.9,
    reviews: 1243,
    badge: "BESTSELLER",
    color: "#3B1A0A",
    gradient: "from-[#3B1A0A] to-[#BD8651]",
    ingredients: ["Dates", "Dark Cocoa", "Almonds", "Whey Protein", "Sea Salt"],
    tags: ["High Protein", "Gluten Free", "No Added Sugar"],
    image: "Purple.png",
    macros: { protein: 22, carbs: 28, fat: 9, fiber: 4 }
  },
  {
    id: 2,
    name: "Mango Zest.",
    tagline: "Mixed Berries + Mango",
    protein: "18g",
    calories: 190,
    price: 2.50,
    originalPrice: 3.20,
    rating: 4.7,
    reviews: 876,
    badge: "NEW",
    color: "#D9298E",
    gradient: "from-[#D9298E] to-[#FFB4C1]",
    ingredients: ["Cranberries", "Blueberries", "Rolled Oats", "Whey Protein", "Chia Seeds"],
    tags: ["Antioxidant Rich", "Vegan Option", "Low Carb"],
    image: "green.png",
    macros: { protein: 18, carbs: 24, fat: 7, fiber: 6 }
  },
  {
    id: 3,
    name: "Peanut Butter",
    tagline: "Peanut Butter + Honey",
    protein: "20g",
    calories: 230,
    price: 2.80,
    originalPrice: 3.50,
    rating: 4.8,
    reviews: 2104,
    badge: "FAN FAV",
    color: "#BD8651",
    gradient: "from-[#BD8651] to-[#F1EA03]",
    ingredients: ["Peanut Butter", "Dates", "Honey", "Whey Protein", "Flaxseed"],
    tags: ["High Protein", "Energy Boost", "No Artificial Flavour"],
    image: "orange.png",
    macros: { protein: 20, carbs: 26, fat: 12, fiber: 3 }
  },
  {
    id: 4,
    name: "Vanilla Crunch",
    tagline: "Vanilla Bean + Cashew",
    protein: "19g",
    calories: 200,
    price: 2.60,
    originalPrice: 3.30,
    rating: 4.6,
    reviews: 654,
    badge: "CLEAN",
    color: "#F1EBDC",
    gradient: "from-[#F1EBDC] to-[#FFB4C1]",
    ingredients: ["Cashews", "Vanilla Bean", "Oat Flour", "Whey Protein", "Coconut Oil"],
    tags: ["No Added Sugar", "Gut Friendly", "High Protein"],
    image: "mint.png",
    macros: { protein: 19, carbs: 22, fat: 8, fiber: 5 }
  },
  {
    id: 5,
    name: "Chocolate Mint",
    tagline: "Chocolate + Mint",
    protein: "19g",
    calories: 200,
    price: 2.60,
    originalPrice: 3.30,
    rating: 4.6,
    reviews: 654,
    badge: "CLEAN",
    color: "#F1EBDC",
    gradient: "from-[#F1EBDC] to-[#FFB4C1]",
    ingredients: ["Cashews", "Vanilla Bean", "Oat Flour", "Whey Protein", "Coconut Oil"],
    tags: ["No Added Sugar", "Gut Friendly", "High Protein"],
    image: "choco.png",
    macros: { protein: 19, carbs: 22, fat: 8, fiber: 5 }
  },
  {
    id: 6,
    name: "Mile vanilla Crunch",
    tagline: "Vanilla Bean + Cashew",
    protein: "19g",
    calories: 200,
    price: 2.60,
    originalPrice: 3.30,
    rating: 4.6,
    reviews: 654,
    badge: "CLEAN",
    color: "#F1EBDC",
    gradient: "from-[#F1EBDC] to-[#FFB4C1]",
    ingredients: ["Cashews", "Vanilla Bean", "Oat Flour", "Whey Protein", "Coconut Oil"],
    tags: ["No Added Sugar", "Gut Friendly", "High Protein"],
    image: "white.png",
    macros: { protein: 19, carbs: 22, fat: 8, fiber: 5 }
  },{
    id: 7,
    name: "Strawberry Vanilla",
    tagline: "Strawberry + Vanilla Bean",
    protein: "19g",
    calories: 200,
    price: 2.60,
    originalPrice: 3.30,
    rating: 4.6,
    reviews: 654,
    badge: "CLEAN",
    color: "#F1EBDC",
    gradient: "from-[#F1EBDC] to-[#FFB4C1]",
    ingredients: ["Cashews", "Vanilla Bean", "Oat Flour", "Whey Protein", "Coconut Oil"],
    tags: ["No Added Sugar", "Gut Friendly", "High Protein"],
    image: "pink.png",
    macros: { protein: 19, carbs: 22, fat: 8, fiber: 5 }
  },
  {
    id: 8,
    name: "Multigrain",
    tagline: "Strawberry + Vanilla Bean",
    protein: "19g",
    calories: 200,
    price: 2.60,
    originalPrice: 3.30,
    rating: 4.6,
    reviews: 654,
    badge: "CLEAN",
    color: "#F1EBDC",
    gradient: "from-[#F1EBDC] to-[#FFB4C1]",
    ingredients: ["Cashews", "Vanilla Bean", "Oat Flour", "Whey Protein", "Coconut Oil"],
    tags: ["No Added Sugar", "Gut Friendly", "High Protein"],
    image: "berry.png",
    macros: { protein: 19, carbs: 22, fat: 8, fiber: 5 }
  }
];
