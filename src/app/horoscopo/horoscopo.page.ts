import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-horoscopo',
  templateUrl: './horoscopo.page.html',
  styleUrls: ['./horoscopo.page.scss'],
})
export class HoroscopoPage implements OnInit {

  @Input() horoscopo: any

  constructor( public modalCtrl: ModalController ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
