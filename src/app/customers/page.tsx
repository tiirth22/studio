import ProductCard from "@/components/products/product-card";
import { products } from "@/lib/data";

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
