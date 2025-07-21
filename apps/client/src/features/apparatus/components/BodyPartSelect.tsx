import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { bodyParts } from "@repo/db/schema/apparatus";

interface BodyPartSelectProps {
  bodyPart: string;
  setBodyPart: (value: string) => void;
}

export function BodyPartSelect({ bodyPart, setBodyPart }: BodyPartSelectProps) {
  const handleChange = (e: SelectChangeEvent) => {
    setBodyPart(e.target.value);
  };
  return (
    <Select
      labelId="unit"
      id="unit"
      value={bodyPart}
      label="Unit"
      onChange={handleChange}
    >
      {Object.values(bodyParts).map((value) => {
        return (
          <MenuItem key={value.field} value={value.field}>
            {value.title}
          </MenuItem>
        );
      })}
    </Select>
  );
}
