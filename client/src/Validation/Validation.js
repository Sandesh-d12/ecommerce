import * as yup from "yup";

export const SignInValidation = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(3, "Password should be of minimum 3 characters length")
    .required("Password is required"),
});

export const SignUpValidation = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string("Enter your password")
    .min(3, "Password should be of minimum 3 characters length")
    .required("Password is required"),
    confirmPassword: yup
      .string('Confirm your password')
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
});


export const OrderValidation = yup.object().shape({
  paymentType: yup.string().required("Payment Type is required!"),
  locationType: yup.string().required("Location Type is required!"),
  country: yup.string().required("Country is required!"),
  district: yup.string().required("District is required!"),
  town: yup.string().required("Town is required!"),
  houseNumber: yup.number().required("House Number is required!"),

})

export const SearchOrder = yup.object().shape({
orderId:yup.string().required("orderId is required")
})