import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { baseURL } from "./utils/constant";
import ListReceipt from "./components/ListReceipt";
import { startOfWeek, dateFormat } from './FunctionsGlobal/StartDateFn';
import { useTranslation } from "react-i18next";
import PlaceHolder from "./components/spinner/placeholder";
function AddReceipt() {
  const [linenames, setLineNames] = useState([]);
  const [pendingLoan, setPendingLoan] = useState([]);
  const [childLoan, setChildLoan] = useState([]);
  const [startdateRef, setStartDateRef] = useState(startOfWeek());
  const [line, setLine] = useState(0);
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const receipt = useRef(null)


  useEffect(() => {
    setIsLoading(true);
    axios.get(`${baseURL}/citycreate/get`).then((res) => {
      setLineNames(res.data);
      setIsLoading(false);
      //console.log(res.data);
    }).catch(error => {
      console.log("error=", error);
      setErrorMessage(t('errormessagecity'));
      setIsLoading(false);
    })
  }, []);

  const processList = () => {
    setIsLoading(true);
    return (
      axios.get(`${baseURL}/receipt/get/loanpending`, { params: { cityid: line.toString(), receiptdate: dateFormat(startdateRef).toString() } }).then((res) => {
        setPendingLoan(res.data);
        setIsLoading(false);
        //console.log(res.data);
      }).catch(error => {
        console.log("error=", error);
        setErrorMessage(t('errormessageloan'));
        setIsLoading(false);
      })
    )
  }

  
    

  const saveReceipt = () => {
    const isFound = childLoan.find(element => {
      if(element.check===true)
      {
        return true;
      }
      else{
        return false;
      }
      
    });

    if(isFound){
      
      axios.post(`${baseURL}/receipt/save/details`, { receiptdata: childLoan, receiptdate: new Date(startdateRef) }).then((res) => {
        //console.log(res.data);
      }).then((res) => {
        setChildLoan([]);
        processList()
        alert(t('savealertmessage'))
      }).catch(error => {
        console.log("error=", error);
        setErrorMessage(t('errormessagesavereceipt'));
        
      })
    }
    else{
      alert(t("selectanyitemfromlist"))
    }
    
    
  }
  const renderloanpendingList = (
    <div className="col-md-12 text-center">
      <ListReceipt pending={pendingLoan} setpendingLoanFun={setChildLoan} />
    </div>
  )
  return (
    <Container>
      <Row className="justify-content-md-center mt-5 ">
        <Form>
          <Row>
            <Col xs={6} md={4} className="rounded bg-white">

              <Form.Group className="mb-3" name="lineno" border="primary" >
                <Form.Label>{t('line')}</Form.Label>
                <Form.Select aria-label="Default select example"
                  onChange={(e) => setLine(e.target.value)} value={line} >
                  <option value={0}> {t('lineplaceholder')}</option>
                  {
                    linenames.map((linename) => (
                      <option value={linename._id}>{linename.cityname}</option>
                    ))}
                </Form.Select>
              </Form.Group>


            </Col>
            <Col xs={12} md={1}></Col>
            <Col xs={12} md={4} className="rounded bg-white">
              <Form.Group className="mb-3" name="startdate" border="primary" >
                <Form.Label>{t('date')}</Form.Label>
                <Form.Control type="date" placeholder="loan start date" value={startdateRef}
                  onChange={(e) => setStartDateRef(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <div className="col-md-12 text-center " >
            <Button variant="primary" type="button" className="text-center" onClick={processList}>
                {t('processbuttonlabel')}
              </Button>{' '}
              <Button variant="primary" type="button" className="text-center" onClick={saveReceipt}>
                {t('savebutton')}
              </Button>
              
            </div>
          </Row>
          <Row>
            {isLoading ? <PlaceHolder /> : renderloanpendingList}
            {errorMessage && <div className="error">{errorMessage}</div>}

          </Row>
        </Form>
      </Row>
    </Container>
  )
}
export default AddReceipt;