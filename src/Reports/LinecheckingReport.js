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
var linecheckingreportname = "checkingdetails";
function LinecheckingReport() {
    const [cityNames, setCityNames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [checkingDetailsLine, setCheckingDetailsLine] = useState([]);
    const [company, setCompany] = useState([]);
    const reportType=useRef(0);
    const { t, i18n } = useTranslation();
    const [city, setCity] = useState("");
    const startDateRef = useRef(null);
    const endDateRef = useRef(startOfWeek());
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${baseURL}/company/get`).then((res) => {
            setCompany(res.data);
            setIsLoading(false);
        }).catch(error => {
            console.log("error=", error);
            setErrorMessage(t('ermururor'));
            setIsLoading(false);
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
        
        if (Number(reportType.current.value)=== 0) {
            
            linecheckingreportname = "checkingdetails"
        }
        else {
            linecheckingreportname = "previousweekdetails";
        }
        
        return (
            axios.get(`${baseURL}/loan/${linecheckingreportname}`, { params: { city_id: city.toString(), fromdate: startDateRef.current.value, todate: endDateRef.current.value } }).then((res) => {
                setCheckingDetailsLine(res.data)
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
            <ListLineChecking pendingLoans={checkingDetailsLine} date={endDateRef.current.value} 
            company={company.length>0?company[0].companyname:""}/>

        </Row>

    )
    const renderpreviousweekList = (
        <Row ref={componentRef}>
            <PreviousWeekList pendingLoans={checkingDetailsLine} date={endDateRef.current.value} 
            company={company.length>0?company[0].companyname:""}/>
        </Row>

    )
    
    return (
        <Container>
            <Row>
                <Form>
                    <Row >
                        <Col xs={12} md={5} className="rounder bg-white">
                            <Form.Group className="mb-3" name="linenumber" border="primary" >
                                <Form.Label>{t('report')}</Form.Label>
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
                        <Col md={3} className="rounder bg-white">
                            <Form.Group className="mb-3" name="cityname" border="primary" >
                                <Form.Label>{t('city')}</Form.Label>
                                <Form.Select aria-label="Default select example"
                                     ref={reportType} defaultValue={0}>
                                    <option value={0} >{t('linechecking')}</option>
                                    <option value={1}>{t('previousweekreport')}</option>
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
                    {isLoading ? <PlaceHolder /> : (Number(reportType.current.value)===0?renderLineCheckingList : renderpreviousweekList)}
                    {errorMessage && <div className="error">{errorMessage}</div>}
                    

                </Form>
            </Row>
        </Container>
    )
}
export default LinecheckingReport;