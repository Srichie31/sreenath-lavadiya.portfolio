import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { FlyControls } from 'three/addons/controls/FlyControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { FilmPass } from 'three/addons/postprocessing/FilmPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { filter } from 'rxjs';
import { slideInAnimation } from '../services/route-animation';
import { ResponsiveService } from './../services/responsive.service';
import { LoaderService } from './../services/loader.service';

let selectedTab: any;
let container: any;
let renderer: any;

@Component({
  selector: 'app-routing-module',
  templateUrl: './routing-module.component.html',
  styleUrl: './routing-module.component.scss',
  standalone: false,
  animations: [slideInAnimation],
})
export class RoutingModuleComponent implements OnInit {
  isMobile: boolean = false;

  constructor(
    private router: Router,
    private responsiveService: ResponsiveService,
    private loaderService: LoaderService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        selectedTab = this.router.url.substring(1);
        console.log('SelectedTab : ' + selectedTab);
        // if(selectedTab === 'skills' && container){
        //   container.removeChild(renderer.domElement)
        // }else{
        //   container.appendChild(renderer.domElement)
        // }
      });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      }

      if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.loaderService.hide();
      }
    });

    this.responsiveService.isMobile().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
    const radius = 6371;
    let SCREEN_HEIGHT = window.innerHeight;
    let SCREEN_WIDTH = window.innerWidth;
    let camera: any;
    let controls: any;
    let scene;
    let dirLight;
    let composer: EffectComposer;
    let d;
    let dPlanet;
    const clock = new THREE.Clock();

    init();

    function init() {
      container = document.getElementById('container');
      camera = new THREE.PerspectiveCamera(
        25,
        SCREEN_WIDTH / SCREEN_HEIGHT,
        50,
        1e7
      );
      camera.position.z = radius * 5;

      scene = new THREE.Scene();

      // stars

      const r = radius,
        starsGeometry = [
          new THREE.BufferGeometry(),
          new THREE.BufferGeometry(),
        ];

      const vertices1 = [];
      const vertices2 = [];

      const vertex = new THREE.Vector3();

      for (let i = 0; i < 250; i++) {
        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.multiplyScalar(r);

        vertices1.push(vertex.x, vertex.y, vertex.z);
      }

      for (let i = 0; i < 1500; i++) {
        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.multiplyScalar(r);

        vertices2.push(vertex.x, vertex.y, vertex.z);
      }

      starsGeometry[0].setAttribute(
        'position',
        new THREE.Float32BufferAttribute(vertices1, 3)
      );
      starsGeometry[1].setAttribute(
        'position',
        new THREE.Float32BufferAttribute(vertices2, 3)
      );

      const starsMaterials = [
        new THREE.PointsMaterial({
          color: 0x9c9c9c,
          size: 2,
          sizeAttenuation: false,
        }),
        new THREE.PointsMaterial({
          color: 0x9c9c9c,
          size: 1,
          sizeAttenuation: false,
        }),
        new THREE.PointsMaterial({
          color: 0x7c7c7c,
          size: 2,
          sizeAttenuation: false,
        }),
        new THREE.PointsMaterial({
          color: 0x838383,
          size: 1,
          sizeAttenuation: false,
        }),
        new THREE.PointsMaterial({
          color: 0x5a5a5a,
          size: 2,
          sizeAttenuation: false,
        }),
        new THREE.PointsMaterial({
          color: 0x5a5a5a,
          size: 1,
          sizeAttenuation: false,
        }),
      ];

      for (let i = 10; i < 30; i++) {
        const stars = new THREE.Points(
          starsGeometry[i % 2],
          starsMaterials[i % 6]
        );

        stars.rotation.x = Math.random() * 6;
        stars.rotation.y = Math.random() * 6;
        stars.rotation.z = Math.random() * 6;
        stars.scale.setScalar(i * 10);

        stars.matrixAutoUpdate = false;
        stars.updateMatrix();

        scene.add(stars);
      }
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
      renderer.setAnimationLoop(animate);
      container.appendChild(renderer.domElement);
      controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.1;

      controls.domElement = renderer.domElement;

      window.addEventListener('resize', onWindowResize);

      const renderModel = new RenderPass(scene, camera);
      const effectFilm = new FilmPass(0.35);
      const outputPass = new OutputPass();

      composer = new EffectComposer(renderer);

      composer.addPass(renderModel);
      composer.addPass(effectFilm);
      composer.addPass(outputPass);
    }

    function onWindowResize() {
      SCREEN_HEIGHT = window.innerHeight;
      SCREEN_WIDTH = window.innerWidth;

      camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
      camera.updateProjectionMatrix();

      renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
      composer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    }

    function animate() {
      const delta = clock.getDelta();
      controls.update(delta);
      composer.render(delta);
    }
  }
}
