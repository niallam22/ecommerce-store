import ProductCard from "@/components/ui/product-card";
import { Product, Stock } from "@/types";
import NoResults from "@/components/ui/no-results";

interface ProductListProps {
  title: string;
  items: Product[];
  stock?: Stock[];
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  items,
  stock
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} data={item} stock={stock?.find(s=>s.productId === item.id)}/>
        ))}
      </div>
    </div>
   );
}
 
export default ProductList;
