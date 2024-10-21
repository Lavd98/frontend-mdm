// Interfaz para el perfil
export interface Profile {
  id: number;
  name: string;
  isActive: boolean;
}

// Interfaz para el submódulo
export interface SubModule {
  id: number;
  moduleId: number;
  name: string;
  isActive: boolean;
  path: string;
}

// Interfaz para los permisos de perfil
export interface ProfilePermission {
  id: number;
  profileId: number;
  subModuleId: number;
  isActive: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  createdAt: string;
  updatedAt: string;
  profile: Profile;
  subModule: SubModule;
}

// Interfaz principal para la respuesta
export interface ProfilePermissionsResponse {
  code: number;
  success: boolean;
  message: string;
  data: ProfilePermission[];
}

// Interfaz para los errores (útil para respuestas de error)
export interface ErrorDetail {
  code: string;
  field?: string;
  message: string;
}

// Interfaz extendida para incluir errores en respuestas no exitosas
export interface LoginResponseWithErrors extends Omit<ProfilePermissionsResponse, 'data'> {
  data?: ProfilePermission;
  errors?: ErrorDetail[];
}
