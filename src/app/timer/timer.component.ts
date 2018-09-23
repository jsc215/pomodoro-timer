import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  /*
  1. initial time = 25:00 for new sequence
  2. countdown with minutes and seconds
  3. a sequence is 5 25:00 sessions
  4. breaks are 5 minutes for first 4 and 15 minutes for last
  5. sequence resets after 5
  6. pause functionality
  7. start new sequence functionality -- use sequence counter for this
  */

  initialTime = 5;
  shortBreak = 2;
  longBreak = 3;
  breakMessage = 'Take a break';
  hasStarted = false;
  isRunning = false;
  isPaused = false;
  countdown;
  display: string;
  secondsLeft: number;
  counter = 0;
  inBreak: boolean;

  constructor() {}

  ngOnInit() {
    this.displayTimeLeft(this.initialTime);
  }

  resetTimer() {
    this.displayTimeLeft(this.initialTime);
    this.hasStarted = false;
    this.counter = 0;
    this.isRunning = false;
    clearInterval(this.countdown);
  }

  startTimer() {
    if (!this.hasStarted) {
      const seconds = this.initialTime;
      this.hasStarted = true;
      this.isRunning = true;
      this.timer(seconds);
    } else if (this.hasStarted || this.isPaused) {
      const secondsLeft = this.secondsLeft;
      this.isRunning = true;
      this.timer(secondsLeft);
    }
  }

  startShortBreak() {
    this.inBreak = true;
    console.log('in short break');
    this.timer(this.shortBreak);
    console.log('counter', this.counter);
  }

  startLongBreak() {
    console.log('in long break');
    this.timer(this.longBreak);
    console.log('counter', this.counter);
  }

  pauseTimer() {
    clearInterval(this.countdown);
    this.isPaused = true;
    this.isRunning = false;
  }

  timer(seconds: number) {
    console.log('counter', this.counter);
    // clearInterval(this.countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    this.displayTimeLeft(seconds);

    this.countdown = setInterval(() => {
      this.secondsLeft = Math.round((then - Date.now()) / 1000);
      if (this.secondsLeft < 0) {
        clearInterval(this.countdown);
        this.counter++;
        if (this.counter % 2 === 1 && this.counter < 9) {
          this.startShortBreak();
        } else if (this.counter % 2 === 1 && this.counter === 9) {
          this.startLongBreak();
        } else if (this.counter === 10) {
          this.resetTimer();
          return;
        } else {
          this.timer(this.initialTime);
          this.inBreak = false;
        }
        return;
      }
      this.displayTimeLeft(this.secondsLeft);
    }, 1000);
  }

  displayTimeLeft(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    this.display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    console.log(this.display);
  }
}
