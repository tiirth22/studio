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

const rentals = [
  { id: "ORD001", customer: "Liam Johnson", status: "Picked Up", date: "2023-06-23", amount: "$250.00" },
  { id: "ORD002", customer: "Olivia Smith", status: "Returned", date: "2023-06-24", amount: "$150.00" },
  { id: "ORD003", customer: "Noah Williams", status: "Reserved", date: "2023-06-25", amount: "$350.00" },
  { id: "ORD004", customer: "Emma Brown", status: "Picked Up", date: "2023-06-26", amount: "$450.00" },
  { id: "ORD005", customer: "Ava Jones", status: "Returned", date: "2023-06-27", amount: "$550.00" },
]

export default function RecentRentals() {
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
                    rental.status === 'Picked Up' ? 'outline' : 'default'
                  } className={
                    rental.status === 'Picked Up' ? 'bg-accent/20 border-accent/50 text-accent-foreground' : rental.status === 'Reserved' ? 'bg-primary/90' : ''
                  }>
                    {rental.status}
                  </Badge>
                </TableCell>
                <TableCell>{rental.date}</TableCell>
                <TableCell className="text-right">{rental.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
