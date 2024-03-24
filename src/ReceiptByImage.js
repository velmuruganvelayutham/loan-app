import React, { useState } from 'react';
import { Table, Button, Form, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { baseURL } from "./utils/constant";

const ReceiptByImage = () => {

    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({ id: '', loanNo: '', weekNo: '', amount: '', isDirty: '' });
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [editingId, setEditingId] = useState(null);


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            // Handle file upload logic here, e.g., send the file to a server
            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = await axios.post(`${baseURL}/api/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: progressEvent => {
                        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        setUploadProgress(progress);
                    }
                });

                console.log('File uploaded successfully:', response.data.receipts);
                setData(response.data.receipts);

            } catch (error) {
                console.error('Error uploading file:', error);
            }

        } else {
            alert('Please select a file to upload');
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const isValidNumber = (value) => {
        return !isNaN(value) && value !== null && value !== undefined;
    }
    const handleEditSaveSubmit = (e) => {
        e.preventDefault();
        const updatedItems = data.map((item) => {
            if (item.id === editingId) {
                if (isValidNumber(formData.amount) && isValidNumber(formData.loanNo) && isValidNumber(formData.weekNo)) {
                    formData.isDirty = false;
                }
                return { ...item, ...formData };
            }
            return item;
        });
        setData(updatedItems);
        setEditingId(null);
        setFormData({ id: '', loanNo: '', weekNo: '', amount: '', isDirty: false });

    }
    const restoreLoanDetails = async (e) => {
        const ids = [];
        ids.push(Number(e.target.value));
        const response = await axios.put(`${baseURL}/api/validate/loannos`,
            { ids });
        console.log(response);
        const updatedItems = data.map((item) => {
            if (Number(item.loanNo) === response.data.response[0].loannumber) {
                return { ...item, ...response.data.response[0] };
            }
            return item;
        });
        setData(updatedItems);
    }

    const handleEditClick = (id, loanNo, weekNo, amount) => {
        setEditingId(id);
        setFormData({ id, loanNo, weekNo, amount });
    };
    const handleAdd = () => {
        setData([...data, formData]);
        setFormData({ id: '', loanNo: '', weekNo: '', amount: '' });
    };

    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
    };

    const handleValidate = async () => {
        const dirtyRecords = data.filter(item => item.isDirty === true)
        if (dirtyRecords.length > 0) {
            alert(`${dirtyRecords.length} incorrect records found. Please correct it before validating`)
        } else {
            const ids = data.filter(item => item.isDirty !== true).map(item => Number(item.loanNo));
            try {
                const response = await axios.put(`${baseURL}/api/validate/loannos`, { ids });
                console.log(response.data);
                // Merge arrays based on ID
                const mergedArray = data.map(item1 => {
                    const matchingItem = response.data.response.find(item2 => Number(item2.loannumber) === Number(item1.loanNo));
                    return { ...item1, ...matchingItem };
                });
                console.log(mergedArray);
                setData(mergedArray);
            } catch (error) {
                console.error('Error:', error);
            }

        }
    };
    return (
        <Container>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Select file to upload:</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Upload
                </Button>
            </Form>
            {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
            <Button variant="primary" onClick={() => handleValidate()}>Validate</Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>LoanNo</th>
                        <th>Customer</th>
                        <th>Loan Amount</th>
                        <th>Due Amount</th>
                        <th>WeekNo</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ id, loanNo, weekNo, amount, isDirty, customer, pending, dueamount }) => (
                        <tr key={id} className={(isDirty ? "table-danger" : "")}>
                            <td>{id}</td>
                            <td>{editingId === id ? (
                                <Form.Control
                                    type="number"
                                    name="loanNo"
                                    value={formData.loanNo}
                                    onBlur={(e) => restoreLoanDetails(e)}
                                    onChange={handleChange}
                                />
                            ) : loanNo}</td>
                            <td>
                                {customer}
                            </td>
                            <td>
                                {pending}
                            </td>
                            <td>
                                {dueamount}
                            </td>
                            <td>{editingId === id ? (
                                <Form.Control
                                    type="number"
                                    name="weekNo"
                                    value={formData.weekNo}
                                    onChange={handleChange}
                                />
                            ) : weekNo}</td>
                            <td>{editingId === id ? (
                                <Form.Control
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                />
                            ) : amount}</td>

                            <td>
                                {editingId === id ? (
                                    <Button variant="success" onClick={handleEditSaveSubmit}>
                                        Save
                                    </Button>
                                ) : (
                                    <Button variant="primary" onClick={() => handleEditClick(id, loanNo, weekNo, amount, isDirty)}>
                                        Edit
                                    </Button>
                                )}
                                <Button variant="danger" onClick={() => handleDelete(id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Container>
                <Form>
                    <Row>
                        <Form.Group as={Col} controlId="formId">
                            <Form.Control type="text" placeholder="ID" name="id" value={formData.id} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formLoanNo">
                            <Form.Control type="text" placeholder="LoanNo" name="loanNo" value={formData.loanNo} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formWeekNo">
                            <Form.Control type="text" placeholder="WeekNo" name="weekNo" value={formData.weekNo} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formAmount">
                            <Form.Control type="text" placeholder="Amount" name="amount" value={formData.amount} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formEmail">
                            <Button variant="primary" onClick={handleAdd}>Add</Button>
                        </Form.Group>
                    </Row>

                </Form>

            </Container>

        </Container>
    );
};

export default ReceiptByImage;
