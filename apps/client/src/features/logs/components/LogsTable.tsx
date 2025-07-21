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
import { useState } from "react";
import { Button, Modal } from "@mui/material";
import { MovementFilter } from "../../apparatus/components/MovementFilter";
import { EditModal } from "../../apparatus/components/EditModal";
import { UpdateLog } from "./UpdateLog";
import { CreateLog } from "./CreateLog";

export default function LogsTable() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const apiRef = useGridApiRef();

  const queryClient = useQueryClient();
  const trpc = useTRPC();

  // const { data: rows } = useQuery(trpc.apparatus.getApparatuses.queryOptions());
  const { data: rows } = useQuery(trpc.log.getLogs.queryOptions());

  const { mutate: deleteLogById } = useMutation(
    trpc.log.deleteLogById.mutationOptions({
      onSuccess: () => {
        const queryKey = trpc.log.getLogsWithApparatus.queryKey();
        queryClient.invalidateQueries({ queryKey });
      },
    })
  );

  const handleDeleteClick = (id: GridRowId) => {
    deleteLogById(Number(id));
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
      field: "weight",
      headerName: "Weight",
      width: 200,
    },
    {
      field: "sets",
      headerName: "Sets",
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
      field: "rir",
      headerName: "RIR",
      width: 130,
      type: "number",
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 130,
      type: "number",
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
        onClose={() => {
          setIsCreateModalOpen(false);
          setIsEditModalOpen(false);
        }}
      >
        {selectedRow ? (
          <UpdateLog setOpen={setIsEditModalOpen} id={selectedRow} />
        ) : (
          <CreateLog setOpen={setIsCreateModalOpen} />
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
      />
    </>
  );
}
