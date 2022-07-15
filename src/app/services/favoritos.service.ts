import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Cliente, Favoritos, SitioTuristico, SitiosFavoritos } from '../models';
import { FirebaseauthService } from './firebaseauth.service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  private favorito: Favoritos;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  favorito$ =new Subject<Favoritos>();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  path = 'favorito/';
  // eslint-disable-next-line @typescript-eslint/member-ordering
  uid = '';
  // eslint-disable-next-line @typescript-eslint/member-ordering
  cliente: Cliente;

  constructor(public firebaseauthService: FirebaseauthService,
    public firestoreService: FirestoreService,
    public router: Router) {
      console.log('Favoritos Inicio');
    this.firebaseauthService.stateAuth().subscribe(res => {
      console.log(res);
      if (res !== null) {
        this.uid = res.uid;
        this.loadCliente();
      } else {
        console.log('no estas logeado');
      }
    });
  }
  loadFavorito() {
    const path = 'Usuarios/' + this.uid + '/' + 'favorito';
    this.firestoreService.getDoc<Favoritos>(path, this.uid).subscribe(res => {
      console.log('esta es la respuesta',res);
      if (res) {
        this.favorito = res;
        this.favorito$.next(this.favorito);
      }
      else {
        this.initFavoritos();
      }
    });
  }
  initFavoritos() {
    this.favorito = {
      id: this.uid,
      cliente: this.cliente,
      sitiosturisticos: [],
      estado: 'no me gusta',
      fecha: new Date(),
      valoracion: null,
    };
    this.favorito$.next(this.favorito);
  }
  loadCliente(){
    const path = 'Usuarios';
    this.firestoreService.getDoc<Cliente>(path, this.uid).subscribe(res => {
      this.cliente = res;
      this.loadFavorito();
    });
  }
  getFavorito(): Observable<Favoritos> {
    return this.favorito$.asObservable();
  }
  addFavorito(sitio: SitioTuristico) {
    console.log('en add favorito ---', this.uid);
    if (this.uid.length){
      const item= this.favorito.sitiosturisticos.find(sitioFavorito=>(sitioFavorito.sitio.id === sitio.id));
      if (item !== undefined){
        item.visitas ++;
      }else{
        const add: SitiosFavoritos={
          visitas: 1,
          sitio,
        };
        this.favorito.sitiosturisticos.push(add);
      }
    }else{
      this.router.navigate(['/perfil']);
      return;
    }
    console.log('en add sitio ---', this.favorito);
    const path = 'Usuarios/' + this.uid + '/' + this.path;
    this.firestoreService.createDoc(this.favorito, path, this.favorito.id).then(()=> {
      console.log('añadido con exito');
    });
  }
  removeFavorito(favorito: SitioTuristico) {

  }
  marcarFavorito() {

  }
  clearFavorito() { }
}
