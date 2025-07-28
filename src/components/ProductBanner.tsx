import { Search, ShoppingCartIcon } from "lucide-react";
import BannerOne from "@/assets/banner01.png";
import sepatu from "@/assets/sepatu.png";
import kemeja from "@/assets/kemeja.png";
import { Button } from "./ui/button";
import { toRupiah } from "@/lib/utils";

const ProductBanner = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 items-start">
      <div className="bg-muted w-full col-span-2 py-8 flex flex-col items-center rounded-lg">
        <span className="text-muted-foreground mb-2 text-sm">Sweatshirt</span>
        <h4 className="text-2xl font-medium mb-5">Color for your mood</h4>
        <div className="max-w-[320px]">
          <img src={BannerOne} />
        </div>

        <Button className="mt-8">Shop Now</Button>
      </div>

      <div className="group cursor-pointer relative overflow-hidden ">
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-white text-black p-2 rounded-full translate-x-30 group-hover:translate-0 ease-in duration-300 hover:bg-white/90">
            <Search className="size-5" />
          </div>
          <div className="bg-white text-black p-2 rounded-full mt-2 translate-x-30 group-hover:translate-0 ease-in duration-500 hover:bg-white/90">
            <ShoppingCartIcon className="size-5" />
          </div>
        </div>
        <div className="h-72 w-full relative rounded-md overflow-hidden bg-muted">
          <img src={sepatu} className="object-cover h-full w-full" />
          <span className="absolute top-0 group-hover:opacity-10 bg-black opacity-0 w-full h-full ease-in duration-200"></span>
        </div>
        <div className="text-sm mt-2 font-medium w-fit">
          <span>TEST PRODUCT --</span>
          <div className="h-[1px] w-full bg-primary scale-0 group-hover:scale-100 ease-in duration-200 origin-left"></div>
        </div>
        <div className="flex gap-2 items-center mt-1">
          <div className="text-lg font-semibold">{toRupiah(126500)}</div>
          <div className="text-sm line-through text-muted-foreground">
            {toRupiah(155000)}
          </div>
        </div>
      </div>

      <div className="group cursor-pointer relative overflow-hidden ">
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-white text-black p-2 rounded-full translate-x-30 group-hover:translate-0 ease-in duration-300 hover:bg-white/90">
            <Search className="size-5" />
          </div>
          <div className="bg-white text-black p-2 rounded-full mt-2 translate-x-30 group-hover:translate-0 ease-in duration-500 hover:bg-white/90">
            <ShoppingCartIcon className="size-5" />
          </div>
        </div>
        <div className="h-72 w-full relative rounded-md overflow-hidden bg-muted">
          <img src={kemeja} className="object-cover h-full w-full" />
          <span className="absolute top-0 group-hover:opacity-10 bg-black opacity-0 w-full h-full ease-in duration-200"></span>
        </div>
        <div className="text-sm mt-2 font-medium w-fit">
          <span>TEST PRODUCT --</span>
          <div className="h-[1px] w-full bg-primary scale-0 group-hover:scale-100 ease-in duration-200 origin-left"></div>
        </div>
        <div className="flex gap-2 items-center mt-1">
          <div className="text-lg font-semibold">{toRupiah(126500)}</div>
          <div className="text-sm line-through text-muted-foreground">
            {toRupiah(155000)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
