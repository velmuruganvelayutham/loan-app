"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[861],{5861:function(e,t,n){n.r(t),n.d(t,{default:function(){return N}});var s=n(9439),l=n(2791),i=n(1243),d=n(9743),c=n(7022),r=n(3855),a=n(2677),o=n(3360),x=n(2073),h=n(9230),j=n(5691),u=n(6868),p=n(3433),f=(n(7632),n(2591)),m=n(8116),y=n(184),g=[],S=function(e){var t=e.pendingLoans,n=e.date,i=e.company,d=(0,h.$G)(),c=d.t,r=(d.i18n,(0,l.useState)(1)),a=(0,s.Z)(r,2),o=a[0],x=a[1],j=35*o,S=j-35,b=t.slice(S,j),z=Math.ceil(Object.keys(t).length/35),v=(0,p.Z)(Array(z+1).keys()).slice(1),Z=0;g=b.length>0?t[0]:"",Z=35*(o-1);var k=0,N=0,w=0,C=0,F=0,L=0;return(0,y.jsxs)(l.Fragment,{children:[(0,y.jsx)("div",{className:"col-sm-6 fixed",children:(0,y.jsx)("h3",{children:i})}),(0,y.jsx)("div",{className:"col-sm-6 fixed",children:(0,y.jsx)("h3",{children:c("linechecking")})}),(0,y.jsx)("div",{className:"col-sm-3 fixed",children:c("city")+" : "+g.city}),(0,y.jsx)("div",{className:"col-sm-3 fixed",children:c("customer")+" : "+g.linemanname}),(0,y.jsx)("div",{className:"col-sm-2 fixed",children:c("line")+" : "+(t.length>0?g.lineno:"")}),(0,y.jsx)("div",{className:"col-sm-2 fixed",children:c("bookno")+" : "+(t.length>0?g.bookno:"")}),(0,y.jsx)("div",{className:"col-sm-2 fixed",children:c("date")+" : "+(0,u.sp)(n)}),(0,y.jsxs)("div",{children:[(0,y.jsxs)(f.Z,{className:"table text-center fs-6 table-bordered border-dark",children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("no")}),(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("startdate")}),(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("loanno")}),(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("customer")}),(0,y.jsx)("th",{colSpan:2,style:{fontSize:"12px"},children:c("fathername")}),(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("address")}),(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("phoneno")}),(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("enddate")}),(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("loanamount")}),(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("pay")}),(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("pending")})]})}),(0,y.jsxs)("tbody",{children:[b&&b.length>0?b.map((function(e,t){return Z+=1,w=e.totalamount-e.collectedtotal,k+=w,console.log(w+"muru"),C=e.collectedamountdate>0?0:e.dueamount,N+=C,F=e.addFields.receiptpendingweek>0&&e.addFields.receiptpendingweek<8?e.addFields.receiptpendingweek*e.dueamount:e.addFields.receiptpendingweek>=8?e.totalamount-e.collectedtotal:0,L+=F,(0,y.jsxs)("tr",{children:[(0,y.jsx)("td",{style:{fontSize:"12px"},children:Z}),(0,y.jsx)("td",{style:{fontSize:"12px"},children:(0,u.sp)(e.startdate)}),(0,y.jsx)("td",{style:{fontSize:"12px"},children:e.loannumber}),(0,y.jsx)("td",{style:{fontSize:"12px"},children:e.customer}),(0,y.jsx)("td",{style:{fontSize:"12px"},children:0==e.relationtype?c("fathershort"):c("husbandshort")}),(0,y.jsx)("td",{style:{fontSize:"12px"},children:e.fathername}),(0,y.jsx)("td",{style:{fontSize:"12px"},children:e.address}),(0,y.jsx)("td",{style:{fontSize:"12px"},children:e.mobileno}),(0,y.jsx)("td",{style:{fontSize:"12px"},children:(0,u.sp)(e.finisheddate)}),(0,y.jsx)("td",{style:{fontSize:"12px"},children:w}),(0,y.jsx)("td",{style:{fontSize:"12px"},children:C}),e.addFields.receiptpendingweek>2?(0,y.jsx)("td",{style:{backgroundColor:"black",color:"white",fontSize:"12px"},children:F}):e.addFields.receiptpendingweek<=2&&e.addFields.receiptpendingweek>0?(0,y.jsx)("td",{style:{fontSize:"12px"},children:F}):(0,y.jsx)("td",{style:{fontSize:"12px"}})]})})):c("tabledata"),(0,y.jsxs)("tr",{children:[(0,y.jsx)("td",{}),(0,y.jsx)("td",{}),(0,y.jsx)("td",{}),(0,y.jsx)("td",{}),(0,y.jsx)("td",{}),(0,y.jsx)("td",{}),(0,y.jsx)("td",{}),(0,y.jsx)("td",{}),(0,y.jsx)("td",{className:"fw-bold",style:{fontSize:"12px"},children:c("total")}),(0,y.jsx)("td",{className:"fw-bold",style:{fontSize:"12px"},children:k}),(0,y.jsx)("td",{className:"fw-bold",style:{fontSize:"12px"},children:N}),(0,y.jsx)("td",{className:"fw-bold",style:{fontSize:"12px"},children:L})]})]})]}),(0,y.jsx)("nav",{children:(0,y.jsxs)(m.Z,{children:[(0,y.jsx)(m.Z.Prev,{children:(0,y.jsx)("a",{href:"#",className:"page-link",onClick:function(){o!==S&&x(o-1)},children:c("pageprev")})}),v.map((function(e,t){return(0,y.jsx)(m.Z.Item,{children:(0,y.jsx)("a",{href:"#",className:"page-link",onClick:function(){x(e)},children:e})})})),(0,y.jsx)(m.Z.Next,{children:(0,y.jsx)("a",{href:"#",className:"page-link",onClick:function(){o!==j&&x(o+1)},children:c("pagenext")})})]})})]})]})},b=[],z=function(e){var t=e.pendingLoans,n=e.date,i=e.company,d=(0,h.$G)(),c=d.t,r=(d.i18n,(0,l.useState)(1)),a=(0,s.Z)(r,2),o=a[0],x=a[1],j=35*o,g=j-35,S=t.slice(g,j),z=Math.ceil(Object.keys(t).length/35),v=(0,p.Z)(Array(z+1).keys()).slice(1),Z=0;b=S.length>0?t[0]:"",Z=35*(o-1);var k=0,N=0;return(0,y.jsxs)(l.Fragment,{children:[(0,y.jsx)("div",{className:"col-sm-6 fixed",children:(0,y.jsx)("h3",{children:i})}),(0,y.jsx)("div",{className:"col-sm-6 fixed",children:(0,y.jsx)("h3",{children:c("previousweekdetails")})}),(0,y.jsx)("div",{className:"col-sm-2 fixed",children:c("line")+" : "+(t.length>0?b.lineno:"")}),(0,y.jsx)("div",{className:"col-sm-2 fixed",children:c("bookno")+" : "+(t.length>0?b.bookno:"")}),(0,y.jsx)("div",{className:"col-sm-2 fixed",children:c("date")+" : "+(0,u.sp)(n)}),(0,y.jsxs)("div",{children:[(0,y.jsxs)(f.Z,{className:"table text-center fs-6 table-bordered border-dark",children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("no")}),(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("startdate")}),(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("loanno")}),(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("customer")}),(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("due")}),(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("dueno")}),(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("totalcredit")}),(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("debitcredit")}),(0,y.jsx)("th",{style:{fontSize:"12px"},children:c("city")})]})}),(0,y.jsxs)("tbody",{children:[S&&S.length>0?S.map((function(e,t){return Z+=1,k+=e.dueamount,N+=e.collectedamount,e.collectedamount,e.dueamount,(0,y.jsxs)("tr",{children:[(0,y.jsx)("td",{style:{fontSize:"12px"},children:Z}),(0,y.jsx)("td",{style:{fontSize:"12px"},children:(0,u.sp)(e.startdate)}),(0,y.jsx)("td",{style:{fontSize:"12px"},children:e.loannumber}),(0,y.jsx)("td",{style:{fontSize:"12px"},children:e.customer}),(0,y.jsx)("td",{style:{fontSize:"12px"},children:e.dueamount}),(0,y.jsx)("td",{style:{fontSize:"12px"},children:e.weekno}),(0,y.jsx)("td",{style:{fontSize:"12px"},children:e.collectedamount}),(0,y.jsx)("td",{style:{fontSize:"12px"},children:e.collectedamount}),(0,y.jsx)("td",{style:{fontSize:"12px"},children:e.city})]})})):c("tabledata"),(0,y.jsxs)("tr",{children:[(0,y.jsx)("td",{}),(0,y.jsx)("td",{}),(0,y.jsx)("td",{}),(0,y.jsx)("td",{className:"fw-bold",style:{fontSize:"12px"},children:c("total")}),(0,y.jsx)("td",{className:"fw-bold",style:{fontSize:"12px"},children:k}),(0,y.jsx)("td",{}),(0,y.jsx)("td",{className:"fw-bold",style:{fontSize:"12px"},children:N}),(0,y.jsx)("td",{className:"fw-bold",style:{fontSize:"12px"},children:N}),(0,y.jsx)("td",{})]})]})]}),(0,y.jsx)("nav",{children:(0,y.jsxs)(m.Z,{children:[(0,y.jsx)(m.Z.Prev,{children:(0,y.jsx)("a",{href:"#",className:"page-link",onClick:function(){o!==g&&x(o-1)},children:c("pageprev")})}),v.map((function(e,t){return(0,y.jsx)(m.Z.Item,{children:(0,y.jsx)("a",{href:"#",className:"page-link",onClick:function(){x(e)},children:e})})})),(0,y.jsx)(m.Z.Next,{children:(0,y.jsx)("a",{href:"#",className:"page-link",onClick:function(){o!==j&&x(o+1)},children:c("pagenext")})})]})})]})]})},v=n(1146),Z=n.n(v),k="checkingdetails";var N=function(){var e=(0,l.useState)([]),t=(0,s.Z)(e,2),n=t[0],p=t[1],f=(0,l.useState)(!1),m=(0,s.Z)(f,2),g=m[0],b=m[1],v=(0,l.useState)(""),N=(0,s.Z)(v,2),w=N[0],C=N[1],F=(0,l.useState)([]),L=(0,s.Z)(F,2),G=L[0],_=L[1],J=(0,l.useState)([]),R=(0,s.Z)(J,2),$=R[0],A=R[1],D=(0,l.useState)(0),E=(0,s.Z)(D,2),I=E[0],M=E[1],O=(0,h.$G)(),P=O.t,V=(O.i18n,(0,l.useState)("")),q=(0,s.Z)(V,2),B=q[0],H=q[1],K=(0,l.useRef)(null),Q=(0,l.useRef)((0,u.zJ)());(0,l.useEffect)((function(){b(!0),i.Z.get("".concat(x.v,"/company/get")).then((function(e){A(e.data),console.log(e.data),b(!1)})).catch((function(e){console.log("error=",e),C(P("ermururor")),b(!1)}))}),[]),(0,l.useEffect)((function(){b(!0),i.Z.get("".concat(x.v,"/citycreate/get")).then((function(e){p(e.data),b(!1)})).catch((function(e){console.log("error=",e),C(P("errormessagecity")),b(!1)}))}),[]);var T=(0,l.useRef)(),U=function(){window.print()},W=(0,y.jsx)(d.Z,{ref:T,children:(0,y.jsx)(S,{pendingLoans:G,date:Q.current.value,company:$[0].companyname})}),X=(0,y.jsx)(d.Z,{ref:T,children:(0,y.jsx)(z,{pendingLoans:G,date:Q.current.value,company:$[0].companyname})});return(0,y.jsx)(c.Z,{children:(0,y.jsx)(d.Z,{children:(0,y.jsxs)(r.Z,{children:[(0,y.jsxs)(d.Z,{children:[(0,y.jsx)(a.Z,{xs:12,md:5,className:"rounder bg-white",children:(0,y.jsxs)(r.Z.Group,{className:"mb-3",name:"linenumber",border:"primary",children:[(0,y.jsx)(r.Z.Label,{children:P("city")}),(0,y.jsxs)(r.Z.Select,{"aria-label":"Default select example",value:B,onChange:function(e){return H(e.target.value)},required:!0,children:[(0,y.jsx)("option",{value:"",children:P("cityplaceholder")},""),n.map((function(e){return(0,y.jsx)("option",{value:e._id,selected:e._id,children:e.cityname},e._id)}))]})]})}),(0,y.jsx)(a.Z,{md:3,className:"rounder bg-white",children:(0,y.jsxs)(r.Z.Group,{className:"mb-3",name:"cityname",border:"primary",children:[(0,y.jsx)(r.Z.Label,{children:P("city")}),(0,y.jsxs)(r.Z.Select,{"aria-label":"Default select example",onChange:function(e){return M(e.target.value)},value:I,children:[(0,y.jsx)("option",{value:0,children:P("linechecking")}),(0,y.jsx)("option",{value:1,children:P("previousweekreport")})]})]})}),(0,y.jsx)(a.Z,{md:2,className:"rounded bg-white",children:(0,y.jsxs)(r.Z.Group,{children:[(0,y.jsx)(r.Z.Label,{children:P("startdate")}),(0,y.jsx)(r.Z.Control,{type:"date",ref:K,defaultValue:(0,u.zJ)()})]})}),(0,y.jsx)(a.Z,{md:2,className:"rounder bg-white",children:(0,y.jsxs)(r.Z.Group,{children:[(0,y.jsx)(r.Z.Label,{children:P("enddate")}),(0,y.jsx)(r.Z.Control,{type:"date",ref:Q,defaultValue:(0,u.zJ)(),disabled:0!=I})]})})]}),(0,y.jsxs)(d.Z,{className:"rounded bg-white text-center",children:[(0,y.jsxs)("div",{className:"col-md-6 mb-4 ",children:[(0,y.jsx)(o.Z,{variant:"primary",size:"lg",type:"button",className:"text-center",onClick:function(){return b(!0),k=0==I?"checkingdetails":"previousweekdetails",i.Z.get("".concat(x.v,"/loan/").concat(k),{params:{city_id:B.toString(),fromdate:K.current.value,todate:Q.current.value}}).then((function(e){_(e.data),console.log(e.data),b(!1)})).catch((function(e){console.log("error=",e),C(P("erroressagelinechecking")),b(!1)}))},children:P("processbuttonlabel")})," "]}),(0,y.jsx)("div",{className:"col-md-6 mb-4 ",children:(0,y.jsx)(Z(),{trigger:function(){return(0,y.jsx)(o.Z,{variant:"primary",size:"lg",type:"button",className:"text-center",onClick:function(){return U},children:P("printbutton")})},content:function(){return T.current}})})]}),g?(0,y.jsx)(j.Z,{}):0==I?W:X,w&&(0,y.jsx)("div",{className:"error",children:w})]})})})}}}]);
//# sourceMappingURL=861.d6c08f2a.chunk.js.map