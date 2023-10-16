import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { baseURL } from "./utils/constant";
import ListCity from "./components/ListCity";
import PlaceHolder from "./components/spinner/placeholder";
import { useTranslation } from "react-i18next";
//var maxCitycode=0;
function AddCityName() {

    const [inputCity, setInputCity] = useState("");
    const [lineNo, setLineNo] = useState("");
    const [cityNames, setCityNames] = useState([]);
    const [lineNames, setLineNames] = useState([]);
    const [updateUI, setUpdateUI] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [validated, setValidated] = useState(false);
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${baseURL}/citycreate/get`).then((res) => {
            setCityNames(res.data);
            setIsLoading(false);
        }).catch(error => {
            console.log("error=", error);
            setErrorMessage("Unable to fetch cityname list");
            setIsLoading(false);
        })
    }, [updateUI]);
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

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
        }
        setValidated(true);

        if (inputCity !== "" && lineNo !== "") {
            addCityName();
        }

    };
    const addCityName = () => {
        setIsLoading(true);
        axios.post(`${baseURL}/citycreate/save`, { cityname: inputCity, citylineno: lineNo })
            .then((res) => {
                setIsLoading(false);
                setInputCity("");
                setLineNo("");
                setUpdateUI((prevState) => !prevState);
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage("Unable to Add City to the list");
                setIsLoading(false);
            })
        alert("City Saved Successfully");
    }
    const clearFields = () => {
        setInputCity("");
        setLineNo("");
        setUpdateId(null);
    }

    const updateMode = (id, text, lineno) => {
        //console.log(mobilenum);
        setInputCity(text);
        setLineNo(lineno)
        setUpdateId(id);

    }

    const updateCity = () => {
        setIsLoading(true);
        axios.put(`${baseURL}/citycreate/update/${updateId}`, { cityname: inputCity, citylineno: lineNo }).then((res) => {
            setIsLoading(false);
            setUpdateUI((prevState) => !prevState)
            setInputCity("");
            setLineNo("");
            setUpdateId(null);
        }).catch(error => {
            console.log("error=", error);
            setErrorMessage("Unable to update city list");
            setIsLoading(false);
        })
    }
    const renderCityNameList = (
        <ul>
            <ListCity citynames={cityNames} setUpdateUI={setUpdateUI} updateMode={updateMode} />
        </ul>
    );

    return (
        <Container>
            <h2 className="text-center">{t('cityheadername')}</h2>
            <Row className="justify-content-md-center mt-5 ">
                <Col xs={6} lg={6} className="rounded bg-white">
                    <Form validated={validated}>
                        <Form.Group className="mb-3" name="cityname" border="primary" >
                            <Form.Label>{t('citynamelabel')}</Form.Label>
                            <Form.Control type="text" placeholder={t('citynameplaceholder')} required value={inputCity} onChange={(e) => setInputCity(e.target.value)} />
                        </Form.Group>
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
                        <div className="col-md-12 text-center " >
                            <Button variant="primary" type="button" className="text-center" onClick={updateId ? updateCity : handleSubmit}>
                                {t('citysavebuttonlabel')}
                            </Button>{' '}
                            <Button variant="primary"
                                type="button" className="text-center" onClick={clearFields}>{t('citynewbttonlabel')}</Button>
                        </div>
                        {isLoading ? <PlaceHolder /> : renderCityNameList}
                        {errorMessage && <div className="error">{errorMessage}</div>}


                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
export default AddCityName;