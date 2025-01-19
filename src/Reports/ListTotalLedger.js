import React, { Fragment, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatddmmyyyy } from "../FunctionsGlobal/StartDateFn"

var first = [];
const ListTotalLedger = ({ totalledger, datefrom, dateto, notrunningdate, reportypeval, companyname, linemanname, linamnline }) => {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = totalledger.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(Object.keys(totalledger).length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);
  var serialno = 0;
  var countbefore = 0;
  var totalbefore = 0;
  var totalnew = 0;
  var pendingbefore = 0;
  var countcurrent = 0;
  var totalcurrent = 0;
  var pendingcurrent = 0;
  var collectiontotal = 0;
  var calavg = 0;
  var avg = 0;
  var pendingless = 0;
  var pendingmore = 0;
  var notrunningcount = 0;
  var notrunningpending = 0;
  var notrunningcountdates = 0;
  var notrunningpendingdates = 0;
  var notrunningcountcurrent=0;
  var notrunningloanpendingcurrent=0;
  var runningcountdates = 0;
  var runningpendingdates = 0;
  var totalcount = 0;
  var countfinishedtotal = 0;
  var totalcounttotal = 0;
  var countnew = 0;
  var totalnew = 0;
  first = records.length > 0 ? totalledger[0] : "";
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
    <Fragment >
      <div className="landscape">
      {Number(reportypeval) === 0 ?
        <div style={{ paddingLeft: "30px" }}>
          <Row className='col-md-12  mt-5'>
            <Col>
              <div className='col-md-12 fw-bold'>{dateFormatddmmyyyy(datefrom)}&nbsp;&nbsp;&nbsp;-&nbsp;{dateFormatddmmyyyy(dateto)}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t('totalledgername')}
              </div></Col></Row>
        </div>
        :
        <div >
          <Row className='col-md-10 mx-auto mt-5'>
            <Col className='col-md-4 mx-auto'>{companyname}</Col>
            <Col className='col-md-3 fw-bold text-center'>{t('line') + " " + linamnline}</Col>
            <Col className='col-md-3 fw-bold text-center'>{linemanname}</Col>
          </Row>
          <Row><Col><div className='col-md-10 fw-bold mx-auto'>{dateFormatddmmyyyy(datefrom)}&nbsp;-&nbsp;{dateFormatddmmyyyy(dateto)}
            &nbsp;&nbsp;&nbsp;&nbsp;{t('totalledgernamecitywise')}</div></Col></Row>
        </div>
      }
      {Number(reportypeval) === 0 ?
        <Table className='table text-center table-bordered border-dark w-auto' style={{marginLeft:"10px",marginRight:"5px"}} >
          <thead>
            <tr>
              <th></th>
              {reportypeval == 0 ? <th style={{ fontSize: "12px" }}>{t('line')}</th> : null}
              {reportypeval == 0 ? <th style={{ fontSize: "12px" }} >
                {t('customer')}
              </th> : null}
              {reportypeval == 1 ? <th style={{ fontSize: "12px", width: "12%" }}>{t('city')}</th> : null}
              <th colSpan={3} style={{ fontSize: "12px" }}>
                <div style={{ fontSize: "12px" }}>{t('beforedebt')}</div>
                <div style={{ fontSize: "12px" }}>{dateFormatddmmyyyy(datefrom)}</div>
              </th>
              <th style={{ fontSize: "12px" }}>{t('newdebt')}</th>
              <th colSpan={2} style={{ fontSize: "12px" }}>
                {t('averagecollection')}
              </th>

              <th colSpan={3} style={{ fontSize: "12px" }}>
                <div style={{ fontSize: "12px" }}>{t('currentdebt')}</div>
                <div style={{ fontSize: "12px" }}>{dateFormatddmmyyyy(dateto)}</div>
              </th>
              <th colSpan={2} style={{ fontSize: "12px" }} >
                {t('pending')}
              </th>
              <th colSpan={2} style={{ fontSize: "12px" }}>
                <div style={{ fontSize: "12px" }}>{t('notrunning')}</div>
                <div style={{ fontSize: "12px" }}>{dateFormatddmmyyyy(notrunningdate)}</div>

              </th>
              <th colSpan={4} style={{ fontSize: "12px" }}>{t('notrunning')}</th>
              <th colSpan={2} style={{ fontSize: "12px" }}>{t('running')}</th>
              <th></th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th></th>
              {reportypeval == 0 ? <th></th> : null}
              {reportypeval == 0 ? <th></th> : null}
              {reportypeval == 1 ? <th></th> : null}
              <th style={{ fontSize: "12px" }}>{t('beforeloancount')}</th>
              <th style={{ fontSize: "12px" }}>{t('beforetotalamount')}</th>
              <th style={{ fontSize: "12px" }}>{t('beforependingamount')}</th>
              <th></th>
              <th style={{ fontSize: "12px" }}>{t('collection')}</th>
              <th style={{ fontSize: "12px" }}>{t('average')}</th>
              <th style={{ fontSize: "12px" }}>{t('currentloancount')}</th>
              <th style={{ fontSize: "12px" }}>{t('currenttotalamount')}</th>
              <th style={{ fontSize: "12px" }}>{t('currentpendingamount')}</th>
              <th style={{ fontSize: "12px" }}>{t('more')}</th>
              <th style={{ fontSize: "12px" }}>{t('less')}</th>
              <th style={{ fontSize: "12px" }}>{t('notrunningcount')}</th>
              <th style={{ fontSize: "12px" }}>{t('notrunningpending')}</th>
              <th style={{ fontSize: "12px" }}>{t('more')}</th>
              <th style={{ fontSize: "12px" }}></th>
              <th style={{ fontSize: "12px" }}>{t('notrunningweekcount')}</th>
              <th style={{ fontSize: "12px" }}></th>
              <th style={{ fontSize: "12px" }}>{t('less')}</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              records && records.length > 0
                ?
                (records.map((customer, i) => {
                  serialno = serialno + 1;
                  countbefore = countbefore + (Number(customer.countbefore));
                  countcurrent = countcurrent + customer.countafter;
                  totalbefore = totalbefore + customer.totalamountbefore;
                  totalcurrent = totalcurrent + customer.totalafter;
                  pendingbefore = pendingbefore + customer.pendingbefore;
                  pendingcurrent = pendingcurrent + customer.pendingafter;
                  collectiontotal = collectiontotal + customer.collectedbetween;
                  calavg = ((customer.collectedbetween / customer.totalafter) * 100).toFixed(2);
                  avg = avg + Number(calavg);
                  pendingless = pendingless + customer.collectedless;
                  pendingmore = pendingmore + customer.collectedmore;
                  notrunningcount = notrunningcount + customer.notrunningloancount;
                  notrunningpending = notrunningpending + customer.notrunningloanpending;
                  notrunningcountdates = notrunningcountdates + customer.notrunningcountdates;
                  notrunningpendingdates = notrunningpendingdates + customer.notrunningloanpendingdates;
                  notrunningcountcurrent=notrunningcountcurrent+customer.notrunningcountcurrent;
                  notrunningloanpendingcurrent=notrunningloanpendingcurrent+customer.notrunningloanpendingcurrent;
                  runningcountdates = runningcountdates + customer.runningcountdates;
                  runningpendingdates = runningpendingdates + customer.runningloanpendingdates;
                  totalcount = totalcount + customer.countafter + customer.countfinished;
                  countfinishedtotal = countfinishedtotal + customer.countfinished;
                  totalcounttotal = totalcounttotal + totalcount;
                  totalnew = totalnew + customer.totalamountbetween;
                  //console.log(customer.collectedmore)
                  return (
                    <tr >
                      <td></td>
                      {reportypeval == 0 ? <td style={{ fontSize: "12px" }}>{customer.linename}</td> : null}
                      {reportypeval == 0 ? <td style={{ fontSize: "12px" }}>{customer.linemanname}</td> : null}
                      {reportypeval == 1 ? <td style={{ fontSize: "12px" }} >{customer.cityname}</td> : null}
                      <td style={{ fontSize: "12px" }}>{(Number(customer.countbefore))}</td>
                      <td style={{ fontSize: "12px" }}>{customer.totalamountbefore}</td>
                      <td style={{ fontSize: "12px" }}>{customer.pendingbefore}</td>
                      <td style={{ fontSize: "12px" }}>{customer.totalamountbetween}</td>
                      <td style={{ fontSize: "12px" }}>{customer.collectedbetween}</td>
                      <td style={{ fontSize: "12px" }}>{((customer.collectedbetween / customer.totalafter) * 100).toFixed(2)}</td>
                      <td style={{ fontSize: "12px" }}>{customer.countafter}</td>
                      <td style={{ fontSize: "12px" }}>{customer.totalafter}</td>
                      <td style={{ fontSize: "12px" }}>{customer.pendingafter}</td>
                      <td style={{ fontSize: "12px" }}>{customer.collectedmore}</td>
                      <td style={{ fontSize: "12px" }}>{customer.collectedless}</td>
                      <td style={{ fontSize: "12px" }}>{customer.notrunningloancount}</td>
                      <td style={{ fontSize: "12px" }}>{customer.notrunningloanpending}</td>
                      <td style={{ fontSize: "12px" }}>{customer.notrunningcountdates}</td>
                      <td style={{ fontSize: "12px" }}>{customer.notrunningloanpendingdates}</td>
                      <td style={{ fontSize: "12px" }}>{customer.notrunningcountcurrent}</td>
                      <td style={{ fontSize: "12px" }}>{customer.notrunningloanpendingcurrent}</td>
                      <td style={{ fontSize: "12px" }}>{customer.runningcountdates}</td>
                      <td style={{ fontSize: "12px" }}>{customer.runningloanpendingdates}</td>
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
              {reportypeval == 0 ? <td></td> : null}
              {reportypeval == 0 ? <td style={{ fontSize: "12px" }} className='fw-bold'>{t('total')}</td> : null}
              {reportypeval == 1 ? <td style={{ fontSize: "12px" }} >{t('total')}</td> : null}
              <td style={{ fontSize: "12px" }} className='fw-bold'>{countbefore}</td>
              <td style={{ fontSize: "12px" }} className='fw-bold'>{totalbefore}</td>
              <td style={{ fontSize: "12px" }} className='fw-bold'>{pendingbefore}</td>
              <td style={{ fontSize: "12px" }} className='fw-bold'>{totalnew}</td>
              <td style={{ fontSize: "12px" }} className='fw-bold'>{collectiontotal}</td>
              <td style={{ fontSize: "12px" }} className='fw-bold'>{(avg / serialno).toFixed(2)}</td>
              <td style={{ fontSize: "12px" }} className='fw-bold'>{countcurrent}</td>
              <td style={{ fontSize: "12px" }} className='fw-bold'>{totalcurrent}</td>
              <td style={{ fontSize: "12px" }} className='fw-bold'>{pendingcurrent}</td>
              <td style={{ fontSize: "12px" }} className='fw-bold'>{pendingmore}</td>
              <td style={{ fontSize: "12px" }} className='fw-bold'>{pendingless}</td>
              <td style={{ fontSize: "12px" }} className='fw-bold'>{notrunningcount}</td>
              <td style={{ fontSize: "12px" }} className='fw-bold'>{notrunningpending}</td>
              <td style={{ fontSize: "12px" }} className='fw-bold'>{notrunningcountdates}</td>
              <td style={{ fontSize: "12px" }} className='fw-bold'>{notrunningpendingdates}</td>
              <td style={{ fontSize: "12px" }} className='fw-bold'>{notrunningcountcurrent}</td>
              <td style={{ fontSize: "12px" }} className='fw-bold'>{notrunningloanpendingcurrent}</td>
              <td style={{ fontSize: "12px" }} className='fw-bold'>{runningcountdates}</td>
              <td style={{ fontSize: "12px" }} className='fw-bold'>{runningpendingdates}</td>
              <td></td>
            </tr>
          </tbody>

        </Table>
        :
        <div className="col-md-12">
          <Table className='table text-center table-bordered border-dark' >
            <thead>
              <tr>
                <th></th>
                <th style={{ fontSize: "12px" }}>{t('booknoshort')}</th>
                <th style={{ fontSize: "12px" }} >
                  {t('city')}
                </th>
                <th style={{ fontSize: "12px" }}>
                  {t('beforeloancount')}
                </th>
                <th style={{ fontSize: "12px" }}>
                  {t('beforetotalamount')}
                </th>
                <th style={{ fontSize: "12px" }}>{t('beforependingamount')}</th>
                <th style={{ fontSize: "12px" }}>
                  {t('newdebtcount')}
                </th>
                <th style={{ fontSize: "12px" }} >
                  {t('newdebt')}
                </th>
                <th style={{ fontSize: "12px" }}>
                  {t('totalloancount')}
                </th>
                <th style={{ fontSize: "12px" }}>{t('totaltotalamount')}</th>
                <th style={{ fontSize: "12px" }}>{t('countfinished')}</th>
                <th style={{ fontSize: "12px" }}>{t('collection')}</th>
                <th style={{ fontSize: "12px" }}>{t('currentloancount')}</th>
                <th style={{ fontSize: "12px" }}>{t('currenttotalamount')}</th>
                <th style={{ fontSize: "12px" }}>{t('currentpendingamount')}</th>
                <th style={{ fontSize: "12px" }}>{t('pendingmore')}</th>
                <th style={{ fontSize: "12px" }}>{t('pendingless')}</th>
                <th style={{ fontSize: "12px" }}>{t('notrunningcount')}</th>
                <th style={{ fontSize: "12px" }}>{t('notrunningpending')}</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                records && records.length > 0
                  ?
                  (records.map((customer, i) => {
                    serialno = serialno + 1;
                    countbefore = countbefore + (Number(customer.countbefore));
                    countcurrent = countcurrent + customer.currentcountcal;
                    totalbefore = totalbefore + customer.totalamountbefore;
                    totalcurrent = totalcurrent + customer.currentamountcal;
                    collectiontotal = collectiontotal + customer.collectedbetween;
                    totalcount = totalcount + customer.totalcountcal;
                    countfinishedtotal = countfinishedtotal + customer.countfinished;
                    totalcounttotal = totalcounttotal + customer.totalamountcal;
                    countnew = countnew + customer.countbetween;
                    totalnew = totalnew + customer.totalamountbetween;
                    pendingbefore = pendingbefore + customer.pendingbefore;
                    pendingcurrent = pendingcurrent + customer.pendingafter;
                    pendingless = pendingless + customer.collectedless;
                    pendingmore = pendingmore + customer.collectedmore;
                    notrunningcount = notrunningcount + customer.notrunningloancount;
                    notrunningpending = notrunningpending + customer.notrunningloanpending;
                    return (
                      <tr >
                        <td></td>
                        <td>{customer.bookno}</td>
                        <td style={{ fontSize: "12px" }}>{customer.cityname}</td>
                        <td style={{ fontSize: "12px" }}>{(Number(customer.countbefore))}</td>
                        <td style={{ fontSize: "12px" }}>{customer.totalamountbefore}</td>
                        <td style={{ fontSize: "12px" }}>{customer.pendingbefore}</td>
                        <td style={{ fontSize: "12px" }}>{customer.countbetween}</td>
                        <td style={{ fontSize: "12px" }}>{customer.totalamountbetween}</td>
                        <td style={{ fontSize: "12px" }}>{customer.totalcountcal}</td>
                        <td style={{ fontSize: "12px" }}>{customer.totalamountcal}</td>
                        <td style={{ fontSize: "12px" }}>{customer.countfinished}</td>
                        <td style={{ fontSize: "12px" }}>{customer.collectedbetween}</td>
                        <td style={{ fontSize: "12px" }}>{customer.currentcountcal}</td>
                        <td style={{ fontSize: "12px" }}>{customer.currentamountcal}</td>
                        <td style={{ fontSize: "12px" }}>{customer.pendingafter}</td>
                        <td style={{ fontSize: "12px" }}>{customer.collectedmore}</td>
                        <td style={{ fontSize: "12px" }}>{customer.collectedless}</td>
                        <td style={{ fontSize: "12px" }}>{customer.notrunningloancount}</td>
                        <td style={{ fontSize: "12px" }}>{customer.notrunningloanpending}</td>
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
                <td style={{ fontSize: "12px" }} className='fw-bold'>{t('total')}</td>
                <td style={{ fontSize: "12px" }} className='fw-bold'>{countbefore}</td>
                <td style={{ fontSize: "12px" }} className='fw-bold'>{totalbefore}</td>
                <td style={{ fontSize: "12px" }} className='fw-bold'>{pendingbefore}</td>
                <td style={{ fontSize: "12px" }} className='fw-bold'>{countnew}</td>
                <td style={{ fontSize: "12px" }} className='fw-bold'>{totalnew}</td>
                <td style={{ fontSize: "12px" }} className='fw-bold'>{totalcount}</td>
                <td style={{ fontSize: "12px" }} className='fw-bold'>{totalcounttotal}</td>
                <td style={{ fontSize: "12px" }} className='fw-bold'>{countfinishedtotal}</td>
                <td style={{ fontSize: "12px" }} className='fw-bold'>{collectiontotal}</td>
                <td style={{ fontSize: "12px" }} className='fw-bold'>{countcurrent}</td>
                <td style={{ fontSize: "12px" }} className='fw-bold'>{totalcurrent}</td>
                <td style={{ fontSize: "12px" }} className='fw-bold'>{pendingcurrent}</td>
                <td style={{ fontSize: "12px" }} className='fw-bold'>{pendingmore}</td>
                <td style={{ fontSize: "12px" }} className='fw-bold'>{pendingless}</td>
                <td style={{ fontSize: "12px" }} className='fw-bold'>{notrunningcount}</td>
                <td style={{ fontSize: "12px" }} className='fw-bold'>{notrunningpending}</td>
                <td></td>
              </tr>
            </tbody>

          </Table>
        </div>
      }
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
    </Fragment >
  )
}
export default ListTotalLedger;
