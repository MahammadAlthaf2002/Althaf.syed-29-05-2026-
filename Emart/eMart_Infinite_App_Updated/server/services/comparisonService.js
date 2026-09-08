const demoProducts = [
  {
    match: ["iphone", "iphone 16", "apple"],
    product: {
      id: "iphone-16", name: "Apple iPhone 16", category: "Smartphone", rating: 4.8, reviews: 1248,
      image: "/assets/iphone.svg",
      providers: [
        { name: "Flipkart", price: 59999, rating: 4.5, delivery: "Free delivery", url: "#" },
        { name: "Amazon", price: 62999, rating: 4.6, delivery: "Free delivery", url: "#" },
        { name: "Croma", price: 64999, rating: 4.3, delivery: "Free delivery", url: "#" },
        { name: "Reliance Digital", price: 63499, rating: 4.2, delivery: "Free delivery", url: "#" }
      ]
    }
  },
  {
    match: ["samsung", "s24"],
    product: {
      id: "samsung-s24", name: "Samsung Galaxy S24", category: "Smartphone", rating: 4.7, reviews: 986,
      image: "/assets/samsung.svg",
      providers: [
        { name: "Flipkart", price: 54999, rating: 4.5, delivery: "Free delivery", url: "#" },
        { name: "Amazon", price: 56999, rating: 4.6, delivery: "Free delivery", url: "#" },
        { name: "Croma", price: 57999, rating: 4.3, delivery: "Free delivery", url: "#" },
        { name: "Reliance Digital", price: 57499, rating: 4.2, delivery: "Free delivery", url: "#" }
      ]
    }
  },
  {
    match: ["sony", "xm5", "headphone"],
    product: {
      id: "sony-xm5", name: "Sony WH-1000XM5", category: "Headphones", rating: 4.6, reviews: 742,
      image: "/assets/headphones.svg",
      providers: [
        { name: "Amazon", price: 24990, rating: 4.6, delivery: "Free delivery", url: "#" },
        { name: "Flipkart", price: 25999, rating: 4.5, delivery: "Free delivery", url: "#" },
        { name: "Croma", price: 27990, rating: 4.3, delivery: "Free delivery", url: "#" },
        { name: "Reliance Digital", price: 26999, rating: 4.2, delivery: "Free delivery", url: "#" }
      ]
    }
  }
];

export function findProduct(input) {
  const value = input.toLowerCase();
  return (demoProducts.find(item => item.match.some(term => value.includes(term))) || demoProducts[0]).product;
}
