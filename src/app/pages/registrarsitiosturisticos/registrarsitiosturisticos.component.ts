import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { GooglemapsComponent } from 'src/app/googlemaps/googlemaps.component';
import { Place } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

//Position default Quito
const positionInput = {
  lat: -0.22985,
  lng: -78.52495,
};

@Component({
  selector: 'app-registrarsitiosturisticos',
  templateUrl: './registrarsitiosturisticos.component.html',
  styleUrls: ['./registrarsitiosturisticos.component.scss'],
})
export class RegistrarsitiosturisticosComponent implements OnInit {

  credentialForm: FormGroup;

  place: Place = {
    nombreS: '',
    descripcionS: '',
    tipoS: '',
    ubicacionS: null,
    idS: this.firestoreService.getId(),
    categoriaS: '',
    fecha: new Date(),
    referirS:''
  };

  newFile: any;
  id = '';
  suscriberUserInfo: Subscription;
  ingresarEnable=false;

  private path = 'Places/';

  constructor(public menucontroler: MenuController,
    public firebaseauthService: FirebaseauthService,
    public firestoreService: FirestoreService,
    public firestorageService: FirestorageService,
    private modalController: ModalController,) {
      this.firebaseauthService.stateAuth().subscribe(res => {
        console.log(res);
        if (res !== null) {
          this.id = res.uid;
          this.getUserInfo(this.id);
        } else {
            this.initPlace();
        }
      });
    }

  async ngOnInit() {
    const id = await this.firebaseauthService.getUid();
    console.log(id);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  logs: string[] = [];

  initPlace(){
    this.id = '';
        this.place = {
          nombreS: '',
          descripcionS: '',
          tipoS: '',
          ubicacionS: null,
          idS: '',
          categoriaS: '',
          fecha: new Date(),
          referirS: ''
        };
        console.log(this.place);
  }

  getUserInfo(uid: string) {
    console.log('getUserInfo');
    const path = 'Usuarios';
    this.suscriberUserInfo= this.firestoreService.getDoc<Place>(path, uid).subscribe(res => {
      this.place = res;
    });
  }

  openMenu() {
    console.log('open menu');
    this.menucontroler.toggle('principal');
  }

  //async newImageUpload(event: any) {
  //  console.log(event);
  //  if (event.target.files && event.target.files[0]) {
  //    this.newFile = event.target.files[0];
  //    const reader = new FileReader();
  //    reader.onload = ((image) => {
  //      this.cliente.foto = image.target.result as string;
  //    });
  //    reader.readAsDataURL(event.target.files[0]);
    //}

  //}

  //Open Modal wiht api in google maps
  async openMap() {
    const modalAdd = await this.modalController.create({
      component: GooglemapsComponent,
      mode: 'ios',
      swipeToClose: true,
      componentProps: { position: positionInput },
    });
    await modalAdd.present();
  }


  savePlace(){
    this.firestoreService.createDoc(this.place, this.path, this.place.idS);
    console.log('respuesta', this.place);
  }



  async addDirection(){
    const ubicacion=this.place.ubicacionS;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let positionInput = {
      lat: -0.33405,
      lng: -78.45217
    };
    if (ubicacion !== null){
      positionInput=ubicacion;
    }
    const modalAdd= await this.modalController.create({
      component: GooglemapsComponent,
      mode: 'ios',
      swipeToClose: true,
      componentProps: {position: positionInput}
    });
    await modalAdd.present();
    const {data}=await modalAdd.onWillDismiss();
    if (data){
      console.log('data -> ', data);
      this.place.ubicacionS=data.pos;
      console.log('this.place -> ', this.place);
    }
  }



}
