import { enableProdMode } from '@angular/core';

global['ENV'] = {{PROJECT_ENV}};

// if (environment.production) {
//   enableProdMode();
// }

export { AppServerModule } from './app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
