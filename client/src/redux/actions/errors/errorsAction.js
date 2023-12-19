import { ERRORS, RESET_ERROR } from "./errorsActionTypes";

export const errorMessage = (error) => {
  return {
    type: ERRORS,
    payload: error,
  };
};
export const resetErrorMessage = () => {
  return {
    type: RESET_ERROR,
  };
};
