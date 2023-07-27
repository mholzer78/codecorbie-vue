interface TimeTypes {
    week: any;
    day: any;
    hour: any;
    minute: any;
    second: any;
    millisecond: any;
}

const TimeCompare: TimeTypes = {
    week: 604800000,
    day: 86400000,
    hour: 3600000,
    minute: 60000,
    second: 1000,
    millisecond: 0,
};

export const int2object = (timeInt: number, options: TimeTypes) => {
    let timeObj: TimeTypes = {
        week: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
    };

    if (options.week && timeInt >= TimeCompare.week) {
        timeObj.week = Math.floor(timeInt / TimeCompare.week);
        timeInt = timeInt - timeObj.week * TimeCompare.week;
    }
    if (options.day && timeInt >= TimeCompare.day) {
        timeObj.day = Math.floor(timeInt / TimeCompare.day);
        timeInt = timeInt - timeObj.day * TimeCompare.day;
    }
    if (timeInt >= TimeCompare.hour) {
        timeObj.hour = Math.floor(timeInt / TimeCompare.hour);
        timeInt = timeInt - timeObj.hour * TimeCompare.hour;
    }
    if (timeInt >= TimeCompare.minute) {
        timeObj.minute = Math.floor(timeInt / TimeCompare.minute);
        timeInt = timeInt - timeObj.minute * TimeCompare.minute;
    }
    if (timeInt >= TimeCompare.second) {
        timeObj.second = Math.floor(timeInt / TimeCompare.second);
        timeInt = timeInt - timeObj.second * TimeCompare.second;
    }
    timeObj.millisecond = Math.round(timeInt);

    return timeObj;
};

export const object2int = (timeString: string, options: TimeTypes) => {
    let timeObj: TimeTypes = {
        week: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
    };
    try {
        // change to split last dot first so milliseconds are done
        let tempTimeArray = timeString.replace(/\s/g, '').split('w');
        if (tempTimeArray.length > 1) {
            timeObj.week = +tempTimeArray[0];
            tempTimeArray.shift();
        }
        tempTimeArray = tempTimeArray[0].split('d');
        if (tempTimeArray.length > 1) {
            timeObj.day = +tempTimeArray[0];
            tempTimeArray.shift();
        }
        tempTimeArray = tempTimeArray[0].split('-');
        if (tempTimeArray.length > 1) {
            if (tempTimeArray[1].length < 2) {
                tempTimeArray[1] += '0';
            }
            if (tempTimeArray[1].length < 3) {
                tempTimeArray[1] += '0';
            }
            timeObj.millisecond = +tempTimeArray[1];
            tempTimeArray.pop();
        }
        tempTimeArray = tempTimeArray[0].split(':');
        if (tempTimeArray.length > 2) {
            timeObj.second = +tempTimeArray[2];
        }
        if (tempTimeArray.length > 1) {
            timeObj.minute = +tempTimeArray[1];
        }
        console.log(tempTimeArray[0]);
        timeObj.hour = +tempTimeArray[0];
    } catch (error) {
        console.debug('Error: ' + error);
    }

    let timeInt =
        timeObj.week * TimeCompare.week +
        timeObj.day * TimeCompare.day +
        timeObj.hour * TimeCompare.hour +
        timeObj.minute * TimeCompare.minute +
        timeObj.second * TimeCompare.second +
        timeObj.millisecond;
    return timeInt;
};
