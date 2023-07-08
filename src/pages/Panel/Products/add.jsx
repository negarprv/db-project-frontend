import { Button, Grid, TextField } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { Typography} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAddNewProduct } from "../../../queries/products"

export const AddProductPage =() => {

  const { mutate}  = useAddNewProduct()
  const navitge = useNavigate()
  const {
    handleSubmit,
    control
  } = useForm({
    defaultValues: {
      title: "",
    }
  })

  const onSubmit = (data) => mutate(data, {
    onSuccess: () => {
      toast.success("محصول با موفقیت اضافه شد")
      navitge("/panel/products")
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
                  اضافه نمودن محصول
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
                    label="عنوان محصول" 
                    variant="outlined"
                    helperText={fieldState.error ? fieldState.error.message : ""}
                    error={fieldState.invalid}
                    {...field}  
                  />
                )}
              />

            </Grid>
            <Grid item xs={12}>
              <Button fullWidth size="large" variant="contained" type="submit">
                  ثبت
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}