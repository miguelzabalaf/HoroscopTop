import { Component, OnInit } from '@angular/core';
import { HoroscopoService } from '../services/horoscopo.service';
import { ModalController, ToastController } from '@ionic/angular';
import { HoroscopoPage } from '../horoscopo/horoscopo.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user: string = 'Miguel Zabala'
  horoscopos: any []= [];
  contentLoaded = false;

  constructor( private horoscopoService: HoroscopoService,
               public modalCtrl: ModalController,
               public toastCtrl: ToastController ) {}

  ngOnInit() {
    this.horoscopoService.getHoroscopos().subscribe( (resp: any) => {
      for( let horoscopo in resp.horoscopo ){
        this.horoscopos.push(resp.horoscopo[horoscopo]);
      }
      if (this.horoscopos.length = 12) {
        // console.log(this.horoscopos);
        setTimeout(() => {
          this.contentLoaded = true;
        }, 300)
      }
    },
    (error) => {
      // console.log(error.message)
      this.presentToast('verifica tu conexión a internet', 3500, 'danger');
    })

    setTimeout(() => {
      if(this.horoscopos.length === 0) {
        this.presentToast('Es hora de dormir, el sevidor te mostrará tu horóscopo en unas horas.', 7000, 'warning');
      }
    }, 5000)

  }


  doRefresh(event) {
    this.horoscopos.splice(0,12);
    this.contentLoaded = false
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 500);
  }

  async showHoroscopo(horoscopo: any) {
    const modal = await this.modalCtrl.create({
      component: HoroscopoPage,
      componentProps: {
        horoscopo
      }
    })
    return await modal.present();
  }



  async presentToast(message: string, duration: number, color: string ) {
    const toast = await this.toastCtrl.create({
      message:  `${this.user}, ${message}`,
      duration: duration,
      mode: 'ios',
      color: color
    });
    toast.present();
  }
}
