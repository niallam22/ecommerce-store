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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat vel doloribus natus laboriosam? Deserunt possimus explicabo ea soluta vel eos iure iusto voluptatibus, consectetur quo cupiditate perferendis et architecto asperiores.
          </p>

          <div className=" pt-2">
            
            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It&apos;s animated by default, but you can disable it if you
                    prefer.
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
