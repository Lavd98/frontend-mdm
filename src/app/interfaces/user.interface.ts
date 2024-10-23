// Interfaz para el perfil del usuario
export interface Profile {
  id: number;
  name?: string;
  isActive?: boolean;
}

// Interfaz para el usuario body
export interface UserBody extends Omit<User, 'lastLogin' | 'createdAt' | 'updatedAt' | 'profile'> {
  password?: string;
  profileId?: number;
}

// Interfaz para el usuario
export interface User {
  id?: string;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  username: string;
  email: string;
  isActive?: boolean;
  lastLogin?: string | null;
  createdAt?: string;
  updatedAt?: string;
  profile?: Profile;
}

// Interfaz principal para la respuesta de la lista de usuarios
export interface UserListResponse {
  code: number;
  success: boolean;
  message: string;
  data: User[];
}

// Interfaz para los errores (útil para respuestas de error)
export interface ErrorDetail {
  code: string;
  field?: string;
  message: string;
}

// Interfaz extendida para incluir errores en respuestas no exitosas
export interface UserListResponseWithErrors extends Omit<UserListResponse, 'data'> {
  data?: User[];
  errors?: ErrorDetail[];
}
