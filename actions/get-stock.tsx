import { Stock } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/batches/stock?productIds=`;

const getStock = async (productIds: string[]): Promise<Stock[]> => {
    
    const res = await fetch(`${URL}${productIds.join(',')}`);
  
  return res.json();
};

export default getStock;