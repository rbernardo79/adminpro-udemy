import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  SharedService,
  SidebarService,
  SettingsService,
  UsuarioService,
  HospitalService,
  LoginGuardGuard,
  SubirArchivoService,
  MedicoService
} from './service.index';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [
    SharedService,
    SidebarService,
    SettingsService,
    UsuarioService,
    HospitalService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    MedicoService
  ],
  declarations: []
})
export class ServiceModule { }
