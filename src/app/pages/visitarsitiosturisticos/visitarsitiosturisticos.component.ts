import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { GooglemapsComponent } from 'src/app/googlemaps/googlemaps.component';
import { Place, TiposSitios } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-visitarsitiosturisticos',
  templateUrl: './visitarsitiosturisticos.component.html',
  styleUrls: ['./visitarsitiosturisticos.component.scss'],
})
export class VisitarsitiosturisticosComponent implements OnInit {

  places: Place[] = [];
  logs: string[] = [];
  tipo: TiposSitios []=[];

  category: string;

  categoryPlace: string;





  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  selectTipo: string = '';

  newPlace: Place ={
    idS: this.firestoreService.getId(),
    nombreS: '',
    descripcionS: '',
    tipoS: null,
    ubicacionS: {
      lat: null,
      lng: null,
    },
    categoriaS: '',
    fecha: new Date(),
    referirS: '',
  };


  private path='Places/';

  constructor(public menucontroler: MenuController,
    private firestoreService: FirestoreService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalController: ModalController
  ) {

  }

  ngOnInit() {
    this.getTipo();
      }


  pushLog(msg) {
    this.logs.unshift(msg);
  }

  handleChange(e) {
    this.tipo = e.detail.value;
  }

  /* async getPlaces() {
    const loading = await this.loadingController.create();
    this.firestoreService.getCollection<Place>('Places/'+ this.tipo).subscribe(
      (res) => {
        console.log('res', res);
        if (Array.isArray(res)) {
          this.places = res as Place[];
        }
      },
      async (err) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'No se encontraron registros',
          message: err.message,
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  } */

  getTipo(){
    const path ='Tipos/';
    this.firestoreService.getCollection<TiposSitios>(path).subscribe(res=>{
      this.tipo= res;
    });
  }


    //ESTE ES EL QUE VALE
    /* getPlaces(){
    const path ='Places/';
    this.firestoreService.getCollection<Place>(path).subscribe(res=>{
      this.places= res;
      console.log('este es el resultado', res);
    });
  } */

  getPlaces(){
    const path ='Places/';
    this.firestoreService.getCollection<Place>(path).subscribe(res=>{
      this.places= res;
      console.log('este es el resultado', res);
      console.log('Category Place: ', this.categoryPlace);
      console.log('Category: ', this.category);
      if (Array.isArray(res)){
        this.places= res as Place[];
      }
    });
  }


  async openMap(positionInput) {
    const modalAdd = await this.modalController.create({
      component: GooglemapsComponent,
      mode: 'ios',
      swipeToClose: true,
      componentProps: { position: positionInput },
    });
    await modalAdd.present();
  }

  /* buscar(){
    console.log('tipo->', this.selectTipo);
  }
 */


  //ESTO ES PRUEBA




  openMenu() {
    console.log('open menu');
    this.menucontroler.toggle('principal');
  }

}
