/*export function startOfWeek() {
    var curr = new Date();
    var currday = curr.getDay();
    var daycalno = 0;
    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) {
        if (currday == 0) {
            currday = 7;
        }
        daycalno = (7 - currday - 7) + 1;
    }

    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 6) {
        if (currday == 6) {
            currday = -1;
        }

        daycalno = (7 - currday - 7) - 1
    }


    var start = new Date(curr.setDate(curr.getDate() + daycalno));

    const datestartyearformat = new Date(start).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split("/").reverse().join("-");
    return datestartyearformat;
}*/
export function startOfWeek() {
    const curr = new Date();
    const currday = curr.getDay(); // Get current day (0 = Sunday, 6 = Saturday)
    const loanStartDate = Number(process.env.REACT_APP_LOAN_APP_STARTDATE);

    let dayOffset = 0;

    if (loanStartDate === 0) {
        // If start day is Monday (0), move to the previous Monday
        dayOffset = currday === 0 ? -6 : 1 - currday;
    } else if (loanStartDate === 6) {
        // If start day is Saturday (6), move to the previous Saturday
        dayOffset = currday === 6 ? 0 : -currday - 1;
    }

    // Calculate the start date
    const start = new Date(curr);
    start.setDate(curr.getDate() + dayOffset);

    // Format date as YYYY-MM-DD
    return start.toISOString().split("T")[0];
}

export function endOfWeek() {
    var curr = new Date();
    var currday = curr.getDay();
    var daycalno=0;
    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) {
        if (currday == 0) {
            currday = 7;
        }
        daycalno = (7 - currday - 7) + 6;
    }
    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 6) {
        if (currday == 6) {
            currday = -1;
        }
        daycalno = (7 - currday - 7) + 4;
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
    var daycalno=0;
    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) {
        if (currday == 0) {
            currday = 7;
        }
        daycalno = (7 - currday - 8 - 7 - 7 - 7);
    }
    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 6) {
        if (currday == 6) {
            currday = -1;
        }
        daycalno = (7 - currday - 10 - 7 - 7 - 7);
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
export const getPreviousMonday = (currentDate) => {
    
    const previousMonday = new Date(currentDate);
    previousMonday.setDate(previousMonday.getDate() - 7); // Subtract 7 days
    return previousMonday.toISOString().split("T")[0];
    
  };
