import { Button, Grid, TextField } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { Typography, LinearProgress } from "@mui/material"
import { useUpdateCost, useGetSingleCost } from "../../../queries/costs"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

export const EditCostPage = () => {
  let { costID } = useParams()

  const { mutate } = useUpdateCost()
  const {
    handleSubmit,
    control,
    reset,
    formState: {isDirty}
  } = useForm({
    defaultValues: {
      title: "",
    }
  })
  const { isFetching } = useGetSingleCost(
    parseInt(costID),
    {
      onSuccess: (res) => reset({
      title: res.title
      }),
      refetchOnWindowFocus: false 
    }
    
  )

  if(isFetching){
    return <LinearProgress />
  }

  const onSubmit = (data) => mutate({
    ...data,
    id: costID
  }, {
    onSuccess: () => {
      toast.success("هزینه با موفقیت به روز رسانی شد")
    },
    onError: (e) => {
      toast.error(e.response.data.message)
    }
  })



  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <header>
          <Grid container alignItems={"center"}>
            <Grid item flexGrow={1}>
              <Typography variant="h3" component="h3">
                ویرایش هزینه
              </Typography>
            </Grid>

          </Grid>
        </header>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                rules={{ required: "این فیلد الزامی است" }}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    label="عنوان هزینه"
                    variant="outlined"
                    helperText={fieldState.error ? fieldState.error.message : ""}
                    error={fieldState.invalid}
                    {...field}
                  />
                )}
              />

            </Grid>
            <Grid item xs={12}>
              <Button 
                fullWidth 
                size="large" 
                variant="contained" 
                type="submit"
                disabled={!isDirty}
              >
                ثبت
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}