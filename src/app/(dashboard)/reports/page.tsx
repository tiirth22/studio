import RentedProductsChart from "@/components/reports/rented-products-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Rental Reports</h1>
          <p className="text-muted-foreground">Insights into your rental performance.</p>
        </div>
        <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Reports
        </Button>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Most Rented Products</CardTitle>
            <CardDescription>Top products by number of rentals in the last 6 months.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="h-[400px]">
                <RentedProductsChart />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
