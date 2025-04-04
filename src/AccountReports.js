import React, { useState, useRef } from "react";
import axios from "axios";
import { baseURL } from "./utils/constant";
import { useAuth } from "@clerk/clerk-react";
import { Button, Form, Row, Col } from 'react-bootstrap';
import LedgerReport from "./LedgerReport";
import ReactToPrint from 'react-to-print';
import { useTranslation } from "react-i18next";
import { startOfWeek,endOfWeek } from "./FunctionsGlobal/StartDateFn";

const AccountReports = () => {
    const [ledger, setLedger] = useState({ openingBalance: 0, transactions: [] });
    const [fromDate, setFromDate] = useState(startOfWeek());
    const [toDate, setToDate] = useState(endOfWeek());
    const { getToken } = useAuth();
    const componentRef = useRef(null);
    const { t } = useTranslation();
    const fetchLedgerReport = async () => {
        if (!fromDate || !toDate) {
            alert("Please select both dates");
            return;
        }

        const token = await getToken();
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        try {
            const res = await axios.get(`${baseURL}/accounts/ledger`, {
                params: {
                    fromDate,
                    toDate,
                },
            });
            //console.log(res.data);
            setLedger(res.data);
        } catch (err) {
            console.error("Error fetching ledger:", err);
        }
    };
    const handlePrintAll = () => {
        window.print();

    };
    return (
        <div className="container mt-4">
            
            <Form>
                <Row className="mb-3 align-items-end">
                    <Col className="col-md-3 mb-0">
                        <Form.Group>
                            <Form.Label>{t('startdate')}</Form.Label>
                            <Form.Control
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md="auto" className="col-md-3 mb-0">
                        <Form.Group>
                            <Form.Label>{t('enddate')}</Form.Label>
                            <Form.Control
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col  md="auto" className="d-flex align-items-end" >
                        <Button variant="primary" size="md" type="button" className="text-center" onClick={fetchLedgerReport}>
                            {t('processbuttonlabel')}
                        </Button>{' '}
                    </Col>
                    <Col className="d-flex align-items-end">
                        <ReactToPrint trigger={() => (
                            <Button variant="primary" size="md" type="button" className="text-center" onClick={handlePrintAll}>
                                {t('printbutton')}
                            </Button>

                        )}
                            content={() => componentRef.current} />
                    </Col>
                </Row>
            </Form>

            <Row ref={componentRef}>
                {(ledger.transactions.length > 0 || ledger.openingBalance !== 0) && (<LedgerReport data={ledger} />)}
            </Row>
        </div>
    );
};

export default AccountReports;
