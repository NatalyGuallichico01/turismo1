// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ApiKeyGoogleMaps: 'AIzaSyB8b4v6MPNN-besJTHmGsUAsxxCkSa4ZAs',
  firebaseConfig: {
    apiKey: 'AIzaSyAj7KDmsZaNz4VybsXzizHvYbnSU7TyaE8',
    authDomain: 'turismo-guia.firebaseapp.com',
    projectId: 'turismo-guia',
    storageBucket: 'turismo-guia.appspot.com',
    messagingSenderId: '748350014788',
    appId: '1:748350014788:web:58186c55a9d74ae7344311',
    measurementId: 'G-K0ZFCH05PD'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
