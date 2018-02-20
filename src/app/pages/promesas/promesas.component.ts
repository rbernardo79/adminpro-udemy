import { Component, OnInit } from '@angular/core';
import { promise } from 'selenium-webdriver';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {


    this.contarTres().then (
        mensaje => console.log ('Terminó la promesa', mensaje)
      )
      .catch ( error => console.error ('Error en la promesa', error)  );


   }

  ngOnInit() {
  }


  contarTres(): Promise<boolean> {

      return new Promise( (resolve, reject) => {

      let contador = 0;

      let intervalo = setInterval ( () => {

        contador += 1;
        console.log ( contador );

        if ( contador === 3 ) {
          //reject('solo fue un error');
          resolve(true);
          clearInterval(intervalo);
        }

      }, 1000 );

    });
  }

}
