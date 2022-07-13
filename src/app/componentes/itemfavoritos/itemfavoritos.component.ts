import { Component, Input, OnInit } from '@angular/core';
import { SitiosFavoritos } from 'src/app/models';

@Component({
  selector: 'app-itemfavoritos',
  templateUrl: './itemfavoritos.component.html',
  styleUrls: ['./itemfavoritos.component.scss'],
})
export class ItemfavoritosComponent implements OnInit {

  @Input() sitioturistico: SitiosFavoritos;
  constructor() { }

  ngOnInit() {}

}
