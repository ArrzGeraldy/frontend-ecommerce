import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TableCell, TableRow } from "@/components/ui/table";
import type { Product } from "@/types";
import { Ellipsis, Eye, Pencil, Trash2 } from "lucide-react";
import React from "react";

type ProductRowProps = {
  product: Product;
  page: number;
  perPage: number;
  index: number;
  onDelete: (id: string, name: string) => void;
};

const ProductRow = React.memo(
  ({ product, page, perPage, index, onDelete }: ProductRowProps) => {
    return (
      <TableRow key={product.id}>
        <TableCell>{(page - 1) * perPage + index + 1}</TableCell>
        <TableCell className="max-w-[180px] truncate">
          <div className="flex items-center gap-x-2">
            <img
              src={product.img_url}
              alt="product"
              className="w-12 h-12 object-cover rounded-lg"
            />
            <span className="truncate">{product.name}</span>
          </div>
        </TableCell>
        <TableCell className="max-w-[120px] gap-2 truncate ">
          {product.category.name}{" "}
          <span className="ms-2 text-xs font-medium bg-input border px-2 py-1 rounded-md w-fit max-w-[120px] truncate overflow-hidden whitespace-nowrap">
            {product.category.parent?.name}
          </span>
        </TableCell>
        <TableCell>{product.total_sale}</TableCell>
        <TableCell>{product?.cost_price}</TableCell>
        <TableCell>
          {String(product.price).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </TableCell>
        <TableCell>
          {product.discount ? (
            <span>{product.discount} %</span>
          ) : (
            <span className="text-muted-foreground">null</span>
          )}
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-between">
                View <Eye />
              </DropdownMenuItem>
              <DropdownMenuItem className="justify-between">
                Edit <Pencil />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(product.id, product.name)}
                variant="destructive"
                className="justify-between"
              >
                Delete <Trash2 />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    );
  }
);

export default ProductRow;
