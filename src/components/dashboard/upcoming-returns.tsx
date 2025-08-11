import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getUpcomingReturns } from "@/lib/data"


export default async function UpcomingReturns() {
  const upcomingReturns = await getUpcomingReturns();
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
