import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from "axios"
import { baseURL } from "./utils/constant";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useTranslation } from "react-i18next";
import Select from 'react-select'
import {
  useAuth
} from "@clerk/clerk-react";
function AddCustomer() {
  const { getToken } = useAuth();
  const [input, setInput] = useState("");
  const [inputmobileno, setInputMobileno] = useState("")
  const [customers, setCustomer] = useState([]);

  const [updateId, setUpdateId] = useState(null);
  const [radioValue, setRadioValue] = useState("0");
  const [citynames, setCitynames] = useState([]);
  const [validated, setValidated] = useState(false);
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();
  const fathernameref = useRef(null);
  const addressRef = useRef(null);
  const workRef = useRef(null);
  const cityRef = useRef(null);
  const initialFormState = { mySelectKey: null };
  const [myForm, setMyForm] = useState(initialFormState);
  const[updateUI,setUpdateUI]=useState(false);
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
  useEffect(() => {
    async function fetchData() {
      const token = await getToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get(`${baseURL}/get/view`).then((res) => {
        setCustomer(res.data);
        setErrorMessage("");
        console.log(res.data);
      }).catch(error => {
        console.log("error=", error);
        setErrorMessage(t('errormessagecustomer'));
      })
    }
    fetchData();
  }, [getToken, t,updateUI]);

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

    if (input !== "" && inputmobileno !== "" && city !== "" && fathernameref.current.value !== ""
      && addressRef.current.value !== "" && workRef.current.value !== "" && cityRef.current.value !== "") {
      addCustomer();
    }

  };


  const addCustomer = async () => {
    const token = await getToken();
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.post(`${baseURL}/save`, {
      customer: input, mobileno: inputmobileno, cityid: city, fathername: fathernameref.current.value,
      address: addressRef.current.value, work: workRef.current.value, relationtype: Number(radioValue), referencecity: cityRef.current.value
    }).then((res) => {

      setInput("")
      setInputMobileno("");
      setCity("");
      setRadioValue("0")
      fathernameref.current.value = "";
      addressRef.current.value = "";
      workRef.current.value = "";
      cityRef.current.value = "";
      setUpdateUI((prevState) => !prevState);
      setErrorMessage("");
    }).catch(error => {
      console.log("error=", error);
      setErrorMessage(t('errormessagesavecustomer'));

    })
    alert(t('savealertmessage'));
  }

  const updateCustomer = async () => {
    const token = await getToken();
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.put(`${baseURL}/update/${updateId}`, {
      customer: input, mobileno: inputmobileno, cityid: city, fathername: fathernameref.current.value,
      address: addressRef.current.value, work: workRef.current.value, relationtype: Number(radioValue), referencecity: cityRef.current.value
    }).then((res) => {
      setInput("");
      setInputMobileno("");
      setCity("");
      setRadioValue("0")
      fathernameref.current.value = "";
      addressRef.current.value = "";
      workRef.current.value = "";
      cityRef.current.value = "";
      setUpdateId(null);
      setMyForm(initialFormState);
      setUpdateUI((prevState) => !prevState);
      setErrorMessage("");
    }).catch(error => {
      console.log("error=", error);
      setErrorMessage(t('errormessagesavecustomer'));

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
    cityRef.current.value = "";
    setUpdateId(null);
    setMyForm(initialFormState);

  }
  const radios = [
    { name: t('fathershort'), value: '0' },
    { name: t('husbandshort'), value: '1' }
  ];

  const restoreCityName = (e) => {
    const filtered = citynames.filter(city => {
      return city._id === e.target.value;
    })
    if (filtered.length > 0) {
      cityRef.current.value = filtered[0].cityname;
    }

  }
  const options = customers.map((customer, i) => {
    return {
      label: customer.customer + '-' + customer.fathername,
      value: customer._id,
      key: i
    }
  })
  function customerSelect(value) {


    setMyForm({ ...myForm, mySelectKey: value });

    const filtered = customers.filter(customer => {
      return customer._id === value
    })

    if (myForm.mySelectKey === 0) {

      setInput("");
      setInputMobileno("");
      setCity("");
      setRadioValue("0");
      fathernameref.current.value = "";
      addressRef.current.value = "";
      workRef.current.value = "";
      cityRef.current.value = ""
      setUpdateId(null);
    }
    else {
      setInput(filtered[0].customer);
      setInputMobileno(filtered[0].mobileno);
      setCity(filtered[0].city_id);
      setRadioValue(filtered[0].relationtype === 1 ? "1" : "0");
      fathernameref.current.value = filtered[0].fathername;
      addressRef.current.value = filtered[0].address;
      workRef.current.value = filtered[0].work;
      cityRef.current.value = filtered[0].referencecity;
      setUpdateId(filtered[0]._id);
    }

  }


  return (
    <Container >
      <h2 className="text-center">{t('customerheadername')}</h2>
      <Row className="justify-content-md-center mt-5 ">
        <Form validated={validated}>
          <Row >
            <Col xs={12} md={4} className="rounded bg-white">

              <Form.Group className="mb-3" name="customername" border="primary" >
                <Form.Label>{t('customer')}</Form.Label>{/*customer*/}

                <Select aria-label="Default select example"
                  required autoFocus
                  value={options.filter(({ value }) => value === myForm.mySelectKey)}
                  getOptionLabel={({ label }) => label}
                  getOptionValue={({ value }) => value}
                  onChange={({ value }) => customerSelect(value)}
                  options={options}
                  placeholder={t('customer')}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row >
            <Col xs={12} md={4} className="rounded bg-white">
              <Form.Group className="mb-3" name="customername" border="primary" >
                <Form.Label>{t('customer')}</Form.Label>
                <Form.Control type="text" placeholder={t('customerplaceholderlabel')} required value={input} onChange={(e) => setInput(e.target.value)} autoFocus />
              </Form.Group>
            </Col>
            <Col xs={12} md={3} className="rounded bg-white">
              <Form.Group className="mb-3" name="mobilenumber" border="primary" >
                <Form.Label>{t('phoneno')}</Form.Label>
                <Form.Control type="text" placeholder={t('phonenoplaceholder')} required value={inputmobileno}
                  onChange={(e) => setInputMobileno(e.target.value)} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3} className="rounded bg-white">
              <Form.Group className="mb-3" name="cityname" border="primary" >
                <Form.Label>{t('city')}</Form.Label>
                <Form.Select aria-label="Default select example"
                  value={city} onChange={(e) => setCity(e.target.value)} onClick={restoreCityName} required >
                  <option key={city} value={""} >{t('cityplaceholder')}</option>

                  {
                    citynames.map((cityname) => (
                      <option key={cityname._id} value={cityname._id}
                      >{cityname.cityname}</option>
                    ))}

                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={2} className="rounded bg-white">
              <Form.Group className="mb-3" name="work" border="primary" >
                <Form.Label>{t('city')}</Form.Label>
                <Form.Control type="text" placeholder={t('city')} ref={cityRef} required />
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

            {errorMessage && <div className="error">{errorMessage}</div>}


          </Row>
        </Form>
      </Row>
    </Container>

  )
}
export default AddCustomer;