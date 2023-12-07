import Link from "next/link";
import { Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto py-8">
        <div className="m-auto w-fit">
          <div className="flex justify-between items-center pb-2">
            <Instagram />
            <Link className="text-sm hover:decoration-solid" href="/about">About</Link>
            <Link className="text-sm hover:decoration-solid" href="/contact">Contact</Link>
            <Link className="text-sm hover:decoration-solid" href="/returns">Returns</Link>
          </div>

        <p className="text-center text-xs">
          &copy; 2023 Lazy Bones Ltd. All rights reserved.
        </p>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
