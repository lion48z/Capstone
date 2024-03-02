import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Form as FormikForm, Formik, FormikHelpers, FormikProps } from 'formik';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/state";
import Dropzone, { IDropzoneProps, ILayoutProps } from 'react-dropzone-uploader'



interface Values {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  location?: string;
  occupation?: string;
  picture?: File;
}

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister: Values = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: undefined,
};

const initialValuesLogin: Values = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState<"login" | "register">("login");
 
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values: Values, onSubmitProps: FormikHelpers<Values>) => {
    const formData = new FormData();
    for (const value in values) {
      const key = value as keyof Values;
      const data = values[key];
      if (data !== undefined && data instanceof Blob) {
        formData.append(key, data);
      }
    }
    
    if (values.picture) {
      formData.append("picturePath", values.picture.name);
    }

    const savedUserResponse = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      body: formData,
    });
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values: Values, onSubmitProps: FormikHelpers<Values>) => {
    try {
      const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      
      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
      
      console.log("Logged in user:", loggedIn.user);
      console.log("Token:", loggedIn.token);
  
      // Check if loggedIn is not null or undefined
      if (loggedIn) {
        console.log("Dispatching login action...");
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
  
        console.log("Navigating to /home...");
        navigate("/home");
      } else {
        console.log("Login failed: loggedIn response is null or undefined");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };
  

  const handleFormSubmit = async (values: Values, onSubmitProps: FormikHelpers<Values>) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.primary.main}`}
                  borderRadius="5px"
                  p="1rem"
                >
                 <Dropzone
                    getUploadParams={() => ({ url: 'http://localhost:3001/auth/register' })}
                    onChangeStatus={({ meta, file }, status) => {
                      if (status === 'headers_received') {
                        console.log(`${meta.name} uploaded!`);
                        setFieldValue('picture', file); // Update form field with uploaded file
                      }
                    }}
                    inputContent="Drop files here"
                    accept="image/*"
                  />
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

         
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.light,
                color: palette.primary.main,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.light,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.main,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;



