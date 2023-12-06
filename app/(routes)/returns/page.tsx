import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import { getStock } from "@/actions/_actions";
import ProductList from "@/components/product-list";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import Link from "next/link";

export const revalidate = 0;

const ReturnsPage = async () => {
  const billboard = await getBillboard("48e40b17-d479-4b0d-802e-bc98548efc91"); //copy billboard id from admin site

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard 
          data={billboard}
        />
        <div className="flex flex-col gap-y-6 px-4 sm:px-6 lg:px-8 max-w-4xl m-auto">
          <h3 className="text-4xl font-bold text-black">Returns</h3>
          <p>
            We ensure all items that are posted to our customers are of the highest standard but if there is ever a need to return an item we do accept returns for a full refund. Items must be returned to us within 30 days of receipt, in an unused, condition with original tags attached for a refund of the purchase price minus any postage and packaging costs.
          </p>
          <p>
          Items marked as being reduced for having a defect, damage or any other reason will be exempt from the returns policy.
          </p>
          <p>
          Once the returned item has been received back we will process your refund within 48 hours. The refund will be processed via the same method the payment was made.
          </p>
          <p>
            To initiate your return send an email through the contact form <Link className="font-bold hover:decoration-solid" href='/contact'>here</Link>.
          </p>
        </div>
      </div>
    </Container>
  )
};

export default ReturnsPage;
