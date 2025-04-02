import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CesiumViewerResolver } from './resolver/cesium-viewer-resolver';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    resolve: {
      cesiumViewerResolver: CesiumViewerResolver,
    },
  },
];
