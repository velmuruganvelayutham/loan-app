import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from "axios"
import { baseURL } from "./utils/constant";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useTranslation } from "react-i18next";
import AsyncSelect from 'react-select/async';
import Select from "react-select";
import Fuse from "fuse.js";
import {
  useAuth
} from "@clerk/clerk-react";
//import _ from "lodash";
function AddCustomer() {
  const { getToken } = useAuth();
  const [input, setInput] = useState("");
  const [inputmobileno, setInputMobileno] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const [updateId, setUpdateId] = useState(null);
  const [radioValue, setRadioValue] = useState("0");
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();
  const fathernameref = useRef(null);
  const addressRef = useRef(null);
  const workRef = useRef(null);
  const cityRef = useRef(null);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [cachedCustomers, setCachedCustomers] = useState({});
  const [selectedCity, setSelectedCity] = useState(null);
  const initialFormState = { mySelectKey: null };
  const [myForm, setMyForm] = useState(initialFormState);
  const [updateUI, setUpdateUI] = useState(false);
  
  const asyncSelectRef = useRef(null);
  useEffect(() => {
    const preloadCities = async () => {
      setIsLoading(true); // Start loading
      try {
        const token = await getToken(); // Fetch token
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // Fetch city data
        //const response = await axios.get(`${baseURL}/citycreate/gettwenty?q=`);
        const response = await axios.get(`${baseURL}/citycreate/get?q=`);
        const data = response.data.map((city) => ({
          value: city._id,
          label: city.cityname,
        }));

        // Update state and cache the result
        setCityOptions(data);

        setErrorMessage("");
        setIsLoading(false);
      } catch (error) {
        console.log("error=", error);
        setErrorMessage(t('errormessagecity'));
        setIsLoading(false);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    preloadCities();
  }, [getToken, updateUI]); // Add dependencies if these values could change
  useEffect(() => {
    const preloadCustomer = async () => {
      setIsLoading(true);
      try {
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.get(`${baseURL}/get/view?q=`);

        const data = response.data.map((item) => ({
          value: item._id,
          label: `${item.customer} - ${item.fathername || ""}`.trim(),
          mobileno: item.mobileno || "",
          address: item.address || "",
          cityid: item.city_id || "",
          reference: item.referencecity || "",
          work: item.work || "",
          relationtype: item.relationtype || ""
        }));
        setCustomerOptions(data);
        setCachedCustomers(data);
        //console.log(data);
        setErrorMessage("");
        setIsLoading(false);
      } catch (error) {
        console.log("error=", error);
        setErrorMessage(t('errormessagecustomer'));
        setIsLoading(false);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };
    preloadCustomer();
  }, [getToken, updateUI]);



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

    if (input !== "" && inputmobileno !== "" && selectedCity.value !== "" && fathernameref.current.value !== ""
      && addressRef.current.value !== "" && workRef.current.value !== "" && cityRef.current.value !== "") {
      addCustomer();
    }

  };


  const fetchOptions = async (inputValue, apiPath, cache, setCache, type) => {

    if (cache[inputValue]) return cache[inputValue]; // Return from cache if available

    try {
      const token = await getToken();
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(`${baseURL}/${apiPath}?q=${inputValue}`);
      const data = response.data.map((item) => ({
        value: item._id,
        label: `${item.customer} - ${item.fathername || ""}`.trim(),
        mobileno: item.mobileno || "",
        address: item.address || "",
        cityid: item.city_id || "",
        reference: item.referencecity || "",
        work: item.work || "",
        relationtype: item.relationtype || ""
      }));

      setCache((prev) => ({ ...prev, [inputValue]: data })); // Update cache
      return data;
    } catch (error) {
      console.error("Error fetching options:", error);
      return [];
    }


  };


  const addCustomer = async () => {
    const token = await getToken();
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.post(`${baseURL}/save`, {
      customer: input, mobileno: inputmobileno, cityid: selectedCity.value, fathername: fathernameref.current.value,
      address: addressRef.current.value, work: workRef.current.value, relationtype: Number(radioValue), referencecity: cityRef.current.value
    }).then((res) => {
      clearFields();
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
      customer: input, mobileno: inputmobileno, cityid: selectedCity.value, fathername: fathernameref.current.value,
      address: addressRef.current.value, work: workRef.current.value, relationtype: Number(radioValue), referencecity: cityRef.current.value
    }).then((res) => {
      clearFields();
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

    setRadioValue("0")
    fathernameref.current.value = "";
    addressRef.current.value = "";
    workRef.current.value = "";
    cityRef.current.value = "";
    setUpdateId(null);
    setMyForm((prevForm) => ({
      ...prevForm,
      mySelectKey: null, // Reset selected value
    }));
    setSelectedCity(null);
    setCachedCustomers({});
    //setMyCityForm(intialStateCity);

  }
  const radios = [
    { name: t('fathershort'), value: '0' },
    { name: t('husbandshort'), value: '1' }
  ];



  const loadCustomerOptions = async (inputValue, callback) => {

    if (!inputValue.trim()) {
      return customerOptions; // Return preloaded customerOptions for an empty query
    }
    const options = await fetchOptions(inputValue, "get/view", cachedCustomers, setCachedCustomers, "customer");
    callback(options);
  };
  async function customerSelect(selected) {

    
    //const { value, mobileno, address, cityid, reference, work, relationtype } = selected;

    if (!selected) {
      // Reset all fields when no customer is selected
      setMyForm((prevForm) => ({
        ...prevForm,
        mySelectKey: null, // Reset selected value
      }));
      setInput("");
      setInputMobileno("");

      setRadioValue("0");
      fathernameref.current.value = "";
      addressRef.current.value = "";
      workRef.current.value = "";
      cityRef.current.value = ""
      setUpdateId(null);

    }
    else {
      setMyForm((prevForm) => ({
        ...prevForm,
        mySelectKey: selected.value, // Update the selected customer's value in the state
      }));
      // Update additional fields
      setInput(selected.label.split(" - ")[0]); // Customer name
      setInputMobileno(selected.mobileno); // Mobile number
      addressRef.current.value = selected.address;
      fathernameref.current.value = selected.label.split(" - ")[1];
      workRef.current.value = selected.work;
      const filter = cityOptions.find((city) => city.value === selected.cityid);
      setSelectedCity(filter);

      cityRef.current.value = selected.reference;
      setRadioValue(selected.relationtype === 1 ? "1" : "0");
      setUpdateId(selected.value);
    }

  }

  const handleChange = (selected) => {
    if (selected) {
      setSelectedCity(selected);
      cityRef.current.value = selected.label;
    }
    else {
      setSelectedCity(selected);
    }

  };
  return (
    <Container >
      <h2 className="text-center">{t('customerheadername')}</h2>
      <Row className="justify-content-md-center mt-5 ">
        <Form validated={validated}>
          <Row >
            <Col xs={12} md={4} className="rounded bg-white">

              <Form.Group className="mb-3" name="customername" border="primary" >
                <Form.Label>{t('customer')}</Form.Label>{/*customer*/}
                <AsyncSelect
                  ref={asyncSelectRef}
                  value={customerOptions.find(({ value }) => value === myForm.mySelectKey) || null}
                  onChange={(selected) => customerSelect(selected)}
                  loadOptions={loadCustomerOptions}
                  placeholder={t('customerplaceholder')}
                  defaultOptions={customerOptions}
                  isClearable={true}

                />



                {/* <Select data-cypress-loan-app-select-customer="select-customer" aria-label="Default select example"
                  required autoFocus
                  value={options.filter(({ value }) => value === myForm.mySelectKey)}
                  getOptionLabel={({ label }) => label}
                  getOptionValue={({ value }) => value}
                  onChange={({ value }) => customerSelect(value)}
                  options={options}
                  placeholder={t('customer')}
                /> */}
              </Form.Group>
            </Col>
          </Row>
          <Row >
            <Col xs={12} md={4} className="rounded bg-white">
              <Form.Group className="mb-3" name="customername" border="primary" >
                <Form.Label>{t('customer')}</Form.Label>
                <Form.Control data-cypress-loan-app-customername="customername" type="text" placeholder={t('customerplaceholderlabel')} required value={input} onChange={(e) => setInput(e.target.value)} autoFocus />
              </Form.Group>
            </Col>
            <Col xs={12} md={3} className="rounded bg-white">
              <Form.Group className="mb-3" name="mobilenumber" border="primary" >
                <Form.Label>{t('phoneno')}</Form.Label>
                <Form.Control type="text" data-cypress-loan-app-mobilenumber="mobilenumber" placeholder={t('phonenoplaceholder')} required value={inputmobileno}
                  onChange={(e) => setInputMobileno(e.target.value)} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3} className="rounded bg-white">
              <Form.Group className="mb-3" name="cityname" border="primary" >
                <Form.Label>{t('city')}</Form.Label>
                <Select
                  options={cityOptions}
                  isLoading={isLoading}
                  onChange={handleChange} // Handles selection
                  placeholder={t('cityplaceholder')}
                  value={selectedCity}
                  isSearchable
                  isClearable={true}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={2} className="rounded bg-white">
              <Form.Group className="mb-3" name="work" border="primary" >
                <Form.Label>{t('city')}</Form.Label>
                <Form.Control data-cypress-loan-app-citynametext="citynametext" type="text" placeholder={t('city')} ref={cityRef} required />
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
                <Form.Control data-cypress-loan-app-fathername="fathername" type="text" placeholder={t('fatherhusbandnameplaceholder')} ref={fathernameref} required />

              </Form.Group>
            </Col>
            <Col xs={12} md={4} className="rounded bg-white">
              <Form.Group className="mb-3" name="address1" border="primary" >
                <Form.Label>{t('address')}</Form.Label>
                <Form.Control data-cypress-loan-app-address="address" type="text" placeholder={t('addressplaceholder')} ref={addressRef} required />
              </Form.Group>
            </Col>

            <Col xs={12} md={4} className="rounded bg-white">
              <Form.Group className="mb-3" name="work" border="primary" >
                <Form.Label>{t('work')}</Form.Label>
                <Form.Control data-cypress-loan-app-work="work" type="text" placeholder={t('workplaceholder')} ref={workRef} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className="rounded bg-white text-center">
            <div className="col-md-12 mb-4 " >
              <Button data-cypress-loan-app-save="save" variant="primary" size="lg" type="button" className="text-center" onClick={updateId ? updateCustomer : handleSubmit}>
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