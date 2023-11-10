"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[998],{5998:function(e,r,n){n.r(r);var a=n(9439),t=n(2791),l=n(7022),u=n(9743),s=n(3855),c=n(2677),o=n(3360),d=n(1243),i=n(2073),m=n(6868),x=n(9230),h=n(5691),b=n(184),Z=0;r.default=function(){function e(){var e=new Date(te),r=new Date(e.setDate(e.getDate()+7*(V-1)));return new Date(r).toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"}).split("/").reverse().join("-")}var r=(0,t.useState)(""),n=(0,a.Z)(r,2),v=n[0],j=n[1],p=(0,x.$G)(),f=p.t,g=(p.i18n,(0,t.useState)(!1)),y=(0,a.Z)(g,2),N=y[0],w=y[1],C=(0,t.useState)([]),L=(0,a.Z)(C,2),G=L[0],k=L[1],R=(0,t.useState)([]),q=(0,a.Z)(R,2),S=q[0],D=q[1],_=(0,t.useState)(),z=(0,a.Z)(_,2),E=z[0],F=z[1],J=(0,t.useState)(25),B=(0,a.Z)(J,2),V=B[0],P=B[1],T=(0,t.useState)(""),A=(0,a.Z)(T,2),H=A[0],I=A[1],M=(0,t.useState)([]),O=(0,a.Z)(M,2),U=O[0],W=O[1],$=(0,t.useRef)(null),K=(0,t.useRef)(null),Q=(0,t.useRef)(null),X=(0,t.useRef)(null),Y=(0,t.useRef)(null),ee=(0,t.useRef)(null),re=(0,t.useRef)(null),ne=(0,t.useState)((0,m.zJ)()),ae=(0,a.Z)(ne,2),te=ae[0],le=ae[1],ue=(0,t.useRef)(null),se=(0,t.useRef)(null),ce=(0,t.useRef)(null),oe=(0,t.useRef)(null),de=(0,t.useRef)(null),ie=(0,t.useRef)(null),me=(0,t.useRef)(null),xe=(0,t.useRef)(null),he=(0,t.useRef)(null),be=(0,t.useRef)(null),Ze=(0,t.useRef)(null),ve=(0,t.useRef)(null),je=(0,t.useRef)(null),pe=(0,t.useRef)(null),fe=(0,t.useRef)(null),ge=(0,t.useState)(!1),ye=(0,a.Z)(ge,2),Ne=ye[0],we=ye[1],Ce=(0,t.useState)(!1),Le=(0,a.Z)(Ce,2),Ge=Le[0],ke=Le[1];(0,t.useEffect)((function(){w(!0),d.Z.get("".concat(i.v,"/get/view")).then((function(e){k(e.data),w(!1)})).catch((function(e){console.log("error=",e),j(f("errormessagecustomer")),w(!1)}))}),[]),(0,t.useEffect)((function(){w(!0),d.Z.get("".concat(i.v,"/linemancreate/get")).then((function(e){D(e.data),w(!1)})).catch((function(e){console.log("error=",e),j(f("errormessagelineman")),w(!1)}))}),[]),(0,t.useEffect)((function(){w(!0),d.Z.get("".concat(i.v,"/loancreate/get/max")).then((function(e){var r=e.data;w(!1),Z=r.length>0?r[0].maxCode+1:1,pe.current.value=Z})).catch((function(e){console.log("error=",e),j(f("errormessageloannumber")),w(!1)}))}),[Ge]),(0,t.useEffect)((function(){w(!0),d.Z.get("".concat(i.v,"/linemancreate/get/lines")).then((function(e){W(e.data),w(!1)})).catch((function(e){console.log("error=",e),j(f("errormessageline")),w(!1)}))}),[]),(0,t.useEffect)((function(){document.addEventListener("keydown",(function(e){if("Enter"===e.key&&"INPUT"===e.target.nodeName){var r=e.target.form,n=Array.prototype.indexOf.call(r,e.target);r.elements[n+1].focus(),e.preventDefault()}}))}),[]);var Re=function(e){!1===e.currentTarget.checkValidity()&&e.stopPropagation(),we(!0),""!==me.current.value&&""!==xe.current.value&&""!==he.current.value&&Ze.current.value,""!==be.current.value&&""!==be.current.value&""!==V&&""!==H&&0!==H&&qe()},qe=function(){d.Z.post("".concat(i.v,"/loancreate/save"),{loanno:Z,customer_id:me.current.value,lineman_id:xe.current.value,city_id:oe.current.value,weekno:he.current.value,bookno:Ze.current.value,lineno:be.current.value,document:ve.current.value,cheque:je.current.value,weekcount:V,startdate:new Date(te),givendate:new Date(ee.current.value),duedate:new Date(re.current.value),finisheddate:new Date(ue.current.value),givenamount:Number(H),documentamount:Number($.current.value),interestamount:Number(K.current.value),totalamount:Number(Q.current.value),dueamount:Number(X.current.value),paidamount:Number(Y.current.value)}).then((function(e){Se()})).catch((function(e){console.log("error=",e),j(f("errormessagesaveloan")),w(!1)})),alert(f("savealertmessage"))};function Se(){me.current.value="",xe.current.value="",F(""),se.current.value="",ce.current.value="",oe.current.value="",de.current.value="",ie.current.value="",be.current.value="",he.current.value="",Ze.current.value="",ve.current.value="",je.current.value="",le((0,m.zJ)()),ee.current.value=(0,m.zJ)(),I(""),$.current.value="",K.current.value="",Q.current.value="",X.current.value="",Y.current.value="",fe.current.value="",ke((function(e){return!e}))}return(0,b.jsx)(l.Z,{className:"rounded bg-white mt-5",children:(0,b.jsx)(u.Z,{className:"justify-content-md-center mt-5 ",children:(0,b.jsxs)(s.Z,{noValidate:!0,validated:Ne,onSubmit:Re,children:[(0,b.jsxs)(u.Z,{children:[(0,b.jsx)(c.Z,{xs:12,md:4,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("loanno")})," ",(0,b.jsx)(s.Z.Control,{ref:pe,type:"number",required:!0})]})}),(0,b.jsx)(c.Z,{xs:12,md:2,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("oldno")}),(0,b.jsx)(s.Z.Control,{ref:fe,type:"number",placeholder:f("oldno"),onBlur:function(){""!=fe.current.value&&d.Z.get("".concat(i.v,"/loancreate/get/oldLoanRef"),{params:{loanno:Number(fe.current.value)}}).then((function(e){var r=e.data;me.current.value=r[0].customer_id,xe.current.value=r[0].lineman_id,F(r[0].mobileno),se.current.value=r[0].fathername,ce.current.value=r[0].cityname,oe.current.value=r[0].city,de.current.value=r[0].address,ie.current.value=r[0].work,be.current.value=r[0].lineno,he.current.value=r[0].weekno,Ze.current.value=r[0].bookno,ve.current.value=r[0].document,je.current.value=r[0].cheque,I(r[0].givenamount),$.current.value=r[0].documentamount,K.current.value=r[0].interestamount,Q.current.value=r[0].totalamount,X.current.value=r[0].dueamount,Y.current.value=r[0].paidamount}))}})]})}),(0,b.jsx)(c.Z,{xs:12,md:3,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"customername",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("customer")}),(0,b.jsxs)(s.Z.Select,{"aria-label":"Default select example",ref:me,onChange:function(e){return function(e){var r=G.filter((function(r){return r._id===e.target.value}));0==me.current.value?(F(""),se.current.value="",ce.current.value="",oe.current.value="",de.current.value="",ie.current.value="",be.current.value=0):(F(r[0].mobileno),se.current.value=r[0].fathername,ce.current.value=r[0].cityname,oe.current.value=r[0].city_id,de.current.value=r[0].address,ie.current.value=r[0].work,be.current.value=r[0].lineno)}(e)},required:!0,autoFocus:!0,children:[(0,b.jsx)("option",{value:"",children:f("customerplaceholder")}),G.map((function(e,r){return(0,b.jsx)("option",{value:e._id,children:e.customer})}))]})]})}),(0,b.jsx)(c.Z,{xs:12,md:3,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"linemanname",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("lineman")}),(0,b.jsxs)(s.Z.Select,{"aria-label":"Default select example",ref:xe,required:!0,children:[(0,b.jsx)("option",{value:"",children:f("linemanplaceholder")}),S.map((function(e){return(0,b.jsx)("option",{value:e._id,children:e.linemanname})}))]})]})})]}),(0,b.jsxs)(u.Z,{children:[(0,b.jsx)(c.Z,{xs:12,md:4,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"mobilenumber",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("phoneno")})," ",(0,b.jsx)(s.Z.Control,{type:"number",disabled:!0,value:E,onChange:function(e){return F(e.target.value)}})]})}),(0,b.jsx)(c.Z,{xs:12,md:4,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"fathername",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("fathername")}),(0,b.jsx)(s.Z.Control,{ref:se,type:"text",disabled:!0})]})}),(0,b.jsx)(c.Z,{xs:12,md:4,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"cityname",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("city")})," ",(0,b.jsx)(s.Z.Control,{ref:ce,type:"text",disabled:!0})]})}),(0,b.jsx)(c.Z,{xs:12,md:4,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"d-none",name:"cityname",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("city")})," ",(0,b.jsx)(s.Z.Control,{ref:oe,type:"text"})]})})]}),(0,b.jsxs)(u.Z,{children:[(0,b.jsx)(c.Z,{xs:12,md:4,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"address1",border:"primary",children:[(0,b.jsxs)(s.Z.Label,{children:[f("address")," "]}),(0,b.jsx)(s.Z.Control,{ref:de,type:"text",disabled:!0})]})}),(0,b.jsx)(c.Z,{xs:12,md:4,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"work",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("work")}),(0,b.jsx)(s.Z.Control,{ref:ie,type:"text",disabled:!0})]})}),(0,b.jsx)(c.Z,{xs:12,md:4,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"lineno",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("line")}),(0,b.jsxs)(s.Z.Select,{"aria-label":"Default select example",ref:be,required:!0,children:[(0,b.jsx)("option",{value:"",children:f("citylineplaceholder")}),U.map((function(e){return(0,b.jsx)("option",{value:e.lineno,children:e.linename})}))]})]})})]}),(0,b.jsxs)(u.Z,{children:[(0,b.jsx)(c.Z,{xs:12,md:3,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"weekno",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("weekno")}),(0,b.jsx)(s.Z.Control,{type:"number",placeholder:f("weeknoplaceholder"),required:!0,ref:he})]})}),(0,b.jsx)(c.Z,{xs:12,md:3,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"bookno",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("bookno")}),(0,b.jsx)(s.Z.Control,{type:"number",placeholder:f("booknoplaceholder"),required:!0,ref:Ze})]})}),(0,b.jsx)(c.Z,{xs:12,md:2,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"doument",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("document")}),(0,b.jsx)(s.Z.Control,{type:"text",placeholder:f("document"),ref:ve})]})}),(0,b.jsx)(c.Z,{xs:12,md:2,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"cheque",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("cheque")}),(0,b.jsx)(s.Z.Control,{type:"number",placeholder:f("cheque"),ref:je})]})}),(0,b.jsx)(c.Z,{xs:12,md:2,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"bookno",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("week")}),(0,b.jsx)(s.Z.Control,{className:"bg-info text-center",size:"lg",type:"number",placeholder:"How Many Weeks",required:!0,value:V,onChange:function(e){return P(e.target.value)}})]})})]}),(0,b.jsxs)(u.Z,{children:[(0,b.jsx)(c.Z,{xs:12,md:3,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"startdate",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("startdatedetail")}),(0,b.jsx)(s.Z.Control,{type:"date",required:!0,value:te,onChange:function(e){return le(e.target.value)},onBlur:e})]})}),(0,b.jsx)(c.Z,{xs:12,md:3,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"givendate",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("givendatedetail")}),(0,b.jsx)(s.Z.Control,{type:"date",ref:ee,required:!0,defaultValue:(0,m.zJ)()})]})}),(0,b.jsx)(c.Z,{xs:12,md:3,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"givendate",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("payingdate")}),(0,b.jsx)(s.Z.Control,{type:"date",ref:re,required:!0,defaultValue:(0,m.zJ)()})]})}),(0,b.jsx)(c.Z,{xs:12,md:3,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("enddatedetail")}),(0,b.jsx)(s.Z.Control,{type:"date",ref:ue,required:!0,value:e()})]})})]}),(0,b.jsxs)(u.Z,{children:[(0,b.jsx)(c.Z,{xs:12,md:2,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"givenmoney",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("givenamountdetail")}),(0,b.jsx)(s.Z.Control,{className:"text-end",type:"number",value:H,required:!0,onChange:function(e){return I(Number(e.target.value))},onBlur:function(){var e=Number(H),r=50*e/1e3;$.current.value=r.toFixed(2);var n=20*e/100;K.current.value=n.toFixed(2);var a=e+r+n;Q.current.value=a.toFixed(2);var t=a/25;X.current.value=t.toFixed(2),I(e.toFixed(2))}})]})}),(0,b.jsx)(c.Z,{xs:12,md:2,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"documentcharge",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("documentchargedetail")}),(0,b.jsx)(s.Z.Control,{ref:$,className:"text-end",type:"text",required:!0})]})}),(0,b.jsx)(c.Z,{xs:12,md:2,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"interest",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("interest")}),(0,b.jsx)(s.Z.Control,{className:"text-end",type:"text",required:!0,ref:K})]})}),(0,b.jsx)(c.Z,{xs:12,md:2,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"totalamount",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("total")}),(0,b.jsx)(s.Z.Control,{className:"text-end",type:"text",required:!0,ref:Q})]})}),(0,b.jsx)(c.Z,{xs:12,md:2,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"dueamount",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("due")}),(0,b.jsx)(s.Z.Control,{className:"text-end",type:"text",required:!0,ref:X})]})}),(0,b.jsx)(c.Z,{xs:12,md:2,className:"rounded bg-white",children:(0,b.jsxs)(s.Z.Group,{className:"mb-3",name:"paidamount",border:"primary",children:[(0,b.jsx)(s.Z.Label,{children:f("paidamountdetail")}),(0,b.jsx)(s.Z.Control,{className:"text-end",type:"text",required:!0,ref:Y})]})})]}),(0,b.jsx)(u.Z,{children:(0,b.jsxs)("div",{className:"col-md-12 text-center mb-2 ",children:[(0,b.jsx)(o.Z,{variant:"primary",size:"lg",type:"button",className:"text-center",onClick:Re,children:f("savebutton")})," ",(0,b.jsx)(o.Z,{variant:"primary",size:"lg",type:"button",className:"text-center",onClick:Se,children:f("newbutton")})]})}),(0,b.jsxs)(u.Z,{children:[N?(0,b.jsx)(h.Z,{}):null,v&&(0,b.jsx)("div",{className:"error",children:v})]})]})})})}}}]);
//# sourceMappingURL=998.4d784884.chunk.js.map