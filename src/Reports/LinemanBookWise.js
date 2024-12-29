import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { baseURL } from "../utils/constant";
import { Table } from "react-bootstrap";
import { startOfWeek, dateFormat } from '../FunctionsGlobal/StartDateFn';
import { useTranslation } from "react-i18next";
import PlaceHolder from "../components/spinner/placeholder";
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
    const [citynames, setCitynames] = useState([]);
    const linemanoptionRef = useRef(null);
    const [selectAll, setSelectAll] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [enabledRows, setEnabledRows] = useState(
        Array(rowsData.length).fill(false)
    );
    const [isRestore, setIsRestore] = useState(false);

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
    useEffect(() => {
        async function fetchData() {
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axios.get(`${baseURL}/citycreate/get`).then((res) => {
                setCitynames(res.data)
                setErrorMessage("");
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessagecity'));
            })
        }
        fetchData();
    }, [getToken, t]);
    const processList = async () => {
        
        setIsLoading(true);
        setIsRestore(false);
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return (
            axios.get(`${baseURL}/lineman/get/bookwithcity`, {
                params:
                    { lineman_id: linemanoptionRef.current.value, assigndate: dateFormat(startDateRef.current.value).toString() }
            }).then((res) => {
                
                setRowsData(res.data);
                setSelectAll(false);
                setEnabledRows(rowsData.map(() => false));
                setIsLoading(false);
                setErrorMessage("");
                if (res.data.length > 0) {
                    setIsRestore(true);
                }

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

    const handleSelectAllChange = (event) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked);
        setEnabledRows(rowsData.map(() => isChecked));

    };

    const toggleRow = (index) => {
        const newEnabledRows = [...enabledRows];
        newEnabledRows[index] = !newEnabledRows[index];
        setEnabledRows(newEnabledRows);
    };
    const addTableRows = () => {
        //setIsRestore(false);
        const rowsInput = {
            serialno: rowsData.length + 1,
            city_id: '',
            displaycity_id: '',
            displaycityname: '',
            bookno: '',
            lineno: '',
            lastdateassign: ''
        }
        setRowsData([...rowsData, rowsInput])
        const newEnabledRows = [...enabledRows];
        newEnabledRows[rowsData.length] = true;
        setEnabledRows(newEnabledRows);
    }

    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);


    }
    const handleChange = (index, evnt) => {

        const { name, value } = evnt.target;
        const rowsInput = [...rowsData];
        if (name === "displaycity_id") {
            const selectedcity = citynames.find(city => city._id === value);
            if (selectedcity) {
                rowsInput[index]['displaycity_id'] = value;
                rowsInput[index]['displaycityname'] = selectedcity.cityname; // Set the city name
                setRowsData(rowsInput); // Update the state
            }
        } else {
            // Handle other input changes
            rowsInput[index][name] = value;
            setRowsData(rowsInput);
        }

        setRowsData(rowsInput);
    }
    const handleSubmit = async () => {

        let items = rowsData.map((item) => {

            if (rowsData.length > 0) {
                if ((item.city_id !== "") && (item.displaycity_id !== "") && (Number(item.bookno) !== 0) && (Number(item.lineno) !== 0)) {
                    return {
                        lineman_id: (linemanoptionRef.current.value),
                        city_id: item.city_id,
                        bookno: Number(item.bookno),
                        lastdateassign: new Date(item.lastdateassign),
                        lineno: Number(item.lineno),
                        displaycity_id: item.displaycity_id,
                        displaycityname: item.displaycityname
                    }
                }

            }

        });
        //console.log(items);
        setButtonDisabled(true);
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.post(`${baseURL}/lineman/save/details`, {
            items: items,
            assigndateupto: new Date(startDateRef.current.value),
            lineman_id: (linemanoptionRef.current.value)
        }).then((res) => {
            console.log(res.data);
            setRowsData([]);
            ClearDetails();
            setButtonDisabled(false);
            setErrorMessage("");

            alert(t('savealertmessage'))
        }).catch(error => {
            console.log("error=", error);
            setErrorMessage(t('errormessagesavelinemanbookwise'));
            setButtonDisabled(false);
        })
    }
    const ClearDetails = () => {
        setRowsData([]);
        setIsRestore(false);
        linemanoptionRef.current.value = "";
        startDateRef.current.value = startOfWeek();
    }
    const deleteLinmanBookCity = async () => {
        if (window.confirm(t('deletealertmessagelinemansettings'))) {
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.delete(`${baseURL}/lineman/bookwise/delete/${(linemanoptionRef.current.value)}/${dateFormat(startDateRef.current.value).toString()}`).then((res) => {
                console.log(res.data);
                alert(t('deletemessage'))
                setErrorMessage("");
                ClearDetails();
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessagedeletelinemanbookwise'));
                setIsLoading(false);
                setButtonDisabled(false);
            });
        }
    }

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
                                <th><input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAllChange} style={{ transform: 'scale(1.5)', margin: '10px' }}
                                />
                                </th>
                                <th>{t('no')}</th>
                                <th>{t('city')}</th>
                                <th>{t('displaycityname')}</th>
                                <th style={{ display: "none" }}>{t('displaycity_id')}</th>
                                <th>{t('bookno')}</th>
                                <th>{t('lineno')}</th>
                                <th>{t('enddate')}</th>
                                <th><Button className="btn btn-success" onClick={addTableRows} >+</Button></th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableRows rowsData={rowsData} citynames={citynames} deleteTableRows={deleteTableRows} handleChange={handleChange} selectAll={selectAll}
                                enabledRows={enabledRows} toggleRow={toggleRow} />
                        </tbody>

                    </Table>
                </Row>
                <Row>
                    <Col md={6} xs={6} >
                    </Col>
                    <Col md={6} xs={6} >
                        <Button variant="primary" size="lg" type="button" className="text-center" onClick={handleSubmit} disabled={isButtonDisabled}>
                            {t('savebutton')}
                        </Button>{' '}
                        <Button variant="primary" size="lg" type="button" className="text-center"
                            onClick={deleteLinmanBookCity} disabled={isRestore ? false : true}>
                            {t('deletebutton')}
                        </Button>

                    </Col>

                </Row>
                <Row>
                    {isLoading ? <PlaceHolder /> : null}
                    {errorMessage && <div className="error">{errorMessage}</div>}

                </Row>

            </Form>
        </Container >

    )
}

function TableRows({ rowsData, citynames, deleteTableRows, handleChange, selectAll, enabledRows, toggleRow }) {
    return (
        rowsData.map((data, index) => {
            return (

                <tr key={index}>
                    <td><input style={{ transform: 'scale(1.5)', margin: '10px' }}
                        type="checkbox"
                        checked={enabledRows[index]}
                        onChange={() => toggleRow(index)}
                    /></td>
                    <td className="col-1">{index + 1}</td>
                    <td className="col-3">
                        <Form.Select aria-label="Default select example"
                            value={data.city_id} required onChange={(evnt) => (handleChange(index, evnt))} name="city_id" disabled={!enabledRows[index]}>
                            <option key={data.city_id} value={""} ></option>

                            {
                                citynames.map((cityname) => (
                                    <option key={cityname._id} value={cityname._id}
                                    >{cityname.cityname}</option>
                                ))}

                        </Form.Select>
                    </td>

                    <td className="col-3"><Form.Select aria-label="Default select example"
                        value={data.displaycity_id} required onChange={(evnt) => (handleChange(index, evnt))} name="displaycity_id" disabled={!enabledRows[index]}>
                        <option key={data.displaycity_id} value={""} ></option>

                        {
                            citynames.map((cityname) => (
                                <option key={cityname._id} value={cityname._id}
                                >{cityname.cityname}</option>
                            ))}

                    </Form.Select></td>
                    <td style={{ display: "none" }}><input type="text"
                        name="displaycityname" className="form-control"
                        value={data.displaycityname || ''}
                        disabled={!enabledRows[index]}
                        onChange={(evnt) => (handleChange(index, evnt))} /></td>
                    <td className="col-2">
                        <input type="text" value={data.bookno}
                            name="bookno" className="form-control"
                            onChange={(evnt) => (handleChange(index, evnt))} disabled={!enabledRows[index]} /></td>
                    <td className="col-1"> <input type="text" value={data.lineno}
                        name="lineno" className="form-control"
                        onChange={(evnt) => (handleChange(index, evnt))} disabled={!enabledRows[index]} /></td>
                    <td className="col-2"><Form.Group className="mb-3" border="primary" >
                        <Form.Control type="date" name="lastdateassign" onChange={(evnt) => (handleChange(index, evnt))}
                            required value={(data.lastdateassign) ? (dateFormat(data.lastdateassign)) : startOfWeek()} disabled={!enabledRows[index]} />
                    </Form.Group></td>
                    <td><Button className="btn btn-danger" onClick={() => (deleteTableRows(index))} disabled={!enabledRows[index]}>x</Button></td>
                </tr>
            )
        })

    )

}

export default LinemanBookWise;