import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Customer Portal</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Valued Customer!</CardTitle>
          <CardDescription>Browse products, manage your rentals, and view your profile.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg p-12 h-80">
            <Package className="h-16 w-16 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Browse Products</p>
            <p className="text-sm text-muted-foreground mt-1">Our product catalog is coming soon to this portal.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
