import{l as x,u as y,r,p as z,j as p,a,S as B,b as N}from"./index.16da5136.js";async function A(s,n){var t="";return s==null||s==""?t="O campo usuario n\xE3o pode estar vazio!":n==null||n==""?t="O campo senha n\xE3o pode estar vazio!":await x("login/",{username:s,password:n}).then(i=>{localStorage.setItem("petdiniz-token",i.data.token),t=`token:${i.data.token}`}).catch(i=>{t="Nome de usuario ou senha invalido"}),t}function w(){let s=y();const[n,t]=r.exports.useState(""),[l,i]=r.exports.useState(""),[g,m]=r.exports.useState(""),[k,h]=r.exports.useState(""),[f,c]=r.exports.useState(!1);r.exports.useEffect(()=>{v()},[]);async function v(){if(localStorage.getItem("petdiniz-token")!=null)try{const e=await z("/login/validatetoken",{token:localStorage.getItem("petdiniz-token")},localStorage.getItem("petdiniz-token"));e!=null&&e.status==200&&s(`/home/${localStorage.getItem("petdiniz-token")}`)}catch{}}function d(e,o){return new Promise((u,I)=>{m(e),h(o),c(!0),u("Dados Atualizados")})}function S(e){A(n,l).then(o=>{if(o.substring(0,5)=="token"){const u=o;d("success","Login efetuado com sucesso!").then(()=>{setTimeout(()=>{c(!1)},2e3)}).then(()=>{setTimeout(()=>s(`/validalogin/${u.split(":")[1]}`),2e3)})}else d("error",o).finally(()=>{setTimeout(()=>{c(!1)},3e3)})}).catch(o=>{})}return p("div",{className:"loginArea",children:[a(B,{open:f,typeMessage:g,mensage:k}),a("div",{className:"logoArea",children:a("img",{src:N,alt:"logo"})}),p("div",{className:"userPassArea",children:[a("div",{className:"userArea",children:a("input",{type:"text",name:"userInput",id:"userInput",placeholder:"Usuario",value:n,onChange:e=>t(e.target.value.toLowerCase())})}),a("div",{className:"passArea",children:a("input",{type:"password",name:"userPassword",id:"userPassword",placeholder:"Senha",value:l,onChange:e=>i(e.target.value)})}),a("button",{className:"btnLogin",onClick:S,children:"Entrar"})]})]})}export{w as default};