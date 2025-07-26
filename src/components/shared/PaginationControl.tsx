import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { SetStateAction } from "react";

type PaginationCtrlProps = {
  page: number;
  onChange: (name: string, value: string | number) => void;
  totalPage: number | undefined;
};

const PaginationControl = ({
  page,
  onChange,
  totalPage,
}: PaginationCtrlProps) => {
  return (
    <Pagination className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onChange("page", Math.max(page - 1, 1))}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="border border-primary">
            {page}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => onChange("page", Math.min(page + 1, totalPage || 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControl;
