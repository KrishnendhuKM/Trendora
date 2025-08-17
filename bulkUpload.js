const axios = require("axios");

const products = [
  {
    name: "Velvet Matte Lipstick",
    category: "makeup",
    price: 399,
    image: "/assets/lipstick1.jpg",
    description: "A rich, long-lasting lipstick with a soft matte finish.",
    details: ["Moisturizing formula", "Vibrant color", "Lasts up to 8 hours"],
    stock: 10,
    rating: 4.4
  },
  {
    name: "Daily Hydrating Moisturizer",
    category: "skincare",
    price: 599,
    image: "/assets/skincare1.jpg",
    description: "Lightweight moisturizer for glowing, hydrated skin.",
    details: ["Non-greasy", "SPF 15", "All-day hydration"],
    stock: 15,
    rating: 4.6
  },
  {
    name: "Gold Hoop Earrings",
    category: "jewelry",
    price: 799,
    image: "/assets/jewelry1.jpg",
    description: "Stylish gold hoops to elevate any look.",
    details: ["18K plated", "Nickel-free", "Trendy design"],
    stock: 7,
    rating: 4.2
  },
  {
    name: "Classic Leather Handbag",
    category: "bags",
    price: 1499,
    image: "/assets/bag1.jpg",
    description: "Elegant handbag perfect for work or a casual day out.",
    details: ["Faux leather", "Adjustable strap", "Magnetic closure"],
    stock: 8,
    rating: 4.7
  },
  {
    name: "Peachy Glow Blush",
    category: "makeup",
    price: 299,
    image: "/assets/blush1.jpg",
    description: "Add a soft flush of color to your cheeks.",
    details: ["Natural finish", "Long-wearing", "Blends smoothly"],
    stock: 12,
    rating: 4.5
  },
  {
    name: "Nude Nail Polish Set",
    category: "nails",
    price: 349,
    image: "/assets/nails1.jpg",
    description: "Set of 3 nude-tone nail polishes for a minimalist vibe.",
    details: ["Chip-resistant", "Glossy finish", "Toxin-free"],
    stock: 20,
    rating: 4.3
  },
  {
    name: "Wedge Sandals",
    category: "footwear",
    price: 1099,
    image: "/assets/footwear1.jpg",
    description: "Stylish and comfortable sandals for every outfit.",
    details: ["Slip-on design", "Padded footbed", "Anti-slip sole"],
    stock: 10,
    rating: 4.1
  },
  {
    name: "Brightening Face Serum",
    category: "skincare",
    price: 699,
    image: "/assets/faceserum.jpg",
    description: "Vitamin C enriched serum to brighten dull skin.",
    details: [
      "Includes Vitamin C, Hyaluronic Acid & Niacinamide",
      "Improves texture and reduces pigmentation",
      "Apply 2–3 drops on clean face, morning & night"
    ],
    stock: 9,
    rating: 4.6
  },
  {
    name: "Intense Black Eyeliner",
    category: "makeup",
    price: 211,
    image: "/assets/eyeliner.jpg",
    description: "Dark, smudge-proof, and long-lasting eyeliner.",
    details: [
      "Waterproof formula",
      "Smooth precision tip",
      "Lasts up to 12 hours"
    ],
    stock: 14,
    rating: 4.5
  },
  {
    name: "Gentle Face Wash",
    category: "facewash",
    price: 259,
    image: "/assets/facewash.jpg",
    description: "Cleanses dirt and oil without drying the skin.",
    details: [
      "Suitable for all skin types",
      "Soap-free and pH balanced",
      "Use twice daily for best results"
    ],
    stock: 13,
    rating: 4.3
  },
  {
    name: "Floral Mist Perfume",
    category: "perfume",
    price: 899,
    image: "/assets/perfume.jpg",
    description: "A refreshing floral fragrance for everyday wear.",
    details: [
      "Notes: Rose, Jasmine, and White Musk",
      "Long-lasting with 6–8 hour wear",
      "Perfect for day & night"
    ],
    stock: 11,
    rating: 4.4
  },
  {
    name: "Matte Finish Sunscreen SPF 50",
    category: "sunscreen",
    price: 499,
    image: "/assets/sunscreen.jpg",
    description: "High-protection matte sunscreen for oily skin.",
    details: [
      "SPF 50 PA+++",
      "Oil-free, non-comedogenic",
      "Apply 15 minutes before sun exposure"
    ],
    stock: 10,
    rating: 4.5
  },
  {
    name: "Flawless Liquid Foundation",
    category: "makeup",
    price: 649,
    image: "/assets/foundation.jpg",
    description: "Buildable, lightweight foundation for a smooth base.",
    details: [
      "Suitable for normal to dry skin",
      "Blurs pores and evens out complexion",
      "Apply with brush, sponge, or fingertips"
    ],
    stock: 12,
    rating: 4.6
  }
];

const uploadProducts = async () => {
  try {
    for (let product of products) {
      const res = await axios.post("http://localhost:5000/api/products", product);
      console.log(`✅ Uploaded: ${product.name}`);
    }
    console.log("🎉 All products uploaded!");
  } catch (err) {
    console.error("❌ Upload failed:");
    console.error(err.response?.data || err.message || err);
  }
};

uploadProducts();
