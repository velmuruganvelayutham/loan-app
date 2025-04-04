import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from "axios"
import { baseURL } from "./utils/constant";
import PlaceHolder from "./components/spinner/placeholder";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import {
    useAuth
} from "@clerk/clerk-react";

const AccountMaster = () => {
    const { getToken } = useAuth();
    const [accounts, setAccounts] = useState([]);
    const initialState = {
        accountname: "",
        accounttype: 1,
    };
    const [formData, setFormData] = useState({
        accountname: "",
        accounttype: 1,
    });
    const [validated, setValidated] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [accountOptions, setAccountOptions] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);

    const { t } = useTranslation();
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${baseURL}/account/get`).then((res) => {
                const data = res.data.map((account) => ({
                    value: account._id,
                    label: account.accountname,
                    accounttype: Number(account.accounttype)
                  }));
                setAccountOptions(data);
                setIsLoading(false);
                setErrorMessage("");
            })
                .catch(error => {
                    console.log("error=", error);
                    setErrorMessage(t('errormessageline'));
                    setIsLoading(false);
                })
        }
        fetchData();
    }, [t, getToken]);

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

    const handleSubmit =  (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
        }
        setValidated(true);

        if (formData.accountname !== "") {
            saveAccount();
        }
        
    }
    const saveAccount=async()=>{
        setIsLoading(true);
        
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        axios.post(`${baseURL}/account/save`, formData).then((res) => {
            setIsLoading(false);
            setFormData(initialState);
            setErrorMessage("");
            alert(t('savealertmessage'));

        })
            .catch(error => {
                setErrorMessage(t('errormessagesaveline'));
                setIsLoading(false);
                console.log("error=", error);
            })

    }
    const handleChange = (selected) => {
        if (selected) {
            setSelectedAccount(selected);
            setFormData({accountname:selected.label,accounttype:Number(selected.accounttype)});
          }
          else {
            
            setSelectedAccount(selected);
            setFormData({accountname:"",accounttype:1});
          }
          
    }
    const updateAccount = async () => {
        setIsLoading(true);
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.put(`${baseURL}/account/update/${updateId}`, { formData }).then((res) => {
            setIsLoading(false)
            setFormData(initialState);
            setUpdateId(null);
            setErrorMessage("");
        }).catch(error => {
            setErrorMessage(t('errormessagesaveline'));
            setIsLoading(false);
            console.log("error=", error);
        })
        alert(t('savealertmessage'));
    }
    const clearFields = () => {
        setFormData(initialState);
        setSelectedAccount(null);
        setUpdateId(null);
    }

    return (
        <Container>
            <h2 className="text-center">{t('accountmaster')}</h2>

            <Row className="justify-content-md-center mt-5 ">
                <Col xs={12} lg={6} className="rounded bg-white">
                    <Form validated={validated}>
                        <Row>
                            <Col xs={12} md={6} >
                                <Form.Group className="mb-3" name="cityname" border="primary" >
                                    <Form.Label>{t('accountname')}</Form.Label>
                                    
                                    <Select
                                        options={accountOptions}
                                        isLoading={isLoading}
                                        onChange={handleChange} // Handles selection
                                        placeholder={t('search')}
                                        value={selectedAccount}
                                        isSearchable
                                        isClearable={true}
                                    />
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row className="rounded bg-white">

                            <Col xs={12} md={6} >
                                <Form.Group className="mb-3" name="linename" border="primary" >
                                    <Form.Label>{t('accountname')}</Form.Label>
                                    <Form.Control type="text" data-cypress-loan-app-linename="accountname" placeholder={t('accountname')} required value={formData.accountname} onChange={(e) => setFormData({ ...formData, accountname: (e.target.value) })} autoFocus />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} >
                                <Form.Group className="mb-3" name="linename" border="primary" >
                                    <Form.Label>{t('accounttype')}</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        defaultValue={1}  onChange={(e) => setFormData({ ...formData, accounttype: Number((e.target.value)) })} value={formData.accounttype}>
                                        <option value={1} >{t('incomeaccounts')}</option>
                                        <option value={2}>{t('expenseaccounts')}</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                        </Row>

                        <Row className="rounded bg-white">
                            <div className="col-md-12 text-center ">
                                <Button variant="primary" data-cypress-loan-app-save="save" type="button" className="text-center" onClick={updateId ? updateAccount : handleSubmit}>
                                    {t('savebutton')}
                                </Button>{' '}
                                <Button variant="primary"
                                    type="button" className="text-center" onClick={clearFields}>{t('newbutton')}
                                </Button>
                            </div>

                            {errorMessage && <div className="error">{errorMessage}</div>}

                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AccountMaster;
