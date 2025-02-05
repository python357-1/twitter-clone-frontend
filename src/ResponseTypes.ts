export enum ErrorType {
  emailInvalid = "emailInvalid",
  emailInUse = "emailInUse",
  usernameInUse = "usernameInUse",
}
export interface ErrorResponse {
  types: ErrorType[];
}
