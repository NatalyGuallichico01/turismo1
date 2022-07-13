import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Favoritos } from 'src/app/models';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
})
export class FavoritosComponent implements OnInit {

  sitioturistico: Favoritos;

  constructor(public menucontroler: MenuController,
    public firestoreService: FirestoreService,
    public favoritosService: FavoritosService){
      this.initFavoritos();
      this.loadFavorito();
    }

ngOnInit() {}

openMenu() {
console.log('open menu');
this.menucontroler.toggle('principal');
}
loadFavorito(){
  this.favoritosService.getFavorito().subscribe(res=>{
    this.sitioturistico= res;
  });
}
initFavoritos() {
  this.sitioturistico = {
    id:'',
    cliente: null,
    sitiosturisticos: [],
    estado: 'no me gusta',
    fecha: new Date(),
    valoracion: null,
  };
}

}
