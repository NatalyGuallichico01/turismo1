import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { BackendModule } from './backend/backend.module';
import { AngularFireModule } from '@angular/fire/compat';
//import { FirebaseOptionsToken} from '@angular/fire/compat/angular-fire-compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireStorageModule} from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SharedModule } from './shared/shared.module';




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    PagesModule, BackendModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    SharedModule,
  ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: StatusBar,  },
    { provide: SplashScreen,  },
    { provide: Platform,  },
    //{ provide: FirebaseOptionsToken, useValue: environment.firebaseConfig }
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
