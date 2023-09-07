import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    try {
      const res = await axiosInstance.post(`token/`, {
        username: data.get("email"),
        password: data.get("password"),
      });
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      //decode token payload
      const token = res.data.access;
      const tokenParts = token.split(".");
      const encodedPayload = tokenParts[1];
      const decodedPayload = atob(encodedPayload);

      // get decoded data
      const payloadObject = JSON.parse(decodedPayload);
      const user_role = payloadObject.role;
      const user_id = payloadObject.user_id;
      // console.log(`data: ${JSON.stringify(decodedPayload)}`);
      // console.log(`user id: ${payloadObject.user_id}`);
      // console.log(`role ${user_role}`);

      switch (user_role) {
        case "STUDENT":
          const result = await axiosInstance.get(`users/students/${user_id}/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
          localStorage.setItem("user_data", JSON.stringify(result.data));
          navigate("/student", { replace: true });
          break;
        case "TEACHER":
          navigate("/teacher", { replace: true });
          break;
        case "ADMIN":
          navigate("/admin", { replace: true });
          break;
        default:
          break;
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, data } = error.response;
        console.log("Error status:", status);
        console.log("Error message:", data.message);
        alert("Please use a valid email and password");
        event.target.elements.email.value = "";
        event.target.elements.password.value = "";
        // Update state with the error message for displaying on the sign-in page
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error:", error.message);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
