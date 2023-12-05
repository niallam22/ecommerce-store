"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import { postCheckout } from "@/actions/_actions";

interface SummaryProps {
  isError: boolean;
  shippingInfo: {
    option: string;
    description: string;
    shippingRateId: string;
    shippingRate: string;
    duration: string;
  };
}

const Summary: React.FC<SummaryProps> = ({ isError, shippingInfo }) => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  const shippingCost = Number(shippingInfo?.shippingRate) || 0 ;
  const itemsTotal = items.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  const orderTotal = itemsTotal + shippingCost

  const onCheckout = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });
      // const response = await postCheckout(items) //server action
      
      //set search params that trigger payment success or error message
      window.location = response.data.url; 
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-bold text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Item total</div>
          <Currency value={itemsTotal} />
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div>
          <div className="text-base font-medium text-gray-600">Shipping (10 - 15 business days)</div>
          <span className="text-sm">Free shipping on orders over £20</span>
          </div>

          <Currency value={shippingCost} />
        </div>
        <div className="flex items-center justify-between border-t border-black pt-4">
          <div className="text-base text-gray-600 font-bold">Order total</div>
          <Currency value={orderTotal} />
        </div>
      </div>
      <Button onClick={onCheckout} disabled={items.length === 0 || isError} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
};

export default Summary;

