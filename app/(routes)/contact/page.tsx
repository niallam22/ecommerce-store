import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import { getStock } from "@/actions/_actions";
import ProductList from "@/components/product-list";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import { EmailForm } from "./components/email-form";

export const revalidate = 0;

const HomePage = async () => {
  const billboard = await getBillboard("48e40b17-d479-4b0d-802e-bc98548efc91"); //copy billboard id from admin site

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard 
          data={billboard}
        />
        <div className="flex flex-col gap-y-6 px-4 sm:px-6 lg:px-8 max-w-4xl m-auto">
          <EmailForm/>
        </div>
      </div>
    </Container>
  )
};

export default HomePage;
