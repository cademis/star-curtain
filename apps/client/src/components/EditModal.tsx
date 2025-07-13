import { Modal } from "@mui/material";
import { UpdateApparatus } from "./UpdateApparatus";

type Props = {
  selectedRow: number;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export function EditModal({ selectedRow, open, setOpen }: Props) {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <UpdateApparatus selectedRow={selectedRow} setOpen={setOpen} />
    </Modal>
  );
}
