"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[473],{7473:function(e,t,n){n.r(t),n.d(t,{default:function(){return h}});n(2791);var a=n(7850),o=n(7022),r=n(4686),l=n(9102),i=n(2998),s=n(7689),c=n(9230),d=n(8825),u={en:{translation:JSON.parse('{"linemanheader":"LINEMAN MASTER","linemanplaceholderlabel":"Enter LineMan Name","cityheadername":"CITY MASTER","pageprev":"Prev","pagenext":"Next","tableaction":"Action","customerheadername":"CUSTOMER MASTER","fatherhusbandnameplaceholder":"Enter Husband/Father","customertablefathername":"Father Name","tabledata":"No Data Available","processbuttonlabel":"Process","no":"No","loanno":"Loan No","customer":"Name","customerplaceholderlabel":"Enter Customer Name","phoneno":"Mobile No","phonenoplaceholder":"Enter Mobile No","work":"Work","workplaceholder":"Enter Work Details","city":"City Name","cityplaceholderlabel":"Enter City Name","loanamount":"Loan Amount","startdate":"Start Date","givendate":"Given Date","enddate":"End Date","startdatedetail":"Start Date","givendatedetail":"Given Date","enddatedetail":"End Date","payingdate":"Paying Date","fathername":"Father Name","paidamount":"Paid Amount","paidamountdetail":"Paid Amount","pending":"Pending","address":"Address","addressplaceholder":"Enter Address","printbutton":"Print","savebutton":"Save","newbutton":"New","updatebutton":"Update","deletebutton":"Delete","date":"Date","linechecking":"Line Checking List","previousweekdetails":"Previous Week Collection List","previousweekreport":"Previous Week Paid","line":"Line","lineplaceholder":"Select Line Menu","bookno":"Book No","errormessagecity":"Unable to Fetch City Lists","errormessageline":"Unable to Fetch Lines","errormessagecustomer":"Unable to Fetch Customer List","errormessagelineman":"Unable to Fetch Lineman List","errormessageloan":"Unable to Fetch Loan List","errormessageledger":"Unable to Fetch Ledger","erroressagelinechecking":"Unable to Fetch LineChecking List","errormessageloannumber":"Unable to Fetch Loan No","errormessagesaveloan":"Unable to Save Loan No","errormessagedeleteloan":"Unable to Delete Loan No","errormessageupdateloan":"Unable to Update Loan No","errormessagesavecustomer":"Unable to Save Customer","errormessagesavecity":"Unable to Save City","ledger":"LEDGER","week":"Week","weekno":"Week No","document":"Document","cheque":"Cheque","lineman":"Line Man","givenamount":"Given Amt","givenamountdetail":"Given Amount","documentcharge":"Doc.Charge","documentchargedetail":"Document Charge","interest":"Interest","total":"Total","pagetotal":"Page Total","due":"Due.Amt","pay":"Pay","dueno":"Due No","amount":"Amount","credit":"Credit","totalcredit":"Total Credit","debitcredit":"Deb.Credit","balance":"Balance","nodatas":"No Datas Available","loanplaceholdercombo":"Select Loan No","cityplaceholder":"Select City Menu","customerplaceholder":"Select Customer Menu","linemanplaceholder":"Select LineMan","weeknoplaceholder":"Enter Week No","booknoplaceholder":"Enter Book No","oldno":"Old No","savealertmessage":"Saved Successfully","deletemessage":"Deleted Successfully","updatealertmessage":"Updated Sucessfully","yesornoalertmessage":"Are you sure you want to Update Loan ?","deletealertmessage":"Are you sure want to Remove this loan?","fathershort":"F","husbandshort":"H","beforedebt":"Pre Debit Account","currentdebt":"Current Debit Account","averagecollection":"Avg.Collection","beforeloancount":"B.Count","beforetotalamount":"B.Debt","beforependingamount":"B.Pending","currentloancount":"C.Count","currenttotalamount":"C.Debt","currentpendingamount":"C.Pending","collection":"Collection","average":"Avg.","more":"More","less":"Less","notrunning":"Not Running Account","notrunningcount":"No.Runnning","notrunningpending":"Not.Amount","running":"Run","notrunningdate":"Not Running Date","totalledgername":"Before Debt,Current Debt,Average Collection,Pending And Not Running Account","selectanyitemfromlist":"Select Any one From List","paidamountvaluezeroalert":"Paid Amount Should Not be Zero","paidamountgreaterthanloanalert":"Paid Amount Greater than Loan Amount","paidamountgreaterthanloanalertyesno":"Paid Amount Greater than Loan Amount,Do You Want To Change? ","report":"Select Report","newaccountaddress":"New Account Address","weekendaccounts":"Week End Accounts","doc":"Doc","lineincentive":"Line.Inc","currentweekamountgiven":"Current Week Money Given","loanupdatealert":"This Loan Entry Involved More than one Transaction","countaccount":"Account","countfinished":"Closed","totalcount":"Total","weekshort":"Wk","money":"Rs","bill":"B","loannoshort":"LNo","weekdate":"WeekDate","collectiondate":"Collect.Date","printdate":"PrintDate"}')},ta:{translation:JSON.parse('{"linemanheader":"\u0b95\u0bca\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bb5\u0bb0\u0bcd \u0bb5\u0bbf\u0baa\u0bb0\u0bae\u0bcd","linemanplaceholderlabel":"\u0b95\u0bca\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bb5\u0bb0\u0bc8 \u0b89\u0bb3\u0bcd\u0bb3\u0bbf\u0b9f\u0bb5\u0bc1\u0bae\u0bcd","cityheadername":"\u0b8a\u0bb0\u0bcd \u0bb5\u0bbf\u0baa\u0bb0\u0bae\u0bcd","pageprev":"\u0bae\u0bc1\u0ba9\u0bcd","pagenext":"\u0baa\u0bbf\u0ba9\u0bcd","tableaction":"\u0b9a\u0bc6\u0baf\u0bb2\u0bcd","customerheadername":"\u0bb5\u0bbe\u0b9f\u0bbf\u0b95\u0bcd\u0b95\u0bc8\u0baf\u0bbe\u0bb3\u0bb0\u0bcd \u0bb5\u0bbf\u0baa\u0bb0\u0bae\u0bcd","fatherhusbandnameplaceholder":"\u0ba4\u0b95\u0baa\u0bcd\u0baa\u0ba9\u0bbe\u0bb0\u0bcd/\u0b95\u0ba3\u0bb5\u0bb0\u0bcd \u0baa\u0bc6\u0baf\u0bb0\u0bcd","customertablefathername":"\u0ba4\u0b95\u0baa\u0bcd\u0baa\u0ba9\u0bbe\u0bb0\u0bcd","tabledata":"\u0ba4\u0bb0\u0bb5\u0bc1 \u0b87\u0bb2\u0bcd\u0bb2\u0bc8","processbuttonlabel":"\u0b95\u0bbe\u0b9f\u0bcd\u0b9f\u0bc1","no":"\u0b8e\u0ba3\u0bcd","loanno":"\u0b9a\u0bc0\u0b9f\u0bcd\u0b9f\u0bc1 \u0b8e\u0ba3\u0bcd","customer":"\u0baa\u0bc6\u0baf\u0bb0\u0bcd","customerplaceholderlabel":"\u0baa\u0bc6\u0baf\u0bb0\u0bc8 \u0b87\u0b9f\u0bb5\u0bc1\u0bae\u0bcd","phoneno":"\u0baa\u0bcb\u0ba9\u0bcd","phonenoplaceholder":"\u0baa\u0bcb\u0ba9\u0bcd \u0b8e\u0ba3\u0bcd\u0ba3\u0bc8 \u0b87\u0b9f\u0bb5\u0bc1\u0bae\u0bcd","work":"\u0bb5\u0bc7\u0bb2\u0bc8","workplaceholder":"\u0bb5\u0bc7\u0bb2\u0bc8 \u0bb5\u0bbf\u0bb5\u0bb0\u0b99\u0bcd\u0b95\u0bb3\u0bc8 \u0b89\u0bb3\u0bcd\u0bb3\u0bbf\u0b9f\u0bb5\u0bc1\u0bae\u0bcd","city":"\u0b8a\u0bb0\u0bcd","cityplaceholderlabel":"\u0b8a\u0bb0\u0bcd \u0bb5\u0bbf\u0bb5\u0bb0\u0b99\u0bcd\u0b95\u0bb3\u0bc8 \u0b89\u0bb3\u0bcd\u0bb3\u0bbf\u0b9f\u0bb5\u0bc1\u0bae\u0bcd","loanamount":"\u0baa\u0bb1\u0bcd\u0bb1\u0bc1","startdate":"\u0b86.\u0ba4\u0bc7\u0ba4\u0bbf","givendate":"\u0b95\u0bca.\u0ba4\u0bc7\u0ba4\u0bbf","enddate":"\u0bae\u0bc1.\u0ba4\u0bc7\u0ba4\u0bbf","startdatedetail":"\u0b86\u0bb0\u0bae\u0bcd\u0baa \u0ba4\u0bc7\u0ba4\u0bbf","givendatedetail":"\u0b95\u0bca\u0b9f\u0bc1\u0ba4\u0bcd\u0ba4 \u0ba4\u0bc7\u0ba4\u0bbf","enddatedetail":"\u0bae\u0bc1\u0b9f\u0bbf\u0bb5\u0bc1 \u0ba4\u0bc7\u0ba4\u0bbf","payingdate":"\u0b9a\u0bc6\u0bb2\u0bc1\u0ba4\u0bcd\u0ba4\u0bc1\u0bae\u0bcd \u0ba4\u0bc7\u0ba4\u0bbf","fathername":"\u0ba4\u0b95\u0baa\u0bcd\u0baa\u0ba9\u0bbe\u0bb0\u0bcd","paidamount":"\u0b95.\u0baa\u0ba3\u0bae\u0bcd","paidamountdetail":"\u0b95\u0b9f\u0bcd\u0b9f\u0bbf\u0baf \u0baa\u0ba3\u0bae\u0bcd","pending":"\u0baa\u0bc6\u0ba3\u0bcd\u0b9f\u0bbf\u0b99\u0bcd","address":"\u0ba4\u0bc6\u0bb0\u0bc1","addressplaceholder":"\u0bae\u0bc1\u0b95\u0bb5\u0bb0\u0bbf \u0bb5\u0bbf\u0bb5\u0bb0\u0b99\u0bcd\u0b95\u0bb3\u0bc8 \u0b89\u0bb3\u0bcd\u0bb3\u0bbf\u0b9f\u0bb5\u0bc1\u0bae\u0bcd","printbutton":"\u0baa\u0bbf\u0bb0\u0bbf\u0ba3\u0bcd\u0b9f\u0bcd","savebutton":"\u0b9a\u0bc7\u0bae\u0bbf","newbutton":"\u0baa\u0bc1\u0ba4\u0bbf\u0baf","updatebutton":"\u0bae\u0bbe\u0bb1\u0bcd\u0bb1\u0bc1\u0ba4\u0bb2\u0bcd","deletebutton":"\u0b85\u0b95\u0bb1\u0bcd\u0bb1\u0bc1","date":"\u0ba4\u0bc7\u0ba4\u0bbf","linechecking":"\u0bb2\u0bc8\u0ba9\u0bcd \u0b9a\u0bc6\u0b95\u0bcd\u0b95\u0bbf\u0b99\u0bcd \u0bb5\u0bbf\u0baa\u0bb0\u0bae\u0bcd","previousweekdetails":"\u0baa\u0bcb\u0ba9 \u0bb5\u0bbe\u0bb0\u0bae\u0bcd \u0baa\u0ba3\u0bae\u0bcd \u0b95\u0b9f\u0bcd\u0b9f\u0bbf\u0baf \u0bb5\u0bbf\u0baa\u0bb0\u0bae\u0bcd","previousweekreport":"\u0baa\u0bcb\u0ba9 \u0bb5\u0bbe\u0bb0\u0bae\u0bcd \u0b95\u0b9f\u0bcd\u0b9f\u0bbf\u0baf \u0bb5\u0bbf\u0baa\u0bb0\u0bae\u0bcd","line":"\u0bb2\u0bc8\u0ba9\u0bcd","lineplaceholder":"\u0bb2\u0bc8\u0ba9\u0bc8 \u0ba4\u0bc7\u0bb0\u0bcd\u0ba8\u0bcd\u0ba4\u0bc6\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0bae\u0bcd","bookno":"\u0baa\u0bc1\u0b95\u0bcd \u0b8e\u0ba3\u0bcd","errormessagecity":"\u0b8a\u0bb0\u0bcd\u0b95\u0bb3\u0bbf\u0ba9\u0bcd \u0baa\u0b9f\u0bcd\u0b9f\u0bbf\u0baf\u0bb2\u0bc8 \u0b8e\u0b9f\u0bc1\u0b95\u0bcd\u0b95 \u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8","errormessageline":"\u0bb2\u0bc8\u0ba9\u0bcd\u0b95\u0bb3\u0bbf\u0ba9\u0bcd \u0baa\u0b9f\u0bcd\u0b9f\u0bbf\u0baf\u0bb2\u0bc8 \u0b8e\u0b9f\u0bc1\u0b95\u0bcd\u0b95 \u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8","errormessagecustomer":"\u0baa\u0bc6\u0baf\u0bb0\u0bcd\u0b95\u0bb3\u0bbf\u0ba9\u0bcd \u0baa\u0b9f\u0bcd\u0b9f\u0bbf\u0baf\u0bb2\u0bc8 \u0b8e\u0b9f\u0bc1\u0b95\u0bcd\u0b95 \u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8","errormessagelineman":"\u0b95\u0bca\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bb5\u0bb0\u0bcd\u0b95\u0bb3\u0bbf\u0ba9\u0bcd \u0baa\u0b9f\u0bcd\u0b9f\u0bbf\u0baf\u0bb2\u0bc8 \u0b8e\u0b9f\u0bc1\u0b95\u0bcd\u0b95 \u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8","errormessageloan":"\u0b9a\u0bc0\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bb3\u0bbf\u0ba9\u0bcd \u0baa\u0b9f\u0bcd\u0b9f\u0bbf\u0baf\u0bb2\u0bc8 \u0b8e\u0b9f\u0bc1\u0b95\u0bcd\u0b95 \u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8","errormessageledger":"\u0bb2\u0bc6\u0b9f\u0bcd\u0b9c\u0bc6\u0bb0\u0bcd \u0b8e\u0b9f\u0bc1\u0b95\u0bcd\u0b95 \u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8","erroressagelinechecking":"\u0bb2\u0bc8\u0ba9\u0bcd \u0b9a\u0bc6\u0b95\u0bcd\u0b95\u0bbf\u0b99\u0bcd \u0baa\u0b9f\u0bcd\u0b9f\u0bbf\u0baf\u0bb2\u0bc8 \u0b8e\u0b9f\u0bc1\u0b95\u0bcd\u0b95 \u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8 ","errormessageloannumber":"\u0b9a\u0bc0\u0b9f\u0bcd\u0b9f\u0bc1 \u0b8e\u0ba3\u0bcd\u0ba3\u0bc8 \u0b8e\u0b9f\u0bc1\u0b95\u0bcd\u0b95 \u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8","errormessagesaveloan":"\u0b9a\u0bc0\u0b9f\u0bcd\u0b9f\u0bc1 \u0b8e\u0ba3\u0bcd\u0ba3\u0bc8 \u0b9a\u0bc7\u0bae\u0bbf\u0b95\u0bcd\u0b95 \u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8","errormessagedeleteloan":"\u0b9a\u0bc0\u0b9f\u0bcd\u0b9f\u0bc1 \u0b8e\u0ba3\u0bcd\u0ba3\u0bc8 \u0ba8\u0bc0\u0b95\u0bcd\u0b95 \u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8","errormessageupdateloan":"\u0b9a\u0bc0\u0b9f\u0bcd\u0b9f\u0bc1 \u0b8e\u0ba3\u0bcd\u0ba3\u0bc8 \u0bae\u0bbe\u0bb1\u0bcd\u0bb1 \u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8","errormessagesavecustomer":"\u0baa\u0bc6\u0baf\u0bb0\u0bc8 \u0b9a\u0bc7\u0bae\u0bbf\u0b95\u0bcd\u0b95 \u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8","errormessagesavecity":"\u0b8a\u0bb0\u0bc8 \u0b9a\u0bc7\u0bae\u0bbf\u0b95\u0bcd\u0b95 \u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8","errormessagesavelineman":"\u0b95\u0bca\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bb5\u0bb0\u0bc8 \u0b9a\u0bc7\u0bae\u0bbf\u0b95\u0bcd\u0b95 \u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8","ledger":"\u0bb2\u0bc6\u0b9f\u0bcd\u0b9c\u0bc6\u0bb0\u0bcd","week":"\u0bb5\u0bbe\u0bb0\u0bae\u0bcd","weekno":"\u0bb5\u0bbe.\u0b8e\u0ba3\u0bcd","document":"\u0b9f\u0bbe\u0b95\u0bc1\u0bae\u0bc6\u0ba3\u0bcd\u0b9f\u0bcd","cheque":"\u0b9a\u0bc6\u0b95\u0bcd","lineman":"\u0b95\u0bca\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bb5\u0bb0\u0bcd","givenamount":"\u0b95\u0bca.\u0baa\u0ba3\u0bae\u0bcd","givenamountdetail":"\u0b95\u0bca\u0b9f\u0bc1\u0ba4\u0bcd\u0ba4 \u0baa\u0ba3\u0bae\u0bcd","documentcharge":"\u0b9f\u0bbe.\u0b9a\u0bbe\u0bb0\u0bcd\u0b9a\u0bcd","documentchargedetail":"\u0b9f\u0bbe\u0b95\u0bc1\u0bae\u0bc6\u0ba3\u0bcd\u0b9f\u0bcd \u0b9a\u0bbe\u0bb0\u0bcd\u0b9a\u0bcd","interest":"\u0bb5\u0b9f\u0bcd\u0b9f\u0bbf","total":"\u0bae\u0bca\u0ba4\u0bcd\u0ba4\u0bae\u0bcd","pagetotal":"\u0baa.\u0bae\u0bca","due":"\u0ba4\u0bb5\u0ba3\u0bc8","pay":"\u0b95.\u0bb0\u0bc2","dueno":"\u0ba4.\u0b8e\u0ba3\u0bcd","amount":"\u0ba4\u0bca\u0b95\u0bc8","credit":"\u0bb5\u0bb0\u0bb5\u0bc1","totalcredit":"\u0bae\u0bca.\u0bb5\u0bb0\u0bb5\u0bc1","debitcredit":"\u0baa.\u0bb5\u0bb0\u0bb5\u0bc1","balance":"\u0b87\u0bb0\u0bc1\u0baa\u0bcd\u0baa\u0bc1","nodatas":"\u0ba4\u0bb0\u0bb5\u0bc1 \u0b87\u0bb2\u0bcd\u0bb2\u0bc8","loanplaceholdercombo":"\u0b9a\u0bc0\u0b9f\u0bcd\u0b9f\u0bc1 \u0b8e\u0ba3\u0bcd\u0ba3\u0bc8 \u0ba4\u0bc7\u0bb0\u0bcd\u0ba8\u0bcd\u0ba4\u0bc6\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0bae\u0bcd","cityplaceholder":"\u0b8a\u0bb0\u0bc8 \u0ba4\u0bc7\u0bb0\u0bcd\u0ba8\u0bcd\u0ba4\u0bc6\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0bae\u0bcd","customerplaceholder":"\u0baa\u0bc6\u0baf\u0bb0\u0bc8 \u0ba4\u0bc7\u0bb0\u0bcd\u0ba8\u0bcd\u0ba4\u0bc6\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0bae\u0bcd","linemanplaceholder":"\u0b95\u0bca\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bb5\u0bb0\u0bc8 \u0ba4\u0bc7\u0bb0\u0bcd\u0ba8\u0bcd\u0ba4\u0bc6\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0bae\u0bcd","weeknoplaceholder":"\u0bb5\u0bbe\u0bb0 \u0b8e\u0ba3\u0bcd \u0b87\u0b9f\u0bb5\u0bc1\u0bae\u0bcd","booknoplaceholder":"\u0baa\u0bc1\u0b95\u0bcd \u0b8e\u0ba3\u0bcd \u0b87\u0b9f\u0bb5\u0bc1\u0bae\u0bcd","oldno":"\u0baa\u0bb4\u0bc8\u0baf \u0b8e\u0ba3\u0bcd","savealertmessage":"\u0bb5\u0bc6\u0bb1\u0bcd\u0bb1\u0bbf\u0b95\u0bb0\u0bae\u0bbe\u0b95 \u0b9a\u0bc7\u0bae\u0bbf\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0ba4\u0bc1","updatealertmessage":"\u0bb5\u0bc6\u0bb1\u0bcd\u0bb1\u0bbf\u0b95\u0bb0\u0bae\u0bbe\u0b95 \u0bae\u0bbe\u0bb1\u0bcd\u0bb1\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0ba4\u0bc1","deletemessage":"\u0bb5\u0bc6\u0bb1\u0bcd\u0bb1\u0bbf\u0b95\u0bb0\u0bae\u0bbe\u0b95 \u0ba8\u0bc0\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0ba4\u0bc1","yesornoalertmessage":"\u0b9a\u0bc0\u0b9f\u0bcd\u0b9f\u0bc1 \u0b8e\u0ba3\u0bcd\u0ba3\u0bc8 \u0bae\u0bbe\u0bb1\u0bcd\u0bb1 \u0bb5\u0bc7\u0ba3\u0bcd\u0b9f\u0bc1\u0bae\u0bbe?","deletealertmessage":"\u0b9a\u0bc0\u0b9f\u0bcd\u0b9f\u0bc1 \u0b8e\u0ba3\u0bcd\u0ba3\u0bc8 \u0ba8\u0bc0\u0b95\u0bcd\u0b95 \u0bb5\u0bc7\u0ba3\u0bcd\u0b9f\u0bc1\u0bae\u0bbe?","fathershort":"\u0ba4","husbandshort":"\u0b95","beforedebt":"\u0bae\u0bc1\u0ba9\u0bcd \u0baa\u0bb1\u0bcd\u0bb1\u0bc1 \u0b95\u0ba3\u0b95\u0bcd\u0b95\u0bc1","currentdebt":"\u0ba4.\u0baa\u0bb1\u0bcd\u0bb1\u0bc1 \u0b95\u0ba3\u0b95\u0bcd\u0b95\u0bc1","averagecollection":"\u0b86\u0bb5\u0bb0\u0bc7\u0b9c\u0bcd \u0bb5\u0b9a\u0bc2\u0bb2\u0bcd","beforeloancount":"\u0bae\u0bc1.\u0b86","beforetotalamount":"\u0bae\u0bc1.\u0baa\u0bb1\u0bcd\u0bb1\u0bc1","beforependingamount":"\u0bae\u0bc1.\u0baa\u0bc6","currentloancount":"\u0ba4.\u0b86","currenttotalamount":"\u0ba4.\u0baa\u0bb1\u0bcd\u0bb1\u0bc1","currentpendingamount":"\u0ba4.\u0baa\u0bc6","collection":"\u0bb5\u0b9a\u0bc2\u0bb2\u0bcd","average":"\u0b85\u0bb5","more":"\u0b85\u0ba4\u0bbf\u0b95\u0bae\u0bcd","less":"\u0b95\u0bc1\u0bb1\u0bc8\u0bb5\u0bc1","notrunning":"\u0ba4.\u0bb0\u0ba9\u0bcd\u0ba9\u0bbf\u0b99\u0bcd \u0b86\u0b95\u0bbe\u0ba4","notrunningcount":"\u0ba4.\u0bb0 \u0b86\u0bb3\u0bcd","notrunningpending":"\u0ba4.\u0bb0 \u0bb0\u0bc2\u0baa\u0bbe","running":"\u0bb0\u0ba9\u0bcd\u0ba9\u0bbf\u0b99\u0bcd","notrunningdate":"\u0bb0\u0ba9\u0bcd\u0ba9\u0bbf\u0b99\u0bcd \u0b86\u0b95\u0bbe\u0ba4 \u0ba4\u0bc7\u0ba4\u0bbf","totalledgername":"\u0bae\u0bc1\u0ba9\u0bcd \u0baa\u0bb1\u0bcd\u0bb1\u0bc1 \u0b95\u0ba3\u0b95\u0bcd\u0b95\u0bc1,\u0ba4.\u0baa\u0bb1\u0bcd\u0bb1\u0bc1 \u0b95\u0ba3\u0b95\u0bcd\u0b95\u0bc1,\u0b86\u0bb5\u0bb0\u0bc7\u0b9c\u0bcd \u0bb5\u0b9a\u0bc2\u0bb2\u0bcd,\u0baa\u0bc6\u0ba3\u0bcd\u0b9f\u0bbf\u0b99\u0bcd \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0bb0\u0ba9\u0bcd\u0ba9\u0bbf\u0b99\u0bcd \u0b86\u0b95\u0bbe\u0ba4 \u0b85\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0ba3\u0bcd\u0b9f\u0bcd","selectanyitemfromlist":"\u0b8f\u0ba4\u0bbe\u0bb5\u0ba4\u0bc1 \u0b92\u0bb0\u0bc1 \u0b9a\u0bc0\u0b9f\u0bcd\u0b9f\u0bc1 \u0b8e\u0ba3\u0bcd\u0ba3\u0bc8 \u0ba4\u0bc7\u0bb0\u0bcd\u0ba8\u0bcd\u0ba4\u0bc6\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0bae\u0bcd","paidamountvaluezeroalert":"\u0b95\u0b9f\u0bcd\u0b9f\u0bbf\u0baf \u0baa\u0ba3\u0bae\u0bcd \u0b95\u0bca\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8","paidamountgreaterthanloanalert":"\u0b95\u0b9f\u0bcd\u0b9f\u0bbf\u0baf \u0baa\u0ba3\u0bae\u0bcd \u0b95\u0b9f\u0ba9\u0bcd \u0ba4\u0bca\u0b95\u0bc8\u0baf\u0bc8 \u0bb5\u0bbf\u0b9f \u0b85\u0ba4\u0bbf\u0b95\u0bae\u0bbe\u0b95 \u0b89\u0bb3\u0bcd\u0bb3\u0ba4\u0bc1","paidamountgreaterthanloanalertyesno":"\u0b95\u0b9f\u0bcd\u0b9f\u0bbf\u0baf \u0baa\u0ba3\u0bae\u0bcd \u0b95\u0b9f\u0ba9\u0bcd \u0ba4\u0bca\u0b95\u0bc8\u0baf\u0bc8 \u0bb5\u0bbf\u0b9f \u0b85\u0ba4\u0bbf\u0b95\u0bae\u0bcd,\u0ba4\u0bca\u0b95\u0bc8\u0baf\u0bc8 \u0bae\u0bbe\u0bb1\u0bcd\u0bb1\u0ba9\u0bc1\u0bae\u0bbe? ","report":"\u0bb0\u0bbf\u0baa\u0bcb\u0bb0\u0bcd\u0b9f\u0bc8 \u0ba4\u0bc7\u0bb0\u0bcd\u0ba8\u0bcd\u0ba4\u0bc6\u0b9f\u0bc1","newaccountaddress":"\u0baa\u0bc1\u0ba4\u0bc1 \u0b85\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0ba3\u0bcd\u0b9f\u0bcd \u0b85\u0b9f\u0bcd\u0bb0\u0bb8\u0bcd","weekendaccounts":"\u0bb5\u0bbe\u0bb0 \u0bae\u0bc1\u0b9f\u0bbf\u0bb5\u0bc1 \u0b85\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0ba3\u0bcd\u0b9f\u0bcd\u0bb8\u0bcd","doc":"\u0b9f\u0bbe\u0b95\u0bcd","lineincentive":"\u0bb2.\u0b87\u0ba9\u0bcd\u0bb8\u0bcd","currentweekamountgiven":"\u0b85\u0ba8\u0bcd\u0ba4 \u0bb5\u0bbe\u0bb0 \u0baa\u0ba3\u0bae\u0bcd \u0b95\u0bca\u0b9f\u0bc1\u0ba4\u0bcd\u0ba4\u0ba4\u0bc1","loanupdatealert":"\u0b87\u0ba8\u0bcd\u0ba4 \u0b9a\u0bc0\u0b9f\u0bcd\u0b9f\u0bc1 \u0b8e\u0ba3\u0bcd \u0b95\u0bb2\u0bc6\u0b95\u0bcd\u0b9a\u0ba9\u0bbf\u0bb2\u0bcd \u0b89\u0bb3\u0bcd\u0bb3\u0ba4\u0bc1","countaccount":"\u0b86\u0bb3\u0bcd","countfinished":"\u0bae\u0bc1\u0b9f\u0bbf\u0bb5\u0bc1","totalcount":"\u0bae\u0bca","weekshort":"\u0bb5\u0bbe","money":"\u0bb0\u0bc2","bill":"\u0baa\u0bbf","loannoshort":"\u0b9a\u0bc0\u0b8e\u0ba3\u0bcd","weekdate":"\u0bb5\u0bbe\u0bb0\u0ba4\u0bc7\u0ba4\u0bbf","collectiondate":"\u0bb5\u0b9a\u0bc2\u0bb2\u0bcd\u0ba4\u0bc7\u0ba4\u0bbf","income":"\u0bb5\u0bb0\u0bb5\u0bc1\u0bb0\u0bc2","details":"\u0bb5\u0bbf\u0baa\u0bb0\u0bae\u0bcd","totalcreditshort":"\u0bae\u0bca.\u0bb5","Administrationincomeshort":"\u0ba8\u0bbf.\u0bb5\u0bb0\u0bb5\u0bc1","others":"\u0b87\u0ba4\u0bb0","signature":"\u0b95","Administrationincome":"\u0ba8\u0bbf\u0bb0\u0bcd\u0bb5\u0bbe\u0b95\u0bb5\u0bb0\u0bb5\u0bc1","lineincome":"\u0bb2\u0baf\u0ba9\u0bcd\u0bb5\u0bb0\u0bb5\u0bc1","othersincome":"\u0b87\u0ba4\u0bb0\u0bb5\u0bb0\u0bb5\u0bc1","dailyrecordsgiven":"\u0b95\u0bca\u0b9f\u0bc1\u0ba4\u0bcd\u0ba4 \u0bb0\u0bc2\u0baa\u0bbe\u0baf\u0bcd & \u0b9a\u0bc6\u0bb2\u0bb5\u0bc1","dailyrecordsfinishedaccount":"\u0baa\u0bc8\u0ba9\u0bbe\u0ba9\u0bcd\u0bb8\u0bcd \u0bae\u0bc1\u0b9f\u0bbf\u0bb5\u0bc1\u0b85\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0ba3\u0bcd\u0b9f\u0bcd","noshort":"\u0bb5","booknoshort":"\u0baa\u0bc1","givenamountshort":"\u0b95\u0bca.\u0bb0\u0bc2","totalamounttooshort":"\u0bae\u0bca.\u0bb0\u0bc2","spendamountshort":"\u0b9a\u0bc6.\u0bb0\u0bc2","loangivenamountshort":"\u0b9a\u0bc0.\u0b95\u0bca.\u0bb0\u0bc2","loantotal":"\u0b9a\u0bc0.\u0bae\u0bca","noshorts":"\u0bb5\u0b8e","givenamounttooshort":"\u0b95\u0bca","loannotooshort":"\u0b9a\u0bc0.\u0b8e","countshort":"\u0b8e","smallno":"\u0b9a\u0bbf\u0bb5","shortvoucher":"\u0b9a\u0bbf","handsmoney":"\u0b95\u0bc8\u0baf\u0bbf\u0bb0\u0bc1\u0baa\u0bcd\u0baa\u0bc1\u0bb0\u0bc2","dailylist":"\u0ba4\u0bbf\u0ba9 \u0bb2\u0bbf\u0bb8\u0bcd\u0b9f\u0bcd","printdate":"\u0baa\u0bbf\u0bb0\u0bbf\u0ba3\u0bcd\u0b9f\u0bcd \u0ba4\u0bc7\u0ba4\u0bbf"}')}};d.ZP.use(c.Db).init({resources:u,lng:"en",keySeparator:!1,interpolation:{escapeValue:!1}});var m=n(184);var h=function(){var e=(0,c.$G)(),t=(e.t,e.i18n),n=(0,s.s0)();return(0,m.jsx)(a.Z,{collapseOnSelect:!0,expand:"lg",bg:"dark",variant:"dark",onSelect:function(e,a){a.preventDefault(),console.log("selected ".concat(e),a,a.target.innerText);var o=a.target.innerText;"English"===o?t.changeLanguage("en"):"Tamil"===o?t.changeLanguage("ta"):"Borrower"===o?n("/create"):"City"===o?n("/citycreate"):"LineMan"===o?n("/linemancreate"):"Loan"===o?n("/loan"):"Receipt"===o?n("/receipt"):"Ledger"===o?n("/ledger"):"LineChecking"===o?n("/linechecking"):"TotalLedger"===o&&n("/totalledger")},children:(0,m.jsxs)(o.Z,{children:[(0,m.jsx)(a.Z.Brand,{href:"#home",children:"Loan App"}),(0,m.jsx)(a.Z.Toggle,{"aria-controls":"responsive-navbar-nav"}),(0,m.jsx)(a.Z.Collapse,{id:"responsive-navbar-nav",children:(0,m.jsxs)(r.Z,{className:"ms-auto",as:"ul",children:[(0,m.jsx)(r.Z.Item,{children:(0,m.jsx)(r.Z.Link,{as:l.Z,to:"/create",children:"Home"})}),(0,m.jsxs)(i.Z,{title:"Language",id:"basic-nav-dropdown",children:[(0,m.jsx)(i.Z.Item,{href:"#",children:"English"}),(0,m.jsx)(i.Z.Item,{href:"#",children:"Tamil"})]}),(0,m.jsxs)(i.Z,{title:"Master",id:"basic-nav-dropdown",children:[(0,m.jsx)(i.Z.Item,{href:"create",children:"Borrower"}),(0,m.jsx)(i.Z.Item,{href:"citycreate",children:"City"}),(0,m.jsx)(i.Z.Item,{href:"linemancreate",children:"LineMan"})]}),(0,m.jsxs)(i.Z,{title:"Entry",id:"basic-nav-dropdown",children:[(0,m.jsx)(i.Z.Item,{href:"loan",children:"Loan"}),(0,m.jsx)(i.Z.Item,{href:"receipt",children:"Receipt"})]}),(0,m.jsxs)(i.Z,{title:"Report",id:"basic-nav-dropdown",children:[(0,m.jsx)(i.Z.Item,{href:"ledger",children:"Ledger"}),(0,m.jsx)(i.Z.Item,{href:"linechecking",children:"LineChecking"}),(0,m.jsx)(i.Z.Item,{href:"totalledger",children:"TotalLedger"})]})]})})]})})}}}]);
//# sourceMappingURL=473.23c16ee9.chunk.js.map