import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import ListSection from "./components/ListSection"
import axios from "axios"
import { baseURL } from "./utils/constant";
import PlaceHolder from "./components/spinner/placeholder";
import { useTranslation } from "react-i18next";
import {
    useAuth
} from "@clerk/clerk-react";
function AddSection() {
    const { getToken } = useAuth();
    const [input, setInput] = useState("");

    const [sectionnames, setSectionnames] = useState([]);
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
            axios.get(`${baseURL}/section/get`).then((res) => {
                setSectionnames(res.data)
                setIsLoading(false);
                setErrorMessage("");
            })
                .catch(error => {
                    console.log("error=", error);
                    setErrorMessage(t('errormessagesection'));
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

        if (input !== "" ) {
            addSection();
        }

    };

    const addSection = async () => {
        setIsLoading(true);
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.post(`${baseURL}/section/save`, { sectionname: input }).then((res) => {
            setIsLoading(false)
            setInput("")
            setErrorMessage("");
            setUpdateUI((prevState) => !prevState)
            alert(t('savealertmessage'));

        })
            .catch(error => {
                setErrorMessage(t('errormessagesavesection'));
                setIsLoading(false);
                console.log("error=", error);
            })

    }

    const updateMode = (id, text) => {
        setInput(text);
        setUpdateId(id);
    }

    const updateSection = async () => {
        setIsLoading(true);
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.put(`${baseURL}/section/update/${updateId}`, { sectionname: input }).then((res) => {
            setIsLoading(false)
            setUpdateUI((prevState) => !prevState)
            setInput("");
            setUpdateId(null);
            setErrorMessage("");
        }).catch(error => {
            setErrorMessage(t('errormessagesavesectionupdate'));
            setIsLoading(false);
            console.log("error=", error);
        })
        alert(t('savealertmessage'));
    }
    const clearFields = () => {
        setInput("");
        setUpdateId(null);
    }

    const renderSectionList = (
        <div className="text-center">
            <ListSection sectionnames={sectionnames} updateMode={updateMode} />
        </div>);

    return (

        <Container >
            <h2 className="text-center">{t('sectionheader')}</h2>
            <Row className="justify-content-md-center mt-5 ">
                <Col xs={12} lg={6} className="rounded bg-white">
                    <Form validated={validated}>
                        <Row className="rounded bg-white">
                            <Col xs={12} md={12} >
                                <Form.Group className="mb-3" name="sectionname" border="primary" >
                                    <Form.Label>{t('sectionname')}</Form.Label>
                                    <Form.Control type="text" data-cypress-loan-app-sectionname="sectionname" placeholder={t('sectionname')} required value={input} onChange={(e) => setInput(e.target.value)} autoFocus />
                                </Form.Group>
                            </Col>

                        </Row>
                        
                        <Row className="rounded bg-white">
                            <div className="col-md-12 text-center ">
                                <Button variant="primary" data-cypress-loan-app-save="save" type="button" className="text-center" onClick={updateId ? updateSection : handleSubmit}>
                                    {t('savebutton')}
                                </Button>{' '}
                                <Button variant="primary"
                                    type="button" className="text-center" onClick={clearFields}>{t('newbutton')}
                                </Button>
                            </div>
                            {isLoading ? <PlaceHolder /> : renderSectionList}
                            {errorMessage && <div className="error">{errorMessage}</div>}

                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>

    )
}
export default AddSection;