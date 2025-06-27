export const addOns = [
  { id: "raita", name: "Raita", price: 50, isVeg: true },
  { id: "pickle", name: "Pickle", price: 20, isVeg: true },
  { id: "papad", name: "Papad", price: 30, isVeg: true },
  { id: "extra-rice", name: "Extra Rice", price: 80, isVeg: true },
  { id: "boiled-egg", name: "Boiled Egg", price: 25, isVeg: false },
  { id: "chicken-65", name: "Chicken 65 (4 pcs)", price: 120, isVeg: false }
]

export const foodItems = [
  {
    id: 1,
    name: "Meghana Special Biryani",
    price: 370,
    image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/09/veg-biryani-vegetable-biryani.jpg",
    description:
      "Aromatic basmati rice cooked with tender mutton pieces, exotic spices, and saffron. A signature dish that defines Meghana's culinary excellence.",
    ingredients: [
      "Basmati Rice",
      "Mutton",
      "Onions",
      "Yogurt",
      "Saffron",
      "Ghee",
      "Spices"
    ],
    tags: [
      "Chef Recommended",
      "Restaurant Recommended",
      "Medium Spicy",
      "Biriyani"
    ],
    isVeg: false,
    customizable: true,
    category: "Non-Veg Biriyani",
    rating: 4.5,
    preparationTime: "45-50 mins",
    serves: 1,
    variants: [
      { id: "regular", name: "Regular", price: 370 },
      { id: "large", name: "Large", price: 450 },
      { id: "family", name: "Family Pack", price: 850 }
    ],
    addOns: addOns
  },
  {
    id: 2,
    name: "Aloo Dum Biryani",
    price: 315,
    image: "https://preview.redd.it/veg-biryani-are-you-a-veg-or-non-veg-biryani-person-v0-0cf1lei8nkae1.jpeg?auto=webp&s=cb29684efc7933fddcaae2a9e12a2a92d69a63d1",
    description:
      "Fragrant basmati rice layered with spiced baby potatoes, cooked in traditional dum style with aromatic herbs and spices.",
    ingredients: [
      "Basmati Rice",
      "Baby Potatoes",
      "Onions",
      "Yogurt",
      "Mint",
      "Coriander",
      "Spices"
    ],
    tags: ["Chef Recommended", "Restaurant Recommended", "Biriyani"],
    isVeg: true,
    customizable: true,
    category: "Veg Biriyani",
    rating: 4.3,
    preparationTime: "40-45 mins",
    serves: 1,
    variants: [
      { id: "regular", name: "Regular", price: 315 },
      { id: "large", name: "Large", price: 395 }
    ],
    addOns: addOns.filter(addon => addon.isVeg)
  },
  {
    id: 3,
    name: "Paneer Butter Masala",
    price: 355,
    image: "https://vismaifood.com/storage/app/uploads/public/606/866/f5a/606866f5a1246810124271.jpg",
    description:
      "Soft paneer cubes cooked in rich, creamy tomato-based gravy with butter and aromatic spices. Best enjoyed with naan or rice.",
    ingredients: [
      "Paneer",
      "Tomatoes",
      "Onions",
      "Cream",
      "Butter",
      "Cashews",
      "Spices"
    ],
    tags: ["Chef Recommended", "Restaurant Recommended", "North Indian"],
    isVeg: true,
    customizable: false,
    category: "Veg Curries",
    rating: 4.4,
    preparationTime: "25-30 mins",
    serves: 2,
    addOns: addOns.filter(addon => addon.isVeg)
  },
  {
    id: 4,
    name: "Chicken Boneless Biryani",
    price: 360,
    image: "https://media.istockphoto.com/id/179085494/photo/indian-biryani.jpg?s=612x612&w=0&k=20&c=VJAUfiuavFYB7PXwisvUhLqWFJ20-9m087-czUJp9Fs=",
    description:
      "Tender boneless chicken pieces marinated in yogurt and spices, cooked with fragrant basmati rice in traditional dum style.",
    ingredients: [
      "Basmati Rice",
      "Boneless Chicken",
      "Yogurt",
      "Onions",
      "Saffron",
      "Mint",
      "Spices"
    ],
    tags: [
      "Chef Recommended",
      "Restaurant Recommended",
      "Medium Spicy",
      "Biriyani"
    ],
    isVeg: false,
    customizable: true,
    category: "Non-Veg Biriyani",
    rating: 4.6,
    preparationTime: "40-45 mins",
    serves: 1,
    variants: [
      { id: "regular", name: "Regular", price: 360 },
      { id: "large", name: "Large", price: 440 }
    ],
    addOns: addOns
  },
  {
    id: 5,
    name: "Mutton Curry",
    price: 420,
    image: "https://www.cookshideout.com/wp-content/uploads/2017/03/Hyderabadi-Veg-Biryani-Thali4S.jpg",
    description:
      "Tender mutton pieces slow-cooked in traditional South Indian spices and coconut-based gravy.",
    ingredients: [
      "Mutton",
      "Coconut",
      "Onions",
      "Tomatoes",
      "Curry Leaves",
      "Spices"
    ],
    tags: ["Spicy", "South Indian"],
    isVeg: false,
    customizable: false,
    category: "Non-Veg Curries",
    rating: 4.2,
    preparationTime: "50-55 mins",
    serves: 2,
    addOns: addOns
  },
  {
    id: 6,
    name: "Veg Fried Rice",
    price: 280,
    image: "https://foodroot.in/wp-content/uploads/2019/08/Non-veg-biryani-combo-food-root.jpg",
    description:
      "Wok-tossed basmati rice with fresh vegetables, soy sauce, and aromatic spices.",
    ingredients: [
      "Basmati Rice",
      "Mixed Vegetables",
      "Soy Sauce",
      "Garlic",
      "Ginger",
      "Spring Onions"
    ],
    tags: ["Chinese", "Light"],
    isVeg: true,
    customizable: false,
    category: "Veg Starter",
    rating: 4.0,
    preparationTime: "20-25 mins",
    serves: 1,
    addOns: addOns.filter(addon => addon.isVeg)
  }
]
