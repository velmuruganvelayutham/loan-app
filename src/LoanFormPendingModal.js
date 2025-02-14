import React, {  useState, useRef } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Pagination, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "./FunctionsGlobal/StartDateFn"


var first = [];


const LoanFormPendingModal = ({ pendingLoans,handleClose,showModal }) => {
   

    //const handleShow = (index) => setModalIndex(index);
    //const handleClose = () => setModalIndex(null);

    const { t, i18n } = useTranslation();
    
    var serialno = 0;
    var pagetotalgiven = 0;
    var pagetotalamount = 0;
    var pagetotaldocument = 0;
    var pagetotalinterest = 0;
    var totalgiven = 0;
    var totalamount = 0;
    var totaldocument = 0;
    var totalinterest = 0;
    var totalcollected = 0;
    var pagetotalcollected = 0;
    var totalbalance = 0;
    var pagetotalbalance = 0;
    first = pendingLoans.length > 0 ? pendingLoans[0] : "";
    
    
        totalgiven = pendingLoans.reduce((previous, current) => {
            return previous + current.givenamount;
        }, 0);
        totaldocument = pendingLoans.reduce((previous, current) => {
            return previous + current.documentamount;
        }, 0);
        totalinterest = pendingLoans.reduce((previous, current) => {
            return previous + current.interestamount;
        }, 0);
        totalamount = pendingLoans.reduce((previous, current) => {
            return previous + current.totalamount;
        }, 0);

        totalcollected = pendingLoans.reduce((previous, current) => {
            return previous + current.collectedamount;
        }, 0);
        totalbalance = pendingLoans.reduce((previous, current) => {
            return previous + current.balance;
        }, 0);
    
    

    return (
        <Modal show={showModal} onHide={handleClose} size={'lg'}>
            <Modal.Header className="alert alert-info" closeButton >
                <Modal.Title style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1,fontWeight:"bold" ,textAlign:"center"}}>{pendingLoans?pendingLoans[0].customer:null}</div>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#f7f7f7' }}>
                <div className='col-sm-12 fixed text-center mt-5'><h3>{t('amountgivendetailsreport')}</h3></div>
                <div className='col-sm-12 col-md-8'>
                    <Table className='table text-center fs-6 table-bordered border-dark'  >
                        <thead>
                            <tr>
                                
                                <th style={{ fontSize: "11px" }}>
                                    {t('no')}
                                </th>
                                <th style={{ fontSize: "11px" }}>
                                    {t('givendate')}
                                </th>
                                <th style={{ fontSize: "11px" }}>
                                    {t('loanno')}
                                </th>
                                
                                <th style={{ fontSize: "11px" }}>{t('city')}</th>

                                <th style={{ fontSize: "11px" }}>
                                    {t('enddate')}
                                </th>
                                <th style={{ fontSize: "11px" }}>{t('givenamount')}</th>
                                <th style={{ fontSize: "11px" }}>{t('doc')}</th>
                                <th style={{ fontSize: "11px" }}>{t('interest')}</th>
                                <th style={{ fontSize: "11px" }}>{t('total')}</th>
                                <th style={{ fontSize: "11px" }}>{t('paidamount')}</th>
                                <th style={{ fontSize: "11px" }}>{t('pending')}</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pendingLoans && pendingLoans.length > 0
                                    ?
                                    (pendingLoans.map((customer, i) => {
                                        serialno = serialno + 1;
                                        pagetotalgiven = pagetotalgiven + customer.givenamount;
                                        pagetotaldocument = pagetotaldocument + customer.documentamount;
                                        pagetotalinterest = pagetotalinterest + customer.interestamount;
                                        pagetotalamount = pagetotalamount + customer.totalamount;
                                        pagetotalcollected = pagetotalcollected + customer.collectedamount;
                                        pagetotalbalance = pagetotalbalance + customer.balance;
                                        const backgroundColor = customer.balance === 0 ? '#A8E0B7' : 'white';
                                        return (
                                            <tr >
                                                
                                                <td style={{ fontSize: "12px", backgroundColor }}>{serialno}</td>
                                                <td style={{ fontSize: "12px", backgroundColor }}>{dateFormatdd(customer.givendate)}</td>
                                                <td className="fw-bold" style={{ fontSize: "12px", backgroundColor }}>{customer.loannumber}</td>
                                                
                                                <td style={{ fontSize: "12px", backgroundColor }}>{customer.referencecity}</td>
                                                <td style={{ fontSize: "12px", backgroundColor }}>{dateFormatdd(customer.finisheddate)}</td>
                                                <td style={{ fontSize: "12px", backgroundColor }}>{customer.givenamount}</td>
                                                <td style={{ fontSize: "12px", backgroundColor }}>{customer.documentamount}</td>
                                                <td style={{ fontSize: "12px", backgroundColor }}>{customer.interestamount}</td>
                                                <td style={{ fontSize: "12px", backgroundColor }}>{customer.totalamount}</td>
                                                <td style={{ fontSize: "12px", backgroundColor }}>{customer.collectedamount}</td>
                                                <td style={{ fontSize: "12px", backgroundColor }}>{customer.balance}</td>
                                                

                                            </tr>

                                        )
                                    })
                                    )
                                    :
                                    t('tabledata')
                            }
                            <tr>
                                
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                
                                <td className='fw-bold' style={{ fontSize: "12px" }}>{t('pagetotal')}</td>
                                <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalgiven}</td>
                                <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotaldocument}</td>
                                <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalinterest}</td>
                                <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalamount}</td>
                                <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalcollected}</td>
                                <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalbalance}</td>
                                
                            </tr>
                        </tbody>
                        {
                            <tr className="rounded bg-white ">
                                
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                
                                <td className='fw-bold' style={{ fontSize: "12px" }}>{t('total')}</td>
                                <td className='fw-bold' style={{ fontSize: "12px" }}>{totalgiven}</td>
                                <td className='fw-bold' style={{ fontSize: "12px" }}>{totaldocument}</td>
                                <td className='fw-bold' style={{ fontSize: "12px" }}>{totalinterest}</td>
                                <td className='fw-bold' style={{ fontSize: "12px" }}>{totalamount}</td>
                                <td className='fw-bold' style={{ fontSize: "12px" }}>{totalcollected}</td>
                                <td className='fw-bold' style={{ fontSize: "12px" }}>{totalbalance}</td>
                                
                            </tr> 
                        }
                    </Table>
                    
                    
                </div>
            </Modal.Body>
            <Modal.Footer className="bg-info p-2 text-dark bg-opacity-25">
                <Button variant="primary" onClick={handleClose} >
                    {t('close')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default LoanFormPendingModal
