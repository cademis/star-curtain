import { Box, Tab, Tabs } from "@mui/material";
import ApparatusTable from "../../features/apparatus/components/ApparatusTable";
import { SyntheticEvent, useState } from "react";
import LogsTable from "../../features/logs/components/LogsTable";

export default function Dashboard() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Logs" />
          <Tab label="Apparatus" />
        </Tabs>
      </Box>
      {value === 0 && <LogsTable />}
      {value === 1 && <ApparatusTable />}
    </>
  );
}
