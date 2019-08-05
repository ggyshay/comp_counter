import * as React from 'react';
import { setInterval } from 'timers';

export class Counter extends React.Component {
    state = {};
    componentDidMount() {
        setInterval(this.updateClock, 1000);
    }

    updateClock = ()  => {
        this.setState(this.remainingTime(new Date('2020-12-18T17:40:00'), new Date()))
    }
     
    remainingTime = (toDate, asOf) => {
        if (asOf.getTime() >= toDate.getTime()) {
            return { remainingDays: 0, remainingHours: 0, remainingMinutes: 0, remainingSeconds: 0 }
        }

        let delta = Math.abs(toDate.getTime() - asOf.getTime()) / 1000
        const result = {}
        const unitConversion = {
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        }

        Object.keys(unitConversion).forEach((unit) => {
            result[unit] = Math.floor(delta / unitConversion[unit]);
            delta -= result[unit] * unitConversion[unit];
        })

        const {
            day: remainingDays,
            hour: remainingHours,
            minute: remainingMinutes,
            second: remainingSeconds
        } = result

        return { remainingDays, remainingHours, remainingMinutes, remainingSeconds }
    }


    render() {
        return (
            <div>
                <p>{this.state.remainingDays} dias, {this.state.remainingHours} horas, {this.state.remainingMinutes} minutes, {this.state.remainingSeconds} segundos</p>
            </div>
        )
    }
}