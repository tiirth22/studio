'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generatePricingRules } from '@/ai/flows/generate-pricing-rules';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';

const formSchema = z.object({
  productName: z.string().min(1, 'Product name is required.'),
  rentalPeriods: z.string().min(1, 'Rental periods are required.'),
  customerSegments: z.string().min(1, 'Customer segments are required.'),
  basePrice: z.coerce.number().min(0, 'Base price must be a positive number.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function PricingRulesForm() {
  const [isPending, startTransition] = useTransition();
  const [generatedRules, setGeneratedRules] = useState('');
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: 'Professional DSLR Camera',
      rentalPeriods: 'hourly, daily, weekly, monthly',
      customerSegments: 'corporate, VIP, seasonal',
      basePrice: 50,
    },
  });

  function onSubmit(values: FormValues) {
    setGeneratedRules('');
    startTransition(async () => {
      try {
        const result = await generatePricingRules(values);
        setGeneratedRules(result.pricingRules);
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error Generating Rules',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
      }
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Pricing Input</CardTitle>
              <CardDescription>Provide details to generate pricing rules.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Mountain Bike" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rentalPeriods"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rental Periods</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., hourly, daily, weekly" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerSegments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Segments</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., corporate, VIP, seasonal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="basePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Rules
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Generated Pricing Rules</CardTitle>
          <CardDescription>AI-powered suggestions for your pricing strategy.</CardDescription>
        </CardHeader>
        <CardContent>
          {isPending && (
            <div className="flex items-center justify-center h-full min-h-64">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          {generatedRules && (
            <Textarea
              readOnly
              className="h-96 text-sm bg-muted/50 whitespace-pre-wrap"
              value={generatedRules}
            />
          )}
          {!isPending && !generatedRules && (
             <div className="flex flex-col items-center justify-center h-full min-h-64 text-center border-2 border-dashed rounded-lg">
                <Wand2 className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">Your generated rules will appear here.</p>
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
