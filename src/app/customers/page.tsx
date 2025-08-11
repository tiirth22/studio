import ProductCard from "@/components/products/product-card";

// Mock data - in a real app, this would be fetched from a database
const products = [
  {
    id: "prod_1",
    name: "Professional DSLR Camera",
    description: "Capture stunning photos and videos with our top-of-the-line DSLR camera.",
    price: 50,
    unit: "day",
    image: "https://placehold.co/600x400.png",
    hint: "camera photography",
  },
  {
    id: "prod_2",
    name: "4-Person Camping Tent",
    description: "Spacious and durable tent, perfect for your next outdoor adventure.",
    price: 25,
    unit: "day",
    image: "https://placehold.co/600x400.png",
    hint: "tent camping",
  },
  {
    id: "prod_3",
    name: "High-Performance Projector",
    description: "Ideal for business presentations or movie nights. Bright and clear display.",
    price: 40,
    unit: "day",
    image: "https://placehold.co/600x400.png",
    hint: "projector movie",
  },
  {
    id: "prod_4",
    name: "Heavy-Duty Mountain Bike",
    description: "Conquer any trail with this rugged and reliable mountain bike.",
    price: 35,
    unit: "day",
    image: "https://placehold.co/600x400.png",
    hint: "mountain bike",
  },
  {
    id: "prod_5",
    name: "Portable PA System",
    description: "Powerful sound system for events, parties, and public speaking.",
    price: 60,
    unit: "day",
    image: "https://placehold.co/600x400.png",
    hint: "speaker audio",
  },
  {
    id: "prod_6",
    name: "Cordless Power Drill",
    description: "A versatile and powerful drill for all your DIY projects.",
    price: 20,
    unit: "day",
    image: "https://placehold.co/600x400.png",
    hint: "power tool",
  }
];


export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
          <h1 className="text-3xl font-bold font-headline">Explore Our Rentals</h1>
          <p className="text-muted-foreground">Find the perfect gear for your next project or adventure.</p>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
