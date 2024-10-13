import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModuleService } from '../services/modules.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private http: HttpClient, private moduleService: ModuleService) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userData');
    if (userId) {
      this.moduleService.obtenerModulos(userId);
    }
  }

  getUserDataPerfil(userId: string): void {
    this.http.get(`your-api-endpoint/users/${userId}`).subscribe(response => {
      console.log(response);
    });
  }
}
