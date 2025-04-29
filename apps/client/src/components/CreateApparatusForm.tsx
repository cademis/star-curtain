import { z } from "zod";
import { EditForm } from "./EditForm";
import { bodyParts, createApparatusSchema } from "@repo/db/schema/apparatus";

const defaultValues: z.infer<typeof createApparatusSchema> = {
  name: "",
  unit: "kg",
  isUnilateral: false,
  baseRm: 0,
  reps: 8,
  increment: 2.5,
  movementType: "",
  bodyPart: bodyParts[0].field,
};

export function CreateApparatusForm() {
  const handleCreate = () => {
    //
  };
  return <EditForm initialValues={defaultValues} onSubmit={handleCreate} />;
}
