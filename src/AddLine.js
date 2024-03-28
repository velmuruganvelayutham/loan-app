import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import ListLine from "./components/ListLine"
import axios from "axios"
import { baseURL } from "./utils/constant";
import PlaceHolder from "./components/spinner/placeholder";
import { useTranslation } from "react-i18next";
import {
    useAuth
} from "@clerk/clerk-react";
function AddLine() {
    const { getToken } = useAuth();
    const [input, setInput] = useState("");
    const [inputlineno, setInputLineno] = useState("")
    const [linenames, setLinenames] = useState([]);
    const [updateUI, setUpdateUI] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { t } = useTranslation();
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${baseURL}/linemancreate/get/lines`).then((res) => {
                setLinenames(res.data)
                console.log(res.data);
                setIsLoading(false);
                setErrorMessage("");
            })
                .catch(error => {
                    console.log("error=", error);
                    setErrorMessage(t('errormessageline'));
                    setIsLoading(false);
                })
        }
        fetchData();
    }, [updateUI, t, getToken]);

    useEffect(() => {
        document.addEventListener("keydown", function (event) {
            if (event.key === "Enter" && event.target.nodeName === "INPUT") {
                var form = event.target.form;
                var index = Array.prototype.indexOf.call(form, event.target);
                form.elements[index + 1].focus();
                event.preventDefault();
            }
        });
    }, []);

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

    const addLine = async () => {
        setIsLoading(true);
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.post(`${baseURL}/line/save`, { linename: input, lineno: Number(inputlineno) }).then((res) => {
            setIsLoading(false)
            setInput("")
            setInputLineno("");
            setErrorMessage("");
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

    const updateLine = async () => {
        setIsLoading(true);
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.put(`${baseURL}/line/update/${updateId}`, { linename: input, lineno: inputlineno }).then((res) => {
            setIsLoading(false)
            setUpdateUI((prevState) => !prevState)
            setInput("");
            setInputLineno("");
            setUpdateId(null);
            setErrorMessage("");
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
                                    <Form.Control type="text" data-cypress-loan-app-linename="linename" placeholder={t('linename')} required value={input} onChange={(e) => setInput(e.target.value)} autoFocus />
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row className="rounded bg-white">
                            <Col xs={12} md={12} >
                                <Form.Group className="mb-3" name="lineno" border="primary" >
                                    <Form.Label>{t('lineno')}</Form.Label>
                                    <Form.Control type="number" data-cypress-loan-app-lineno="lineno" placeholder={t('lineno')} required value={inputlineno} onChange={(e) => setInputLineno(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="rounded bg-white">
                            <div className="col-md-12 text-center ">
                                <Button variant="primary" data-cypress-loan-app-save="save" type="button" className="text-center" onClick={updateId ? updateLine : handleSubmit}>
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