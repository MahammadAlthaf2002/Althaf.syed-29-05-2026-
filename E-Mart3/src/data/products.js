export const products = {
  iphone: {
    id: "iphone-16",
    name: "Apple iPhone 16",
    category: "Smartphone",
    icon: "📱",
    rating: 4.8,
    reviews: 1248,
    price: 59999,
    image: "/assets/iphone.svg",
    description: "Apple iPhone 16 with advanced camera system, powerful performance and all-day battery life.",
    providers: [
      { name: "Flipkart", price: 59999, rating: 4.5, delivery: "Free delivery", url: "#" },
      { name: "Amazon", price: 62999, rating: 4.6, delivery: "Free delivery", url: "#" },
      { name: "Croma", price: 64999, rating: 4.3, delivery: "Free delivery", url: "#" },
      { name: "Reliance Digital", price: 63499, rating: 4.2, delivery: "Free delivery", url: "#" }
    ]
  },
  samsung: {
    id: "samsung-s24",
    name: "Samsung Galaxy S24",
    category: "Smartphone",
    icon: "📱",
    rating: 4.7,
    reviews: 986,
    price: 54999,
    image: "/assets/samsung.svg",
    description: "Samsung Galaxy S24 with flagship performance, vivid display and pro-grade camera features.",
    providers: [
      { name: "Amazon", price: 56999, rating: 4.6, delivery: "Free delivery", url: "#" },
      { name: "Flipkart", price: 54999, rating: 4.5, delivery: "Free delivery", url: "#" },
      { name: "Croma", price: 57999, rating: 4.3, delivery: "Free delivery", url: "#" },
      { name: "Reliance Digital", price: 57499, rating: 4.2, delivery: "Free delivery", url: "#" }
    ]
  },
  sony: {
    id: "sony-xm5",
    name: "Sony WH-1000XM5",
    category: "Headphones",
    icon: "🎧",
    rating: 4.6,
    reviews: 742,
    price: 24990,
    image: "/assets/headphones.svg",
    description: "Premium wireless headphones with industry-leading noise cancellation and immersive sound.",
    providers: [
      { name: "Amazon", price: 24990, rating: 4.6, delivery: "Free delivery", url: "#" },
      { name: "Flipkart", price: 25999, rating: 4.5, delivery: "Free delivery", url: "#" },
      { name: "Croma", price: 27990, rating: 4.3, delivery: "Free delivery", url: "#" },
      { name: "Reliance Digital", price: 26999, rating: 4.2, delivery: "Free delivery", url: "#" }
    ]
  }
};

export const featuredProducts = [
  { ...products.iphone, badge: "Best seller" },
  { ...products.samsung, badge: "Popular" },
  { ...products.sony, badge: "Top rated" }
];

export function findProduct(query = "") {
  const q = query.toLowerCase();
  if (q.includes("samsung") || q.includes("s24")) return products.samsung;
  if (q.includes("sony") || q.includes("xm5") || q.includes("headphone")) return products.sony;
  return products.iphone;
}
