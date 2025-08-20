import { UserRole } from '../modules/users/user.validation';
import { IGenericErrorMessage } from './error';

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};


export type IAuthUser = {
  userId: string;
  role: UserRole,
  email: string
} | null
