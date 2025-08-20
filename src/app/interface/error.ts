export type TErrorSources = {
    path: string | number;
    message: string;
  }[];
  
  export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorSources: TErrorSources;
  };
  
  export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
