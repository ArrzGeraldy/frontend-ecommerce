import SearchInput from "@/components/shared/SearchInput";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import { useDeleteProdcut, useProducts } from "@/hooks/useProduct";
import type { Product, TargetToDeleteType } from "@/types";

import { SortProductComboBox } from "@/components/admin/product/SortProductComboBox";
import useDebounce from "@/hooks/useDebounce";
import { CategoryComboBox } from "@/components/admin/product/CategoryComboBox";
import ProductRow from "@/components/admin/product/ProductRow";
import Spinner from "@/components/shared/Spinner";
import PaginationControl from "@/components/shared/PaginationControl";
import toast from "react-hot-toast";
import DialogDelete from "@/components/DialogDelete";

const AdminProduct = () => {
  const [filter, setFilter] = useState({
    parent: "",
    sort: "",
    page: 1,
    limit: 10,
    search: "",
  });
  const debounced = useDebounce(filter.search, 800);
  const [targetToDelete, setTargetToDelete] = useState<TargetToDeleteType>({
    id: null,
    name: "",
  });

  const [openDialog, setOpenDialog] = useState(false);

  // api
  const {
    data: products,
    isLoading,
    refetch,
  } = useProducts({
    page: filter.page,
    limit: filter.limit,
    sort: filter.sort,
    search: debounced,
    parent: filter.parent,
  });

  const { mutateAsync, isPending: deleteLoading } = useDeleteProdcut();

  // handler
  const handleFilter = (name: string, value: string | number) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseDeleteDialog = useCallback(() => {
    setTargetToDelete({ id: null, name: "" });
    setOpenDialog(false);
  }, []);

  const handleOpenDeleteDialog = useCallback((id: string, name: string) => {
    setTargetToDelete({ id, name });
    setOpenDialog(true);
  }, []);

  const handleDelete = async () => {
    if (!targetToDelete.id) {
      toast.error("ID not set");
      setOpenDialog(false);
    } else {
      try {
        const status = await mutateAsync(targetToDelete.id);
        if (status === 200) {
          toast.success("Success delete product");
          setTargetToDelete({ id: null, name: "" });
          refetch();
        }
      } finally {
        setOpenDialog(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      {/* header */}
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold">
            Products {`(${products?.total_data})`}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-2">
            Manage products used to Catalog
          </p>
        </div>
        <Link
          className="text-sm font-medium px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          to={"/admin/products/create"}
        >
          + Add Product
        </Link>
      </div>
      {/* filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
        <SearchInput onChange={handleFilter} value={filter.search} />
        <div className="flex items-center gap-3">
          <CategoryComboBox value={filter.parent} onChange={handleFilter} />
          <SortProductComboBox value={filter.sort} onChange={handleFilter} />
        </div>
      </div>

      {/* content */}
      <Card className="mt-4 px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[75px]">No</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Catogory</TableHead>
              <TableHead>Sale</TableHead>
              <TableHead>Cost Price</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.data &&
              products.data.map((product: Product, i: number) => (
                <ProductRow
                  onDelete={handleOpenDeleteDialog}
                  product={product}
                  index={i}
                  page={filter.page}
                  perPage={filter.limit}
                />
              ))}
          </TableBody>
        </Table>
        <div className=" w-full flex justify-between items-center">
          <p className="text-muted-foreground text-sm w-60">
            Showing page {filter.page} of {products?.total_page}
          </p>
          <PaginationControl
            page={filter.page}
            onChange={handleFilter}
            totalPage={products?.total_page}
          />
        </div>
      </Card>

      {/* dialog */}
      <DialogDelete
        targetToDelete={targetToDelete}
        handleClose={handleCloseDeleteDialog}
        handleDelete={handleDelete}
        loadingDelete={deleteLoading}
        open={openDialog}
      />
    </div>
  );
};

export default AdminProduct;
