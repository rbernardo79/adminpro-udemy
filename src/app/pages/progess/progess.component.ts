import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progess',
  templateUrl: './progess.component.html',
  styles: []
})
export class ProgessComponent implements OnInit {

  porcentajeAzul: number = 1;
  porcentajeVerde: number = 20;

  constructor() { }

  ngOnInit() {
  }

  // actualizarAzul ( event: number ) {
  //   console.log ('Evento: ', event);

  //   this.porcentajeAzul = event;
  // }

  // actualizarVerde ( event: number ) {
  //   console.log ('Evento: ', event);

  //   this.porcentajeVerde = event;
  // }


 }
