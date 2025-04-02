import { Component, inject, OnInit } from '@angular/core';
import { CesiumService } from './services/cesium/cesium.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'cesium-angular-app';
  cesiumService = inject(CesiumService);

  ngOnInit() {
    tap(() => console.log('Initializing Cesium...')),
    // Initialize Cesium and subscribe to the observable to get updates
    this.cesiumService
      .initializeCesium('cesiumContainer').subscribe()

      //initializer is not working properly
  }
}
