import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare let google: any;

@Injectable({
  providedIn: 'root'
})
export class GooglemapsService {

  //AIzaSyC8nH1azZFOEZ3_MySPZGYMbU1IM3y8Un8;>
  apiKey=environment.ApiKeyGoogleMaps;
  mapsLoaded=false;

  constructor() { }
  init(renderer: any, document: any): Promise<any>{
    return new Promise((resolve)=>{
      if (this.mapsLoaded){
        console.log('google is preview loaded');
        resolve(true);
        return;
      }

      const script = renderer.createElement('script');
      script.id= 'googleMaps';

      // eslint-disable-next-line @typescript-eslint/dot-notation
      window['mapInit']=()=>{
        this.mapsLoaded=true;
        if (google){
          console.log('google is loaded');
        }else {
          console.log('google is not Defined');
        }
        resolve(true);
        return;
      };

      if (this.apiKey){
        script.src='https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      }else{
        script.src='https://maps.googleapis.com/maps/api/js?callback=mapInit';
      }
      renderer.appendChild(document.body, script);
    });
  }
}
