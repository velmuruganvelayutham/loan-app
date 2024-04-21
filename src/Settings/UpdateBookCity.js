import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { baseURL } from "../utils/constant";
import { useTranslation } from "react-i18next";
import PlaceHolder from "../components/spinner/placeholder";
import {
    useAuth
} from "@clerk/clerk-react";
function UpdateBookCity() {
    const { getToken } = useAuth();
    const [citynames, setcitynames] = useState([]);
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [state, setState] = useState({
        city: '',
        actualbkno: 0,
        changedbkno: 0
    });
    const { city, actualbkno, changedbkno } = state

    useEffect(() => {
        async function fetchData() {
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axios.get(`${baseURL}/citycreate/get`).then((res) => {
                setcitynames(res.data)
                setErrorMessage("");
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessagecity'));
            })
        }
        fetchData();
    }, [getToken, t]);

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

    const updateBook = async () => {

        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.put(`${baseURL}/updatebookbycity/update`,
            {
                city_id: city, actualbooknumber: actualbkno, changebooknumber: changedbkno
            }).then((res) => {
                setErrorMessage("");
                clearFields();
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessageupdateloan'));
                setIsLoading(false);
            });
        alert(t('updatealertmessage'));
    }
    const clearFields = () => {
        setState({ ...state, city: '', actualbkno: '', changedbkno: '' });
    }
    return (
        <Container>
            <Row className="justify-content-md-center mt-5 ">
                <Form>
                    <Row>
                        <Col xs={6} md={4} className="rounded bg-white">

                            <Form.Group className="mb-3" name="lineno" border="primary" >
                                <Form.Label>{t('city')}</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    onChange={(e) => setState({ ...state, city: e.target.value })} value={city}>
                                    <option value={''}> {t('lineplaceholder')}</option>
                                    {
                                        citynames.map((cityname) => (
                                            <option key={cityname._id} value={cityname._id}>{cityname.cityname}</option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3} className="rounded bg-white">
                            <Form.Group className="mb-3" name="startdate" border="primary" >
                                <Form.Label>{t('actualbookno')}</Form.Label>
                                <Form.Control type="number" onChange={(e) => setState({ ...state, actualbkno: e.target.value })} value={actualbkno} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3} className="rounded bg-white">
                            <Form.Group className="mb-3" name="startdate" border="primary" >
                                <Form.Label>{t('changebookno')}</Form.Label>
                                <Form.Control type="number"
                                    onChange={(e) => setState({ ...state, changedbkno: e.target.value })} value={changedbkno} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={1}></Col>

                    </Row>
                    <Row>
                        {isLoading ? <PlaceHolder /> : null}
                        {errorMessage && <div className="error">{errorMessage}</div>}

                    </Row>
                    <Row >
                        <Col className="col-md-5">
                        </Col>
                        <Col className="col-md-3 mt-3">
                            <Button variant="primary" type="button" className="text-center" onClick={updateBook}>
                                {t('updatebutton')}
                            </Button>

                        </Col>
                        <Col></Col>
                    </Row>
                </Form>
            </Row>
        </Container>
    )
}
export default UpdateBookCity;