import { useTRPC } from "../utils/trpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GridColDef,
  GridRowId,
  GridActionsCellItem,
  useGridApiRef,
  DataGrid,
  GridCellParams,
} from "@mui/x-data-grid";

import { bodyParts, movementTypes } from "@repo/db/schema/apparatus";
import { UpdateApparatus } from "./UpdateApparatus";
import { useState } from "react";
import { Button, Modal } from "@mui/material";
import { MovementFilter } from "./MovementFilter";
import { CreateApparatus } from "./CreateApparatus";
import {
  calculateEstimatedOneRepMax,
  calculateEstimatedWeight,
} from "../utils";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const apiRef = useGridApiRef();

  const queryClient = useQueryClient();
  const trpc = useTRPC();

  const { data: rows } = useQuery(trpc.apparatus.getApparatuses.queryOptions());

  const { mutate: updateApparatus } = useMutation(
    trpc.apparatus.updateApparatus.mutationOptions({
      onSuccess: () => {
        console.log("success!");
        const queryKey = trpc.apparatus.getApparatuses.queryKey();
        queryClient.invalidateQueries({ queryKey });
      },
      onError: (err) => console.log("error", err),
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
      // editable: true,
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 130,
    },
    // {
    //   field: "baseRm",
    //   sortable: false,
    //   headerName: "5 | 10 | 15",
    //   type: "singleSelect",
    //   width: 130,
    //   valueOptions: (params) => {
    //     const result = generateReps(params.row.increment);
    //     return result;
    //   },
    //   getOptionValue: (value: unknown) =>
    //     (value as ReturnType<typeof generateReps>).map(
    //       (set) => set.find((item) => item.rm === 1)?.weight
    //     ),
    //   getOptionLabel: (value: unknown) => {
    //     const { rm5, rm10 } = value as {
    //       rm1: number;
    //       rm5: number;
    //       rm8: number;
    //       rm10: number;
    //       rm12: number;
    //       rm15: number;
    //     };
    //     return ` ${rm5} | ${rm10}`;
    //   },

    // editable: true,
    // },
    {
      field: "reps",
      headerName: "Reps",
      type: "number",
      width: 130,
      // editable: true,
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
    },
    {
      field: "weight",
      valueGetter: (_value, row) => {
        const result = calculateEstimatedWeight(row.reps, row.oneRepMax);
        return result;
      },
    },
    {
      field: "oneRepMax",
      headerName: "One Rep Max",
      width: 130,
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
      // editable: true,
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

  const handleDoubleClick = (params: GridCellParams) => {
    setSelectedRow(Number(params.id));
    setOpen(true);
  };

  const handleButtonClick = () => {
    setSelectedRow(null);
    setOpen(true);
  };

  if (!rows) {
    return <div>no data</div>;
  }

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        {selectedRow ? (
          <UpdateApparatus setOpen={setOpen} selectedRow={selectedRow} />
        ) : (
          <CreateApparatus setOpen={setOpen} />
        )}
      </Modal>
      <Button onClick={handleButtonClick}>New</Button>
      <MovementFilter apiRef={apiRef} />
      <DataGrid
        onCellDoubleClick={handleDoubleClick}
        apiRef={apiRef}
        rows={rows}
        columns={columns}
        processRowUpdate={(updatedRow /*, originalRow */) => {
          const {
            id,
            name,
            unit,
            isUnilateral,
            increment,
            bodyPart,
            movementType,
            reps,
            weight,
          } = updatedRow;

          const oneRepMax = calculateEstimatedOneRepMax(reps, weight);

          // Ensure all required fields have default values if undefined
          updateApparatus({
            oneRepMax,
            id,
            isUnilateral: isUnilateral || false,
            name: name || "",
            unit: unit || "kg",
            increment: increment || 1,
            bodyPart: bodyPart || bodyParts[0].field,
            movementType: movementType || movementTypes[0].field,
            reps,
          });
          return updatedRow;
        }}
      />
    </>
  );
}
