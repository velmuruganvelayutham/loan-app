import React, { Fragment, useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"
var first = [];

const ListLineChecking = ({ pendingLoans, date, company }) => {

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
      if (current.collectedamountdate > 0 || current['addFields'].receiptpendingweek<0 ||current.finisheddatepending==1) {
        return previous + 0;
      }
      else {
        return previous + current.dueamount
      }
    }, 0);

    totalpendingweek = pendingLoans.reduce((previousval, currentval) => {
      if (currentval['addFields'].receiptpendingweek > 0 && currentval['addFields'].receiptpendingweek < 8) {
        return previousval + (currentval['addFields'].receiptpendingweek * currentval.dueamount);
      }
      else if (currentval['addFields'].receiptpendingweek >= 8) {
        return previousval + (currentval['addFields'].receiptpendingweek * currentval.dueamount);
        //return previousval + (currentval.totalamount - currentval.collectedtotal);
      }
      else {
        return previousval + 0;
      }
    }, 0);
  }

  return (
    <Fragment >
      <div className='col-sm-6 fixed mt-5 '>
        <h3>{(company)}</h3>
      </div>
      <div className='col-sm-6 fixed mt-5'><h3>{t('linechecking')}</h3></div>

      <div className='col-sm-3 fixed'>{t('city') + " : " + first.city}</div>
      <div className='col-sm-3 fixed'>{t('customer') + " : " + first.linemanname}</div>
      <div className='col-sm-2 fixed'>{t('line') + " : " + (pendingLoans.length > 0 ? first.lineno : "")}</div>
      <div className='col-sm-2 fixed'>{t("bookno") + " : " + (pendingLoans.length > 0 ? first.bookno : "")}</div>
      <div className='col-sm-2 fixed'>{t("date") + " : " + dateFormatdd(date)}</div>

      <Table className='table  text-center table-bordered border-dark'  >
        <thead >
          <tr>
            <th></th>
            <th style={{ fontSize: "12px", width: "5%" }}>
              {t('no')}
            </th>
            <th style={{ fontSize: "12px", width: "5%" }}>
              {t('startdate')}
            </th >
            <th style={{ fontSize: "12px", width: "10%" }}>
              {t('loanno')}
            </th>
            <th style={{ fontSize: "12px", width: "13%" }}>
              {t('customer')}
            </th>

            <th colSpan={2} style={{ fontSize: "12px", width: "13%" }}>
              {t('fathername')}
            </th>
            <th style={{ fontSize: "12px", width: "15%" }}>
              {t('address')}
            </th>
            <th style={{ fontSize: "12px", width: "10%" }}>
              {t('phoneno')}
            </th>
            <th style={{ fontSize: "12px", width: "5%" }}>
              {t('enddate')}
            </th>
            <th style={{ fontSize: "12px", width: "7%" }}>
              {t('loanamount')}
            </th>
            <th style={{ fontSize: "12px", width: "7%" }}>
              {t('pay')}
            </th>
            <th style={{ fontSize: "12px", width: "10%" }}>
              {t('pending')}
            </th>
            <th></th>
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

                
                if (customer.collectedamountdate > 0 || customer['addFields'].receiptpendingweekafter<0 ||customer.finisheddatepending==1) {
                  duepending = 0
                }
                else {
                  duepending = customer.dueamount
                }

                
                if (customer['addFields'].receiptpendingweek > 0 && customer['addFields'].receiptpendingweek < 8) {
                  pendingweek = (customer['addFields'].receiptpendingweek * customer.dueamount);
                }
                else if (customer['addFields'].receiptpendingweek >= 8) {
                  pendingweek=(customer['addFields'].receiptpendingweek * customer.dueamount);
                  //pendingweek = customer.totalamount - customer.collectedtotal;
                }
                else {
                  pendingweek = 0;
                }
                if(pendingweek<duepending && duepending!=0){
                  duepending=pendingweek
                }
                duepending=parseFloat(duepending.toFixed(2));
                pendingtotal = pendingtotal + duepending;
                pendingweek = parseFloat(pendingweek.toFixed(2))-duepending;
                pendingweektotal = pendingweektotal + parseFloat(pendingweek);
                
                //console.log("enddatediff"+customer['addFields'].daysCountloan);
                //console.log("weekdiff"+customer['addFields'].daysCount);
                return (
                  <tr className='newaccountaddress'>
                    <td></td>
                    <td style={{ fontSize: "12px" }} >{serialno}</td>
                    <td style={{ fontSize: "12px" }}>{dateFormatdd(customer.startdate)}</td>
                    <td style={{ fontSize: "12px" }}>{customer.loannumber}</td>
                    <td style={{ fontSize: "12px" }}>{customer.customer}</td>
                    <td style={{ fontSize: "12px" }}>{customer.relationtype == 0 ? t('fathershort') : t('husbandshort')}</td>
                    <td style={{ fontSize: "12px" }}>{customer.fathername}</td>
                    <td style={{ fontSize: "12px" }}>{customer.address}</td>
                    <td style={{ fontSize: "12px" }}>{customer.mobileno}</td>
                    <td style={{ fontSize: "12px" }}>{dateFormatdd(customer.finisheddate)}</td>
                    <td style={{ fontSize: "12px" }}>{pending}</td>
                    <td style={{ fontSize: "12px" }}>{duepending>0?duepending:""}</td>
                    {
                      customer['addFields'].receiptpendingweek > 2
                        ?
                        <td style={{ backgroundColor: "black", color: "white", fontSize: "12px" }}>{pendingweek>0?pendingweek:""}</td>
                        :
                        customer['addFields'].receiptpendingweek <= 2 && customer['addFields'].receiptpendingweek > 0
                          ?
                          <td style={{ fontSize: "12px" }}>{pendingweek>0?pendingweek:""}</td>
                          :
                          <td style={{ fontSize: "12px" }}></td>
                    }
                    <td></td>
                  </tr>

                )
              })
              )
              :
              t('tabledata')
          }
          <tr className='borderless'>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td className='fw-bold borderless' style={{ fontSize: "12px" }}>{t('pagetotal')}</td>
            <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotal}</td>
            <td className='fw-bold' style={{ fontSize: "12px" }}>{pendingtotal}</td>
            <td className='fw-bold' style={{ fontSize: "12px" }}>{pendingweektotal}</td>
            <td ></td>
          </tr>
        </tbody>

        {

          currentPage === nPage ? <tr className="rounded bg-white ">
            <td ></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className='fw-bold' style={{ fontSize: "12px" }}>{t('total')}</td>
            <td className='fw-bold' style={{ fontSize: "12px" }}>{total}</td>
            <td className='fw-bold' style={{ fontSize: "12px" }}>{totalduepending}</td>
            <td className='fw-bold' style={{ fontSize: "12px" }}>{totalpendingweek.toFixed(2)}</td>
            <td ></td>
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
export default ListLineChecking
