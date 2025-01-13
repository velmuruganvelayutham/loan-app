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
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState("");
    const { t } = useTranslation();
    const [company, setCompany] = useState([]);
    const [citynames, setCitynames] = useState([]);
    const [city, setCity] = useState(null);
    const componentRef = useRef();
    const endDateRef = useRef(endOfWeek());
    const [selectedOption, setSelectedOption] = useState(null);
    useEffect(() => {
        const preloadCities = async () => {
            setIsLoading(true); // Start loading
            try {
                const token = await getToken(); // Fetch token
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                const response = await axios.get(`${baseURL}/citycreate/get?q=`);
                const data = response.data.map((city) => ({
                    value: city._id,
                    label: city.cityname,
                }));

                // Update state and cache the result
                setCitynames(data);
                setErrorMessage("");
                setIsLoading(false);
            } catch (error) {
                console.log("error=", error);
                setErrorMessage(t('errormessagecity'));
                setIsLoading(false);
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        preloadCities();
    }, [getToken, t]);
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

    useEffect(() => {

        async function fetchData() {
            setIsLoading(true);
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${baseURL}/get/view?q=`).then((res) => {
                setCustomers(res.data);

                setIsLoading(false);
                setErrorMessage("");
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessageloan'));
                setIsLoading(false);
            })
        }
        fetchData();

    }, [getToken, t])
    const options = customers.map((cust, i) => {
        return {
            label: cust.customer + '-' + cust.fathername,
            value: cust._id,
            key: i
        }
    })
    const loadOptions = async (inputValue, callback) => {
        
        try {
            // Make an API call to fetch options based on the inputValue
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`${baseURL}/get/view?q=${inputValue}`, { params: { city: city.value.toString() } });
            const data = await response.data;

            // Map the fetched data to the format expected by React Select
            const options = data.map(item => ({
                value: item._id,
                label: item.customer + '-' + item.fathername,
            }));
            setSelectedOption(null)
            setCustomers(data);
            // Call the callback function with the options to update the dropdown
            callback(options);
        } catch (error) {
            console.error('Error fetching options:', error);
            callback([]);
        }
    };
    const processList = async () => {

        setIsLoading(true);
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return (
            axios.get(`${baseURL}/loan/givenmoney`, {
                params: {
                    customer_id: selectedOption.value.toString(),
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
        setCustomer(selectedOption.value);
        setSelectedOption(selectedOption);
    };
    const handleChangeCity=(selected)=>{
        setCity(selected);
    }
    return (
        <Container>
            <Row className="justify-content-md-center mt-5 ">
                <Form>
                    <Row>
                        <Col xs={12} md={4} className="rounded bg-white">

                            <Form.Group className="mb-3" name="linenumber" border="primary" >
                                <Form.Label>{t('city')}</Form.Label>
                                <Select
                                    options={citynames}
                                    isLoading={isLoading}
                                    onChange={handleChangeCity} // Handles selection
                                    placeholder={t('cityplaceholder')}
                                    value={city}
                                    isSearchable
                                    isClearable={true}
                                />
                                
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4} className="rounded bg-white">

                            <Form.Group className="mb-3" name="linenumber" border="primary" >
                                <Form.Label>{t('customer')}</Form.Label>
                                <AsyncSelect autoFocus
                                    id="react-select-3-input"
                                    isLoading={isLoading}
                                    value={selectedOption}
                                    onChange={handleChange}
                                    defaultOptions={options}
                                    placeholder={t('customer')}
                                    loadOptions={loadOptions} />
                            </Form.Group>
                        </Col>
                        <Col md={2} className="rounder bg-white d-none" >
                            <Form.Group>
                                <Form.Label>{t('enddate')}</Form.Label>
                                <Form.Control type="date" ref={endDateRef} defaultValue={endOfWeek()} />
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