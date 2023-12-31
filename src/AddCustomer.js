import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import List from "./components/List"
import axios from "axios"
import { baseURL } from "./utils/constant";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useTranslation } from "react-i18next";
import PlaceHolder from "./components/spinner/placeholder";
function AddCustomer() {
  const [input, setInput] = useState("");
  const [inputmobileno, setInputMobileno] = useState("")
  const [customers, setCustomer] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [radioValue, setRadioValue] = useState("0");
  const [citynames, setCitynames] = useState([]);
  const [validated, setValidated] = useState(false);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { t, i18n } = useTranslation();
  const fathernameref = useRef(null);
  const addressRef = useRef(null);
  const workRef = useRef(null);
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${baseURL}/citycreate/get`).then((res) => {
      setCitynames(res.data)
      setIsLoading(false);
    }).catch(error => {
      console.log("error=", error);
      setErrorMessage(t('errormessagecity'));
      setIsLoading(false);
    })

  }, [t]);
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${baseURL}/get/view`).then((res) => {
      setCustomer(res.data);
      setIsLoading(false);
    }).catch(error => {
      console.log("error=", error);
      setErrorMessage(t('errormessagecustomer'));
      setIsLoading(false);
    })
  }, [updateUI,t]);

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


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
    }
    setValidated(true);

    if (input !== "" && inputmobileno != "" && city !== "" && fathernameref.current.value !== ""
      && addressRef.current.value !== "" && workRef.current.value !== "") {
      addCustomer();
    }

  };


  const addCustomer = () => {
    setIsLoading(true);
    axios.post(`${baseURL}/save`, {
      customer: input, mobileno: inputmobileno, cityid: city, fathername: fathernameref.current.value,
      address: addressRef.current.value, work: workRef.current.value, relationtype: Number(radioValue)
    }).then((res) => {
      setIsLoading(false);
      setInput("")
      setInputMobileno("");
      setCity("");
      setRadioValue("0")
      fathernameref.current.value = "";
      addressRef.current.value = "";
      workRef.current.value = "";
      setUpdateUI((prevState) => !prevState)
    }).catch(error => {
      console.log("error=", error);
      setErrorMessage(t('errormessagesavecustomer'));
      setIsLoading(false);
    })
    alert(t('savealertmessage'));
  }

  const updateMode = (id, text, mobilenum, cityid, father, addr, wrk, relation) => {
    //console.log(mobilenum);
    setInput(text);
    setInputMobileno(mobilenum);
    setCity(cityid);
    setRadioValue(relation == 1 ? "1" : "0");
    fathernameref.current.value = father;
    addressRef.current.value = addr;
    workRef.current.value = wrk;
    setUpdateId(id);

  }

  const updateCustomer = () => {
    setIsLoading(true);
    axios.put(`${baseURL}/update/${updateId}`, {
      customer: input, mobileno: inputmobileno, cityid: city, fathername: fathernameref.current.value,
      address: addressRef.current.value, work: workRef.current.value, relationtype: Number(radioValue)
    }).then((res) => {
      setIsLoading(false);
      setUpdateUI((prevState) => !prevState)
      setInput("");
      setInputMobileno("");
      setCity("");
      setRadioValue("0")
      fathernameref.current.value = "";
      addressRef.current.value = "";
      workRef.current.value = "";
      setUpdateId(null);

    }).catch(error => {
      console.log("error=", error);
      setErrorMessage(t('errormessagesavecustomer'));
      setIsLoading(false);
    })
    alert(t('savealertmessage'));
  }
  const clearFields = () => {
    setInput("");
    setInputMobileno("");
    setCity("");
    setRadioValue("0")
    fathernameref.current.value = "";
    addressRef.current.value = "";
    workRef.current.value = "";
    setUpdateId(null);
    
  }
  const radios = [
    { name: t('fathershort'), value: '0' },
    { name: t('husbandshort'), value: '1' }
  ];

  const renderCustomerList = (

    <div className="col-md-12 text-center">
      <List customers={customers} setUpdateUI={setUpdateUI}
        updateMode={updateMode} />
    </div>

  )

  
  return (

    <Container >
      <h2 className="text-center">{t('customerheadername')}</h2>
      <Row className="justify-content-md-center mt-5 ">
        <Form validated={validated}>
          <Row >
            <Col xs={12} md={4} className="rounded bg-white">
              <Form.Group className="mb-3" name="customername" border="primary" >
                <Form.Label>{t('customer')}</Form.Label>
                <Form.Control  type="text" placeholder={t('customerplaceholderlabel')} required value={input} onChange={(e) => setInput(e.target.value)} autoFocus />
              </Form.Group>
            </Col>
            <Col xs={12} md={4} className="rounded bg-white">
              <Form.Group className="mb-3" name="mobilenumber" border="primary" >
                <Form.Label>{t('phoneno')}</Form.Label>
                <Form.Control type="number" placeholder={t('phonenoplaceholder')} required value={inputmobileno}
                  onChange={(e) => setInputMobileno(e.target.value)} />
              </Form.Group>
            </Col>
            <Col xs={12} md={4} className="rounded bg-white">
              <Form.Group className="mb-3" name="cityname" border="primary" >
                <Form.Label>{t('city')}</Form.Label>
                <Form.Select aria-label="Default select example" 
                 value={city} onChange={(e) => setCity(e.target.value)} required >
                  <option key={city} value={""} >{t('cityplaceholder')}</option>

                  {
                    citynames.map((cityname) => (
                      <option key={cityname._id} value={cityname._id}
                        >{cityname.cityname}</option>
                    ))}

                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4} className="rounded bg-white">
              <Form.Group className="mb-3" name="fathername" border="primary" >
                <ButtonGroup className="mb-2">
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant="outline-primary"
                      name="radio"
                      size="sm"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}>
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
                <Form.Control type="text" placeholder={t('fatherhusbandnameplaceholder')} ref={fathernameref} required />

              </Form.Group>
            </Col>
            <Col xs={12} md={4} className="rounded bg-white">
              <Form.Group className="mb-3" name="address1" border="primary" >
                <Form.Label>{t('address')}</Form.Label>
                <Form.Control type="text" placeholder={t('addressplaceholder')} ref={addressRef} required />
              </Form.Group>
            </Col>
            <Col xs={12} md={4} className="rounded bg-white">
              <Form.Group className="mb-3" name="work" border="primary" >
                <Form.Label>{t('work')}</Form.Label>
                <Form.Control type="text" placeholder={t('workplaceholder')} ref={workRef} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className="rounded bg-white text-center">
            <div className="col-md-12 mb-4 " >
              <Button variant="primary" size="lg" type="button" className="text-center" onClick={updateId ? updateCustomer : handleSubmit}>
              {t('savebutton')}
              </Button>{' '}
              <Button variant="primary" size="lg" type="button" className="text-center" onClick={clearFields}>
              {t('newbutton')}
              </Button>
            </div>
            {isLoading ? <PlaceHolder /> : renderCustomerList}
            {errorMessage && <div className="error">{errorMessage}</div>}


          </Row>
        </Form>
      </Row>
    </Container>

  )
}
export default AddCustomer;