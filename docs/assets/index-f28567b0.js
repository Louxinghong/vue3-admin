import{d as N,g as m,r as x,o as V,c as $,f as s,t as h,a as n,w as _,b as v,h as o,F as H,i as J,n as K,_ as M,j as I,k as U}from"./index-0fcf21c4.js";const Q={class:"test-son"},Z=N({__name:"TestSon",props:{count:{default:0}},emits:["addCount","update:title"],setup(f,{emit:i}){const a=f;m(()=>a.count,(c,l)=>{console.log("count",c,l)});const u=()=>i("addCount");return(c,l)=>{const d=x("a-button");return V(),$("div",Q,[s("h2",null,h(c.count),1),n(d,{type:"primary",onClick:u},{default:_(()=>[v("点我count+1")]),_:1})])}}}),ee=(f,i,a)=>{const u=o(0);m([f,i],([l,d],[R,P])=>{c(l,d)});const c=(l,d)=>{u.value=a==="add"?l+d:l-d};return{calculateFnOptions:c,calculateResult:u}},B=ee,oe={class:"waterfall-flow"},te=N({__name:"WaterfallFlow",setup(f){const i=o([]),a=u=>{i.value.push(u)};return(u,c)=>(V(),$("div",oe,[(V(),$(H,null,J(30,l=>s("div",{ref_for:!0,ref:a,class:"flow-item",key:l,style:K({gridRowEnd:`span ${(l%2===0?50:100)/2}`})},null,4)),64))]))}});const le=M(te,[["__scopeId","data-v-24494e28"]]),ne={class:"test"},ae={class:"test-one"},se={class:"test-two"},ue={class:"test-three"},ce={class:"test-four"},de={class:"test-five"},ve=N({__name:"index",setup(f){const i=o(12),a=o({count:1,userInfo:{name:"xiaohong",age:25,gender:"男"}}),u=o({name:"xiaohong"});console.log(u.value.name);const c=o([{label:"123",value:1}]);console.log(c.value[0].label),I(()=>a.value.count%2);const l=I({get:()=>a.value.count+1,set:e=>{a.value.count=e}});m(()=>a.value.count,(e,t)=>{console.log(e,t)},{immediate:!0});const d=()=>i.value++,R=async()=>{l.value+=2},S=(e=>[e[1],e[0]])(["xiaohong",111]);console.log(S),console.log(((e,t)=>`${e} + 1 + ${t}`)(123,"小红"));const p=o(0),g=o(1);console.log("x",p.value,"y",g.value),m(p,e=>{console.log(`x is ${e}`)}),m(()=>p.value+g.value,e=>{console.log(`${p.value} + ${g.value} = ${e}`)}),m([p,()=>g.value],([e,t])=>{console.log(`x is ${e} and y is ${t}`)});const W=()=>{p.value=3},A=()=>{g.value=3};console.log([{label:"1",value:1}],[{label:"标题1",value:"1"}]);const O=o(!1),D=()=>new Promise(e=>{setTimeout(()=>{e([{label:"小红1号",value:1},{label:"小红2号",value:2}])},3e3)}),T=o([]),X=async()=>{console.log(1),O.value=!0;const e=await D();O.value=!1,T.value=e,console.log(e)},C=o(1),y=o(7),Y=o("add"),{calculateFnOptions:j,calculateResult:z}=B(C,y,Y.value);j(C.value,y.value);const k=o(1),F=o(7),L=o("add"),{calculateFnOptions:q,calculateResult:E}=B(k,F,L.value);return q(C.value,y.value),console.log(E),(e,t)=>{const w=x("a-button"),G=x("a-select"),b=x("a-input-number");return V(),$("div",ne,[s("div",ae,[n(w,{onClick:d},{default:_(()=>[v("给我+1")]),_:1}),n(Z,{count:i.value,onAddCount:d},null,8,["count"]),s("p",null,"state.count: "+h(a.value.count),1),s("p",null,"computedEven2: "+h(l.value),1),n(w,{type:"primary",onClick:R},{default:_(()=>[v("改变计算属性")]),_:1})]),s("div",se,[n(w,{onClick:W},{default:_(()=>[v("改变X")]),_:1}),n(w,{onClick:A},{default:_(()=>[v("改变Y")]),_:1})]),s("div",ue,[n(w,{loading:O.value,onClick:X},{default:_(()=>[v("获取Options")]),_:1},8,["loading"]),n(G,{options:T.value},null,8,["options"])]),s("div",ce,[n(b,{modelValue:C.value,"onUpdate:modelValue":t[0]||(t[0]=r=>C.value=r)},null,8,["modelValue"]),n(b,{modelValue:y.value,"onUpdate:modelValue":t[1]||(t[1]=r=>y.value=r)},null,8,["modelValue"]),s("p",null,h(U(z)),1)]),s("div",de,[n(b,{modelValue:k.value,"onUpdate:modelValue":t[2]||(t[2]=r=>k.value=r)},null,8,["modelValue"]),n(b,{modelValue:F.value,"onUpdate:modelValue":t[3]||(t[3]=r=>F.value=r)},null,8,["modelValue"]),s("p",null,h(U(E)),1)]),n(le)])}}});export{ve as default};
