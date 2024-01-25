import getBillboard from "@/actions/get-billboard";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
          <h3 className="text-4xl font-bold">Frequently asked questions</h3>
          <p>
          Explore our FAQs for valuable insights into our products, cleaning instructions, and hassle-free returns, and experience customer service that puts your furry friend first.
          </p>

          <div className=" pt-2">
            
            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What sets Lazy Bones toys apart from others in the market?</AccordionTrigger>
                  <AccordionContent>
                  Lazy Bones takes pride in offering a thoughtfully selected range of toys crafted from top-notch, durable materials. Our toys are not only designed for maximum enjoyment but also to withstand the energy of even the most spirited pups, ensuring hours of laid-back play.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Are Lazy Bones toys suitable for all dog breeds and sizes?</AccordionTrigger>
                  <AccordionContent>
                  Absolutely! Recognizing that dogs come in various shapes and sizes, our collection includes toys suitable for every breed and play style. Check the product descriptions for size and play intensity recommendations to find the perfect match for your pup.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I clean Lazy Bones toys?</AccordionTrigger>
                  <AccordionContent>
                  Maintaining a tidy play environment is easy. Most of our toys can be cleaned with mild soap and water. Refer to the product details on our website for specific care instructions, or contact our customer support for personalized guidance.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What if my dog isn't a fan of the Lazy Bones toy I purchased?</AccordionTrigger>
                  <AccordionContent>
                  We understand that every dog has unique preferences. If your pup isn't thrilled with the toy you chose, fear not! We offer a hassle-free return policy. Contact our customer service team, and we'll guide you through the return process. Check out our returns policy at the bottom of the page.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

          </div>
        </div>
      </div>
    </Container>
  )
};

export default AboutPage;
