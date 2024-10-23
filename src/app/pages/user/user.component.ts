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
  confirmAction: string = '';
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
  filterActive: boolean = true;
  filterInactive: boolean = false;

  @ViewChild('userModal') userModal!: ElementRef;
  @ViewChild('confirmModal') confirmModal!: ElementRef;

  constructor(
    private userService: UserService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadProfiles();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users.data;
        this.filterUsers();
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.toastMessage('Error', '', 'No se pudo cargar los usuarios', 'bg-danger');
      }
    });
  }

  loadProfiles(): void {
    this.profileService.getProfiles().subscribe({
      next: (profiles) => {
        this.profiles = profiles.data;
      },
      error: (err) => {
        console.error('Error loading profiles:', err);
        this.toastMessage('Error', '', 'No se pudo cargar los perfiles', 'bg-danger');
      }
    });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const searchStr = `${user.firstName} ${user.paternalSurname} ${user.maternalSurname} ${user.username}`.toLowerCase();
      const matchesSearch = searchStr.includes(this.searchText.toLowerCase());
      const matchesActiveFilter = this.filterActive && !this.filterInactive ? user.isActive : true;
      const matchesInactiveFilter = !this.filterActive && this.filterInactive ? !user.isActive : true;
      const matchesBothFilters = this.filterActive && this.filterInactive ? true : this.filterActive || this.filterInactive;
      return matchesSearch && matchesActiveFilter && matchesInactiveFilter && matchesBothFilters;
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
      this.userService.patchUser(this.userId, this.selectedUser).subscribe({
        next: () => {
          this.loadUsers();
          this.closeModal();
          this.toastMessage('Usuario actualizado', '', 'El usuario ha sido actualizado exitosamente', 'bg-success');
        },
        error: (err) => {
          this.toastMessage('Error', '', 'No se pudo actualizar el usuario', 'bg-danger');
          console.error('Error updating user:', err);
        }
      });
    } else {
      const body: UserBody = {
        firstName: this.selectedUser.firstName,
        paternalSurname: this.selectedUser.paternalSurname,
        maternalSurname: this.selectedUser.maternalSurname,
        username: this.selectedUser.username,
        email: this.selectedUser.email,
        profileId: this.selectedUser.profileId,
      };

      this.userService.postUser(body).subscribe({
        next: () => {
          this.loadUsers();
          this.closeModal();
          this.toastMessage('Usuario creado', '', 'El usuario ha sido creado exitosamente', 'bg-success');
        },
        error: (err) => {
          this.toastMessage('Error', '', 'No se pudo crear el usuario', 'bg-danger');
          console.error('Error creating user:', err);
        }
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

  openConfirmModal(action: 'activate' | 'inactivate', user: User): void {
    this.confirmAction = action;
    this.userId = user.id || '';
    const modalEl = this.confirmModal.nativeElement;
    modalEl.style.display = 'block';
    modalEl.classList.add('in');
  }

  closeConfirmModal(): void {
    const modalEl = this.confirmModal.nativeElement;
    modalEl.style.display = 'none';
    modalEl.classList.remove('in')
  }

  confirmActivateUser(): void {
    this.userService.activateUser(this.userId).subscribe({
      next: () => {
        this.loadUsers();
        this.closeConfirmModal();
        this.toastMessage('Usuario activado', '', 'El usuario ha sido activado exitosamente', 'bg-success');
      },
      error: (err) => {
        this.toastMessage('Error', '', 'No se pudo activar el usuario', 'bg-danger');
        console.error('Error activating user:', err);
      }
    });
  }

  confirmInactivateUser(): void {
    this.userService.inactivateUser(this.userId).subscribe({
      next: () => {
        this.loadUsers();
        this.closeConfirmModal();
        this.toastMessage('Usuario inactivado', '', 'El usuario ha sido inactivado exitosamente', 'bg-success');
      },
      error: (err) => {
        this.toastMessage('Error', '', 'No se pudo inactivar el usuario', 'bg-danger');
        console.error('Error inactivating user:', err);
      }
    });
  }

  onFilterChange() {
    this.filterUsers();
  }
}
