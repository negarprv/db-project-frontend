import { useDeleteCost } from "../../../queries/costs";
import { Tooltip, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";

const Delete = ({ id }) => {
  const { mutate } = useDeleteCost();
  const client = useQueryClient();

  return (
    <>
      <Tooltip title="حذف">
        <IconButton
          onClick={() =>
            mutate(id, {
              onSuccess: () => {
                client.invalidateQueries({ queryKey: "costs/getAll" });
                toast.success("هزینه با موفقیت حذف شد");
              },
              onError: (e) => {
                toast.error(e.response.data.message);
              },
            })
          }
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default Delete;
