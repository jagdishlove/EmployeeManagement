import authService from "../../../lib/auth";
import { errorMessage } from "../errors/errorsAction";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  UPDATE_ACCESS_TOKEN,
} from "./loginActionTypes";

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};
const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};
export const loginFail = (error) => {
  return {
    type: LOGIN_FAIL,
    payload: error,
  };
};

export const updateAccessToken = (newAccessToken) => ({
  type: UPDATE_ACCESS_TOKEN,
  payload: newAccessToken,
});

export const login = (credentials, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());

      const result = await authService.signIn(
        credentials.userName,
        credentials.password,
      );

      const auth = {
        jwtAccessToken: result.session.access_token,
        role: result.role,
        userName:
          result.userName ||
          `${result.profile?.first_name} ${result.profile?.last_name}`,
        empId: result.empId,
      };

      dispatch(loginSuccess(auth));
      navigate("/");
    } catch (err) {
      const errorMsg = err.message || "Login failed";
      dispatch(loginFail(errorMsg));
      dispatch(errorMessage(errorMsg));
    }
  };
};

export const getRefreshToken = () => {
  return async (dispatch) => {
    try {
      const session = await authService.getSession();
      if (session) {
        const profile = session.profile;
        const auth = {
          jwtAccessToken: session.access_token,
          role: profile?.role || "USER",
          userName: profile?.first_name,
          empId: profile?.employee_id,
        };
        dispatch(loginSuccess(auth));
      }
    } catch (err) {
      dispatch(loginFail(err?.message));
      dispatch(errorMessage("Session expired"));
    }
  };
};
