import { TableCell, TableRow } from "@/components/ui/table";
import type { CategoryType } from "@/types/response";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type CategoryRowProps = {
  category: CategoryType;
  i: number;
  page: number;
  perPage: number;
  onDelete: (id: number, name: string) => void;
};

const CategoryRow = React.memo(
  ({ category, i, page, perPage, onDelete }: CategoryRowProps) => {
    return (
      <TableRow>
        <TableCell className="font-medium">
          {(page - 1) * perPage + (i + 1)}
        </TableCell>
        <TableCell className="max-w-[100px] truncate">
          {category.name}
        </TableCell>
        <TableCell>
          {category.parent ? (
            <p className="text-xs font-medium bg-input border px-2 py-1 rounded-md w-fit max-w-[120px] truncate overflow-hidden whitespace-nowrap">
              {category.parent.name}
            </p>
          ) : (
            <span className="text-muted-foreground">null</span>
          )}
        </TableCell>
        <TableCell className="text-center flex w-[150px] items-center justify-center gap-3">
          <Link
            aria-label="Edit Category"
            to={`/admin/categories/edit/${category.id}`}
            className="bg-blue-500 text-white px-2 py-1 rounded-md inline-block mt-0 w-fit"
          >
            <Pencil size={16} />
          </Link>
          <button
            aria-label={`Delete category ${category.id}`}
            onClick={() => onDelete(category.id, category.name)}
            className="bg-red-500 text-white px-2 py-1 rounded-md mt-0"
          >
            <Trash2 size={16} />
          </button>
        </TableCell>
      </TableRow>
    );
  }
);

export default CategoryRow;
