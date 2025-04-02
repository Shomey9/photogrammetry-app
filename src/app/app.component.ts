import { Component, inject, OnInit } from '@angular/core';
import { CesiumService } from './services/cesium/cesium.service';
import { tap } from 'rxjs';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cesium-angular-app';
  cesiumService = inject(CesiumService);
}
