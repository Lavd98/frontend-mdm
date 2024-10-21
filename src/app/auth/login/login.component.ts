import { Component } from '@angular/core';
import { Usuarios } from '../../interfaces/usuarios.interface';
import { LoginResponse } from '../../interfaces/login.interface';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usuario = '';
  password = '';

  usuarios!: Usuarios;

  constructor(private usuariosServices: AuthService, private router: Router) {}

  async onSubmit() {
    try {
      const response: LoginResponse = await firstValueFrom(
        this.usuariosServices.obtenerUsuarios(this.usuario, this.password)
      );
      debugger;
      if (response.code === 200 && response?.data && response?.data?.user) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            token: response.data.token,
            user:{
              id: response.data.user.id,
              userName: response.data.user.username,
              firstName: response.data.user.firstName,
              paternalSurname: response.data.user.paternalSurname,
              maternalSurname: response.data.user.maternalSurname,
              profile: response.data.user.profile,
            }
          })
        );
        await this.router.navigate(['/dashboard']);
      } else {
        await Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'El usuario no registrado en la base de datos',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      await Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Ocurrió un error durante el inicio de sesión',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
