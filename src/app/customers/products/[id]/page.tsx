
'use client'

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { Package, CalendarDays, AlertTriangle } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { products, createRental } from '@/lib/data';

export default function CustomerProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const product = products.find(p => p.id === id);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 4),
  });

  if (!product) {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold font-headline">Product Not Found</h1>
            <Card>
                <CardContent>
                <div className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg p-12 h-80">
                    <Package className="h-16 w-16 text-muted-foreground" />
                    <p className="mt-4 text-lg font-semibold">The requested product could not be found.</p>
                </div>
                </CardContent>
            </Card>
        </div>
    );
  }

  const bookedDates = [new Date(2024, 7, 12), new Date(2024, 7, 13), { from: new Date(2024, 7, 20), to: new Date(2024, 7, 25) }];

  const rentalDays = date?.from && date?.to ? Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 3600 * 24)) + 1 : 0;
  const totalPrice = rentalDays * product.price;

  const handleBooking = () => {
    if (date?.from && date?.to) {
        createRental(product.id, date.from, date.to, totalPrice);
        // In a real app, you'd show a success message and redirect.
        router.push('/customers/rentals');
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video w-full">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg border"
                    data-ai-hint={product.hint}
                />
            </div>
            <div>
                <h1 className="text-4xl font-bold font-headline">{product.name}</h1>
                <p className="text-lg text-muted-foreground mt-2">{product.description}</p>
            </div>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Select Rental Dates</CardTitle>
                    <CardDescription>Choose your pickup and return dates.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Calendar
                        mode="range"
                        disabled={[{ before: new Date() }, ...bookedDates]}
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={1}
                        className="p-0"
                        />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Price per day</span>
                        <span className="font-semibold">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Rental days</span>
                        <span className="font-semibold">{rentalDays > 0 ? rentalDays : '-'}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center text-lg">
                        <span className="font-bold">Total Price</span>
                        <span className="font-bold">${totalPrice > 0 ? totalPrice.toFixed(2) : '0.00'}</span>
                    </div>

                    {rentalDays <= 0 && (
                        <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-md">
                            <AlertTriangle className="h-4 w-4"/>
                            <span>Please select a valid date range.</span>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button className="w-full" size="lg" disabled={rentalDays <= 0} onClick={handleBooking}>
                        <CalendarDays className="mr-2 h-5 w-5" />
                        Proceed to Checkout
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
