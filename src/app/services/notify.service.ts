import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private clickSound = new Audio();
  private popSound = new Audio();

  constructor() { 
    this.clickSound.src = 'assets/audio-click.wav';
    this.popSound.src = 'assets/audio-pop.wav';
  }

  pop() {
    this.popSound.play();
  }

  click() {
    this.clickSound.play();
  }
}
