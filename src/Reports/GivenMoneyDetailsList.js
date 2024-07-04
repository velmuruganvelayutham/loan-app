import React, { Fragment, useState, useRef } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Pagination, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"
import GivenMoneyModalView from './GivenMoneyModalView';

var first = [];


const GivenMoneyDetailsList = ({ pendingLoans }) => {
    const componentRef = useRef();
    const [modalIndex, setModalIndex] = useState(null);

  const handleShow = (index) => setModalIndex(index);
  const handleClose = () => setModalIndex(null);

    const { t, i18n } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 35;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = pendingLoans.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(Object.keys(pendingLoans).length / recordsPerPage);
    const numbers = [...Array(nPage + 1).keys()].slice(1);
    var serialno = 0;
    var pagetotalgiven = 0;
    var pagetotalamount = 0;
    var pagetotaldocument = 0;
    var pagetotalinterest = 0;
    var totalgiven = 0;
    var totalamount = 0;
    var totaldocument = 0;
    var totalinterest = 0;
    var totalcollected=0;
    var pagetotalcollected=0;
    var totalbalance=0;
    var pagetotalbalance=0;
    first = records.length > 0 ? pendingLoans[0] : "";
    serialno = (currentPage - 1) * recordsPerPage;

    function prevPage() {
        if (currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1)
        }

    }
    function nextPage() {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1);
        }

    }
    function changeCPage(id) {
        setCurrentPage(id)
    }
    if (currentPage === nPage) {
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

        totalcollected=pendingLoans.reduce((previous, current) => {
            return previous + current.collectedamount;
        }, 0);
        totalbalance=pendingLoans.reduce((previous, current) => {
            return previous + current.balance;
        }, 0);    
    }
    const renderGivenList = () => {
        return (<div><GivenMoneyModalView /></div>)

    }

    return (
        <Fragment>
            <div className='col-sm-12 fixed text-center mt-5'><h3>{t('amountgivendetailsreport')}</h3></div>
            <div >
                <Table className='table text-center fs-6 table-bordered border-dark'  >
                    <thead>
                        <tr>
                            <th></th>
                            <th style={{ fontSize: "12px" }}>
                                {t('no')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('givendate')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('loanno')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('customer')}
                            </th>
                            <th style={{ fontSize: "12px" }}>{t('city')}</th>
                            
                            <th style={{ fontSize: "12px" }}>
                                {t('enddate')}
                            </th>
                            <th style={{ fontSize: "12px" }}>{t('givenamount')}</th>
                            <th style={{ fontSize: "12px" }}>{t('doc')}</th>
                            <th style={{ fontSize: "12px" }}>{t('interest')}</th>
                            <th style={{ fontSize: "12px" }}>{t('total')}</th>
                            <th style={{ fontSize: "12px" }}>{t('paidamount')}</th>
                            <th style={{ fontSize: "12px" }}>{t('pending')}</th>
                            <th>+</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records && records.length > 0
                                ?
                                (records.map((customer, i) => {
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
                                            <td ></td>
                                            <td style={{ fontSize: "12px",backgroundColor }}>{serialno}</td>
                                            <td style={{ fontSize: "12px",backgroundColor }}>{dateFormatdd(customer.givendate)}</td>
                                            <td className="fw-bold" style={{ fontSize: "12px",backgroundColor }}>{customer.loannumber}</td>
                                            <td style={{ fontSize: "12px",backgroundColor }}>{customer.customer}</td>
                                            <td style={{ fontSize: "12px",backgroundColor }}>{customer.referencecity}</td>
                                            <td style={{ fontSize: "12px",backgroundColor }}>{dateFormatdd(customer.finisheddate)}</td>
                                            <td style={{ fontSize: "12px",backgroundColor }}>{customer.givenamount}</td>
                                            <td style={{ fontSize: "12px",backgroundColor }}>{customer.documentamount}</td>
                                            <td style={{ fontSize: "12px",backgroundColor }}>{customer.interestamount}</td>
                                            <td style={{ fontSize: "12px",backgroundColor }}>{customer.totalamount}</td>
                                            <td style={{ fontSize: "12px",backgroundColor }}>{customer.collectedamount}</td>
                                            <td style={{ fontSize: "12px",backgroundColor }}>{customer.balance}</td>
                                            <td ><Button size='sm' className="btn btn-primary" onClick={() => handleShow(i)}  >{t('show')}</Button></td>
                                            <td></td>

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
                            <td></td>
                            <td></td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{t('pagetotal')}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalgiven}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotaldocument}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalinterest}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalamount}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalcollected}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalbalance}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                    {
                        currentPage === nPage ? <tr className="rounded bg-white ">
                            <td></td>
                            <td></td>
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
                            <td></td>
                            <td></td>
                        </tr> : null
                    }
                </Table>
                {modalIndex !== null && (
                    <GivenMoneyModalView
                        showModal={modalIndex !== null}
                        handleClose={handleClose}
                        data={records[modalIndex]}
                    />
                )}
                <nav>
                <Pagination>
                    <Pagination.Prev >
                        <a href="#" className='page-link' onClick={prevPage}>{t('pageprev')}</a>
                    </Pagination.Prev>
                    {
                        numbers.map((n, i) => (
                            <Pagination.Item>
                                <a href="#" className='page-link'
                                    onClick={() => changeCPage(n)}>{n}</a>
                            </Pagination.Item>
                        ))
                    }
                    <Pagination.Next>
                        <a href="#" className='page-link' onClick={nextPage}>{t('pagenext')}</a>
                    </Pagination.Next>
                </Pagination>
            </nav>

        </div>
        </Fragment >
    )
}
export default GivenMoneyDetailsList
