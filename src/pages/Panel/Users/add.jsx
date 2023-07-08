import { Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useAddNewUser } from "../../../queries/users";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddNewUserPage = () => {
  const { mutate } = useAddNewUser();
  const navitge = useNavigate();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      role: 2,
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    },
  });

  const onSubmit = (data) =>
    mutate(data, {
      onSuccess: () => {
        toast.success("هزینه با موفقیت اضافه شد");
        navitge("/panel/users");
      },
      onError: (e) => {
        toast.error(e.response.data.message);
      },
    });

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <header>
          <Grid container alignItems={"center"}>
            <Grid item flexGrow={1}>
              <Typography variant="h3" component="h3">
                اضافه نمودن کاربر جدید
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
                name="email"
                control={control}
                rules={{ required: "این فیلد الزامی است" }}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    label="ایمیل"
                    variant="outlined"
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
                name="phone_number"
                control={control}
                rules={{ required: "این فیلد الزامی است" }}
                render={({ field, fieldState }) => {
                  return (
                    <TextField
                      fullWidth
                      label="شماره تماس"
                      variant="outlined"
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                      error={fieldState.invalid}
                      // helperText={fieldState.error.message}
                      {...field}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="password"
                control={control}
                rules={{ required: "این فیلد الزامی است" }}
                render={({ field, fieldState }) => {
                  return (
                    <TextField
                      fullWidth
                      label="گذرواژه"
                      variant="outlined"
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                      error={fieldState.invalid}
                      {...field}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="confirm_pass"
                control={control}
                rules={{ required: "این فیلد الزامی است" }}
                render={({ field, fieldState }) => {
                  return (
                    <TextField
                      fullWidth
                      label="تأیید گذرواژه"
                      variant="outlined"
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                      error={fieldState.invalid}
                      {...field}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="first_name"
                control={control}
                rules={{ required: "این فیلد الزامی است" }}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    helperText={
                      fieldState.error ? fieldState.error.message : ""
                    }
                    error={fieldState.invalid}
                    label="نام"
                    variant="outlined"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="last_name"
                control={control}
                rules={{ required: "این فیلد الزامی است" }}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    helperText={
                      fieldState.error ? fieldState.error.message : ""
                    }
                    error={fieldState.invalid}
                    label="نام خانوادگی"
                    variant="outlined"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="role"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">نقش</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={field.value}
                      label="Age"
                      onChange={field.onChange}
                    >
                      <MenuItem value={2}>مسئول فروش</MenuItem>
                      <MenuItem value={3}>مسئول خرید</MenuItem>
                    </Select>
                  </FormControl>
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
  );
};
