import React from "react";
import { dateFormatdd } from "./FunctionsGlobal/StartDateFn";
import { useTranslation } from "react-i18next";
const LedgerReport = ({ data }) => {
    const { openingBalance, transactions } = data;
    const { t } = useTranslation();
    let balance = openingBalance || 0;

    const finalResult = transactions.map((item) => {
        balance += (item.credit || 0) - (item.debit || 0);
        return { ...item, balance };
    });
    
    return (
        <div className="container mt-4 landscape">
            <h3 className="mb-3 text-center text-primary">{t('ledgerreport')}</h3>

            <table className="table table-bordered text-center">
                <thead>
                    <tr>
                        <th style={{fontSize:"14px",width:"10%"}}>{t('date')}</th>
                        <th style={{fontSize:"14px",width:"10%"}}>{t('accountname')}</th>
                        <th style={{fontSize:"14px",width:"10%"}}>{t('description')}</th>
                        <th style={{fontSize:"14px",width:"10%"}}>{t("debit")}</th>
                        <th style={{fontSize:"14px",width:"10%"}}>{t("credit")}</th>
                        <th style={{fontSize:"14px",width:"10%"}}>{t('balance')}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="5"><strong>{t('openingbalance')}</strong></td>
                        <td><strong>{openingBalance.toFixed(2)}</strong></td>
                    </tr>
                    {finalResult.length > 0 && finalResult.map((row, i) => (
                        <tr key={i}>
                            <td>{dateFormatdd(row.paymentdate)}</td>
                            <td>{row.accountname}</td>
                            <td>{row.description}</td>
                            <td>{row.debit ? row.debit.toFixed(2) : ""}</td>
                            <td>{row.credit ? row.credit.toFixed(2) : ""}</td>
                            <td>{row.balance.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LedgerReport;
