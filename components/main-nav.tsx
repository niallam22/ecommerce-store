"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

interface Route {
  href: string;
  label: string;
}

interface MainNavProps {
  routes: Route[];
}

const MainNav: React.FC<MainNavProps> = ({
  routes
}) => {
  const pathname = usePathname();

  const checkActiveRoutes = routes.map((route) => ({
    ...route,
    active: pathname === route.href,
  }));

  return (
    <nav
      className="mx-6 hidden md:flex items-center space-x-4 lg:space-x-6"
    >
      {checkActiveRoutes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn('text-sm font-medium text-accent hover:text-accent-foreground transition-colors duration-300', route.active ? 'text-accent-foreground':'')}
        >
          {route.label}
        </Link>
      ))}
      
    </nav>
  )
};

export default MainNav;