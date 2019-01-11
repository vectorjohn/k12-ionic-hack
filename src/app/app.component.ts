import {Component} from '@angular/core';

import {Platform, ToastController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SwUpdate} from '@angular/service-worker';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Schedule',
            url: '/schedule',
            icon: 'calendar'
        },
        {
            title: 'Classes',
            url: '/classes',
            icon: 'bookmarks'
        },
        {
            title: 'Announcements',
            url: '/announce',
            icon: 'microphone'
        }
    ];

    constructor(private platform: Platform,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar,
                private updates: SwUpdate,
                private toast: ToastController) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.updates.available.subscribe(() => {
                this.toast.create({
                    color: 'success',
                    message: 'A new version is available',
                    showCloseButton: true,
                    closeButtonText: 'Reload'
                }).then(toast => {
                    toast.present();
                    return toast.onDidDismiss();
                }).then(() => {
                    document.location.reload();
                });
            });
        });
    }
}
