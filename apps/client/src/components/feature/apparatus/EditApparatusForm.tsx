import {
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  FormControlLabel,
  TextField,
  MenuItem,
  Select,
  Input,
  Box,
  SxProps,
  Theme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  bodyParts,
  movementTypes,
  upsertApparatusDtoSchema,
} from "@repo/db/schema/apparatus";
import { zodResolver } from "@hookform/resolvers/zod";

const style: SxProps<Theme> = (theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
});

type Props = {
  initialValues: z.infer<typeof upsertApparatusDtoSchema>;
  onSubmit: (data: z.infer<typeof upsertApparatusDtoSchema>) => void;
  id?: number;
};

export function EditApparatusForm({ initialValues, onSubmit, id }: Props) {
  const isUpdateMode = !!id;

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof upsertApparatusDtoSchema>>({
    resolver: zodResolver(upsertApparatusDtoSchema),
    defaultValues: initialValues,
  });

  return (
    <Box sx={style} component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Name" {...register("name")} />

      {/* <FormControlLabel
        label="Unit"
        control={
          <Controller
            name="unit"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ToggleButtonGroup
                color="primary"
                value={value}
                exclusive
                onChange={(_event, newValue) => {
                  if (newValue !== null) {
                    const currentWeight = watch("weight");
                    if (currentWeight) {
                      const convertedWeight =
                        newValue === "lbs"
                          ? kgToLbs(currentWeight)
                          : lbsToKg(currentWeight);
                      setValue("weight", convertedWeight, {
                        shouldValidate: true,
                      });
                    }
                    onChange(newValue);
                  }
                }}
              >
                {Object.values(Unit).map((value) => (
                  <ToggleButton key={value} value={value}>
                    {value.toLocaleUpperCase()}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
          />
        }
      /> */}

      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          control={control}
          name="starting_weight"
          render={({ field }) => (
            <TextField label="Starting Weight" type="number" {...field} />
          )}
        />
        {/* <Controller
          control={control}
          name=""
          render={({ field }) => (
            <TextField
              label="Weight"
              type="number"
              {...field}
              slotProps={{
                input: {
                  inputProps: {
                    step: watch("increment"),
                  },
                },
              }}
            />
          )}
        /> */}

        <Controller
          control={control}
          name="increment"
          render={({ field }) => (
            <TextField label="Increment" type="number" {...field} />
          )}
        />
      </Box>

      <Controller
        control={control}
        name="oneRepMax"
        render={({ field }) => (
          <TextField label="One Rep Max" {...field} disabled />
        )}
      />

      <FormControlLabel
        label="Is Per Side"
        control={
          <Controller
            name="is_per_side"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ToggleButtonGroup
                value={value}
                exclusive
                onChange={(_event, newValue) => {
                  if (newValue !== null) {
                    onChange(newValue);
                  }
                }}
              >
                <ToggleButton value={false}>No</ToggleButton>
                <ToggleButton value={true}>Yes</ToggleButton>
              </ToggleButtonGroup>
            )}
          />
        }
      />

      <FormControl variant="standard" error={!!errors.bodyPart}>
        <FormLabel>Body Part</FormLabel>
        <Controller
          name="bodyPart"
          control={control}
          render={({ field }) => (
            <Select label="Body Part" {...field}>
              {Object.values(bodyParts).map((item) => {
                return (
                  <MenuItem key={item.field} value={item.field}>
                    {item.title}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        />
      </FormControl>

      <Controller
        control={control}
        name="movementType"
        render={({ field }) => (
          <FormControl variant="standard">
            <FormLabel>Movement Type</FormLabel>
            <Select label="Unit" {...field}>
              {Object.values(movementTypes).map((value) => {
                return (
                  <MenuItem key={value.field} value={value.field}>
                    {value.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      />

      <Input
        type="submit"
        disabled={isSubmitting}
        value={isUpdateMode ? "Update" : "Create"}
      />
    </Box>
  );
}
