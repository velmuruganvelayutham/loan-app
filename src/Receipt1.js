import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { baseURL } from "./utils/constant";
import { Table } from "react-bootstrap";
import { startOfWeek, dateFormat } from './FunctionsGlobal/StartDateFn';
import { useTranslation } from "react-i18next";
import PlaceHolder from "./components/spinner/placeholder";
import {
  useAuth
} from "@clerk/clerk-react";
function AddReceipt1() {
  const { getToken } = useAuth();
  const { t } = useTranslation();
  const [rowsData, setRowsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const startdateRef = useRef(startOfWeek())
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [reference, setReference] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const receiptRef = useRef("");
  //const [disabledcolumn, setDisabledColumn] = useState(true);
  const [updateUI, setUpdateUI] = useState(false);
  const [isRestore, setIsRestore] = useState(false);
  const [total, setTotal] = useState(0);
  const lineRef = useRef(null);
  const [linenames, setLineNames] = useState([]);
  const [SelectDisabled, setSelectDisabled] = useState(false);
  const loannoRefs = useRef([]);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const token = await getToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get(`${baseURL}/linemancreate/get/lines`).then((res) => {
        setLineNames(res.data);
        setIsLoading(false);
        setErrorMessage("");
      }).catch(error => {
        console.log("error=", error);
        setErrorMessage(t('errormessageline'));
        setIsLoading(false);
      });
    }
    fetchData();
  }, [getToken, t]);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const token = await getToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get(`${baseURL}/receipt1/get/reference`).then((res) => {
        receiptRef.current.value = res.data[0].receiptreference + (res.data[0].receiptcode + 1);
        setReference(res.data)
        setIsLoading(false);
        setErrorMessage("");
      }).catch(error => {
        console.log("error=", error);
        setErrorMessage(t('errormessagecustomer'));
        setIsLoading(false);
      })
    }
    fetchData();
  }, [refresh, getToken, t]);
  const addTableRows = () => {
    setIsRestore(false);
    const rowsInput = {
      serialno: rowsData.length + 1,
      loanno: '',
      customer_id: '',
      customername: '',
      loanamount: '',
      dueamount: '',
      weekno: '',
      amount: ''
    }
    //alert(rowsData);
    //setRowsData([...rowsData, rowsInput])
    //setRowsData(prevRows => [...prevRows, rowsInput]);
    setRowsData((prevRows) => {
      const updatedRows = [...prevRows, rowsInput]; // Preserve previous rows and add the new row
      // Set focus on the last row's loanno input
      setTimeout(() => {
        loannoRefs.current[updatedRows.length - 1]?.focus(); // Focus the last row added
      }, 0);
      return updatedRows; // Return the updated rows to set the new state
    });

    if (rowsData.length > 0) {
      if (lineRef.current.value != "") {
        setSelectDisabled(true)
      }
    }
    else {
      setSelectDisabled(false)
    }
    calTotal();
  }
  
  
  useEffect(() => {
    // Add the event listener when the component mounts
    const handleKeydown = (event) => {
      // Ensure Enter key and input focus
      if (event.key === "Enter" && event.target.nodeName === "INPUT") {
        const form = event.target.form;
        const index = Array.prototype.indexOf.call(form, event.target);
        const isLastRow = index === form.elements.length - 5;
        if (event.target.name === "loanno") {
          form.elements[index + 5]?.focus();
        }
        else {
          form.elements[index + 1]?.focus();
        }
        if (event.target.name === "amount") {
          form.elements[index + 1]?.focus();
          if (isLastRow) {
            const rowsInput = {
              serialno: rowsData.length + 1,
              loanno: '',
              customer_id: '',
              customername: '',
              loanamount: '',
              dueamount: '',
              weekno: '',
              amount: ''
            }
            //alert(rowsData);
            //setRowsData([...rowsData, rowsInput])
            //setRowsData(prevRows => [...prevRows, rowsInput]);
            setRowsData((prevRows) => {
              const updatedRows = [...prevRows, rowsInput]; // Preserve previous rows and add the new row
              // Set focus on the last row's loanno input
              setTimeout(() => {
                loannoRefs.current[updatedRows.length - 1]?.focus(); // Focus the last row added
              }, 0);
              return updatedRows; // Return the updated rows to set the new state
            });
          }
          else {
            form.elements[index + 9]?.focus();
          }
  
        }
  
        event.preventDefault(); // Prevent the default form submission behavior
  
      }
    };

    // Adding the event listener
    document.addEventListener("keydown", handleKeydown);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [rowsData]);
  /*useEffect(() => {
    const handleKeydown = (event) => {
      // Ensure Enter key and input focus
      if (event.key === "Enter" && event.target.nodeName === "INPUT") {
        const form = event.target.form;
        const index = Array.prototype.indexOf.call(form, event.target);
        const isLastRow = index === form.elements.length - 5;
        if (event.target.name === "loanno") {
          form.elements[index + 5]?.focus();
        }
        else {
          form.elements[index + 1]?.focus();
        }
        if (event.target.name === "amount") {
          form.elements[index + 1]?.focus();
          if (isLastRow) {
            addTableRows();
          }
          else {
            form.elements[index + 9]?.focus();
          }

        }

        event.preventDefault(); // Prevent the default form submission behavior

      }
    };

    // Add the event listener on mount
    document.addEventListener("keydown", handleKeydown);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);*/

  
  const calTotal = () => {
    let totalValue = rowsData.reduce((previousValue, currentValue) => {
      return parseFloat(previousValue + Number(currentValue.amount))
    }, 0);
    setTotal(totalValue);
  }
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
    let totalvalue = rows.reduce((previousValue, currentValue) => {
      return parseFloat(previousValue + Number(currentValue.amount))
    }, 0);
    setTotal(totalvalue);
    if (Number(rowsData.length) === 1) {
      setSelectDisabled(false)
    }

  }

  const handleChange = (index, evnt) => {

    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    if (evnt.target.name === "amount") {
      if (parseFloat(value) > parseFloat(rowsInput[index]['loanamount'])) {
        alert(t('greateramountthanloan'));
        rowsInput[index][name] = rowsInput[index]['amount'];
      }
      else {
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
      }
      calTotal();
    }
    else {
      rowsInput[index][name] = value;
      setRowsData(rowsInput);
    }

  }
  function RestoreLoan(e, index) {

    if (e.target.value !== "") {
      ProcessList(e, e.target.value, index);

    }
  }
  async function ProcessList(e, loanno, index) {

    setIsLoading(true);
    const token = await getToken();
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return (
      axios.get(`${baseURL}/receipt1/get/loanpendingduplicate`, {
        params:
          { loanno: loanno, lineno: lineRef.current.value, receiptdate: dateFormat(startdateRef.current.value).toString() }
      }).then((res) => {
        if (res.data.length > 0) {
          let isexist = 0;
          rowsData.find((checkloan, i) => {
            if (loanno === checkloan.loanno && i !== index) {
              isexist = 1;
            }
          })

          if (isexist === 0) {
            const Editcheck = rowsData.map((item, i) => {
              if (i === index)
                return { ...item, ["customer_id"]: res.data[0]["_id"].customer_id, ["customername"]: res.data[0]["_id"].customer, ["loanamount"]: res.data[0].pending, ["dueamount"]: res.data[0]["_id"].dueamount };
              return item
            });

            setRowsData(Editcheck);

          }
          else {
            alert(t('loanentryexist'));
            const Editcheck = rowsData.map((item, i) => {
              if (i === index)

                return { ...item, ["loanno"]: "" };
              return item

            });
            setRowsData(Editcheck);
          }

          setIsLoading(false);
        }
        else {
          if (Number(lineRef.current.value) !== 0) {
            alert(t('loanentrynotexistline'));
          }
          else {
            alert(t('loanentrynotexist'));
          }
          var formloan = e.target.form;
          var indexloan = Array.prototype.indexOf.call(formloan, e.target);
          e.target.value = "";
          formloan.elements[indexloan].focus();
          //rowsData[index]["loanno"]="";
          setIsLoading(false);
        }


      }).catch(error => {

        console.log("error=", error);
        setErrorMessage(t('errormessageloan'));
        setIsLoading(false);
      })
    )
  }
  const saveReceipt = async () => {
    let items = rowsData.map((item) => {
      if (item.amount > 0) {
        return {
          receiptnumber: (receiptRef.current.value).toString(),
          loannumber: item.loanno,
          receiptdate: new Date(startdateRef.current.value),
          customer_id: item.customer_id,
          weekno: item.weekno,
          collectedamount: item.amount
        }
      }

    });
    setButtonDisabled(true);
    const token = await getToken();
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.post(`${baseURL}/receipt1/save/details`, {
      items: items,
      receiptref: (receiptRef.current.value).toString(),
      receiptcode: (Number(reference[0].receiptcode) + 1),
      receiptdate: new Date(startdateRef.current.value)
    }).then((res) => {
      setRowsData([]);
      ClearDetails();

      setButtonDisabled(false);
      setErrorMessage("");
      alert(t('savealertmessage'))
    }).catch(error => {
      console.log("error=", error);
      setErrorMessage(t('errormessagesavereceipt'));
      setButtonDisabled(false);
    })
  }
  const updateReceipt = async () => {
    let items = rowsData.map((item) => {
      return {
        receiptnumber: (receiptRef.current.value).toString(),
        loannumber: item.loanno,
        receiptdate: new Date(startdateRef.current.value),
        customer_id: item.customer_id,
        weekno: item.weekno,
        collectedamount: item.amount
      }
    });
    setButtonDisabled(true);
    const token = await getToken();
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.post(`${baseURL}/receipt1/update/details`, {
      items: items,
      receiptno: (receiptRef.current.value).toString()
    }).then((res) => {
      setRowsData([]);
      ClearDetails();
      setButtonDisabled(false);
      setErrorMessage("");
      alert(t('savealertmessage'))
    }).catch(error => {
      console.log("error=", error);
      setErrorMessage(t('errormessagesavereceipt'));
      setButtonDisabled(false);
    })
  }
  const ClearDetails = () => {
    setRowsData([]);
    setUpdateUI(false);
    setTotal(0);
    setRefresh((prevState) => !prevState)
    startdateRef.current.value = startOfWeek();
    setSelectDisabled(false)
  }
  const RestoreReceipt = async () => {
    if (receiptRef.current.value !== "") {

      const token = await getToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get(`${baseURL}/receipt1/get`,
        { params: { receiptno: (receiptRef.current.value).toString() } }).then((res) => {
          setIsRestore(true);

          const oldReference = res.data;
          if (oldReference.length > 0) {
            const parsedDate = dateFormat(oldReference[0].receiptdate);
            startdateRef.current.value = parsedDate;
            let totalvalue = 0;
            const rowsInput = oldReference.map((item, i) => {
              totalvalue = totalvalue + Number(item.collectedamount)
              return {
                serialno: i + 1,
                loanno: item.loannumber,
                customer_id: item.customer_id,
                customername: item.customer,
                loanamount: item.balance + item.collectedamount,
                dueamount: item.dueamount,
                weekno: item.weekno,
                amount: item.collectedamount
              }
            })
            setRowsData(rowsInput);
            setTotal(totalvalue);
            setIsRestore(true);
            setUpdateUI(true);
          }
          else {
            ClearDetails()
          }
        })
    }
    setIsRestore(false);


  }
  const deleteReceipt = async () => {

    if (window.confirm(t('deleteyesnoalert'))) {
      const token = await getToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.delete(`${baseURL}/receipt1/delete/${(receiptRef.current.value).toString()}`).then((res) => {
        alert(t('deletemessage'))
        ClearDetails();
        setErrorMessage("");
      }).catch(error => {
        console.log("error=", error);
        setErrorMessage(t('errormessagedeletereceipt'));
        setIsLoading(false);
        setButtonDisabled(false);
      });
    }
  }
  const handleSubmit = () => {
    if (updateUI) {
      updateReceipt();
    }
    else {
      saveReceipt();
    }
  }

  return (
    <Container>
      <Form>
        <Row>
          <Col xs={12} md={3} className="rounded bg-white">
            <Form.Group className="mb-3" name="startdate" border="primary" >
              <Form.Label>{t('receiptno')}</Form.Label>
              <Form.Control type="text" ref={receiptRef} onBlur={RestoreReceipt} />
            </Form.Group>
          </Col>
          <Col xs={12} md={3} className="rounded bg-white">
            <Form.Group className="mb-3" name="startdate" border="primary" >
              <Form.Label>{t('date')}</Form.Label>
              <Form.Control type="date" placeholder="loan start date" ref={startdateRef} defaultValue={startOfWeek()} />
            </Form.Group>
          </Col>
          <Col xs={12} md={4} className="rounded bg-white">
            <Form.Group className="mb-3" name="lineno" border="primary" >
              <Form.Label>{t('line')}</Form.Label>{/*line no*/}
              <Form.Select aria-label="Default select example" ref={lineRef} data-cypress-loan-app-lineno="lineno" required disabled={SelectDisabled}>
                <option value="">{t('lineplaceholder')}</option>
                {
                  linenames.map((linename) => (
                    <option key={linename.lineno} value={linename.lineno}>{linename.linename}</option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-5 ">

          <Table className="table table-striped table-primary table-hover text-center  table-bordered border-dark" size="sm">
            <thead>
              <tr>
                <th>{t('no')}</th>
                <th>{t('loanno')}</th>
                <th style={{ display: "none" }}>{t('customerid')}</th>
                <th>{t('customer')}</th>
                <th>{t('loanamount')}</th>
                <th>{t('due')}</th>
                <th>{t('weekno')}</th>
                <th>{t('amount')}</th>
                <th><Button className="btn btn-success" onClick={addTableRows} >+</Button></th>
              </tr>
            </thead>
            <tbody>
              <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} RestoreLoan={RestoreLoan} isRestore={isRestore} loannoRefs={loannoRefs} />
            </tbody>
            <tr className="dailyrecordtotalheight">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className='fw-bold' style={{ fontSize: "12px", textAlign: "center" }}>{t('total')}</td>
              <td className='fw-bold' style={{ fontSize: "12px", textAlign: "center" }}>{total}</td>
              <td></td>
            </tr>
          </Table>
        </Row>
        <Row>
          {isLoading ? <PlaceHolder /> : null}
          {errorMessage && <div className="error">{errorMessage}</div>}

        </Row>
        <Row >
          <Col>
          </Col>
          <Col className="col-md-6">
            <Button variant="primary" size="lg" type="button" className="text-center" onClick={handleSubmit} disabled={isButtonDisabled}>
              {updateUI ? t('updatebutton') : t('savebutton')}
            </Button>{' '}
            <Button variant="primary" size="lg" type="button" className="text-center" onClick={ClearDetails}>
              {t('newbutton')}
            </Button>{' '}
            <Button variant="primary" size="lg" type="button" className="text-center"
              onClick={deleteReceipt} disabled={updateUI ? false : true}>
              {t('deletebutton')}
            </Button>
          </Col>

          <Col></Col>
        </Row>

      </Form>
    </Container>

  )
}

function TableRows({ rowsData, deleteTableRows, handleChange, RestoreLoan, isRestore, loannoRefs }) {
  return (
    rowsData.map((data, index) => {
      const { serialno, loanno, customer_id, customername, loanamount, dueamount, weekno, amount, loannoRef } = data;
      return (
        <tr key={index}>
          <td><input type="text" value={serialno} name="serialno" className="form-control" disabled /></td>
          <td>
            <input type="text" ref={(el) => (loannoRefs.current[index] = el)} value={loanno} onChange={(evnt) => (handleChange(index, evnt))}
              name="loanno" className="form-control"
              onBlur={(e) => RestoreLoan(e, index)} disabled={isRestore} />
          </td>
          <td style={{ display: "none" }}><input type="text" value={customer_id} name="customer_id" className="form-control" /></td>
          <td><input type="text" value={customername} name="customername" className="form-control" disabled /></td>
          <td><input type="text" value={loanamount} name="loanamount" className="form-control" disabled /> </td>
          <td><input type="text" value={dueamount} name="dueamount" className="form-control" disabled /> </td>
          <td><input type="number" value={weekno} onChange={(evnt) => (handleChange(index, evnt))} name="weekno" className="form-control" /> </td>
          <td><input type="number" value={amount} onChange={(evnt) => (handleChange(index, evnt))} name="amount" className="form-control" /> </td>
          <td><Button className="btn btn-danger" onClick={() => (deleteTableRows(index))}>x</Button></td>
        </tr>
      )
    })

  )

}

export default AddReceipt1;