import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getRentalsByCustomer } from '@/lib/data';

export default async function MyRentalsPage() {
  // In a real app, you would get the customer ID from the authenticated session.
  const rentals = await getRentalsByCustomer('user_2'); 

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Rentals</h1>
        <p className="text-muted-foreground">View your active, upcoming, and past rentals.</p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Your Rental History</CardTitle>
          <CardDescription>An overview of all your rental orders.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead className="text-right">Total Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rentals.map((rental) => (
                    <TableRow key={rental.id}>
                        <TableCell className="font-medium">{rental.product.name}</TableCell>
                        <TableCell>
                        <Badge variant={
                            rental.status === 'Returned' ? 'secondary' :
                            rental.status === 'Active' ? 'outline' : 'default'
                        } className={
                            rental.status === 'Active' ? 'bg-accent/20 border-accent/50 text-accent-foreground' : rental.status === 'Upcoming' || rental.status === 'Reserved' ? 'bg-primary/90' : ''
                        }>
                            {rental.status}
                        </Badge>
                        </TableCell>
                        <TableCell>{rental.from}</TableCell>
                        <TableCell>{rental.to}</TableCell>
                        <TableCell className="text-right">{rental.amount}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
