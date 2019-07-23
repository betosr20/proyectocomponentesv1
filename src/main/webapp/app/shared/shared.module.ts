import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProyectoV1SharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ProyectoV1SharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ProyectoV1SharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProyectoV1SharedModule {
  static forRoot() {
    return {
      ngModule: ProyectoV1SharedModule
    };
  }
}
