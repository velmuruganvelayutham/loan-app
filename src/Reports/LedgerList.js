import React, { Fragment,useState,useRef } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Pagination } from "react-bootstrap";
import {BiPrinter} from "react-icons/bi"
import { useTranslation } from "react-i18next";
import { dateFormatdd } from '../FunctionsGlobal/StartDateFn';
import ReactToPrint from 'react-to-print';
import {Ledger} from './Ledger';
/*const List = ({id,customer,customermobile,setUpdateUI,updateMode}) => {*/
  
const LedgerList=({loanDetails,updateMode})=>{
  const { t, i18n } = useTranslation();
const[currentPage,setCurrentPage]=useState(1);

const componentRef=useRef();
const handlePrint=()=>{
    //window.print()
}
const recordsPerPage=5;
const lastIndex=currentPage*recordsPerPage;
const firstIndex=lastIndex-recordsPerPage;
const records=loanDetails.slice(firstIndex,lastIndex);
const nPage=Math.ceil(Object.keys(loanDetails).length/recordsPerPage);
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
      <div style={{margin:"5rem"}}>
        <Table striped bordered hover   >
          <thead>
            <tr>
              <th>
                {t('no')}
              </th>
              <th>
                {t('loanno')}
              </th>
              <th>
                {t('customer')}
              </th>
              <th>
                {t('phoneno')}
              </th>
              <th >
                {t('city')}
              </th>
              <th>
                {t('loanamount')}
              </th>
              <th>
                {t('startdate')}
              </th>
              <th>
                {t('startdate')}
              </th>
              <th>
                {t('tableaction')}
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
                    <td>{customer.loannumber}</td>
                    <td>{customer.customer}</td>
                    <td>{customer.mobileno}</td>
                    <td>{customer.city}</td>
                    <td >{customer.totalamount}</td>
                    <td>{dateFormatdd(customer.startdate)}</td>
                    <td>{dateFormatdd(customer.finisheddate)}</td>
                    <td>
                    <ReactToPrint trigger={()=>(
                    <BiPrinter  className='icons' onClick={()=>handlePrint} />
                    )}
                    content={()=>componentRef.current} />
                    <div ref={componentRef}><Ledger loanno={customer.loannumber} /></div>
                        
                    
                    </td>
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
export default LedgerList
