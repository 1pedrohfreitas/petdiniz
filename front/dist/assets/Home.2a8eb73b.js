import{_ as n,a as r,r as p,j as T,h as de,g as It,u as X,O as Mt,d as ue}from"./index.b0e91862.js";import{l as $t}from"./petdiniz.868b0f8c.js";import{c as me,a as fe,r as he}from"./jsx-runtime_commonjs-proxy.683ef609.js";import{B as Ve}from"./Box.04ee3f33.js";import{A as At}from"./AppBar.d59db7cf.js";import{T as Pt}from"./Toolbar.a09df885.js";import{e as Lt,g as qe,a as Ge,s as w,u as J,_ as K,c as Q,b as L,f as ge,d as Ye,m as kt,i as Dt,J as St,h as ce}from"./ButtonBase.4fe4f374.js";import{P as Xe}from"./Popper.9c8e22b1.js";import{i as Et,u as Ot,a as _t}from"./Modal.3a8b8f7e.js";import{G as je,I as Je}from"./Grow.67318f79.js";import{L as Nt,M as Ke}from"./Menu.df74857a.js";import{g as zt,a as Ft,M as I}from"./MenuItem.06d228b4.js";function q(t,e={},o){return Et(t)?e:n({},e,{ownerState:n({},e.ownerState,o)})}var Bt=Lt(r("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");function Ut(t){return qe("MuiAvatar",t)}Ge("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);const Wt=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],jt=t=>{const{classes:e,variant:o,colorDefault:a}=t;return Q({root:["root",o,a&&"colorDefault"],img:["img"],fallback:["fallback"]},Ut,e)},Ht=w("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,e[o.variant],o.colorDefault&&e.colorDefault]}})(({theme:t,ownerState:e})=>n({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:t.typography.fontFamily,fontSize:t.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},e.variant==="rounded"&&{borderRadius:t.shape.borderRadius},e.variant==="square"&&{borderRadius:0},e.colorDefault&&{color:t.palette.background.default,backgroundColor:t.palette.mode==="light"?t.palette.grey[400]:t.palette.grey[600]})),Vt=w("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(t,e)=>e.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),qt=w(Bt,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(t,e)=>e.fallback})({width:"75%",height:"75%"});function Gt({crossOrigin:t,referrerPolicy:e,src:o,srcSet:a}){const[c,l]=p.exports.useState(!1);return p.exports.useEffect(()=>{if(!o&&!a)return;l(!1);let s=!0;const u=new Image;return u.onload=()=>{!s||l("loaded")},u.onerror=()=>{!s||l("error")},u.crossOrigin=t,u.referrerPolicy=e,u.src=o,a&&(u.srcset=a),()=>{s=!1}},[t,e,o,a]),c}const Yt=p.exports.forwardRef(function(e,o){const a=J({props:e,name:"MuiAvatar"}),{alt:c,children:l,className:s,component:u="div",imgProps:f,sizes:m,src:g,srcSet:d,variant:b="circular"}=a,v=K(a,Wt);let C=null;const $=Gt(n({},f,{src:g,srcSet:d})),R=g||d,B=R&&$!=="error",D=n({},a,{colorDefault:!B,component:u,variant:b}),k=jt(D);return B?C=r(Vt,n({alt:c,src:g,srcSet:d,sizes:m,ownerState:D,className:k.img},f)):l!=null?C=l:R&&c?C=c[0]:C=r(qt,{className:k.fallback}),r(Ht,n({as:u,ownerState:D,className:L(k.root,s),ref:o},v,{children:C}))});var He=Yt;const Xt=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],Jt=t=>{const{absolute:e,children:o,classes:a,flexItem:c,light:l,orientation:s,textAlign:u,variant:f}=t;return Q({root:["root",e&&"absolute",f,l&&"light",s==="vertical"&&"vertical",c&&"flexItem",o&&"withChildren",o&&s==="vertical"&&"withChildrenVertical",u==="right"&&s!=="vertical"&&"textAlignRight",u==="left"&&s!=="vertical"&&"textAlignLeft"],wrapper:["wrapper",s==="vertical"&&"wrapperVertical"]},zt,a)},Kt=w("div",{name:"MuiDivider",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,o.absolute&&e.absolute,e[o.variant],o.light&&e.light,o.orientation==="vertical"&&e.vertical,o.flexItem&&e.flexItem,o.children&&e.withChildren,o.children&&o.orientation==="vertical"&&e.withChildrenVertical,o.textAlign==="right"&&o.orientation!=="vertical"&&e.textAlignRight,o.textAlign==="left"&&o.orientation!=="vertical"&&e.textAlignLeft]}})(({theme:t,ownerState:e})=>n({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(t.vars||t).palette.divider,borderBottomWidth:"thin"},e.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},e.light&&{borderColor:t.vars?`rgba(${t.vars.palette.dividerChannel} / 0.08)`:ge(t.palette.divider,.08)},e.variant==="inset"&&{marginLeft:72},e.variant==="middle"&&e.orientation==="horizontal"&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},e.variant==="middle"&&e.orientation==="vertical"&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},e.orientation==="vertical"&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},e.flexItem&&{alignSelf:"stretch",height:"auto"}),({theme:t,ownerState:e})=>n({},e.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{position:"relative",width:"100%",borderTop:`thin solid ${(t.vars||t).palette.divider}`,top:"50%",content:'""',transform:"translateY(50%)"}}),({theme:t,ownerState:e})=>n({},e.children&&e.orientation==="vertical"&&{flexDirection:"column","&::before, &::after":{height:"100%",top:"0%",left:"50%",borderTop:0,borderLeft:`thin solid ${(t.vars||t).palette.divider}`,transform:"translateX(0%)"}}),({ownerState:t})=>n({},t.textAlign==="right"&&t.orientation!=="vertical"&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},t.textAlign==="left"&&t.orientation!=="vertical"&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})),Qt=w("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.wrapper,o.orientation==="vertical"&&e.wrapperVertical]}})(({theme:t,ownerState:e})=>n({display:"inline-block",paddingLeft:`calc(${t.spacing(1)} * 1.2)`,paddingRight:`calc(${t.spacing(1)} * 1.2)`},e.orientation==="vertical"&&{paddingTop:`calc(${t.spacing(1)} * 1.2)`,paddingBottom:`calc(${t.spacing(1)} * 1.2)`})),Zt=p.exports.forwardRef(function(e,o){const a=J({props:e,name:"MuiDivider"}),{absolute:c=!1,children:l,className:s,component:u=l?"div":"hr",flexItem:f=!1,light:m=!1,orientation:g="horizontal",role:d=u!=="hr"?"separator":void 0,textAlign:b="center",variant:v="fullWidth"}=a,C=K(a,Xt),$=n({},a,{absolute:c,component:u,flexItem:f,light:m,orientation:g,role:d,textAlign:b,variant:v}),R=Jt($);return r(Kt,n({as:u,className:L(R.root,s),role:d,ref:o,ownerState:$},C,{children:l?r(Qt,{className:R.wrapper,ownerState:$,children:l}):null}))});var Qe=Zt;const eo=["className"],to=t=>{const{alignItems:e,classes:o}=t;return Q({root:["root",e==="flex-start"&&"alignItemsFlexStart"]},Ft,o)},oo=w("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,o.alignItems==="flex-start"&&e.alignItemsFlexStart]}})(({theme:t,ownerState:e})=>n({minWidth:56,color:(t.vars||t).palette.action.active,flexShrink:0,display:"inline-flex"},e.alignItems==="flex-start"&&{marginTop:8})),ro=p.exports.forwardRef(function(e,o){const a=J({props:e,name:"MuiListItemIcon"}),{className:c}=a,l=K(a,eo),s=p.exports.useContext(Nt),u=n({},a,{alignItems:s.alignItems}),f=to(u);return r(oo,n({className:L(f.root,c),ownerState:u,ref:o},l))});var no=ro;function ao(t){return qe("MuiTooltip",t)}const io=Ge("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]);var M=io;const so=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","title","TransitionComponent","TransitionProps"];function lo(t){return Math.round(t*1e5)/1e5}const co=t=>{const{classes:e,disableInteractive:o,arrow:a,touch:c,placement:l}=t,s={popper:["popper",!o&&"popperInteractive",a&&"popperArrow"],tooltip:["tooltip",a&&"tooltipArrow",c&&"touch",`tooltipPlacement${Ye(l.split("-")[0])}`],arrow:["arrow"]};return Q(s,ao,e)},po=w(Xe,{name:"MuiTooltip",slot:"Popper",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.popper,!o.disableInteractive&&e.popperInteractive,o.arrow&&e.popperArrow,!o.open&&e.popperClose]}})(({theme:t,ownerState:e,open:o})=>n({zIndex:(t.vars||t).zIndex.tooltip,pointerEvents:"none"},!e.disableInteractive&&{pointerEvents:"auto"},!o&&{pointerEvents:"none"},e.arrow&&{[`&[data-popper-placement*="bottom"] .${M.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${M.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${M.arrow}`]:n({},e.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${M.arrow}`]:n({},e.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),uo=w("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.tooltip,o.touch&&e.touch,o.arrow&&e.tooltipArrow,e[`tooltipPlacement${Ye(o.placement.split("-")[0])}`]]}})(({theme:t,ownerState:e})=>n({backgroundColor:t.vars?`rgba(${t.vars.palette.grey.darkChannel} / 0.92)`:ge(t.palette.grey[700],.92),borderRadius:(t.vars||t).shape.borderRadius,color:(t.vars||t).palette.common.white,fontFamily:t.typography.fontFamily,padding:"4px 8px",fontSize:t.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:t.typography.fontWeightMedium},e.arrow&&{position:"relative",margin:0},e.touch&&{padding:"8px 16px",fontSize:t.typography.pxToRem(14),lineHeight:`${lo(16/14)}em`,fontWeight:t.typography.fontWeightRegular},{[`.${M.popper}[data-popper-placement*="left"] &`]:n({transformOrigin:"right center"},e.isRtl?n({marginLeft:"14px"},e.touch&&{marginLeft:"24px"}):n({marginRight:"14px"},e.touch&&{marginRight:"24px"})),[`.${M.popper}[data-popper-placement*="right"] &`]:n({transformOrigin:"left center"},e.isRtl?n({marginRight:"14px"},e.touch&&{marginRight:"24px"}):n({marginLeft:"14px"},e.touch&&{marginLeft:"24px"})),[`.${M.popper}[data-popper-placement*="top"] &`]:n({transformOrigin:"center bottom",marginBottom:"14px"},e.touch&&{marginBottom:"24px"}),[`.${M.popper}[data-popper-placement*="bottom"] &`]:n({transformOrigin:"center top",marginTop:"14px"},e.touch&&{marginTop:"24px"})})),mo=w("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(t,e)=>e.arrow})(({theme:t})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:t.vars?`rgba(${t.vars.palette.grey.darkChannel} / 0.9)`:ge(t.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let G=!1,pe=null;function Y(t,e){return o=>{e&&e(o),t(o)}}const fo=p.exports.forwardRef(function(e,o){var a,c,l,s,u,f;const m=J({props:e,name:"MuiTooltip"}),{arrow:g=!1,children:d,components:b={},componentsProps:v={},describeChild:C=!1,disableFocusListener:$=!1,disableHoverListener:R=!1,disableInteractive:B=!1,disableTouchListener:D=!1,enterDelay:k=100,enterNextDelay:Te=0,enterTouchDelay:ot=700,followCursor:Z=!1,id:rt,leaveDelay:Ce=0,leaveTouchDelay:nt=1500,onClose:ye,onOpen:we,open:at,placement:Re="bottom",PopperComponent:ee,PopperProps:A={},title:S,TransitionComponent:it=je,TransitionProps:st}=m,Ie=K(m,so),te=kt(),lt=te.direction==="rtl",[E,Me]=p.exports.useState(),[oe,ct]=p.exports.useState(null),U=p.exports.useRef(!1),re=B||Z,W=p.exports.useRef(),j=p.exports.useRef(),P=p.exports.useRef(),$e=p.exports.useRef(),[pt,Ae]=Ot({controlled:at,default:!1,name:"Tooltip",state:"open"});let y=pt;const ne=_t(rt),O=p.exports.useRef(),H=p.exports.useCallback(()=>{O.current!==void 0&&(document.body.style.WebkitUserSelect=O.current,O.current=void 0),clearTimeout($e.current)},[]);p.exports.useEffect(()=>()=>{clearTimeout(W.current),clearTimeout(j.current),clearTimeout(P.current),H()},[H]);const Pe=i=>{clearTimeout(pe),G=!0,Ae(!0),we&&!y&&we(i)},V=Dt(i=>{clearTimeout(pe),pe=setTimeout(()=>{G=!1},800+Ce),Ae(!1),ye&&y&&ye(i),clearTimeout(W.current),W.current=setTimeout(()=>{U.current=!1},te.transitions.duration.shortest)}),ae=i=>{U.current&&i.type!=="touchstart"||(E&&E.removeAttribute("title"),clearTimeout(j.current),clearTimeout(P.current),k||G&&Te?j.current=setTimeout(()=>{Pe(i)},G?Te:k):Pe(i))},Le=i=>{clearTimeout(j.current),clearTimeout(P.current),P.current=setTimeout(()=>{V(i)},Ce)},{isFocusVisibleRef:ke,onBlur:ut,onFocus:dt,ref:mt}=St(),[,De]=p.exports.useState(!1),Se=i=>{ut(i),ke.current===!1&&(De(!1),Le(i))},Ee=i=>{E||Me(i.currentTarget),dt(i),ke.current===!0&&(De(!0),ae(i))},Oe=i=>{U.current=!0;const h=d.props;h.onTouchStart&&h.onTouchStart(i)},_e=ae,Ne=Le,ft=i=>{Oe(i),clearTimeout(P.current),clearTimeout(W.current),H(),O.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",$e.current=setTimeout(()=>{document.body.style.WebkitUserSelect=O.current,ae(i)},ot)},ht=i=>{d.props.onTouchEnd&&d.props.onTouchEnd(i),H(),clearTimeout(P.current),P.current=setTimeout(()=>{V(i)},nt)};p.exports.useEffect(()=>{if(!y)return;function i(h){(h.key==="Escape"||h.key==="Esc")&&V(h)}return document.addEventListener("keydown",i),()=>{document.removeEventListener("keydown",i)}},[V,y]);const gt=ce(Me,o),vt=ce(mt,gt),xt=ce(d.ref,vt);S===""&&(y=!1);const _=p.exports.useRef({x:0,y:0}),ie=p.exports.useRef(),bt=i=>{const h=d.props;h.onMouseMove&&h.onMouseMove(i),_.current={x:i.clientX,y:i.clientY},ie.current&&ie.current.update()},N={},se=typeof S=="string";C?(N.title=!y&&se&&!R?S:null,N["aria-describedby"]=y?ne:null):(N["aria-label"]=se?S:null,N["aria-labelledby"]=y&&!se?ne:null);const x=n({},N,Ie,d.props,{className:L(Ie.className,d.props.className),onTouchStart:Oe,ref:xt},Z?{onMouseMove:bt}:{}),z={};D||(x.onTouchStart=ft,x.onTouchEnd=ht),R||(x.onMouseOver=Y(_e,x.onMouseOver),x.onMouseLeave=Y(Ne,x.onMouseLeave),re||(z.onMouseOver=_e,z.onMouseLeave=Ne)),$||(x.onFocus=Y(Ee,x.onFocus),x.onBlur=Y(Se,x.onBlur),re||(z.onFocus=Ee,z.onBlur=Se));const Tt=p.exports.useMemo(()=>{var i;let h=[{name:"arrow",enabled:Boolean(oe),options:{element:oe,padding:4}}];return(i=A.popperOptions)!=null&&i.modifiers&&(h=h.concat(A.popperOptions.modifiers)),n({},A.popperOptions,{modifiers:h})},[oe,A]),F=n({},m,{isRtl:lt,arrow:g,disableInteractive:re,placement:Re,PopperComponentProp:ee,touch:U.current}),le=co(F),ze=(a=b.Popper)!=null?a:po,Fe=(c=(l=b.Transition)!=null?l:it)!=null?c:je,Be=(s=b.Tooltip)!=null?s:uo,Ue=(u=b.Arrow)!=null?u:mo,Ct=q(ze,n({},A,v.popper),F),yt=q(Fe,n({},st,v.transition),F),wt=q(Be,n({},v.tooltip),F),Rt=q(Ue,n({},v.arrow),F);return T(p.exports.Fragment,{children:[p.exports.cloneElement(d,x),r(ze,n({as:ee!=null?ee:Xe,placement:Re,anchorEl:Z?{getBoundingClientRect:()=>({top:_.current.y,left:_.current.x,right:_.current.x,bottom:_.current.y,width:0,height:0})}:E,popperRef:ie,open:E?y:!1,id:ne,transition:!0},z,Ct,{className:L(le.popper,A==null?void 0:A.className,(f=v.popper)==null?void 0:f.className),popperOptions:Tt,children:({TransitionProps:i})=>{var h,We;return r(Fe,n({timeout:te.transitions.duration.shorter},i,yt,{children:T(Be,n({},wt,{className:L(le.tooltip,(h=v.tooltip)==null?void 0:h.className),children:[S,g?r(Ue,n({},Rt,{className:L(le.arrow,(We=v.arrow)==null?void 0:We.className),ref:ct})):null]}))}))}}))]})});var ho=fo;var ve={},go=fe.exports;Object.defineProperty(ve,"__esModule",{value:!0});var Ze=ve.default=void 0,vo=go(me),xo=he,bo=(0,vo.default)((0,xo.jsx)("path",{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}),"Menu");Ze=ve.default=bo;var xe={},To=fe.exports;Object.defineProperty(xe,"__esModule",{value:!0});var et=xe.default=void 0,Co=To(me),yo=he,wo=(0,Co.default)((0,yo.jsx)("path",{d:"m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"}),"Logout");et=xe.default=wo;var be={},Ro=fe.exports;Object.defineProperty(be,"__esModule",{value:!0});var tt=be.default=void 0,Io=Ro(me),Mo=he,$o=(0,Io.default)((0,Mo.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"}),"AccountCircle");tt=be.default=$o;function jo(){let t=de();const{token:e}=It(),a=X(c=>c.user).user;return p.exports.useEffect(()=>{},[a]),p.exports.useEffect(()=>{a!=null?t(`/home/${e}/mycams`,{replace:!0}):t(`/validalogin/${e}/`,{replace:!0})},[]),a!=null?T("div",{id:"homeArea",children:[r(Ao,{}),r("div",{id:"conteudo",children:r(Mt,{})})]}):r("div",{id:"homeArea",children:"Vou reiniciar"})}function Ao(t){const o=X(s=>s.user).user,[a,c]=p.exports.useState("");function l(s){c(s)}return r("div",{className:"header",children:r(Ve,{sx:{flexGrow:1,width:"100%",justifyContent:"space-between"},children:r(At,{position:"static",style:{background:"rgba(255,150,0,255)"},children:T(Pt,{children:[r("div",{className:"headerMenuArea",children:r(Lo,{userData:o,changeSubTitle:l})}),r("div",{className:"homeHeaderLogo",children:r("img",{src:$t,alt:"logo"})}),r("div",{className:"headerMenuArea",children:r(Po,{userData:o,changeSubTitle:l})})]})})})})}function Po(t){let e=de();const a=X(d=>d.user).user,[c,l]=ue.useState(null),s=Boolean(c),u=d=>{l(d.currentTarget)},f=()=>{l(null)},m=()=>{t.changeSubTitle("Editando meus dados"),e(`/home/${localStorage.getItem("petdiniz-token")}/user/${a.id}`)},g=()=>{e("/logout",{replace:!0})};return T(ue.Fragment,{children:[r(Ve,{sx:{display:"flex",alignItems:"center",textAlign:"center"},children:r(ho,{title:"Account settings",children:r(Je,{onClick:u,size:"small",sx:{ml:2},"aria-controls":s?"account-menu":void 0,"aria-haspopup":"true","aria-expanded":s?"true":void 0,children:r(He,{sx:{width:32,height:32},children:r(tt,{})})})})}),T(Ke,{anchorEl:c,id:"account-menu",open:s,onClose:f,onClick:f,PaperProps:{elevation:0,sx:{overflow:"visible",filter:"drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",mt:1.5,"& .MuiAvatar-root":{width:32,height:32,ml:-.5,mr:1},"&:before":{content:'""',display:"block",position:"absolute",top:0,right:14,width:10,height:10,bgcolor:"background.paper",transform:"translateY(-50%) rotate(45deg)",zIndex:0}}},transformOrigin:{horizontal:"right",vertical:"top"},anchorOrigin:{horizontal:"right",vertical:"bottom"},children:[r("a",{onClick:m,children:T(I,{children:[r(He,{})," ",a.alias]})}),r(Qe,{}),T(I,{onClick:g,children:[r(no,{children:r(et,{fontSize:"small"})}),"Logout"]})]})]})}function Lo(t){const o=X(d=>d.user).user;let a=de();const[c,l]=ue.useState(null),s=Boolean(c),u=d=>{l(d.currentTarget)},f=()=>{l(null)},m=(d,b)=>{t.changeSubTitle(b),a(`/home/${localStorage.getItem("petdiniz-token")}/${d}`,{replace:!0})};return r("div",{children:(()=>T("div",{children:[r(Je,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2},onClick:u,children:r(Ze,{})}),T(Ke,{id:"basic-menu",anchorEl:c,open:s,onClose:f,MenuListProps:{"aria-labelledby":"basic-button"},children:[r(I,{style:{display:[0,1,2].indexOf(o.usertype)>-1?"flex":"none"},onClick:()=>m("addaccesscams","Liberar Acesso C\xE2meras"),children:"Liberar Acesso C\xE2meras"}),r(I,{style:{display:[0,1,2].indexOf(o.usertype)>-1?"flex":"none"},onClick:()=>m("listaccesscams","Listar Permiss\xE3o Acesso C\xE2meras"),children:"Listar Permiss\xE3o Acesso C\xE2meras"}),r(I,{style:{display:[0,1].indexOf(o.usertype)>-1?"flex":"none"},onClick:()=>m("cams","Listar C\xE2meras"),children:"Listar C\xE2meras"}),r(I,{style:{display:[0,1,2,3].indexOf(o.usertype)>-1?"flex":"none"},onClick:()=>m("mycams","Minhas C\xE2meras"),children:"Minhas C\xE2meras"}),r(Qe,{}),r(I,{style:{display:[0,1,2].indexOf(o.usertype)>-1?"flex":"none"},onClick:()=>m("user","Cadastrar Usu\xE1rio"),children:"Cadastrar Usu\xE1rio"}),r(I,{style:{display:[0,1,2].indexOf(o.usertype)>-1?"flex":"none"},onClick:()=>m("users","Listar Usu\xE1rios"),children:"Listar Usu\xE1rios"})]})]}))()})}export{Po as AvatarMenu,Lo as FuncoesMenu,Ao as HomeHeader,jo as default};
