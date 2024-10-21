// Interfaz para el usuario
export interface User {
  id: string;
  username: string;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  email: string;
  profile: string;
  lastLogin: string;
}

// Interfaz para los datos de login
export interface LoginData {
  token: string;
  user: User;
}

// Interfaz principal para la respuesta de login
export interface LoginResponse {
  code: number;
  success: boolean;
  message: string;
  data: LoginData;
}

// Interfaz para los errores (útil para respuestas de error)
export interface ErrorDetail {
  code: string;
  field?: string;
  message: string;
}

// Interfaz extendida para incluir errores en respuestas no exitosas
export interface LoginResponseWithErrors extends Omit<LoginResponse, 'data'> {
  data?: LoginData;
  errors?: ErrorDetail[];
}
