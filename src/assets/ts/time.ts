enum TimeCompare {
    Week = 604800000,
    Day = 86400000,
    Hour = 3600000,
    Minute = 60000,
    Second = 1000
}

export const int2object = (timeInt: number, options) => {
    var timeObj = {
        week: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
    };

    if (options.week && (timeInt >= TimeCompare.Week)) {
        timeObj.week = Math.floor(timeInt / TimeCompare.Week);
        timeInt = timeInt - (timeObj.week * TimeCompare.Week);
    }
    if (options.day && (timeInt >= TimeCompare.Day)) {
        timeObj.day = Math.floor(timeInt / TimeCompare.Day);
        timeInt = timeInt - (timeObj.day * TimeCompare.Day);
    }
    if (timeInt >= TimeCompare.Hour) {
        timeObj.hour = Math.floor(timeInt / TimeCompare.Hour);
        timeInt = timeInt - (timeObj.hour * TimeCompare.Hour);
    }
    if (timeInt >= TimeCompare.Minute) {
        timeObj.minute = Math.floor(timeInt / TimeCompare.Minute);
        timeInt = timeInt - (timeObj.minute * TimeCompare.Minute);
    }
    if (timeInt >= TimeCompare.Second) {
        timeObj.second = Math.floor(timeInt / TimeCompare.Second);
        timeInt = timeInt - (timeObj.second * TimeCompare.Second);
    }
    timeObj.millisecond = Math.round(timeInt);

    return timeObj;
};