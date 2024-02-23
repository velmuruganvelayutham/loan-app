import React, { Fragment } from 'react'
import { Container, Row, Col, Form, Table } from 'react-bootstrap'
import { useTranslation } from "react-i18next";
import { dateFormatdd,dateFormatoneweek } from '../FunctionsGlobal/StartDateFn'
var first = [];
var arr1 = Array.from(Array(13).keys());
var arr2 = Array.from({ length: 12 }, (_, i) => i + 12)
function Chart({ loanno, ledger, company, date }) {
    let totalamount = 0;
    const { t, i18n } = useTranslation();

    var serialno = 0;
    var records = ledger
    let startdateadd;
    let relationtype=0;
    function TablesRows(no, date, income, balance) {

        return (
            <tr>
                <td style={{fontSize:"12px"}}>{no}</td>
                <td style={{fontSize:"12px"}}>{date !== "" ? dateFormatdd(date) : ""}</td>
                <td style={{fontSize:"12px"}}>{income}</td>
                <td style={{fontSize:"12px"}}>{balance}</td>
            </tr>
        )
    }

    if (loanno !== "") {

        first = records.length > 0 ? ledger[0] : "";
        
        totalamount = first.totalamount;
        startdateadd=new Date(first.startdate);
        relationtype=first.relationtype;
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
            arr1 = Array.from(Array(13).keys());
            arr2 = Array.from({ length: 12 }, (_, i) => i + 12)

        }


    }

    return (


        <Container className="rounded bg-white">
            <Row >
                <Form>

                    <Row className='col-sm-10 col-md-8 p-4'>
                        <Col className='rounded bg-white col-sm-4 fixed fw-bold'>
                            {t('line') + " : " + (ledger.length > 0 ? first.lineno : "")}
                        </Col>
                        <Col className="rounded bg-white col-sm-4 fixed fw-bold">
                            {company}
                        </Col>
                        <Col className="rounded bg-white col-sm-2 fixed fw-bold">
                            {t('bookno') + ':' + (ledger.length > 0 ? first.bookno : "")}
                        </Col>
                    </Row>
                    <Row>
                        <hr style={{
                            color: '#000000',
                            backgroundColor: '#000000',
                            height: .1,
                            width:"70%",
                            borderColor: '#000000'
                        }} />
                    </Row>
                    <Row className='p-4'>
                        <Col className='col-sm-4 fixed' >
                            <Form.Group  >
                                <Form.Label>{t('customer')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.customer : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group  >
                                <Form.Label>{t('address')}&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.address : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group  >
                                <Form.Label>{t('loanno')}&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label style={{"fontWeight":"bold"}}>&nbsp;{ledger.length > 0 ? first.loannumber : ""}</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col className='col-sm-4 fixed'>
                            <Form.Group  >
                                <Form.Label>{relationtype==0?t('fathername'):t('husbandname')}&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.fathername : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group  >
                                <Form.Label>{t('city')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.referencecity : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group  >
                                <Form.Label>{t('total')}&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label style={{"fontWeight":"bold"}}>&nbsp;{ledger.length > 0 ? first.totalamount : ""}</Form.Label>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Row>

            <Row className='col-sm-10 col-md-8 p-4'>
                <Col className='col-sm-5 col-md-4 p-0 ' >
                    <Table className="table text-center table-bordered border-dark  col-sm-3 col-md-3" >
                        <thead>
                            <tr >

                                <th className="col-sm-1 col-md-1">
                                    {t('no')}
                                </th>
                                <th className="col-sm-2 col-md-3">
                                    {t('date')}
                                </th>
                                <th className="col-sm-2 col-md-3">
                                    {t('pay')}
                                </th>
                                <th className="col-sm-2 col-md-3">
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
                                        totalamount = totalamount -first.dueamount ;
                                        if(serialno==1){
                                           
                                        }
                                        else{
                                            startdateadd=new Date(dateFormatoneweek(startdateadd));
                                        }
                                        
                                        

                                        return (

                                            <Fragment>
                                                {TablesRows(serialno,(startdateadd),first.dueamount, totalamount)}
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
                <Col className='col-sm-5 col-md- p-0' >
                    <Table className="table  text-center fs-6 table-bordered border-dark  " >
                        <thead>
                            <tr >
                                <th className="col-sm-1 col-md-1">
                                    {t('no')}
                                </th>
                                <th className="col-sm-2 col-md-3">
                                    {t('date')}
                                </th>
                                <th className="col-sm-2 col-md-3">
                                    {t('pay')}
                                </th>
                                <th className="col-sm-2 col-md-3">
                                    {totalamount}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                
                                    arr2.slice(0, (arr1.length + 1)).map((i) => {
                                        serialno = serialno + 1;
                                        totalamount = totalamount -first.dueamount ;
                                        startdateadd=new Date(dateFormatoneweek(startdateadd));
                                        return (
                                            TablesRows(serialno, startdateadd, first.dueamount, totalamount)
                                        )
                                    })

                            }
                        </tbody>
                    </Table>
                </Col>

            </Row>
        </Container>




    )

}
export default Chart;