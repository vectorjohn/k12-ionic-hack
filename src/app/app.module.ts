import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ServiceWorkerModule} from '@angular/service-worker';
import {IonicStorageModule} from '@ionic/storage';
import {FormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {NicknameModalComponent} from './components/nickname-modal/nickname-modal.component';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import {LoginModalComponent} from './login-modal/login-modal.component';
const config: SocketIoConfig = { url: 'https://boatfights.com:3001', options: {} };

@NgModule({
    declarations: [AppComponent, NicknameModalComponent, LoginModalComponent],
    entryComponents: [NicknameModalComponent, LoginModalComponent],
    imports: [
        BrowserModule,
        FormsModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot(),
        SocketIoModule.forRoot(config),
        AppRoutingModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
