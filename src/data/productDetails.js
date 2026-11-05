// src/data/productDetails.js

const productDetails = [
  {
    id: 1,
    name: "Samsung Galaxy M14 5G",
    brand: "Samsung",
    category: "Electronics",
    image: "/images/products/samsung-galaxy-m14.png",
    rating: 4.4,
    reviews: 1850,
    shortDescription:
      "A powerful 5G smartphone with a large display, long-lasting battery and smooth everyday performance.",
    price: 12499,
    originalPrice: 14999,
    discount: "17%",
    availability: "In Stock",
    description:
      "The Samsung Galaxy M14 5G is designed to deliver a smooth and reliable smartphone experience for everyday users. It combines 5G connectivity with a large immersive display, dependable performance and a long-lasting battery that helps users stay connected throughout the day. Whether you are browsing the internet, watching videos, communicating with friends and family, using social media or completing everyday tasks, the Galaxy M14 5G provides a practical and feature-rich experience. Its stylish design, capable hardware and useful features make it a suitable choice for users looking for a reliable smartphone for everyday use.",
    keyFeatures: [
      "5G Connectivity",
      "Large Immersive Display",
      "Long-lasting 6000 mAh Battery",
      "Powerful Performance",
      "Expandable Storage"
    ],
    specifications: {
      brand: "Samsung",
      model: "Galaxy M14 5G",
      connectivity: "5G",
      battery: "6000 mAh",
      color: "Black",
      warranty: "1 Year"
    },
    customerReviews: [
      {
        name: "Rahul",
        rating: 5,
        comment: "Good performance and excellent battery backup for everyday use."
      },
      {
        name: "Sneha",
        rating: 4,
        comment: "The phone offers good features and a smooth overall experience."
      }
    ]
  }
  // Add remaining products (id: 2 to 12) using the same structure
];

export default productDetails;