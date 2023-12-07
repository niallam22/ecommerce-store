'use client';

import React, { ReactNode, useEffect, useRef } from 'react';
import { motion, useCycle } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from "next-themes"
import { cn } from '@/lib/utils';

interface Route {
  href: string;
  label: string;
}

interface MainNavProps {
  routes: Route[];
}

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(0px at 100% 0)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const HeaderMobile: React.FC<MainNavProps> = ({routes}) => {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const { theme } = useTheme()


  const checkActiveRoutes = routes.map((route) => ({
    ...route,
    active: pathname === `/category/${route.href}`,
  }));

  return (
    <>
      <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      className={`fixed inset-0 z-50 w-full md:hidden ${
        isOpen ? '' : 'pointer-events-none'
      }`}
      ref={containerRef}
    >
      <motion.div
        className={cn("absolute inset-0 right-0 w-full")}
        style={{
          backgroundColor: theme === 'light' ? 'white' : 'rgb(6, 12, 23)',
        }}
        variants={sidebar}
      />
      </motion.nav>
    
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      className={`absolute inset-0 z-50 w-full md:hidden ${
        isOpen ? '' : 'pointer-events-none'
      }`}
      ref={containerRef}
    >
      <motion.ul
        variants={variants}
        className="absolute grid w-full gap-3 px-10 py-16"
      >
        {checkActiveRoutes.map((route, idx) => {
          const isLastItem = idx === checkActiveRoutes.length - 1; // Check if it's the last item

          return (
            <div key={idx}>

                <MenuItem>
                <Link
                    onClick={() => toggleOpen()}
                    key={route.href}
                    href={route.href}
                    className={cn(
                      'text-sm font-medium transition-colors',
                      route.active && theme === 'light' ?
                       'text-black' : 
                       route.active && theme === 'dark' ?
                       'text-white' :
                       !route.active && theme === 'light' ?
                       'text-neutral-500' :
                       'text-neutral-300'
                    )}
                  >
                    {route.label}
                  </Link>
                </MenuItem>

              {!isLastItem && (
                <MenuItem className="my-3 h-px w-full bg-gray-300" />
              )}
            </div>
          );
        })}
      </motion.ul>
      <MenuToggle toggle={toggleOpen} isOpen={isOpen} />
    </motion.nav>
    </>
  );
};

export default HeaderMobile;

const MenuToggle = ({ toggle, isOpen }: { toggle: any, isOpen: boolean }) => (
  <button
    onClick={toggle}
    className={cn(
      "pointer-events-auto absolute top-[23px] z-30",
      isOpen ? 'right-14' : 'right-40'
    )}

  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </button>
);

const Path = (props: any) => {
  const { theme } = useTheme()
  return(
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke={theme === 'light'? "hsl(0, 0%, 18%)" : 'hsl(210, 40%, 96.1%)'}
    strokeLinecap="round"
    {...props}
  />
)};

const MenuItem = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <motion.li variants={MenuItemVariants} className={className}>
      {children}
    </motion.li>
  );
};

const MenuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration: 0.02,
    },
  },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.02, delayChildren: 0.15 },
  },
  closed: {
    transition: { staggerChildren: 0.01, staggerDirection: -1 },
  },
};

const useDimensions = (ref: any) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return dimensions.current;
};
