import React, { Fragment,useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {dateFormatdd} from "../FunctionsGlobal/StartDateFn"

var first = [];
const ListLineChecking=({pendingLoans,date})=>{
  const { t, i18n } = useTranslation();
const[currentPage,setCurrentPage]=useState(1);
const recordsPerPage=20;
const lastIndex=currentPage*recordsPerPage;
const firstIndex=lastIndex-recordsPerPage;
const records=pendingLoans.slice(firstIndex,lastIndex);
const nPage=Math.ceil(Object.keys(pendingLoans).length/recordsPerPage);
const numbers=[...Array(nPage+1).keys()].slice(1);
var serialno=0;
first = records.length > 0 ? pendingLoans[0] : "";
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
      <div className='col-md-6'>
        <h2></h2>
      </div>
        <div className='col-md-6'><h3>{t('linechecking')}</h3></div>
      <div className='col-md-3'>{first.city}</div>
      <div className='col-md-3'>{first.linemanname}</div>
      <div className='col-md-2'>{t('line')+":"+(pendingLoans.length>0?first.lineno:"")}</div>
      <div className='col-md-2'>{t("bookno")+":"+(pendingLoans.length>0?first.bookno:"")}</div>
      <div className='col-md-2'>{dateFormatdd(date)}</div>
      <div >
        <Table  className='table text-center fs-6 table-bordered border-dark'  >
          <thead>
            <tr>
            <th>
                {t('no')}
            </th>
            <th>
            {t('startdate')}
            </th>
                <th>
                    {t('loanno')}
                </th>
              <th>
                {t('customer')}
              </th>
              <th colSpan={2}>
                {t('fathername')}
              </th>
              <th>
                {t('address')}
              </th>
              <th>
                {t('phoneno')}
              </th>
              <th>
                {t('enddate')}
              </th>
              <th>
                {t('loanamount')}
              </th>
              <th>
                {t('paidamount')}
              </th>
              <th>
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
                //console.log("enddatediff"+customer['addFields'].daysCountloan);
                //console.log("weekdiff"+customer['addFields'].daysCount);
                return(
                  <tr>
                    <td>{serialno}</td>
                    <td>{dateFormatdd(customer.startdate)}</td>
                    <td>{customer.loannumber}</td>
                    <td>{customer.customer}</td>
                    <td>{customer.relationtype==0 ? "F" : "H"}</td>
                    <td >{customer.fathername}</td>
                    <td>{customer.address}</td>
                    <td>{customer.mobileno}</td>
                    <td>{dateFormatdd(customer.finisheddate)}</td>
                    <td>{customer.totalamount-customer.collectedtotal}</td>
                    <td>{customer.collectedamountdate}</td>
                    {
                      customer['addFields'].daysCountloan>0
                      ?
                      <td style={{backgroundColor:"red"}}>{customer.totalamount-customer.collectedtotal}</td>
                      :
                      customer['addFields'].daysCount>2 && customer.collectedamountdate===0
                      ?
                      <td style={{backgroundColor:"black",color:"white"}}>{(customer['addFields'].daysCount * customer.dueamount)-(customer.collectedamountdate)}</td>
                      :
                      <td >{(customer['addFields'].daysCount * customer.dueamount)-(customer.collectedamountdate)}</td>
                    }
                      
                    
                    
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
