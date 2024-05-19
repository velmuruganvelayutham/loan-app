import React, { Fragment } from 'react'
import { Container, Row, Col, Form, Table } from 'react-bootstrap'
import { useTranslation } from "react-i18next";
import { dateFormatdd, dateFormatoneweek } from '../FunctionsGlobal/StartDateFn'
var first = [];
var arr1 = Array.from(Array(16).keys());
var arr2 = Array.from({ length: 9 }, (_, i) => i + 12)
function Chart({ loanno, ledger, company, date }) {
    let totalamount = 0;
    const { t, i18n } = useTranslation();
    var serialno = 0;
    var records = ledger
    let startdateadd;
    let relationtype = 0;
    let fontsizevar = "11px";
    let paddingvar="5px";
    if (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 6) {
        fontsizevar = "10px";
        paddingvar="12px";
    }
    function TablesRows(no, date, income, balance) {
        return (
            <tr className={(records.length > 0 && first.weekcount < 40) ? 'chartheight' : 'chartheight42'}>
                <td style={{ fontSize: fontsizevar, textAlign: "center", padding: "0", margin: "0" }} className='text-nowrap overflow-hidden'>{no}</td>
                <td style={{ fontSize: fontsizevar, textAlign: "center", padding: "0", margin: "0" }} className='text-nowrap overflow-hidden'>{date !== "" ? dateFormatdd(date) : ""}</td>
                <td style={{ fontSize: fontsizevar, textAlign: "center", padding: "0", margin: "0" }} className='text-nowrap overflow-hidden'>{income}</td>
                <td style={{ fontSize: fontsizevar, textAlign: "center", padding: "0", margin: "0" }} className='text-nowrap overflow-hidden'>{balance}</td>
            </tr>
        )
    }

    if (loanno !== "") {
        first = records.length > 0 ? ledger[0] : "";
        totalamount = first.totalamount;
        startdateadd = new Date(first.startdate);
        relationtype = first.relationtype;
        if (first.weekcount === 12) {
            arr1 = Array.from(Array(12).keys());
            arr2 = [];
        }
        else if (first.weekcount === 32) {
            arr1 = Array.from(Array(16).keys());
            arr2 = Array.from({ length: 16 }, (_, i) => i + 16)
        }
        else if (first.weekcount === 42) {
            arr1 = Array.from(Array(21).keys());
            arr2 = Array.from({ length: 21 }, (_, i) => i + 21)
        }
        else if (first.weekcount === 43) {
            arr1 = Array.from(Array(21).keys());
            arr2 = Array.from({ length: 22 }, (_, i) => i + 21)
        }
        else if (first.weekcount === 25) {
            arr1 = Array.from(Array(16).keys());
            arr2 = Array.from({ length: 9 }, (_, i) => i + 12)
        }
        else if (first.weekcount === 24) {
            arr1 = Array.from(Array(12).keys());
            arr2 = Array.from({ length: 12 }, (_, i) => i + 12)
        }
        else if (first.weekcount === 20) {
            arr1 = Array.from(Array(12).keys());
            arr2 = Array.from({ length: 8 }, (_, i) => i + 12)
        }
        else if (first.weekcount === 11) {
            arr1 = Array.from(Array(11).keys());
            arr2 = Array.from({ length: 0 }, (_, i) => i + 12)
        }
    }

    return (
        <Container className="rounded bg-white" style={{ paddingLeft: "25px" }}>
            <Row style={{ paddingLeft: "5px" }}>
                <Form>

                    <Row className='col-sm-6 col-md-8 pt-3' style={{ whiteSpace: "nowrap", overflow: "hidden" }} >
                        <Col className={(Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ? 'rounded bg-white col-sm-2 fw-bold' : 'rounded bg-white col-sm-1 fw-bold'} style={{ fontSize: fontsizevar }}>
                            {t('lineshort') + ":" + (ledger.length > 0 ? first.lineno : "")}
                        </Col>
                        <Col className="rounded bg-white col-sm-4 fw-bold" style={{ fontSize: "12px" }}>
                            {company}
                        </Col>
                        <Col className="rounded bg-white col-sm-2 fw-bold" style={{ fontSize: fontsizevar, position: "fixed", left: (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ? "32%" : "25%" }}>
                            {t('booknomedium') + ':' + (ledger.length > 0 ? first.bookno : "")}
                        </Col>
                    </Row>
                    <Row>
                        <hr style={{
                            color: '#000000',
                            backgroundColor: '#000000',
                            height: '0',
                            width: (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ? "42%" : "33%",
                            borderColor: '#000000',
                            margin: '0',
                            padding: '0'
                        }} />
                    </Row>
                    <Row className={(Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ? 'col-sm-8 col-md-8' : 'col-sm-8 col-md-8'} >
                        <Col className={(Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ? 'col-sm-4 col-md-4' : 'col-sm-3 col-md-4'} >
                            <Form.Group  style={{ overflow: "hidden",whiteSpace: "nowrap" }}>
                                <Form.Label style={{ fontSize: fontsizevar, marginBottom: "0",display: "inline-block"}}>{(Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ? t('customer') : t('customershort')}&nbsp;:</Form.Label>
                                <Form.Label style={{ fontSize: fontsizevar, marginBottom: "0",display: "inline-block"}}>&nbsp;{ledger.length > 0 ? first.customer : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group style={{ overflow: "hidden",whiteSpace: "nowrap" }}>
                                <Form.Label style={{ fontSize: fontsizevar, marginBottom: "0",display: "inline-block"}}>{t('address')}&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label style={{ fontSize: fontsizevar, marginBottom: "0",display: "inline-block"}}>&nbsp;{ledger.length > 0 ? first.address : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group style={{ overflow: "hidden",whiteSpace: "nowrap" }}>
                                <Form.Label style={{ fontSize: fontsizevar, marginBottom: "0",display: "inline-block"}}>{t('loannoshort')}&nbsp;:</Form.Label>
                                <Form.Label style={{ "fontWeight": "bold", marginBottom: "0",display: "inline-block"}}>&nbsp;{ledger.length > 0 ? first.loannumber : ""}</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col className={(Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ? 'col-sm-4 col-md-4' : 'col-sm-3 col-md-4'} style={{ paddingLeft: "2px"}} >
                            <Form.Group  style={{ overflow: "hidden",whiteSpace: "nowrap" }}>
                                <Form.Label style={{ fontSize: fontsizevar, marginBottom: "0",display: "inline-block"}}>{relationtype == 0 ? (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ? t('fathername') : t('fathershort') : (Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ? t('husbandname') : t('husbandshort')}&nbsp;:</Form.Label>
                                <Form.Label style={{ fontSize: fontsizevar, marginBottom: "0",display: "inline-block"}}>&nbsp;{ledger.length > 0 ? first.fathername : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group  style={{ overflow: "hidden",whiteSpace: "nowrap" }}>
                                <Form.Label style={{ fontSize: fontsizevar, marginBottom: "0",display: "inline-block"}}>{t('city')}&nbsp;&nbsp;:</Form.Label>
                                <Form.Label style={{ fontSize: fontsizevar, marginBottom: "0",display: "inline-block"}}>&nbsp;{ledger.length > 0 ? first.referencecity : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group  style={{ overflow: "hidden",whiteSpace: "nowrap" }}>
                                <Form.Label style={{ fontSize: fontsizevar, marginBottom: "0",display: "inline-block"}}>{t('total')}&nbsp;&nbsp;:</Form.Label>
                                <Form.Label style={{ "fontWeight": "bold", marginBottom: "0",display: "inline-block"}}>&nbsp;{ledger.length > 0 ? first.totalamount : ""}</Form.Label>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Row>

            <Row className={(Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ? 'col-sm-8 col-md-8' : 'col-sm-8 col-md-8'} style={{ paddingLeft: paddingvar }} >
                <Col className={(Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ? 'col-sm-4 col-md-4 p-0' : 'col-sm-3 col-md-4 p-0'} >
                    <Table className="table text-center table-bordered border-dark chart" style={{ marginBottom: "0 !important" }}>
                        <thead>
                            <tr >

                                <th style={{ fontSize: "11px", padding: "0", margin: "0", width: "10%" }}>
                                    {t('countshort')}
                                </th>
                                <th style={{ fontSize: "11px", padding: "0", margin: "0", width: "19%" }}>
                                    {t('date')}
                                </th>
                                <th style={{ fontSize: "11px", padding: "0", margin: "0", width: "14%" }}>
                                    {t('pay')}
                                </th>
                                <th style={{ fontSize: "11px", padding: "0", margin: "0", width: "17%" }}>
                                    {ledger.length > 0 ? first.totalamount : ""}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                arr1 && arr1.length > 0
                                    ?
                                    (arr1.slice(0, arr1.length).map((arr1) => {
                                        serialno = serialno + 1;
                                        totalamount = totalamount - first.dueamount;
                                        if (serialno == 1) {

                                        }
                                        else {
                                            startdateadd = new Date(dateFormatoneweek(startdateadd));
                                        }



                                        return (

                                            <Fragment>
                                                {TablesRows(serialno, (startdateadd), first.dueamount, totalamount)}
                                            </Fragment>
                                        )
                                    })
                                    )

                                    :
                                    null
                            }
                        </tbody>
                    </Table>
                </Col>
                <Col className={(Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ? 'col-sm-4 col-md-4 p-0' : 'col-sm-3 col-md-4 p-0'}  >
                    <Table className="table  text-center table-bordered border-dark chart " style={{ marginBottom: "0 !important" }}>
                        <thead>
                            <tr >
                                <th style={{ fontSize: "11px", padding: "0", margin: "0", width: "10%" }}>
                                    {t('countshort')}
                                </th >
                                <th style={{ fontSize: "11px", padding: "0", margin: "0", width: "19%" }}>
                                    {t('date')}
                                </th>
                                <th style={{ fontSize: "11px", padding: "0", margin: "0", width: "14%" }}>
                                    {t('pay')}
                                </th>
                                <th style={{ fontSize: "11px", padding: "0", margin: "0", width: "17%" }}>
                                    {totalamount}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                arr2.slice(0, (arr1.length + 1)).map((i) => {
                                    serialno = serialno + 1;
                                    totalamount = totalamount - first.dueamount;
                                    startdateadd = new Date(dateFormatoneweek(startdateadd));
                                    return (
                                        TablesRows(serialno, startdateadd, first.dueamount, totalamount)
                                    )
                                })

                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            {(Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ?
                <Row className='col-sm-8 col-md-8 mt-0 pt-0' style={{ paddingLeft: "10px", whiteSpace: "nowrap", overflow: "hidden" }}>
                    <Col className='col-sm-4 col-md-4' style={{ fontSize: "11px", textAlign: "center", padding: "0", margin: "0",width:"30%",textOverflow: "ellipsis" }}>
                        {t('forcontanct') + ":"}<span style={{ fontWeight: "bold",display: "inline-block", width: "50%",textOverflow: "ellipsis" }}>{first.linemanname}</span>
                    </Col>
                    <Col className='col-sm-4 col-md-4' style={{width:"20%",textOverflow: "ellipsis",textAlign:"right",paddingLeft:"12%"}}>{first.linemanmobile}</Col>
                </Row>
                : null}
        </Container>




    )

}
export default Chart;