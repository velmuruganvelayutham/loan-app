import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { baseURL } from "../utils/constant";
import { useTranslation } from "react-i18next";
import ReactToPrint from 'react-to-print';
import PlaceHolder from "../components/spinner/placeholder";
import { endOfWeek } from '../FunctionsGlobal/StartDateFn';
import Select from "react-select";
import AsyncSelect from 'react-select/async';
import {
    useAuth
} from "@clerk/clerk-react";

import GivenMoneyDetailsList from './GivenMoneyDetailsList'

function GivenMoneyDetailsReport() {
    const { getToken } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loanDetails, setLoanDetails] = useState([]);

    const [customer, setCustomer] = useState("");
    const { t } = useTranslation();
    const [company, setCompany] = useState([]);

    const [city, setCity] = useState(null);
    const componentRef = useRef();
    const endDateRef = useRef(endOfWeek());
    const [selectedOption, setSelectedOption] = useState(null);
    const [inputmobileno, setInputMobileno] = useState("")

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
    }, [getToken, t])



    const loadOptions = async (inputValue, callback, searchType) => {
        try {
            // Make an API call to fetch options based on the inputValue and searchType
            const token = await getToken();
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            // Define search parameters dynamically based on searchType
            let params = { q: inputValue };
            params.type = searchType

            const response = await axios.get(`${baseURL}/get/namesearch`, { params });
            const data = await response.data;

            // Map the fetched data to the format expected by React Select
            const options = data.map((item) => ({
                value: item[searchType],
                label: item[searchType], // Dynamically set label based on searchType
            }));

            callback(options);
        } catch (error) {
            console.error("Error fetching options:", error);
            callback([]);
        }
    };

    const processList = async () => {
        if(!customer&& !selectedOption&& !city&& !inputmobileno){
            alert(t('fillanydetails'));
            return;
        }
        setIsLoading(true);
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return (
            axios.get(`${baseURL}/loan/givenmoney`, {
                params: {
                    customename: customer,
                    fathername: selectedOption,
                    referencecity: city,
                    mobileno: inputmobileno,
                    todate: endDateRef.current.value
                }
            }).then((res) => {
                setLoanDetails(res.data)
                setIsLoading(false);


            })
                .catch(error => {
                    console.log("error=", error);
                    setErrorMessage(t('erroressagelinechecking'));
                    setIsLoading(false);
                })
        )

    }
    const handlePrint = () => {
        window.print()
    }
    const renderGivenList = (
        <Row ref={componentRef}>
            <GivenMoneyDetailsList pendingLoans={loanDetails} dateto={endDateRef.current.value} />
        </Row>
    )
    const handleChange = (selectedOption) => {
        if (!selectedOption) {
            // Handle case where value is cleared
            setCustomer(null);
            return;
        }
        setCustomer(selectedOption.value);

    };
    const handleChangeCity = (selected) => {
        if (!selected) {
            setCity(null);
            return;
        }
        setCity(selected.value);

    }
    const handleChangeFatherName = (selected) => {
        if (!selected) {
            setSelectedOption(null);
            return;
        }
        setSelectedOption(selected.value);

    }


    return (
        <Container>
            <Row className="justify-content-md-center mt-5 ">
                <Form>
                    <Row>

                        <Col xs={12} md={3} className="rounded bg-white">

                            <Form.Group className="mb-3" name="linenumber" border="primary" >
                                <Form.Label>{t('customer')}</Form.Label>
                                <AsyncSelect
                                    loadOptions={(inputValue, callback) => loadOptions(inputValue, callback, "customer")}
                                    onChange={handleChange}
                                    placeholder={t('customerplaceholder')}
                                    cacheOptions
                                    defaultOptions
                                    isSearchable
                                    isClearable={true}
                                />

                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3} className="rounded bg-white">

                            <Form.Group className="mb-3" name="linenumber" border="primary" >
                                <Form.Label>{t('city')}</Form.Label>
                                <AsyncSelect
                                    loadOptions={(inputValue, callback) => loadOptions(inputValue, callback, "referencecity")}
                                    onChange={handleChangeCity}
                                    placeholder={t('cityplaceholder')}
                                    cacheOptions
                                    defaultOptions
                                    isSearchable
                                    isClearable={true}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3} className="rounded bg-white">

                            <Form.Group className="mb-3" name="linenumber" border="primary" >
                                <Form.Label>{t('fatherhusbandnameplaceholder')}</Form.Label>
                                <AsyncSelect
                                    loadOptions={(inputValue, callback) => loadOptions(inputValue, callback, "fathername")}
                                    onChange={handleChangeFatherName}
                                    placeholder={t('fatherhusbandnameplaceholder')}
                                    cacheOptions
                                    defaultOptions
                                    isSearchable
                                    isClearable={true}
                                />


                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3} className="rounded bg-white">
                            <Form.Group className="mb-3" name="mobilenumber" border="primary" >
                                <Form.Label>{t('phoneno')}</Form.Label>
                                <Form.Control type="text" placeholder={t('phonenoplaceholder')} required value={inputmobileno}
                                    onChange={(e) => setInputMobileno(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col md={2} className="rounder bg-white d-none" >
                            <Form.Group>
                                <Form.Label>{t('enddate')}</Form.Label>
                                <Form.Control type="date" ref={endDateRef} defaultValue={endOfWeek()} />
                            </Form.Group>
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
                    <Row >
                        {isLoading ? <PlaceHolder /> : renderGivenList}
                        {errorMessage && <div className="error">{errorMessage}</div>}
                    </Row>

                </Form>
            </Row>
        </Container>
    )
}
export default GivenMoneyDetailsReport;