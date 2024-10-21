// Interfaz para el perfil del usuario
export interface Profile {
  id?: number;
  name: string;
  isActive?: boolean;
}

// Interfaz principal para la respuesta de la lista de usuarios
export interface ProfileListResponse {
  code: number;
  success: boolean;
  message: string;
  data: Profile[];
}

// Interfaz para los errores (útil para respuestas de error)
export interface ErrorDetail {
  code: string;
  field?: string;
  message: string;
}

// Interfaz extendida para incluir errores en respuestas no exitosas
export interface ProfileListResponseWithErrors extends Omit<ProfileListResponse, 'data'> {
  data?: Profile[];
  errors?: ErrorDetail[];
}
