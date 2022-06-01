import{r as a,a as s,_ as h,j as te}from"./index.b0e91862.js";import{h as ve,i as $,o as I,g as P,a as N,e as T,s as y,P as ne,d as R,j as K,l as Z,u as H,_ as w,c as B,b as W,k as Ce,m as xe}from"./ButtonBase.4fe4f374.js";import{I as ke,G as be}from"./Grow.67318f79.js";import{C as ye}from"./Close.fd9a01c4.js";function q(e){return e.substring(2).toLowerCase()}function Ee(e,t){return t.documentElement.clientWidth<e.clientX||t.documentElement.clientHeight<e.clientY}function Me(e){const{children:t,disableReactTree:n=!1,mouseEvent:r="onClick",onClickAway:o,touchEvent:f="onTouchEnd"}=e,m=a.exports.useRef(!1),p=a.exports.useRef(null),C=a.exports.useRef(!1),u=a.exports.useRef(!1);a.exports.useEffect(()=>(setTimeout(()=>{C.current=!0},0),()=>{C.current=!1}),[]);const x=ve(t.ref,p),v=$(l=>{const g=u.current;u.current=!1;const d=I(p.current);if(!C.current||!p.current||"clientX"in l&&Ee(l,d))return;if(m.current){m.current=!1;return}let c;l.composedPath?c=l.composedPath().indexOf(p.current)>-1:c=!d.documentElement.contains(l.target)||p.current.contains(l.target),!c&&(n||!g)&&o(l)}),E=l=>g=>{u.current=!0;const d=t.props[l];d&&d(g)},k={ref:x};return f!==!1&&(k[f]=E(f)),a.exports.useEffect(()=>{if(f!==!1){const l=q(f),g=I(p.current),d=()=>{m.current=!0};return g.addEventListener(l,v),g.addEventListener("touchmove",d),()=>{g.removeEventListener(l,v),g.removeEventListener("touchmove",d)}}},[v,f]),r!==!1&&(k[r]=E(r)),a.exports.useEffect(()=>{if(r!==!1){const l=q(r),g=I(p.current);return g.addEventListener(l,v),()=>{g.removeEventListener(l,v)}}},[v,r]),s(a.exports.Fragment,{children:a.exports.cloneElement(t,k)})}function Re(e){return P("MuiAlert",e)}const Se=N("MuiAlert",["root","action","icon","message","filled","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]);var Y=Se,Le=T(s("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),Ae=T(s("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),Oe=T(s("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),we=T(s("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),J;const Te=["action","children","className","closeText","color","icon","iconMapping","onClose","role","severity","variant"],ze=e=>{const{variant:t,color:n,severity:r,classes:o}=e,f={root:["root",`${t}${R(n||r)}`,`${t}`],icon:["icon"],message:["message"],action:["action"]};return B(f,Re,o)},Ie=y(ne,{name:"MuiAlert",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],t[`${n.variant}${R(n.color||n.severity)}`]]}})(({theme:e,ownerState:t})=>{const n=e.palette.mode==="light"?K:Z,r=e.palette.mode==="light"?Z:K,o=t.color||t.severity;return h({},e.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px"},o&&t.variant==="standard"&&{color:n(e.palette[o].light,.6),backgroundColor:r(e.palette[o].light,.9),[`& .${Y.icon}`]:{color:e.palette.mode==="dark"?e.palette[o].main:e.palette[o].light}},o&&t.variant==="outlined"&&{color:n(e.palette[o].light,.6),border:`1px solid ${e.palette[o].light}`,[`& .${Y.icon}`]:{color:e.palette.mode==="dark"?e.palette[o].main:e.palette[o].light}},o&&t.variant==="filled"&&{color:"#fff",fontWeight:e.typography.fontWeightMedium,backgroundColor:e.palette.mode==="dark"?e.palette[o].dark:e.palette[o].main})}),$e=y("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(e,t)=>t.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),Pe=y("div",{name:"MuiAlert",slot:"Message",overridesResolver:(e,t)=>t.message})({padding:"8px 0"}),Q=y("div",{name:"MuiAlert",slot:"Action",overridesResolver:(e,t)=>t.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),ee={success:s(Le,{fontSize:"inherit"}),warning:s(Ae,{fontSize:"inherit"}),error:s(Oe,{fontSize:"inherit"}),info:s(we,{fontSize:"inherit"})},Ne=a.exports.forwardRef(function(t,n){const r=H({props:t,name:"MuiAlert"}),{action:o,children:f,className:m,closeText:p="Close",color:C,icon:u,iconMapping:x=ee,onClose:v,role:E="alert",severity:k="success",variant:l="standard"}=r,g=w(r,Te),d=h({},r,{color:C,severity:k,variant:l}),c=ze(d);return te(Ie,h({role:E,elevation:0,ownerState:d,className:W(c.root,m),ref:n},g,{children:[u!==!1?s($e,{ownerState:d,className:c.icon,children:u||x[k]||ee[k]}):null,s(Pe,{ownerState:d,className:c.message,children:f}),o!=null?s(Q,{className:c.action,children:o}):null,o==null&&v?s(Q,{ownerState:d,className:c.action,children:s(ke,{size:"small","aria-label":p,title:p,color:"inherit",onClick:v,children:J||(J=s(ye,{fontSize:"small"}))})}):null]}))});var He=Ne;function Be(e){return P("MuiSnackbarContent",e)}N("MuiSnackbarContent",["root","message","action"]);const We=["action","className","message","role"],De=e=>{const{classes:t}=e;return B({root:["root"],action:["action"],message:["message"]},Be,t)},_e=y(ne,{name:"MuiSnackbarContent",slot:"Root",overridesResolver:(e,t)=>t.root})(({theme:e})=>{const t=e.palette.mode==="light"?.8:.98,n=Ce(e.palette.background.default,t);return h({},e.typography.body2,{color:e.palette.getContrastText(n),backgroundColor:n,display:"flex",alignItems:"center",flexWrap:"wrap",padding:"6px 16px",borderRadius:e.shape.borderRadius,flexGrow:1,[e.breakpoints.up("sm")]:{flexGrow:"initial",minWidth:288}})}),je=y("div",{name:"MuiSnackbarContent",slot:"Message",overridesResolver:(e,t)=>t.message})({padding:"8px 0"}),Ue=y("div",{name:"MuiSnackbarContent",slot:"Action",overridesResolver:(e,t)=>t.action})({display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8}),Fe=a.exports.forwardRef(function(t,n){const r=H({props:t,name:"MuiSnackbarContent"}),{action:o,className:f,message:m,role:p="alert"}=r,C=w(r,We),u=r,x=De(u);return te(_e,h({role:p,square:!0,elevation:6,className:W(x.root,f),ownerState:u,ref:n},C,{children:[s(je,{className:x.message,ownerState:u,children:m}),o?s(Ue,{className:x.action,ownerState:u,children:o}):null]}))});var Ge=Fe;function Xe(e){return P("MuiSnackbar",e)}N("MuiSnackbar",["root","anchorOriginTopCenter","anchorOriginBottomCenter","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft"]);const Ve=["onEnter","onExited"],Ke=["action","anchorOrigin","autoHideDuration","children","className","ClickAwayListenerProps","ContentProps","disableWindowBlurListener","message","onBlur","onClose","onFocus","onMouseEnter","onMouseLeave","open","resumeHideDuration","TransitionComponent","transitionDuration","TransitionProps"],Ze=e=>{const{classes:t,anchorOrigin:n}=e,r={root:["root",`anchorOrigin${R(n.vertical)}${R(n.horizontal)}`]};return B(r,Xe,t)},qe=y("div",{name:"MuiSnackbar",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`anchorOrigin${R(n.anchorOrigin.vertical)}${R(n.anchorOrigin.horizontal)}`]]}})(({theme:e,ownerState:t})=>{const n=h({},!t.isRtl&&{left:"50%",right:"auto",transform:"translateX(-50%)"},t.isRtl&&{right:"50%",left:"auto",transform:"translateX(50%)"});return h({zIndex:(e.vars||e).zIndex.snackbar,position:"fixed",display:"flex",left:8,right:8,justifyContent:"center",alignItems:"center"},t.anchorOrigin.vertical==="top"?{top:8}:{bottom:8},t.anchorOrigin.horizontal==="left"&&{justifyContent:"flex-start"},t.anchorOrigin.horizontal==="right"&&{justifyContent:"flex-end"},{[e.breakpoints.up("sm")]:h({},t.anchorOrigin.vertical==="top"?{top:24}:{bottom:24},t.anchorOrigin.horizontal==="center"&&n,t.anchorOrigin.horizontal==="left"&&h({},!t.isRtl&&{left:24,right:"auto"},t.isRtl&&{right:24,left:"auto"}),t.anchorOrigin.horizontal==="right"&&h({},!t.isRtl&&{right:24,left:"auto"},t.isRtl&&{left:24,right:"auto"}))})}),Ye=a.exports.forwardRef(function(t,n){const r=H({props:t,name:"MuiSnackbar"}),o=xe(),f={enter:o.transitions.duration.enteringScreen,exit:o.transitions.duration.leavingScreen},{action:m,anchorOrigin:{vertical:p,horizontal:C}={vertical:"bottom",horizontal:"left"},autoHideDuration:u=null,children:x,className:v,ClickAwayListenerProps:E,ContentProps:k,disableWindowBlurListener:l=!1,message:g,onBlur:d,onClose:c,onFocus:D,onMouseEnter:_,onMouseLeave:j,open:b,resumeHideDuration:z,TransitionComponent:oe=be,transitionDuration:re=f,TransitionProps:{onEnter:U,onExited:F}={}}=r,se=w(r.TransitionProps,Ve),ae=w(r,Ke),ie=o.direction==="rtl",G=h({},r,{anchorOrigin:{vertical:p,horizontal:C},isRtl:ie}),le=Ze(G),L=a.exports.useRef(),[X,V]=a.exports.useState(!0),ce=$((...i)=>{c&&c(...i)}),A=$(i=>{!c||i==null||(clearTimeout(L.current),L.current=setTimeout(()=>{ce(null,"timeout")},i))});a.exports.useEffect(()=>(b&&A(u),()=>{clearTimeout(L.current)}),[b,u,A]);const O=()=>{clearTimeout(L.current)},S=a.exports.useCallback(()=>{u!=null&&A(z!=null?z:u*.5)},[u,z,A]),ue=i=>{D&&D(i),O()},de=i=>{_&&_(i),O()},fe=i=>{d&&d(i),S()},pe=i=>{j&&j(i),S()},ge=i=>{c&&c(i,"clickaway")},he=i=>{V(!0),F&&F(i)},me=(i,M)=>{V(!1),U&&U(i,M)};return a.exports.useEffect(()=>{if(!l&&b)return window.addEventListener("focus",S),window.addEventListener("blur",O),()=>{window.removeEventListener("focus",S),window.removeEventListener("blur",O)}},[l,S,b]),a.exports.useEffect(()=>{if(!b)return;function i(M){M.defaultPrevented||(M.key==="Escape"||M.key==="Esc")&&c&&c(M,"escapeKeyDown")}return document.addEventListener("keydown",i),()=>{document.removeEventListener("keydown",i)}},[X,b,c]),!b&&X?null:s(Me,h({onClickAway:ge},E,{children:s(qe,h({className:W(le.root,v),onBlur:fe,onFocus:ue,onMouseEnter:de,onMouseLeave:pe,ownerState:G,ref:n,role:"presentation"},ae,{children:s(oe,h({appear:!0,in:b,timeout:re,direction:p==="top"?"down":"up",onEnter:me,onExited:he},se,{children:x||s(Ge,h({message:g,action:m},k))}))}))}))});var Je=Ye;function ot(e){const[t,n]=a.exports.useState("info"),[r,o]=a.exports.useState({widht:"100%"}),[f,m]=a.exports.useState(!1);return a.exports.useEffect(()=>{m(e.open),["error","info","success","warning"].indexOf(e.typeMessage)!=-1?n(e.typeMessage):n("error"),e.duration!=null&&setTimeout(()=>{m(!1)},e.duration)},[e.open]),s(Je,{open:f,children:s(He,{severity:`${t}`,sx:r,children:e.mensage})})}export{ot as S};
