import authService from "../../../lib/auth";
import { supabase } from "../../../lib/supabase";
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
  console.log("Login action called with credentials:", credentials);
  return async (dispatch) => {
    try {
      dispatch(loginRequest());

      const result = await authService.signIn(
        credentials.userName,
        credentials.password,
      );
      console.log("Login successful:", result);

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
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

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
