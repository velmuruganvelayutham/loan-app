import React, { Fragment, useState, useMemo } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"

// Rows (city heading + account + subtotal rows) shown on one A4 landscape page.
const ROWS_PER_PAGE = 22;

const ListBookFifteen = ({ pendingLoans, datefrom, dateto, company, isPrinting, linename }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  // Group the accounts by display city. Each item is one printed table row.
  const { items, grandLoan, grandPaid, grandUnpaid, linemanname } = useMemo(() => {
    const groups = new Map();
    pendingLoans.forEach((loan) => {
      const cityname = loan.city || "";
      if (!groups.has(cityname)) groups.set(cityname, []);
      groups.get(cityname).push(loan);
    });
    // Loans without an old book number sort last.
    const oldBook = (loan) => (loan.oldbookno === undefined || loan.oldbookno === null || loan.oldbookno === "")
      ? Number.MAX_SAFE_INTEGER : Number(loan.oldbookno);
    groups.forEach((loans) => {
      loans.sort((a, b) => (oldBook(a) - oldBook(b)) || (Number(a.loannumber) - Number(b.loannumber)));
    });
    // City groups are ordered by the smallest old book number inside each city.
    const cityOrder = (cityname) => Math.min(...groups.get(cityname).map(oldBook));
    const sortedCities = Array.from(groups.keys()).sort((a, b) => (cityOrder(a) - cityOrder(b)) || a.localeCompare(b));

    const list = [];
    let loanSum = 0, paidSum = 0, unpaidSum = 0;
    sortedCities.forEach((cityname) => {
      const loans = groups.get(cityname);
      let cityLoan = 0, cityPaid = 0, cityUnpaid = 0;
      list.push({ type: "city", cityname });
      loans.forEach((loan, index) => {
        const paid = Number(loan.collectedtotal) || 0;
        const total = Number(loan.totalamount) || 0;
        const unpaid = total - paid;
        cityLoan += total;
        cityPaid += paid;
        cityUnpaid += unpaid;
        list.push({ type: "loan", loan, paid, total, unpaid, cityname, serial: index + 1 });
      });
      list.push({ type: "subtotal", cityname, loan: cityLoan, paid: cityPaid, unpaid: cityUnpaid });
      loanSum += cityLoan;
      paidSum += cityPaid;
      unpaidSum += cityUnpaid;
    });
    return {
      items: list,
      grandLoan: loanSum,
      grandPaid: paidSum,
      grandUnpaid: unpaidSum,
      linemanname: pendingLoans.length > 0 ? pendingLoans[0].linemanname : ""
    };
  }, [pendingLoans]);

  // Split the rows into pages. A city that continues on a new page gets its heading repeated.
  const pages = useMemo(() => {
    const result = [];
    for (let i = 0; i < items.length; i += ROWS_PER_PAGE) {
      const slice = items.slice(i, i + ROWS_PER_PAGE);
      if (slice[0].type !== "city") {
        const previous = items.slice(0, i).reverse().find((x) => x.type === "city");
        if (previous && slice[0].type === "loan") {
          slice.unshift(previous);
        }
      }
      result.push(slice);
    }
    return result;
  }, [items]);

  const totalPages = pages.length;

  const renderPage = (page) => {
    const pageItems = pages[page - 1] || [];
    const isLastPage = page === totalPages;

    return (
      <Fragment key={page}>
        <div style={{ display: "flex", alignItems: "center", paddingTop: page === 1 ? "0px" : "19px", marginBottom: "3px" }} className='linechecking-print-margin'>
          <div className='col-sm-6 fixed'>
            <h4>{company}</h4>
          </div>
          <div className='col-sm-6 fixed'><h4>{t('book15report')}</h4></div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }} className='col-sm-12 fixed linechecking-print-margin'>
          <div className='col-sm-3 fixed'>{t('customer') + " : " + (linemanname || "")}</div>
          <div className='col-sm-2 fixed'>{t('line') + " : " + (linename || "")}</div>
          <div className='col-sm-2 fixed'>{t('bookno') + " : 15"}</div>
          <div className='col-sm-3 fixed'>{t('date') + " : " + (datefrom ? dateFormatdd(datefrom) : "") + " - " + (dateto ? dateFormatdd(dateto) : "")}</div>
        </div>

        <Table className='table table-bordered border-dark linecheckingtable' style={{ margin: 0, padding: 0, width: "100%" }}>
          <thead>
            <tr>
              <th style={{ fontSize: "11px", width: "3%" }}>{t('noshort')}</th>
              <th style={{ fontSize: "11px", width: "6%" }}>{t('startdate')}</th>
              <th style={{ fontSize: "11px", width: "5%" }}>{t('loannotooshort')}</th>
              <th style={{ fontSize: "11px", width: "13%" }}>{t('customer')}</th>
              <th style={{ fontSize: "11px", width: "3%" }}></th>
              <th style={{ fontSize: "11px", width: "11%" }}>{t('fathername')}</th>
              <th style={{ fontSize: "11px", width: "11%" }}>{t('address')}</th>
              <th style={{ fontSize: "11px", width: "9%" }}>{t('phoneno')}</th>
              <th style={{ fontSize: "11px", width: "6%" }}>{t('enddate')}</th>
              <th style={{ fontSize: "11px", width: "8%", textAlign: "center" }}>{t('loanamount')}</th>
              <th style={{ fontSize: "11px", width: "8%", textAlign: "center" }}>{t('paidlabel')}</th>
              <th style={{ fontSize: "11px", width: "8%", textAlign: "center" }}>{t('unpaidlabel')}</th>
              <th style={{ fontSize: "11px", width: "9%", textAlign: "center" }}>{t('signature')}</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.length > 0 ? pageItems.map((item, i) => {
              if (item.type === "city") {
                return (
                  <tr className='linechecking' key={"c" + i}>
                    <td colSpan={13} className='fw-bold' style={{ fontSize: "12px" }}>{t('city') + " : " + item.cityname}</td>
                  </tr>
                );
              }
              if (item.type === "subtotal") {
                return (
                  <tr className='linechecking' key={"s" + i}>
                    <td colSpan={9} className='fw-bold' style={{ fontSize: "11px", textAlign: "right" }}>{item.cityname + " " + t('totalcount')}</td>
                    <td className='fw-bold' style={{ fontSize: "11px", textAlign: "center" }}>{item.loan}</td>
                    <td className='fw-bold' style={{ fontSize: "11px", textAlign: "center" }}>{item.paid}</td>
                    <td className='fw-bold' style={{ fontSize: "11px", textAlign: "center" }}>{item.unpaid}</td>
                    <td></td>
                  </tr>
                );
              }
              const customer = item.loan;
              return (
                <tr className='linechecking' key={"l" + customer.loannumber}>
                  <td style={{ fontSize: "11px", textAlign: "center" }} className='text-nowrap overflow-hidden'>{item.serial}</td>
                  <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{dateFormatdd(customer.startdate)}</td>
                  <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{customer.loannumber}</td>
                  <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{customer.customer}</td>
                  <td style={{ fontSize: "11px" }}>{customer.relationtype == 0 ? t('fathershort') : t('husbandshort')}</td>
                  <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{customer.fathername}</td>
                  <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{customer.address}</td>
                  <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{customer.mobileno}</td>
                  <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{dateFormatdd(customer.finisheddate)}</td>
                  <td style={{ fontSize: "11px", textAlign: "center" }}>{item.total}</td>
                  <td style={{ fontSize: "11px", textAlign: "center" }}>{item.paid}</td>
                  <td style={{ fontSize: "11px", textAlign: "center" }}>{item.unpaid}</td>
                  <td style={{ height: "28px" }}></td>
                </tr>
              );
            }) : (
              <tr><td colSpan={13}>{t('tabledata')}</td></tr>
            )}
            {isLastPage && items.length > 0 ? (
              <tr className='linechecking'>
                <td colSpan={9} className='fw-bold' style={{ fontSize: "13px", textAlign: "right" }}>{t('totalcount')}</td>
                <td className='fw-bold' style={{ fontSize: "13px", textAlign: "center" }}>{grandLoan}</td>
                <td className='fw-bold' style={{ fontSize: "13px", textAlign: "center" }}>{grandPaid}</td>
                <td className='fw-bold' style={{ fontSize: "13px", textAlign: "center" }}>{grandUnpaid}</td>
                <td></td>
              </tr>
            ) : null}
          </tbody>
        </Table>
        {!isLastPage && <div style={{ pageBreakAfter: "always" }}></div>}
      </Fragment>
    );
  };

  return (
    <div>
      {!isPrinting ? (
        <div>
          {renderPage(Math.min(currentPage, Math.max(totalPages, 1)))}
          {totalPages > 1 && (
            <Pagination className="hide-on-print">
              <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item key={i + 1} active={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
            </Pagination>
          )}
        </div>
      ) : (
        <div>{Array.from({ length: Math.max(totalPages, 1) }, (_, i) => renderPage(i + 1))}</div>
      )}
    </div>
  );
};

export default ListBookFifteen;
