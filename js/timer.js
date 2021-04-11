const body = document.querySelector('body');
import makeTimerMarkup from './timer-markup.js';

body.insertAdjacentHTML('afterbegin', makeTimerMarkup());

const refs = {
    days: document.querySelector('span[data-value="days"]'),
    hours: document.querySelector('span[data-value="hours"]'),
    minutes: document.querySelector('span[data-value="mins"]'),
    seconds: document.querySelector('span[data-value="secs"]'),
}

class CountdownTimer{
    constructor({targetDate, onTick}) {
        this.intervalId = null;
        this.targetDate = targetDate;
        this.onTick = onTick;

        this.start();
    }

    start() {
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.targetDate - currentTime;
            const time = this.getTimeComponents(deltaTime);
            this.onTick(time);
            if (deltaTime <= 0) {
                this.stop();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        const time = this.getTimeComponents(0);
        this.onTick(time);
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }

    getTimeComponents(time){
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
    }
}

const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('May 16, 2021'),
    onTick: updateTimer,
});

function updateTimer({days, hours, mins, secs}) {
    refs.days.textContent = `${ days }:`;
    refs.hours.textContent = `${ hours }:`;
    refs.minutes.textContent = `${ mins }:`;
    refs.seconds.textContent = `${ secs }`;
    
}