import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import { getStock } from "@/actions/_actions";
import ProductList from "@/components/product-list";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const productIds = products.map(p => p.id)
  const stock = await getStock(productIds)
  const billboard = await getBillboard("48e40b17-d479-4b0d-802e-bc98548efc91"); //copy billboard id from admin site

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard 
          data={billboard}
        />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" 
          items={products} 
          stock={stock}/>
        </div>
      </div>
    </Container>
  )
};

export default HomePage;
