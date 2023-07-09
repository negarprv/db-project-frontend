
import { DialogTitle, Dialog, Autocomplete, TextField, CircularProgress, Button, Grid } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { useAddNewProductCost, useGetProductCosts } from '../../../queries/products';
import { toast } from 'react-toastify';
import { useSearchCosts } from '../../../queries/costs';

export const AddProductCost = ({open, handleClose, productID}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [slectOpen, setSelectOpen] = useState(false)
  const debouncedValue = useDebounce(searchTerm, 500)
  const [results, setresults] = useState([])

  const { mutate }  = useAddNewProductCost()
  const { data } = useGetProductCosts(productID)
  console.log(data)
  const { isFetching, refetch } = useSearchCosts(debouncedValue, {
    enabled: false,
    onSuccess: (res) => setresults(res)
  })

  useEffect(() => {
    console.log(debouncedValue)
    if(!debouncedValue){
      return
    }
    refetch()
  }, [debouncedValue])

  const {
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      cost_type: "",
      quantity: 0
    }
  })

  const onSubmit = (data) => mutate({
    quantity: data.quantity,
    cost_id: data.cost_type.id,
    product_id: parseInt(productID)
  },
  {
    onSuccess: () => {
      toast.success("هزینه با موفقیت اضافه شد")
      handleClose()
    }
  })

    return (
      <Dialog 
        onClose={handleClose} 
        open={open}
        maxWidth="md"
        fullWidth

      >
        <DialogTitle>اضافه نمودن هزینه</DialogTitle>
        <form         
          style={{
            padding:"50px"
          }} 
          onSubmit={handleSubmit(onSubmit)}
        >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                name="cost_type"
                control={control}
                rules={{ required: "این فیلد الزامی است" }}
                render={({ field }) => (
                  <Autocomplete
                    getOptionLabel={(option) => option.title}
                    onChange={(evt, newVal) => field.onChange(newVal)}
                    options={results}
                    open={slectOpen}
                    onOpen={() => {
                      setSelectOpen(true)
                    }}
                    onClose={() => {
                      setSelectOpen(false)
                    }}
                    loading={isFetching}
                    renderInput={(params) => (
                        <TextField
                          {...params}
                          label="جستجوی هزینه"
                          onChange={(e) => setSearchTerm(e.target.value)}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <Fragment>
                                {isFetching ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </Fragment>
                            ),
                          }}
                        />
                      )}
                  />
                )}
              />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="quantity"
                  control={control}
                  rules={{ required: "این فیلد الزامی است" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      fullWidth
                      label="تعداد هزینه"
                      variant="outlined"
                      type="number"
                      helperText={fieldState.error ? fieldState.error.message : ""}
                      error={fieldState.invalid}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth type="submit" variant='contained'>انتخاب</Button>
              </Grid>
            </Grid>
        </form>
      </Dialog>
    )
}