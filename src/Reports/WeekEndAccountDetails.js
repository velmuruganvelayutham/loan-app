import React, { Fragment, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"

var first = [];


const WeekEndAccountDetails = ({ pendingLoans, datefrom, dateto }) => {

    const { t, i18n } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 35;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = pendingLoans.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(Object.keys(pendingLoans).length / recordsPerPage);
    const numbers = [...Array(nPage + 1).keys()].slice(1);
    var serialno = 0;
    var percentamount = 0;
    var totaldebit = 0;
    var totalcredit = 0;
    var totalincentive = 0;

    var pagetotaldebit = 0;
    var pagetotalcredit = 0;
    var pagetotalincentive = 0;
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
        totalcredit = pendingLoans.reduce((previous, current) => {
            return previous + current.collected
        }, 0);
        totaldebit = pendingLoans.reduce((previous, current) => {
            return previous + current.totalamount
        }, 0);
        totalincentive = pendingLoans.reduce((previous, current) => {
            return previous + Number(((current.collected * current.incentivepercentage) / 100).toFixed(0))
        }, 0);
    }
    return (
        <Fragment>
            <div className='col-sm-12 fixed text-center mt-5'><h3>{t('weekendaccounts')}</h3></div>
            <div className='col-sm-4 fixed'>{t('line') + " : " + (pendingLoans.length > 0 ? first.lineno : "")}</div>
            <div className='col-sm-4 fixed'>{t("lineman") + " : " + (pendingLoans.length > 0 ? first.linemanname : "")}</div>
            <div className='col-sm-4 fixed fw-bold'>{t("date") + " : " + dateFormatdd(datefrom) + " - " + dateFormatdd(dateto)}</div>
            <div >
                <Table className='table text-center fs-6 table-bordered border-dark'  >
                    <thead>
                        <tr>
                            <th style={{ fontSize: "12px" }}>
                                {t('no')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('loanno')}
                            </th>
                            <th>{t('doc')}</th>
                            <th style={{ fontSize: "12px" }}>
                                {t('customer')}
                            </th>

                            <th style={{ fontSize: "12px" }}>{t('city')}</th>
                            <th style={{ fontSize: "12px", width: "60px" }} >
                                {t('bookno')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('enddate')}
                            </th>
                            <th style={{ fontSize: "12px" }}>{t('givenamount')}</th>
                            <th style={{ fontSize: "12px" }}>{t('credit')}</th>
                            <th style={{ fontSize: "12px" }}>%</th>
                            <th style={{ fontSize: "12px" }}>%</th>
                            <th style={{ fontSize: "12px" }}>{t('lineincentive')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records && records.length > 0
                                ?
                                (records.map((customer, i) => {
                                    serialno = serialno + 1;
                                    percentamount = ((customer.collected * customer.incentivepercentage) / 100).toFixed(0);
                                    pagetotalcredit = pagetotalcredit + customer.collected
                                    pagetotaldebit = pagetotaldebit + customer.totalamount
                                    pagetotalincentive = pagetotalincentive + Number(percentamount)
                                    return (
                                        <tr>
                                            <td style={{ fontSize: "12px" }}>{serialno}</td>
                                            <td className="fw-bold" style={{ fontSize: "12px" }}>{customer.loannumber}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.document}</td>

                                            <td style={{ fontSize: "12px" }}>{customer.customer}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.city}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.bookno}</td>
                                            <td style={{ fontSize: "12px" }}>{dateFormatdd(customer.lastreceipt)}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.totalamount}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.collected}</td>
                                            <td style={{ fontSize: "12px" }}>{Number(customer.incentivepercentage) === 1 ? customer.incentivepercentage : 0.0}</td>
                                            <td style={{ fontSize: "12px" }}>{Number(customer.incentivepercentage) < 1 ? customer.incentivepercentage : 0}</td>
                                            <td style={{ fontSize: "12px" }}>{percentamount}</td>
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
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotaldebit}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalcredit}</td>
                            <td></td>
                            <td></td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalincentive}</td>
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
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{totaldebit}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{totalcredit}</td>
                            <td></td>
                            <td></td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{totalincentive}</td>
                        </tr> : null
                    }
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
export default WeekEndAccountDetails
