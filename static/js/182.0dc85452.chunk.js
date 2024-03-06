"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[182],{8182:function(e,t,n){n.r(t);var a=n(4942),r=n(1413),o=n(3433),c=n(9439),s=n(2791),l=n(7022),u=n(3855),i=n(9743),d=n(2677),m=n(3360),p=n(1243),h=n(2073),f=n(2591),x=n(6868),v=n(9230),j=n(5691),g=n(184);function Z(e){var t=e.rowsData,n=e.deleteTableRows,a=e.handleChange,r=e.RestoreLoan,o=e.isRestore;return t.map((function(e,t){var c=e.serialno,s=e.loanno,l=e.customer_id,u=e.customername,i=e.loanamount,d=e.dueamount,p=e.weekno,h=e.amount;return(0,g.jsxs)("tr",{children:[(0,g.jsx)("td",{children:(0,g.jsx)("input",{type:"text",value:c,name:"serialno",className:"form-control",disabled:!0})}),(0,g.jsx)("td",{children:(0,g.jsx)("input",{type:"text",value:s,onChange:function(e){return a(t,e)},name:"loanno",className:"form-control",onBlur:function(e){return r(e,t)},disabled:o})}),(0,g.jsx)("td",{style:{display:"none"},children:(0,g.jsx)("input",{type:"text",value:l,name:"customer_id",className:"form-control"})}),(0,g.jsx)("td",{children:(0,g.jsx)("input",{type:"text",value:u,name:"customername",className:"form-control",disabled:!0})}),(0,g.jsxs)("td",{children:[(0,g.jsx)("input",{type:"text",value:i,name:"loanamount",className:"form-control",disabled:!0})," "]}),(0,g.jsxs)("td",{children:[(0,g.jsx)("input",{type:"text",value:d,name:"dueamount",className:"form-control",disabled:!0})," "]}),(0,g.jsxs)("td",{children:[(0,g.jsx)("input",{type:"number",value:p,onChange:function(e){return a(t,e)},name:"weekno",className:"form-control"})," "]}),(0,g.jsxs)("td",{children:[(0,g.jsx)("input",{type:"number",value:h,onChange:function(e){return a(t,e)},name:"amount",className:"form-control"})," "]}),(0,g.jsx)("td",{children:(0,g.jsx)(m.Z,{className:"btn btn-danger",onClick:function(){return n(t)},children:"x"})})]},t)}))}t.default=function(){var e=(0,v.$G)(),t=e.t,n=(e.i18n,(0,s.useState)([])),b=(0,c.Z)(n,2),y=b[0],w=b[1],N=(0,s.useState)(!1),k=(0,c.Z)(N,2),_=k[0],S=k[1],C=(0,s.useState)(""),R=(0,c.Z)(C,2),z=R[0],D=R[1],L=(0,s.useRef)((0,x.zJ)()),E=(0,s.useState)(!1),G=(0,c.Z)(E,2),J=G[0],T=G[1],A=(0,s.useState)([]),B=(0,c.Z)(A,2),O=B[0],I=B[1],P=(0,s.useState)(!1),U=(0,c.Z)(P,2),V=U[0],$=U[1],q=(0,s.useRef)(""),F=(0,s.useState)(!1),H=(0,c.Z)(F,2),K=H[0],M=H[1],Q=(0,s.useState)(!1),W=(0,c.Z)(Q,2),X=W[0],Y=W[1];(0,s.useEffect)((function(){S(!0),p.Z.get("".concat(h.v,"/receipt1/get/reference")).then((function(e){q.current.value=e.data[0].receiptreference+(e.data[0].receiptcode+1),I(e.data),S(!1)})).catch((function(e){console.log("error=",e),D(t("errormessagecustomer")),S(!1)}))}),[V]),(0,s.useEffect)((function(){document.addEventListener("keydown",(function(e){if("Enter"===e.key&&"INPUT"===e.target.nodeName){var t=e.target.form,n=Array.prototype.indexOf.call(t,e.target);t.elements[n+1].focus(),e.preventDefault()}}))}),[]);var ee=function(){w([]),M(!1),$((function(e){return!e})),L.current.value=(0,x.zJ)()};return(0,g.jsx)(l.Z,{children:(0,g.jsxs)(u.Z,{children:[(0,g.jsxs)(i.Z,{children:[(0,g.jsx)(d.Z,{xs:12,md:3,className:"rounded bg-white",children:(0,g.jsxs)(u.Z.Group,{className:"mb-3",name:"startdate",border:"primary",children:[(0,g.jsx)(u.Z.Label,{children:t("receiptno")}),(0,g.jsx)(u.Z.Control,{type:"text",ref:q,onBlur:function(){""!=q.current.value&&p.Z.get("".concat(h.v,"/receipt1/get"),{params:{receiptno:q.current.value.toString()}}).then((function(e){Y(!0);var t=e.data;if(t.length>0){var n=(0,x.vc)(t[0].receiptdate);L.current.value=n;var a=t.map((function(e,t){return{serialno:t+1,loanno:e.loannumber,customer_id:e.customer_id,customername:e.customer,loanamount:e.balance+e.collectedamount,dueamount:e.dueamount,weekno:e.weekno,amount:e.collectedamount}}));w(a),Y(!0),M(!0)}else ee()})),Y(!1)}})]})}),(0,g.jsx)(d.Z,{xs:12,md:3,className:"rounded bg-white",children:(0,g.jsxs)(u.Z.Group,{className:"mb-3",name:"startdate",border:"primary",children:[(0,g.jsx)(u.Z.Label,{children:t("date")}),(0,g.jsx)(u.Z.Control,{type:"date",placeholder:"loan start date",ref:L,defaultValue:(0,x.zJ)()})]})})]}),(0,g.jsx)(i.Z,{className:"justify-content-md-center mt-5 ",children:(0,g.jsxs)(f.Z,{className:"table table-striped table-primary table-hover text-center  table-bordered border-dark",size:"sm",children:[(0,g.jsx)("thead",{children:(0,g.jsxs)("tr",{children:[(0,g.jsx)("th",{children:t("no")}),(0,g.jsx)("th",{children:t("loanno")}),(0,g.jsx)("th",{style:{display:"none"},children:t("customerid")}),(0,g.jsx)("th",{children:t("customer")}),(0,g.jsx)("th",{children:t("loanamount")}),(0,g.jsx)("th",{children:t("due")}),(0,g.jsx)("th",{children:t("weekno")}),(0,g.jsx)("th",{children:t("amount")}),(0,g.jsx)("th",{children:(0,g.jsx)(m.Z,{className:"btn btn-success",onClick:function(){Y(!1);var e={serialno:y.length+1,loanno:"",customer_id:"",customername:"",loanamount:"",dueamount:"",weekno:"",amount:""};w([].concat((0,o.Z)(y),[e]))},children:"+"})})]})}),(0,g.jsx)("tbody",{children:(0,g.jsx)(Z,{rowsData:y,deleteTableRows:function(e){var t=(0,o.Z)(y);t.splice(e,1),w(t)},handleChange:function(e,n){var a=n.target,r=a.name,c=a.value,s=(0,o.Z)(y);"amount"==n.target.name&&c>s[e].loanamount?(alert(t("greateramountthanloan")),s[e][r]=s[e].amount):(s[e][r]=c,w(s))},RestoreLoan:function(e,n){""!==e.target.value&&function(e,n,o){S(!0),p.Z.get("".concat(h.v,"/receipt1/get/loanpendingduplicate"),{params:{loanno:n,receiptdate:(0,x.vc)(L.current.value).toString()}}).then((function(c){if(c.data.length>0){var s=0;if(y.find((function(e,t){n===e.loanno&&t!==o&&(s=1)})),0===s){var l=y.map((function(e,t){var n;return t===o?(0,r.Z)((0,r.Z)({},e),{},(n={},(0,a.Z)(n,"customer_id",c.data[0]._id.customer_id),(0,a.Z)(n,"customername",c.data[0]._id.customer),(0,a.Z)(n,"loanamount",c.data[0].pending),(0,a.Z)(n,"dueamount",c.data[0]._id.dueamount),n)):e}));w(l)}else{alert(t("loanentryexist"));var u=y.map((function(e,t){return t===o?(0,r.Z)((0,r.Z)({},e),{},(0,a.Z)({},"loanno","")):e}));w(u)}S(!1)}else{alert(t("loanentrynotexist"));var i=e.target.form,d=Array.prototype.indexOf.call(i,e.target);e.target.value="",i.elements[d].focus(),S(!1)}})).catch((function(e){console.log("error=",e),D(t("errormessageloan")),S(!1)}))}(e,e.target.value,n)},isRestore:X})})]})}),(0,g.jsxs)(i.Z,{children:[_?(0,g.jsx)(j.Z,{}):null,z&&(0,g.jsx)("div",{className:"error",children:z})]}),(0,g.jsxs)(i.Z,{children:[(0,g.jsx)(d.Z,{}),(0,g.jsxs)(d.Z,{className:"col-md-6",children:[(0,g.jsx)(m.Z,{variant:"primary",size:"lg",type:"button",className:"text-center",onClick:function(){K?function(){var e=y.map((function(e){return{receiptnumber:q.current.value.toString(),loannumber:e.loanno,receiptdate:new Date(L.current.value),customer_id:e.customer_id,weekno:e.weekno,collectedamount:e.amount}}));T(!0),p.Z.post("".concat(h.v,"/receipt1/update/details"),{items:e,receiptno:q.current.value.toString()}).then((function(e){w([]),ee(),T(!1),alert(t("savealertmessage"))})).catch((function(e){console.log("error=",e),D(t("errormessagesavereceipt")),T(!1)}))}():function(){var e=y.map((function(e){if(e.amount>0)return{receiptnumber:q.current.value.toString(),loannumber:e.loanno,receiptdate:new Date(L.current.value),customer_id:e.customer_id,weekno:e.weekno,collectedamount:e.amount}}));T(!0),p.Z.post("".concat(h.v,"/receipt1/save/details"),{items:e,receiptref:q.current.value.toString(),receiptcode:Number(O[0].receiptcode)+1,receiptdate:new Date(L.current.value)}).then((function(e){w([]),ee(),T(!1),alert(t("savealertmessage"))})).catch((function(e){console.log("error=",e),D(t("errormessagesavereceipt")),T(!1)}))}()},disabled:J,children:t(K?"updatebutton":"savebutton")})," ",(0,g.jsx)(m.Z,{variant:"primary",size:"lg",type:"button",className:"text-center",onClick:ee,children:t("newbutton")})," ",(0,g.jsx)(m.Z,{variant:"primary",size:"lg",type:"button",className:"text-center",onClick:function(){window.confirm(t("deleteyesnoalert"))&&p.Z.delete("".concat(h.v,"/receipt1/delete/").concat(q.current.value.toString())).then((function(e){alert(t("deletemessage")),ee()})).catch((function(e){console.log("error=",e),D(t("errormessagedeletereceipt")),S(!1),T(!1)}))},disabled:!K,children:t("deletebutton")})]}),(0,g.jsx)(d.Z,{})]})]})})}}}]);
//# sourceMappingURL=182.0dc85452.chunk.js.map