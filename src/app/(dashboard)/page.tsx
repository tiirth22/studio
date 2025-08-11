import StatCard from "@/components/dashboard/stat-card";
import RecentRentals from "@/components/dashboard/recent-rentals";
import UpcomingReturns from "@/components/dashboard/upcoming-returns";
import { DollarSign, Package, Users, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome back, User!</h1>
        <p className="text-muted-foreground">Here's a snapshot of your rental business today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value="$45,231.89" icon={DollarSign} description="+20.1% from last month" />
        <StatCard title="Active Rentals" value="120" icon={Package} description="+15 since last week" />
        <StatCard title="Overdue Items" value="5" icon={AlertTriangle} description="2 more than yesterday" variant="destructive" />
        <StatCard title="New Customers" value="32" icon={Users} description="+5 this month" />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <RecentRentals />
        </div>
        <div>
            <UpcomingReturns />
        </div>
      </div>
    </div>
  )
}
