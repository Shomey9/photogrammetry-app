import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { CesiumService } from "../services/cesium/cesium.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CesiumViewerResolver implements Resolve<any> {
  cesiumService = inject(CesiumService);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.cesiumService.initializeCesium('cesiumContainer');
  }
}