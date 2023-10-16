import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import ListLineMan from "./components/ListLineMan"
import axios from "axios"
import { baseURL } from "./utils/constant";
import LoadingSpinner from "./components/spinner/LoadingSpinner";
import PlaceHolder from "./components/spinner/placeholder";
import { useTranslation } from "react-i18next";
var maxCitycode = 0;
function AddLineMan() {
  const [input, setInput] = useState("");
  const [inputmobileno, setInputMobileno] = useState("")
  const [lineMans, setLineMans] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { t, i18n } = useTranslation();
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${baseURL}/linemancreate/get`).then((res) => {
      setLineMans(res.data)
      setIsLoading(false)
    })
      .catch(error => {
        console.log("error=", error);
        setErrorMessage("Unable to fetch linenam list");
        setIsLoading(false);
      })
  }, [updateUI]);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${baseURL}/linemancreate/get/max`).then((res) => {
      const checkstring = (res.data);
      setIsLoading(false)
      if (((res.data).length) > 0) {
        maxCitycode = checkstring[0].maxCode + 1;
      }
      else {
        maxCitycode = 1;
      }
    })
      .catch(error => {
        setErrorMessage("Unable to fetch lineman list");
        setIsLoading(false);
        console.log("error=", error);
      })
  }, []);

  const addLineMan = () => {
    setIsLoading(true);
    axios.post(`${baseURL}/linemancreate/save`, { linemancode: maxCitycode, linemanname: input, mobileno: inputmobileno }).then((res) => {
      //console.log(res.data)
      setIsLoading(false)
      setInput("")
      setInputMobileno("");
      setUpdateUI((prevState) => !prevState)
    })
      .catch(error => {
        setErrorMessage("Unable to ADD lineman to the list");
        setIsLoading(false);
        console.log("error=", error);
      })
  }

  const updateMode = (id, text, mobilenum) => {
    setInput(text);
    setInputMobileno(mobilenum);
    setUpdateId(id);
  }

  const updateLineMan = () => {
    setIsLoading(true);
    axios.put(`${baseURL}/linemancreate/update/${updateId}`, { linemanname: input, mobileno: inputmobileno }).then((res) => {
      setIsLoading(false)
      setUpdateUI((prevState) => !prevState)
      setInput("");
      setInputMobileno("");
      setUpdateId(null);

    })
      .catch(error => {
        setErrorMessage("Unable to update LineMan to the list");
        setIsLoading(false);
        console.log("error=", error);
      })
  }

  const renderLineManList = (
    <div className="text-center">
      <ListLineMan linemannames={lineMans} setUpdateUI={setUpdateUI} />
    </div>);

  return (

    <Container style={{ display: 'flex' }}>
      <h2 className="text-center">LINEMAN MASTER</h2>
      <Row className="justify-content-md-center mt-5 ">
        <Form >
          <Row className="rounded bg-white">
            <Col xs={12} md={12} >
              <Form.Group className="mb-3" name="linemanname" border="primary" >
                <Form.Label>LineMan Name</Form.Label>
                <Form.Control type="text" placeholder={t('placeholder')} required value={input} onChange={(e) => setInput(e.target.value)} />
              </Form.Group>
            </Col>

          </Row>
          <Row className="rounded bg-white">
            <Col xs={12} md={12} >
              <Form.Group className="mb-3" name="mobilenumber" border="primary" >
                <Form.Label>Mobile No</Form.Label>
                <Form.Control type="number" placeholder="Enter Mobile No" required value={inputmobileno} onChange={(e) => setInputMobileno(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="rounded bg-white">
            <div className="text-center mb-2 " >
              <Button variant="primary" size="lg" type="submit" className="text-center" onClick={updateId ? updateLineMan : addLineMan}>
                Submit
              </Button>
            </div>
            {isLoading ? <PlaceHolder /> : renderLineManList}
            {errorMessage && <div className="error">{errorMessage}</div>}

          </Row>
        </Form>
      </Row>
    </Container>

  )
}
export default AddLineMan;