import React, { Fragment,useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Pagination } from "react-bootstrap";
import {BiEditAlt} from "react-icons/bi"
import {BsTrash} from "react-icons/bs"
import axios from 'axios'
import {baseURL} from "../utils/constant";
import { useTranslation } from "react-i18next";

const myStyle = {
  columncount :"2",
  columngap :"25px"
};
/*const List = ({id,customer,customermobile,setUpdateUI,updateMode}) => {*/
  
const List=({customers,setUpdateUI,updateMode})=>{
  const { t, i18n } = useTranslation();
const[currentPage,setCurrentPage]=useState(1);
const recordsPerPage=5;
const lastIndex=currentPage*recordsPerPage;
const firstIndex=lastIndex-recordsPerPage;
const records=customers.slice(firstIndex,lastIndex);
const nPage=Math.ceil(Object.keys(customers).length/recordsPerPage);
const numbers=[...Array(nPage+1).keys()].slice(1);
var serialno=0;
serialno=(currentPage-1) * recordsPerPage;
 /* const removeCustomer=(id)=>{
    axios.delete(`${baseURL}/delete/${id}`).then((res)=>{
      console.log(res.data);
      setUpdateUI((preveState)=>!preveState)
    })
  }*/
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
                {t('customer')}
              </th>
              <th>
                {t('phoneno')}
              </th>
              <th>
                {t('city')}
              </th>
              <th colSpan={2}>
                {t('customertablefathername')}
              </th>
              <th>
                {t('address')}
              </th>
              <th>
                {t('work')}
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
                  <tr key={customer.customer}>
                    <td>{serialno}</td>
                    <td>{customer.customer}</td>
                    <td>{customer.mobileno}</td>
                    <td>{customer.cityname}</td>
                    <td>{customer.relationtype==0 ? t('fathershort') :t('husbandshort')}</td>
                    <td >{customer.fathername}</td>
                    <td>{customer.address}</td>
                    <td>{customer.work}</td>
                    <td>
                    <BiEditAlt  className='icons' onClick={()=>updateMode(customer._id,customer.customer,customer.mobileno,customer.city_id,customer.fathername,customer.address,customer.work,customer.relationtype)} />
                    {/*<BsTrash className='icons' onClick={()=>removeCustomer(customer._id)}  />*/}
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
        
          <Pagination>
            <Pagination.Prev onClick={prevPage}>
            {t('pageprev')}
            </Pagination.Prev>
            {
            numbers.map((n,i)=>(
              <Pagination.Item onClick={()=>changeCPage(n)}>
              {n}
              </Pagination.Item>
            ))
          }
            <Pagination.Next onClick={nextPage}>
            {t('pagenext')}
            </Pagination.Next>
          </Pagination>
        

      </div>
    </Fragment>
  )
}
export default List
