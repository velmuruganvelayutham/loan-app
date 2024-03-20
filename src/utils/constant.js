export const baseURL = process.env.REACT_APP_LOAN_APP_BACKEND_API


export const getDefaultWeekCount = () => {
    //console.log("REACT_APP_DEFAULT_WEEK_COUNT", process.env.REACT_APP_DEFAULT_WEEK_COUNT)

    if (Number(process.env.REACT_APP_DEFAULT_WEEK_COUNT) === 25) {
        //console.log("REACT_APP_DEFAULT_WEEK_COUNT", 25)
        return 25;
    }
    if (Number(process.env.REACT_APP_DEFAULT_WEEK_COUNT) === 24) {
        //console.log("REACT_APP_DEFAULT_WEEK_COUNT", 24)
        return 24;
    }
}


export const isReadOnlyLoanNo = () => {

    //console.log("REACT_APP_DEFAULT_IS_LOAN_READONLY", process.env.REACT_APP_DEFAULT_IS_LOAN_READONLY)
    if (Boolean(process.env.REACT_APP_DEFAULT_IS_LOAN_READONLY) === true) {
        //console.log("REACT_APP_DEFAULT_IS_LOAN_READONLY", true)
        return true;
    }
    if (Boolean(process.env.REACT_APP_DEFAULT_IS_LOAN_READONLY) === false) {
        //console.log("REACT_APP_DEFAULT_IS_LOAN_READONLY", false)
        return false;
    }

}
