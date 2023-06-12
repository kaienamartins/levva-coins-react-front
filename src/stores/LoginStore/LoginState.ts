export interface LoginState {
  isLoading: boolean;
  id: string;
  name: string;
  email: string;
  token: string;
  hasError: boolean;
  errorMessage: string;
}
