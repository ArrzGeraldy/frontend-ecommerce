import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { ImagePlus, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const ProductImageField = React.memo(
  ({
    onChange,
    imageFile,
  }: {
    onChange: (name: string, value: any) => void;
    imageFile: File | string;
  }) => {
    const [prevImage, setPrevImage] = useState("");
    const inputFileRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
      if (inputFileRef.current) {
        inputFileRef.current.click();
      }
    };

    useEffect(() => {
      return () => {
        if (prevImage) {
          URL.revokeObjectURL(prevImage);
        }
      };
    }, [prevImage]);

    useEffect(() => {
      if (!imageFile) {
        setPrevImage("");
      }
    }, [imageFile]);

    return (
      <Card className="px-4 col-span-4 row-span-1">
        <h4 className="font-semibold text-lg">Image</h4>
        <input
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setPrevImage(URL.createObjectURL(file));
              onChange("image", file);
            }
          }}
          className="hidden"
          ref={inputFileRef}
          type="file"
        />

        {/* <div className="grid gap-y-2"> */}
        {prevImage ? (
          <div className="w-fit relative">
            <img
              src={prevImage}
              className="w-20 h-20 object-cover rounded-lg block"
            />
            <button
              type="button"
              onClick={handleClick}
              className="px-1.5 py-1.5 rounded-full block absolute -top-3 -right-3 bg-primary text-primary-foreground hover:bg-primary/80 transition-all"
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <>
            <Button
              onClick={handleClick}
              type="button"
              size={"sm"}
              className="w-fit"
            >
              <ImagePlus /> Upload image
            </Button>
          </>
        )}

        {/* </div> */}
      </Card>
    );
  }
);

export default ProductImageField;
