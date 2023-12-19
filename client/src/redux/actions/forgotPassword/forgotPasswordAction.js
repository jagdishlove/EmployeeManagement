import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import makeRequest from "../../../api/api";
import { errorMessage, resetErrorMessage } from "../errors/errorsAction";
import { getRefreshToken, login } from "../login/loginAction";
import {
  FORGOT_PASS_EMAIL_FAIL,
  FORGOT_PASS_EMAIL_REQUEST,
  FORGOT_PASS_EMAIL_SUCCESS,
  REST_PASSWORD_FAIL,
  REST_PASSWORD_REQUEST,
  REST_PASSWORD_SUCCESS,
} from "./forgotPasswordActionType";

const forgotPasswordRequest = (payload) => {
  return {
    type: FORGOT_PASS_EMAIL_REQUEST,
    payload: payload,
  };
};
const forgotPasswordSuccess = (payload) => {
  return {
    type: FORGOT_PASS_EMAIL_SUCCESS,
    payload: payload,
  };
};
const forgotPasswordFail = (payload) => {
  return {
    type: FORGOT_PASS_EMAIL_FAIL,
    payload: payload,
  };
};

const resetPasswordRequest = (payload) => {
  return {
    type: REST_PASSWORD_REQUEST,
    payload: payload,
  };
};
const resetPasswordSuccess = (payload) => {
  return {
    type: REST_PASSWORD_SUCCESS,
    payload: payload,
  };
};
const resetPasswordFail = (payload) => {
  return {
    type: REST_PASSWORD_FAIL,
    payload: payload,
  };
};
const customToastStyle = {
   fontSize: '14px',
}
export const forgotPasswordAction = (email, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(forgotPasswordRequest());
      const response = await makeRequest("POST", "/auth/otp", email);
      dispatch(forgotPasswordSuccess(response));
      localStorage.setItem("otpSealedObject", response?.otpsealedobject);
      navigate("/create-new-password", {
        state: {
          email: email,
        },
      });
      dispatch(resetErrorMessage());
      toast.info("OTP has been send to your email Id.", {
        position: toast.POSITION.TOP_CENTER,
        style: customToastStyle, // Apply the custom style
      });
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      // Handle 403 error here
      // For example, you can dispatch an action to update the state
      // indicating that the login credentials are invalid
      dispatch(forgotPasswordFail(err?.response?.data.errorMessage));
      dispatch(errorMessage(err?.response?.data.errorMessage));
    }
  };
};
export const resetPassword = (data, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(resetPasswordRequest());
      const response = await makeRequest("POST", "/auth/resetPassword", data);
      dispatch(resetPasswordSuccess(response));
      localStorage.removeItem("otpSealedObject");
      const email = localStorage.getItem("email");
      dispatch(
        login({ userName: email, password: data.newPassword }, navigate)
      );
      toast.success("Your password reset is successful.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      // Handle 403 error here
      // For example, you can dispatch an action to update the state
      // indicating that the login credentials are invalid
      dispatch(resetPasswordFail(err?.response?.data.errorMessage));
      dispatch(errorMessage(err?.response?.data.errorMessage));
    }
  };
};
