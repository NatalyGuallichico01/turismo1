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

export type EstadoFavorito= 'me gusta' | 'no me gusta';
