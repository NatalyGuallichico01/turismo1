import { NgModule } from '@angular/core';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SetSitiosturisticosComponent } from './backend/set-sitiosturisticos/set-sitiosturisticos.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent} from './pages/perfil/perfil.component';
import { canActivate} from '@angular/fire/compat/auth-guard';
import { map } from 'rxjs/operators';


const isAdmin= (next: any)=> map((user: any)=>!!user && 'WhFr0iuCLKherG2IN4PkJ4Mukrh1'===user.uid);

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'set-sitiosturisticos', component:SetSitiosturisticosComponent, ...canActivate(isAdmin)},
  {path: 'favoritos', component: FavoritosComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: '', component:HomeComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }