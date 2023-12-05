import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ShippingSelectionProps {
  onOptionChange: (shippingOption: string) => void;
}

const ShippingSelection: React.FC<ShippingSelectionProps> = ({ onOptionChange }) => {

  return (
    <div>
      <h1 className="text-xl font-bold text-black py-2">Shipping</h1>
      <RadioGroup defaultValue="A" onValueChange={onOptionChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="A" id="r1"/>
          <Label htmlFor="r1">Free Shipping - $0.00 (3-5 days)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="B" id="r2" />
          <Label htmlFor="r2">Express Shipping - £9.99 (1-2 days)</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ShippingSelection;
