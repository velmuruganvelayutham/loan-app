import React, { Fragment, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"

var first = [];


const CurrentWeekGivenAmount = ({ pendingLoans, datefrom, dateto }) => {

    const { t, i18n } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 35;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = pendingLoans.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(Object.keys(pendingLoans).length / recordsPerPage);
    const numbers = [...Array(nPage + 1).keys()].slice(1);
    var serialno = 0;
    var totalgiven = 0;
    var totalamount = 0;
    var totaldocument = 0;
    var totalinterest = 0;
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
    return (
        <Fragment>
            <div className='col-sm-12 fixed text-center'><h3>{t('currentweekamountgiven')}</h3></div>
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
                                {t('givendate')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('loanno')}
                            </th>
                            <th>{t('doc')}</th>
                            <th style={{ fontSize: "12px" }}>
                                {t('customer')}
                            </th>
                            <th style={{ fontSize: "12px" }}>{t('city')}</th>
                            <th style={{ fontSize: "12px",width: "60px" }} className='w-5'>
                                {t('bookno')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('enddate')}
                            </th>
                            <th style={{ fontSize: "12px" }}>{t('givenamount')}</th>
                            <th style={{ fontSize: "12px" }}>{t('doc')}</th>
                            <th style={{ fontSize: "12px" }}>{t('interest')}</th>
                            <th style={{ fontSize: "12px" }}>{t('total')}</th>
                            <th style={{ fontSize: "12px" }}>{t('week')}</th>
                            <th style={{ fontSize: "12px" }}>{t('pay')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records && records.length > 0
                                ?
                                (records.map((customer, i) => {
                                    serialno = serialno + 1;
                                    totalgiven =totalgiven+customer.givenamount;
                                    totaldocument = totaldocument + customer.documentamount;
                                    totalinterest = totalinterest + customer.interestamount;
                                    totalamount = totalamount + customer.totalamount;
                                    return (
                                        <tr>
                                            <td style={{ fontSize: "12px" }}>{serialno}</td>
                                            <td style={{ fontSize: "12px" }}>{dateFormatdd(customer.givendate)}</td>
                                            <td className="fw-bold" style={{ fontSize: "12px" }}>{customer.loannumber}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.document}</td>

                                            <td style={{ fontSize: "12px" }}>{customer.customer}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.city}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.bookno}</td>
                                            <td style={{ fontSize: "12px" }}>{dateFormatdd(customer.finisheddate)}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.givenamount}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.documentamount}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.interestamount}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.totalamount}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.weekcount}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.dueamount}</td>
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
                            <td></td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{t('total')}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{totalgiven}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{totaldocument}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{totalinterest}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{totalamount}</td>
                            <td></td>
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
export default CurrentWeekGivenAmount
