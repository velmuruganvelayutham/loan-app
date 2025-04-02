import React, { Fragment, useMemo, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"
var first = [];

const NotRunningAccounts = ({ pendingLoans, date, company, isPrinting, lineman }) => {

  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 35;
  var serialno = 0;


  var total = 0;
  var totalduepending = 0;
  var totalpendingweek = 0;
  var duependingcheck = 0;
  var duependingweekcheck = 0;
  var duependingcheckval = 0;
  var pendingweekcheck = 0;

  const totalPages = useMemo(() => Math.ceil(pendingLoans.length / recordsPerPage), [pendingLoans]);

  const totals = useMemo(() => {
    const total = pendingLoans.reduce((acc, item) => acc + (item.totalamount - item.collectedtotal), 0);
    const totalDuePending = pendingLoans.reduce((previous, current) => {
      if (current.finisheddatepending !== 1) {
        duependingcheck = current.dueamount;
      }
      else {
        duependingcheck = 0;
      }
      return previous + duependingcheck

    }, 0);

    const totalPendingWeek = pendingLoans.reduce((previousval, currentval) => {



      if (currentval.finisheddatepending !== 1) {
        duependingcheck = currentval.dueamount;
      }
      else {
        duependingcheck = 0;
      }

      if (currentval.finisheddatepending !== 1 && currentval.pendingweekcolor >= 4) {
        pendingweekcheck = (currentval.pendingweekcolor * currentval.dueamount);
      }
      else if (currentval.finisheddatepending == 1 && currentval.pendingweekcolor >= 4) {
        pendingweekcheck = (currentval.totalamount - currentval.collectedtotal);
      }
      else {
        pendingweekcheck = 0;
      }

      duependingcheckval = ((pendingweekcheck) < duependingcheck && duependingcheck != 0 ? (pendingweekcheck) : duependingcheck)
      duependingweekcheck = pendingweekcheck - duependingcheckval;

      duependingweekcheck = parseFloat(duependingweekcheck.toFixed(2))
      return previousval + duependingweekcheck;


    }, 0);
    return { total, totalDuePending, totalPendingWeek };
  }, [pendingLoans]);

  const renderPage = (page) => {

    const startIndex = (page - 1) * recordsPerPage;

    const pageRecords = pendingLoans.slice(startIndex, startIndex + recordsPerPage);
    const isLastPage = page === totalPages;
    var pagetotal = 0;
    var pendingtotal = 0;
    var pending = 0;
    var duepending = 0;
    var pendingweek = 0;
    var pendingweektotal = 0;

    first = pageRecords.length > 0 ? pendingLoans[0] : "";
    serialno = startIndex;


    return (
      <Fragment>
        <div style={{ paddingLeft: "32px", display: "flex", alignItems: "center" }} className='mt-2'>
          <div className='col-sm-6 fixed mt-3' >
            <h4>{(company)}</h4>
          </div>
          <div className='col-sm-6 fixed mt-3'><h4>{t('notrunningaccounts')}</h4></div>
        </div>
        {lineman !== "" &&
          <div style={{ paddingLeft: "30px", display: "flex", alignItems: "center" }}>
            <div className='col-sm-6 fixed mt-3'>{t('customer') + " : " + first.linemanname}</div>
            <div className='col-sm-2 fixed mt-3'>{t('line') + " : " + (pendingLoans.length > 0 ? first.lineno : "")}</div>
            <div className='col-sm-2 fixed mt-3'>{t("date") + " : " + dateFormatdd(date)}</div>
          </div>}
        <Table className='table table-bordered border-dark linecheckingtable' style={{ margin: 0, padding: 0, width: "103%" }}  >
          <thead>
            <tr>

              <th style={{ fontSize: "11px", width: "1%" }}></th>
              <th style={{ fontSize: "11px", width: "2.5%" }}>
                {t('noshort')}
              </th>
              <th style={{ fontSize: "9px", width: "5%" }}>
                {t('startdate')}
              </th >
              <th style={{ fontSize: "11px", width: "4%" }}>
                {t('loannotooshort')}
              </th>
              <th style={{ fontSize: "11px", width: "8%" }} >
                {t('customer')}
              </th>
              <th style={{ fontSize: "11px", width: "2%" }}></th>
              <th style={{ fontSize: "10px", width: "7.5%" }} >
                {t('fathername')}
              </th>
              <th style={{ fontSize: "10px", width: "6.5%" }} >
                {t('address')}
              </th>
              <th style={{ fontSize: "9px", width: "6.9%" }}>{t('city')}</th>
              <th style={{ fontSize: "11px", width: "6%" }}>
                {t('phoneno')}
              </th>
              <th style={{ fontSize: "9px", width: "5%" }}>
                {t('enddate')}
              </th>
              <th style={{ fontSize: "11px", width: "5.1%", textAlign: "center" }}>
                {t('loanamount')}
              </th>
              <th style={{ fontSize: "11px", width: "4%", textAlign: "center" }}>
                {t('pay')}
              </th>
              <th style={{ fontSize: "9px", width: "6%", textAlign: "left" }}>
                {t('pending')}
              </th>
              <th style={{ fontSize: "11px", width: "1.5%" }}></th>

            </tr>
          </thead>

          <tbody>
            {
              pageRecords && pageRecords.length > 0
                ?
                (pageRecords.map((customer, i) => {
                  serialno = serialno + 1;
                  pending = customer.totalamount - customer.collectedtotal;
                  pagetotal = pagetotal + pending;


                  if (customer.finisheddatepending !== 1) {
                    duepending = customer.dueamount;
                  }
                  else {
                    duepending = 0;
                  }

                  if (customer.pendingweekcolor >= 4 && customer.finisheddatepending !== 1) {
                    pendingweek = (customer.pendingweekcolor * customer.dueamount);

                  }
                  else if (customer.pendingweekcolor >= 4 && customer.finisheddatepending === 1) {
                    pendingweek = pending;
                  }
                  else {
                    pendingweek = 0;
                  }

                  duepending = parseFloat(duepending.toFixed(2));

                  pendingtotal = pendingtotal + duepending;

                  if (pendingweek > 0) {
                    pendingweek = parseFloat(pendingweek.toFixed(2)) - duepending;
                  }
                  else {
                    pendingweek = pendingweek
                  }
                  pendingweektotal = pendingweektotal + parseFloat(pendingweek);


                  return (
                    <tr className='linechecking'>
                      <td></td>
                      <td style={{ fontSize: "11px", textAlign: "center" }} className='text-nowrap overflow-hidden' id='nowidth'>{serialno}</td>
                      <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{dateFormatdd(customer.startdate)}</td>
                      <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{customer.loannumber}</td>
                      <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{customer.customer}</td>
                      <td style={{ fontSize: "11px", width: "1%" }} >{customer.relationtype == 0 ? t('fathershort') : t('husbandshort')}</td>
                      <td style={{ fontSize: "11px", width: "12%" }} className='text-nowrap overflow-hidden'>{customer.fathername}</td>
                      <td style={{ fontSize: "11px", overflow: "hidden" }} className='text-nowrap overflow-hidden'>{customer.address}</td>
                      <td style={{ fontSize: "10px", overflow: "hidden", }} className='text-nowrap overflow-hidden'>{customer.city}</td>
                      <td style={{ fontSize: "11px", wordWrap: "break-word", padding: "0px", margin: "0px", fontWeight: "500" }}>{customer.mobileno}</td>
                      <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{dateFormatdd(customer.finisheddate)}</td>
                      <td style={{ fontSize: "11px", textAlign: "center" }} className='text-nowrap overflow-hidden'>{pending}</td>
                      <td style={{ fontSize: "11px", textAlign: "center" }} className='text-nowrap overflow-hidden'>{duepending > 0 ? duepending : ""}</td>
                      {
                        customer.pendingweekcolor >= 4
                          ?
                          <td style={{ backgroundColor: "black", color: "white", fontSize: "11px", textAlign: "center", fontWeight: "500" }} >{pendingweek > 0 ? pendingweek : ""}</td>
                          :
                          customer.pendingweekcolor <= 4 && customer['addFields'].receiptpendingweekafter > 0
                            ?
                            <td style={{ fontSize: "11px", textAlign: "center" }} >{pendingweek > 0 ? pendingweek : ""}</td>
                            :
                            <td style={{ fontSize: "11px", textAlign: "center" }} ></td>
                      }
                      <td></td>
                    </tr>

                  )
                })
                )
                :
                t('tabledata')
            }
            <tr className='linechecking'>
              <td></td>
              <td ></td>
              <td ></td>
              <td ></td>
              <td ></td>
              <td></td>
              <td ></td>
              <td ></td>
              <td ></td>
              <td ></td>
              <td className='fw-bold' style={{ fontSize: "10px", textAlign: "center" }}>{t('pagetotal')}</td>
              <td style={{ fontSize: "11px", fontWeight: "600" }}>{pagetotal}</td>
              <td style={{ fontSize: "11px", fontWeight: "600" }}>{pendingtotal}</td>
              <td style={{ fontSize: "11px", fontWeight: "600" }}>{pendingweektotal}</td>
              <td></td>
            </tr>
          </tbody>

          {

            isLastPage ? <tr className="rounded bg-white">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className='fw-bold' style={{ fontSize: "12px", textAlign: "center" }}>{t('totalcount')}</td>
              <td className='fw-bold' style={{ fontSize: "12px", textAlign: "center" }}>{totals.total}</td>
              <td className='fw-bold' style={{ fontSize: "12px", textAlign: "center" }}>{totals.totalDuePending}</td>
              <td className='fw-bold' style={{ fontSize: "12px", textAlign: "center" }}>{totals.totalPendingWeek.toFixed(2)}</td>
              <td></td>
            </tr> : null
          }
        </Table>
        {!isLastPage && <div style={{ pageBreakAfter: "always" }} ><div style={{ paddingTop: "20px" }}></div></div>}


      </Fragment>

    )
  };
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
export default NotRunningAccounts
