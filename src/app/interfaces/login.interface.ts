// export Interfaces para la estructura anidada
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  lastLogin: string;
}

export interface LoginData {
  token: string;
  user: User;
}

// Interfaz principal para la respuesta de login
export interface LoginResponse {
  code: number;  // Cambiado a number
  success: boolean;
  message: string;
  data: LoginData | null;
}

// Interfaz para los errores (útil para respuestas de error)
export interface ErrorDetail {
  code: string;
  field?: string;
  message: string;
}

// Interfaz extendida para incluir errores en respuestas no exitosas
export interface LoginResponseWithErrors extends LoginResponse {
  errors?: ErrorDetail[];
}
