import { useTRPC } from "../../../utils/trpc";
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
import { TRPCClientError } from "@trpc/client";
import { EditModal } from "./EditModal";

export default function ApparatusTable() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const apiRef = useGridApiRef();

  const queryClient = useQueryClient();
  const trpc = useTRPC();

  // const { data: rows } = useQuery(trpc.apparatus.getApparatuses.queryOptions());
  const { data: rows } = useQuery(trpc.log.getLogsWithApparatus.queryOptions());

  const { mutate: updateApparatus } = useMutation(
    trpc.apparatus.updateApparatus.mutationOptions({
      onSuccess: () => {
        const queryKey = trpc.log.getLogsWithApparatus.queryKey();
        console.log({ queryKey });
        queryClient.invalidateQueries({ queryKey });
      },
      onError: (err) => {
        throw new Error(
          err instanceof TRPCClientError ? err.message : "Unknown error"
        );
      },
    })
  );

  const { mutate: deleteApparatusById } = useMutation(
    trpc.apparatus.deleteApparatusById.mutationOptions({
      onSuccess: () => {
        const queryKey = trpc.log.getLogsWithApparatus.queryKey();
        queryClient.invalidateQueries({ queryKey });
      },
    })
  );

  const handleDeleteClick = (id: GridRowId) => {
    deleteApparatusById(Number(id));
  };

  const handleEditClick = (id: GridRowId) => {
    setSelectedRow(Number(id));
    setIsEditModalOpen(true);
  };

  const columns: GridColDef<NonNullable<typeof rows>[number]>[] = [
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
      field: "is_per_side",
      headerName: "Is Per Side",
      width: 130,
      type: "boolean",
    },
    {
      field: "reps",
      headerName: "Reps",
      type: "number",
      width: 130,
    },
    {
      field: "increment",
      headerName: "Increment",
      width: 130,
      type: "number",
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 130,
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
        <GridActionsCellItem
          key="edit"
          label="Edit Apparatus"
          onClick={() => handleEditClick(id)}
          showInMenu
        />,
      ],
    },
  ];

  const handleDoubleClick = (params: GridCellParams) => {
    setSelectedRow(Number(params.id));
    setIsCreateModalOpen(true);
  };

  const handleButtonClick = () => {
    setSelectedRow(null);
    setIsCreateModalOpen(true);
  };

  if (!rows) {
    return <div>no data</div>;
  }

  return (
    <>
      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        {selectedRow ? (
          <UpdateApparatus
            setOpen={setIsCreateModalOpen}
            selectedRow={selectedRow}
          />
        ) : (
          <CreateApparatus setOpen={setIsCreateModalOpen} />
        )}
      </Modal>
      {selectedRow && (
        <EditModal
          selectedRow={selectedRow}
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          mode="log"
        />
      )}
      <Button onClick={handleButtonClick}>New</Button>
      <MovementFilter apiRef={apiRef} />
      <DataGrid
        onCellDoubleClick={handleDoubleClick}
        apiRef={apiRef}
        rows={rows}
        columns={columns}
        processRowUpdate={(updatedRow /*, originalRow */) => {
          const {
            apparatus_id,
            name,
            unit,
            is_per_side,
            increment,
            starting_weight,
            bodyPart,
            movementType,
            oneRepMax,
          } = updatedRow;

          updateApparatus({
            oneRepMax,
            id: apparatus_id, // Use apparatus_id instead of log id
            is_per_side: is_per_side || false,
            name: name || "",
            unit: unit || "kg",
            increment: increment || 1,
            bodyPart: bodyPart || bodyParts[0].field,
            movementType: movementType || movementTypes[0].field,
            starting_weight,
          });
          return updatedRow;
        }}
      />
    </>
  );
}
