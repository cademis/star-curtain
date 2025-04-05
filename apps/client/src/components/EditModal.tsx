import { MovementTypeSelect } from "../components/MovementTypeSelect";
import { BodyPartSelect } from "../components/BodyPartSelect";
import { UnilateralToggle } from "../components/UnilateralToggle";
import { UnitToggle } from "../components/UnitToggle";
import { useTRPC } from "../utils/trpc";
import { Box, Button, Input, Modal } from "@mui/material";
import { bodyParts } from "@repo/db/schema/apparatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export function EditModal({ open, setOpen }: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [isUnilateral, setIsUnilateral] = useState(false);
  const [bodyPart, setBodyPart] = useState<string>(bodyParts[0].field);
  const [movementType, setMovementType] = useState<string>("");

  const { mutate: createApparatus } = useMutation(
    trpc.apparatus.createApparatus.mutationOptions({
      onSuccess: () => {
        const queryKey = trpc.apparatus.getApparatuses.queryKey();
        queryClient.invalidateQueries({ queryKey });
      },
    })
  );

  const handleClick = () => {
    createApparatus({ name, unit, isUnilateral, bodyPart, movementType });
    setName("");
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box mx={style}>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <UnitToggle unit={unit} setUnit={setUnit} />
          <UnilateralToggle
            isUnilateral={isUnilateral}
            setIsUnilateral={setIsUnilateral}
          />
          <BodyPartSelect bodyPart={bodyPart} setBodyPart={setBodyPart} />
          <MovementTypeSelect
            movementType={movementType}
            setMovementtype={setMovementType}
          />

          <Button onClick={handleClick}>Create</Button>
        </Box>
      </Modal>
    </>
  );
}
