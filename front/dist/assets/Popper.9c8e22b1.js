import{r as H,a as be,_ as se}from"./index.b0e91862.js";import{_ as tt,o as ht,h as Ie,y as Xe,s as gt,I as yt,u as bt}from"./ButtonBase.4fe4f374.js";import{P as wt}from"./Modal.3a8b8f7e.js";var j="top",k="bottom",S="right",B="left",je="auto",ce=[j,k,S,B],J="start",pe="end",xt="clippingParents",rt="viewport",oe="popper",Ot="reference",Ye=ce.reduce(function(t,e){return t.concat([e+"-"+J,e+"-"+pe])},[]),nt=[].concat(ce,[je]).reduce(function(t,e){return t.concat([e,e+"-"+J,e+"-"+pe])},[]),Pt="beforeRead",Et="read",Rt="afterRead",At="beforeMain",Dt="main",jt="afterMain",Bt="beforeWrite",$t="write",Ct="afterWrite",Tt=[Pt,Et,Rt,At,Dt,jt,Bt,$t,Ct];function N(t){return t?(t.nodeName||"").toLowerCase():null}function W(t){if(t==null)return window;if(t.toString()!=="[object Window]"){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function K(t){var e=W(t).Element;return t instanceof e||t instanceof Element}function T(t){var e=W(t).HTMLElement;return t instanceof e||t instanceof HTMLElement}function Be(t){if(typeof ShadowRoot=="undefined")return!1;var e=W(t).ShadowRoot;return t instanceof e||t instanceof ShadowRoot}function kt(t){var e=t.state;Object.keys(e.elements).forEach(function(r){var n=e.styles[r]||{},o=e.attributes[r]||{},a=e.elements[r];!T(a)||!N(a)||(Object.assign(a.style,n),Object.keys(o).forEach(function(i){var s=o[i];s===!1?a.removeAttribute(i):a.setAttribute(i,s===!0?"":s)}))})}function St(t){var e=t.state,r={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,r.popper),e.styles=r,e.elements.arrow&&Object.assign(e.elements.arrow.style,r.arrow),function(){Object.keys(e.elements).forEach(function(n){var o=e.elements[n],a=e.attributes[n]||{},i=Object.keys(e.styles.hasOwnProperty(n)?e.styles[n]:r[n]),s=i.reduce(function(f,c){return f[c]="",f},{});!T(o)||!N(o)||(Object.assign(o.style,s),Object.keys(a).forEach(function(f){o.removeAttribute(f)}))})}}var Mt={name:"applyStyles",enabled:!0,phase:"write",fn:kt,effect:St,requires:["computeStyles"]};function F(t){return t.split("-")[0]}var z=Math.max,we=Math.min,Q=Math.round;function Z(t,e){e===void 0&&(e=!1);var r=t.getBoundingClientRect(),n=1,o=1;if(T(t)&&e){var a=t.offsetHeight,i=t.offsetWidth;i>0&&(n=Q(r.width)/i||1),a>0&&(o=Q(r.height)/a||1)}return{width:r.width/n,height:r.height/o,top:r.top/o,right:r.right/n,bottom:r.bottom/o,left:r.left/n,x:r.left/n,y:r.top/o}}function $e(t){var e=Z(t),r=t.offsetWidth,n=t.offsetHeight;return Math.abs(e.width-r)<=1&&(r=e.width),Math.abs(e.height-n)<=1&&(n=e.height),{x:t.offsetLeft,y:t.offsetTop,width:r,height:n}}function ot(t,e){var r=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(r&&Be(r)){var n=e;do{if(n&&t.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function V(t){return W(t).getComputedStyle(t)}function Lt(t){return["table","td","th"].indexOf(N(t))>=0}function q(t){return((K(t)?t.ownerDocument:t.document)||window.document).documentElement}function xe(t){return N(t)==="html"?t:t.assignedSlot||t.parentNode||(Be(t)?t.host:null)||q(t)}function ze(t){return!T(t)||V(t).position==="fixed"?null:t.offsetParent}function Wt(t){var e=navigator.userAgent.toLowerCase().indexOf("firefox")!==-1,r=navigator.userAgent.indexOf("Trident")!==-1;if(r&&T(t)){var n=V(t);if(n.position==="fixed")return null}var o=xe(t);for(Be(o)&&(o=o.host);T(o)&&["html","body"].indexOf(N(o))<0;){var a=V(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||e&&a.willChange==="filter"||e&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function le(t){for(var e=W(t),r=ze(t);r&&Lt(r)&&V(r).position==="static";)r=ze(r);return r&&(N(r)==="html"||N(r)==="body"&&V(r).position==="static")?e:r||Wt(t)||e}function Ce(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function ae(t,e,r){return z(t,we(e,r))}function Ht(t,e,r){var n=ae(t,e,r);return n>r?r:n}function at(){return{top:0,right:0,bottom:0,left:0}}function it(t){return Object.assign({},at(),t)}function st(t,e){return e.reduce(function(r,n){return r[n]=t,r},{})}var Ft=function(e,r){return e=typeof e=="function"?e(Object.assign({},r.rects,{placement:r.placement})):e,it(typeof e!="number"?e:st(e,ce))};function Nt(t){var e,r=t.state,n=t.name,o=t.options,a=r.elements.arrow,i=r.modifiersData.popperOffsets,s=F(r.placement),f=Ce(s),c=[B,S].indexOf(s)>=0,p=c?"height":"width";if(!(!a||!i)){var m=Ft(o.padding,r),P=$e(a),l=f==="y"?j:B,h=f==="y"?k:S,u=r.rects.reference[p]+r.rects.reference[f]-i[f]-r.rects.popper[p],v=i[f]-r.rects.reference[f],g=le(a),y=g?f==="y"?g.clientHeight||0:g.clientWidth||0:0,w=u/2-v/2,d=m[l],x=y-P[p]-m[h],b=y/2-P[p]/2+w,O=ae(d,b,x),E=f;r.modifiersData[n]=(e={},e[E]=O,e.centerOffset=O-b,e)}}function Vt(t){var e=t.state,r=t.options,n=r.element,o=n===void 0?"[data-popper-arrow]":n;o!=null&&(typeof o=="string"&&(o=e.elements.popper.querySelector(o),!o)||!ot(e.elements.popper,o)||(e.elements.arrow=o))}var Ut={name:"arrow",enabled:!0,phase:"main",fn:Nt,effect:Vt,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function _(t){return t.split("-")[1]}var qt={top:"auto",right:"auto",bottom:"auto",left:"auto"};function It(t){var e=t.x,r=t.y,n=window,o=n.devicePixelRatio||1;return{x:Q(e*o)/o||0,y:Q(r*o)/o||0}}function Ge(t){var e,r=t.popper,n=t.popperRect,o=t.placement,a=t.variation,i=t.offsets,s=t.position,f=t.gpuAcceleration,c=t.adaptive,p=t.roundOffsets,m=t.isFixed,P=i.x,l=P===void 0?0:P,h=i.y,u=h===void 0?0:h,v=typeof p=="function"?p({x:l,y:u}):{x:l,y:u};l=v.x,u=v.y;var g=i.hasOwnProperty("x"),y=i.hasOwnProperty("y"),w=B,d=j,x=window;if(c){var b=le(r),O="clientHeight",E="clientWidth";if(b===W(r)&&(b=q(r),V(b).position!=="static"&&s==="absolute"&&(O="scrollHeight",E="scrollWidth")),b=b,o===j||(o===B||o===S)&&a===pe){d=k;var A=m&&b===x&&x.visualViewport?x.visualViewport.height:b[O];u-=A-n.height,u*=f?1:-1}if(o===B||(o===j||o===k)&&a===pe){w=S;var R=m&&b===x&&x.visualViewport?x.visualViewport.width:b[E];l-=R-n.width,l*=f?1:-1}}var D=Object.assign({position:s},c&&qt),M=p===!0?It({x:l,y:u}):{x:l,y:u};if(l=M.x,u=M.y,f){var $;return Object.assign({},D,($={},$[d]=y?"0":"",$[w]=g?"0":"",$.transform=(x.devicePixelRatio||1)<=1?"translate("+l+"px, "+u+"px)":"translate3d("+l+"px, "+u+"px, 0)",$))}return Object.assign({},D,(e={},e[d]=y?u+"px":"",e[w]=g?l+"px":"",e.transform="",e))}function Xt(t){var e=t.state,r=t.options,n=r.gpuAcceleration,o=n===void 0?!0:n,a=r.adaptive,i=a===void 0?!0:a,s=r.roundOffsets,f=s===void 0?!0:s,c={placement:F(e.placement),variation:_(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:o,isFixed:e.options.strategy==="fixed"};e.modifiersData.popperOffsets!=null&&(e.styles.popper=Object.assign({},e.styles.popper,Ge(Object.assign({},c,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:i,roundOffsets:f})))),e.modifiersData.arrow!=null&&(e.styles.arrow=Object.assign({},e.styles.arrow,Ge(Object.assign({},c,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})}var Yt={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Xt,data:{}},ge={passive:!0};function zt(t){var e=t.state,r=t.instance,n=t.options,o=n.scroll,a=o===void 0?!0:o,i=n.resize,s=i===void 0?!0:i,f=W(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return a&&c.forEach(function(p){p.addEventListener("scroll",r.update,ge)}),s&&f.addEventListener("resize",r.update,ge),function(){a&&c.forEach(function(p){p.removeEventListener("scroll",r.update,ge)}),s&&f.removeEventListener("resize",r.update,ge)}}var Gt={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:zt,data:{}},Jt={left:"right",right:"left",bottom:"top",top:"bottom"};function ye(t){return t.replace(/left|right|bottom|top/g,function(e){return Jt[e]})}var Kt={start:"end",end:"start"};function Je(t){return t.replace(/start|end/g,function(e){return Kt[e]})}function Te(t){var e=W(t),r=e.pageXOffset,n=e.pageYOffset;return{scrollLeft:r,scrollTop:n}}function ke(t){return Z(q(t)).left+Te(t).scrollLeft}function Qt(t){var e=W(t),r=q(t),n=e.visualViewport,o=r.clientWidth,a=r.clientHeight,i=0,s=0;return n&&(o=n.width,a=n.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(i=n.offsetLeft,s=n.offsetTop)),{width:o,height:a,x:i+ke(t),y:s}}function Zt(t){var e,r=q(t),n=Te(t),o=(e=t.ownerDocument)==null?void 0:e.body,a=z(r.scrollWidth,r.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),i=z(r.scrollHeight,r.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),s=-n.scrollLeft+ke(t),f=-n.scrollTop;return V(o||r).direction==="rtl"&&(s+=z(r.clientWidth,o?o.clientWidth:0)-a),{width:a,height:i,x:s,y:f}}function Se(t){var e=V(t),r=e.overflow,n=e.overflowX,o=e.overflowY;return/auto|scroll|overlay|hidden/.test(r+o+n)}function pt(t){return["html","body","#document"].indexOf(N(t))>=0?t.ownerDocument.body:T(t)&&Se(t)?t:pt(xe(t))}function ie(t,e){var r;e===void 0&&(e=[]);var n=pt(t),o=n===((r=t.ownerDocument)==null?void 0:r.body),a=W(n),i=o?[a].concat(a.visualViewport||[],Se(n)?n:[]):n,s=e.concat(i);return o?s:s.concat(ie(xe(i)))}function Ae(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function _t(t){var e=Z(t);return e.top=e.top+t.clientTop,e.left=e.left+t.clientLeft,e.bottom=e.top+t.clientHeight,e.right=e.left+t.clientWidth,e.width=t.clientWidth,e.height=t.clientHeight,e.x=e.left,e.y=e.top,e}function Ke(t,e){return e===rt?Ae(Qt(t)):K(e)?_t(e):Ae(Zt(q(t)))}function er(t){var e=ie(xe(t)),r=["absolute","fixed"].indexOf(V(t).position)>=0,n=r&&T(t)?le(t):t;return K(n)?e.filter(function(o){return K(o)&&ot(o,n)&&N(o)!=="body"}):[]}function tr(t,e,r){var n=e==="clippingParents"?er(t):[].concat(e),o=[].concat(n,[r]),a=o[0],i=o.reduce(function(s,f){var c=Ke(t,f);return s.top=z(c.top,s.top),s.right=we(c.right,s.right),s.bottom=we(c.bottom,s.bottom),s.left=z(c.left,s.left),s},Ke(t,a));return i.width=i.right-i.left,i.height=i.bottom-i.top,i.x=i.left,i.y=i.top,i}function ft(t){var e=t.reference,r=t.element,n=t.placement,o=n?F(n):null,a=n?_(n):null,i=e.x+e.width/2-r.width/2,s=e.y+e.height/2-r.height/2,f;switch(o){case j:f={x:i,y:e.y-r.height};break;case k:f={x:i,y:e.y+e.height};break;case S:f={x:e.x+e.width,y:s};break;case B:f={x:e.x-r.width,y:s};break;default:f={x:e.x,y:e.y}}var c=o?Ce(o):null;if(c!=null){var p=c==="y"?"height":"width";switch(a){case J:f[c]=f[c]-(e[p]/2-r[p]/2);break;case pe:f[c]=f[c]+(e[p]/2-r[p]/2);break}}return f}function fe(t,e){e===void 0&&(e={});var r=e,n=r.placement,o=n===void 0?t.placement:n,a=r.boundary,i=a===void 0?xt:a,s=r.rootBoundary,f=s===void 0?rt:s,c=r.elementContext,p=c===void 0?oe:c,m=r.altBoundary,P=m===void 0?!1:m,l=r.padding,h=l===void 0?0:l,u=it(typeof h!="number"?h:st(h,ce)),v=p===oe?Ot:oe,g=t.rects.popper,y=t.elements[P?v:p],w=tr(K(y)?y:y.contextElement||q(t.elements.popper),i,f),d=Z(t.elements.reference),x=ft({reference:d,element:g,strategy:"absolute",placement:o}),b=Ae(Object.assign({},g,x)),O=p===oe?b:d,E={top:w.top-O.top+u.top,bottom:O.bottom-w.bottom+u.bottom,left:w.left-O.left+u.left,right:O.right-w.right+u.right},A=t.modifiersData.offset;if(p===oe&&A){var R=A[o];Object.keys(E).forEach(function(D){var M=[S,k].indexOf(D)>=0?1:-1,$=[j,k].indexOf(D)>=0?"y":"x";E[D]+=R[$]*M})}return E}function rr(t,e){e===void 0&&(e={});var r=e,n=r.placement,o=r.boundary,a=r.rootBoundary,i=r.padding,s=r.flipVariations,f=r.allowedAutoPlacements,c=f===void 0?nt:f,p=_(n),m=p?s?Ye:Ye.filter(function(h){return _(h)===p}):ce,P=m.filter(function(h){return c.indexOf(h)>=0});P.length===0&&(P=m);var l=P.reduce(function(h,u){return h[u]=fe(t,{placement:u,boundary:o,rootBoundary:a,padding:i})[F(u)],h},{});return Object.keys(l).sort(function(h,u){return l[h]-l[u]})}function nr(t){if(F(t)===je)return[];var e=ye(t);return[Je(t),e,Je(e)]}function or(t){var e=t.state,r=t.options,n=t.name;if(!e.modifiersData[n]._skip){for(var o=r.mainAxis,a=o===void 0?!0:o,i=r.altAxis,s=i===void 0?!0:i,f=r.fallbackPlacements,c=r.padding,p=r.boundary,m=r.rootBoundary,P=r.altBoundary,l=r.flipVariations,h=l===void 0?!0:l,u=r.allowedAutoPlacements,v=e.options.placement,g=F(v),y=g===v,w=f||(y||!h?[ye(v)]:nr(v)),d=[v].concat(w).reduce(function(G,U){return G.concat(F(U)===je?rr(e,{placement:U,boundary:p,rootBoundary:m,padding:c,flipVariations:h,allowedAutoPlacements:u}):U)},[]),x=e.rects.reference,b=e.rects.popper,O=new Map,E=!0,A=d[0],R=0;R<d.length;R++){var D=d[R],M=F(D),$=_(D)===J,ee=[j,k].indexOf(M)>=0,te=ee?"width":"height",C=fe(e,{placement:D,boundary:p,rootBoundary:m,altBoundary:P,padding:c}),L=ee?$?S:B:$?k:j;x[te]>b[te]&&(L=ye(L));var ue=ye(L),I=[];if(a&&I.push(C[M]<=0),s&&I.push(C[L]<=0,C[ue]<=0),I.every(function(G){return G})){A=D,E=!1;break}O.set(D,I)}if(E)for(var de=h?3:1,Oe=function(U){var ne=d.find(function(me){var X=O.get(me);if(X)return X.slice(0,U).every(function(Pe){return Pe})});if(ne)return A=ne,"break"},re=de;re>0;re--){var ve=Oe(re);if(ve==="break")break}e.placement!==A&&(e.modifiersData[n]._skip=!0,e.placement=A,e.reset=!0)}}var ar={name:"flip",enabled:!0,phase:"main",fn:or,requiresIfExists:["offset"],data:{_skip:!1}};function Qe(t,e,r){return r===void 0&&(r={x:0,y:0}),{top:t.top-e.height-r.y,right:t.right-e.width+r.x,bottom:t.bottom-e.height+r.y,left:t.left-e.width-r.x}}function Ze(t){return[j,S,k,B].some(function(e){return t[e]>=0})}function ir(t){var e=t.state,r=t.name,n=e.rects.reference,o=e.rects.popper,a=e.modifiersData.preventOverflow,i=fe(e,{elementContext:"reference"}),s=fe(e,{altBoundary:!0}),f=Qe(i,n),c=Qe(s,o,a),p=Ze(f),m=Ze(c);e.modifiersData[r]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:m},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":m})}var sr={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:ir};function pr(t,e,r){var n=F(t),o=[B,j].indexOf(n)>=0?-1:1,a=typeof r=="function"?r(Object.assign({},e,{placement:t})):r,i=a[0],s=a[1];return i=i||0,s=(s||0)*o,[B,S].indexOf(n)>=0?{x:s,y:i}:{x:i,y:s}}function fr(t){var e=t.state,r=t.options,n=t.name,o=r.offset,a=o===void 0?[0,0]:o,i=nt.reduce(function(p,m){return p[m]=pr(m,e.rects,a),p},{}),s=i[e.placement],f=s.x,c=s.y;e.modifiersData.popperOffsets!=null&&(e.modifiersData.popperOffsets.x+=f,e.modifiersData.popperOffsets.y+=c),e.modifiersData[n]=i}var cr={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:fr};function lr(t){var e=t.state,r=t.name;e.modifiersData[r]=ft({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})}var ur={name:"popperOffsets",enabled:!0,phase:"read",fn:lr,data:{}};function dr(t){return t==="x"?"y":"x"}function vr(t){var e=t.state,r=t.options,n=t.name,o=r.mainAxis,a=o===void 0?!0:o,i=r.altAxis,s=i===void 0?!1:i,f=r.boundary,c=r.rootBoundary,p=r.altBoundary,m=r.padding,P=r.tether,l=P===void 0?!0:P,h=r.tetherOffset,u=h===void 0?0:h,v=fe(e,{boundary:f,rootBoundary:c,padding:m,altBoundary:p}),g=F(e.placement),y=_(e.placement),w=!y,d=Ce(g),x=dr(d),b=e.modifiersData.popperOffsets,O=e.rects.reference,E=e.rects.popper,A=typeof u=="function"?u(Object.assign({},e.rects,{placement:e.placement})):u,R=typeof A=="number"?{mainAxis:A,altAxis:A}:Object.assign({mainAxis:0,altAxis:0},A),D=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,M={x:0,y:0};if(!!b){if(a){var $,ee=d==="y"?j:B,te=d==="y"?k:S,C=d==="y"?"height":"width",L=b[d],ue=L+v[ee],I=L-v[te],de=l?-E[C]/2:0,Oe=y===J?O[C]:E[C],re=y===J?-E[C]:-O[C],ve=e.elements.arrow,G=l&&ve?$e(ve):{width:0,height:0},U=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:at(),ne=U[ee],me=U[te],X=ae(0,O[C],G[C]),Pe=w?O[C]/2-de-X-ne-R.mainAxis:Oe-X-ne-R.mainAxis,ct=w?-O[C]/2+de+X+me+R.mainAxis:re+X+me+R.mainAxis,Ee=e.elements.arrow&&le(e.elements.arrow),lt=Ee?d==="y"?Ee.clientTop||0:Ee.clientLeft||0:0,Me=($=D==null?void 0:D[d])!=null?$:0,ut=L+Pe-Me-lt,dt=L+ct-Me,Le=ae(l?we(ue,ut):ue,L,l?z(I,dt):I);b[d]=Le,M[d]=Le-L}if(s){var We,vt=d==="x"?j:B,mt=d==="x"?k:S,Y=b[x],he=x==="y"?"height":"width",He=Y+v[vt],Fe=Y-v[mt],Re=[j,B].indexOf(g)!==-1,Ne=(We=D==null?void 0:D[x])!=null?We:0,Ve=Re?He:Y-O[he]-E[he]-Ne+R.altAxis,Ue=Re?Y+O[he]+E[he]-Ne-R.altAxis:Fe,qe=l&&Re?Ht(Ve,Y,Ue):ae(l?Ve:He,Y,l?Ue:Fe);b[x]=qe,M[x]=qe-Y}e.modifiersData[n]=M}}var mr={name:"preventOverflow",enabled:!0,phase:"main",fn:vr,requiresIfExists:["offset"]};function hr(t){return{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}}function gr(t){return t===W(t)||!T(t)?Te(t):hr(t)}function yr(t){var e=t.getBoundingClientRect(),r=Q(e.width)/t.offsetWidth||1,n=Q(e.height)/t.offsetHeight||1;return r!==1||n!==1}function br(t,e,r){r===void 0&&(r=!1);var n=T(e),o=T(e)&&yr(e),a=q(e),i=Z(t,o),s={scrollLeft:0,scrollTop:0},f={x:0,y:0};return(n||!n&&!r)&&((N(e)!=="body"||Se(a))&&(s=gr(e)),T(e)?(f=Z(e,!0),f.x+=e.clientLeft,f.y+=e.clientTop):a&&(f.x=ke(a))),{x:i.left+s.scrollLeft-f.x,y:i.top+s.scrollTop-f.y,width:i.width,height:i.height}}function wr(t){var e=new Map,r=new Set,n=[];t.forEach(function(a){e.set(a.name,a)});function o(a){r.add(a.name);var i=[].concat(a.requires||[],a.requiresIfExists||[]);i.forEach(function(s){if(!r.has(s)){var f=e.get(s);f&&o(f)}}),n.push(a)}return t.forEach(function(a){r.has(a.name)||o(a)}),n}function xr(t){var e=wr(t);return Tt.reduce(function(r,n){return r.concat(e.filter(function(o){return o.phase===n}))},[])}function Or(t){var e;return function(){return e||(e=new Promise(function(r){Promise.resolve().then(function(){e=void 0,r(t())})})),e}}function Pr(t){var e=t.reduce(function(r,n){var o=r[n.name];return r[n.name]=o?Object.assign({},o,n,{options:Object.assign({},o.options,n.options),data:Object.assign({},o.data,n.data)}):n,r},{});return Object.keys(e).map(function(r){return e[r]})}var _e={placement:"bottom",modifiers:[],strategy:"absolute"};function et(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return!e.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function Er(t){t===void 0&&(t={});var e=t,r=e.defaultModifiers,n=r===void 0?[]:r,o=e.defaultOptions,a=o===void 0?_e:o;return function(s,f,c){c===void 0&&(c=a);var p={placement:"bottom",orderedModifiers:[],options:Object.assign({},_e,a),modifiersData:{},elements:{reference:s,popper:f},attributes:{},styles:{}},m=[],P=!1,l={state:p,setOptions:function(g){var y=typeof g=="function"?g(p.options):g;u(),p.options=Object.assign({},a,p.options,y),p.scrollParents={reference:K(s)?ie(s):s.contextElement?ie(s.contextElement):[],popper:ie(f)};var w=xr(Pr([].concat(n,p.options.modifiers)));return p.orderedModifiers=w.filter(function(d){return d.enabled}),h(),l.update()},forceUpdate:function(){if(!P){var g=p.elements,y=g.reference,w=g.popper;if(!!et(y,w)){p.rects={reference:br(y,le(w),p.options.strategy==="fixed"),popper:$e(w)},p.reset=!1,p.placement=p.options.placement,p.orderedModifiers.forEach(function(R){return p.modifiersData[R.name]=Object.assign({},R.data)});for(var d=0;d<p.orderedModifiers.length;d++){if(p.reset===!0){p.reset=!1,d=-1;continue}var x=p.orderedModifiers[d],b=x.fn,O=x.options,E=O===void 0?{}:O,A=x.name;typeof b=="function"&&(p=b({state:p,options:E,name:A,instance:l})||p)}}}},update:Or(function(){return new Promise(function(v){l.forceUpdate(),v(p)})}),destroy:function(){u(),P=!0}};if(!et(s,f))return l;l.setOptions(c).then(function(v){!P&&c.onFirstUpdate&&c.onFirstUpdate(v)});function h(){p.orderedModifiers.forEach(function(v){var g=v.name,y=v.options,w=y===void 0?{}:y,d=v.effect;if(typeof d=="function"){var x=d({state:p,name:g,instance:l,options:w}),b=function(){};m.push(x||b)}})}function u(){m.forEach(function(v){return v()}),m=[]}return l}}var Rr=[Gt,ur,Yt,Mt,cr,ar,mr,Ut,sr],Ar=Er({defaultModifiers:Rr});const Dr=["anchorEl","children","direction","disablePortal","modifiers","open","ownerState","placement","popperOptions","popperRef","TransitionProps"],jr=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition"];function Br(t,e){if(e==="ltr")return t;switch(t){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return t}}function De(t){return typeof t=="function"?t():t}const $r={},Cr=H.exports.forwardRef(function(e,r){const{anchorEl:n,children:o,direction:a,disablePortal:i,modifiers:s,open:f,placement:c,popperOptions:p,popperRef:m,TransitionProps:P}=e,l=tt(e,Dr),h=H.exports.useRef(null),u=Ie(h,r),v=H.exports.useRef(null),g=Ie(v,m),y=H.exports.useRef(g);Xe(()=>{y.current=g},[g]),H.exports.useImperativeHandle(m,()=>v.current,[]);const w=Br(c,a),[d,x]=H.exports.useState(w);H.exports.useEffect(()=>{v.current&&v.current.forceUpdate()}),Xe(()=>{if(!n||!f)return;const O=R=>{x(R.placement)};De(n);let E=[{name:"preventOverflow",options:{altBoundary:i}},{name:"flip",options:{altBoundary:i}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:R})=>{O(R)}}];s!=null&&(E=E.concat(s)),p&&p.modifiers!=null&&(E=E.concat(p.modifiers));const A=Ar(De(n),h.current,se({placement:w},p,{modifiers:E}));return y.current(A),()=>{A.destroy(),y.current(null)}},[n,i,s,f,p,w]);const b={placement:d};return P!==null&&(b.TransitionProps=P),be("div",se({ref:u,role:"tooltip"},l,{children:typeof o=="function"?o(b):o}))}),Tr=H.exports.forwardRef(function(e,r){const{anchorEl:n,children:o,container:a,direction:i="ltr",disablePortal:s=!1,keepMounted:f=!1,modifiers:c,open:p,placement:m="bottom",popperOptions:P=$r,popperRef:l,style:h,transition:u=!1}=e,v=tt(e,jr),[g,y]=H.exports.useState(!0),w=()=>{y(!1)},d=()=>{y(!0)};if(!f&&!p&&(!u||g))return null;const x=a||(n?ht(De(n)).body:void 0);return be(wt,{disablePortal:s,container:x,children:be(Cr,se({anchorEl:n,direction:i,disablePortal:s,modifiers:c,ref:r,open:u?!g:p,placement:m,popperOptions:P,popperRef:l},v,{style:se({position:"fixed",top:0,left:0,display:!p&&f&&(!u||g)?"none":null},h),TransitionProps:u?{in:p,onEnter:w,onExited:d}:null,children:o}))})});var kr=Tr;const Sr=gt(kr,{name:"MuiPopper",slot:"Root",overridesResolver:(t,e)=>e.root})({}),Mr=H.exports.forwardRef(function(e,r){const n=yt(),o=bt({props:e,name:"MuiPopper"});return be(Sr,se({direction:n==null?void 0:n.direction},o,{ref:r}))});var Fr=Mr;export{Fr as P};
