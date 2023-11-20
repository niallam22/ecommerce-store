"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

interface SummaryProps {
  isError: boolean;
}

const Summary: React.FC<SummaryProps> = ({ isError }) => {
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

  const shippingCost = 3.25;
  const itemsTotal = items.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);
  const subtotal = itemsTotal + shippingCost
  const vat = subtotal * 0.2;
  const orderTotal = subtotal + vat;

  const onCheckout = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: items.map((item) => item.id),
    });

    window.location = response.data.url;
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
          <div className="text-base font-medium text-gray-600">Shipping</div>
          <Currency value={shippingCost} />
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-600">VAT (20%)</div>
          <Currency value={vat} />
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
  
  // return (
  //   <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
  //     <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
  //     <div className="mt-6 space-y-4">
  //       <div className="flex items-center justify-between border-t border-gray-200 pt-4">
  //         <div className="text-base font-medium text-gray-900">Item total</div>
  //         <Currency value={itemsTotal} />
  //       </div>
  //       <div className="flex items-center justify-between border-t border-gray-200 pt-4">
  //         <div className="text-base font-medium text-gray-900">Shipping</div>
  //         <Currency value={shippingCost} />
  //       </div>
  //       <div className="flex items-center justify-between border-t border-gray-200 pt-4">
  //         <div className="text-base font-medium text-gray-900">VAT (20%)</div>
  //         <Currency value={vat} />
  //       </div>
  //       <div className="flex items-center justify-between border-t border-gray-200 pt-4">
  //         <div className="text-base font-medium text-gray-900">Order total</div>
  //         <Currency value={orderTotal} />
  //       </div>
  //     </div>
  //     <Button onClick={onCheckout} disabled={items.length === 0 || isError} className="w-full mt-6">
  //       Checkout
  //     </Button>
  //   </div>
  // );
};

export default Summary;

