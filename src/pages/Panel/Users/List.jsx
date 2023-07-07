import AddIcon from '@mui/icons-material/Add'
import { Button, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid';
import { useGetUsers } from '../../../queries/users';
import { useEffect, useState } from 'react';
import { getRoleName } from '../../../roles';

const columns = [
  { field: 'first_name', headerName: 'نام', width: 150 },
  { field: 'last_name', headerName: 'نام خانوادگی', width: 150 },
  { field: 'phone_number', headerName: 'شماره تماس', width: 150 },
  { 
    field: 'role', 
    headerName: 'نقش', width: 150, 
    valueGetter: (params) => getRoleName(params.value)
  },
  { field: 'email', headerName: 'ایمیل', width: 250 },
  { field: 'created_at', headerName: 'تاریخ ثبت نام', width: 250 },
];

const initialStateVal = {
  page: 1,
  per_page: 20,
  sort_by: "created_at",
  sort_order: "DESC"
}

export const UsersList = () => {

  const [gridState, setGridState] = useState(initialStateVal)
  const {data, isLoading, isFetching, refetch} = useGetUsers(gridState)

  const setSorting = (sortingModel) => {
    if(sortingModel.length == 0){
      setGridState(prevVal => ({
        ...prevVal,
        sort_by: initialStateVal.sort_by,
        sort_order: initialStateVal.sort_order,
      }))
    }else{
      setGridState(prevVal => ({
        ...prevVal,
        sort_by: sortingModel[0].field,
        sort_order: sortingModel[0].sort,
      }))
    }

  }

  const onPageChange = (paginationModel) => {
    setGridState(prevVal => ({
      ...prevVal,
      page: paginationModel.page + 1
    }))
  }

  useEffect(() => {
    refetch()
  }, [gridState])

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <header>
          <Grid container alignItems={"center"}>
            <Grid item flexGrow={1}>
              <Typography variant="h3" component="h3">
                کاربران
              </Typography>
            </Grid>
            <Grid item flexShrink={1}>
              <Link to="/panel/users/add">
              <Button variant="outlined" startIcon={<AddIcon />}>
                اضافه نمودن
              </Button>
              </Link>
            </Grid>
          </Grid>
        </header>
      </Grid>
      <Grid item xs={12}>
        {data && <DataGrid 
          loading={isLoading || isFetching}
          getRowId={row => row.user_id}
          rows={data ? data.result : []}
          columns={columns}
          paginationModel={{
            page: gridState.page - 1,
            pageSize: gridState.per_page
          }}
          onPaginationModelChange={onPageChange}
          sortingMode="server"
          paginationMode='server'
          pageSizeOptions={[gridState.per_page]}
          rowCount={data.meta.total}
          page={gridState.page}
          sortModel={
            [{
              field: gridState.sort_by, 
              sort: gridState.sort_order.toLocaleLowerCase()
            }]
          }
          onSortModelChange={setSorting}
          initialState={{
            pagination: {
              page: gridState.page - 1,
              pageSize: gridState.per_page
            },
            sorting: {
              sortModel: [{field: gridState.sort_by, sort: gridState.sort_order.toLocaleLowerCase()}]
            }
          }}
        />}
      </Grid>
    </Grid>
  )
}