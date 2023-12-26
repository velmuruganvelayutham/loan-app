import React, { Fragment,useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {dateFormatddmmyyyy} from "../FunctionsGlobal/StartDateFn"

var first = [];
const ListTotalLedger=({totalledger,datefrom,dateto,notrunningdate})=>{
  const { t, i18n } = useTranslation();
const[currentPage,setCurrentPage]=useState(1);
const recordsPerPage=20;
const lastIndex=currentPage*recordsPerPage;
const firstIndex=lastIndex-recordsPerPage;
const records=totalledger.slice(firstIndex,lastIndex);
const nPage=Math.ceil(Object.keys(totalledger).length/recordsPerPage);
const numbers=[...Array(nPage+1).keys()].slice(1);
var serialno=0;
var countbefore=0;
var totalbefore=0;
var pendingbefore=0;
var countcurrent=0;
var totalcurrent=0;
var pendingcurrent=0;
var collectiontotal=0;
var calavg=0;
var avg=0;
var pendingless=0;
var pendingmore=0;
var notrunningcount=0;
var notrunningpending=0;
var notrunningcountdates=0;
var notrunningpendingdates=0;
var runningcountdates=0;
var runningpendingdates=0;
var totalcount=0;
var countfinishedtotal=0;
var totalcounttotal=0;
first = records.length > 0 ? totalledger[0] : "";
serialno=(currentPage-1) * recordsPerPage;
  
  function prevPage(){
    if(currentPage!==firstIndex)
    {
      setCurrentPage(currentPage-1)
    }
    
  }
  function nextPage(){
    if(currentPage!==lastIndex){
      setCurrentPage(currentPage+1);
    }

  }
  function changeCPage(id){
    setCurrentPage(id)
  }
  return (
    <Fragment>
      <div className='col-md-12 fw-bold'>{dateFormatddmmyyyy(datefrom)}&nbsp;&nbsp;&nbsp;-&nbsp;{dateFormatddmmyyyy(dateto)}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t('totalledgername')}</div>
      <div >
        <Table  className='table text-center fs-6 table-bordered border-dark w-auto' >
          <thead>
            <tr>
            <th  style={{fontSize:"12px"}}>{t('line')}</th>
            <th style={{fontSize:"12px"}}  >
            {t('customer')}
            </th>

            <th  colSpan={3} style={{fontSize:"12px"}}>
              <div style={{fontSize:"12px"}}>{t('beforedebt')}</div>
              <div style={{fontSize:"12px"}}>{dateFormatddmmyyyy(datefrom)}</div>
            </th>
            <th  colSpan={5} style={{fontSize:"12px"}}>
              <div style={{fontSize:"12px"}}>{t('currentdebt')}</div>
              <div style={{fontSize:"12px"}}>{dateFormatddmmyyyy(dateto)}</div>
            </th>
            <th  colSpan={2} style={{fontSize:"12px"}}>
                {t('averagecollection')}
            </th>
            <th  colSpan={2} style={{fontSize:"12px"}} >
                {t('pending')}
            </th>
            <th  colSpan={2} style={{fontSize:"12px"}}>
              <div style={{fontSize:"12px"}}>{t('notrunning')}</div>
              <div style={{fontSize:"12px"}}>{dateFormatddmmyyyy(notrunningdate)}</div>
                
            </th>
            <th  colSpan={2} style={{fontSize:"12px"}}>{t('notrunning')}</th>
            <th  colSpan={2} style={{fontSize:"12px"}}>{t('running')}</th>
            </tr>
          </thead>
          <thead>
            <tr>
                <th></th>
                <th></th>
                <th style={{fontSize:"12px"}}>{t('beforeloancount')}</th>
                <th style={{fontSize:"12px"}}>{t('beforetotalamount')}</th>
                <th style={{fontSize:"12px"}}>{t('beforependingamount')}</th>
                <th style={{fontSize:"12px"}}>{t('currenttotalamount')}</th>
                <th style={{fontSize:"12px"}}>{t('currentpendingamount')}</th>
                <th style={{fontSize:"12px"}}>{t('currentloancount')}</th>
                <th style={{fontSize:"12px"}}>{t('countfinished')}</th>
                <th style={{fontSize:"12px"}}>{t('totalcount')}</th>
                <th style={{fontSize:"12px"}}>{t('collection')}</th>
                <th style={{fontSize:"12px"}}>{t('average')}</th>
                <th style={{fontSize:"12px"}}>{t('more')}</th>
                <th style={{fontSize:"12px"}}>{t('less')}</th>
                <th style={{fontSize:"12px"}}>{t('notrunningcount')}</th>
                <th style={{fontSize:"12px"}}>{t('notrunningpending')}</th>
                <th style={{fontSize:"12px"}}>{t('more')}</th>
                <th style={{fontSize:"12px"}}></th>
                <th style={{fontSize:"12px"}}>{t('less')}</th>
                <th></th>
            </tr>
          </thead>
          <tbody>
            {
              records && records.length>0
              ?
              (records.map((customer,i)=>{
                serialno=serialno+1;
                countbefore=countbefore+customer.countbefore;
                countcurrent=countcurrent+customer.countafter;
                totalbefore=totalbefore+customer.totalamountbefore;
                totalcurrent=totalcurrent+customer.totalafter;
                pendingbefore=pendingbefore+customer.pendingbefore;
                pendingcurrent=pendingcurrent+customer.pendingafter;
                collectiontotal=collectiontotal+customer.collectedbetween;
                calavg=((customer.collectedbetween/customer.totalafter)*100).toFixed(2);
                avg=avg+Number(calavg);
                pendingless=pendingless+customer.collectedless;
                pendingmore=pendingmore+customer.collectedmore;
                notrunningcount=notrunningcount+customer.notrunningloancount;
                notrunningpending=notrunningpending+customer.notrunningloanpending;
                notrunningcountdates=notrunningcountdates+customer.notrunningcountdates;
                notrunningpendingdates=notrunningpendingdates+customer.notrunningloanpendingdates;
                runningcountdates=runningcountdates+customer.runningcountdates;
                runningpendingdates=runningpendingdates+customer.runningloanpendingdates;
                totalcount=totalcount+customer.countafter+customer.countfinished;
                countfinishedtotal=countfinishedtotal+customer.countfinished;
                totalcounttotal=totalcounttotal+totalcount;
                return(
                  <tr >
                    <td style={{fontSize:"12px"}}>{customer.linename}</td>
                    <td style={{fontSize:"12px"}}>{customer.linemanname}</td>
                    
                    <td style={{fontSize:"12px"}}>{customer.countbefore}</td>
                    <td style={{fontSize:"12px"}}>{customer.totalamountbefore}</td> 
                    <td style={{fontSize:"12px"}}>{customer.pendingbefore}</td>
                    

                    <td style={{fontSize:"12px"}}>{customer.totalafter}</td>
                    <td style={{fontSize:"12px"}}>{customer.pendingafter}</td>
                    <td style={{fontSize:"12px"}}>{customer.countafter}</td>
                    <td style={{fontSize:"12px"}}>{customer.countfinished}</td>
                    <td style={{fontSize:"12px"}}>{totalcount}</td>
                    <td style={{fontSize:"12px"}}>{customer.collectedbetween}</td>
                    <td style={{fontSize:"12px"}}>{((customer.collectedbetween/customer.totalafter)*100).toFixed(2)}</td>
                    <td style={{fontSize:"12px"}}>{customer.collectedmore}</td>
                    <td style={{fontSize:"12px"}}>{customer.collectedless}</td>
                    <td style={{fontSize:"12px"}}>{customer.notrunningloancount}</td>
                    <td style={{fontSize:"12px"}}>{customer.notrunningloanpending}</td>
                    <td style={{fontSize:"12px"}}>{customer.notrunningcountdates}</td>
                    <td style={{fontSize:"12px"}}>{customer.notrunningloanpendingdates}</td>
                    <td style={{fontSize:"12px"}}>{customer.runningcountdates}</td>
                    <td style={{fontSize:"12px"}}>{customer.runningloanpendingdates}</td>
                  </tr>
                  
                )
              })
              )
              :
              t('tabledata')
            }
            <tr>
            <td></td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{t('total')}</td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{countbefore}</td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{totalbefore}</td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{pendingbefore}</td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{totalcurrent}</td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{pendingcurrent}</td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{countcurrent}</td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{countfinishedtotal}</td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{totalcounttotal}</td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{collectiontotal}</td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{(avg/serialno).toFixed(2)}</td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{pendingmore}</td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{pendingless}</td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{notrunningcount}</td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{notrunningpending}</td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{notrunningcountdates}</td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{notrunningpendingdates}</td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{runningcountdates}</td>
            <td style={{fontSize:"12px"}} className='fw-bold'>{runningpendingdates}</td>
          </tr>
          </tbody>
          
        </Table>
        <nav>
        
          <Pagination>
            <Pagination.Prev >
            <a href="#" className='page-link' onClick={prevPage}>{t('pageprev')}</a>
            </Pagination.Prev>
            {
            numbers.map((n,i)=>(
              <Pagination.Item>
                <a href="#" className='page-link'
            onClick={()=>changeCPage(n)}>{n}</a>
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
export default ListTotalLedger;
