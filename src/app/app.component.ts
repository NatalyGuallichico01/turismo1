import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import { FirebaseauthService } from './services/firebaseauth.service';
import { read } from 'fs';
import { request } from 'http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  admin= false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseauthService: FirebaseauthService,
  ) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(()=>{
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getUid();
    });
  }

  getUid(){
    this.firebaseauthService.stateAuth().subscribe(res=>{
      if (res !== null){
        if (res.uid === 'WhFr0iuCLKherG2IN4PkJ4Mukrh1'){
          this.admin=true;
        }else {
          this.admin= false;
        }
      }else{
        this.admin=false;
      }
    });
  }
}
//match /SitiosTuristicos/{documents=**}{
  //allow read;
  //allow write: if request.auth.uid=='XOxofanwkidld5mNdbkajc2M0nu2'
//}
