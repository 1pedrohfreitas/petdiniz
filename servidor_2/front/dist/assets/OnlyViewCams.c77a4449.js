import{c as h,r as s,j as x,a,J as g,T as y,U as M,V,W as w}from"./index.7270cd43.js";import{l as b}from"./petdiniz.868b0f8c.js";import{A as j}from"./AppBar.57571800.js";function O(v){const{token:o}=h(),[n,c]=s.exports.useState([]),[d,l]=s.exports.useState(0),[i,m]=s.exports.useState(0),[p,r]=s.exports.useState(!1);async function u(){V(`onlyaccesscam/${o}`,o).then(t=>{t.data.data!=null&&c(t.data.data.map((e,C)=>a(w,{camAlias:e.alias,camIcon:e.icon.sourceimg,camUrlVideo:e.urlcamstream,handleOpenModal:f},C)))})}s.exports.useEffect(()=>{u()},[]);const f=(t,e)=>{l(t),m(e),r(!0)};return x("div",{children:[a(g,{sx:{flexGrow:1,width:"100%",justifyContent:"space-between"},children:a(j,{position:"static",style:{background:"rgba(255,150,0,255)"},children:a(y,{children:a("div",{className:"homeHeaderLogo",children:a("img",{src:b,alt:"logo"})})})})}),a("div",{className:"listMyCams",children:n}),a(M,{camId:d,urlVideo:i,openModalCam:p,handleCloseModal:()=>{l(0),r(!1)}})]})}export{O as OnlyViewCams};
