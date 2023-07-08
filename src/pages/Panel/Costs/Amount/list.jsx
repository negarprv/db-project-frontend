import AddIcon from "@mui/icons-material/Add";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useGetCostsAmount } from "../../../../queries/amount";
import { useEffect, useState } from "react";
import { Tooltip, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import Delete from "../delete";

const columns = [
  { field: "unit_price", headerName: "مقدار", width: 150 },
  {
    field: "created_at",
    valueFormatter: (params) => {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return params.value.toLocaleString("fa-IR", options);
    },
    valueGetter: (params) => {
      return new Date(params.value);
    },
    headerName: "تاریخ ثبت",
    width: 250,
    type: "dateTime",
  },
  {
    field: "id",
    headerName: "عملیات",
    flex: 1,
    sortable: false,
    renderCell: (params) => {
      return (
        <div className="actions">
          <Delete id={params.value} />

          <Tooltip title="ویرایش">
            <Link to={`/panel/costs/amount/edit/${params.value}`}>
              <IconButton>
                <Edit />
              </IconButton>
            </Link>
          </Tooltip>
        </div>
      );
    },
  },
];

const initialStateVal = {
  page: 1,
  per_page: 20,
  sort_by: "created_at",
  sort_order: "DESC",
};

export const CostAmountList = () => {
  const { costID } = useParams();
  const [gridState, setGridState] = useState(initialStateVal);
  const { data, isLoading, isFetching, refetch } = useGetCostsAmount(
    costID,
    gridState
  );

  const setSorting = (sortingModel) => {
    if (sortingModel.length == 0) {
      setGridState((prevVal) => ({
        ...prevVal,
        sort_by: initialStateVal.sort_by,
        sort_order: initialStateVal.sort_order,
      }));
    } else {
      setGridState((prevVal) => ({
        ...prevVal,
        sort_by: sortingModel[0].field,
        sort_order: sortingModel[0].sort,
      }));
    }
  };

  const onPageChange = (paginationModel) => {
    setGridState((prevVal) => ({
      ...prevVal,
      page: paginationModel.page + 1,
    }));
  };

  useEffect(() => {
    refetch();
  }, [gridState]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <header>
          <Grid container alignItems={"center"}>
            <Grid item flexGrow={1}>
              <Typography variant="h3" component="h3">
                لیست مقدار روزانه هزینه ها
              </Typography>
            </Grid>
            <Grid item flexShrink={1}>
              <Link to={`/panel/costs/amount/add/${costID}`}>
                <Button variant="outlined" startIcon={<AddIcon />}>
                  اضافه نمودن
                </Button>
              </Link>
            </Grid>
          </Grid>
        </header>
      </Grid>
      <Grid item xs={12}>
        {data && (
          <DataGrid
            loading={isLoading || isFetching}
            rows={data ? data.result : []}
            columns={columns}
            paginationModel={{
              page: gridState.page - 1,
              pageSize: gridState.per_page,
            }}
            onPaginationModelChange={onPageChange}
            sortingMode="server"
            paginationMode="server"
            pageSizeOptions={[gridState.per_page]}
            rowCount={data.meta.total}
            page={gridState.page}
            sortModel={[
              {
                field: gridState.sort_by,
                sort: gridState.sort_order.toLocaleLowerCase(),
              },
            ]}
            onSortModelChange={setSorting}
            initialState={{
              pagination: {
                page: gridState.page - 1,
                pageSize: gridState.per_page,
              },
              sorting: {
                sortModel: [
                  {
                    field: gridState.sort_by,
                    sort: gridState.sort_order.toLocaleLowerCase(),
                  },
                ],
              },
            }}
          />
        )}
      </Grid>
    </Grid>
  );
};
