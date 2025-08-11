import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

export default function StaffOrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Rental Orders</h1>
       <Card>
        <CardHeader>
          <CardTitle>Manage Orders</CardTitle>
          <CardDescription>This section is under construction. Soon you'll be able to create and manage rental quotations, orders, and contracts here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg p-12 h-80">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Coming Soon!</p>
            <p className="text-sm text-muted-foreground mt-1">We're working hard to bring you this feature.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
