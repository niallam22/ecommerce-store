"use client"

import { useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';
import Summary from './components/summary'
import CartItem from './components/cart-item';
import { Stock } from '@/types';
import { getStock } from '@/actions/_actions';
import ShippingSelection from './components/shipping-selection';
import { shippingOptions } from './components/shipping-options';

export const revalidate = 0;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [stock, setStock] = useState<Stock[]>();
  const [isError, setIsError] = useState(false); 
  const [shippingInfo, setShippingInfo] = useState(shippingOptions[0]);
  const cart = useCart();
  const itemsTotal = cart.items.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  useEffect(()=>{
    if(itemsTotal < 20){
      console.log('set cost shipping')
      setShippingInfo(shippingOptions[0])
    }else{
      console.log('set free shipping')
      setShippingInfo(shippingOptions[1])
    }
    
  },[itemsTotal])

  useEffect(() => {
    setIsMounted(true);
    const fetchStock = async () => {
      try {
        const itemIds = cart.items.map((item) => item.id);
        
        if (itemIds && itemIds.length > 0) {
          const stockData = await getStock(itemIds);
          setStock(stockData);
        } else {
          console.warn('No productIds to fetch stock for.');
        }
      } catch (error) {
        console.error('Error fetching stock:', error);
      }
    };
    fetchStock();
  }, [cart.items.length]);

  useEffect(()=>{
    const hasError = cart.items.some((item) => {
      const stockInfo = stock?.find((s) => s.productId === item.id);
      return !stockInfo || item.quantity > stockInfo.stock;
    });

    setIsError(hasError);
  },[stock])

  if (!isMounted) {
    return null;
  }
  
  return (
    <div className="">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && <p className="text-neutral-500">No items added to cart.</p>}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} stock={stock?.find((s) => s.productId === item.id)} />
                ))}
              </ul>
            </div>
            <Summary isError={isError} shippingInfo={shippingInfo}/>
          </div>
        </div>
      </Container>
    </div>
  )
};

export default CartPage;
