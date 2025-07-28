import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Mail,
  Twitch,
  Twitter,
  YoutubeIcon,
} from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

const Footer = () => {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggle = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <footer className="w-full wrapper py-10 mt-8 border-t">
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 md:gap-4 gap-4">
        {/* Account */}
        <div>
          <div
            onClick={() => toggle(2)}
            className="flex justify-between items-center cursor-pointer md:cursor-default"
          >
            <h1 className="md:text-lg font-semibold">Account</h1>
            <ChevronDown
              className={cn(
                "md:hidden rotate-0 transition-all duration-200",
                openSections.includes(2) && "-rotate-90"
              )}
            />
          </div>
          <ul
            className={cn(
              "max-h-0 overflow-hidden text-sm space-y-2 mt-2 transition-all duration-200 text-primary",
              openSections.includes(2)
                ? "max-h-52 opacity-100"
                : "max-h-0 opacity-0",
              "md:max-h-full md:opacity-100 md:overflow-visible"
            )}
          >
            <li>Your account</li>
            <li>Shipping & policies</li>
            <li>Refunds & replacements</li>
            <li>Order tracking</li>
            <li>Delivery info</li>
          </ul>
        </div>
        {/* Service */}
        <div>
          <div
            onClick={() => toggle(3)}
            className="flex justify-between items-center cursor-pointer md:cursor-default"
          >
            <h1 className="md:text-lg font-semibold">Customer service</h1>
            <ChevronDown
              className={cn(
                "md:hidden rotate-0 transition-all duration-200",
                openSections.includes(3) && "-rotate-90"
              )}
            />
          </div>
          <ul
            className={cn(
              "max-h-0 overflow-hidden text-sm space-y-2 mt-2 transition-all duration-200 text-primary",
              openSections.includes(3)
                ? "max-h-52 opacity-100"
                : "max-h-0 opacity-0",
              "md:max-h-full md:opacity-100 md:overflow-visible"
            )}
          >
            <li>Payment methods</li>
            <li>Money back guarantee</li>
            <li>Refunds & replacements</li>
            <li>Product returns</li>
            <li>Support center</li>
          </ul>
        </div>

        {/* categories */}
        <div>
          <div
            onClick={() => toggle(1)}
            className="flex justify-between items-center cursor-pointer md:cursor-default"
          >
            <h1 className="md:text-lg font-semibold">Categories</h1>
            <ChevronDown
              className={cn(
                "md:hidden rotate-0 transition-all duration-200",
                openSections.includes(1) && "-rotate-90"
              )}
            />
          </div>
          <ul
            className={cn(
              "max-h-0 overflow-hidden text-sm space-y-2 mt-2 transition-all duration-200 text-primary",
              openSections.includes(1)
                ? "max-h-52 opacity-100"
                : "max-h-0 opacity-0",
              "md:max-h-full md:opacity-100 md:overflow-visible"
            )}
          >
            <li>Women's wear</li>
            <li>Men's wear</li>
            <li>Kid's wear</li>
            <li>Accessories</li>
          </ul>
        </div>

        {/* sub */}
        <div className="mt-4 lg:mt-0">
          <h1 className="md:text-lg font-semibold">Subscribe Cartzilla</h1>
          <p className="mt-2 text-sm">
            Enter your email to receive our valuable newsletters.
          </p>
          <div className="mt-2 relative">
            <Input placeholder="enter your email" className="ps-10" />
            <Mail className="absolute top-2 left-2 opacity-60 size-5" />
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-10 flex md:flex-row flex-col-reverse items-center gap-y-4 justify-between border-t border-ring pt-10 text-muted-foreground">
        <div className="">&copy; 2025 All rights reserved.</div>
        <div className="flex items-center gap-6">
          <YoutubeIcon size={18} />
          <Facebook size={18} />
          <Instagram size={18} />
          <Twitter size={18} />
          <Twitch size={18} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
