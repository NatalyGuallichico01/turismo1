import { Component, Input, OnInit } from '@angular/core';
import { SitioTuristico } from 'src/app/models';
import { FavoritosService } from 'src/app/services/favoritos.service';

@Component({
  selector: 'app-sitioturistico',
  templateUrl: './sitioturistico.component.html',
  styleUrls: ['./sitioturistico.component.scss'],
})
export class SitioturisticoComponent implements OnInit {
  @Input() sitioturistico: SitioTuristico;

  constructor(public favoritosService: FavoritosService) { }

  ngOnInit() {

    //console.log('el sitio turistico es: ', this.sitioturistico);
  }
  addFavoritos(){
    this.favoritosService.addFavorito(this.sitioturistico);
  }

}
