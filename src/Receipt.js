import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { baseURL } from "./utils/constant";
import ListReceipt from "./components/ListReceipt";
import { startOfWeek, dateFormat } from './FunctionsGlobal/StartDateFn';
import { useTranslation } from "react-i18next";
import PlaceHolder from "./components/spinner/placeholder";
function AddReceipt1() {
  const [linenames, setLineNames] = useState([]);
  const [pendingLoan, setPendingLoan] = useState([]);
  const [startdateRef, setStartDateRef] = useState(startOfWeek());
  const [line, setLine] = useState(0);
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
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

  const processList = () => {
    setIsLoading(true);
    return (
      axios.get(`${baseURL}/receipt/get/loanpending`, { params: { cityid: line.toString(), receiptdate: dateFormat(startdateRef).toString() } }).then((res) => {
        setPendingLoan(res.data);
        setIsLoading(false);

      }).catch(error => {
        console.log("error=", error);
        setErrorMessage(t('errormessageloan'));
        setIsLoading(false);
      })
    )
  }




  const saveReceipt = () => {
    var noweek = 0;
    const isFound = pendingLoan.find(element => {
      console.log(element.check);
      console.log(element.weak);
      console.log(element.amount);
      if (element.check === true) {
        if (element.weak != "" && element.amount > 0) {
          noweek = 1;
          return true;
        }
        else {
          noweek = 0;
          return true;
        }
      }
      else {
        return false;
      }

    });



    if (isFound) {
      if (noweek === 1) {
        setButtonDisabled(true);
        axios.post(`${baseURL}/receipt/save/details`, { receiptdata: pendingLoan, receiptdate: new Date(startdateRef) }).then((res) => {
          //console.log(res.data);
        }).then((res) => {
          setPendingLoan([]);
          setButtonDisabled(false);
          processList()
          alert(t('savealertmessage'))
        }).catch(error => {
          console.log("error=", error);
          setErrorMessage(t('errormessagesavereceipt'));
          setButtonDisabled(false);
        })
      }
      else {
        alert("Properly Fill the Details");
      }

    }
    else {
      alert(t("selectanyitemfromlist"));
    }

  }
  const renderloanpendingList = (
    <div className="col-md-12 text-center">
      <ListReceipt pending={pendingLoan} setpendingLoanFun={setPendingLoan} />
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
            <Col xs={12} md={3} className="rounded bg-white">
              <Form.Group className="mb-3" name="startdate" border="primary" >
                <Form.Label>{t('date')}</Form.Label>
                <Form.Control type="date" placeholder="loan start date" value={startdateRef}
                  onChange={(e) => setStartDateRef(e.target.value)} />
              </Form.Group>
            </Col>
            <Col xs={12} md={1}></Col>
            
          </Row>
          <Row>
            <div className="col-md-12 text-center " >
              <Button variant="primary" type="button" className="text-center" onClick={processList}>
                {t('processbuttonlabel')}
              </Button>{' '}

            </div>
          </Row>
          <Row>
            {isLoading ? <PlaceHolder /> : renderloanpendingList}
            {errorMessage && <div className="error">{errorMessage}</div>}

          </Row>
          <Row >
            <Col>
            </Col>

            <Col className="col-md-3">
              <Button variant="primary" type="button" className="text-center" onClick={saveReceipt} disabled={isButtonDisabled}>
                {t('savebutton')}
              </Button>
              
            </Col>
            <Col></Col>
          </Row>
        </Form>
      </Row>
    </Container>
  )
}
export default AddReceipt1;