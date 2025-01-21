import React, { Fragment, useState, useMemo } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"

var first = [];


const PreviousWeekList = ({ pendingLoans, date, company, isPrinting }) => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 35;


    const totalPages = useMemo(() => Math.ceil(pendingLoans.length / recordsPerPage), [pendingLoans]);
    var serialno = 0;
    const totals = useMemo(() => {
        const totaldue = pendingLoans.reduce((previousval, currentval) => {
            return previousval + currentval.dueamount;
        }, 0);
        const totalcredit = pendingLoans.reduce((previousval, currentval) => {
            return previousval + currentval.collectedamount;
        }, 0);
        return { totaldue, totalcredit }
    }, [pendingLoans])

    const renderPage = (page) => {
        var pagetotaldue = 0;
        var pagetotalcredit = 0;
        var totalinstallment = 0;

        const startIndex = (page - 1) * recordsPerPage;
        const pageRecords = pendingLoans.slice(startIndex, startIndex + recordsPerPage);
        const isLastPage = page === totalPages;
        first = pageRecords.length > 0 ? pendingLoans[0] : "";
        serialno = startIndex;
        return (
            <Fragment>
                <div style={{ paddingLeft: "27px", display: "flex", alignItems: "center", paddingTop: page === 1 ? "0px" : "15px" }} className='print-margin'>
                    <div className='col-sm-5 fixed mt-5' >
                        <h4>{(company)}</h4>
                    </div>
                    <div className='col-sm-7 fixed mt-5'><h4>{t('previousweekdetails')}</h4></div>
                </div>
                <div style={{ paddingLeft: "27px", display: "flex", alignItems: "center" }} className='print-margin'>
                    <div className='col-sm-2 fixed' >{t('line') + " : " + (pendingLoans.length > 0 ? first.lineno : "")}</div>
                    <div className='col-sm-2 fixed'>{t("bookno") + " : " + (pendingLoans.length > 0 ? first.bookno : "")}</div>
                    <div className='col-sm-2 fixed'>{t("date") + " : " + dateFormatdd(date)}</div>
                </div>

                <Table className='table text-center table-bordered border-dark' style={{width:"103%"}}  >
                    <thead>
                        <tr>
                            
                            <th style={{ fontSize: "11px", width: "1%" }}></th>
                            <th style={{ fontSize: "12px" }}>
                                {t('no')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('startdate')}
                            </th >
                            <th style={{ fontSize: "12px" }}>{t('noshort')}</th>
                            <th style={{ fontSize: "12px" }}>
                                {t('loannotooshort')}
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
                            <th style={{ fontSize: "11px", width: "1.5%" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pageRecords && pageRecords.length > 0
                                ?
                                (pageRecords.map((customer, i) => {
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
                        isLastPage ? <tr className="rounded bg-white ">
                            
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{t('total')}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{totals.totaldue}</td>
                            <td></td>
                            <td></td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{totals.totalcredit}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{totals.totalcredit}</td>
                            <td></td>
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
export default PreviousWeekList
