import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { SitioTuristico } from 'src/app/models';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-set-sitiosturisticos',
  templateUrl: './set-sitiosturisticos.component.html',
  styleUrls: ['./set-sitiosturisticos.component.scss'],
})
export class SetSitiosturisticosComponent implements OnInit {
  sitios: SitioTuristico[] = [];
  newSitiosTuristicos: SitioTuristico;
  enableNewSitio = false;

  private path = 'SitiosTuristicos/';
  // eslint-disable-next-line @typescript-eslint/member-ordering
  newImage='';
  // eslint-disable-next-line @typescript-eslint/member-ordering
  newFile='';
  // eslint-disable-next-line @typescript-eslint/member-ordering
  loading: any;

  constructor(public menucontroler: MenuController,
    public firestoreService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public firestorageService: FirestorageService) { }

  ngOnInit() {
    this.getSitios();
  }

  openMenu() {
    console.log('open menu');
    this.menucontroler.toggle('principal');
  }

  async guardarSitios() {
    //const id= this.firestoreService.getId();
    this.presentLoading();
    const path= 'SitiosTuristicos';
    const name= this.newSitiosTuristicos.nombre;
    //const file= event.target.files[0];
    const res= await this.firestorageService.uploadImage(this.newFile, path, name);
    this.newSitiosTuristicos.imagen=res;
    this.firestoreService.createDoc(this.newSitiosTuristicos, this.path, this.newSitiosTuristicos.id).then(() => {
        this.loading.dismiss();
        this.presentToast('Guardado con éxito');
    }).catch(error => {
      this.presentToast('No se pudo guardar');
    });
  }
  getSitios() {
    this.firestoreService.getCollection<SitioTuristico>(this.path).subscribe(res => {
      this.sitios = res;
    });
  }

  async deleteSitio(sitio: SitioTuristico) {
    //this.firestoreService.deleteDoc(this.path, sitio.id);
      const alert = await this.alertController.create({
        cssClass: 'subtitulo',
        header: 'Advertencia',
        message: 'Seguro deseas <strong>eliminar</strong> este producto!!!',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'normal',
            id: 'cancel-button',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Ok',
            handler: () => {
              console.log('Confirm Okay');
              this.firestoreService.deleteDoc(this.path, sitio.id).then(res => {
                this.loading.dismiss();
                this.presentToast('No se pudo eliminar');
                this.alertController.dismiss();
            }).catch(error => {
              this.presentToast('Eliminado con éxito');
            });
            }
          }
        ]
      });

      await alert.present();

  }
  nuevo() {
    this.enableNewSitio = true;
    this.newSitiosTuristicos={
      nombre: ' ',
      descripcion: ' ',
      imagen: ' ',
      id: this.firestoreService.getId(),
      fecha: new Date(),
    };
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'subtitulo',
      message: 'Guardando...',
      //duration: 2000
    });
    await this.loading.present();
    //await loading.onDidDismiss();
    //console.log('Loading dismissed!');
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      cssClass: 'subtitulo',
      message: msg,
      duration: 2000,
      color:'',
    });
    toast.present();
  }
  async newImageUpload(event: any){
    console.log(event);
    if (event.target.files && event.target.files[0]){
      this.newFile=event.target.files[0];
      const reader= new FileReader();
      reader.onload=((image)=> {
        this.newSitiosTuristicos.imagen=image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }

  }

}
