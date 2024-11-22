import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import AsyncSelect from 'react-select/async';
import axios from "axios";
import { baseURL, getDefaultWeekCount, isReadOnlyLoanNo } from './utils/constant';
import { startOfWeek, dateFormat } from './FunctionsGlobal/StartDateFn';
import { useTranslation } from "react-i18next";
import PlaceHolder from "./components/spinner/placeholder";
import {
    useAuth
} from "@clerk/clerk-react";
var maxLoanNo = 0;
const weekCount = process.env.REACT_APP_DEFAULT_WEEK_COUNT;
function LoanForm() {

    function endingDate() {
        var datestarted = new Date(startDate);
        var enddatecal = new Date(datestarted.setDate(datestarted.getDate() + ((weekscount - 1) * 7)))// weeks * 7days per week
        const dateendformat = new Date(enddatecal).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split("/").reverse().join("-");
        return dateendformat;
    }
    const { getToken } = useAuth();
    const [updateUI, setUpdateUI] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [linemannames, setLinemanNames] = useState([]);
    const [inputmobileno, setInputMobileno] = useState('');
    //const [weekscount, setWeeksCount] = useState(Number(weekCount));
    const [weekscount, setWeeksCount] = useState(getDefaultWeekCount());


    const [givenAmt, setGivenAmt] = useState("");
    const [linenames, setLineNames] = useState([]);
    const documentAmt = useRef(null);
    const interestAmt = useRef(null);
    const totalAmt = useRef(null);
    const dueAmt = useRef(null);
    const paidAmt = useRef(null);
    const givenDate = useRef(null);
    const dueDate = useRef(null)
    const [startDate, setStartDate] = useState(startOfWeek());
    const endDateRef = useRef(null);
    const fathernameRef = useRef(null);
    const citynameRef = useRef(null);
    const cityidRef = useRef(null);
    const addressRef = useRef(null);
    const workRef = useRef(null);
    const initialFormState = { mySelectKey: null };
    const [myForm, setMyForm] = useState(initialFormState);
    const linemanoptionRef = useRef(null);
    const weekRef = useRef(null);
    const [advanceweekno, setAdvanceweekno] = useState("");
    const lineRef = useRef(null);
    const bookRef = useRef(null);
    const documentRef = useRef(null);
    const chequeRef = useRef(null);
    const bondRef = useRef(null);
    const loannoRef = useRef(null);
    const oldLoanRef = useRef(null);
    const [validated, setValidated] = useState(false);
    const [maxValueShow, setMaxValueShow] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [savedValue, setSavedValue] = useState(null);
    const [changeBook, setChangeBook] = useState(false);
    const [advanceLess, setAdvanceLess] = useState(0);

    const [receiptType, setreceiptType] = useState(0);
    const [balanceAmount, setBalanceAmount] = useState(0);
    var passingref = "update";
    useEffect(() => {
        //console.log("weekCount", weekCount)
        async function fetchData() {
            setIsLoading(true);
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${baseURL}/get/view?q=`).then((res) => {
                setCustomers(res.data)
                setIsLoading(false);
                setErrorMessage("");
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessagecustomer'));
                setIsLoading(false);
            })
        }
        fetchData();
    }, [getToken, t]);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${baseURL}/linemancreate/get`).then((res) => {
                setLinemanNames(res.data)
                setIsLoading(false);
                setErrorMessage("");
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessagelineman'));
                setIsLoading(false);
            })
        }
        fetchData();
    }, [getToken, t]);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${baseURL}/loancreate/get/max`).then((res) => {
                const checkstring = (res.data);
                setIsLoading(false);
                setErrorMessage("");
                if (checkstring.length > 0) {
                    maxLoanNo = checkstring[0].maxCode + 1;
                }
                else {
                    maxLoanNo = 1;
                }
                loannoRef.current.value = maxLoanNo;
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessageloannumber'));
                setIsLoading(false);
            })
        }
        fetchData();
    }, [maxValueShow, getToken, t])

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${baseURL}/linemancreate/get/lines`).then((res) => {
                setLineNames(res.data);
                setIsLoading(false);
                setErrorMessage("");
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessageline'));
                setIsLoading(false);
            });
        }
        fetchData();
    }, [getToken, t]);

    useEffect(() => {
        document.addEventListener("keydown", function (event) {
            if (event.key === "Enter" && event.target.nodeName === "INPUT") {
                var form = event.target.form;
                var index = Array.prototype.indexOf.call(form, event.target);
                let nextElement = form.elements[index + 1];
                while (nextElement && nextElement.disabled) {
                    nextElement = form.elements[index + 2];
                }

                if (nextElement) {
                    nextElement.focus();
                }

                //form.elements[index + 1].focus();
                event.preventDefault();
            }
        });
    }, []);
    const loadOptions = async (inputValue, callback) => {
        try {
            // Make an API call to fetch options based on the inputValue

            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`${baseURL}/get/view?q=${inputValue}`);
            const data = await response.data;
            // Map the fetched data to the format expected by React Select
            const options = data.map(item => ({
                value: item._id,
                label: item.customer + '-' + item.fathername,
            }));

            setSavedValue(null);
            setCustomers(data);
            // Call the callback function with the options to update the dropdown
            callback(options);
        } catch (error) {
            console.error('Error fetching options:', error);
            callback([]);
        }
    };


    function customerSelect(value) {


        setMyForm({ ...myForm, mySelectKey: value });

        const filtered = customers.filter(customer => {
            return customer._id === value
        })

        if (myForm.mySelectKey == 0) {
            setInputMobileno("");
            fathernameRef.current.value = "";
            citynameRef.current.value = "";
            cityidRef.current.value = "";
            addressRef.current.value = "";
            workRef.current.value = "";
            lineRef.current.value = 0;
        }
        if (filtered !== undefined && filtered.length > 0 && savedValue === null) {

            setInputMobileno(filtered[0].mobileno);
            fathernameRef.current.value = filtered[0].fathername;
            citynameRef.current.value = filtered[0].cityname;
            cityidRef.current.value = filtered[0].city_id;
            addressRef.current.value = filtered[0].address;
            workRef.current.value = filtered[0].work;
            lineRef.current.value = filtered[0].lineno;
        }

    }
    function calculateTotalAmt() {
        let given = Number(givenAmt);
        let document = 0;
        if (weekscount == 25) {
            document = ((50 * given) / 1000);
        }
        else if (weekscount == 32) {
            document = ((40 * given) / 1000);
        }
        else if (weekscount == 12) {
            document = ((100 * given) / 1000);
        }
        else if (weekscount == 42 || weekscount == 43) {
            document = ((30 * given) / 1000);
        }
        else if (weekscount == 20) {
            document = ((60 * given) / 1000);
        }
        else if (weekscount == 24) {
            document = ((50 * given) / 1000);
        }
        else if (weekscount == 11) {
            document = ((100 * given) / 1000);
        }

        documentAmt.current.value = document.toFixed(2);
        let intrested = 0
        if (weekscount == 25) {
            intrested = ((given * 20) / 100);
        }
        else if (weekscount == 32) {

            intrested = ((given * 24) / 100);
        }
        else if (weekscount == 42) {
            intrested = ((given * 23) / 100);
        }
        else if (weekscount == 12) {
            intrested = ((given * 10) / 100);
        }
        else if (weekscount == 43) {
            intrested = ((given * 26) / 100);
        }
        else if (weekscount == 20) {
            intrested = ((given * 14) / 100);
        }
        else if (weekscount == 24) {
            intrested = ((given * 15) / 100);
        }
        else if (weekscount == 11) {
            intrested = ((given * 0) / 100);
        }

        interestAmt.current.value = intrested.toFixed(2);
        let total = given + document + intrested;
        totalAmt.current.value = total.toFixed(2);
        let due = (total / weekscount)
        dueAmt.current.value = due.toFixed(2);
        if (advanceLess > 0 && receiptType > 0 && total > 0) {
            let balance = given + document + intrested - advanceLess;
            totalAmt.current.value = total.toFixed(2);
            setGivenAmt(given.toFixed(2));
            // setBalanceAmount(balance.toFixed(2));
        }
        else {
            setGivenAmt(given.toFixed(2));
            // setBalanceAmount(0);
        }


    }
    const calBalance = () => {
        if (advanceLess > 0 && receiptType > 0) {
            let balance = Number(totalAmt.current.value) - advanceLess;
            setBalanceAmount(balance.toFixed(2));
        }
        else {
            setBalanceAmount(0);
        }
    }
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);
        if (Number(paidAmt.current.value) === 0) {
            alert(t('paidamountvaluezeroalert'))
            return false;
        }
        else if (Number(paidAmt.current.value) > Number(dueAmt.current.value)) {
            alert(t('paidamountgreaterthanloanalert'))
            if (window.confirm(t('paidamountgreaterthanloanalertyesno'))) {
                return false;
            }
            else {
            }
        }
        if (myForm.mySelectKey !== "" && linemanoptionRef.current.value !== "" && weekRef.current.value !== "" && bookRef.current.value && lineRef.current.value !== "" && lineRef.current.value !== "" && weekscount !== "" && givenAmt !== "" && givenAmt !== 0 &&
            paidAmt.current.value !== 0 && paidAmt.current.value != "" &&
            Number(paidAmt.current.value) > 0) {
            if (updateUI) {
                if (checkLoanInvolvedTrans("UPDATE") == true) {
                    return false;
                }

            }
            else {
                saveLoanDetails();
            }

        }


    };
    const savePreviousAccount = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);
        if (Number(paidAmt.current.value) === 0) {
            alert(t('paidamountvaluezeroalert'))
            return false;
        }
        else if (Number(paidAmt.current.value) > Number(dueAmt.current.value)) {
            alert(t('paidamountgreaterthanloanalert'))
            if (window.confirm(t('paidamountgreaterthanloanalertyesno'))) {
                return false;
            }
            else {
            }
        }
        if (myForm.mySelectKey !== "" && linemanoptionRef.current.value !== "" && weekRef.current.value !== "" && bookRef.current.value && lineRef.current.value !== "" && lineRef.current.value !== "" && weekscount !== "" && givenAmt !== "" && givenAmt !== 0 &&
            paidAmt.current.value !== 0 && paidAmt.current.value != "" &&
            Number(paidAmt.current.value) > 0) {
            saveLoanDetails();
        }

    }

    const checkLoanInvolvedTrans = async (isUpdateOrDelete) => {
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.get(`${baseURL}/receipt/get`, { params: { loannumber: Number(oldLoanRef.current.value) } }).then((res) => {
            setErrorMessage("");
            if (res.data.length > 1) {
                if (advanceLess > 0 && receiptType > 0) {
                    updateLoanDetails();
                    return false;
                }
                else {
                    alert(t('loanupdatealert'))
                    return true;
                }

            }
            else {
                if (isUpdateOrDelete === "DELETE") {
                    if (window.confirm(t('deletealertmessage'))) {
                        deleteLoanDetails();
                        return false;
                    }
                }
                else if (isUpdateOrDelete === "UPDATE") {
                    if (advanceLess > 0 && receiptType > 0) {
                        updateLoanDetails();
                        return false;
                    }
                    else {
                        if (window.confirm(t('yesornoalertmessage'))) {
                            updateLoanDetails();
                            return false;
                        }
                    }

                }

            }
        }).catch(error => {
            console.log("error=", error);
            setErrorMessage(t('errormessagereceiptdetails'));
        })
    }
    const updateLoanDetails = async () => {
        setButtonDisabled(true);
        if (receiptType > 0) {
            passingref = "updateadvance"
        }
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        axios.put(`${baseURL}/loancreate/${passingref}`,
            {
                oldloanno: Number(oldLoanRef.current.value), customer_id: myForm.mySelectKey, lineman_id: linemanoptionRef.current.value, city_id: cityidRef.current.value,
                weekno: weekRef.current.value, bookno: bookRef.current.value, lineno: lineRef.current.value, document: documentRef.current.value, cheque: chequeRef.current.value, bond: bondRef.current.value,
                weekcount: weekscount, startdate: new Date(startDate), givendate: new Date(givenDate.current.value), duedate: new Date(dueDate.current.value), finisheddate: new Date(endDateRef.current.value),
                givenamount: Number(givenAmt), documentamount: Number(documentAmt.current.value), interestamount: Number(interestAmt.current.value),
                totalamount: Number(totalAmt.current.value), dueamount: Number(dueAmt.current.value), paidamount: Number(paidAmt.current.value), advancetype: Number(receiptType), advanceless: Number(advanceLess),
                advanceweekno:Number(advanceweekno)
            }).then((res) => {
                setButtonDisabled(false);
                console.log(res);
                setErrorMessage("");
                clearFields();
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessageupdateloan'));
                setIsLoading(false);
                setButtonDisabled(false);
            });
        alert(t('updatealertmessage'));
    }
    const updateBook = async () => {
        setButtonDisabled(true);
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.put(`${baseURL}/loancreate/updatebook`,
            {
                oldloanno: Number(oldLoanRef.current.value), customer_id: myForm.mySelectKey, lineman_id: linemanoptionRef.current.value, city_id: cityidRef.current.value,
                weekno: weekRef.current.value, bookno: bookRef.current.value, lineno: lineRef.current.value, document: documentRef.current.value, cheque: chequeRef.current.value, bond: bondRef.current.value,
            }).then((res) => {
                setButtonDisabled(false);
                setErrorMessage("");
                clearFields();
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessageupdateloan'));
                setIsLoading(false);
                setButtonDisabled(false);
            });
        alert(t('updatealertmessage'));
    }
    const saveLoanDetails = async () => {
        setButtonDisabled(true);
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.post(`${baseURL}/loancreate/save`, {
            loanno: Number(loannoRef.current.value), customer_id: myForm.mySelectKey, lineman_id: linemanoptionRef.current.value, city_id: cityidRef.current.value,
            weekno: weekRef.current.value, bookno: bookRef.current.value, lineno: lineRef.current.value, document: documentRef.current.value, cheque: chequeRef.current.value, bond: bondRef.current.value,
            weekcount: weekscount, startdate: new Date(startDate), givendate: new Date(givenDate.current.value), duedate: new Date(dueDate.current.value), finisheddate: new Date(endDateRef.current.value),
            givenamount: Number(givenAmt), documentamount: Number(documentAmt.current.value), interestamount: Number(interestAmt.current.value),
            totalamount: Number(totalAmt.current.value), dueamount: Number(dueAmt.current.value), paidamount: Number(paidAmt.current.value)
        })
            .then((res) => {
                setButtonDisabled(false);
                clearFields();
                setErrorMessage("");
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessagesaveloan'));
                setIsLoading(false);
                setButtonDisabled(false);
            });
        alert(t('savealertmessage'));
    }
    const deleteLoanDetails = async () => {
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.delete(`${baseURL}/loancreate/delete/${Number(oldLoanRef.current.value)}`).then((res) => {
            alert(t('deletemessage'))
            setErrorMessage("");
            clearFields();
        }).catch(error => {
            console.log("error=", error);
            setErrorMessage(t('errormessagedeleteloan'));
            setIsLoading(false);
            setButtonDisabled(false);
        });
    }
    const loanBooknoLineman = async () => {
        if ((linemanoptionRef.current.value !== "") && (myForm.mySelectKey !== "")) {
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${baseURL}/loancreate/get/bookNoRef`, { params: { city_id: cityidRef.current.value, lineman_id: linemanoptionRef.current.value, assigndate: (startDate) } })
                .then((res) => {
                    if (res.data.length > 0) {
                        if (res.data.length === 1) {
                            bookRef.current.value = res.data[0].bookno
                        }
                        else {
                            const concatenatedValues = res.data.map(record => record.bookno).join(',');
                            alert(`${t('linemanbookalert')} ${concatenatedValues}`)
                        }
                    }
                    else {
                        bookRef.current.value = ""
                    }

                })
        }

    }
    const loadOldLoanRef = async () => {
        if (oldLoanRef.current.value != "") {
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${baseURL}/loancreate/get/oldLoanRef`,
                { params: { loanno: Number(oldLoanRef.current.value) } }).then((res) => {

                    const oldReference = res.data;
                    const saveOptions = res.data.map((customer, i) => {
                        return {
                            label: customer.customer + '-' + customer.fathername,
                            value: customer.customer_id,
                            key: i
                        }
                    })
                    setSavedValue(saveOptions)

                    setMyForm({ ...myForm, mySelectKey: oldReference[0].customer_id });
                    //customeroptionRef.current.value = oldReference[0].customer_id;
                    linemanoptionRef.current.value = oldReference[0].lineman_id;
                    setInputMobileno(oldReference[0].mobileno);
                    fathernameRef.current.value = oldReference[0].fathername;
                    citynameRef.current.value = oldReference[0].cityname;
                    cityidRef.current.value = oldReference[0].city;
                    addressRef.current.value = oldReference[0].address;
                    workRef.current.value = oldReference[0].work;
                    lineRef.current.value = oldReference[0].lineno;
                    weekRef.current.value = oldReference[0].weekno;
                    bookRef.current.value = oldReference[0].bookno;
                    documentRef.current.value = oldReference[0].document;
                    chequeRef.current.value = oldReference[0].cheque;
                    bondRef.current.value = oldReference[0].bond;
                    setGivenAmt(oldReference[0].givenamount);
                    documentAmt.current.value = oldReference[0].documentamount;
                    interestAmt.current.value = oldReference[0].interestamount;
                    setreceiptType(oldReference[0].advancetype ? oldReference[0].advancetype : 0);
                    setAdvanceLess(oldReference[0].advanceless);
                    totalAmt.current.value = oldReference[0].totalamount;
                    dueAmt.current.value = oldReference[0].dueamount;
                    paidAmt.current.value = oldReference[0].paidamount;
                    setStartDate(dateFormat(oldReference[0].startdate));
                    givenDate.current.value = dateFormat(oldReference[0].startdate);
                    dueDate.current.value = dateFormat(oldReference[0].duedate);
                    endDateRef.current.value = dateFormat(oldReference[0].finisheddate);
                    setWeeksCount(oldReference[0].weekcount);
                    setBalanceAmount(oldReference[0].totalamount - oldReference[0].advanceless);
                    //alert(oldReference[0].advanceweekno);
                    setAdvanceweekno(oldReference[0]?.advanceweekno || "");
                    
                    
                    setUpdateUI(true);
                })
        }

    }
    function clearFields() {

        setMyForm(initialFormState);

        linemanoptionRef.current.value = "";
        setInputMobileno("");
        fathernameRef.current.value = "";
        citynameRef.current.value = "";
        cityidRef.current.value = "";
        addressRef.current.value = "";
        workRef.current.value = "";
        lineRef.current.value = "";
        weekRef.current.value = "";
        bookRef.current.value = "";
        documentRef.current.value = "";
        chequeRef.current.value = "";
        bondRef.current.value = "";
        setStartDate(startOfWeek());
        givenDate.current.value = startOfWeek();

        setGivenAmt("");
        documentAmt.current.value = "";
        interestAmt.current.value = "";
        totalAmt.current.value = "";
        dueAmt.current.value = "";
        paidAmt.current.value = "";
        oldLoanRef.current.value = "";
        setAdvanceweekno("");
        setWeeksCount(getDefaultWeekCount());
        setUpdateUI(false);
        setChangeBook(false);
        setAdvanceLess(0);
        setBalanceAmount(0);
        setreceiptType(0);
        setMaxValueShow((prevState) => !prevState)
    }
    const options = customers.map((customer, i) => {
        return {
            label: customer.customer + '-' + customer.fathername,
            value: customer._id,
            key: i
        }
    })
    const deleteLoan = () => {
        if (checkLoanInvolvedTrans("DELETE") == true) {
            return false;
        }
    }
    const RearrangeAll = () => {
        setAdvanceLess(0);
        calBalance()
    }
    return (
        <Container className="rounded bg-white mt-5">
            <Row className="justify-content-md-center mt-5 ">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Row >
                        <Col xs={12} md={4} className="rounded bg-white">
                            <Form.Group className="mb-3" border="primary" name="loanno">
                                <Form.Label>{t('loanno')}</Form.Label> {/*loan no*/}
                                <Form.Control ref={loannoRef} type="number" data-cypress-loan-app-loanno="loanno" required readOnly={isReadOnlyLoanNo()} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={2} className="rounded bg-white">
                            <Form.Group className="mb-3" border="primary" >
                                <Form.Label>{t('oldno')}</Form.Label>{/*old no*/}
                                <Form.Control ref={oldLoanRef} data-cypress-loan-app-oldloan="oldloan" type="number" placeholder={t('oldno')} onBlur={loadOldLoanRef} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3} className="rounded bg-white">

                            <Form.Group className="mb-3" name="customername" border="primary" >
                                <Form.Label>{t('customer')}</Form.Label>{/*customer*/}
                                <AsyncSelect
                                    id="react-select-3-input"
                                    isLoading={isLoading}
                                    value={(savedValue !== null) ? savedValue.filter(({ value }) => value === myForm.mySelectKey) : options.filter(({ value }) => value === myForm.mySelectKey)}
                                    onChange={({ value }) => customerSelect(value)}
                                    defaultOptions={(savedValue !== null) ? savedValue : options}
                                    loadOptions={loadOptions}
                                    placeholder={t('customer')} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3} className="rounded bg-white">
                            <Form.Group className="mb-3" name="linemanname" border="primary" >
                                <Form.Label>{t('lineman')}</Form.Label>{/*lineman name*/}
                                <Form.Select data-cypress-loan-app-lineman="lineman"
                                    aria-label="Default select example" ref={linemanoptionRef} required onChange={loanBooknoLineman}>
                                    <option value="">{t('linemanplaceholder')}</option>
                                    {
                                        linemannames.map((linemanname) => (
                                            <option key={linemanname._id} value={linemanname._id}>{linemanname.linemanname}</option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>

                        <Col xs={12} md={4} className="rounded bg-white">
                            <Form.Group className="mb-3" name="mobilenumber" border="primary" >
                                <Form.Label>{t('phoneno')}</Form.Label> {/*mobile no*/}
                                <Form.Control data-cypress-loan-app-mobilenumber="mobilenumber" type="text" disabled
                                    value={inputmobileno} onChange={(e) => setInputMobileno(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4} className="rounded bg-white">
                            <Form.Group className="mb-3" name="fathername" border="primary" >
                                <Form.Label>{t('fathername')}</Form.Label>{/*father name*/}
                                <Form.Control data-cypress-loan-app-fathername="fathername" ref={fathernameRef} type="text" disabled />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4} className="rounded bg-white">
                            <Form.Group className="mb-3" name="cityname" border="primary" >
                                <Form.Label>{t('city')}</Form.Label> {/*city name*/}
                                <Form.Control ref={citynameRef} data-cypress-loan-app-cityname="cityname" type="text" disabled />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4} className="rounded bg-white">
                            <Form.Group className="d-none" name="cityname" data-cypress-loan-app-cityid="cityid" border="primary" >
                                <Form.Label>{t('city')}</Form.Label> {/*city name*/}
                                <Form.Control ref={cityidRef} type="text" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={receiptType > 0 ? 2 : 3} className="rounded bg-white">
                            <Form.Group className="mb-3" name="address1" border="primary" >
                                <Form.Label>{t('address')} </Form.Label>{/*address*/}
                                <Form.Control data-cypress-loan-app-address="address" ref={addressRef} type="text" disabled />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={receiptType > 0 ? 2 : 3} className="rounded bg-white">
                            <Form.Group className="mb-3" name="work" border="primary" >
                                <Form.Label>{t('work')}</Form.Label>{/*work*/}
                                <Form.Control data-cypress-loan-app-work="work" ref={workRef} type="text" disabled />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={receiptType > 0 ? 2 : 3} className="rounded bg-white">
                            <Form.Group className="mb-3" name="lineno" border="primary" >
                                <Form.Label>{t('line')}</Form.Label>{/*line no*/}
                                <Form.Select aria-label="Default select example" ref={lineRef} data-cypress-loan-app-lineno="lineno" required >
                                    <option value="">{t('lineplaceholder')}</option>
                                    {
                                        linenames.map((linename) => (
                                            <option key={linename.lineno} value={linename.lineno}>{linename.linename}</option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={receiptType > 0 ? 2 : 3} className="rounded bg-white">
                            <Form.Group className="mb-3" name="cityname" border="primary" >
                                <Form.Label>{t('showAdvance')}</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    defaultValue={0} onChange={(e) => setreceiptType(e.target.value)} onClick={RearrangeAll} value={receiptType} disabled={updateUI ? false : true}>
                                    <option value={0} >{t('none')}</option>
                                    <option value={1}>{t('advanceless')}</option>
                                    <option value={2}>{t('latepending')}</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {(receiptType > 0) && (
                            <>
                                <Col xs={12} md={2} >
                                    <Form.Group className="mb-3" name="advanceless"  >
                                        <Form.Label>{t('advanceless')}</Form.Label>{/*given Money*/}
                                        <Form.Control className='text-end' type="number" data-cypress-loan-app-givenamount="givenamount"
                                            value={advanceLess} required
                                            onChange={(e) => setAdvanceLess(Number(e.target.value))}
                                            onBlur={calBalance} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={2} >
                                    <Form.Group className="mb-3" name="weekno" border="primary" >
                                        <Form.Label>{t('weekno')}</Form.Label>{/*week No*/}
                                        <Form.Control type="number" placeholder={t('weeknoplaceholder')} value={advanceweekno}
        onChange={(e) => setAdvanceweekno(e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </>)}

                    </Row>


                    <Row>
                        <Col xs={12} md={2} className="rounded bg-white">
                            <Form.Group className="mb-3" name="weekno" border="primary" >
                                <Form.Label>{t('weekno')}</Form.Label>{/*week No*/}
                                <Form.Control type="number" data-cypress-loan-app-weekno="weekno" placeholder={t('weeknoplaceholder')} required ref={weekRef} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={2} className="rounded bg-white">
                            <Form.Group className="mb-3" name="bookno" border="primary" >
                                <Form.Label>{t('bookno')}</Form.Label>{/*book no*/}
                                <Form.Control type="number" data-cypress-loan-app-bookno="bookno" placeholder={t('booknoplaceholder')} required ref={bookRef} onBlur={() => updateUI ? setChangeBook(true) : setChangeBook(false)} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={2} className="rounded bg-white">
                            <Form.Group className="mb-3" name="doument" border="primary" >
                                <Form.Label>{t('document')}</Form.Label>{/*document*/}
                                <Form.Control type="text" placeholder={t('document')} ref={documentRef} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={2} className="rounded bg-white">
                            <Form.Group className="mb-3" name="cheque" border="primary" >
                                <Form.Label>{t('cheque')}</Form.Label>{/*cheque*/}
                                <Form.Control type="number" placeholder={t('cheque')} ref={chequeRef} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={2} className="rounded bg-white">
                            <Form.Group className="mb-3" name="doument" border="primary" >
                                <Form.Label>{t('bond')}</Form.Label>{/*document*/}
                                <Form.Control type="text" placeholder={t('bond')} ref={bondRef} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={2} className="rounded bg-white">
                            <Form.Group className="mb-3" name="bookno" border="primary" >
                                <Form.Label>{t('week')}</Form.Label>{/*week*/}
                                <Form.Control className='bg-info text-center' data-cypress-loan-app-weekcount="weekcount" size="lg" type="number" placeholder="How Many Weeks" required value={weekscount} onChange={(e) => setWeeksCount(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={3} className="rounded bg-white">
                            <Form.Group className="mb-3" name="startdate" border="primary" >
                                <Form.Label>{t('startdatedetail')}</Form.Label>{/*start Date*/}
                                <Form.Control type="date" data-cypress-loan-app-startdate="startdate" required value={startDate} onChange={(e) => setStartDate(e.target.value)} onBlur={endingDate} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3} className="rounded bg-white">
                            <Form.Group className="mb-3" name="givendate" border="primary" >
                                <Form.Label>{t('givendatedetail')}</Form.Label>{/*given Date*/}
                                <Form.Control type="date" ref={givenDate} data-cypress-loan-app-givendate="givendate" required defaultValue={startOfWeek()} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3} className="rounded bg-white">
                            <Form.Group className="mb-3" name="givendate" border="primary" >
                                <Form.Label>{t('payingdate')}</Form.Label>{/*paid date*/}
                                <Form.Control data-cypress-loan-app-payingdate="payingdate" type="date" ref={dueDate} required defaultValue={startOfWeek()} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3} className="rounded bg-white">
                            <Form.Group className="mb-3" border="primary" >
                                <Form.Label>{t('enddatedetail')}</Form.Label>{/*finished Date*/}
                                <Form.Control type="date" ref={endDateRef} data-cypress-loan-app-enddate="enddate" required defaultValue={endingDate()} value={endingDate()} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={2} className="rounded bg-white">
                            <Form.Group className="mb-3" name="givenmoney" border="primary" >
                                <Form.Label>{t('givenamountdetail')}</Form.Label>{/*given Money*/}
                                <Form.Control className='text-end' type="number" data-cypress-loan-app-givenamount="givenamount"
                                    value={givenAmt} required
                                    onChange={(e) => setGivenAmt(Number(e.target.value))}
                                    onBlur={calculateTotalAmt} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={2} className="rounded bg-white">
                            <Form.Group className="mb-3" name="documentcharge" border="primary" >
                                <Form.Label>{t('documentchargedetail')}</Form.Label>{/*document Charge*/}
                                <Form.Control ref={documentAmt} data-cypress-loan-app-documentcharge="documentcharge" className='text-end' type="text" required />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={2} className="rounded bg-white">
                            <Form.Group className="mb-3" name="interest" border="primary" >
                                <Form.Label>{t('interest')}</Form.Label>{/*interest*/}
                                <Form.Control className='text-end' type="text" data-cypress-loan-app-interest="interest" required ref={interestAmt} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={2} className="rounded bg-white">
                            <Form.Group className="mb-3" name="totalamount" border="primary" >
                                <Form.Label>{t('total')}</Form.Label>{/*total*/}
                                <Form.Control className='text-end' type="text" data-cypress-loan-app-total="total" required ref={totalAmt} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={2} className="rounded bg-white">
                            <Form.Group className="mb-3" name="dueamount" border="primary" >
                                <Form.Label>{t('due')}</Form.Label>{/*Due Amount*/}
                                <Form.Control className='text-end' type="text" required ref={dueAmt} data-cypress-loan-app-dueamount="dueamount" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={2} className="rounded bg-white">
                            <Form.Group className="mb-3" name="paidamount" border="primary" >
                                <Form.Label>{t('paidamountdetail')}</Form.Label>{/*paid Amount*/}
                                <Form.Control className='text-end' data-cypress-loan-app-paidamount="paidamount" type="text" required ref={paidAmt} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className='col-buttons'>

                        <Col xs={12} md={3} ></Col>
                        <Col xs={12} md={9} >

                            <Button variant="primary" data-cypress-loan-app-savenewloan="savenew" size="lg" type="button" className="text-center"
                                onClick={savePreviousAccount} disabled={updateUI ? false : true}>
                                {t('generatenew')}
                            </Button>{' '}
                            <Button variant="primary" data-cypress-loan-app-save="save" size="lg" type="button" className="text-center"
                                onClick={handleSubmit} disabled={isButtonDisabled}>
                                {updateUI ? t('updatebutton') : t('savebutton')}
                            </Button>{' '}
                            <Button variant="primary" size="lg" type="button" className="text-center"
                                onClick={deleteLoan} disabled={updateUI ? false : true}>
                                {t('deletebutton')}
                            </Button>{' '}
                            <Button variant="primary" size="lg" type="button" className="text-center" onClick={clearFields}>
                                {t('newbutton')}
                            </Button>{' '}
                            <Button variant="primary" size="lg" type="button" className={updateUI && changeBook === true ? 'visible' : 'invisible'} onClick={updateBook}  >
                                {t('updatebuttonbook')}
                            </Button>
                            {(receiptType > 0) && (<label >{t('balanceamount')}:<span className='text-danger' style={{ fontWeight: 600 }}>{receiptType > 0 ? balanceAmount : 0}</span></label>)}
                        </Col>




                    </Row>

                    <Row>
                        {isLoading ? <PlaceHolder /> : null}
                        {errorMessage && <div className="error">{errorMessage}</div>}
                    </Row>
                </Form>
            </Row>
        </Container>

    )
}

export default LoanForm
