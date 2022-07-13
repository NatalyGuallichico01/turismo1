import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { GooglemapsService } from './googlemaps.service';


// eslint-disable-next-line @typescript-eslint/naming-convention
const { Geolocation } = Plugins;

declare let google: any;

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss'],
})
export class GooglemapsComponent implements OnInit {

  //coordenadas Quito
  @Input() position = {
    lat: -0.33405,
    lng: -78.45217
  };
  label = {
    titulo: 'Ubicación',
    subtitulo: 'Mi ubicación actual'
  };
  map: any;
  marker: any;
  infowindow: any;
  positionSet: any;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('map') divMap: ElementRef;

  constructor(private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private googlemapsService: GooglemapsService,
    public modalController: ModalController) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.googlemapsService.init(this.renderer, this.document).then(() => {
      this.initMap();
    }).catch((err) => {
      console.log(err);
    });
  }

  initMap() {
    const position = this.position;
    const latLng = new google.maps.LatLng(position.lat, position.lng);
    const mapOptions = {
      center: latLng,
      zoom: 15,
      disableDefaultUI: true,
      clickableIcons: false,
    };

    this.map = new google.maps.Map(this.divMap.nativeElement, mapOptions);
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: true,
    });
    this.clickHandleEvent();
    this.infowindow = new google.maps.InfoWindow();
    if (this.label.titulo.length) {
      this.addMarker(position);
      this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo);
    }
  }

  clickHandleEvent() {
    this.map.addListener('click', (event: any) => {
      const position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.addMarker(position);

    });
  }

  addMarker(position: any): void {
    const latLng = new google.maps.LatLng(position.lat, position.lng);
    this.marker.setPosition(latLng);
    this.map.panTo(position);
    this.positionSet = position;
  }

  setInfoWindow(marker: any, titulo: string, subtitulo: string) {
    const contentString = '<div id="contentInsideMap">' +
                          '<div>' +
                          '</div>' +
                          '<p style="font-weight: bold; margin-bottom: 5px;">' + titulo + '</p>' +
                          '<div id="bodyContent">' +
                          '<p class"normal m-0">'
                          + subtitulo + '</p>' +
                          '</div>' +
                          '</div>';
    this.infowindow.setContent(contentString);
    this.infowindow.open(this.map, marker);

  }

  async mylocation(){
    console.log('mylocation() click');
    Geolocation.getCurrentPosition().then((res) =>{
      console.log('mylocation() -> get');
      const position ={
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      };
      this.addMarker(position);
    });
  }

  aceptar(){
    console.log('click aceptar ->', this.positionSet);
    this.modalController.dismiss({pos: this.positionSet});
  }
}
