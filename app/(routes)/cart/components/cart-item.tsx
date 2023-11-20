import Image from "next/image";
import { toast } from "react-hot-toast";
import { X, Plus, Minus } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Item, Stock } from "@/types";
import { cn } from "@/lib/utils";


interface CartItemProps {
  data: Item;
  stock?: Stock;
}

const CartItem: React.FC<CartItemProps> = ({
  data, stock
}) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const onReduce = () => {
    cart.decreaseItemQty(data);
  };

  const onIncrease = () => {
    cart.addItem(data, stock);
  };

  let errorMessage
  if(stock){
    errorMessage =
    stock.stock === 0 ? 'Out of stock' :
    data.quantity > stock.stock? `Max items: ${stock.stock}`
    : undefined;
  }

  return ( 
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>

        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">
              {data.name}
            </p>
          </div>
          <div className="mt-2 flex text-sm">
            <p className="text-gray-500">{data.color.name}</p>
            <p className="ml-2 border-l border-gray-200 pl-2 text-gray-500">{data.size.name}</p>
          </div>
          <div className="py-2">
            <Currency value={data.price} />
          </div>
          
          </div>
            <div className="w-fit">
              <div className="flex items-start space-x-2 w-fit mx-auto">
                <IconButton onClick={onIncrease} icon={<Plus size={15} />} />
                <IconButton onClick={onReduce} icon={<Minus size={15} />} />
              </div>
              <div 
              // className="border border-gray-200 rounded-lg my-2 p-1 text-center"
              className={cn(errorMessage?'border-red-500 text-red-500':'border-gray-200','border', 'rounded-lg', 'my-2', 'p-1', 'text-center')}
              >
                {data.quantity}
              </div>
              {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
              )}
          </div>
        </div>
      </div>
    </li>
  );
}
 
export default CartItem;
