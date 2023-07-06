// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

//mui
import { TextField } from "@mui/material";
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Alert } from "@mui/material";

//service
import authServices from "../redux/api/auth-service";
import { login } from "../redux/api/login";

const Login = () => {
  //   const navigate = useNavigate();

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    console.log(data);
    // transform identifier string to lowercase to avoid case sensitivity issues in login
    data.identifier = data.identifier.toLowerCase();
    dispatch(login(data));
  };

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
              Login
            </Typography>
            <Box mb={2.5}>
              <TextField
                variant="outlined"
                label="username"
                fullWidth
                autoFocus
                autoComplete="identifier"
                {...register("identifier", {
                  required: "This field is required!",
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
                label="password"
                fullWidth
                autoComplete="password"
                {...register("password", {
                  required: "This field is required!",
                })}
                error={!!errors?.password}
                helperText={errors?.password ? errors.password.message : null}
              />
            </Box>
            <Box textAlign="center">
              <Button type="submit" variant="contained">
                {loading ? "Loading..." : "Log in"}
              </Button>
              <Box mt={2}>
                {error && <Alert severity="error">{error.message}</Alert>}
              </Box>
            </Box>
          </Container>
        </Box>
      </form>
    </div>
  );
};

export default Login;
