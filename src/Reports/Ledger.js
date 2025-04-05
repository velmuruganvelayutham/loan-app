import React, { Fragment } from 'react'
import { Container, Row, Col, Form, Table } from 'react-bootstrap'
import { useTranslation } from "react-i18next";
import { dateFormatdd } from '../FunctionsGlobal/StartDateFn'
var first = [];
var arr1 = Array.from(Array(12).keys());
var arr2 = Array.from({ length: 13 }, (_, i) => i + 12);
var arr3 = [];
var arr4 = [];
function Ledger({ loanno, ledger, company, date }) {
    let totalamount = 0;
    const { t } = useTranslation();

    var serialno = 0;
    var records = ledger

    function TablesRows(no, date, income, weekno, type, receipttype) {

        return (
            <tr className={receipttype>0? 'chartheight table-danger' : 'chartheight'}>
                <td style={{ fontSize: "11px", padding: "0", margin: "0" }}>{date !== "" ? dateFormatdd(date) : ""}</td>
                <td style={{ fontSize: "11px", padding: "0", margin: "0" }}>{Number(no) === 1 && (weekno === "") ? income : no}</td>
                <td style={{ fontSize: "11px", padding: "0", margin: "0" }}>{Number(no) === 1 && (weekno === "") ? "" : income}</td>
                <td style={{ fontSize: "11px", padding: "0", margin: "0" }}>{Number(no) === 1 && (weekno !== "") ? income : ""}</td>
                <td style={{ fontSize: "11px", padding: "0", margin: "0" }}>{(Number(no) === 1 && (weekno !== "")) || date === "" ? "" : totalamount}</td>
                <td style={{ fontSize: "11px", padding: "0", margin: "0" }}>{weekno}</td>
                {type === "second" ? <td></td> : null}
            </tr>
        )
    }

    if (loanno !== "") {

        first = records.length > 0 ? ledger[0] : "";

        totalamount = first.totalamount;
        arr3 = [];
        arr4 = [];
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
            arr1 = Array.from(Array(12).keys());
            arr2 = Array.from({ length: 13 }, (_, i) => i + 12)

        }
        else if (first.weekcount === 24) {
            arr1 = Array.from(Array(12).keys());
            arr2 = Array.from({ length: 12 }, (_, i) => i + 12)

        }
        else if (first.weekcount === 26) {
            arr1 = Array.from(Array(13).keys());
            arr2 = Array.from({ length: 13 }, (_, i) => i + 13)

        }
        else if (first.weekcount === 20) {
            arr1 = Array.from(Array(10).keys());
            arr2 = Array.from({ length: 10 }, (_, i) => i + 12)

        }
        else if (first.weekcount === 11) {
            arr1 = Array.from(Array(11).keys());
            arr2 = Array.from({ length: 0 }, (_, i) => i + 12)

        }
        else if (first.weekcount === 65 || first.weekcount === 60) {
            arr1 = Array.from(Array(25).keys());
            arr2 = Array.from({ length: 25 }, (_, i) => i + 25)
            arr3 = Array.from({ length: (first.weekcount-50) }, (_, i) => i + 51)
        }
        else if (first.weekcount === 90) {
            arr1 = Array.from(Array(25).keys());
            arr2 = Array.from({ length: 25 }, (_, i) => i + 25)
            arr3 = Array.from({ length: 25 }, (_, i) => i + 51)
            arr4 = Array.from({ length: 15 }, (_, i) => i + 76)
        }
        else if (first.weekcount === 100) {
            arr1 = Array.from(Array(25).keys());
            arr2 = Array.from({ length: 25 }, (_, i) => i + 25)
            arr3 = Array.from({ length: 25 }, (_, i) => i + 51)
            arr4 = Array.from({ length: 25 }, (_, i) => i + 76)
        }
        arr2 = ledger.length > first.weekcount ? Array.from({ length: ledger.length - arr1.length }, (_, i) => i + (ledger.length - arr1.length)) : arr2
        //alert(ledger.length-arr1.length);
    }

    const tableData = Array.from({ length: arr1.length + arr2.length + arr3.length + arr4.length }, (_, i) => ledger[i] || {});

    return (


        <Container className="rounded bg-white" style={{ paddingLeft: "25px" }}>
            <Row className="justify-content-sm-center">
                <Form>

                    <Row className='mt-5'>
                        <Col className="rounded bg-white col-sm-3 fixed fw-bold">
                            {t('ledger')}
                        </Col>
                        <Col className="rounded bg-white col-sm-5 fixed fw-bold">
                            {company}
                        </Col>
                        <Col className="rounded bg-white col-sm-4 fixed fw-bold">
                            {t('date') + ':' + dateFormatdd(date)}
                        </Col>
                    </Row>
                    <Row>
                        <hr style={{
                            color: '#000000',
                            backgroundColor: '#000000',
                            height: .5,
                            borderColor: '#000000'
                        }} />
                    </Row>
                    <Row className='p-3'>
                        <Col className='col-sm-3 fixed' style={{ outline: '1px solid orange', borderRadius: ' 30px 30px 30px 30px' }}>
                            <Form.Group border="primary" >
                                <Form.Label>{t('customer')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.customer : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('fathername')}&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.fathername : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('address')}&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.address : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('city')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.referencecity : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('work')}&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.work : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('phoneno')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.mobileno : ""}</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col className='col-sm-3 fixed' style={{ outline: '1px solid orange', borderRadius: ' 30px 30px 30px 30px' }}>
                            <Form.Group border="primary" >
                                <Form.Label>{t('week')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.weekcount : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('line')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.lineno : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('weekno')}&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.weekno : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('bookno')}&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.bookno : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('document')}&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.document : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('cheque')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.cheque : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('bond')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.bond : ""}</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col className='col-sm-3 fixed' style={{ outline: '1px solid orange', borderRadius: ' 30px 30px 30px 30px' }}>
                            <Form.Group border="primary" >
                                <Form.Label>{t('loanno')}&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;<h5>{ledger.length > 0 ? first.loannumber : ""}</h5></Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('startdate')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? dateFormatdd(first.startdate) : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('givendate')}&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? dateFormatdd(first.givendate) : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('enddate')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? dateFormatdd(first.finisheddate) : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('lineman')}&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.linemanname : ""}</Form.Label>
                            </Form.Group>

                        </Col>
                        <Col className='col-sm-3 fixed' style={{ outline: '1px solid orange', borderRadius: ' 30px 30px 30px 30px' }}>
                            <Form.Group border="primary" >
                                <Form.Label>{t('givenamount')}&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.givenamount : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('documentcharge')}&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.documentamount : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('interest')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.interestamount : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('total')}&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.totalamount : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group border="primary" >
                                <Form.Label>{t('due')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.dueamount : ""}</Form.Label>
                            </Form.Group>
                            {ledger.length > 0 ?
                                (< Form.Group border="primary" >
                                    <Form.Label>{first.advancetype === 2 ? t('latepending') : t('advanceless')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                    <Form.Label>&nbsp;{first.advanceless}</Form.Label>
                                </Form.Group>) : ""
                            }
                            {ledger.length > 0 ? first.topay !== 0 ?
                                (< Form.Group border="primary" >
                                    <Form.Label>{first.topay > 0 ? t('pending') : t('showAdvance')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                    <Form.Label>&nbsp;{first.topay}</Form.Label>
                                </Form.Group>) : "" : ""
                            }
                        </Col>
                    </Row>
                </Form>
            </Row >
            <Row>
                <hr className='m-3' style={{
                    color: '#000000',
                    backgroundColor: '#000000',
                    height: .5,
                    borderColor: '#000000'
                }} />
            </Row>

            <Row style={{ paddingLeft: "8px" }} className="gx-0">
                <Col className='col-sm-6 col-md-6 p-1'>
                    <Table className="table text-center table-bordered border-dark" >
                        <thead>
                            <tr >
                                <th className="col-sm-1 col-md-1">
                                    {t('date')}
                                </th>
                                <th className="col-sm-1 col-md-1">
                                    {t('dueno')}
                                </th>
                                <th className="col-sm-1 col-md-1">
                                    {t('credit')}
                                </th>
                                <th className="col-sm-1 col-md-1">
                                    {t('balance')}
                                </th>
                                <th className="col-sm-1 col-md-1 text-end">{t('loanamount')}</th>
                                <th className="col-sm-1 col-md-1 text-end">{t('noshorts')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                tableData.slice(0, arr1.length).map((item, index) => {
                                    serialno += 1;
                                    totalamount -= item.collectedamount || 0;
                                    return (
                                        <Fragment key={index}>
                                            {TablesRows(serialno, item.receiptdate || "", item.collectedamount || "", item.weekno || "", "", item.receipttype)}
                                            {Number(serialno) === 1 ? TablesRows(serialno, first.startdate, "", "") : ""}
                                        </Fragment>
                                    );
                                })

                            }
                        </tbody>
                    </Table>
                </Col>

                <Col className='col-sm-6 col-md-6 p-0' >
                    <Table className="table  text-center table-bordered border-dark"   >
                        <thead>
                            <tr >

                                <th style={{ width: "20%" }}>
                                    {t('date')}
                                </th>
                                <th style={{ width: "10%" }}>
                                    {t('dueno')}
                                </th>
                                <th style={{ width: "15%" }}>
                                    {t('credit')}
                                </th>
                                <th style={{ width: "15%" }}>
                                    {t('balance')}
                                </th>
                                <th style={{ width: "15%" }}>{t('loanamount')}</th>
                                <th style={{ width: "5%" }}>{t('noshorts')}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.slice(arr1.length, (arr1.length + arr2.length)).map((item, index) => {
                                serialno += 1;
                                totalamount -= item.collectedamount || 0;

                                return (
                                    <Fragment key={index}>
                                        {TablesRows(serialno, item.receiptdate || "", item.collectedamount || "", item.weekno || "", "second", item.receipttype)}
                                    </Fragment>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
                {arr3.length > 0 && <Col className='col-sm-6 col-md-6 p-1'>
                    <Table className="table text-center table-bordered border-dark" >
                        <thead>
                            <tr >
                                <th className="col-sm-1 col-md-1">
                                    {t('date')}
                                </th>
                                <th className="col-sm-1 col-md-1">
                                    {t('dueno')}
                                </th>
                                <th className="col-sm-1 col-md-1">
                                    {t('credit')}
                                </th>
                                <th className="col-sm-1 col-md-1">
                                    {t('balance')}
                                </th>
                                <th className="col-sm-1 col-md-1 text-end">{t('loanamount')}</th>
                                <th className="col-sm-1 col-md-1 text-end">{t('noshorts')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.slice(arr2.length, (arr2.length + arr3.length)).map((item, index) => {
                                serialno += 1;
                                totalamount -= item.collectedamount || 0;

                                return (
                                    <Fragment key={index}>
                                        {TablesRows(serialno, item.receiptdate || "", item.collectedamount || "", item.weekno || "", "first", item.receipttype)}
                                    </Fragment>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>}
                {arr4.length > 0 && <Col className='col-sm-6 col-md-6 p-0' >
                    <Table className="table  text-center table-bordered border-dark"   >
                        <thead>
                            <tr >

                                <th style={{ width: "20%" }}>
                                    {t('date')}
                                </th>
                                <th style={{ width: "10%" }}>
                                    {t('dueno')}
                                </th>
                                <th style={{ width: "15%" }}>
                                    {t('credit')}
                                </th>
                                <th style={{ width: "15%" }}>
                                    {t('balance')}
                                </th>
                                <th style={{ width: "15%" }}>{t('loanamount')}</th>
                                <th style={{ width: "5%" }}>{t('noshorts')}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.slice(arr3.length, (arr3.length + arr4.length)).map((item, index) => {
                                serialno += 1;
                                totalamount -= item.collectedamount || 0;

                                return (
                                    <Fragment key={index}>
                                        {TablesRows(serialno, item.receiptdate || "", item.collectedamount || "", item.weekno || "", "second", item.receipttype)}
                                    </Fragment>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>}
            </Row>
        </Container >




    )

}
export default Ledger;