import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { baseURL } from "../utils/constant";
import { useTranslation } from "react-i18next";
import ReactToPrint from 'react-to-print';
import PlaceHolder from "../components/spinner/placeholder";
import Ledger from '../Reports/Ledger';
var loannumberprocess="";

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
        loannumberprocess=loanno;
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
            company={company.length > 0 ? company[0].companyname : ""} date={new Date()}/>
        </Row>
    )
    return (
        <Container>
            <Row>
                <Form>
                    <Row>
                        <Col xs={12} md={6} className="rounder bg-white">
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
                        <Col s={12} md={6} className="rounder bg-white">

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
                    {isLoading ? <PlaceHolder /> : renderLedgerList}
                    {errorMessage && <div className="error">{errorMessage}</div>}

                </Form>
            </Row>
        </Container>
    )
}
export default LedgerForm;