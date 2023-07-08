// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

//mui
import { TextField } from "@mui/material";
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
// import { Alert } from "@mui/material";

//service
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { dispatchLogin, stateVal } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    // transform identifier string to lowercase to avoid case sensitivity issues in login
    data.identifier = data.identifier.toLowerCase();
    dispatchLogin(data);
  };

  if (stateVal.authenticated) {
    return <Navigate to="/panel" />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="90vh"
        >
          <Container maxWidth="xs">
            <Typography variant="h4" mb={2.5} mt={2} color="primary">
              ورود
            </Typography>
            <Box mb={2.5}>
              <TextField
                variant="outlined"
                label="ایمیل/شماره همراه"
                fullWidth
                autoFocus
                autoComplete="identifier"
                {...register("identifier", {
                  required: "این فیلد الزامی است",
                })}
                error={!!errors?.identifier}
                helperText={
                  errors?.identifier ? errors.identifier.message : null
                }
              />
            </Box>
            <Box mb={2}>
              <TextField
                variant="outlined"
                label="گذرواژه"
                fullWidth
                autoComplete="password"
                {...register("password", {
                  required: "این فیلد الزامی است",
                })}
                type="password"
                error={!!errors?.password}
                helperText={errors?.password ? errors.password.message : null}
              />
            </Box>
            <Box textAlign="center">
              <Button type="submit" variant="contained">
                {stateVal.loading ? "Loading..." : "Log in"}
              </Button>
              <Box mt={2}>
                {/* {error && <Alert severity="error">{error.message}</Alert>} */}
              </Box>
            </Box>
          </Container>
        </Box>
      </form>
    </div>
  );
};

export default Login;
