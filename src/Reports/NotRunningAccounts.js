import React, { Fragment, useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"
var first = [];

const NotRunningAccounts = ({ pendingLoans, date, company }) => {

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
  var pagetotal = 0;
  var pendingtotal = 0;
  var pending = 0;
  var duepending = 0;
  var pendingweek = 0;
  var pendingweektotal = 0;
  var total = 0;
  var totalduepending = 0;
  var totalpendingweek = 0;
  var duependingcheck = 0;
  var duependingweekcheck = 0;
  var duependingcheckval = 0;
  var pendingweekcheck = 0;
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
    total = pendingLoans.reduce((previousValue, currentValue) => {
      return previousValue + (currentValue.totalamount - currentValue.collectedtotal)
    }, 0);

    totalduepending = pendingLoans.reduce((previous, current) => {
      if (current.finisheddatepending !== 1) {
        return previous + customer.dueamount;
      }
      else{
        return previous+0;      }
    }, 0);

    totalpendingweek = pendingLoans.reduce((previousval, currentval) => {

      if (currentval.finisheddatepending !== 1) {
        duependingcheck = currentval.dueamount;
      }
      else{
        duependingcheck=0;
      }

      pendingweekcheck = (currentval.pendingweekcolor * currentval.dueamount);
      duependingcheckval = ((pendingweekcheck) < duependingcheck && duependingcheck != 0 ? (pendingweekcheck) : duependingcheck)
      duependingweekcheck = pendingweekcheck - duependingcheckval;

      duependingweekcheck = parseFloat(duependingweekcheck.toFixed(2))
      return previousval + duependingweekcheck;



    }, 0);
  }

  return (
    <Fragment>
      <div style={{ paddingLeft: "32px", display: "flex", alignItems: "center" }} className='mt-2'>
        <div className='col-sm-6 fixed mt-3' >
          <h4>{(company)}</h4>
        </div>
        <div className='col-sm-6 fixed mt-3'><h4>{t('notrunningaccounts')}</h4></div>
      </div>
      <div style={{ paddingLeft: "30px", display: "flex", alignItems: "center" }}>
        <div className='col-sm-6 fixed mt-3'>{t('customer') + " : " + first.linemanname}</div>
        <div className='col-sm-2 fixed mt-3'>{t('line') + " : " + (pendingLoans.length > 0 ? first.lineno : "")}</div>
        <div className='col-sm-2 fixed mt-3'>{t("date") + " : " + dateFormatdd(date)}</div>
      </div>
      <Table className=' table table-bordered border-dark linecheckingtable '   >
        <thead >
          <tr>
            <th style={{ fontSize: "11px", width: "1%" }}></th>
            <th style={{ fontSize: "11px", width: ".5%" }}></th>
            <th style={{ fontSize: "11px", width: "2%" }}>
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
            <th style={{ fontSize: "11px", width: "8%" }} >
              {t('fathername')}
            </th>
            <th style={{ fontSize: "11px", width: "7.5%" }} >
              {t('address')}
            </th>
            <th style={{ fontSize: "9px", width: "5.5%" }}>
              {t('city')}
            </th>
            <th style={{ fontSize: "11px", width: "6%" }}>
              {t('phoneno')}
            </th>
            <th style={{ fontSize: "9px", width: "5%" }}>
              {t('enddate')}
            </th>
            <th style={{ fontSize: "11px", width: "5%", textAlign: "center" }}>
              {t('loanamount')}
            </th>
            <th style={{ fontSize: "11px", width: "5%", textAlign: "center" }}>
              {t('pay')}
            </th>
            <th style={{ fontSize: "9px", width: "6%", textAlign: "center" }}>
              {t('pending')}
            </th>
            <th style={{ fontSize: "11px", width: "1%" }}></th>
            <th style={{ fontSize: "11px", width: ".5%" }}></th>
          </tr>
        </thead>
        <tbody>
          {
            records && records.length > 0
              ?
              (records.map((customer, i) => {
                serialno = serialno + 1;
                pending = customer.totalamount - customer.collectedtotal;
                pagetotal = pagetotal + pending;


                if (finisheddatepending !== 1) {
                  duepending = customer.dueamount;
                }
                else {
                  duepending = 0;
                }

                if (customer.pendingweekcolor >= 4) {
                  pendingweek = (customer.pendingweekcolor * customer.dueamount);

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
                    <td></td>
                    <td style={{ fontSize: "11px", textAlign: "center" }} className='text-nowrap overflow-hidden' id='nowidth'>{serialno}</td>
                    <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{dateFormatdd(customer.startdate)}</td>
                    <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{customer.loannumber}</td>
                    <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{customer.customer}</td>
                    <td style={{ fontSize: "11px", width: "1%" }} >{customer.relationtype == 0 ? t('fathershort') : t('husbandshort')}</td>
                    <td style={{ fontSize: "11px", width: "12%" }} className='text-nowrap overflow-hidden'>{customer.fathername}</td>
                    <td style={{ fontSize: "11px", overflow: "hidden" }} className='text-nowrap overflow-hidden'>{customer.address}</td>
                    <td style={{ fontSize: "11px", overflow: "hidden" }} className='text-nowrap overflow-hidden'>{customer.city}</td>
                    <td style={{ fontSize: "12px", wordWrap: "break-word", padding: "0px", margin: "0px" }}>{customer.mobileno}</td>
                    <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{dateFormatdd(customer.finisheddate)}</td>
                    <td style={{ fontSize: "11px", textAlign: "center" }} className='text-nowrap overflow-hidden'>{pending}</td>
                    <td style={{ fontSize: "11px", textAlign: "center" }} className='text-nowrap overflow-hidden'>{duepending > 0 ? duepending : ""}</td>
                    {
                      customer.pendingweekcolor >= 4
                        ?
                        <td style={{ backgroundColor: "black", color: "white", fontSize: "11px" }} className='text-nowrap overflow-hidden'>{pendingweek > 0 ? pendingweek : ""}</td>
                        :
                        customer.pendingweekcolor <= 4 && customer['addFields'].receiptpendingweekafter > 0
                          ?
                          <td style={{ fontSize: "11px", textAlign: "center" }} className='text-nowrap overflow-hidden'>{pendingweek > 0 ? pendingweek : ""}</td>
                          :
                          <td style={{ fontSize: "11px", textAlign: "center" }} className='text-nowrap overflow-hidden'></td>
                    }
                    <td className='text-nowrap overflow-hidden'></td>
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
            <td ></td>
            <td></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td></td>
            <td className='fw-bold' style={{ fontSize: "10px", textAlign: "center" }}>{t('pagetotal')}</td>
            <td className='fw-bold' style={{ fontSize: "11px", textAlign: "center" }}>{pagetotal}</td>
            <td className='fw-bold' style={{ fontSize: "11px", textAlign: "center" }}>{pendingtotal}</td>
            <td className='fw-bold' style={{ fontSize: "11px", textAlign: "center" }}>{pendingweektotal}</td>
            <td ></td>
            <td></td>
          </tr>
        </tbody>

        {

          currentPage === nPage ? <tr className="rounded bg-white">
            <td ></td>
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
            <td className='fw-bold' style={{ fontSize: "13px", textAlign: "center" }}>{t('totalcount')}</td>
            <td className='fw-bold' style={{ fontSize: "13px", textAlign: "center" }}>{total}</td>
            <td className='fw-bold' style={{ fontSize: "13px", textAlign: "center" }}>{totalduepending}</td>
            <td className='fw-bold' style={{ fontSize: "13px", textAlign: "center" }}>{totalpendingweek.toFixed(2)}</td>
            <td ></td>
            <td></td>
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



    </Fragment>

  )

}
export default NotRunningAccounts
