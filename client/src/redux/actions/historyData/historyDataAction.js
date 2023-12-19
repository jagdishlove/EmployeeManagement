import makeRequest from "../../../api/api";
import {
  HISTORY_DATA_FAIL,
  HISTORY_DATA_REQUEST,
  HISTORY_DATA_SUCCESS,
} from "./historyDataActionType";

const historyDataRequest = () => {
  return {
    type: HISTORY_DATA_REQUEST,
  };
};
const historyDataSuccess = (data) => {
  return {
    type: HISTORY_DATA_SUCCESS,
    payload: data,
  };
};
const historyDataFail = () => {
  return {
    type: HISTORY_DATA_FAIL,
  };
};

export const historyDataActionCreator = (params) => {
  return async (dispatch) => {
    try {
      dispatch(historyDataRequest());
      const response = await makeRequest(
        "get",
        `/api/history/2/22`,
        null,
        params
      );
      dispatch(historyDataSuccess(response));
    } catch (error) {
      dispatch(historyDataFail(error));
     
    }
  };
};
