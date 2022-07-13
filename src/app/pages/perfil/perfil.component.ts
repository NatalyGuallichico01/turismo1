import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { GooglemapsComponent } from 'src/app/googlemaps/googlemaps.component';
import { Cliente } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  cliente: Cliente = {
    uid: '',
    email: '',
    celular: '',
    foto: '',
    referencia: '',
    ubicacion: null,
    nombre: '',
  };

  newFile: any;
  uid = '';
  suscriberUserInfo: Subscription;
  ingresarEnable=false;

  constructor(public menucontroler: MenuController,
    public firebaseauthService: FirebaseauthService,
    public firestoreService: FirestoreService,
    public firestorageService: FirestorageService,
    private modalController: ModalController) {

    this.firebaseauthService.stateAuth().subscribe(res => {
      console.log(res);
      if (res !== null) {
        this.uid = res.uid;
        this.getUserInfo(this.uid);
      } else {
          this.initCliente();
      }
    });
  }

  async ngOnInit() {
    const uid = await this.firebaseauthService.getUid();
    console.log(uid);
  }

  initCliente(){
    this.uid = '';
        this.cliente = {
          uid: '',
          email: '',
          celular: '',
          foto: '',
          referencia: '',
          ubicacion: null,
          nombre: '',
        };
        console.log(this.cliente);
  }

  openMenu() {
    console.log('open menu');
    this.menucontroler.toggle('principal');
  }

  async newImageUpload(event: any) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.cliente.foto = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  async registrarse() {
    const credenciales = {
      email: this.cliente.email,
      password: this.cliente.celular,
    };
    const res = await this.firebaseauthService.registrar(credenciales.email, credenciales.password).catch(err => {
      console.log('error----', err);
    });
    //console.log(res);
    const uid = await this.firebaseauthService.getUid();
    this.cliente.uid = uid;
    this.guardarUser();
  }

  async guardarUser() {
    //const id= this.firestoreService.getId();
    const path = 'Usuarios';
    const name = this.cliente.nombre;
    //const file= event.target.files[0];
    if (this.newFile !== undefined) {
      const res = await this.firestorageService.uploadImage(this.newFile, path, name);
      this.cliente.foto = res;
    }
    this.firestoreService.createDoc(this.cliente, path, this.cliente.uid).then(() => {
      //this.loading.dismiss();
      console.log('guardado con exito');
    }).catch(error => {
    });
  }

  async salir() {
    //const uid= await this.firebaseauthService.getUid();
    //console.log(uid);
    this.firebaseauthService.logout();
    this.suscriberUserInfo.unsubscribe();
  }

  getUserInfo(uid: string) {
    console.log('getUserInfo');
    const path = 'Usuarios';
    this.suscriberUserInfo= this.firestoreService.getDoc<Cliente>(path, uid).subscribe(res => {
      this.cliente = res;
    });
  }

  ingresar(){
    const credenciales = {
      email: this.cliente.email,
      password: this.cliente.celular,
    };
    this.firebaseauthService.login(credenciales.email, credenciales.password).then(res => {
      console.log('Ingreso con exito');
    });
  }

  async addDirection(){
    const ubicacion=this.cliente.ubicacion;
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
      this.cliente.ubicacion=data.pos;
      console.log('this.cliente -> ', this.cliente);
    }
  }


}

