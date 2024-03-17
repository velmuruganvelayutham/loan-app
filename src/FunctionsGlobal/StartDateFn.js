import React from "react";
export function startOfWeek() {
    var curr = new Date();
    var currday = curr.getDay();
    console.log(process.env.REACT_APP_LOAN_APP_STARTDATE);
    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) {
        if (currday == 0) {
            currday = 7;
        }
        var daycalno = (7 - currday - 7) + 1;
    }
    else {
        if (currday == 6) {
            currday = -1;
        }

        var daycalno = (7 - currday - 7) - 1
    }

    var start = new Date(curr.setDate(curr.getDate() + daycalno));

    const datestartyearformat = new Date(start).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split("/").reverse().join("-");
    return datestartyearformat;
}
/* export function changeGivenDate(date){
     var curr=new Date(date);
     var currday=curr.getDay();
     if(currday==0){
         currday=7;
     }
    const datestartyearformat=new Date(curr).toLocaleDateString('en-GB',{
         year:'numeric',
         month:'2-digit',
         day:'2-digit',
     }).split("/").reverse().join("-");
     return datestartyearformat;  
 }*/
export function endOfWeek() {
    var curr = new Date();
    var currday = curr.getDay();
    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) {
        if (currday == 0) {
            currday = 7;
        }
        var daycalno = (7 - currday - 7) + 6;
    }
    else{
        if (currday == 6) {
            currday = -1;
        }
        var daycalno = (7 - currday - 7) + 4;
    }

    var start = new Date(curr.setDate(curr.getDate() + daycalno));

    const datestartyearformat = new Date(start).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split("/").reverse().join("-");
    return datestartyearformat;
}
export function notRunningOfWeek() {
    var curr = new Date();
    var currday = curr.getDay();

    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) {
        if (currday == 0) {
            currday = 7;
        }
        var daycalno = (7 - currday - 8 - 7 - 7 - 7);
    }
    else{
        if (currday == 6) {
            currday = -1;
        }
        var daycalno = (7 - currday - 10 - 7 - 7 - 7);
    }
    
    
    var start = new Date(curr.setDate(curr.getDate() + daycalno));

    const datestartyearformat = new Date(start).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split("/").reverse().join("-");
    return datestartyearformat;
}
export function dateFormat(datevalue) {
    const datesformat = new Date(datevalue).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split("/").reverse().join("-");
    return datesformat;
}
export function dateFormatdd(datevalue) {
    const datesformat = new Date(datevalue).toLocaleDateString('en-GB', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
    }).split("/").join("-");
    return datesformat;
}
export function dateFormatddmmyyyy(datevalue) {
    const datesformat = new Date(datevalue).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split("/").join("-");
    return datesformat;
}
export function dateFormatoneweek(datevalue) {
    var curr = new Date(datevalue);

    var start = new Date(new Date(curr).setDate(curr.getDate() + 7));

    /*const datesformat=new Date(start).toLocaleDateString('en-GB',{
        year:'2-digit',
        month:'2-digit',
        day:'2-digit',
    }).split("/").join("-");*/
    return start;
}
