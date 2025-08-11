import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Customers</h1>
      <Card>
        <CardHeader>
          <CardTitle>Manage Customers</CardTitle>
          <CardDescription>This section is under construction. You will soon be able to view and manage your customers from here.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg p-12 h-80">
            <Users className="h-16 w-16 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Coming Soon!</p>
            <p className="text-sm text-muted-foreground mt-1">We're working hard to bring you this feature.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
