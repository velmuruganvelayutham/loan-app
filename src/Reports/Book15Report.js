import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { baseURL } from "../utils/constant";
import { useTranslation } from "react-i18next";
import PlaceHolder from "../components/spinner/placeholder";
import { startOfWeek, endOfWeek } from '../FunctionsGlobal/StartDateFn';
import ListBookFifteen from "./ListBookFifteen";
import { useAuth } from "@clerk/clerk-react";

const BOOK_NO = 15;

function Book15Report() {
    const { getToken } = useAuth();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [company, setCompany] = useState([]);
    const [lineNames, setLineNames] = useState([]);
    const [line, setLine] = useState("");
    const [reportLine, setReportLine] = useState("");
    const [pendingLoans, setPendingLoans] = useState([]);
    const [isPrinting, setIsPrinting] = useState(false);
    const [dates, setDates] = useState({ from: startOfWeek(), to: endOfWeek() });
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);
    const radioRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${baseURL}/company/get`).then((res) => {
                setCompany(res.data);
                setIsLoading(false);
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errorcompany'));
                setIsLoading(false);
            })
        }
        fetchData();
    }, [getToken])

    useEffect(() => {
        async function fetchLines() {
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${baseURL}/linemancreate/get/lines`).then((res) => {
                setLineNames(res.data);
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessagecity'));
            })
        }
        fetchLines();
    }, [getToken])

    const processList = async () => {
        setIsLoading(true);
        setErrorMessage("");
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const fromdate = startDateRef.current.value;
        const todate = endDateRef.current.value;
        return axios.get(`${baseURL}/loan/checkingdetails`, {
            params: {
                city_id: line,
                fromdate: fromdate,
                todate: todate,
                bookno: BOOK_NO,
                allowbook15: 1,
                document: Number(radioRef.current.querySelector('input[name="option"]:checked').value)
            }
        }).then((res) => {
            setPendingLoans(res.data);
            setDates({ from: fromdate, to: todate });
            const selected = lineNames.find((l) => String(l.lineno) === String(line));
            setReportLine(selected ? selected.linename : "");
            setIsLoading(false);
        }).catch(error => {
            console.log("error=", error);
            setErrorMessage(t('erroressagelinechecking'));
            setIsLoading(false);
        })
    }

    const handlePrint = () => {
        setIsPrinting(true);
        setTimeout(() => {
            window.print();
            setIsPrinting(false);
        }, 2000);
    };

    return (
        <Container>
            {/* Whole print job is A4 landscape while this report is open. */}
            <style>{`@media print { @page { size: 297mm 210mm; margin: 0; } }`}</style>
            <Row>
                <Form ref={radioRef}>
                    <Row className="hide-on-print">
                        <Col md={2} className="rounded bg-white">
                            <Form.Group>
                                <Form.Label>{t('bookno')}</Form.Label>
                                <Form.Control type="number" value={BOOK_NO} disabled readOnly />
                            </Form.Group>
                        </Col>
                        <Col md={2} className="rounded bg-white">
                            <Form.Group className="mb-3">
                                <Form.Label>{t('line')}</Form.Label>
                                <Form.Select value={line} onChange={(e) => setLine(e.target.value)}>
                                    <option value="">{t('lineplaceholder')}</option>
                                    {lineNames.map((lines) => (
                                        <option key={lines._id} value={lines.lineno}>{lines.linename}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3} className="rounded bg-white">
                            <Form.Group>
                                <Form.Label>{t('startdate')}</Form.Label>
                                <Form.Control type="date" ref={startDateRef} defaultValue={startOfWeek()} />
                            </Form.Group>
                        </Col>
                        <Col md={3} className="rounded bg-white">
                            <Form.Group>
                                <Form.Label>{t('enddate')}</Form.Label>
                                <Form.Control type="date" ref={endDateRef} defaultValue={endOfWeek()} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="rounded bg-white text-center hide-on-print">
                        <Col className="col-md-4 mb-4 d-flex align-items-center gap-2">
                            <label className="d-flex align-items-center" style={{ fontWeight: "600", fontSize: "11px" }}>
                                <input type="radio" name="option" value={3} defaultChecked />
                                {t('all')}
                            </label>
                            <label className="d-flex align-items-center" style={{ fontWeight: "600", fontSize: "11px" }}>
                                <input type="radio" name="option" value={1} />
                                {t('document')}
                            </label>{'  '}
                            <label className="d-flex align-items-center" style={{ fontWeight: "600", fontSize: "11px" }}>
                                <input type="radio" name="option" value={4} />
                                {t('bondandcheque')}
                            </label>{'  '}
                            <label className="d-flex align-items-center" style={{ fontWeight: "600", fontSize: "11px" }}>
                                <input type="radio" name="option" value={2} />
                                {t('other')}
                            </label>
                        </Col>
                        <Col className="col-md-2 mb-4">
                            <Button variant="primary" size="lg" type="button" className="text-center" onClick={processList}>
                                {t('processbuttonlabel')}
                            </Button>
                        </Col>
                        <Col className="col-md-3 mb-4">
                            <Button variant="primary" size="lg" type="button" className="text-center" onClick={handlePrint}>
                                {t('printall')}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        {isLoading ? <PlaceHolder /> :
                            <ListBookFifteen pendingLoans={pendingLoans} datefrom={dates.from} dateto={dates.to} linename={reportLine}
                                company={company.length > 0 ? company[0].companyname : ""} isPrinting={isPrinting} />}
                        {errorMessage && <div className="error">{errorMessage}</div>}
                    </Row>
                </Form>
            </Row>
        </Container>
    )
}
export default Book15Report;
