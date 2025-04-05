import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type UnilateralToggleProps = {
  isUnilateral: boolean;
  setIsUnilateral: React.Dispatch<React.SetStateAction<boolean>>;
};

export function UnilateralToggle({
  isUnilateral,
  setIsUnilateral,
}: UnilateralToggleProps) {
  const handleChange = () => {
    setIsUnilateral(!isUnilateral);
  };
  return (
    <ToggleButtonGroup
      color="primary"
      value={isUnilateral}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value={false}>No</ToggleButton>
      <ToggleButton value={true}>Yes</ToggleButton>
    </ToggleButtonGroup>
  );
}
