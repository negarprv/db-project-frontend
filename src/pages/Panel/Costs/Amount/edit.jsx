import { Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Typography, LinearProgress } from "@mui/material";
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

import {
  useGetSingleCostAmount,
  useUpdateCostAmount,
} from "../../../../queries/amount";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


export const EditCostAmount = () => {
  let { costID } = useParams();

  const { mutate } = useUpdateCostAmount();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      created_at: "",
      unit_price: "",
    },
  });
  const { isFetching } = useGetSingleCostAmount(parseInt(costID), {
    onSuccess: (res) => {
      reset({
          created_at: new Date(res.created_at),
          unit_price: res.unit_price.replace("$", ""),
      })
    },
    refetchOnWindowFocus: false 
  });

  if (isFetching) {
    return <LinearProgress />;
  }

  const onSubmit = (data) => {
    mutate(
      {
        ...data,
        id: costID,
      },
      {
        onSuccess: () => {
          toast.success("مقدار هزینه با موفقیت به روز رسانی شد");
        },
        onError: (e) => {
          toast.error(e.response.data.message);
        },
      }
    );
  };
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <header>
          <Grid container alignItems={"center"}>
            <Grid item flexGrow={1}>
              <Typography variant="h3" component="h3">
                ویرایش مقدار هزینه
              </Typography>
            </Grid>
          </Grid>
        </header>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="unit_price"
                control={control}
                rules={{ required: "این فیلد الزامی است" }}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    label="مقدار هزینه"
                    variant="outlined"
                    type="number"
                    helperText={
                      fieldState.error ? fieldState.error.message : ""
                    }
                    error={fieldState.invalid}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="created_at"
                control={control}
                rules={{ required: "این فیلد الزامی است" }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                    <MobileDateTimePicker 
                      label="زمان" 
                      defaultValue={new Date(2022, 1, 1)}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </LocalizationProvider>
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
  );
};
