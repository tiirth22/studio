import PricingRulesForm from '@/components/pricing-rules/pricing-rules-form';

export default function PricingRulesPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">Dynamic Pricing Rules</h1>
        <p className="text-muted-foreground">Use AI to generate optimal pricing rules for your rental products.</p>
      </div>
      <PricingRulesForm />
    </div>
  );
}
