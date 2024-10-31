import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterOutlet } from '@angular/router';
import { SagasService } from '../../src/app/core/services/sagas.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ButtonModule,TableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  sagas:any = {}
  constructor(
    private sagasService: SagasService,
  ){
    console.log("Entra en constructor");
    
    this.getSagas()
  }

  async getSagas(){
    console.log("Entra en funcion de sagas");
    
    this.sagasService.getAll().subscribe({
      next: (res:any) => {
        this.sagas = res;
        console.log("Respuesta: ",res);
      },
      error: (err:any) => {
        console.log("Error: ",err);
      }
    })
  }

  send(){
    console.log("Se ha enviado la info");
    
  }
  title = 'Aplicacion One piece';
}
