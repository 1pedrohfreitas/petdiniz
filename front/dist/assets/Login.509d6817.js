import{h as x,r,j as d,a as t}from"./index.b0e91862.js";import{loginApi as y,postRequest as z}from"./Api.5a83ade6.js";/* empty css                      */import{S as B}from"./SnackBarCustom.0cc24725.js";import{l as I}from"./petdiniz.868b0f8c.js";import"./ButtonBase.4fe4f374.js";import"./Grow.67318f79.js";import"./Close.fd9a01c4.js";async function N(o,s){var a="";return o==null||o==""?a="O campo usuario n\xE3o pode estar vazio!":s==null||s==""?a="O campo senha n\xE3o pode estar vazio!":await y("login/",{username:o,password:s}).then(i=>{localStorage.setItem("petdiniz-token",i.data.token),a=`token:${i.data.token}`}).catch(i=>{a="Nome de usuario ou senha invalido"}),a}function b(){let o=x();const[s,a]=r.exports.useState(""),[c,i]=r.exports.useState(""),[g,m]=r.exports.useState(""),[k,f]=r.exports.useState(""),[h,u]=r.exports.useState(!1);r.exports.useEffect(()=>{v()},[]);async function v(){if(localStorage.getItem("petdiniz-token")!=null)try{const e=await z("/login/validatetoken",{token:localStorage.getItem("petdiniz-token")},localStorage.getItem("petdiniz-token"));e!=null&&e.status==200&&o(`/home/${localStorage.getItem("petdiniz-token")}`)}catch{console.log("Token Invalido")}}function p(e,n){return new Promise((l,A)=>{m(e),f(n),u(!0),l("Dados Atualizados")})}function S(e){N(s,c).then(n=>{if(n.substring(0,5)=="token"){const l=n;p("success","Login efetuado com sucesso!").then(()=>{setTimeout(()=>{u(!1)},2e3)}).then(()=>{console.log(l),setTimeout(()=>o(`/validalogin/${l.split(":")[1]}`),2e3)})}else p("error",n).finally(()=>{setTimeout(()=>{u(!1)},3e3)})}).catch(n=>{console.log("Erro")})}return d("div",{className:"loginArea",children:[t(B,{open:h,typeMessage:g,mensage:k}),t("div",{className:"logoArea",children:t("img",{src:I,alt:"logo"})}),d("div",{className:"userPassArea",children:[t("div",{className:"userArea",children:t("input",{type:"text",name:"userInput",id:"userInput",placeholder:"Usuario",value:s,onChange:e=>a(e.target.value.toLowerCase())})}),t("div",{className:"passArea",children:t("input",{type:"password",name:"userPassword",id:"userPassword",placeholder:"Senha",value:c,onChange:e=>i(e.target.value)})}),t("button",{className:"btnLogin",onClick:S,children:"Entrar"})]})]})}export{b as default};
