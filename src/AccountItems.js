import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import { Button } from 'react-bootstrap';
import { baseURL } from "./utils/constant";
import { useAuth } from "@clerk/clerk-react";
import { useTranslation } from "react-i18next";
const AccountItems = () => {
  const { getToken } = useAuth();
  const [transactions, setTransactions] = useState([
    { accountId: "", amount: "", transactionType: "", paymentType: "", description: "" },
  ]);
  const [accountOptions, setAccountOptions] = useState([]); // Account list
  //const [entryNumber, setEntryNumber] = useState("");
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();
  const inputRefs = useRef([]);
  const paymentRef = useRef("");
  const [updateUI, setUpdateUI] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const token = await getToken();
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.get(`${baseURL}/account/get`)
        .then((res) => {
          setAccountOptions(res.data.map(acc => ({
            value: acc._id, label: acc.accountname // Convert for react-select
          })));
        })
        .catch((error) => console.log("Error fetching accounts:", error));
    }
    fetchData();
  }, [getToken]);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const token = await getToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get(`${baseURL}/receipt1/get/reference`).then((res) => {
        //let paymentno=res.data[0].paymentreference + (res.data[0].paymentcode + 1);
        paymentRef.current.value = res.data[0].paymentreference + (res.data[0].paymentcode + 1);
        setIsLoading(false);
        setErrorMessage("");
      }).catch(error => {
        console.log("error=", error);
        setErrorMessage(t('errormessagecustomer'));
        setIsLoading(false);
      })
    }
    fetchData();
  }, [refresh, getToken, t]);
  const handleInputChange = (index, name, value) => {
    let newTransactions = [...transactions];
    newTransactions[index][name] = value;

    // Prevent duplicate Account ID & Transaction Type
    const isDuplicate = newTransactions.some(
      (t, i) =>
        i !== index &&
        t.accountId === newTransactions[index].accountId &&
        t.transactionType === newTransactions[index].transactionType &&
        t.paymentType === newTransactions[index].paymentType
    );

    if (isDuplicate) {
      alert(t('duplicateaccountalert'));
      return;
    }

    setTransactions(newTransactions);
  };

  const handleKeyDown = (index, field, event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const fields = ["accountId", "amount", "transactionType", "paymentType", "description"];
      const currentFieldIndex = fields.indexOf(field);


      if (currentFieldIndex < fields.length - 1) {
        // Move focus to the next input field
        inputRefs.current[index][currentFieldIndex + 1].focus();
      } else {
        // If Enter is pressed in "description", add new row

        if (
          transactions[index].accountId &&
          transactions[index].amount &&
          transactions[index].transactionType &&
          transactions[index].paymentType &&
          transactions[index].description.trim()
        ) {

          setTransactions([
            ...transactions,
            { accountId: "", amount: "", transactionType: "", paymentType: "", description: "" },
          ]);

          setTimeout(() => {
            if (inputRefs.current[index + 1] && inputRefs.current[index + 1][0]) {
              inputRefs.current[index + 1][0].focus();
            }

          }, 100);
        }
      }
    }
  };

  const removeTransactionRow = (index) => {
    let newTransactions = [...transactions];
    newTransactions.splice(index, 1);
    setTransactions(newTransactions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validTransactions = transactions
      .filter((t) => t.accountId && t.amount && t.transactionType && t.paymentType && t.description.trim()) // Filtering
      .map((t) => ({
        paymentno: paymentRef.current.value.toString(),  // Payment Number First
        paymentdate: new Date(transactionDate), // Payment Date Next
        account_id: t.accountId, // Then Account ID
        amount: t.amount,
        transactiontype: t.transactionType,
        paymenttype: t.paymentType,
        description: t.description
      }));

    if (validTransactions.length === 0) {
      alert(t('notransaction'));
      return;
    }
    const numberPart = paymentRef.current.value.match(/\d+/); // Extract numeric part

    const extractedNumber = numberPart ? parseInt(numberPart[0], 10) : null;
    var savetype = updateUI ? "update" : "save";
    const token = await getToken();
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.post(`${baseURL}/accountitems/${savetype}`, {
      transactions: validTransactions,
      paymentno: paymentRef.current.value.toString(),
      paymentcode: Number(extractedNumber),
      paymentdate: new Date(transactionDate)
    }).then((res) => {
      ClearDetails();
      alert(t("savealertmessage"));

    }).catch(error => {
      console.log("error=", error);
      setErrorMessage(t('errormessagesavereceipt'));
      //setButtonDisabled(false);
    }).finally(() => {
      //setButtonDisabled(false);
    })
  };
  const RestoreAccountItems = async () => {
    if (paymentRef.current.value !== "") {

      const token = await getToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.get(`${baseURL}/accountitems/get`,
        { params: { paymentno: paymentRef.current.value.toString() } }).then((res) => {
          //setIsRestore(true);

          const oldReference = res.data;
          if (oldReference.length > 0) {
            //console.log("Restored Data:", res.data);

            // Restore Transactions with correct key mapping
            const restoredTransactions = oldReference.map(transaction => ({
              accountId: transaction.account_id,
              amount: transaction.amount,
              transactionType: transaction.transactiontype,
              paymentType: transaction.paymenttype,
              description: transaction.description
            }));

            setTransactions(restoredTransactions);
            setTransactionDate(new Date(oldReference[0].paymentdate).toISOString().split("T")[0]);
            //setIsRestore(true);
            setUpdateUI(true);
          }
          else {
            // ClearDetails()
          }
        })
    }
    //setIsRestore(false);
  }
  const ClearDetails = () => {
    setTransactions([{ accountId: "", amount: "", transactionType: "", paymentType: "", description: "" }]);
    setUpdateUI(false);
    setRefresh((prevState) => !prevState)
    setTransactionDate(new Date().toISOString().split("T")[0]);
  }
  const deletePayment = async () => {

    if (window.confirm(t('deleteyesnoalert'))) {
      const token = await getToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.delete(`${baseURL}/accountitems/delete/${(paymentRef.current.value).toString()}`).then((res) => {
        alert(t('deletemessage'))
        ClearDetails();
        setErrorMessage("");
      }).catch(error => {
        console.log("error=", error);
        setErrorMessage(t('errormessagedeletereceipt'));
        setIsLoading(false);
        //setButtonDisabled(false);
      });
    }
  }
  return (
    <div className="container mt-4">

      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label fw-bold">{t('receiptno')}</label>
            <input type="text" className="form-control"
              ref={paymentRef}
              onBlur={RestoreAccountItems} />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-bold">{t('date')}</label>
            <input
              type="date"
              className="form-control"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
              required
            />
          </div>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr className="table-light">
              <th>{t('accountname')}</th>
              <th>{t('amount')}</th>
              <th>{t('transactiontype')}</th>
              <th>{t('paymenttype')}</th>
              <th>{t('description')}</th>
              <th>{t('tableaction')}</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>
                  <Select
                    options={accountOptions}
                    onChange={(selectedOption) =>
                      handleInputChange(index, "accountId", selectedOption ? selectedOption.value : "")
                    }
                    value={accountOptions.find(option => option.value === transaction.accountId)}
                    className="fixed-width"
                    styles={{ menuPortal: (base) => ({ ...base, width: 200 }) }}
                    menuPortalTarget={document.body}
                    menuPlacement="auto"
                    isSearchable
                    placeholder={t('search')}
                    isClearable={true}
                    autoFocus
                  />



                </td>
                <td>
                  <input
                    type="number"
                    name="amount"
                    className="form-control"
                    value={transaction.amount}
                    onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, "amount", e)}
                    ref={(el) => (inputRefs.current[index] = inputRefs.current[index] || [], inputRefs.current[index][1] = el)}

                    required
                  />
                </td>

                <td>
                  <select
                    name="transactionType"
                    className="form-select"
                    value={transaction.transactionType}
                    onChange={(e) => handleInputChange(index, "transactionType", e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, "transactionType", e)}
                    ref={(el) => (inputRefs.current[index][2] = el)}
                    required
                  >
                    <option value="">{t('search')}</option>
                    <option value={1}>{t('credit')}</option>
                    <option value={2}>{t('debit')}</option>
                  </select>
                </td>
                <td>
                  <select
                    name="paymentType"
                    className="form-select"
                    value={transaction.paymentType}
                    onChange={(e) => handleInputChange(index, "paymentType", e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, "paymentType", e)}
                    ref={(el) => (inputRefs.current[index][2] = el)}
                    required
                  >
                    <option value="">{t('search')}</option>
                    <option value={0}>{t('Cash')}</option>
                    <option value={1}>{t('Bank')}</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={transaction.description}
                    onChange={(e) => handleInputChange(index, "description", e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, "description", e)}
                    ref={(el) => (inputRefs.current[index][3] = el)}
                    required
                  />
                </td>
                <td>
                  {transactions.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeTransactionRow(index)}
                    >
                      ❌
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-center">
          <button type="submit" className="btn btn-primary px-4">
            {updateUI ? t('updatebutton') : t('savebutton')}
          </button>{'  '}
          <button type="button" className="btn btn-primary px-4" onClick={ClearDetails}>
            {t('newbutton')}
          </button>{' '}
          <button type="button" className="btn btn-primary px-4"
            onClick={deletePayment} disabled={updateUI ? false : true}>
            {t('deletebutton')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountItems;
