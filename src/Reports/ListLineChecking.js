import React, { Fragment, useEffect, useState, useMemo } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"
var first = [];

const ListLineChecking = ({ pendingLoans, date, company, isPrinting, bookno, lineno, bond }) => {

  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 35;
  var duependingcheck = 0;
  var duependingweekcheck = 0;
  var duependingcheckval = 0;
  var pendingweekcheck = 0;


  var serialno = 0;

  //first = records.length > 0 ? pendingLoans[0] : "";



  const totalPages = useMemo(() => Math.ceil(pendingLoans.length / recordsPerPage), [pendingLoans]);
  const totals = useMemo(() => {
    const total = pendingLoans.reduce((acc, item) => acc + (item.totalamount - item.collectedtotal), 0);
    const totalDuePending = pendingLoans.reduce((previous, current) => {
      if (current.collectedamountdate > 0 && current.collectedamountdate >= current.dueamount || current.topay <= 0 || current.finisheddatepending == 1) {
        return previous + 0;
      }
      else if (current.collectedamountdate == 0 && current['addFields'].receiptpendingweekafter <= 0 && current.topay > 0) {
        if ((-1 * (current['addFields'].receiptpendingweekafter * current.dueamount)) < current.dueamount && ((current['addFields'].receiptpendingweekafter * current.dueamount) != 0)) {

          return previous + (current.dueamount - (-1 * (current['addFields'].receiptpendingweekafter * current.dueamount)))
        }
        else {
          return previous + (-1 * (current['addFields'].receiptpendingweekafter) * current.dueamount)
        }

      }
      else if (current.collectedamountdate > 0 && current.collectedamountdate < current.dueamount) {
        return previous + (current.dueamount - current.collectedamountdate)
      }
      else {
        duependingcheck = ((current['addFields'].receiptpendingweekafter * current.dueamount) < current.dueamount && current.dueamount != 0 ? current['addFields'].receiptpendingweekafter * current.dueamount : current.dueamount)
        duependingcheck = parseFloat(duependingcheck.toFixed(2))
        return previous + duependingcheck
      }
    }, 0);

    const totalPendingWeek = pendingLoans.reduce((previousval, currentval) => {
      duependingcheck = 0;
      if (currentval['addFields'].receiptpendingweekafter > 0 && currentval['addFields'].receiptpendingweekafter < 8) {
        if (currentval.collectedamountdate > 0 && currentval.collectedamountdate >= currentval.dueamount || currentval.topay <= 0 || currentval.finisheddatepending == 1) {
          duependingcheck = 0;
        }
        else if (currentval.collectedamountdate == 0 && currentval['addFields'].receiptpendingweekafter <= 0 && currentval.topay > 0) {

          duependingcheck = -1 * (currentval['addFields'].receiptpendingweekafter) * currentval.dueamount
          if (duependingcheck < currentval.dueamount && duependingcheck != 0) {
            duependingcheck = currentval.dueamount - duependingcheck
          }
        }
        else if (currentval.collectedamountdate > 0 && currentval.collectedamountdate < currentval.dueamount) {
          duependingcheck = currentval.dueamount - currentval.collectedamountdate;
        }
        else {
          duependingcheck = currentval.dueamount
        }

        pendingweekcheck = (currentval['addFields'].receiptpendingweekafter * currentval.dueamount);
        duependingcheckval = ((pendingweekcheck) < duependingcheck && duependingcheck != 0 ? (pendingweekcheck) : duependingcheck)
        duependingweekcheck = pendingweekcheck - duependingcheckval;

        duependingweekcheck = parseFloat(duependingweekcheck.toFixed(2))


        return previousval + duependingweekcheck;
      }
      else if (currentval['addFields'].receiptpendingweekafter >= 8) {
        if (currentval.collectedamountdate > 0 && currentval.collectedamountdate >= currentval.dueamount || currentval.topay <= 0 || currentval.finisheddatepending == 1) {
          duependingcheck = 0;
        }
        else if (currentval.collectedamountdate == 0 && currentval['addFields'].receiptpendingweekafter <= 0 && currentval.topay > 0) {

          duependingcheck = -1 * (currentval['addFields'].receiptpendingweekafter) * currentval.dueamount
          if (duependingcheck < currentval.dueamount && duependingcheck != 0) {
            duependingcheck = currentval.dueamount - duependingcheck
          }
        }
        else if (currentval.collectedamountdate > 0 && currentval.collectedamountdate < currentval.dueamount) {
          duependingcheck = currentval.dueamount - currentval.collectedamountdate;
        }
        else {
          duependingcheck = currentval.dueamount
        }
        pendingweekcheck = (currentval['addFields'].receiptpendingweekafter * currentval.dueamount);
        duependingcheckval = ((pendingweekcheck) < duependingcheck && duependingcheck != 0 ? (pendingweekcheck) : duependingcheck)
        duependingweekcheck = pendingweekcheck;

        duependingweekcheck = parseFloat(duependingweekcheck.toFixed(2))
        return previousval + duependingweekcheck - duependingcheckval;

      }
      else {
        return previousval + 0;
      }
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
      <Fragment >

        <div style={{ display: "flex", alignItems: "center", paddingTop: page === 1 ? "5px" : "19px" }} className='linechecking-print-margin'>
          <div className='col-sm-6 fixed' >
            <h4>{(company)}</h4>
          </div>
          <div className='col-sm-6 fixed'><h4>{t('linechecking')}</h4></div>
        </div>
        {lineno !== "" &&
          <div style={{ display: "flex", alignItems: "center" }} className='col-sm-12 fixed linechecking-print-margin'>
            {bookno !== "" && (<div className='col-sm-3 fixed' style={{ whiteSpace: "normal", wordWrap: "break-word" }} >{t('city') + " : " + first.city}</div>)}

            <div className={bookno !== '' ? 'col-sm-3 fixed' : 'col-sm-6 fixed'}>{t('customer') + " : " + first.linemanname}</div>
            <div className='col-sm-2 fixed'>{t('line') + " : " + (pendingLoans.length > 0 ? first.lineno : "")}</div>
            {bookno !== "" && (<div className='col-sm-2 fixed'>{t("bookno") + " : " + (pendingLoans.length > 0 ? first.bookno : "")}</div>)}
            <div className='col-sm-2 fixed'>{t("date") + " : " + dateFormatdd(date)}</div>
          </div>}

        <Table className='table table-bordered border-dark linecheckingtable' style={{ margin: 0, padding: 0, width: "103%" }}  >
          <thead>
            <tr>

              <th style={{ fontSize: "11px", width: "1%" }}></th>
              <th style={{ fontSize: "11px", width: "3%" }}>
                {t('noshort')}
              </th>
              <th style={{ fontSize: "9px", width: "5.5%" }}>
                {t('startdate')}
              </th >
              <th style={{ fontSize: "11px", width: "4%" }}>
                {t('loannotooshort')}
              </th>
              <th style={{ fontSize: "11px", width: "9%" }} >
                {t('customer')}
              </th>
              <th style={{ fontSize: "11px", width: "2%" }}></th>
              <th style={{ fontSize: "11px", width: "8%" }} >
                {t('fathername')}
              </th>
              <th style={{ fontSize: "11px", width: "8.5%" }}>
                {bond?t('bond'):t('address')}
              </th>
              <th style={{ fontSize: "11px", width: "6.5%" }}>
                {bond?t('cheque'):t('phoneno')}
              </th>

              <th style={{ fontSize: "9px", width: "5%" }}>
                {t('enddate')}
              </th>
              <th style={{ fontSize: "11px", width: "6%", textAlign: "center" }}>
                {t('loanamount')}
              </th>
              <th style={{ fontSize: "11px", width: "5%", textAlign: "center" }}>
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


                  if (customer.collectedamountdate > 0 && customer.collectedamountdate >= customer.dueamount || customer.topay <= 0 || customer.finisheddatepending == 1) {
                    duepending = 0
                  }
                  else if (customer.collectedamountdate == 0 && customer['addFields'].receiptpendingweekafter <= 0 && customer.topay > 0) {

                    duepending = -1 * (customer['addFields'].receiptpendingweekafter) * customer.dueamount
                    if (duepending < customer.dueamount && duepending != 0) {
                      duepending = customer.dueamount - duepending
                    }
                  }
                  else if (customer.collectedamountdate > 0 && customer.collectedamountdate < customer.dueamount) {
                    duepending = customer.dueamount - customer.collectedamountdate
                  }
                  else {
                    duepending = customer.dueamount
                  }

                  //if(customer['addFields'].receiptpendingweekafter >1 )
                  if (customer['addFields'].receiptpendingweekafter > 0 && customer['addFields'].receiptpendingweekafter < 8) {
                    pendingweek = (customer['addFields'].receiptpendingweekafter * customer.dueamount);
                  }
                  else if (customer['addFields'].receiptpendingweekafter >= 8) {
                    pendingweek = (customer['addFields'].receiptpendingweekafter * customer.dueamount);

                  }
                  else {
                    pendingweek = 0;
                  }

                  if (pendingweek < duepending && duepending != 0 && pendingweek != 0) {
                    duepending = pendingweek
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
                      
                      <td style={{ fontSize: "11px", overflow: "hidden" }} className='text-nowrap overflow-hidden'>  {bond ? customer.bond : customer.address}</td>
                      {bond ?<td style={{ fontSize: "12px"}}>{customer.cheque}</td>:<td style={{ fontSize: "12px", wordWrap: "break-word", padding: "0px", margin: "0px" }}>{customer.mobileno}</td>}
                      
                      <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{dateFormatdd(customer.finisheddate)}</td>
                      <td style={{ fontSize: "11px", textAlign: "center" }} className='text-nowrap overflow-hidden'>{pending}</td>
                      <td style={{ fontSize: "11px", textAlign: "center" }} className='text-nowrap overflow-hidden'>{duepending > 0 ? duepending : ""}</td>
                      {
                        customer.pendingweekcolor >= 4
                          ?
                          <td style={{ backgroundColor: "black", color: "white", fontSize: "11px", textAlign: "center" }} >{pendingweek > 0 ? pendingweek : ""}</td>
                          :
                          customer.pendingweekcolor <= 4 && customer['addFields'].receiptpendingweekafter > 0
                            ?
                            <td style={{ fontSize: "11px", textAlign: "center" }} >{pendingweek > 0 ? pendingweek : ""}</td>
                            :
                            <td style={{ fontSize: "11px", textAlign: "center" }} ></td>
                      }
                      <td ></td>
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
              <td className='fw-bold' style={{ fontSize: "10px", textAlign: "center" }}>{t('pagetotal')}</td>
              <td className='fw-bold' style={{ fontSize: "11px", textAlign: "center" }}>{pagetotal}</td>
              <td className='fw-bold' style={{ fontSize: "11px", textAlign: "center" }}>{pendingtotal}</td>
              <td className='fw-bold' style={{ fontSize: "11px", textAlign: "center" }}>{pendingweektotal}</td>
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
              <td className='fw-bold' style={{ fontSize: "13px", textAlign: "center" }}>{t('totalcount')}</td>
              <td className='fw-bold' style={{ fontSize: "13px", textAlign: "center" }}>{totals.total}</td>
              <td className='fw-bold' style={{ fontSize: "13px", textAlign: "center" }}>{totals.totalDuePending}</td>
              <td className='fw-bold' style={{ fontSize: "13px", textAlign: "center" }}>{totals.totalPendingWeek.toFixed(2)}</td>
              <td></td>
            </tr> : null
          }

        </Table>
        {!isLastPage && <div style={{ pageBreakAfter: "always" }} ><div style={{ paddingTop: "20px" }}></div></div>}
      </Fragment>
    );
  };
  return (
    <div>
      {(!isPrinting) ?
        (<div >{renderPage(currentPage)}
          <Pagination >
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
export default ListLineChecking