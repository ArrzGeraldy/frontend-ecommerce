import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import type { TargetToDeleteType } from "@/types";
import React, { useEffect } from "react";
import ButtonLoader from "./shared/ButtonLoader";

type DialogDeleteProps = {
  open: boolean;
  loadingDelete: boolean;
  handleClose: () => void;
  handleDelete: () => Promise<void>;
  targetToDelete: TargetToDeleteType;
};

const DialogDelete = React.memo(
  ({
    open,
    loadingDelete,
    handleClose,
    handleDelete,
    targetToDelete,
  }: DialogDeleteProps) => {
    useEffect(() => {
      console.log("dialog delete render");
    });
    return (
      <Dialog open={open}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>
              Confirm Deletion of {targetToDelete?.name}
            </DialogTitle>
            <DialogDescription>
              This category will be marked as deleted. If it has no
              dependencies, it will be removed permanently.
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full justify-end  gap-3">
            <Button disabled={loadingDelete} onClick={handleClose}>
              Cancel
            </Button>

            <ButtonLoader
              disabled={loadingDelete}
              onClick={handleDelete}
              className="w-fit mt-0 bg-red-500 text-white hover:bg-red-500/80"
            >
              Delete
            </ButtonLoader>
            {/* 
            <Button
              disabled={loadingDelete}
              onClick={handleDelete}
              className="bg-red-500 text-white hover:bg-red-500/80"
            ></Button> */}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

export default DialogDelete;
