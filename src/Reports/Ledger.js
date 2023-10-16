import React,{useState,Fragment, useRef,useEffect} from 'react'
import { Container,Row,Col,Form, FormGroup, FormControl ,Button, Alert,Table} from 'react-bootstrap'
import axios from "axios";
import {baseURL} from '../utils/constant';
import ReactToPrint from 'react-to-print';
import{dateFormatdd} from '../FunctionsGlobal/StartDateFn'
var first=[];
var arr1=Array.from(Array(13).keys());
var arr2=Array.from({length: 12}, (_, i) => i + 13)

function Ledger() {
    const[ledger,setLedger]=useState([])
    var serialno=0;
    useEffect(()=>{
        axios.get(`${baseURL}/ledger/get`).then((res)=>{
            setLedger(res.data);
             
        })
    },[])
     first=ledger[0];
     let totalamount=ledger.length>0?first.totalamount:0;
     //console.log(ledger.slice(13,ledger.length));
    const componentRef=useRef()
    const handlePrint=()=>{
        window.print()
    }
    function TablesRows(no,date,income,weekno){
        return(
            <tr>
              <td>{date!==""?dateFormatdd(date):""}</td>
              <td>{no==1 &&weekno==""?income:no}</td>
              <td>{no==1&&weekno==""?"":income}</td>
              <td>{no==1&&weekno!=""?income:""}</td>
              <td>{no==1&&weekno!=""||date==""?"":totalamount}</td>
              <td>{weekno}</td>  
            </tr>
        )
        
    }
    return (
        <div >
            <ReactToPrint trigger={()=>(
                <Button className='btn btn-primary'>Print</Button>
            )}
            content={()=>componentRef.current}
            />
            <Container ref={componentRef} className="rounded bg-white ">
            
            <Row className="justify-content-md-center  ">
            <Form>
                <Row>
                    <Col xs={12} md={4} className="rounded bg-white">
                    <h4 >லெட்ஜெர்</h4>
                    </Col>
                    <Col xs={12} md={4} className="rounded bg-white">
                    <h2 >Comapany Name</h2>
                    </Col>
                    <Col xs={12} md={4} className="rounded bg-white">
                    <h4 >தேதி</h4>
                    </Col>
                </Row>
                <Row>
                <hr  style={{
                    color: '#000000',
                    backgroundColor: '#000000',
                    height: .5,
                    borderColor : '#000000'
                }}/>
                </Row>
                <Row>
                    <Col  md={3} style={{outline:'1px solid orange',borderRadius:' 30px 30px 30px 30px'}}>
                    <Form.Group   border="primary" >
                            <Form.Label>பெயர்&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?first.customer:""}</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>த.பெயர்&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?first.fathername:""}</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>முகவரி&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?first.address:""}</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>ஊர்&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?first.cityname:""}</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>வேலை&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?first.work:""}</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>போன்&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?first.mobileno:""}</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col md={3} style={{outline:'1px solid orange',borderRadius:' 30px 30px 30px 30px'}}>
                    <Form.Group   border="primary" >
                            <Form.Label>வாரம்&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?first.weekcount:""}</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>லைன்&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?first.lineno:""}</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>வா.எண்&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?first.weekno:""}</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>புக் எண்&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?first.bookno:""}</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>டாகுமெண்ட்&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?first.document:""}</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>செக்&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?first.cheque:""}</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col md={3} style={{outline:'1px solid orange',borderRadius:' 30px 30px 30px 30px'}}>
                    <Form.Group   border="primary" >
                            <Form.Label>சீட்டு&nbsp;எண்&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;<h5>{ledger.length>0?first.loannumber:""}</h5></Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>ஆரம்ப&nbsp;தேதி&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?dateFormatdd(first.startdate):""}</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>கொடுத்த&nbsp;தேதி&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?dateFormatdd(first.givendate):""}</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>முடிவு&nbsp;தேதி&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;1{ledger.length>0?dateFormatdd(first.finisheddate):""}</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>கொடுப்பவர்&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?first.lineman_id:""}</Form.Label>
                        </Form.Group>
                        
                    </Col>
                    <Col md={3} style={{outline:'1px solid orange',borderRadius:' 30px 30px 30px 30px'}}>
                        <Form.Group   border="primary" >
                            <Form.Label>கொடுத்த&nbsp;பணம்&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?first.givenamount:""}</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>டா.சார்ச்&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?first.documentamount:""}</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>வட்டி&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?first.interestamount:""}</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>மொத்தம்&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?first.totalamount:""}</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>தவணை&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;{ledger.length>0?first.dueamount:""}</Form.Label>
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
                    borderColor : '#000000'
                }}/>
                </Row>

                <Row>
            <div className="col-xs-6 col-md-6">
            <Fragment>
            <div  className="container-fluid ">
            <Table    className="table text-center fs-6 table-bordered border-dark  " size="sm">
                <thead>
                    <tr >
                    <th  className="col-sm-12 col-md-3">
                    தேதி
                   </th>
                    <th className="col-sm-12 col-md-1">
                    த.எண்
                    </th>
                    <th className="col-sm-12 col-md-4">
                    வரவு
                    </th>
                    <th className="col-sm-12 col-md-4">
                    இருப்பு
                    </th>
                    <th className="col-sm-12 col-md-2 text-end">பற்று</th>
                    <th className="col-sm-12 col-md-2 text-end">வா.எண்</th>
                    </tr>
                </thead>
                <tbody>
                {
                    
                    ledger && ledger.length>0
                    ?
                    (ledger.slice(0,12).map((ledgerr)=>{
                        serialno=serialno+1;
                        
                        totalamount=totalamount-parseInt(ledgerr["joined"].collectedamount);
                        //totalamount=ledgerr.collectedamount;
                        
                    return(
                            
                            <Fragment>
                            {TablesRows(serialno,ledgerr.receiptdate,ledgerr["joined"].collectedamount,ledgerr["joined"].weekno)}
                            {serialno==1?TablesRows(serialno,first.startdate,ledgerr.totalamount,""):""}
                        </Fragment>
                    )
                    })
                    )
                    
                    :
                    "தரவு இல்லை"
                }
                {

                    
                    arr1.slice(ledger.length+1,13).map((i)=>{
                        serialno=serialno+1;
                        return(
                            TablesRows(serialno,"","","")
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
            <div  className="container-fluid ">
            <Table    className="table  text-center fs-6 table-bordered border-dark  " size="sm">
                <thead>
                    <tr >
                    <th  className="col-sm-12 col-md-3">
                    தேதி
                   </th>
                    <th className="col-sm-12 col-md-1">
                    த.எண்
                    </th>
                    <th className="col-sm-12 col-md-4">
                    வரவு
                    </th>
                    <th className="col-sm-12 col-md-4">
                    இருப்பு
                    </th>
                    <th className="col-sm-12 col-md-2 text-end">பற்று</th>
                    <th className="col-sm-12 col-md-2 text-end">வா.எண்</th>
                    </tr>
                </thead>
                <tbody>
                {
                    ledger.length>12 ?
                    ledger.slice(12,ledger.length).map((ledg)=>{
                        serialno=serialno+1;
                        totalamount=totalamount-parseInt(ledg["joined"].collectedamount);
                        return(
                            TablesRows(serialno,ledg.receiptdate,ledg["joined"].collectedamount,ledg["joined"].weekno)
                        )
                    })
                    :
                    arr2.slice(0,13).map((i)=>{
                        serialno=serialno+1;
                        return(
                            TablesRows(serialno,"","","")
                        )
                    })
                    
                }
                {(ledger.length>12)? 
                arr2.slice(ledger.length-arr2.length-1,13).map((i)=>{
                    serialno=serialno+1;
                        return(
                            TablesRows(serialno,"","","")
                        )
                })
                :""}
                </tbody>
            </Table>
            </div>
            </Fragment>
            </div>

            </Row>
            </Container>
        </div>

      )
    
}
export default Ledger