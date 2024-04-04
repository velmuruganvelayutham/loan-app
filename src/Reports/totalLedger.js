import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { baseURL } from "../utils/constant";
import { useTranslation } from "react-i18next";
import PlaceHolder from "../components/spinner/placeholder";
import { startOfWeek, endOfWeek, notRunningOfWeek } from '../FunctionsGlobal/StartDateFn';
import ReactToPrint from 'react-to-print';
import ListTotalLedger from "./ListTotalLedger";
import {
    useAuth
} from "@clerk/clerk-react";
function TotalLedger() {
    const { getToken } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [ledger, setLedger] = useState([]);
    const [linemannames, setLinemanNames] = useState([]);
    const { t } = useTranslation();
    const startDateRef = useRef(startOfWeek());
    const endDateRef = useRef(endOfWeek());
    const componentRef = useRef();
    const notrunningDateRef = useRef(notRunningOfWeek());
    const reportType = useRef(0);
    const [show, setShow] = useState(false);
    const linemanoptionRef = useRef(null);
    const [company, setCompany] = useState([]);
    const [linemannameday, setLineManNameDay] = useState("");
    const [linemanlineno, setLineManLineno] = useState("");
    const [line, setLine] = useState("");
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${baseURL}/linemancreate/get`).then((res) => {
                setLinemanNames(res.data);
                setIsLoading(false);
                setErrorMessage("");
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessagelineman'));
                setIsLoading(false)
            })
        }
        fetchData();
    }, [getToken])
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            axios.get(`${baseURL}/company/get`).then((res) => {
                setCompany(res.data);
                setIsLoading(false);
                setErrorMessage('');
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errorcompany'));
                setIsLoading(false);
            })
        }
        fetchData();
    }, [getToken])
    const processList = async () => {
        //alert(reportType.current.value);
        var reporttypename = ""
        var passingargument = "";
        //alert(linemanoptionRef.current.value);
        setIsLoading(true);
        if (reportType.current.value == 1) {
            reporttypename = "totalledgercity"
            passingargument = linemanoptionRef.current.value;
        }
        else {
            reporttypename = "totalledger"
            passingargument = "";
        }
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return (

            axios.get(`${baseURL}/city/${reporttypename}`, {
                params: {
                    fromdate: startDateRef.current.value,
                    todate: endDateRef.current.value, notrundate: notrunningDateRef.current.value,
                    reporttype: reportType.current.value,
                    linemanref: passingargument.toString()
                }
            }).then((res) => {
                setLedger(res.data)
                console.log(res.data)
                setIsLoading(false);
                setErrorMessage("");
            })
                .catch(error => {
                    console.log("error=", error);
                    setErrorMessage(t('erroressagelinechecking'));
                    setIsLoading(false);
                })
        )
    }

    const renderTotalLedgerList = (
        <Row ref={componentRef}>
            <ListTotalLedger totalledger={ledger} datefrom={startDateRef.current.value}
                dateto={endDateRef.current.value} notrunningdate={notrunningDateRef.current.value} 
                reportypeval={reportType.current.value} 
                companyname={company.length > 0 ? company[0].companyname : ""} linemanname={linemannameday} linamnline={linemanlineno}/>
        </Row>
    )
    
    const linemanshow = (
        <Col xs={12} md={3} className="rounded bg-white">
            <Form.Group className="mb-3" name="linemanname" border="primary" >
            <Form.Label>{t('lineman')}</Form.Label>
                <Form.Select aria-label="Default select example" value={line}
                    onChange={(e) => setLine(e.target.value)} ref={linemanoptionRef} 
                    onClick={(e)=>restoreLineman(e)} >
                    <option key={""} value={""} defaultValue={""}>{t('linemanplaceholder')}</option>

                    {
                        linemannames.map((linemanname) => (
                            <option key={linemanname._id} value={linemanname._id}
                                selected={linemanname._id} >{linemanname.linemanname}</option>
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
    const restoreLineman = (e) => {
        const filtered = linemannames.filter(lineman => {
            return lineman._id === e.target.value;
        })
        if (filtered.length > 0) {
            
            setLineManNameDay(filtered[0].linemanname);
            setLineManLineno(filtered[0].lineno);
        }
    }
    return (
        <Container>
            <Row>
                <Form>
                    <Row >
                        {show === true ? linemanshow : null}
                        <Col md={show === true ? 2 : 3} className="rounder bg-white">
                            <Form.Group>
                                <Form.Label>{t('startdate')}</Form.Label>
                                <Form.Control type="date" ref={startDateRef} defaultValue={startOfWeek()} />
                            </Form.Group>
                        </Col>
                        <Col md={show === true ? 2 : 3} className="rounder bg-white">
                            <Form.Group>
                                <Form.Label>{t('enddate')}</Form.Label>
                                <Form.Control type="date" ref={endDateRef} defaultValue={endOfWeek()} />
                            </Form.Group>
                        </Col>
                        <Col md={show === true ? 2 : 3} className="rounder bg-white">
                            <Form.Group>
                                <Form.Label>{t('notrunningdate')}</Form.Label>
                                <Form.Control type="date" ref={notrunningDateRef} defaultValue={notRunningOfWeek()} />
                            </Form.Group>
                        </Col>
                        <Col md={3} className="rounder bg-white">
                            <Form.Group className="mb-3" name="cityname" border="primary" >
                                <Form.Label>{t('report')}</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    ref={reportType} defaultValue={0} onClick={handleClick} >
                                    <option value={0} >{t('linewise')}</option>
                                    <option value={1}>{t('citywise')}</option>

                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="rounded bg-white text-center">
                        <div className="col-md-6 mb-4 " >
                            <Button variant="primary" size="lg" type="button" className="text-center" onClick={processList} >
                                {t('processbuttonlabel')}
                            </Button>{' '}
                        </div>
                        <div className="col-md-6 mb-4 ">
                            <ReactToPrint trigger={() => (
                                <Button variant="primary" size="lg" type="button" className="text-center" >
                                    {t('printbutton')}
                                </Button>

                            )}
                                content={() => componentRef.current} />
                        </div>
                    </Row>
                    {isLoading ? <PlaceHolder /> : renderTotalLedgerList}
                    {errorMessage && <div className="error">{errorMessage}</div>}



                </Form>
            </Row>
        </Container>
    )
}
export default TotalLedger;