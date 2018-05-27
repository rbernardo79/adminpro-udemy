import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

  declare function init_plugins();
  declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

email: string;
recuerdame: boolean = false;
oauth2: any;


  constructor(public router: Router, public _usuarioService: UsuarioService ) { }

  ngOnInit() {

    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem ('email') || '';
    if ( this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit () {
    gapi.load('auth2', () => {

      this.oauth2 = gapi.auth2.init({
        client_id: '664732457411-vcu9frvi7gphdgbqccluptetq2u7r75e.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attchSignin( document.getElementById('btnGoogle'));

    });
  }

  attchSignin ( element ) {
    
    this.oauth2.attachClickHandler ( element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();

      let token = googleUser.getAuthResponse().id_token;

      
      this._usuarioService.loginGoogle (token)
          .subscribe( () => window.location.href = '#/dashboard'  );

      // console.log (token);

      // console.log(profile);

    });

  }

  acceder ( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    // console.log ( forma.valid );
    // console.log ( forma.value );

    this._usuarioService.login (usuario, forma.value.recuerdame)
          .subscribe ( resp => this.router.navigate(['/dashboard']) );

  }
}
