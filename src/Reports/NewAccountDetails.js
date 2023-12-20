import React, { Fragment, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"

var first = [];


const NewAccountDetails = ({ pendingLoans, datefrom,dateto }) => {
    
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
            <div className='col-sm-12 fixed text-center mt-5'><h3>{t('newaccountaddress')}</h3></div>
            <div className='col-sm-4 fixed'>{t('line') + " : " + (pendingLoans.length > 0 ? first.lineno : "")}</div>
            <div className='col-sm-4 fixed'>{t("lineman") + " : " + (pendingLoans.length > 0 ? first.linemanname : "")}</div>
            <div className='col-sm-4 fixed fw-bold'>{t("date") + " : " + dateFormatdd(datefrom)+" - "+dateFormatdd(dateto)}</div>
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
                            <th style={{ fontSize: "12px" }}>
                                {t('customer')}
                            </th>
                            <th colSpan={2} style={{ fontSize: "12px" }}>
                                {t('fathername')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('address')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('phoneno')}
                            </th>
                            <th style={{ fontSize: "12px" }}>{t('city')}</th>
                            <th style={{ fontSize: "12px" }}>{t('givenamount')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records && records.length > 0
                                ?
                                (records.map((customer, i) => {
                                    serialno = serialno + 1;
                                    return (
                                        <tr className='newaccountaddress'>
                                            <td style={{ fontSize: "12px" }}>{serialno}</td>
                                            <td className="fw-bold" style={{ fontSize: "12px" }}>{customer.loannumber}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.customer}</td>
                                            <td style={{ fontSize: "12px" }}>{Number(customer.relationtype)=== 0 ? t('fathershort') : t('husbandshort')}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.fathername}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.address}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.mobileno}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.city}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.totalamount}</td>
                                        </tr>

                                    )
                                })
                                )
                                :
                                t('tabledata')
                        }
                       
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
export default NewAccountDetails
