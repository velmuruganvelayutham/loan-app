import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { baseURL } from "../utils/constant";
import { useTranslation } from "react-i18next";
import ReactToPrint from 'react-to-print';
import PlaceHolder from "../components/spinner/placeholder";
import Ledger from '../Reports/Ledger';
import Chart from "../Reports/Chart";
var loannumberprocess = "";
function LedgerForm() {
    const [lineNames, setLineNames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loanDetails, setLoanDetails] = useState([]);
    const [loannumbers, setLoannumbers] = useState([]);
    const [loanno, setLoanno] = useState("");
    const { t, i18n } = useTranslation();
    const [lineNo, setLineNo] = useState("");
    const [company, setCompany] = useState([]);
    const componentRef = useRef();
    const reportType = useRef(0);
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
        axios.get(`${baseURL}/citycreate/get`).then((res) => {
            setLineNames(res.data);
            setIsLoading(false);
        }).catch(error => {
            console.log("error=", error);
            setErrorMessage(t('errormessagecity'));
            setIsLoading(false);
        })
    }, [])

    useEffect(() => {
        setIsLoading(true);

        axios.get(`${baseURL}/loancreate/get`, { params: { city_id: lineNo.toString() } }).then((res) => {
            setLoannumbers(res.data);

            setIsLoading(false);
        }).catch(error => {
            console.log("error=", error);
            setErrorMessage(t('errormessageloan'));
            setIsLoading(false);
        })
    }, [lineNo])
    const handlePrint = () => {
        window.print()
    }
    const processList = () => {
        setIsLoading(true);
        loannumberprocess = loanno;
        return (

            axios.get(`${baseURL}/ledger/get`, { params: { loanno: loanno } }).then((res) => {
                setLoanDetails(res.data);
                console.log(res.data);
                setIsLoading(false)


            })
                .catch(error => {
                    console.log("error=", error);
                    setErrorMessage(t('errormessageledger'));
                    setIsLoading(false);
                })
        )

    }
    const renderLedgerList = (
        <Row ref={componentRef}>
            <Ledger loanno={loannumberprocess} ledger={loanDetails}
                company={company.length > 0 ? company[0].companyname : ""} date={new Date()} />
        </Row>
    )
    const renderChart=(
        <Row ref={componentRef}>
            <Chart loanno={loannumberprocess} ledger={loanDetails}
                company={company.length > 0 ? company[0].companyname : ""} date={new Date()} />
        </Row>
    )
    return (
        <Container>
            <Row className="justify-content-md-center mt-5 ">
                <Form>
                    <Row>
                        <Col  xs={6} md={4} className="rounded bg-white">
                            <Form.Group className="mb-3" name="linenumber" border="primary" >
                                <Form.Label>{t('citylinelabel')}</Form.Label>
                                <Form.Select aria-label="Default select example" value={lineNo}
                                    onChange={(e) => setLineNo(e.target.value)}  >
                                    <option key={"0"} value={""} >{t('citylineplaceholder')}</option>

                                    {
                                        lineNames.map((lines) => (
                                            <option key={lines._id} value={lines._id}
                                            >{lines.cityname}</option>
                                        ))}

                                </Form.Select>
                            </Form.Group>

                        </Col>
                        <Col  xs={6} md={4} className="rounded bg-white">
                            <Form.Group className="mb-3" name="cityname" border="primary" >
                                <Form.Label>{t('report')}</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    ref={reportType} defaultValue={0}>
                                    <option value={0} >{t('ledger')}</option>
                                    <option value={1}>{t('chart')}</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col  xs={6} md={4} className="rounded bg-white">

                            <Form.Group className="mb-3" name="linenumber" border="primary" >
                                <Form.Label>{t('loanno')}</Form.Label>
                                <Form.Select aria-label="Default select example" value={loanno} onChange={(e) => setLoanno(e.target.value)}>
                                    <option key={"0"} value={""} >{t('loanplaceholdercombo')}</option>

                                    {
                                        loannumbers.map((loans) => (
                                            <option key={loans.loannumber} value={loans.loannumber}
                                            >{loans.loannumber}</option>
                                        ))}

                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="rounded bg-white text-center">
                        <div className="col-md-6 mb-4 " >
                            <Button variant="primary" size="lg" type="button" className="text-center" onClick={processList}>
                                {t('processbuttonlabel')}
                            </Button>{' '}

                        </div>
                        <div className="col-md-6 mb-4 " >
                            <ReactToPrint trigger={() => (
                                <Button variant="primary" size="lg" type="button" className="text-center" onClick={() => handlePrint}>
                                    {t('printbutton')}
                                </Button>

                            )}
                                content={() => componentRef.current} />

                        </div>
                    </Row>
                    <Row>
                        {isLoading ? <PlaceHolder /> :  Number(reportType.current.value) === 0 ?renderLedgerList:renderChart}
                        {errorMessage && <div className="error">{errorMessage}</div>}
                    </Row>
                    
                </Form>
            </Row>
        </Container>
    )
}
export default LedgerForm;