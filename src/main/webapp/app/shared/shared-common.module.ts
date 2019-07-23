import { NgModule } from '@angular/core';

import { ProyectoV1SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [ProyectoV1SharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [ProyectoV1SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ProyectoV1SharedCommonModule {}
