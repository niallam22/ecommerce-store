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
          <h3 className="text-4xl font-bold">About us</h3>
          <p>
          Welcome to Lazy Bones, where passion meets paws! Founded by Mark and Nathan, lifelong friends and avid dog enthusiasts, our store is a canine wonderland dedicated to bringing joy, excitement, and tail-wagging happiness to furry friends and their humans alike.
          </p>

          <div className="flex flex-col justify-center gap-y-4 md:grid md:grid-cols-2 pt-2">
            <img className="" src="https://asset.cloudinary.com/dv8wjbfur/95d747251f862d77a3390a745d12b2a4" alt="founder" />
            <div className="p-4 h-fit my-auto">
            <h4 className="text-neutral-500 text-sm">&ldquo;The Golden Retriever&rdquo;</h4>
              <h3 className="text-3xl font-bold">Nathan</h3>
              <p className="">
                The creative force behind Lazy Bones, Nath has always believed in the transformative power of play for dogs. With a background in design and a heart for canine companions, he strives to curate a delightful collection of toys that not only entertain but also foster the special bond between pets and their families.
              </p>
            </div>
            <img className="md:order-last" src="https://asset.cloudinary.com/dv8wjbfur/3317f0e2bd47ab3f4a5f130ad935c7e2" alt="founder" />
            <div className="p-4 h-fit my-auto">
              <h4 className="text-neutral-500 text-sm">&ldquo;The Collie&ldquo;</h4>
              <h3 className="text-3xl font-bold">Mark</h3>
              <p className="">
              Mark, the canine connoisseur, brings his extensive knowledge of dog behavior and a genuine love for furry friends to Lazy Bones. As a certified dog petter, he ensures that every toy in our store is not only fun but also safe and beneficial for your four-legged pals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
};

export default AboutPage;
