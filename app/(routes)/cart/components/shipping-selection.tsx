import Currency from "@/components/ui/currency";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { shippingOptions } from "./shipping-options";

interface ShippingSelectionProps {
  shippingOption: string;
}

const ShippingSelection: React.FC<ShippingSelectionProps> = ({ shippingOption }) => {
  console.log('SHIPPING OPTIN', shippingOption)
  const shippingOptionInfo = shippingOptions.find((item)=> item.option === shippingOption)
  return (
    <div>
      <h1 className="text-xl font-bold text-black pt-2">Shipping</h1>
      <span className="text-sm">(Free shipping on orders over £20)</span>
      <div className="py-2">

        <RadioGroup >
          {shippingOptionInfo &&
            <div 
            className="flex items-center space-x-2">
            <RadioGroupItem 
            checked={true} 
            value={shippingOptionInfo.option} 
            id="r1"/>
            <Label htmlFor="r1">{`${shippingOptionInfo.description} - ${shippingOptionInfo.duration}`}</Label><Currency value={shippingOptionInfo.shippingRate}/>
            </div>
          }
        </RadioGroup>
      </div>
    </div>
  );
};

export default ShippingSelection;
