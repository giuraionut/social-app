import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePassed',
})
export class TimePassed implements PipeTransform {
  //   transform(input: any, args?: any): any {

  //     let currentDate: Date = new Date();
  //     let inputDate: Date = input;
  //     const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  //     // return currentDate.getTime() - inputDate.getTime();
  //     return (Math.round(Math.abs((currentDate.getTime() - inputDate.getTime()) / oneDay))).toFixed(args);
  //   }

  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29)
        // less than 30 seconds ago will show as 'Just now'
        return 'Just now';
      const intervals: { [key: string]: any } = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          if (counter === 1) {
            return counter + ' ' + i + ' ago'; // singular (1 day ago)
          } else {
            return counter + ' ' + i + 's ago'; // plural (2 days ago)
          }
        }
      }
    }
    return value;
  }
}
