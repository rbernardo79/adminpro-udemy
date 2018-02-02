import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgreso') txtProgreso: ElementRef;

  @Input('nombreEtiqueta') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() CambioValor: EventEmitter <number> = new EventEmitter();

  constructor() {

      // console.log ('Leyenda', this.leyenda);
      // console.log ('progreso', this.progreso);
   }

  ngOnInit() {
    //   console.log ('Leyenda', this.leyenda);
    // console.log ('progreso', this.progreso);
  }

  onChanges ( valor: number ) {

    // let elemHTML: any = document.getElementsByName ('progreso')[0];
    // console.log ( this.txtProgreso );

    if ( valor >= 100 ) {
      this.progreso = 100;
    } else if ( valor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = valor;
    }

    // elemHTML.value = Number ( this.progreso );

    this.txtProgreso.nativeElement.value = this.progreso;
    this.CambioValor.emit( this.progreso );

  }

  cambiarValor ( valor: number ) {

    console.log (this.progreso);

    if (this.progreso >= 100  && valor > 0) {
      this.progreso = 100;
      return;
    }

    if (this.progreso <= 0 && valor < 0 ) {
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;

    this.CambioValor.emit( this.progreso );

    this.txtProgreso.nativeElement.focus();

  }

}
