import React, { Fragment, useState, useMemo } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"

var first = [];


const WeekEndAccountDetails = ({ pendingLoans, datefrom, dateto, isPrinting }) => {

    const { t, i18n } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 35;

    const nPage = Math.ceil(Object.keys(pendingLoans).length / recordsPerPage);
    var serialno = 0;
    var percentamount = 0;
    var totaldebit = 0;
    var totalcredit = 0;
    var totalincentive = 0;
    const totalPages = useMemo(() => Math.ceil(pendingLoans.length / recordsPerPage), [pendingLoans]);

    const renderPage = (page) => {
        var pagetotaldebit = 0;
        var pagetotalcredit = 0;
        var pagetotalincentive = 0;

        const startIndex = (page - 1) * recordsPerPage;
        const pageRecords = pendingLoans.slice(startIndex, startIndex + recordsPerPage);
        const isLastPage = page === totalPages;
        first = pageRecords.length > 0 ? pendingLoans[0] : "";
        serialno = startIndex;
        
        if (isLastPage && totalPages>0) {
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
                <div style={{ paddingLeft: "27px", display: "flex", alignItems: "center", paddingTop: page === 1 ? "0px" : "15px" }} className='print-margin'>
                    <div className='col-sm-12 text-center'><h4>{t('weekendaccounts')}</h4></div>
                </div>
                <div style={{ paddingLeft: "27px", display: "flex", alignItems: "center" }} className='print-margin'>
                    <div className='col-sm-4 fixed'>{t('line') + " : " + (pendingLoans.length > 0 ? first.lineno : "")}</div>
                    <div className='col-sm-4 fixed'>{t("lineman") + " : " + (pendingLoans.length > 0 ? first.linemanname : "")}</div>
                    <div className='col-sm-4 fixed fw-bold'>{t("date") + " : " + dateFormatdd(datefrom) + " - " + dateFormatdd(dateto)}</div>

                </div>
                <Table className='table text-center fs-6 table-bordered border-dark' style={{width:"103%"}}  >
                    <thead>
                        <tr>
                            <th style={{ fontSize: "11px", width: "1%" }}></th>
                            <th style={{ fontSize: "12px" }}>
                                {t('no')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('loannotooshort')}
                            </th>
                            <th>{t('doc')}</th>
                            <th style={{ fontSize: "12px" }}>
                                {t('customer')}
                            </th>

                            <th style={{ fontSize: "12px" }}>{t('city')}</th>
                            <th style={{ fontSize: "12px", width: "60px" }} >
                                {t('booknomedium')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('enddate')}
                            </th>
                            <th style={{ fontSize: "12px" }}>{t('givenamount')}</th>
                            <th style={{ fontSize: "12px" }}>{t('credit')}</th>
                            <th style={{ fontSize: "12px" }}>%</th>
                            <th style={{ fontSize: "12px" }}>%</th>
                            <th style={{ fontSize: "12px" }}>{t('lineincentive')}</th>
                            <th style={{ fontSize: "11px", width: "2%" }}></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pageRecords && pageRecords.length > 0
                                ?
                                (pageRecords.map((customer, i) => {
                                    serialno = serialno + 1;
                                    percentamount = ((customer.collected * customer.incentivepercentage) / 100).toFixed(0);
                                    pagetotalcredit = pagetotalcredit + customer.collected
                                    pagetotaldebit = pagetotaldebit + customer.totalamount
                                    pagetotalincentive = pagetotalincentive + Number(percentamount)
                                    return (
                                        <tr className='newaccountaddress'>
                                            
                                            <td></td>
                                            <td style={{ fontSize: "12px" }}>{serialno}</td>
                                            <td className="fw-bold" style={{ fontSize: "12px" }}>{customer.loannumber}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.document}</td>

                                            <td style={{ fontSize: "12px" }}>{customer.customer}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.referencecity}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.bookno}</td>
                                            <td style={{ fontSize: "12px" }}>{dateFormatdd(customer.lastreceipt)}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.totalamount}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.collected}</td>
                                            <td style={{ fontSize: "12px" }}>{Number(customer.incentivepercentage) === 1 ? customer.incentivepercentage : 0.0}</td>
                                            <td style={{ fontSize: "12px" }}>{Number(customer.incentivepercentage) < 1 ? customer.incentivepercentage : 0}</td>
                                            <td style={{ fontSize: "12px" }}>{percentamount}</td>
                                            <td></td>
                                            
                                        </tr>

                                    )
                                })
                                )
                                :
                                t('tabledata')
                        }
                        <tr className='newaccountaddress'>
                            
                            <td></td>
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
                            <td></td>
                            
                        </tr>
                    </tbody>
                    {
                        isLastPage ? <tr className="rounded bg-white newaccountaddress">
                            
                            <td></td>
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
                            <td></td>
                            
                        </tr> : null
                    }
                </Table>
                {!isLastPage && <div style={{ pageBreakAfter: "always" }} ><div style={{ paddingTop: "20px" }}></div></div>}
            </Fragment>
        );
    }
    return (
        <div>
            {(!isPrinting) ?
                (<div>{renderPage(currentPage)}
                    <Pagination>
                        <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Pagination.Item
                                key={i + 1} active={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}
                            >{i + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
                    </Pagination>
                </div>)
                : (<div>{Array.from({ length: totalPages }, (_, i) => renderPage(i + 1))}</div>)
            }
        </div>
    );
}
export default WeekEndAccountDetails
