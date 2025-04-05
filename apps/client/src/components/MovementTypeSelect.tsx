import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { movementTypes } from "@repo/db/schema/apparatus";

type MovementTypeSelectProps = {
  movementType: string;
  setMovementtype: (value: string) => void;
};

export function MovementTypeSelect({
  movementType,
  setMovementtype,
}: MovementTypeSelectProps) {
  const handleChange = (e: SelectChangeEvent) => {
    setMovementtype(e.target.value);
  };
  return (
    <Select
      labelId="unit"
      id="unit"
      value={movementType}
      label="Unit"
      onChange={handleChange}
    >
      {Object.values(movementTypes).map((value) => {
        return (
          <MenuItem key={value.field} value={value.field}>
            {value.title}
          </MenuItem>
        );
      })}
    </Select>
  );
}
