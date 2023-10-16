import React, { useState,useEffect } from "react";
import axios from "axios";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { baseURL } from "../utils/constant";
import { useTranslation } from "react-i18next";
//import PlaceHolder from "./components/spinner/placeholder";
import {startOfWeek} from '../FunctionsGlobal/StartDateFn';
import LedgerList from "./LedgerList";


function LedgerForm() {
    const [lineNames, setLineNames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loanDetails, setLoanDetails] = useState([]);
    const { t, i18n } = useTranslation();
    const[startDate,setStartDate]=useState(startOfWeek());
    const [lineNo, setLineNo] = useState("");
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${baseURL}/linemancreate/get/lines`).then((res) => {
            setLineNames(res.data);
            setIsLoading(false);
        }).catch(error => {
            console.log("error=", error);
            setErrorMessage("Unable to fetch lines list");
            setIsLoading(false);
        })
    }, [])
    const processList = () => {
        setIsLoading(true);
        return (
            axios.get(`${baseURL}/loan/getDetails`).then((res) => {
                setLoanDetails(res.data)
                console.log(res.data)
                setIsLoading(false);
            })
                .catch(error => {
                    console.log("error=", error);
                    setErrorMessage("Unable to fetch lines list");
                    setIsLoading(false);
                })
        )
    }
    const updateMode = (loanno) =>
       {

       } 
      
    return (
        <Container>
            <Row>
                <Form>
                    <Row>
                        <Col xs={12} md={6} className="rounder bg-white">
                            <Form.Group className="mb-3" name="linenumber" border="primary" >
                                <Form.Label>{t('citylinelabel')}</Form.Label>
                                <Form.Select aria-label="Default select example" value={lineNo} onChange={(e) => setLineNo(e.target.value)} required>
                                    <option key={lineNo} value={""} >{t('citylineplaceholder')}</option>

                                    {
                                        lineNames.map((lines) => (
                                            <option key={lines.lineno} value={lines.lineno}
                                                selected={lines.lineno} >{lines.linename}</option>
                                        ))}

                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="rounded bg-white text-center">
                        <div className="col-md-12 mb-4 " >
                            <Button variant="primary" size="lg" type="button" className="text-center" onClick={processList}>
                                {t('processbuttonlabel')}
                            </Button>{' '}

                        </div>
                    </Row>
                    <Row>
                        <LedgerList loanDetails={loanDetails} updateMode={updateMode} />
                        
                    </Row>
                </Form>
            </Row>
        </Container>
    )
}
export default LedgerForm;