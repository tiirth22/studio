import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const upcomingReturns = [
  { name: "DSLR Camera", customer: "Olivia Martin", dueDate: "in 2 days", avatar: "OM" },
  { name: "Camping Tent", customer: "Jackson Lee", dueDate: "in 3 days", avatar: "JL" },
  { name: "Electric Drill", customer: "Isabella Nguyen", dueDate: "in 4 days", avatar: "IN" },
  { name: "Projector", customer: "William Kim", dueDate: "in 5 days", avatar: "WK" },
  { name: "Mountain Bike", customer: "Sophia Davis", dueDate: "in 5 days", avatar: "SD" },
]

export default function UpcomingReturns() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Returns</CardTitle>
        <CardDescription>These items are due for return soon.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingReturns.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src={`https://placehold.co/40x40.png?text=${item.avatar}`} alt="Avatar" />
              <AvatarFallback>{item.avatar}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                Rented by {item.customer}
              </p>
            </div>
            <div className="ml-auto font-medium">{item.dueDate}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
