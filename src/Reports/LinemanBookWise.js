import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { baseURL } from "../utils/constant";
import { Table } from "react-bootstrap";
import { startOfWeek, dateFormat } from '../FunctionsGlobal/StartDateFn';
import { useTranslation } from "react-i18next";
import PlaceHolder from "../components/spinner/placeholder";
import {dateFormatdd} from "../FunctionsGlobal/StartDateFn"
import {
    useAuth
} from "@clerk/clerk-react";
function LinemanBookWise() {
    const { getToken } = useAuth();
    const { t } = useTranslation();
    const [rowsData, setRowsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const startDateRef = useRef(startOfWeek())
    const [linemannames, setLinemanNames] = useState([]);
    const linemanoptionRef=useRef(null)
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${baseURL}/linemancreate/get`).then((res) => {
                setLinemanNames(res.data);
                setIsLoading(false);
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessagelineman'));
                setIsLoading(false)
            })
        }
        fetchData();
    }, [getToken])
    const processList = async () => {
        setIsLoading(true);
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return (
            axios.get(`${baseURL}/lineman/get/bookwithcity`,{
                params:
                  {  lineman_id: linemanoptionRef.current.value, assigndate: dateFormat(startDateRef.current.value).toString() }}).then((res) => {
                setRowsData(res.data)
                console.log(res.data)
                setIsLoading(false);
                setErrorMessage("");
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessagecustomer'));
                setIsLoading(false);
            })
        )
    }
    const componentRef = useRef([]);
    const handlePrint = () => {

        window.print()
    }

    useEffect(() => {
        document.addEventListener("keydown", function (event) {

            if (event.key === "Enter" && event.target.nodeName === "INPUT") {
                var form = event.target.form;
                var index = Array.prototype.indexOf.call(form, event.target);
                if (event.target.name === "loanno") {
                    form.elements[index + 5].focus();
                }
                else {
                    form.elements[index + 1].focus();
                }
                event.preventDefault();
            }
        });
    }, []);






    return (
        <Container>
            <Form>
                <Row>
                    <Col xs={12} md={3} className="rounded bg-white">
                        <Form.Group className="mb-3" name="linemanname" border="primary" >
                            <Form.Label>{t('lineman')}</Form.Label>{/*lineman name*/}
                            <Form.Select data-cypress-loan-app-lineman="lineman"
                                aria-label="Default select example" ref={linemanoptionRef} required >
                                <option value="">{t('linemanplaceholder')}</option>
                                {
                                    linemannames.map((linemanname) => (
                                        <option key={linemanname._id} value={linemanname._id}>{linemanname.linemanname}</option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={2} className="rounded bg-white">
                        <Form.Group>
                            <Form.Label>{t('startdate')}</Form.Label>
                            <Form.Control type="date" ref={startDateRef} defaultValue={startOfWeek()} />
                        </Form.Group>
                    </Col>
                    <Col md={3} xs={6} className="rounded bg-white">
                        <Button variant="primary" size="lg" type="button" className="text-center mt-4" onClick={processList}>
                            {t('processbuttonlabel')}
                        </Button>{' '}
                    </Col>
                    <Col md={4} xs={6} className="rounded bg-white"></Col>
                </Row>
                <Row className="justify-content-md-center mt-5 ">

                    <Table className="table table-striped table-primary table-hover text-center  table-bordered border-dark" size="sm">
                        <thead>
                            <tr>
                                <th>{t('no')}</th>
                                <th style={{display:"none"}}>{t('city_id')}</th>
                                <th>{t('city')}</th>
                                <th style={{display:"none"}}>{t('displaycity_id')}</th>
                                <th>{t('displaycityname')}</th>
                                <th>{t('bookno')}</th>
                                <th>{t('lineno')}</th>
                                <th>{t('enddate')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableRows rowsData={rowsData} />
                        </tbody>
                        
                    </Table>
                </Row>
                <Row>
                    {isLoading ? <PlaceHolder /> : null}
                    {errorMessage && <div className="error">{errorMessage}</div>}

                </Row>

            </Form>
        </Container >

    )
}

function TableRows({ rowsData }) {
    return (
        rowsData.map((data, index) => {
            return (
                
                <tr key={index}>
                    <td>{index+1}</td>
                    <td style={{display:"none"}}>{data.city_id}</td>
                    <td>{data.cityname}</td>
                    <td style={{display:"none"}}>{data.displaycity_id}</td>
                    <td>{data.displaycityname}</td>
                    <td>{data.bookno}</td>
                    <td> {data.lineno}</td>
                    <td>{dateFormatdd(data.lastdateassign)}</td>
                </tr>
            )
        })

    )

}

export default LinemanBookWise;