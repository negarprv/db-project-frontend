
import { DialogTitle, Dialog, Autocomplete, TextField, CircularProgress, Button, Grid } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSearchCosts } from '../../../queries/costs';
import { useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';

export const AddProductCost = ({open, handleClose}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [slectOpen, setSelectOpen] = useState(false)
  const debouncedValue = useDebounce(searchTerm, 500)
  const [results, setresults] = useState([])



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

  const onSubmit = (data) => console.log(data)

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
                render={({ field, fieldState }) => (
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