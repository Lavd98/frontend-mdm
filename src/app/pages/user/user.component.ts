import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User, UserBody } from '../../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { ProfileService } from '../services/profile.service'; // Importar el servicio de perfiles
import { Profile } from '../../interfaces/profile.interface'; // Importar la interfaz de perfil

declare var $:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})


export class UserComponent implements OnInit {

  users: User[] = [];
  profiles: Profile[] = []; // Nueva propiedad para almacenar los perfiles
  viewOnly: boolean = false;
  filteredUsers: User[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;
  searchText: string = '';
  passwordVisible: boolean = false;
  selectedUser: UserBody = {
    firstName: '',
    paternalSurname: '',
    maternalSurname: '',
    username: '',
    email: '',
    password: '',
    profileId: 0,
  };
  userId: string = '';

  @ViewChild('userModal') userModal!: ElementRef;

  constructor(
    private userService: UserService,
    private profileService: ProfileService // Inyectar el servicio de perfiles
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadProfiles(); // Cargar los perfiles al iniciar el componente
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users.data;
      this.filterUsers();
    });
  }

  loadProfiles(): void {
    this.profileService.getProfiles().subscribe(profiles => {
      this.profiles = profiles.data;
    });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const searchStr = `${user.firstName} ${user.paternalSurname} ${user.maternalSurname} ${user.username}`.toLowerCase();
      return searchStr.includes(this.searchText.toLowerCase());
    });
  }

  onSearch(event: any): void {
    this.searchText = event.target.value;
    this.filterUsers();
    this.currentPage = 1;
  }

  getPaginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  openUserForm(user?: User, viewOnly: boolean = false): void {
    this.userId = '';
    this.viewOnly = viewOnly;
    if (user) {
      this.userId = user.id || '';
      this.selectedUser = {
        firstName: user.firstName || '',
        paternalSurname: user.paternalSurname || '',
        maternalSurname: user.maternalSurname || '',
        username: user.username || '',
        email: user.email || '',
        password:'',
        profileId: user.profile?.id || 0,
       };
    } else {
      this.selectedUser = {
        firstName: '',
        paternalSurname: '',
        maternalSurname: '',
        username: '',
        email: '',
        password: '',
        profileId: 0,
      };
    }

    const modalEl = this.userModal.nativeElement;
    modalEl.style.display = 'block';
    modalEl.classList.add('in');
  }

  closeModal(): void {
    const modalEl = this.userModal.nativeElement;
    modalEl.style.display = 'none';
    modalEl.classList.remove('in');
  }

  saveUser(): void {
    if (this.userId) {
      this.userService.putUser(this.userId, this.selectedUser).subscribe(() => {
        this.loadUsers();
        this.closeModal();
        this.toastMessage('Usuario actualizado', '', 'El usuario ha sido actualizado exitosamente', 'bg-success');
      });
    } else {
      this.userService.postUser(this.selectedUser).subscribe(() => {
        this.loadUsers();
        this.closeModal();
        this.toastMessage('Usuario creado', '', 'El usuario ha sido creado exitosamente', 'bg-success');
      });
    }
  }

  deleteUser(user:any): void {
    this.userId = user.id || '';
    debugger
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  toastMessage(title: string, subtitle: string, body: string, className: string): void {
    $(document).Toasts('create', {
      class: className,
      title: title,
      subtitle: subtitle,
      body: body,
      autohide: true,
      delay: 2000,
    });
  }
}
