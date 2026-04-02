export interface Review {
  id: number;
  name: string;
  verified: boolean;
  rating: number;
  date: string;
  productId: number;
  text: string;
  photo: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "Arjun K.",
    verified: true,
    rating: 5,
    date: "2025-03-15",
    productId: 1,
    text: "Finally a bar that doesn't taste like cardboard. Choco Blast is ELITE.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
  },
  {
    id: 2,
    name: "Priya M.",
    verified: true,
    rating: 5,
    date: "2025-03-12",
    productId: 1,
    text: "I check ingredients obsessively. FUELBAR is the only one I trust.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
  },
  {
    id: 3,
    name: "Sam T.",
    verified: true,
    rating: 4,
    date: "2025-03-10",
    productId: 2,
    text: "Berry Burn as a pre-workout snack is a game changer.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
  },
  {
    id: 4,
    name: "Nikita R.",
    verified: true,
    rating: 5,
    date: "2025-03-08",
    productId: 3,
    text: "Peanut Power kept me full for 4 hours. No crash. No regrets.",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
  },
  {
    id: 5,
    name: "Dev P.",
    verified: true,
    rating: 5,
    date: "2025-03-05",
    productId: 1,
    text: "Build Your Box feature is so smart. My gym bag is always stocked.",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100"
  },
  {
    id: 6,
    name: "Maya S.",
    verified: true,
    rating: 5,
    date: "2025-03-02",
    productId: 4,
    text: "Vanilla Crunch is my go-to afternoon snack. Clean ingredients, amazing taste.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"
  },
  {
    id: 7,
    name: "Rohan D.",
    verified: true,
    rating: 4,
    date: "2025-02-28",
    productId: 2,
    text: "Love the berry flavor. Wish it had more protein but still great.",
    photo: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100"
  },
  {
    id: 8,
    name: "Ananya B.",
    verified: true,
    rating: 5,
    date: "2025-02-25",
    productId: 3,
    text: "The peanut butter flavor is INSANE. Tastes like a dessert but fuels like a beast.",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100"
  }
];
