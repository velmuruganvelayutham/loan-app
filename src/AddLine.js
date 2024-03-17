import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import ListLine from "./components/ListLine"
import axios from "axios"
import { baseURL } from "./utils/constant";
import PlaceHolder from "./components/spinner/placeholder";
import { useTranslation } from "react-i18next";
import useJWTToken from "./utils/useJWTToken";
function AddLine() {
    const token = useJWTToken();
    const [input, setInput] = useState("");
    const [inputlineno, setInputLineno] = useState("")
    const [linenames, setLinenames] = useState([]);
    const [updateUI, setUpdateUI] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { t, i18n } = useTranslation();
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${baseURL}/linemancreate/get/lines`).then((res) => {
            setLinenames(res.data)
            console.log(res.data);
            setIsLoading(false)
        })
            .catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessageline'));
                setIsLoading(false);
            })
    }, [updateUI,token]);

    useEffect(() => {
        document.addEventListener("keydown", function (event) {
            if (event.key === "Enter" && event.target.nodeName === "INPUT") {
                var form = event.target.form;
                var index = Array.prototype.indexOf.call(form, event.target);
                form.elements[index + 1].focus();
                event.preventDefault();
            }
        });
    }, [token]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
        }
        setValidated(true);

        if (input !== "" && inputlineno !== "") {
            addLine();
        }

    };

    const addLine = () => {
        
        setIsLoading(true);

        axios.post(`${baseURL}/line/save`,{ linename: input, lineno: Number(inputlineno) }).then((res) => {
            setIsLoading(false)
            setInput("")
            setInputLineno("");
            setUpdateUI((prevState) => !prevState)
            alert(t('savealertmessage'));
        })
            .catch(error => {
                setErrorMessage(t('errormessagesaveline'));
                setIsLoading(false);
                console.log("error=", error);
            })
        
    }

    const updateMode = (id, text, lineno) => {
        setInput(text);
        setInputLineno(lineno);
        setUpdateId(id);
    }

    const updateLine = () => {
        setIsLoading(true);
        axios.put(`${baseURL}/line/update/${updateId}`, { linename: input, lineno: inputlineno }).then((res) => {
            setIsLoading(false)
            setUpdateUI((prevState) => !prevState)
            setInput("");
            setInputLineno("");
            setUpdateId(null);
        }).catch(error => {
            setErrorMessage(t('errormessagesaveline'));
            setIsLoading(false);
            console.log("error=", error);
        })
        alert(t('savealertmessage'));
    }
    const clearFields = () => {
        setInput("");
        setInputLineno("");
        setUpdateId(null);
    }

    const renderLineList = (
        <div className="text-center">
            <ListLine linenames={linenames} updateMode={updateMode} />
        </div>);

    return (

        <Container >
            <h2 className="text-center">{t('lineheader')}</h2>
            <Row className="justify-content-md-center mt-5 ">
                <Col xs={6} lg={6} className="rounded bg-white">
                    <Form validated={validated}>
                        <Row className="rounded bg-white">
                            <Col xs={12} md={12} >
                                <Form.Group className="mb-3" name="linename" border="primary" >
                                    <Form.Label>{t('line')}</Form.Label>
                                    <Form.Control type="text" placeholder={t('linename')} required value={input} onChange={(e) => setInput(e.target.value)} autoFocus />
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row className="rounded bg-white">
                            <Col xs={12} md={12} >
                                <Form.Group className="mb-3" name="lineno" border="primary" >
                                    <Form.Label>{t('lineno')}</Form.Label>
                                    <Form.Control type="number" placeholder={t('lineno')} required value={inputlineno} onChange={(e) => setInputLineno(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="rounded bg-white">
                            <div className="col-md-12 text-center ">
                                <Button variant="primary" type="button" className="text-center" onClick={updateId ? updateLine : handleSubmit}>
                                    {t('savebutton')}
                                </Button>{' '}
                                <Button variant="primary"
                                    type="button" className="text-center" onClick={clearFields}>{t('newbutton')}
                                </Button>
                            </div>
                            {isLoading ? <PlaceHolder /> : renderLineList}
                            {errorMessage && <div className="error">{errorMessage}</div>}

                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>

    )
}
export default AddLine;