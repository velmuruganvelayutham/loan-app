import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Table, Pagination } from 'react-bootstrap';
import {
    useAuth
} from "@clerk/clerk-react";
import axios from "axios";
import { baseURL } from "../utils/constant";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"
let receiptdateadd;
const GivenMoneyModalView = ({ showModal, handleClose, data }) => {
    const { getToken } = useAuth();
    const [errorMessage, setErrorMessage] = useState("");
    const [receiptDetails, setReceiptDetails] = useState([]);
    const itemsPerPage = 10; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);
    const receiptdateaddRef = useRef(null);
    const lastReceiptDatePerPage = useRef({});
    const [avgdays, setAvgDays] = useState(0);
    const { t } = useTranslation();
    useEffect(() => {
        async function fetchData() {
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axios.get(`${baseURL}/receipt/get`, { params: { loannumber: data.loannumber } }).then((res) => {
                setReceiptDetails(res.data)
                setErrorMessage("");
                setCurrentPage(1); // Reset to the first page on data fetch
                receiptdateaddRef.current = new Date(res.data[0]?.receiptdate || null);
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessagecity'));
            })
        }
        fetchData();
    }, [data.loannumber, t]);




    const totalPages = Math.ceil(receiptDetails.length / itemsPerPage);

    const handlePageChange = (page) => {
        const currentPageData = getPaginatedData();
        if (currentPageData.length > 0) {
            lastReceiptDatePerPage.current[currentPage] = new Date(currentPageData[currentPageData.length - 1].receiptdate);
        }
        setCurrentPage(page);
    };
    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return receiptDetails.slice(startIndex, endIndex);
    };
    const paginatedData = getPaginatedData();

    

    /*const calculateTotalDaysForAllPages = () => {
        let totalDaysForAllPages = 0;
        let previousDate = new Date(receiptDetails[0]?.receiptdate || null);

        receiptDetails.forEach((receipt, index) => {
            if (index !== 0) {
                const diffTime = Math.abs(new Date(receipt.receiptdate) - previousDate);
                const datediff = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                totalDaysForAllPages += datediff;
            }
            previousDate = new Date(receipt.receiptdate);
        });
        return totalDaysForAllPages;
    };

    const totalDaysForAllPages = calculateTotalDaysForAllPages();*/

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header className="alert alert-info" closeButton >
                <Modal.Title style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>{t('accountno') + ":"}<span style={{ fontWeight: "bold" }}>{data.loannumber}</span></div>{'    '}
                        {/*<div style={{ textAlign: 'right' }}>{t('total') + ":" + totalDaysForAllPages}</div>*/}
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#f7f7f7' }}>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>{t('noshort')}</th>
                            <th style={{ textAlign: "center" }}>{t('receiptnoshort')}</th>
                            <th style={{ textAlign: "center" }}>{t('date')}</th>
                            <th style={{ textAlign: "center" }}>{t('pay')}</th>
                            <th style={{ textAlign: "center" }}>{t('day')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            (paginatedData.map((receipt, i) => {

                                const serialno = (currentPage - 1) * itemsPerPage + i + 1;
                                if (i === 0 && currentPage > 1) {

                                    receiptdateaddRef.current = lastReceiptDatePerPage.current[currentPage - 1];
                                }
                                let datediff = 0;
                                if (serialno === 1 && currentPage === 1) {
                                    receiptdateaddRef.current = new Date(receipt.receiptdate);
                                } else {
                                    const diffTime = Math.abs(new Date(receipt.receiptdate) - receiptdateaddRef.current);
                                    datediff = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
                                    receiptdateaddRef.current = new Date(receipt.receiptdate);
                                }
                                lastReceiptDatePerPage.current[currentPage] = new Date(receipt.receiptdate);

                                return (
                                    <tr key={i}>
                                        <td style={{ fontSize: "12px", textAlign: "center" }}>{serialno}</td>
                                        <td style={{ fontSize: "12px", textAlign: "center" }}>{receipt.receiptnumber}</td>
                                        <td style={{ fontSize: "12px", textAlign: "center" }}>{dateFormatdd(receipt.receiptdate)}</td>
                                        <td style={{ fontSize: "12px", textAlign: "center" }}>{receipt.collectedamount}</td>
                                        <td style={{ fontSize: "12px", textAlign: "center" }}>{datediff}</td>
                                    </tr>
                                )
                            }))

                        }
                    </tbody>
                </Table>
                <Pagination>
                    <Pagination.Prev
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                    >
                        {t('pageprev')}
                    </Pagination.Prev>
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                            key={index}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                    >
                        {t('pagenext')}
                    </Pagination.Next>

                </Pagination>

            </Modal.Body>

            <Modal.Footer className="bg-info p-2 text-dark bg-opacity-25">

                <Button variant="primary" onClick={handleClose} >
                    {t('close')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GivenMoneyModalView;
