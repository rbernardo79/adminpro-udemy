import { Component, OnInit, OnDestroy } from "@angular/core";
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from "rxjs/Rx";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  constructor() {

    this.subscripcion =  this.devuelveObservable().subscribe(
      numero => console.log("Subs", numero),
      error => console.log("Error en el obs (2)", error),
      () => console.log("El observador termino!")
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('la página se va a cerrar');
    this.subscripcion.unsubscribe();

    
  }

  devuelveObservable(): Observable<any> {
    return new Observable(observer => {
      let contador = 0;

      let intervalo = setInterval(() => {
        contador += 1;

        let salida = {
          valor: contador
        };

        observer.next(salida);
    
        // comentado sería infinito el observer porque no se "finaliza  "
        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   observer.error('Error xxxxxxxxxx');
        // }
      }, 500);
    })
      .retry(2)
      .map((resp: any) => {
        return resp.valor;
      })
      .filter((valor, index) => {
        if (valor % 2 === 1) {
          //impar
          return true;
        } else {
          //par
          return false;
        }
      });
  }
}
