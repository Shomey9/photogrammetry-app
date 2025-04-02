import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { switchMap, catchError, tap, filter } from 'rxjs/operators';
import * as Cesium from 'cesium';

@Injectable({
  providedIn: 'root',
})
export class CesiumService {
  private viewer!: Cesium.Viewer;

  viewerSubject: BehaviorSubject<Cesium.Viewer | undefined> = new BehaviorSubject<Cesium.Viewer | undefined>(undefined);
  viewer$ = this.viewerSubject.asObservable();

  // Initialize the Cesium viewer and return an observable
  initializeCesium(containerId: string): Observable<Cesium.Viewer | undefined> {
    return from(
      Cesium.createWorldTerrainAsync({
        requestWaterMask: true,
        requestVertexNormals: true,
      })
    ).pipe(
      tap(() => console.log('Creating Cesium World Terrain...')),
      filter((terrainProvider) => terrainProvider !== undefined),
      tap(() => console.log('Cesium World Terrain created successfully')),
      switchMap((terrainProvider) => {
        // Initialize Cesium Viewer
        this.viewer = new Cesium.Viewer(containerId, {
          terrainProvider: terrainProvider,
          useDefaultRenderLoop: true,
          sceneMode: Cesium.SceneMode.SCENE3D,
          navigationHelpButton: false,
          infoBox: false,
          selectionIndicator: false,
          homeButton: false,
        });

        // Add OpenStreetMap imagery layer
        this.viewer.imageryLayers.addImageryProvider(
          new Cesium.OpenStreetMapImageryProvider({
            url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
          })
        );

        // Emit the initialized viewer to subscribers
        this.viewerSubject.next(this.viewer);
        return from([this.viewer]); // Emit the viewer as an observable
      }),
      catchError((error) => {
        console.error('Error initializing Cesium viewer:', error);
        this.viewerSubject.next(undefined); // Emit undefined if initialization fails
        throw error; // Re-throw the error to propagate it to subscribers
      }),
      tap(() => console.log('Cesium viewer initialized successfully'))
    );
  }
}