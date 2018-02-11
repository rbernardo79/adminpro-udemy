import { NgModule } from '@angular/core';

import {
  SharedService,
  SidebarService,
  SettingsService
} from './service.index';

@NgModule({
  providers: [
    SharedService,
    SidebarService,
    SettingsService
  ],
  declarations: []
})
export class ServiceModule { }
