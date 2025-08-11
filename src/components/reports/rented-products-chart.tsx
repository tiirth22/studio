'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const chartData = [
  { month: 'January', rentals: 245 },
  { month: 'February', rentals: 289 },
  { month: 'March', rentals: 342 },
  { month: 'April', rentals: 310 },
  { month: 'May', rentals: 398 },
  { month: 'June', rentals: 412 },
];

const chartConfig = {
    rentals: {
        label: "Rentals",
        color: "hsl(var(--primary))",
    }
} satisfies ChartConfig;

export default function RentedProductsChart() {
  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <Tooltip 
                    cursor={{ fill: 'hsl(var(--accent) / 0.2)' }} 
                    content={<ChartTooltipContent indicator="dot" />} 
                />
                <Bar dataKey="rentals" fill="var(--color-rentals)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </ChartContainer>
  );
}
