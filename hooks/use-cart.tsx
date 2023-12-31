import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 
import { AlertTriangle } from 'lucide-react';

import { Product, Item, Stock } from '@/types';

interface CartStore {
  items: Item[];
  addItem: (data: Product, stock?: Stock) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  decreaseItemQty: (data: Product) => void;
  totalCartQty: ()=> number;
}

//persist items in cart to local storage
const useCart = create(
  persist<CartStore>((set, get) => ({
  items: [],
  totalCartQty: ()=>{
    const itemList = get().items;
    const totalQuantity = itemList.reduce((accum, item)=>accum + item.quantity,0)
    return totalQuantity
  },
  addItem: (data: Product, stock ) => {
    const itemList = get().items;
    const currentItem = itemList.find(item => item.id === data.id)
    if(stock && data.id !== stock.productId){
      return toast('Cannot add item to cart.')
    }
    const currentStock = stock? stock.stock : 100
    if (currentItem) {
      if (currentItem.quantity >= currentStock) {
        if(currentStock === 0){
          return toast.error('This product is out of stock.')
        }
        return toast.error('Cannot add more items to cart.');
      } else{
        // Update the quantity of the existing item
        set({
          items: itemList.map(item =>
            item.id === currentItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
        toast.success('Item added to cart.');
      }
    } else {
      // Add a new item to the cart if it doesn't exist
      set({
        items: [...itemList, { ...data, quantity: 1 }],
      });
      toast.success('Item added to cart.');
    }
  },
  decreaseItemQty: (data: Product) => {
    const itemList = get().items;
    const currentItem = itemList.find(item => item.id === data.id )

    if (currentItem && currentItem.quantity > 1) {
      set({
        items: itemList.map(item =>
          item.id === currentItem.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      });
      toast.success('Item removed from cart.');
    }else{
      toast.error('Cannot decrease quantity further.');
    }
  },
  removeItem: (id: string) => {
    const itemList = get().items;
    const currentItem = itemList.find(item => item.id === id )

    if(currentItem){
      set({ items: itemList.filter((item) => item.id !== id) });
      toast.success('Item removed from cart.');
    }else{
      toast.error('Cannot find item to remove.');
    }
  },
  removeAll: () => set({ items: [] }),
}), {
  name: 'cart-storage',
  storage: createJSONStorage(() => localStorage)
}));

export default useCart