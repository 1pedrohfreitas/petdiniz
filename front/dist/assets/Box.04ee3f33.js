import{_ as u,p as P,q as B,t as N,v as S,w as p,b as _,x as C,C as T}from"./ButtonBase.4fe4f374.js";import{_ as r,r as b,a as j}from"./index.b0e91862.js";const v=["sx"],g=s=>{const e={systemProps:{},otherProps:{}};return Object.keys(s).forEach(t=>{P[t]?e.systemProps[t]=s[t]:e.otherProps[t]=s[t]}),e};function F(s){const{sx:e}=s,t=u(s,v),{systemProps:o,otherProps:n}=g(t);let a;return Array.isArray(e)?a=[o,...e]:typeof e=="function"?a=(...l)=>{const c=e(...l);return B(c)?r({},o,c):o}:a=r({},o,e),r({},n,{sx:a})}const w=["className","component"];function A(s={}){const{defaultTheme:e,defaultClassName:t="MuiBox-root",generateClassName:o,styleFunctionSx:n=S}=s,a=N("div")(n);return b.exports.forwardRef(function(i,m){const f=p(e),x=F(i),{className:d,component:h="div"}=x,y=u(x,w);return j(a,r({as:h,ref:m,className:_(d,o?o(t):t),theme:f},y))})}const M=C(),O=A({defaultTheme:M,defaultClassName:"MuiBox-root",generateClassName:T.generate});var k=O;export{k as B,F as e};
