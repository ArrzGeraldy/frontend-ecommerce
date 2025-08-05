import { Skeleton } from "../ui/skeleton";

const ProductGridSkeleton = ({ total = 4 }: { total?: number }) => {
  return Array.from({ length: total }).map((_, i) => (
    <div key={i}>
      <Skeleton className="h-64 w-full bg-skeleton" />
      <Skeleton className="h-4 w-3/4 mt-2 bg-skeleton" />
      <Skeleton className="h-4 w-1/3 mt-1.5 bg-skeleton" />
    </div>
  ));
};

export default ProductGridSkeleton;
