import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// importanto módulo para conseguir referênciar uma rota em href
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { TemaComponent } from './tema/tema.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    EntrarComponent,
    CadastrarComponent,
    InicioComponent,
    TemaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  // importanto rotas para utilizar o LocationStrategy e HashLocationStrategy
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
