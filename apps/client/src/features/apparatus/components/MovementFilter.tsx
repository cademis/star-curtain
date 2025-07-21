import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { useState } from "react";

type Props = {
  apiRef: React.RefObject<GridApiCommunity>;
};

export function MovementFilter({ apiRef }: Props) {
  const [filter, setFilter] = useState<string | null>(null);

  const handleFilterChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: string | null
  ) => {
    setFilter(newFilter);
    if (apiRef.current) {
      if (!newFilter) {
        apiRef.current.setFilterModel({ items: [] });
      } else {
        apiRef.current.setFilterModel({
          items: [{ field: "bodyPart", operator: "equals", value: newFilter }],
        });
      }
    }
  };

  return (
    <ToggleButtonGroup
      value={filter}
      exclusive
      onChange={handleFilterChange}
      aria-label="movement filter"
      sx={{ mb: 2 }}
    >
      <ToggleButton value="push">Push</ToggleButton>
      <ToggleButton value="pull">Pull</ToggleButton>
      <ToggleButton value="legs">Legs</ToggleButton>
    </ToggleButtonGroup>
  );
}
