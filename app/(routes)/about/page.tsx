import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import { getStock } from "@/actions/_actions";
import ProductList from "@/components/product-list";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";

export const revalidate = 0;

const AboutPage = async () => {
  const billboard = await getBillboard("48e40b17-d479-4b0d-802e-bc98548efc91"); //copy billboard id from admin site

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard 
          data={billboard}
        />
        <div className="flex flex-col gap-y-6 px-4 sm:px-6 lg:px-8 max-w-4xl m-auto">
          <h3 className="text-4xl font-bold text-black">About us</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat vel doloribus natus laboriosam? Deserunt possimus explicabo ea soluta vel eos iure iusto voluptatibus, consectetur quo cupiditate perferendis et architecto asperiores.
          </p>

          <div className="flex flex-col justify-center gap-y-4 md:grid md:grid-cols-2 pt-2">
            <img className="" src="http://placekitten.com/g/500/500" alt="founder" />
            <div className="p-4 h-fit my-auto">
            <h4 className="text-neutral-500 text-sm">&ldquo;The Labrador&rdquo;</h4>
              <h3 className="text-3xl font-bold text-black">Nathan Appleby</h3>
              <p className="text-neutral-500">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis iste sunt soluta illum, reprehenderit modi facilis minima vero incidunt ad perspiciatis voluptatum amet sed quibusdam dolorem ducimus veritatis? Rerum, eos.
              </p>
            </div>
            <img className="md:order-last" src="http://placekitten.com/g/500/500" alt="founder" />
            <div className="p-4 h-fit my-auto">
              <h4 className="text-neutral-500 text-sm">&ldquo;The Collie&ldquo;</h4>
              <h3 className="text-3xl font-bold text-black">Niall Moore</h3>
              <p className="text-neutral-500">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis iste sunt soluta illum, reprehenderit modi facilis minima vero incidunt ad perspiciatis voluptatum amet sed quibusdam dolorem ducimus veritatis? Rerum, eos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
};

export default AboutPage;
