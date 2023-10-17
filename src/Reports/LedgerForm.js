import React, { useState,useEffect,useRef } from "react";
import axios from "axios";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { baseURL } from "../utils/constant";
import { useTranslation } from "react-i18next";
import ReactToPrint from 'react-to-print';
import PlaceHolder from "../components/spinner/placeholder";
import {startOfWeek} from '../FunctionsGlobal/StartDateFn';
import  Ledger from '../Reports/Ledger';


function LedgerForm() {
    const [lineNames, setLineNames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loanDetails, setLoanDetails] = useState([]);
    const[loannumbers,setLoannumbers]=useState([]);
    const[loanno,setLoanno]=useState(false);
    const { t, i18n } = useTranslation();
    const[startDate,setStartDate]=useState(startOfWeek());
    const [lineNo, setLineNo] = useState("");
    const componentRef = useRef();
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
    useEffect(()=>{
        setIsLoading(true);
        axios.get(`${baseURL}/loancreate/get`).then((res) => {
            setLoannumbers(res.data);
            setIsLoading(false);
        }).catch(error => {
            console.log("error=", error);
            setErrorMessage("Unable to fetch lines list");
            setIsLoading(false);
        })
    })
    const handlePrint = () => {
        window.print()
    }
    const processList = () => {
        setIsLoading(true);
        
        return (
            
            axios.get(`${baseURL}/ledger/get`,{params:{loanno:loanno}}).then((res)=>{
                setLoanDetails(res.data);
                
                 setIsLoading(false)
                 
                 
            })
            .catch(error => {
                console.log("error=", error);
                setErrorMessage("Unable to fetch lines list");
                setIsLoading(false);
            })
        )
        
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
                        <Col s={12} md={6} className="rounder bg-white">
                        
                        <Form.Group className="mb-3" name="linenumber" border="primary" >
                                <Form.Label>{t('loanno')}</Form.Label>
                                <Form.Select aria-label="Default select example" value={loanno} onChange={(e) => setLoanno(e.target.value)} required>
                                    <option key={loanno} value={""} >{t('citylineplaceholder')}</option>

                                    {
                                        loannumbers.map((loans) => (
                                            <option key={loans.loannumber} value={loans.loannumber}
                                                selected={loans.loannumber} >{loans.loannumber}</option>
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
                    
                    <Row ref={componentRef}>
                    <Ledger loanno={loanno} ledger={loanDetails}  />
                    </Row>
                </Form>
            </Row>
        </Container>
    )
}
export default LedgerForm;