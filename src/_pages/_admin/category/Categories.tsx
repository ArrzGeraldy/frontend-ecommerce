import SearchInput from "@/components/shared/SearchInput";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useCategories,
  useCategoryManagement,
  useDeleteCategory,
} from "@/hooks/useCategory";
import type { CategoryType } from "@/types/response";
import { useCallback, useMemo } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PaginationControl from "@/components/shared/PaginationControl";
import toast from "react-hot-toast";
import CategoryRow from "@/components/admin/category/CategoryRow";
import DialogDelete from "@/components/DialogDelete";
import Spinner from "@/components/shared/Spinner";
import { Link } from "react-router-dom";

const Categories = () => {
  const {
    // state
    filter,
    search,
    debouncedSearch,
    type,
    targetToDelete,
    openDialogDelete,

    // setter
    setSearch,
    setType,
    setOpenDialogDelete,
    setTargetToDelete,

    // handler
    handleFilter,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
  } = useCategoryManagement();

  const {
    data: categories,
    refetch,
    isLoading,
  } = useCategories({
    page: filter.page,
    search: debouncedSearch,
    type,
  });

  const { mutateAsync, isPending: loadingDelete } = useDeleteCategory();

  const handleDelete = useCallback(async () => {
    if (!targetToDelete.id) {
      toast.error("Deleted id not set");
      setOpenDialogDelete(false);
    } else {
      try {
        const status = await mutateAsync(targetToDelete.id);
        if (status == 200) {
          toast.success("Success delete category");
          refetch();
        }
        setTargetToDelete({ id: null, name: "" });
      } finally {
        setOpenDialogDelete(false);
      }
    }
  }, [mutateAsync, targetToDelete, refetch]);

  const tableRows = useMemo(() => {
    return (
      categories?.data &&
      categories.data.map((category: CategoryType, i: number) => (
        <CategoryRow
          key={category.id}
          category={category}
          i={i}
          onDelete={handleOpenDeleteDialog}
          page={filter.page}
          perPage={categories.per_page}
        />
      ))
    );
  }, [categories, filter.page]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="p-4 w-full  max-w-screen overflow-x-hidden">
      {/* header */}
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold">
            Categories {`(${categories?.total_data})`}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-2">
            Manage categories used to organize products.
          </p>
        </div>
        <Link
          className="text-sm font-medium px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          to={"/admin/categories/create"}
        >
          + Add Category
        </Link>
      </div>

      {/* filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
        <SearchInput onChange={setSearch} value={search} />
        <Select onValueChange={setType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Hierarchy" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Hierarchy</SelectLabel>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="children">Children</SelectItem>
              <SelectItem value="parent">Parent</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* content */}
      <Card className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead className="text-center w-[150px] ">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{tableRows}</TableBody>
        </Table>
        <div className="px-4 w-full flex justify-between items-center">
          <p className="text-muted-foreground text-sm w-60">
            Showing page {filter.page} of {categories?.total_page}
          </p>
          <PaginationControl
            page={filter.page}
            onChange={handleFilter}
            totalPage={categories?.total_page}
          />
        </div>
      </Card>

      {/* dialog delete category */}
      <DialogDelete
        open={openDialogDelete}
        targetToDelete={targetToDelete}
        handleClose={handleCloseDeleteDialog}
        handleDelete={handleDelete}
        loadingDelete={loadingDelete}
      />
    </div>
  );
};

export default Categories;
