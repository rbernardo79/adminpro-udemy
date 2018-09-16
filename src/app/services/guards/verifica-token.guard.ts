import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';




@Injectable()
export class VerificaTokenGuard implements CanActivate {


  constructor ( 
    public _usuarioService: UsuarioService,
    public router: Router
  ) {

  }


  canActivate():  Promise<boolean> | boolean {
    
    console.log ('Token Guard');

    let token = this._usuarioService.token;
    let payload = JSON.parse ( atob ( token.split('.')[1] ) );

    console.log ( payload );

    let expirado = this.expirado ( payload.exp );

    console.log ( expirado );

    if ( expirado ) {
      this.router.navigate (['/login']);
      return false;
    }
    
    
    return this.verificaRenueva ( payload.exp );
  }

  verificaRenueva ( fechaExp: number): Promise<boolean> {
  

  return new Promise ( (resolve, reject) => {

    let tokenExp = new Date ( fechaExp * 1000);
    // Fecha del navegador web. Lo suyo sería la hora del servidor o de la B.D
    let ahora = new Date ();
    
    // setear el token para dentro de 4 horas. La operación es 4 horas x 60 minutos x 60 segundos x 1000
    // milésimas de segundo
    ahora.setTime ( ahora.getTime() + ( 4 * 60 * 60 * 1000 ) );

    console.log ( tokenExp );
    console.log ( ahora );

    if ( tokenExp.getTime () > ahora.getTime ()) {
      resolve ( true );  
    } else {
      this._usuarioService.renuevaToken ()
          .subscribe ( () => {
            resolve (true);
          }, () => {
            this.router.navigate (['/login']);
            reject (false);
          });
    }

});



  }

  expirado ( fechaExp: number ){

    let now = new Date().getTime() / 1000;

    if ( fechaExp < now ) {
      return true;
    } else {
      return false;
    }

}

}
