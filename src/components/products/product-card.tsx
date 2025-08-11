import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  hint: string;
}

export default function ProductCard({ name, description, price, unit, image, hint }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] w-full">
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                data-ai-hint={hint}
            />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <div className="text-lg font-bold">
          ${price} <span className="text-sm font-normal text-muted-foreground">/{unit}</span>
        </div>
        <Button>
          <CalendarDays className="mr-2 h-4 w-4" />
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}
