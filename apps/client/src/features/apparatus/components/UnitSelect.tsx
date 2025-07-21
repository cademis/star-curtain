import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { Unit, UnitType } from "../../../constants";

interface UnitSelectProps {
  unit: UnitType;
  setUnit: React.Dispatch<React.SetStateAction<UnitType>>;
}

export function UnitSelect({ unit, setUnit }: UnitSelectProps) {
  const handleChange = (e: SelectChangeEvent) => {
    setUnit(e.target.value as UnitType);
  };
  return (
    <Select
      labelId="unit"
      id="unit"
      value={unit}
      label="Unit"
      onChange={handleChange}
    >
      {Object.values(Unit).map((value) => {
        return (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        );
      })}
    </Select>
  );
}
