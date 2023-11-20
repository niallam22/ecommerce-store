"use client"

import { useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';
import Summary from './components/summary'
import CartItem from './components/cart-item';
import { Stock } from '@/types';
import { getStock } from '@/actions/_actions';

export const revalidate = 0;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [stock, setStock] = useState<Stock[]>();
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
    const fetchStock = async () => {
      try {
        const itemIds = cart.items.map((item) => item.id);
        const stockData = await getStock(itemIds);
        setStock(stockData);
      } catch (error) {
        console.error('Error fetching stock:', error);
      }
    };
    fetchStock();
  }, [cart.items.length]);

  if (!isMounted) {
    return null;
  }
  
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && <p className="text-neutral-500">No items added to cart.</p>}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} stock={stock?.find((s) => s.productId === item.id)} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  )
};

export default CartPage;
