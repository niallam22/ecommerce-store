'use server'

import { Item, Stock } from "@/types";
import axios from "axios";

export async function getStock(productIds: string[]): Promise<Stock[]| undefined> {
  try {
    if (!productIds || productIds.length === 0) {
      throw new Error('ProductIds are required for getStock action.');
    }
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/batches/stock?productIds=`;
    const res = await fetch(`${URL}${productIds.join(',')}`);

    if (!res.ok) {
      throw new Error(`Error fetching stock. Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error in getStock:', error);
    throw error; // Rethrow the error to return it to the calling code
  }
}

export async function postCheckout(items: Item[]) {
  try {    
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    });

    if (response.status !== 200) {
      throw new Error(`Error fetching stock. Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Error in getStock:', error);
    throw error; // Rethrow the error to return it to the calling code
  }
}
