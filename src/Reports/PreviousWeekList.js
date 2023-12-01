import React, { Fragment, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"

var first = [];


const PreviousWeekList = ({ pendingLoans, date,company}) => {
    var totaldue = 0;
    var totalcredit = 0;
    const { t, i18n } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 35;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = pendingLoans.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(Object.keys(pendingLoans).length / recordsPerPage);
    const numbers = [...Array(nPage + 1).keys()].slice(1);
    var serialno = 0;
    first = records.length > 0 ? pendingLoans[0] : "";
    serialno = (currentPage - 1) * recordsPerPage;
    var pagetotaldue = 0;
    var pagetotalcredit = 0;
    
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
    return (
        <Fragment>
            <div className='col-sm-6 fixed'>
            <h3>{(company)}</h3>
            </div>
            <div className='col-sm-6 fixed'><h3>{t('previousweekdetails')}</h3></div>
            <div className='col-sm-2 fixed'>{t('line') + " : " + (pendingLoans.length > 0 ? first.lineno : "")}</div>
            <div className='col-sm-2 fixed'>{t("bookno") + " : " + (pendingLoans.length > 0 ? first.bookno : "")}</div>
            <div className='col-sm-2 fixed'>{t("date") + " : " + dateFormatdd(date)}</div>
            <div >
                <Table className='table text-center fs-6 table-bordered border-dark'  >
                    <thead>
                        <tr>
                            <th style={{ fontSize: "12px" }}>
                                {t('no')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('startdate')}
                            </th >
                            <th style={{ fontSize: "12px" }}>
                                {t('loanno')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('customer')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('due')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('dueno')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('totalcredit')}
                            </th>
                            <th style={{ fontSize: "12px" }}>{t('debitcredit')}</th>
                            <th style={{ fontSize: "12px" }}>{t('city')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records && records.length > 0
                                ?
                                (records.map((customer, i) => {
                                    serialno = serialno + 1;
                                    pagetotaldue = pagetotaldue + customer.dueamount;
                                    pagetotalcredit = pagetotalcredit + customer.collectedamount;
                                    totalcredit = totalcredit + customer.collectedamount;
                                    totaldue = totaldue + customer.dueamount;
                                    return (
                                        <tr>
                                            <td style={{ fontSize: "12px" }}>{serialno}</td>
                                            <td style={{ fontSize: "12px" }}>{dateFormatdd(customer.startdate)}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.loannumber}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.customer}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.dueamount}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.weekno}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.collectedamount}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.collectedamount}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.city}</td>
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
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{t('total')}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotaldue}</td>
                            <td></td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalcredit}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalcredit}</td>
                            <td></td>
                        </tr>
                    </tbody>
                    
                </Table>
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
        </Fragment>
    )
}
export default PreviousWeekList
