import { Component, OnInit } from '@angular/core';
import { HoroscopoService } from '../services/horoscopo.service';
import { ModalController } from '@ionic/angular';
import { HoroscopoPage } from '../horoscopo/horoscopo.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  horoscopos: any []= [];
  contentLoaded = false;

  constructor( private horoscopoService: HoroscopoService,
               public modalCtrl: ModalController ) {}
  
  ngOnInit() {
    this.horoscopoService.getHoroscopos().subscribe( (resp: any) => {
      for( let horoscopo in resp.horoscopo ){
        this.horoscopos.push(resp.horoscopo[horoscopo]);
      }
      if (this.horoscopos.length = 12) {
        console.log(this.horoscopos);
        setTimeout(() => {
          this.contentLoaded = true;
        }, 300)
      } else {
        //
      }
    })
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

}
