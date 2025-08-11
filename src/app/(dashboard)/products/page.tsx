import ProductCard from "@/components/products/product-card";

const products = [
  {
    name: "Professional DSLR Camera",
    description: "Capture stunning photos and videos with our top-of-the-line DSLR camera.",
    price: 50,
    unit: "day",
    image: "https://placehold.co/600x400.png",
    hint: "camera photography",
  },
  {
    name: "4-Person Camping Tent",
    description: "Spacious and durable tent, perfect for your next outdoor adventure.",
    price: 25,
    unit: "day",
    image: "https://placehold.co/600x400.png",
    hint: "tent camping",
  },
  {
    name: "High-Performance Projector",
    description: "Ideal for business presentations or movie nights. Bright and clear display.",
    price: 40,
    unit: "day",
    image: "https://placehold.co/600x400.png",
    hint: "projector movie",
  },
  {
    name: "Heavy-Duty Mountain Bike",
    description: "Conquer any trail with this rugged and reliable mountain bike.",
    price: 35,
    unit: "day",
    image: "https://placehold.co/600x400.png",
    hint: "mountain bike",
  },
  {
    name: "Portable PA System",
    description: "Powerful sound system for events, parties, and public speaking.",
    price: 60,
    unit: "day",
    image: "https://placehold.co/600x400.png",
    hint: "speaker audio",
  },
  {
    name: "Cordless Power Drill",
    description: "A versatile and powerful drill for all your DIY projects.",
    price: 20,
    unit: "day",
    image: "https://placehold.co/600x400.png",
    hint: "power tool",
  }
];

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Product Catalog</h1>
        <p className="text-muted-foreground">Browse our available rental products.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}
