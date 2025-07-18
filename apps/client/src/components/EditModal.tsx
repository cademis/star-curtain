import { Modal } from "@mui/material";
import { UpdateApparatus } from "./feature/apparatus/UpdateApparatus";

type Props = {
  selectedRow: number;
  open: boolean;
  setOpen: (value: boolean) => void;
  mode: "apparatus" | "log";
};

export function EditModal({
  selectedRow,
  open,
  setOpen,
  mode = "apparatus",
}: Props) {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div>
        {mode === "apparatus" && (
          <UpdateApparatus selectedRow={selectedRow} setOpen={setOpen} />
        )}
        {mode === "log" && (
          <UpdateLog selectedRow={selectedRow} setOpen={setOpen} />
        )}
      </div>
    </Modal>
  );
}
