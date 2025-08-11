import Link from "next/link";
import ProductCard from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { products } from "@/lib/data";

export default function StaffProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Product Catalog</h1>
          <p className="text-muted-foreground">Browse and manage your available rental products.</p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Product
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
