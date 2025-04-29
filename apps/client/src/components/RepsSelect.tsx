import { TextField } from "@mui/material";

type Props = {
  reps: number;
  setReps: (value: number) => void;
};

export function RepsSelect({ reps, setReps }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setReps(value);
    }
  };
  return <TextField value={reps} onChange={handleChange} />;
}
