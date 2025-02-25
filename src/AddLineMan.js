import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import ListLineMan from "./components/ListLineMan"
import axios from "axios"
import { baseURL } from "./utils/constant";
import PlaceHolder from "./components/spinner/placeholder";
import { useTranslation } from "react-i18next";
import {
  useAuth
} from "@clerk/clerk-react";
function AddLineMan() {
  const { getToken } = useAuth();
  const [input, setInput] = useState("");
  const [inputmobileno, setInputMobileno] = useState("")
  const [lineMans, setLineMans] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const token = await getToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get(`${baseURL}/linemancreate/get`).then((res) => {
        setLineMans(res.data)
        setIsLoading(false);
        setErrorMessage("");
      })
        .catch(error => {
          console.log("error=", error);
          setErrorMessage(t('errormessagelineman'));
          setIsLoading(false);
        })
    }
    fetchData();
  }, [updateUI, t, getToken]);

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
    if (input !== "" && inputmobileno !== "") {
      addLineMan();
    }
  };

  const addLineMan = async () => {
    const token = await getToken();
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setIsLoading(true);
    axios.post(`${baseURL}/linemancreate/save`, { linemanname: input, mobileno: inputmobileno }).then((res) => {
      setIsLoading(false)
      setInput("")
      setInputMobileno("");
      setUpdateUI((prevState) => !prevState);
      setErrorMessage("");
    })
      .catch(error => {
        setErrorMessage(t('errormessagesavelineman'));
        setIsLoading(false);
        console.log("error=", error);
      })
    alert(t('savealertmessage'));
  }

  const updateMode = (id, text, mobilenum) => {
    setInput(text);
    setInputMobileno(mobilenum);
    setUpdateId(id);
  }

  const updateLineMan =async () => {
    const token = await getToken();
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.put(`${baseURL}/linemancreate/update/${updateId}`, { linemanname: input, mobileno: inputmobileno }).then((res) => {
      setIsLoading(false)
      setUpdateUI((prevState) => !prevState)
      setInput("");
      setInputMobileno("");
      setUpdateId(null);
      setErrorMessage("");
    }).catch(error => {
      setErrorMessage(t('errormessagesavelineman'));
      setIsLoading(false);
      console.log("error=", error);
    })
    alert(t('savealertmessage'));
  }
  const clearFields = () => {
    setInput("");
    setInputMobileno("");
    setUpdateId(null);
  }

  const renderLineManList = (
    <div className="text-center">
      <ListLineMan linemannames={lineMans} updateMode={updateMode} />
    </div>);

  return (

    <Container >
      <h2 className="text-center">{t('linemanheader')}</h2>
      <Row className="justify-content-md-center mt-5 ">
        <Col xs={12} lg={6} className="rounded bg-white">
          <Form validated={validated}>
            <Row className="rounded bg-white">
              <Col xs={12} md={12} >
                <Form.Group className="mb-3" name="linemanname" border="primary" >
                  <Form.Label>{t('lineman')}</Form.Label>
                  <Form.Control data-cypress-loan-app-linemanname="linemanname" type="text" placeholder={t('linemanplaceholderlabel')} required value={input} onChange={(e) => setInput(e.target.value)} autoFocus />
                </Form.Group>
              </Col>

            </Row>
            <Row className="rounded bg-white">
              <Col xs={12} md={12} >
                <Form.Group className="mb-3" name="mobilenumber" border="primary" >
                  <Form.Label>{t('phoneno')}</Form.Label>
                  <Form.Control type="number" data-cypress-loan-app-mobilenumber="mobilenumber" placeholder={t('phonenoplaceholder')} required value={inputmobileno} onChange={(e) => setInputMobileno(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Row className="rounded bg-white">
              <div className="col-md-12 text-center ">
                <Button variant="primary" data-cypress-loan-app-save="save" type="button" className="text-center" onClick={updateId ? updateLineMan : handleSubmit}>
                  {t('savebutton')}
                </Button>{' '}
                <Button variant="primary"
                  type="button" className="text-center" onClick={clearFields}>{t('newbutton')}
                </Button>
              </div>
              {isLoading ? <PlaceHolder /> : renderLineManList}
              {errorMessage && <div className="error">{errorMessage}</div>}

            </Row>
          </Form>
        </Col>
      </Row>
    </Container>

  )
}
export default AddLineMan;