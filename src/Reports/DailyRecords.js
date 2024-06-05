import React, { Fragment } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"
var arr1 = Array.from(Array(35).keys());
var arr2 = Array.from(Array(3).keys());
var arr3 = Array.from(Array(15).keys());
var arr4 = Array.from(Array(10).keys());
var arr5 = Array.from(Array(35).keys());
const DailyRecords = ({ datefrom, dateto, linemanname, linamnline, collectiondate }) => {

    const { t, i18n } = useTranslation();

    var serialno = 0;
    var content = "";

    //var d = new Date(collectiondate).toLocaleString(t("en-ta"), {weekday:'long'});
    const weekday = ["ஞாயிறு",
        "திங்கள்",
        "செவ்வாய்",
        "புதன்",
        "வியாழன்",
        "வெள்ளி",
        "சனி"]
    const dayIndex = new Date(collectiondate).getDay();
    var d = weekday[dayIndex];
    //var dayName = days[d.getDay()];   

    return (
        <Fragment >
            <div style={{ paddingLeft: "24px", display: "flex", alignItems: "center" }}>
                <div className='fixed mt-3 fw-bold' style={{ width: "25%" }}>{t('customer') + " :" + linemanname}</div>
                <div className='fixed mt-3 fw-bold' style={{ width: "15%" }}>{t('line') + " :" + linamnline}</div>
                <div className='fixed mt-3 fw-bold' style={{ width: "29%" }}>{t("weekdate") + " :" + dateFormatdd(datefrom) + "-" + dateFormatdd(dateto)}</div>
                <div className='fixed mt-3 fw-bold' style={{ width: "31%" }}>{t("collectiondate") + " :" + dateFormatdd(collectiondate) + d}</div>
            </div>
            <Table className='table  text-center table-bordered border-dark' style={{ overflow: "auto" }}>
                <thead >
                    <tr>
                        <th ></th>
                        <th style={{ fontSize: "12px" }}>
                            {t('income')}
                        </th>
                        <th style={{ fontSize: "12px" }} className='col-md-2 col-sm-2'>
                            {t('customer')}
                        </th>
                        <th style={{ fontSize: "12px" }} className='col-md-2 col-sm-2'>
                            {t('details')}
                        </th>
                        <th style={{ fontSize: "12px", width: "1px" }} >
                            {t('totalcount')}
                        </th>
                        <th style={{ fontSize: "12px" }} >
                            {t('countaccount')}
                        </th>
                        <th style={{ fontSize: "12px" }} className='col-md-1 col-sm-1'>
                            {t('totalcreditshort')}
                        </th>
                        <th style={{ fontSize: "12px" }} className='col-md-1 col-sm-1'>
                            {t('Administrationincomeshort')}
                        </th>
                        <th style={{ fontSize: "12px" }} className='col-md-1 col-sm-1'>
                            {t('collection')}
                        </th>

                        <th style={{ fontSize: "12px" }} className='col-md-1 col-sm-1'>
                            {t('others')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('signature')}
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arr2 && arr2.length > 0
                            ?
                            (arr2.map((i) => {
                                serialno = i + 1;
                                if (i === 0) {
                                    content = t('Administrationincome')
                                }
                                else if (i === 1) {
                                    content = t('lineincome')
                                }
                                else {
                                    content = t('othersincome')
                                }
                                return (
                                    <tr className='dailyrecordsfinshedtotal'>
                                        <td></td>
                                        <td>{content}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                )
                            })
                            )
                            :
                            t('tabledata')
                    }
                    <tr className='dailyrecordsfinshedtotal'>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}>{(t('total'))}</td>
                        <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>


                    </tr>
                </tbody>
            </Table>
            <div className='col-sm-12 text-center fixed'>{t('dailyrecordsgiven')}</div>
            <Table className='table  text-center table-bordered border-dark'  >
                <thead >
                    <tr>
                        <th></th>
                        <th style={{ fontSize: "12px" }}>
                            {t('noshort')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('noshorts')}
                        </th>
                        <th style={{ fontSize: "12px" }} className='col-md-2 col-sm-2'>
                            {t('customer')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('booknoshort')}
                        </th>
                        <th style={{ fontSize: "12px" }} className='col-md-1 col-sm-1'>
                            {t('details')}
                        </th>
                        <th style={{
                            fontSize: "12px"
                        }} >
                            {t('loannoshort')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('givenamountshort')}
                        </th>
                        <th style={{ fontSize: "12px" }} >
                            {t('spendamountshort')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('loangivenamountshort')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('interest')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('loantotal')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('signature')}
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arr3 && arr3.length > 0
                            ?
                            (arr3.map((i) => {
                                serialno = i + 1;

                                return (
                                    <tr className='dailyrecords'>
                                        <td></td>
                                        <td>{serialno}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                )
                            })
                            )
                            :
                            t('tabledata')

                    }
                    <tr className='dailyrecords'>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "1px solid black", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black", fontSize: "10px" }}>{t('weekshort')}</td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}><span className='vl'></span></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}><span className='v2' style={{ fontSize: "10px" }}>{t('givenamounttooshort')}</span></td>
                        <td style={{ borderLeft: "1px solid black", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}><span className='v3'></span></td>
                        <td style={{ borderLeft: "1px solid black", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black", fontSize: "10px" }}>{t('totalcount')}</td>
                        <td style={{ borderLeft: "1px solid black", borderColor: "black !important", borderRight: "2px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "1px solid black", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "1px solid black", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "1px solid black", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "1px solid black", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "1px solid black", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "1px solid black", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                    </tr>



                </tbody>
            </Table>
            {/*finished account*/}
            <div className='col-sm-12 text-center fixed' ></div>
            <Table className='table  text-center table-bordered border-dark'>
                <thead >
                    <tr>
                        <th></th>
                        <th colSpan={8}><div style={{ fontSize: "12px" }}>{t('dailyrecordsfinishedaccount')}</div></th>
                        <th colSpan={3} style={{ borderRight: "2px solid black", borderLeft: "2px solid black" }}><div style={{ fontSize: "12px" }}>{t('givenamountshort')}</div></th>
                        <th colSpan={2} ><div style={{ fontSize: "12px" }}>{t('handsmoney')}</div></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th></th>
                        <th style={{ fontSize: "12px" }}>
                            {t('noshort')}
                        </th>
                        <th style={{ fontSize: "12px" }} className='col-md-1 col-sm-1'>
                            {t('loannotooshort')}
                        </th>
                        <th style={{ fontSize: "12px" }} className='col-md-2 col-sm-2'>
                            {t('customer')}
                        </th>
                        <th style={{ fontSize: "12px" }} className='col-md-2 col-sm-2'>
                            {t('city')}
                        </th>
                        <th style={{ fontSize: "12px" }} className='col-md-1 col-sm-1'>
                            {t('smallno')}
                        </th>
                        <th style={{}} className='col-md-1 col-sm-1'>
                            {t('noshorts')}
                        </th>
                        <th style={{ fontSize: "12px" }} className='col-md-1 col-sm-1'>
                            {t('totalamounttooshort')}
                        </th>
                        <th style={{ fontSize: "12px", borderRight: "2px solid black" }} >
                            {t('signature')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('money')}
                        </th>
                        <th style={{ fontSize: "12px" }} className='col-md-1 col-sm-1'>
                            {t('countshort')}
                        </th>
                        <th style={{ fontSize: "12px", borderRight: "2px solid black" }} className='col-md-1 col-sm-1'>
                            {t('totalcount')}
                        </th>
                        <th>{t('countshort')}</th>
                        <th className='col-md-1 col-sm-1'>{t('totalcount')}</th>
                        <th></th>
                    </tr>

                </thead>
                <tbody>

                    {
                        arr4 && arr4.length > 0
                            ?
                            (arr4.map((i) => {
                                serialno = i + 1;
                                if (i === 0) {
                                    content = "2000"
                                }
                                else if (i === 1) {
                                    content = "500"
                                }
                                else if (i === 2) {
                                    content = "200"
                                }
                                else if (i === 3) {
                                    content = "100"
                                }
                                else if (i === 4) {
                                    content = "50"
                                }
                                else if (i === 5) {
                                    content = "20"
                                }
                                else if (i === 6) {
                                    content = "10"
                                }
                                else if (i === 7) {
                                    content = t('shortvoucher')
                                }
                                else {
                                    content = ""
                                }
                                return (
                                    <tr className='dailyrecordsfinshed'>
                                        <td></td>
                                        <td>{serialno}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td ></td>
                                        <td style={{
                                            borderColor: "black !important", borderRight: "2px solid black"
                                        }}></td>
                                        <td>{content}</td>
                                        <td></td>
                                        <td style={{
                                            borderColor: "black !important", borderRight: "2px solid black"
                                        }}></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>

                                    </tr>

                                )
                            })
                            )
                            :
                            t('tabledata')
                    }

                    <tr className='dailyrecordsfinshed'>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black", fontSize: "10px" }}>{t('details')}</td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}><span className='v4'></span></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}><span className='v5'></span></td>
                        <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "2px solid black", borderColor: "black !important", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "2px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                    </tr>
                </tbody>
                <div style={{ marginTop: "85px" }}></div>
            </Table>
            {/* daily collection list*/}
            <div style={{ paddingLeft: "25px", display: "flex", alignItems: "center" }}>
                <div className='fixed fw-bold pt-5' style={{ width: "25%" }}>{t('customer') + " : " + linemanname}</div>
                <div className='fixed fw-bold pt-5' style={{ width: "12%" }}>{t('line') + " : " + linamnline}</div>
                <div className='fixed fw-bold pt-5' style={{ width: "30%" }}>{t("weekdate") + " : " + dateFormatdd(datefrom) + "-" + dateFormatdd(dateto)}</div>
                <div className='fixed fw-bold pt-5' style={{ width: "33%" }}>{t("collectiondate") + " : " + dateFormatdd(collectiondate) + d}</div>
            </div>
            <Table className='table  text-center table-bordered border-dark'>
                <thead >
                    <tr>
                        <th></th>
                        <th style={{ fontSize: "12px" }}>
                            {t('no')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('loannoshort')}
                        </th>
                        <th></th>
                        <th style={{ fontSize: "12px" }} className='col-md-2 col-sm-2'>
                            {t('customer')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('weekshort')}
                        </th>
                        <th style={{ fontSize: "12px" }} className='col-md-1 col-sm-1'>
                            {t('money')}
                        </th>
                        <th style={{
                            fontSize: "12px", borderColor: "black !important",
                            borderRight: "2px solid black"
                        }} >
                            {t('bill')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('loannoshort')}
                        </th>
                        <th></th>
                        <th style={{ fontSize: "12px" }} className='col-md-2 col-sm-2'>
                            {t('customer')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('weekshort')}
                        </th>
                        <th style={{ fontSize: "12px" }} className='col-md-1 col-sm-1'>
                            {t('money')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('bill')}
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arr1 && arr1.length > 0
                            ?
                            (arr1.map((i) => {
                                serialno = i + 1;

                                return (
                                    <tr className='dailyrecordsrough'>
                                        <td></td>
                                        <td>{serialno}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td style={{
                                            borderColor: "black !important", borderRight: "2px solid black"
                                        }}></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>

                                    </tr>

                                )
                            })
                            )
                            :
                            t('tabledata')
                    }

                    <tr className='dailyrecordtotalheight'>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}>{(t('total'))}</td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderColor: "black !important", borderRight: "2px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>

                    </tr>
                </tbody>



            </Table>
            { /*kodutha ruppai and selavu 35*/}
            {(Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ?
                <div className='row'>
                    <div className='fixed fw-bold pt-5' style={{ width: "20%", paddingLeft: "20px" }}>{t('customer') + " : "}</div>
                    <div className='fixed fw-bold pt-5' style={{ width: "15%" }}>{t('line') + " : "}</div>
                    <div className='fixed fw-bold pt-5' style={{ width: "30%" }}>{t("weekdate") + " : "}</div>
                    <div className='fixed fw-bold pt-5' style={{ width: "35%" }}>{t("collectiondate") + " : "}</div>
                </div>
                : null}
            {(Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ?
                <Table className='table  text-center table-bordered border-dark'  >
                    <thead >
                        <tr>
                            <th></th>
                            <th style={{ fontSize: "12px" }}>
                                {t('noshort')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('noshorts')}
                            </th>
                            <th style={{ fontSize: "12px" }} className='col-md-2 col-sm-2'>
                                {t('customer')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('booknoshort')}
                            </th>
                            <th style={{ fontSize: "12px" }} className='col-md-1 col-sm-1'>
                                {t('details')}
                            </th>
                            <th style={{
                                fontSize: "12px"
                            }} >
                                {t('loannoshort')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('givenamountshort')}
                            </th>
                            <th style={{ fontSize: "12px" }} >
                                {t('spendamountshort')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('loangivenamountshort')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('interest')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('loantotal')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('signature')}
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            arr5 && arr5.length > 0
                                ?
                                (arr5.map((i) => {
                                    serialno = i + 1;

                                    return (
                                        <tr className='dailyrecords'>
                                            <td></td>
                                            <td>{serialno}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>

                                    )
                                })
                                )
                                :
                                t('tabledata')

                        }
                        <tr className='dailyrecords dailyrecordsadditional'>
                            <td style={{ borderLeft: "0", borderRight: "2px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                            <td style={{
                                borderLeft: "1px solid black", borderRight: "2px solid black",
                                borderBottom: "2px solid black", borderTop: "2px solid black", fontSize: "10px"
                            }}>{t('weekshort')}</td>
                            <td style={{
                                borderLeft: "0", borderRight: "0", borderBottom: "2px solid black",
                                borderTop: "2px solid black"
                            }}>
                                <span className='v6'></span></td>
                            <td style={{
                                borderLeft: "0", borderRight: "2px solid black", borderBottom: "2px solid black",
                                borderTop: "2px solid black"
                            }}>
                                <span className='v7' style={{ fontSize: "10px" }}>{t('givenamounttooshort')}</span></td>
                            <td style={{
                                borderLeft: "0", borderRight: "0", borderBottom: "2px solid black",
                                borderTop: "2px solid black"
                            }}></td>
                            <td style={{
                                borderLeft: "0", borderRight: "3px solid black", borderBottom: "2px solid black",
                                borderTop: "2px solid black"
                            }}><span className='v8'></span></td>

                            <td style={{
                                borderLeft: "0", borderRight: "2px solid black",
                                borderBottom: "2px solid black",
                                borderTop: "2px solid black", fontSize: "10px"
                            }}>{t('totalcount')}</td>

                            <td style={{
                                borderLeft: "2px solid black", borderRight: "3px solid black",
                                borderBottom: "2px solid black", borderTop: "2px solid black"
                            }}></td>
                            <td style={{ borderLeft: "0", borderRight: "2px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                            <td style={{ borderLeft: "0", borderRight: "2px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                            <td style={{ borderLeft: "0", borderRight: "2px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                            <td style={{ borderLeft: "0", borderRight: "2px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                            <td style={{ borderLeft: "0", borderRight: "2px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                            <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        </tr>



                    </tbody>
                </Table>
                : null}
            {(Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ?
                <div style={{ paddingTop: "65px" }}></div>
                : <div style={{ paddingTop: "0px" }}></div>}
            {/*finished account 35 row*/}
            {(Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ?
                <div className='row'>
                    <div className='fixed fw-bold pt-5' style={{ width: "20%", paddingLeft: "20px" }}>{t('customer') + " : "}</div>
                    <div className='fixed fw-bold pt-5' style={{ width: "15%" }}>{t('line') + " : "}</div>
                    <div className='fixed fw-bold pt-5' style={{ width: "30%" }}>{t("weekdate") + " : "}</div>
                    <div className='fixed fw-bold pt-5' style={{ width: "35%" }}>{t("collectiondate") + " : "}</div>
                    <div className='col-sm-12 text-center fixed' ></div>
                </div>
                : null}
            {(Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ?
                <Table className='table  text-center table-bordered border-dark'>
                    <thead >
                        <tr>
                            <th></th>
                            <th colSpan={8}><div style={{ fontSize: "12px" }}>{t('dailyrecordsfinishedaccount')}</div></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th></th>
                            <th style={{ fontSize: "12px" }}>
                                {t('noshort')}
                            </th>
                            <th style={{ fontSize: "12px" }} className='col-md-1 col-sm-1'>
                                {t('loannotooshort')}
                            </th>
                            <th style={{ fontSize: "12px" }} className='col-md-4 col-sm-4'>
                                {t('customer')}
                            </th>
                            <th style={{ fontSize: "12px" }} className='col-md-3 col-sm-3'>
                                {t('city')}
                            </th>
                            <th style={{ fontSize: "12px" }} className='col-md-1 col-sm-1'>
                                {t('smallno')}
                            </th>
                            <th style={{}} className='col-md-1 col-sm-1'>
                                {t('noshorts')}
                            </th>
                            <th style={{ fontSize: "12px" }} className='col-md-1 col-sm-1'>
                                {t('totalamounttooshort')}
                            </th>
                            <th style={{ fontSize: "12px" }} >
                                {t('signature')}
                            </th>

                            <th></th>
                        </tr>

                    </thead>
                    <tbody>

                        {
                            arr4 && arr4.length > 0
                                ?
                                (arr1.map((i) => {
                                    serialno = i + 1;

                                    return (
                                        <tr className='dailyrecordsfinshed'>
                                            <td></td>
                                            <td>{serialno}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td ></td>
                                            <td></td>
                                            <td></td>

                                        </tr>

                                    )
                                })
                                )
                                :
                                t('tabledata')
                        }

                        <tr className='dailyrecordsfinshed'>
                            <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                            <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black", fontSize: "10px" }}>{t('details')}</td>
                            <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                            <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                            <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}><span className='v4'></span></td>
                            <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}><span className='v5'></span></td>
                            <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                            <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                            <td style={{ borderLeft: "0", borderRight: "2px solid black", borderColor: "black !important", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                            <td style={{ borderLeft: "0", borderRight: "1px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        </tr>
                    </tbody>
                </Table>
                : null}
            {(Number(process.env.REACT_APP_LOAN_APP_STARTDATE) === 0) ?
                <div style={{ paddingTop: "65px" }}></div>
                : null}
            <div className='fw-bold pt-5' style={{ width: "20%", paddingLeft: "20px" }}>{t('customer') + " : "}</div>
            <div className='fw-bold pt-5' style={{ width: "15%" }}>{t('line') + " : "}</div>
            <div className='fw-bold pt-5' style={{ width: "35%" }}>{t("weekdate") + " : "}</div>
            <div className='fw-bold pt-5' style={{ width: "30%" }}>{t("collectiondate") + " : "}</div>

            <Table className='table  text-center table-bordered border-dark' >
                <thead >
                    <tr>
                        <th></th>
                        <th style={{ fontSize: "12px" }}>
                            {t('no')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('loannoshort')}
                        </th>
                        <th></th>
                        <th style={{ fontSize: "12px" }} className='col-md-2 col-sm-2'>
                            {t('customer')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('weekshort')}
                        </th>
                        <th style={{ fontSize: "12px" }} className='col-md-1 col-sm-1'>
                            {t('money')}
                        </th>
                        <th style={{
                            fontSize: "12px", borderColor: "black !important",
                            borderRight: "2px solid black"
                        }} >
                            {t('bill')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('loannoshort')}
                        </th>
                        <th></th>
                        <th style={{ fontSize: "12px" }} className='col-md-2 col-sm-2'>
                            {t('customer')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('weekshort')}
                        </th>
                        <th style={{ fontSize: "12px" }} className='col-md-1 col-sm-1'>
                            {t('money')}
                        </th>
                        <th style={{ fontSize: "12px" }}>
                            {t('bill')}
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arr1 && arr1.length > 0
                            ?
                            (arr1.map((i) => {
                                serialno = i + 1;

                                return (
                                    <tr className='dailyrecordsrough'>
                                        <td></td>
                                        <td>{serialno}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td style={{
                                            borderColor: "black !important", borderRight: "2px solid black"
                                        }}></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>

                                    </tr>

                                )
                            })
                            )
                            :
                            t('tabledata')
                    }

                    <tr className='dailyrecordtotalheight'>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}>{(t('total'))}</td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderColor: "black !important", borderRight: "2px solid black", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>
                        <td style={{ borderLeft: "0", borderRight: "0", borderBottom: "2px solid black", borderTop: "2px solid black" }}></td>

                    </tr>
                </tbody>



            </Table>


        </Fragment>

    )

}
export default DailyRecords
