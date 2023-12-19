import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { baseURL } from "../utils/constant";
import { useTranslation } from "react-i18next";
import PlaceHolder from "../components/spinner/placeholder";
import { startOfWeek } from '../FunctionsGlobal/StartDateFn';
import ListLineChecking from "./ListLineChecking";
import PreviousWeekList from "./PreviousWeekList"
import ReactToPrint from 'react-to-print';
import NewAccountDetails from "./NewAccountDetails";
import WeekEndAccountDetails from "./WeekEndAccountDetails";
import CurrentWeekGivenAmount from "./CurrentWeekGivenAmount";
var linecheckingreportname = "checkingdetails";
var passingargument = "";
function LinecheckingReport() {
    const [cityNames, setCityNames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [checkingDetailsLine, setCheckingDetailsLine] = useState([]);
    const[checkingData,setCheckingData]=useState([]);
    const [company, setCompany] = useState([]);
    const [linemannames, setLinemanNames] = useState([]);
    const reportType = useRef(0);
    const { t, i18n } = useTranslation();
    const [city, setCity] = useState("");
    const startDateRef = useRef(startOfWeek());
    const endDateRef = useRef(startOfWeek());
    const linemanoptionRef = useRef("");
    const [show, setShow] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${baseURL}/company/get`).then((res) => {
            setCompany(res.data);
            setIsLoading(false);
        }).catch(error => {
            console.log("error=", error);
            setErrorMessage(t('errorcompany'));
            setIsLoading(false);
        })
    }, [])
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${baseURL}/linemancreate/get`).then((res) => {
            setLinemanNames(res.data);
            setIsLoading(false);
        }).catch(error => {
            console.log("error=", error);
            setErrorMessage(t('errormessagelineman'));
            setIsLoading(false)
        })
    }, [])
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${baseURL}/citycreate/get`).then((res) => {
            setCityNames(res.data);
            setIsLoading(false);
        }).catch(error => {
            console.log("error=", error);
            setErrorMessage(t('errormessagecity'));
            setIsLoading(false);
        })
    }, [])
    const processList = () => {
        setIsLoading(true);
        //alert(linemanoptionRef.current.value);
        if (Number(reportType.current.value) === 0) {

            linecheckingreportname = "checkingdetails";
            passingargument = city;
        }
        else if (Number(reportType.current.value) === 1) {
            setCheckingData([]);
            linecheckingreportname = "previousweekdetails";
            passingargument = linemanoptionRef.current.value;
            //alert(passingargument);
        }
        else if (Number(reportType.current.value) === 2) {
            setCheckingData([]);
            linecheckingreportname = "newaccountdetails";
            passingargument = linemanoptionRef.current.value;
            //alert(passingargument);
        }
        else if (Number(reportType.current.value) === 4) {
            setCheckingData([]);
            linecheckingreportname = "weekendaccountdetails";
            passingargument = linemanoptionRef.current.value;
        }
        else if (Number(reportType.current.value) === 3) {
            setCheckingData([]);
            linecheckingreportname = "currentweekgivenamount";
            passingargument = linemanoptionRef.current.value;
        }

        return (
            axios.get(`${baseURL}/loan/${linecheckingreportname}`, { params: { city_id: passingargument.toString(), fromdate: startDateRef.current.value, todate: endDateRef.current.value } }).then((res) => {
                Number(reportType.current.value) === 0?setCheckingData(res.data):setCheckingDetailsLine(res.data)
                
                console.log(res.data);
                setIsLoading(false);


            })
                .catch(error => {
                    console.log("error=", error);
                    setErrorMessage(t('erroressagelinechecking'));
                    setIsLoading(false);
                })
        )


    }
    const componentRef = useRef();
    const handlePrint = () => {
        window.print()
    }
    const renderLineCheckingList = (
        <Row ref={componentRef}>
            <ListLineChecking pendingLoans={checkingData} date={endDateRef.current.value}
                company={company.length > 0 ? company[0].companyname : ""} />

        </Row>

    )
    const renderpreviousweekList = (
        <Row ref={componentRef}>
            <PreviousWeekList pendingLoans={checkingDetailsLine} date={endDateRef.current.value}
                company={company.length > 0 ? company[0].companyname : ""} />
        </Row>

    )
    const rendernewaccountList = (
        <Row ref={componentRef}>
            <NewAccountDetails pendingLoans={checkingDetailsLine} datefrom={startDateRef.current.value} dateto={endDateRef.current.value} />
        </Row>
    )
    const renderweekendaccountList = (
        <Row ref={componentRef}>
            <WeekEndAccountDetails pendingLoans={checkingDetailsLine} datefrom={startDateRef.current.value} dateto={endDateRef.current.value} />
        </Row>
    )
    const rendercurrentweekgivenaccountList = (
        <Row ref={componentRef}>
            <CurrentWeekGivenAmount pendingLoans={checkingDetailsLine} datefrom={startDateRef.current.value} dateto={endDateRef.current.value} />
        </Row>
    )
    const linemanshow = (
        <Col xs={12} md={5} className="rounder bg-white " >
            <Form.Group className="mb-3" name="linenumber" border="primary" >
                <Form.Label>{t('lineman')}</Form.Label>
                <Form.Select aria-label="Default select example" value={city}
                    onChange={(e) => setCity(e.target.value)} ref={linemanoptionRef}>
                    <option key={""} value={""} >{t('linemanplaceholder')}</option>

                    {
                        linemannames.map((linemanname) => (
                            <option key={linemanname._id} value={linemanname._id}
                                selected={linemanname._id} >{linemanname.linemanname}</option>
                        ))}

                </Form.Select>
            </Form.Group>
        </Col>

    )
    const citynameshow = (
        <Col xs={12} md={5} className="rounder bg-white">
            <Form.Group className="mb-3" name="linenumber" border="primary" >
                <Form.Label>{t('city')}</Form.Label>
                <Form.Select aria-label="Default select example" value={city}
                    onChange={(e) => setCity(e.target.value)} required>
                    <option key={""} value={""} >{t('cityplaceholder')}</option>

                    {
                        cityNames.map((cities) => (
                            <option key={cities._id} value={cities._id}
                                selected={cities._id} >{cities.cityname}</option>
                        ))}

                </Form.Select>
            </Form.Group>
        </Col>
    )
    const handleClick = () => {

        if (Number(reportType.current.value) === 0) {
            setShow(false);
        }
        else {
            setShow(true)
        }

    }
    return (
        <Container>
            <Row>
                <Form>
                    <Row >
                        {show == true ? linemanshow : citynameshow}

                        <Col md={3} className="rounder bg-white">
                            <Form.Group className="mb-3" name="cityname" border="primary" >
                                <Form.Label>{t('report')}</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    ref={reportType} defaultValue={0} onClick={handleClick} >
                                    <option value={0} >{t('linechecking')}</option>
                                    <option value={1}>{t('previousweekreport')}</option>
                                    <option value={2}>{t('newaccountaddress')}</option>
                                    <option value={3}>{t('currentweekamountgiven')}</option>
                                    <option value={4}>{t('weekendaccounts')}</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={2} className="rounded bg-white">
                            <Form.Group>
                                <Form.Label>{t('startdate')}</Form.Label>
                                <Form.Control type="date" ref={startDateRef} defaultValue={startOfWeek()} />
                            </Form.Group>
                        </Col>
                        <Col md={2} className="rounder bg-white">
                            <Form.Group>
                                <Form.Label>{t('enddate')}</Form.Label>
                                <Form.Control type="date" ref={endDateRef} defaultValue={startOfWeek()} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="rounded bg-white text-center">
                        <div className="col-md-6 mb-4 " >
                            <Button variant="primary" size="lg" type="button" className="text-center" onClick={processList}>
                                {t('processbuttonlabel')}
                            </Button>{' '}
                        </div>
                        <div className="col-md-6 mb-4 ">
                            <ReactToPrint trigger={() => (
                                <Button variant="primary" size="lg" type="button" className="text-center" onClick={() => handlePrint}>
                                    {t('printbutton')}
                                </Button>

                            )}
                                content={() => componentRef.current} />
                        </div>
                    </Row>

                    {isLoading ? <PlaceHolder /> : Number(reportType.current.value) === 0 ?
                        renderLineCheckingList : Number(reportType.current.value) === 1 ?
                            renderpreviousweekList : Number(reportType.current.value) === 2 ?
                                rendernewaccountList : Number(reportType.current.value) === 3 ?
                                    rendercurrentweekgivenaccountList : renderweekendaccountList}
                    {errorMessage && <div className="error">{errorMessage}</div>}


                </Form>
            </Row>
        </Container>
    )
}
export default LinecheckingReport;