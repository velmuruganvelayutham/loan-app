import React, { Fragment } from 'react'
import { Container, Row, Col, Form, Table } from 'react-bootstrap'
import { useTranslation } from "react-i18next";
import { dateFormatdd,dateFormatoneweek } from '../FunctionsGlobal/StartDateFn'
var first = [];
var arr1 = Array.from(Array(16).keys());
var arr2 = Array.from({ length: 9 }, (_, i) => i + 12)
function Chart({ loanno, ledger, company, date }) {
    let totalamount = 0;
    const { t, i18n } = useTranslation();

    var serialno = 0;
    var records = ledger
    let startdateadd;
    let relationtype=0;

    function TablesRows(no, date, income, balance) {

        return (
            <tr className={(records.length > 0 && first.weekcount<40) ?'chartheight':'chartheight42'}>
                <td style={{ fontSize: "11px",textAlign:"center",padding:"0",margin:"0" }} className='text-nowrap overflow-hidden'>{no}</td>
                <td style={{ fontSize: "11px",textAlign:"center",padding:"0",margin:"0" }} className='text-nowrap overflow-hidden'>{date !== "" ? dateFormatdd(date) : ""}</td>
                <td style={{ fontSize: "11px",textAlign:"center",padding:"0",margin:"0" }} className='text-nowrap overflow-hidden'>{income}</td>
                <td style={{ fontSize: "11px",textAlign:"center",padding:"0",margin:"0" }} className='text-nowrap overflow-hidden'>{balance}</td>
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
            arr1 = Array.from(Array(16).keys());
            arr2 = Array.from({ length: 9 }, (_, i) => i + 12)

        }


    }

    return (


        <Container className="rounded bg-white">
            <Row style={{paddingLeft:"5px"}}>
                <Form>

                    <Row className='col-sm-8 col-md-10 pt-5' >
                        <Col className='rounded bg-white col-sm-2 fixed fw-bold' style={{fontSize:"11px"}}>
                            {t('line') + " : " + (ledger.length > 0 ? first.lineno : "")}
                        </Col>
                        <Col className="rounded bg-white col-sm-4 fixed fw-bold" style={{fontSize:"11px"}}>
                            {company}
                        </Col>
                        <Col className="rounded bg-white col-sm-2 fixed fw-bold" style={{fontSize:"11px",position:"fixed",left:"32%"}}>
                            {t('bookno') + ':' + (ledger.length > 0 ? first.bookno : "")}
                        </Col>
                    </Row>
                    <Row>
                        <hr style={{
                            color: '#000000',
                            backgroundColor: '#000000',
                            height: .1,
                            width:"42%",
                            borderColor: '#000000'
                        }} />
                    </Row>
                    <Row className='col-sm-8 col-md-8'>
                        <Col className='col-sm-4 col-md-4' >
                            <Form.Group  >
                                <Form.Label className='text-nowrap overflow-hidden' style={{fontSize:"12px"}}>{t('customer')}&nbsp;:</Form.Label>
                                <Form.Label className='text-nowrap overflow-hidden' style={{fontSize:"12px"}}>&nbsp;{ledger.length > 0 ? first.customer : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label className='text-nowrap overflow-hidden' style={{fontSize:"12px"}}>{t('address')}&nbsp;&nbsp;&nbsp;:</Form.Label>
                                <Form.Label className='text-nowrap overflow-hidden' style={{fontSize:"12px"}}>&nbsp;{ledger.length > 0 ? first.address : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group  >
                                <Form.Label className='text-nowrap overflow-hidden' style={{fontSize:"12px"}}>{t('loanno')}&nbsp;:</Form.Label>
                                <Form.Label className='text-nowrap overflow-hidden' style={{"fontWeight":"bold"}}>&nbsp;{ledger.length > 0 ? first.loannumber : ""}</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col className='col-sm-4 col-md-4'>
                            <Form.Group  >
                                <Form.Label className='text-nowrap overflow-hidden' style={{fontSize:"12px"}}>{relationtype==0?t('fathername'):t('husbandname')}&nbsp;:</Form.Label>
                                <Form.Label className='text-nowrap overflow-hidden' style={{fontSize:"12px"}}>&nbsp;{ledger.length > 0 ? first.fathername : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group  >
                                <Form.Label className='text-nowrap overflow-hidden' style={{fontSize:"12px"}}>{t('city')}&nbsp;&nbsp;:</Form.Label>
                                <Form.Label  className='text-nowrap overflow-hidden'style={{fontSize:"12px"}}>&nbsp;{ledger.length > 0 ? first.referencecity : ""}</Form.Label>
                            </Form.Group>
                            <Form.Group  >
                                <Form.Label className='text-nowrap overflow-hidden' style={{fontSize:"12px"}}>{t('total')}&nbsp;&nbsp;:</Form.Label>
                                <Form.Label className='text-nowrap overflow-hidden' style={{"fontWeight":"bold"}}>&nbsp;{ledger.length > 0 ? first.totalamount : ""}</Form.Label>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Row>

            <Row className='col-sm-8 col-md-8'style={{paddingLeft:"5px"}} >
                <Col className='col-sm-4 col-md-4 p-0' >
                    <Table className="table text-center table-bordered border-dark chart" >
                        <thead>
                            <tr >
                                
                                <th style={{fontSize:"11px",padding:"0",margin:"0",width:"13%"}}>
                                    {t('no')}
                                </th>
                                <th style={{fontSize:"11px",padding:"0",margin:"0",width:"16%"}}>
                                    {t('date')}
                                </th>
                                <th style={{fontSize:"11px",padding:"0",margin:"0",width:"15%"}}>
                                    {t('pay')}
                                </th>
                                <th style={{fontSize:"11px",padding:"0",margin:"0",width:"17%"}}>
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
                <Col className='col-sm-4 col-md-4 p-0'  >
                    <Table className="table  text-center table-bordered border-dark chart " >
                        <thead>
                            <tr >
                                <th style={{fontSize:"11px",padding:"0",margin:"0",width:"13%"}}>
                                    {t('no')}
                                </th >
                                <th style={{fontSize:"11px",padding:"0",margin:"0",width:"16%"}}>
                                    {t('date')}
                                </th>
                                <th style={{fontSize:"11px",padding:"0",margin:"0",width:"15%"}}>
                                    {t('pay')}
                                </th>
                                <th style={{fontSize:"11px",padding:"0",margin:"0",width:"17%"}}>
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
            <Row className='col-sm-8 col-md-8 p-0 m-0' style={{paddingLeft:"10px"}}>
                <Col className='col-sm-4 col-md-4  text-nowrap overflow-hidden' style={{ fontSize: "11px",textAlign:"center",padding:"0",margin:"0" }}>{t('forcontanct')+":"+first.linemanname}</Col>
                <Col className='col-sm-4 col-md-4 text-nowrap overflow-hidden' style={{textAlign:"right"}}>{first.linemanmobile}</Col>
            </Row>
        </Container>




    )

}
export default Chart;