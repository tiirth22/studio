import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Product Details</h1>
       <Card>
        <CardHeader>
          <CardTitle>Manage Product (ID: {params.id})</CardTitle>
          <CardDescription>This section is under construction. Soon you'll be able to manage product details, view availability, and configure rental settings here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg p-12 h-80">
            <Package className="h-16 w-16 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Coming Soon!</p>
            <p className="text-sm text-muted-foreground mt-1">We're building out the product management features.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}