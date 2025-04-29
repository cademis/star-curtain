import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Unit, UnitType } from "../constants";

type UnitSelectProps = {
  unit: UnitType;
  setUnit: React.Dispatch<React.SetStateAction<UnitType>>;
};

export function UnitToggle({ unit, setUnit }: UnitSelectProps) {
  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: UnitType | null
  ) => {
    if (newValue !== null) {
      setUnit(newValue);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={unit}
      exclusive
      onChange={handleChange}
    >
      {Object.values(Unit).map((value) => (
        <ToggleButton key={value} value={value}>
          {value.toLocaleUpperCase()}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
