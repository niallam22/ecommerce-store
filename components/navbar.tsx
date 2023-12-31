import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import getCategories from "@/actions/get-categories";
import HeaderMobile from "./header-mobile";
import { ThemeToggle } from "./theme-toggle";

const Navbar = async () => {
  const categories = await getCategories();

  const routes = categories.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
  }));

  routes.push({
    href: `/about`,
    label: 'About',
  })

  routes.push({
    href: `/contact`,
    label: 'Contact',
  })
  routes.push({
    href: `/faq`,
    label: 'FAQs',
  })

  return ( 
    <div className="">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <MainNav routes={routes} />
          
          <HeaderMobile routes={routes}/>

          <div className="ml-auto pr-4">
            <ThemeToggle />
          </div>
          
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};
 
export default Navbar;
