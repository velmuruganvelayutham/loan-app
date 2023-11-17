import React, { Fragment} from 'react'
import { Container, Row, Col, Form,Table } from 'react-bootstrap'
import { useTranslation } from "react-i18next";
import { dateFormatdd } from '../FunctionsGlobal/StartDateFn'
var first = [];
var arr1 = Array.from(Array(12).keys());
var arr2 = Array.from({ length: 13 }, (_, i) => i + 12)
 function Ledger({ loanno, ledger }) {
    let totalamount = 0;
    const { t, i18n } = useTranslation();
    
    var serialno = 0;
    var records=ledger
    
    function TablesRows(no, date, income, weekno) {
        
        return (
            <tr>
                <td>{date !== "" ? dateFormatdd(date) : ""}</td>
                <td>{no == 1 && weekno == "" ? income : no}</td>
                <td>{no == 1 && weekno == "" ? "" : income}</td>
                <td>{no == 1 && weekno != "" ? income : ""}</td>
                <td>{no == 1 && weekno != "" || date == "" ? "" : totalamount}</td>
                <td>{weekno}</td>
            </tr>
        )
    }

    if(loanno!=="")
    {
        
        first = records.length > 0 ? ledger[0] : "";
       
        totalamount=first.totalamount;
        if(first.weekcount===12){
            arr1=Array.from(Array(12).keys());
            arr2=[];
        }
        else if(first.weekcount===32){
            arr1=Array.from(Array(16).keys());
            arr2 = Array.from({ length: 16 }, (_, i) => i + 16)
        }
        else if(first.weekcount===42){
            arr1=Array.from(Array(21).keys());
            arr2 = Array.from({ length: 21 }, (_, i) => i + 21)
        }
        else if(first.weekcount===43){
            arr1=Array.from(Array(21).keys());
            arr2 = Array.from({ length: 22 }, (_, i) => i + 21)
        }

    }
    
    return (
        
        <div >
            {
            loanno==""?<div>{t('nodatas')}</div>:<div><Container  className="rounded bg-white ">

            <Row className="justify-content-md-center  ">
                <Form>
                    <Row>
                        <Col xs={12} md={4} className="rounded bg-white">
                            <h4 >{t('ledger')}</h4>
                        </Col>
                        <Col xs={12} md={4} className="rounded bg-white">
                            <h2 >{t('companyname')}</h2>
                        </Col>
                        <Col xs={12} md={4} className="rounded bg-white">
                            <h4 >{t('date')}</h4>
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
                    <Row>
                        <Col md={3} style={{ outline: '1px solid orange', borderRadius: ' 30px 30px 30px 30px' }}>
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
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.cityname : ""}</Form.Label>
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
                        <Col md={3} style={{ outline: '1px solid orange', borderRadius: ' 30px 30px 30px 30px' }}>
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
                        </Col>
                        <Col md={3} style={{ outline: '1px solid orange', borderRadius: ' 30px 30px 30px 30px' }}>
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
                                <Form.Label>{t('lineman')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label>&nbsp;{ledger.length > 0 ? first.linemanname : ""}</Form.Label>
                            </Form.Group>

                        </Col>
                        <Col md={3} style={{ outline: '1px solid orange', borderRadius: ' 30px 30px 30px 30px' }}>
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

                        </Col>
                    </Row>
                </Form>
            </Row>
            <Row>
                <hr className='m-3' style={{
                    color: '#000000',
                    backgroundColor: '#000000',
                    height: .5,
                    borderColor: '#000000'
                }} />
            </Row>

            <Row>
                <div className="col-xs-6 col-md-6">
                    <Fragment>
                        <div className="container-fluid ">
                            <Table className="table text-center fs-6 table-bordered border-dark  " size="sm">
                                <thead>
                                    <tr >
                                        <th className="col-sm-12 col-md-3">
                                        {t('date')}
                                        </th>
                                        <th className="col-sm-12 col-md-1">
                                        {t('dueno')}
                                        </th>
                                        <th className="col-sm-12 col-md-4">
                                        {t('credit')} 
                                        </th>
                                        <th className="col-sm-12 col-md-4">
                                        {t('balance')} 
                                        </th>
                                        <th className="col-sm-12 col-md-2 text-end">{t('loanamount')}</th>
                                        <th className="col-sm-12 col-md-2 text-end">{t('weekno')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        ledger && ledger.length > 0
                                            ?
                                            (ledger.slice(0, arr1.length).map((ledgerr) => {
                                                serialno = serialno + 1;
                                                totalamount = totalamount - parseInt(ledgerr["joined"].collectedamount);
                                                //totalamount=ledgerr.collectedamount;

                                                return (

                                                    <Fragment>
                                                        {TablesRows(serialno, ledgerr.receiptdate, ledgerr["joined"].collectedamount, ledgerr["joined"].weekno)}
                                                        {serialno == 1 ? TablesRows(serialno, first.startdate, ledgerr.totalamount, "") : ""}
                                                    </Fragment>
                                                )
                                            })
                                            )

                                            :
                                            t('nodatas')
                                    }
                                    {


                                        arr1.slice(ledger.length, (arr1.length)).map((i) => {
                                            serialno = serialno + 1;
                                            return (
                                                TablesRows(serialno, "", "", "")
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Fragment>
                </div>

                <div className="col-xs-6 col-md-6">
                    <Fragment>
                        <div className="container-fluid ">
                            <Table className="table  text-center fs-6 table-bordered border-dark  " size="sm">
                                <thead>
                                    <tr >
                                        <th className="col-sm-12 col-md-3">
                                        {t('date')}
                                        </th>
                                        <th className="col-sm-12 col-md-1">
                                        {t('dueno')}
                                        </th>
                                        <th className="col-sm-12 col-md-4">
                                        {t('credit')}
                                        </th>
                                        <th className="col-sm-12 col-md-4">
                                        {t('balance')}
                                        </th>
                                        <th className="col-sm-12 col-md-2 text-end">{t('loanamount')}</th>
                                        <th className="col-sm-12 col-md-2 text-end">{t('weekno')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ledger.length > (arr1.length) ?
                                            ledger.slice(arr1.length, ledger.length).map((ledg) => {
                                                serialno = serialno + 1;
                                                totalamount = totalamount - parseInt(ledg["joined"].collectedamount);
                                                return (
                                                    TablesRows(serialno, ledg.receiptdate, ledg["joined"].collectedamount, ledg["joined"].weekno)
                                                )
                                            })
                                            :
                                            arr2.slice(0, (arr1.length+1)).map((i) => {
                                                serialno = serialno + 1;
                                                return (
                                                    TablesRows(serialno, "", "", "")
                                                )
                                            })

                                    }
                                    {(ledger.length > arr1.length) ?
                                        arr2.slice(ledger.length - arr2.length - 1, (arr1.length+1)-(ledger.length - arr2.length)).map((i) => {
                                            serialno = serialno + 1;
                                            return (
                                                TablesRows(serialno, "", "", "")
                                            )
                                        })
                                        : ""}
                                </tbody>
                            </Table>
                        </div>
                    </Fragment>
                </div>

            </Row>
        </Container>
        </div>
            }
            
        </div>
     
    )

}
export default Ledger;