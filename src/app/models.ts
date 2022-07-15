export interface SitioTuristico{
    nombre: string;
    descripcion: string;
    imagen: string;
    id: string;
    fecha: Date;
}

export interface Cliente{
    uid: string;
    email: string;
    celular: string;
    foto: string;
    referencia: string;
    ubicacion: {
        lat: number;
        lng: number;
    };
    nombre: string;
    rol: string;
}
export interface Favoritos{
    id: string;
    cliente: Cliente;
    sitiosturisticos: SitiosFavoritos [];
    estado: EstadoFavorito;
    fecha: Date;
    valoracion: number;
}
export interface SitiosFavoritos{
    sitio: SitioTuristico;
    visitas: number;
}

export interface Place {
    idS: string;
    nombreS: string;
    descripcionS: string;
    tipoS: '';
    ubicacionS: {
      lat: number;
      lng: number;
    };
    categoriaS: string;
    fecha: Date;
    referirS: string;
  }

  export interface TiposSitios{
    nombre: string;
  }

export type EstadoFavorito= 'me gusta' | 'no me gusta';
