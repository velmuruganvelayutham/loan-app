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
import AsyncSelect from 'react-select/async';
import {
    useAuth
} from "@clerk/clerk-react";
import { startOfWeek } from "../FunctionsGlobal/StartDateFn";

var loannumberprocess = "";
function LedgerForm() {
    const { getToken } = useAuth();
    
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loanDetails, setLoanDetails] = useState([]);
    const [loannumbers, setLoannumbers] = useState([]);
    const [loanno, setLoanno] = useState("");
    const { t } = useTranslation();
    const [company, setCompany] = useState([]);
    const componentRef = useRef();
    const reportType = useRef(0);
    const [selectedOption, setSelectedOption] = useState(null);
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${baseURL}/company/get`).then((res) => {
                setCompany(res.data);
                setIsLoading(false);
                setErrorMessage("");
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errorcompany'));
                setIsLoading(false);
            })
        }
        fetchData();
    }, [getToken,t])
    

    useEffect(() => {

        async function fetchData() {
            setIsLoading(true);
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${baseURL}/loancreate/get?q=`).then((res) => {
                setLoannumbers(res.data);
                console.log(res.data);
                setIsLoading(false);
                setErrorMessage("");
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessageloan'));
                setIsLoading(false);
            })
        }
        fetchData();

    }, [getToken,t])
    const handlePrint = () => {
        window.print()
    }
    const options = loannumbers.map((loan, i) => {
        return {
          label: loan.loannumber + '-' + loan.customer,
          value: loan.loannumber,
          key: i
        }
      })
    const loadOptions = async (inputValue, callback) => {
        try {
            // Make an API call to fetch options based on the inputValue
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`${baseURL}/loancreate/get?q=${inputValue}`);
            const data = await response.data;
            // Map the fetched data to the format expected by React Select
            const options = data.map(item => ({
                value: item.loannumber,
                label: item.loannumber + '-' + item.customer,
            }));
            setLoannumbers(data);
            // Call the callback function with the options to update the dropdown
            callback(options);
        } catch (error) {
            console.error('Error fetching options:', error);
            callback([]);
        }
    };
    const processList = async () => {
        setIsLoading(true);
        
        var passingreportname = "ledger";
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        loannumberprocess = loanno;
        if ((Number(reportType)) === 1) {
            passingreportname = "chart"
        }
        else {
            passingreportname = "ledger"
        }

        return (
            axios.get(`${baseURL}/${passingreportname}/get`, { params: { loanno: loanno,todate:new Date(startOfWeek()) } }).then((res) => {
                setLoanDetails(res.data);
                console.log(res.data);
                setIsLoading(false);
                setErrorMessage("");
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
    const renderChart = (
        <Row ref={componentRef}>
            <Chart loanno={loannumberprocess} ledger={loanDetails}
                company={company.length > 0 ? company[0].companyname : ""} date={new Date()} />
        </Row>
    )
    const handleChange = (selectedOption) => {
        setLoanno(selectedOption.value);
        setSelectedOption(selectedOption);
      };
    return (
        <Container>
            <Row className="justify-content-md-center mt-5 ">
                <Form>
                    <Row>
                        <Col xs={12} md={4} className="rounded bg-white">

                            <Form.Group className="mb-3" name="linenumber" border="primary" >
                                <Form.Label>{t('loanno')}</Form.Label>
                                <AsyncSelect autoFocus
                                    id="react-select-3-input"
                                    isLoading={isLoading}
                                    value={selectedOption}
                                    onChange={handleChange}
                                    defaultOptions={options}
                                    placeholder={t('loanplaceholdercombo')}
                                    loadOptions={loadOptions} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4} className="rounded bg-white">
                            <Form.Group className="mb-3" name="cityname" border="primary" >
                                <Form.Label>{t('report')}</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    ref={reportType} defaultValue={0}>
                                    <option value={0} >{t('ledger')}</option>
                                    <option value={1}>{t('chart')}</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4} className="rounded bg-white">
                        </Col>
                    </Row>
                    <Row className="rounded bg-white">
                        <Col className="col-md-6 mb-4 text-center " >
                            <Button variant="primary" size="lg" type="button" className="text-center" onClick={processList}>
                                {t('processbuttonlabel')}
                            </Button>
                        </Col>
                        <Col className="col-md-6 mb-4 " >
                            <ReactToPrint trigger={() => (
                                <Button variant="primary" size="lg" type="button" className="text-center" onClick={() => handlePrint}>
                                    {t('printbutton')}
                                </Button>

                            )}
                                content={() => componentRef.current} />

                        </Col>
                    </Row>
                    <Row className="rounded bg-white">
                        {isLoading ? <PlaceHolder /> : Number(reportType.current.value) === 0 ? renderLedgerList : renderChart}
                        {errorMessage && <div className="error">{errorMessage}</div>}
                    </Row>

                </Form>
            </Row>
        </Container>
    )
}
export default LedgerForm;