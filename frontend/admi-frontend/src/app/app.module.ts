import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { MembroCadastroPageComponent } from './views/membro-cadastro-page/membro-cadastro-page.component';
import { ListaMembroPageComponent } from './views/lista-membro-page/lista-membro-page.component';
import { EditaMembroPageComponent } from './views/edita-membro-page/edita-membro-page.component';
import { ListaUsuarioPageComponent } from './views/lista-usuario-page/lista-usuario-page.component';
import { UsuarioCadastroPageComponent } from './views/usuario-cadastro-page/usuario-cadastro-page.component';
import { EditaUsuarioPageComponent } from './views/edita-usuario-page/edita-usuario-page.component';
import { InfoMembroPageComponent } from './views/info-membro-page/info-membro-page.component';
import { AniversarianteRelatorioPageComponent } from './views/aniversariante-relatorio-page/aniversariante-relatorio-page.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { BasicAuthInterceptor } from './interceptors/basic-auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EditaUsuarioGuard } from './guards/edita-usuario.guard';
import { EditaMembroGuard } from './guards/edita-membro.guard';
import { InfoMembroGuard } from './guards/info-membro.guard';


const rotas: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'cadastra_membro', component: MembroCadastroPageComponent, canActivate: [AuthGuard] },
  { path: 'lista_membro', component: ListaMembroPageComponent, canActivate: [AuthGuard] },
  { path: 'edita_membro', component: EditaMembroPageComponent, canActivate: [AuthGuard, EditaMembroGuard] },
  { path: 'info_membro', component: InfoMembroPageComponent, canActivate: [AuthGuard, InfoMembroGuard] },
  { path: 'lista_usuario', component: ListaUsuarioPageComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'cadastra_usuario', component: UsuarioCadastroPageComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'edita_usuario', component: EditaUsuarioPageComponent, canActivate: [AuthGuard, AdminGuard, EditaUsuarioGuard] },
  { path: 'aniversariante_info', component: AniversarianteRelatorioPageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavbarComponent,
    HomePageComponent,
    MembroCadastroPageComponent,
    ListaMembroPageComponent,
    EditaMembroPageComponent,
    ListaUsuarioPageComponent,
    UsuarioCadastroPageComponent,
    EditaUsuarioPageComponent,
    InfoMembroPageComponent,
    AniversarianteRelatorioPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    SidebarModule,
    MenuModule,
    TieredMenuModule,
    InputTextModule,
    DialogModule,
    CardModule,
    PasswordModule,
    DropdownModule,
    CalendarModule,
    InputMaskModule,
    KeyFilterModule,
    TableModule,
    RouterModule.forRoot(rotas),
    HttpClientModule,
    ConfirmDialogModule,
    ProgressSpinnerModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthService,
    ConfirmationService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
