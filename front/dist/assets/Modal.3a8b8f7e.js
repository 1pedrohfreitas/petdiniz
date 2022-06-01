import{r as i,R as Ce,c as Se,j as ue,a as F,_ as x}from"./index.b0e91862.js";import{o as A,h as W,y as ne,n as oe,g as fe,a as pe,_ as V,i as re,c as he,b as me,m as Ie,T as Pe,z as Me,A as se,s as X,u as be}from"./ButtonBase.4fe4f374.js";function ie(...e){return e.reduce((t,o)=>o==null?t:function(...r){t.apply(this,r),o.apply(this,r)},()=>{})}function Et(e,t=166){let o;function n(...r){const s=()=>{e.apply(this,r)};clearTimeout(o),o=setTimeout(s,t)}return n.clear=()=>{clearTimeout(o)},n}function J(e){return A(e).defaultView||window}let ae=0;function Fe(e){const[t,o]=i.exports.useState(e),n=e||t;return i.exports.useEffect(()=>{t==null&&(ae+=1,o(`mui-${ae}`))},[t]),n}const ce=Ce["useId"];function gt(e){if(ce!==void 0){const t=ce();return e!=null?e:t}return Fe(e)}function yt({controlled:e,default:t,name:o,state:n="value"}){const{current:r}=i.exports.useRef(e!==void 0),[s,c]=i.exports.useState(t),a=r?e:s,d=i.exports.useCallback(h=>{r||c(h)},[]);return[a,d]}function Ne(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function xe(e){return typeof e=="string"}function Be(e){return typeof e=="function"?e():e}const Ae=i.exports.forwardRef(function(t,o){const{children:n,container:r,disablePortal:s=!1}=t,[c,a]=i.exports.useState(null),d=W(i.exports.isValidElement(n)?n.ref:null,o);return ne(()=>{s||a(Be(r)||document.body)},[r,s]),ne(()=>{if(c&&!s)return oe(o,c),()=>{oe(o,null)}},[o,c,s]),s?i.exports.isValidElement(n)?i.exports.cloneElement(n,{ref:d}):n:c&&Se.exports.createPortal(n,c)});var De=Ae;function Le(e){const t=A(e);return t.body===e?J(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function K(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function le(e){return parseInt(J(e).getComputedStyle(e).paddingRight,10)||0}function de(e,t,o,n=[],r){const s=[t,o,...n],c=["TEMPLATE","SCRIPT","STYLE"];[].forEach.call(e.children,a=>{s.indexOf(a)===-1&&c.indexOf(a.tagName)===-1&&K(a,r)})}function G(e,t){let o=-1;return e.some((n,r)=>t(n)?(o=r,!0):!1),o}function $e(e,t){const o=[],n=e.container;if(!t.disableScrollLock){if(Le(n)){const d=Ne(A(n));o.push({value:n.style.paddingRight,property:"padding-right",el:n}),n.style.paddingRight=`${le(n)+d}px`;const h=A(n).querySelectorAll(".mui-fixed");[].forEach.call(h,m=>{o.push({value:m.style.paddingRight,property:"padding-right",el:m}),m.style.paddingRight=`${le(m)+d}px`})}const s=n.parentElement,c=J(n),a=(s==null?void 0:s.nodeName)==="HTML"&&c.getComputedStyle(s).overflowY==="scroll"?s:n;o.push({value:a.style.overflow,property:"overflow",el:a},{value:a.style.overflowX,property:"overflow-x",el:a},{value:a.style.overflowY,property:"overflow-y",el:a}),a.style.overflow="hidden"}return()=>{o.forEach(({value:s,el:c,property:a})=>{s?c.style.setProperty(a,s):c.style.removeProperty(a)})}}function Ue(e){const t=[];return[].forEach.call(e.children,o=>{o.getAttribute("aria-hidden")==="true"&&t.push(o)}),t}class Oe{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,o){let n=this.modals.indexOf(t);if(n!==-1)return n;n=this.modals.length,this.modals.push(t),t.modalRef&&K(t.modalRef,!1);const r=Ue(o);de(o,t.mount,t.modalRef,r,!0);const s=G(this.containers,c=>c.container===o);return s!==-1?(this.containers[s].modals.push(t),n):(this.containers.push({modals:[t],container:o,restore:null,hiddenSiblings:r}),n)}mount(t,o){const n=G(this.containers,s=>s.modals.indexOf(t)!==-1),r=this.containers[n];r.restore||(r.restore=$e(r,o))}remove(t){const o=this.modals.indexOf(t);if(o===-1)return o;const n=G(this.containers,s=>s.modals.indexOf(t)!==-1),r=this.containers[n];if(r.modals.splice(r.modals.indexOf(t),1),this.modals.splice(o,1),r.modals.length===0)r.restore&&r.restore(),t.modalRef&&K(t.modalRef,!0),de(r.container,t.mount,t.modalRef,r.hiddenSiblings,!1),this.containers.splice(n,1);else{const s=r.modals[r.modals.length-1];s.modalRef&&K(s.modalRef,!1)}return o}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}const He=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Ke(e){const t=parseInt(e.getAttribute("tabindex"),10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function We(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=n=>e.ownerDocument.querySelector(`input[type="radio"]${n}`);let o=t(`[name="${e.name}"]:checked`);return o||(o=t(`[name="${e.name}"]`)),o!==e}function _e(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||We(e))}function ze(e){const t=[],o=[];return Array.from(e.querySelectorAll(He)).forEach((n,r)=>{const s=Ke(n);s===-1||!_e(n)||(s===0?t.push(n):o.push({documentOrder:r,tabIndex:s,node:n}))}),o.sort((n,r)=>n.tabIndex===r.tabIndex?n.documentOrder-r.documentOrder:n.tabIndex-r.tabIndex).map(n=>n.node).concat(t)}function je(){return!0}function Ve(e){const{children:t,disableAutoFocus:o=!1,disableEnforceFocus:n=!1,disableRestoreFocus:r=!1,getTabbable:s=ze,isEnabled:c=je,open:a}=e,d=i.exports.useRef(),h=i.exports.useRef(null),m=i.exports.useRef(null),E=i.exports.useRef(null),R=i.exports.useRef(null),g=i.exports.useRef(!1),u=i.exports.useRef(null),S=W(t.ref,u),y=i.exports.useRef(null);i.exports.useEffect(()=>{!a||!u.current||(g.current=!o)},[o,a]),i.exports.useEffect(()=>{if(!a||!u.current)return;const l=A(u.current);return u.current.contains(l.activeElement)||(u.current.hasAttribute("tabIndex")||u.current.setAttribute("tabIndex",-1),g.current&&u.current.focus()),()=>{r||(E.current&&E.current.focus&&(d.current=!0,E.current.focus()),E.current=null)}},[a]),i.exports.useEffect(()=>{if(!a||!u.current)return;const l=A(u.current),b=f=>{const{current:B}=u;if(B!==null){if(!l.hasFocus()||n||!c()||d.current){d.current=!1;return}if(!B.contains(l.activeElement)){if(f&&R.current!==f.target||l.activeElement!==R.current)R.current=null;else if(R.current!==null)return;if(!g.current)return;let I=[];if((l.activeElement===h.current||l.activeElement===m.current)&&(I=s(u.current)),I.length>0){var C,D;const L=Boolean(((C=y.current)==null?void 0:C.shiftKey)&&((D=y.current)==null?void 0:D.key)==="Tab"),$=I[0],U=I[I.length-1];L?U.focus():$.focus()}else B.focus()}}},v=f=>{y.current=f,!(n||!c()||f.key!=="Tab")&&l.activeElement===u.current&&f.shiftKey&&(d.current=!0,m.current.focus())};l.addEventListener("focusin",b),l.addEventListener("keydown",v,!0);const N=setInterval(()=>{l.activeElement.tagName==="BODY"&&b()},50);return()=>{clearInterval(N),l.removeEventListener("focusin",b),l.removeEventListener("keydown",v,!0)}},[o,n,r,c,a,s]);const k=l=>{E.current===null&&(E.current=l.relatedTarget),g.current=!0,R.current=l.target;const b=t.props.onFocus;b&&b(l)},P=l=>{E.current===null&&(E.current=l.relatedTarget),g.current=!0};return ue(i.exports.Fragment,{children:[F("div",{tabIndex:0,onFocus:P,ref:h,"data-test":"sentinelStart"}),i.exports.cloneElement(t,{ref:S,onFocus:k}),F("div",{tabIndex:0,onFocus:P,ref:m,"data-test":"sentinelEnd"})]})}function Ye(e){return fe("MuiModal",e)}pe("MuiModal",["root","hidden"]);const qe=["BackdropComponent","BackdropProps","children","classes","className","closeAfterTransition","component","components","componentsProps","container","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","manager","onBackdropClick","onClose","onKeyDown","open","theme","onTransitionEnter","onTransitionExited"],Ge=e=>{const{open:t,exited:o,classes:n}=e;return he({root:["root",!t&&o&&"hidden"]},Ye,n)};function Xe(e){return typeof e=="function"?e():e}function Je(e){return e.children?e.children.props.hasOwnProperty("in"):!1}const Qe=new Oe,Ze=i.exports.forwardRef(function(t,o){const{BackdropComponent:n,BackdropProps:r,children:s,classes:c,className:a,closeAfterTransition:d=!1,component:h="div",components:m={},componentsProps:E={},container:R,disableAutoFocus:g=!1,disableEnforceFocus:u=!1,disableEscapeKeyDown:S=!1,disablePortal:y=!1,disableRestoreFocus:k=!1,disableScrollLock:P=!1,hideBackdrop:l=!1,keepMounted:b=!1,manager:v=Qe,onBackdropClick:N,onClose:f,onKeyDown:B,open:C,theme:D,onTransitionEnter:I,onTransitionExited:L}=t,$=V(t,qe),[U,p]=i.exports.useState(!0),w=i.exports.useRef({}),M=i.exports.useRef(null),O=i.exports.useRef(null),Ee=W(O,o),_=Je(t),ge=()=>A(M.current),z=()=>(w.current.modalRef=O.current,w.current.mountNode=M.current,w.current),Q=()=>{v.mount(z(),{disableScrollLock:P}),O.current.scrollTop=0},Z=re(()=>{const T=Xe(R)||ge().body;v.add(z(),T),O.current&&Q()}),Y=i.exports.useCallback(()=>v.isTopModal(z()),[v]),ye=re(T=>{M.current=T,T&&(C&&Y()?Q():K(O.current,!0))}),H=i.exports.useCallback(()=>{v.remove(z())},[v]);i.exports.useEffect(()=>()=>{H()},[H]),i.exports.useEffect(()=>{C?Z():(!_||!d)&&H()},[C,H,_,d,Z]);const ee=x({},t,{classes:c,closeAfterTransition:d,disableAutoFocus:g,disableEnforceFocus:u,disableEscapeKeyDown:S,disablePortal:y,disableRestoreFocus:k,disableScrollLock:P,exited:U,hideBackdrop:l,keepMounted:b}),Re=Ge(ee);if(!b&&!C&&(!_||U))return null;const ve=()=>{p(!1),I&&I()},Te=()=>{p(!0),L&&L(),d&&H()},ke=T=>{T.target===T.currentTarget&&(N&&N(T),f&&f(T,"backdropClick"))},we=T=>{B&&B(T),!(T.key!=="Escape"||!Y())&&(S||(T.stopPropagation(),f&&f(T,"escapeKeyDown")))},j={};s.props.tabIndex===void 0&&(j.tabIndex="-1"),_&&(j.onEnter=ie(ve,s.props.onEnter),j.onExited=ie(Te,s.props.onExited));const te=m.Root||h,q=E.root||{};return F(De,{ref:ye,container:R,disablePortal:y,children:ue(te,x({role:"presentation"},q,!xe(te)&&{as:h,ownerState:x({},ee,q.ownerState),theme:D},$,{ref:Ee,onKeyDown:we,className:me(Re.root,q.className,a),children:[!l&&n?F(n,x({"aria-hidden":!0,open:C,onClick:ke},r)):null,F(Ve,{disableEnforceFocus:u,disableAutoFocus:g,disableRestoreFocus:k,isEnabled:Y,open:C,children:i.exports.cloneElement(s,j)})]}))})});var et=Ze;const tt=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],nt={entering:{opacity:1},entered:{opacity:1}},ot=i.exports.forwardRef(function(t,o){const n=Ie(),r={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:s,appear:c=!0,children:a,easing:d,in:h,onEnter:m,onEntered:E,onEntering:R,onExit:g,onExited:u,onExiting:S,style:y,timeout:k=r,TransitionComponent:P=Pe}=t,l=V(t,tt),b=i.exports.useRef(null),v=W(a.ref,o),N=W(b,v),f=p=>w=>{if(p){const M=b.current;w===void 0?p(M):p(M,w)}},B=f(R),C=f((p,w)=>{Me(p);const M=se({style:y,timeout:k,easing:d},{mode:"enter"});p.style.webkitTransition=n.transitions.create("opacity",M),p.style.transition=n.transitions.create("opacity",M),m&&m(p,w)}),D=f(E),I=f(S),L=f(p=>{const w=se({style:y,timeout:k,easing:d},{mode:"exit"});p.style.webkitTransition=n.transitions.create("opacity",w),p.style.transition=n.transitions.create("opacity",w),g&&g(p)}),$=f(u);return F(P,x({appear:c,in:h,nodeRef:b,onEnter:C,onEntered:D,onEntering:B,onExit:L,onExited:$,onExiting:I,addEndListener:p=>{s&&s(b.current,p)},timeout:k},l,{children:(p,w)=>i.exports.cloneElement(a,x({style:x({opacity:0,visibility:p==="exited"&&!h?"hidden":void 0},nt[p],y,a.props.style),ref:N},w))}))});var rt=ot;function st(e){return fe("MuiBackdrop",e)}pe("MuiBackdrop",["root","invisible"]);const it=["children","component","components","componentsProps","className","invisible","open","transitionDuration","TransitionComponent"],at=e=>{const{classes:t,invisible:o}=e;return he({root:["root",o&&"invisible"]},st,t)},ct=X("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.invisible&&t.invisible]}})(({ownerState:e})=>x({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),lt=i.exports.forwardRef(function(t,o){var n,r;const s=be({props:t,name:"MuiBackdrop"}),{children:c,component:a="div",components:d={},componentsProps:h={},className:m,invisible:E=!1,open:R,transitionDuration:g,TransitionComponent:u=rt}=s,S=V(s,it),y=x({},s,{component:a,invisible:E}),k=at(y);return F(u,x({in:R,timeout:g},S,{children:F(ct,{"aria-hidden":!0,as:(n=d.Root)!=null?n:a,className:me(k.root,m),ownerState:x({},y,(r=h.root)==null?void 0:r.ownerState),classes:k,ref:o,children:c})}))});var dt=lt;const ut=["BackdropComponent","closeAfterTransition","children","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted"],ft=e=>e.classes,pt=X("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,!o.open&&o.exited&&t.hidden]}})(({theme:e,ownerState:t})=>x({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),ht=X(dt,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),mt=i.exports.forwardRef(function(t,o){var n;const r=be({name:"MuiModal",props:t}),{BackdropComponent:s=ht,closeAfterTransition:c=!1,children:a,components:d={},componentsProps:h={},disableAutoFocus:m=!1,disableEnforceFocus:E=!1,disableEscapeKeyDown:R=!1,disablePortal:g=!1,disableRestoreFocus:u=!1,disableScrollLock:S=!1,hideBackdrop:y=!1,keepMounted:k=!1}=r,P=V(r,ut),[l,b]=i.exports.useState(!0),v={closeAfterTransition:c,disableAutoFocus:m,disableEnforceFocus:E,disableEscapeKeyDown:R,disablePortal:g,disableRestoreFocus:u,disableScrollLock:S,hideBackdrop:y,keepMounted:k},N=x({},r,v,{exited:l}),f=ft(N);return F(et,x({components:x({Root:pt},d),componentsProps:{root:x({},h.root,(!d.Root||!xe(d.Root))&&{ownerState:x({},(n=h.root)==null?void 0:n.ownerState)})},BackdropComponent:s,onTransitionEnter:()=>b(!1),onTransitionExited:()=>b(!0),ref:o},P,{classes:f},v,{children:a}))});var Rt=mt;export{Rt as M,De as P,gt as a,ie as c,Et as d,Ne as g,xe as i,J as o,yt as u};
