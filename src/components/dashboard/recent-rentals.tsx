import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getRentals } from "@/lib/data";

export default async function RecentRentals() {
  const rentals = (await getRentals()).slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Rentals</CardTitle>
        <CardDescription>An overview of your most recent rental orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rentals.map((rental) => (
              <TableRow key={rental.id}>
                <TableCell className="font-medium">{rental.id}</TableCell>
                <TableCell>{rental.customer}</TableCell>
                <TableCell>
                  <Badge variant={
                    rental.status === 'Returned' ? 'secondary' :
                    rental.status === 'Picked Up' || rental.status === 'Active' ? 'outline' : 'default'
                  } className={
                    rental.status === 'Picked Up' || rental.status === 'Active' ? 'bg-accent/20 border-accent/50 text-accent-foreground' : rental.status === 'Reserved' || rental.status === 'Upcoming' ? 'bg-primary/90' : ''
                  }>
                    {rental.status}
                  </Badge>
                </TableCell>
                <TableCell>{rental.from}</TableCell>
                <TableCell className="text-right">{rental.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
