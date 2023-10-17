import React, { Fragment,useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Pagination } from "react-bootstrap";
import {BiEditAlt} from "react-icons/bi"
import {BsTrash} from "react-icons/bs"
import axios from 'axios'
import {baseURL} from "../utils/constant";
import { useTranslation } from "react-i18next";
import {dateFormatdd} from "../FunctionsGlobal/StartDateFn"


  
const ListLineChecking=({pendingLoans})=>{
  const { t, i18n } = useTranslation();
const[currentPage,setCurrentPage]=useState(1);
const recordsPerPage=20;
const lastIndex=currentPage*recordsPerPage;
const firstIndex=lastIndex-recordsPerPage;
const records=pendingLoans.slice(firstIndex,lastIndex);
const nPage=Math.ceil(Object.keys(pendingLoans).length/recordsPerPage);
const numbers=[...Array(nPage+1).keys()].slice(1);
var serialno=0;
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
        <h2>Company Name</h2>
      </div>
        <div className='col-md-6'><h3>Line Checking</h3></div>
      <div className='col-md-3'>Ventrilingapuram</div>
      <div className='col-md-3'>Murugan</div>
      <div className='col-md-2'>Line 5</div>
      <div className='col-md-2'>BookNo:1221</div>
      <div className='col-md-2'>12/03/2023</div>
      <div >
        <Table striped bordered hover   >
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
                return(
                  <tr>
                    <td>{serialno}</td>
                    <td>{dateFormatdd(customer['_id'].startdate)}</td>
                    <td>{customer.loannumber}</td>
                    <td>{customer['_id'].customer}</td>
                    <td>{customer.relationtype==0 ? "F" : "H"}</td>
                    <td >{customer['_id'].fathername}</td>
                    <td>{customer['_id'].address}</td>
                    <td>{customer['_id'].mobileno}</td>
                    <td>{dateFormatdd(customer['_id'].finisheddate)}</td>
                    <td>{customer.totalamount}</td>
                    <td>{customer.collected}</td>
                    <td>{customer.pending}</td>
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
