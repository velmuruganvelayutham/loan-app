import React, { Fragment, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"

var first = [];


const PreviousWeekList = ({ pendingLoans, date, company }) => {
    var totaldue = 0;
    var totalcredit = 0;
    const { t } = useTranslation();
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
    var totalinstallment = 0;
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
        totaldue = pendingLoans.reduce((previous, current) => {
            return (previous + current.dueamount)
        }, 0);
        totalcredit = pendingLoans.reduce((previous, current) => {
            return (previous + current.collectedamount)
        }, 0);
    }

    return (
        <Fragment>
            <div style={{ paddingLeft: "20px", display: "flex", alignItems: "center" }}>
                <div className='col-sm-6 fixed mt-5' >
                    <h4>{(company)}</h4>
                </div>
                <div className='col-sm-6 fixed mt-5'><h4>{t('previousweekdetails')}</h4></div>
            </div>
            <div style={{  paddingLeft: "20px",display: "flex", alignItems: "center" }}>
                <div className='col-sm-2 fixed' >{t('line') + " : " + (pendingLoans.length > 0 ? first.lineno : "")}</div>
                <div className='col-sm-2 fixed'>{t("bookno") + " : " + (pendingLoans.length > 0 ? first.bookno : "")}</div>
                <div className='col-sm-2 fixed'>{t("date") + " : " + dateFormatdd(date)}</div>
            </div>

            <Table className='table text-center table-bordered border-dark'  >
                <thead>
                    <tr>
                        <th></th>
                        <th style={{ fontSize: "12px" }}>
                            {t('no')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('startdate')}
                        </th >
                        <th style={{ fontSize: "12px" }}>{t('noshort')}</th>
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
                        <th style={{ fontSize: "12px" }}>{t('receiptnoshort')}</th>
                        <th style={{ fontSize: "12px" }}>
                            {t('totalcredit')}
                        </th>
                        <th style={{ fontSize: "12px" }}>{t('debitcredit')}</th>
                        <th style={{ fontSize: "12px" }}>{t('city')}</th>
                        <th></th>
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
                                totalinstallment = parseInt((customer.totalcollected) / customer.dueamount);
                                return (
                                    <tr className='previousweek'>
                                        <td></td>
                                        <td style={{ fontSize: "12px" }}>{serialno}</td>
                                        <td style={{ fontSize: "12px" }}>{dateFormatdd(customer.startdate)}</td>
                                        <td style={{ fontSize: "12px" }}>{customer.weeknoreceipt}</td>
                                        <td style={{ fontSize: "12px" }}>{customer.loannumber}</td>
                                        <td style={{ fontSize: "12px" }}>{customer.customer}</td>
                                        <td style={{ fontSize: "12px" }}>{customer.dueamount}</td>
                                        <td style={{ fontSize: "12px" }}>{totalinstallment}</td>
                                        <td style={{ fontSize: "12px" }}>{customer.receiptnumber}</td>
                                        <td style={{ fontSize: "12px" }}>{customer.collectedamount}</td>
                                        <td style={{ fontSize: "12px" }}>{customer.collectedamount}</td>
                                        <td style={{ fontSize: "12px" }}>{customer.referencecity}</td>
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
                        <td className='fw-bold' style={{ fontSize: "12px" }}>{t('pagetotal')}</td>
                        <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotaldue}</td>
                        <td></td>
                        <td></td>
                        <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalcredit}</td>
                        <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalcredit}</td>
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
                        <td className='fw-bold' style={{ fontSize: "12px" }}>{t('total')}</td>
                        <td className='fw-bold' style={{ fontSize: "12px" }}>{totaldue}</td>
                        <td></td>
                        <td></td>
                        <td className='fw-bold' style={{ fontSize: "12px" }}>{totalcredit}</td>
                        <td className='fw-bold' style={{ fontSize: "12px" }}>{totalcredit}</td>
                        <td></td>
                        <td></td>
                    </tr> : null
                }
            </Table>
            <nav>

                <Pagination>
                    <Pagination.Prev >
                        <button href="#" className='page-link' onClick={() => prevPage()}>{t('pageprev')}</button>
                    </Pagination.Prev>
                    {
                        numbers.map((n, i) => (
                            <Pagination.Item>
                                <button href="#" className='page-link'
                                    onClick={() => changeCPage(n)}>{n}</button>
                            </Pagination.Item>
                        ))
                    }
                    <Pagination.Next>
                        <button href="#" className='page-link' onClick={() => nextPage}>{t('pagenext')}</button>
                    </Pagination.Next>
                </Pagination>
            </nav>
        </Fragment>
    )
}
export default PreviousWeekList
