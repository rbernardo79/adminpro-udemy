import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

  declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {

    init_plugins();
  }

  acceder () {

    this.router.navigate(['/dashboard']);

  }
}
