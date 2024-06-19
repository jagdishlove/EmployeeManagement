import { toast } from "react-toastify";
import makeRequest from "../../../../api/api";
import {
  
  GET_MY_REPORTES_FAIL,
  GET_MY_REPORTES_REQUEST,
  GET_MY_REPORTES_SUCCESS,
  
} from "./MyreorteesActionType";

const getMyReportessRequest = () => {
    return {
      type: GET_MY_REPORTES_REQUEST,
    };
  };
  
  const getMyReportessSuccess = (data) => {
    return {
      type: GET_MY_REPORTES_SUCCESS,
      payload: data,
    };
  };
  
  const getMyReportessFail = () => {
    return {
      type: GET_MY_REPORTES_FAIL,
    };
  };
export const getMyReportessAction = (data, payload) => {
    return async (dispatch) => {
      dispatch(getMyReportessRequest());
      try {
        const response = await makeRequest(
          "POST",
          "api/workspace/getMyReportees",
          {
            result: payload ? [payload] : [],
          },
          data
        );
        dispatch(getMyReportessSuccess(response));
      } catch (err) {
        dispatch(getMyReportessFail());
        toast.error(err.response.data.errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    };
  };