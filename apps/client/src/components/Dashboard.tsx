import { useTRPC } from "../utils/trpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GridColDef,
  GridRowId,
  GridActionsCellItem,
  useGridApiRef,
  DataGrid,
} from "@mui/x-data-grid";

import { generateReps } from "../utils/generateReps";
import { bodyParts, movementTypes } from "@repo/db/schema/apparatus";
import { EditModal } from "../components/EditModal";
import { useState } from "react";
import { Button } from "@mui/material";
import { MovementFilter } from "./MovementFilter";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  const apiRef = useGridApiRef();

  const queryClient = useQueryClient();
  const trpc = useTRPC();

  // const [name, setName] = useState("");
  // const [unit, setUnit] = useState<UnitType>(Unit.Kg);
  // const [isUnilateral, setIsUnilateral] = useState(false);
  // const [bodyPart, setBodyPart] = useState<string>(bodyParts[0].field);

  const { data: rows } = useQuery(trpc.apparatus.getApparatuses.queryOptions());

  const { mutate: updateApparatus } = useMutation(
    trpc.apparatus.updateApparatus.mutationOptions({
      onSuccess: () => {
        const queryKey = trpc.apparatus.getApparatuses.queryKey();
        queryClient.invalidateQueries({ queryKey });
      },
    })
  );

  const { mutate: deleteApparatusById } = useMutation(
    trpc.apparatus.deleteApparatusById.mutationOptions({
      onSuccess: () => {
        const queryKey = trpc.apparatus.getApparatuses.queryKey();
        queryClient.invalidateQueries({ queryKey });
      },
    })
  );

  const handleDeleteClick = (id: GridRowId) => {
    deleteApparatusById(id);
  };

  // const {} useMutation(
  //   trpc
  // )

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      type: "number",
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "isUnilateral",
      headerName: "Is Unilateral",
      // valueSetter: (value) => {
      //   return value ? "Unilateral" : "";
      // },
      width: 130,
      type: "boolean",
      editable: true,
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 130,
    },
    {
      field: "baseRm",
      sortable: false,
      headerName: "1 5 8 12 15",
      type: "singleSelect",
      width: 130,
      getOptionValue: (value: unknown) => (value as { rm8: number }).rm8,
      getOptionLabel: (value: unknown) => {
        const { rm1, rm5, rm8, rm12, rm15 } = value as {
          rm1: number;
          rm5: number;
          rm8: number;
          rm12: number;
          rm15: number;
        };
        return `${rm1} ${rm5} ${rm8} ${rm12} ${rm15}`;
      },
      valueOptions: (params) => generateReps(params.row.increment),
      editable: true,
    },
    {
      field: "brandId",
      headerName: "Brand ID",
      width: 130,
      type: "number",
    },
    {
      field: "increment",
      headerName: "Increment",
      width: 130,
      type: "number",
      editable: true,
    },
    {
      field: "movementType",
      headerName: "Movement Type",
      width: 130,
      type: "singleSelect",
      valueOptions: [...movementTypes],
      getOptionValue: (value: unknown) => (value as { field: string }).field,
      getOptionLabel: (value: unknown) => (value as { title: string }).title,
      editable: true,
    },
    {
      field: "bodyPart",
      headerName: "Body Part",
      width: 130,
      type: "singleSelect",
      valueOptions: [...bodyParts],
      getOptionValue: (value: unknown) => (value as { field: string }).field,
      getOptionLabel: (value: unknown) => (value as { title: string }).title,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: ({ id }) => [
        <GridActionsCellItem
          key="delete"
          label="Delete"
          onClick={() => handleDeleteClick(id)}
          showInMenu
        />,
      ],
    },
  ];

  if (!rows) {
    return <div>no data</div>;
  }

  return (
    <>
      <EditModal open={open} setOpen={setOpen} />
      <Button onClick={() => setOpen(true)}>New</Button>
      <MovementFilter apiRef={apiRef} />
      <DataGrid
        apiRef={apiRef}
        rows={rows}
        columns={columns}
        processRowUpdate={(updatedRow /*, originalRow */) => {
          console.log(updatedRow);
          const {
            id,
            name,
            unit,
            baseRm,
            isUnilateral,
            increment,
            bodyPart,
            movementType,
          } = updatedRow;

          // Ensure all required fields have default values if undefined
          updateApparatus({
            baseRm: baseRm || 1,
            id,
            isUnilateral: isUnilateral || false,
            name: name || "",
            unit: unit || "kg",
            increment: increment || 1,
            bodyPart: bodyPart || bodyParts[0].field,
            movementType: movementType || movementTypes[0].field,
          });
          return updatedRow;
        }}
      />
    </>
  );
}
