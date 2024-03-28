import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination } from "react-bootstrap";
import { BiEditAlt } from "react-icons/bi"
import { useTranslation } from "react-i18next";
const ListLineMan = ({ linemannames, updateMode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { t, i18n } = useTranslation();
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = linemannames.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(Object.keys(linemannames).length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);
  var serialno = 0;

  serialno = (currentPage - 1) * recordsPerPage;
  /*const removeLineMan=(id)=>{
      axios.delete(`${baseURL}/linemancreate/delete/${id}`).then((res)=>{
          setUpdateUI((preveState)=>!preveState)
        })
  }*/
  function prevPage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1)
    }

  }
  function nextPage() {
    if (currentPage !== lastIndex) {
      serialno = lastIndex;
      setCurrentPage(currentPage + 1);
    }

  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  return (
    <Fragment>
      <div style={{ margin: "5rem" }} className="m-sm-0">
        <Table striped bordered hover size="sm" className="table-sm-responsive"  >
          <thead>
            <tr>
              <th>
                {t('no')}
              </th>
              <th>
                {t('lineman')}
              </th>
              <th>
                {t('phoneno')}
              </th>
              <th>
                {t('tableaction')}
              </th>
            </tr>
          </thead>
          <tbody>
            {
              records && records.length > 0
                ?
                (records.map((linemanname) => {
                  serialno = serialno + 1;
                  return (
                    <tr>
                      <td>{serialno}</td>
                      <td>{linemanname.linemanname}</td>
                      <td>{linemanname.mobileno}</td>
                      <td name="edit">
                        <BiEditAlt data-cypress-loan-app-edit={"edit" + linemanname.linemanname} className='icons' onClick={() => updateMode(linemanname._id, linemanname.linemanname, linemanname.mobileno)} />
                        {/*<BsTrash className='icons' onClick={()=>removeLineMan(linemanname._id)} />*/}
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
    </Fragment>
  )

}
export default ListLineMan;
