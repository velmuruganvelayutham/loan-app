import React, { Fragment,useEffect,useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {dateFormatdd} from "../FunctionsGlobal/StartDateFn"
var first = [];

const ListLineChecking=({pendingLoans,date,company})=>{
  
const { t, i18n } = useTranslation();
const[currentPage,setCurrentPage]=useState(1);
const recordsPerPage=35;
const lastIndex=currentPage*recordsPerPage;
const firstIndex=lastIndex-recordsPerPage;
const records=pendingLoans.slice(firstIndex,lastIndex);
const nPage=Math.ceil(Object.keys(pendingLoans).length/recordsPerPage);
const numbers=[...Array(nPage+1).keys()].slice(1);
var serialno=0;

first = records.length > 0 ? pendingLoans[0] : "";
serialno=(currentPage-1) * recordsPerPage;
var pagetotal=0;
var pendingtotal=0;
var pending=0;
var duepending=0;
var pendingweek=0;
var pendingweektotal=0;

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
      <div className='col-sm-6 fixed'>
        <h3>{(company)}</h3>
      </div>
      <div className='col-sm-6 fixed'><h3>{t('linechecking')}</h3></div>

      <div className='col-sm-3 fixed'>{t('city')+" : "+first.city}</div>
      <div className='col-sm-3 fixed'>{t('customer')+" : "+first.linemanname}</div>
      <div className='col-sm-2 fixed'>{t('line')+" : "+(pendingLoans.length>0?first.lineno:"")}</div>
      <div className='col-sm-2 fixed'>{t("bookno")+" : "+(pendingLoans.length>0?first.bookno:"")}</div>
      <div className='col-sm-2 fixed'>{t("date")+" : "+dateFormatdd(date)}</div>
      <div >
        <Table  className='table text-center fs-6 table-bordered border-dark'  >
          <thead>
            <tr>
            <th style={{fontSize:"12px"}}>
                {t('no')}
            </th>
            <th style={{fontSize:"12px"}}>
            {t('startdate')}
            </th >
                <th style={{fontSize:"12px"}}>
                    {t('loanno')}
                </th>
              <th style={{fontSize:"12px"}}>
                {t('customer')}
              </th>

              <th colSpan={2} style={{fontSize:"12px"}}>
                {t('fathername')}
              </th>
              <th style={{fontSize:"12px"}}>
                {t('address')}
              </th>
              <th style={{fontSize:"12px"}}>
                {t('phoneno')}
              </th>
              <th style={{fontSize:"12px"}}>
                {t('enddate')}
              </th>
              <th style={{fontSize:"12px"}}>
                {t('loanamount')}
              </th>
              <th style={{fontSize:"12px"}}>
                {t('pay')}
              </th>
              <th style={{fontSize:"12px"}}>
                {t('pending')}
              </th>
            </tr>
          </thead>
          <tbody>
            {
              records && records.length>0
              ?
              (records.map((customer,i)=>{
                serialno=serialno+1;
                pending=customer.totalamount-customer.collectedtotal;
                pagetotal=pagetotal+pending;
                
                console.log(pending+"muru");
                if(customer.collectedamountdate>0){
                  duepending=0
                }
                else{
                  duepending=customer.dueamount
                }
                pendingtotal=pendingtotal+duepending;
                if(customer['addFields'].receiptpendingweek>0 && customer['addFields'].receiptpendingweek<8){
                  pendingweek=(customer['addFields'].receiptpendingweek * customer.dueamount);
                }
                else if(customer['addFields'].receiptpendingweek>=8)
                {
                  pendingweek=customer.totalamount-customer.collectedtotal;
                }
                else {
                  pendingweek=0;
                }
                pendingweektotal=pendingweektotal+pendingweek;
                //console.log("enddatediff"+customer['addFields'].daysCountloan);
                //console.log("weekdiff"+customer['addFields'].daysCount);
                return(
                  <tr>
                    <td style={{fontSize:"12px"}}>{serialno}</td>
                    <td style={{fontSize:"12px"}}>{dateFormatdd(customer.startdate)}</td>
                    <td style={{fontSize:"12px"}}>{customer.loannumber}</td>
                    <td style={{fontSize:"12px"}}>{customer.customer}</td>
                    <td style={{fontSize:"12px"}}>{customer.relationtype==0 ? t('fathershort') : t('husbandshort')}</td>
                    <td style={{fontSize:"12px"}}>{customer.fathername}</td>
                    <td style={{fontSize:"12px"}}>{customer.address}</td>
                    <td style={{fontSize:"12px"}}>{customer.mobileno}</td>
                    <td style={{fontSize:"12px"}}>{dateFormatdd(customer.finisheddate)}</td>
                    <td style={{fontSize:"12px"}}>{pending}</td>
                    <td style={{fontSize:"12px"}}>{duepending}</td>
                    {
                      customer['addFields'].receiptpendingweek>2
                      ?
                      <td style={{backgroundColor:"black",color:"white",fontSize:"12px"}}>{pendingweek}</td> 
                      :
                      customer['addFields'].receiptpendingweek<=2 && customer['addFields'].receiptpendingweek>0
                      ?
                      <td style={{fontSize:"12px"}}>{pendingweek}</td>
                      :
                      <td style={{fontSize:"12px"}}></td>
                  }               
                    
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
            <td></td>
            <td className='fw-bold' style={{fontSize:"12px"}}>{t('total')}</td>
            <td className='fw-bold' style={{fontSize:"12px"}}>{pagetotal}</td>
            <td className='fw-bold' style={{fontSize:"12px"}}>{pendingtotal}</td>
            <td className='fw-bold' style={{fontSize:"12px"}}>{pendingweektotal}</td>
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
export default ListLineChecking
