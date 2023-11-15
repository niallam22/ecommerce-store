import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 
import { AlertTriangle } from 'lucide-react';

import { Product, Item } from '@/types';

interface CartStore {
  items: Item[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  decreaseItemQty: (data: Product) => void;
}

//persist items in cart to local storage
const useCart = create(
  persist<CartStore>((set, get) => ({
  items: [],
  addItem: (data: Product) => {
    const itemList = get().items;
    const currentItem = itemList.find(item => item.id === data.id)
    
    if (currentItem) {
      if (currentItem.quantity >= 100) {
        return toast('Cannot add more items to cart.');
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
      toast.error('Cannot decrease item quantity further.');
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

export default useCart;