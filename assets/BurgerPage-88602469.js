import{d as f,c as j,w as R,u as t,a as l,b as n,t as _,n as s,F as p,r as m,e as u,f as v,g as C,h as w,i as I,j as E,R as c,k as S,o,l as A,_ as G}from"./index-d1c9be50.js";const M=["src","alt"],N={key:0},U={key:1},V=n("button",null,"Добавьте его",-1),F={key:1},P=f({__name:"BurgerPage",emits:["openModal","deleteItem"],async setup(Z,{emit:h}){let i,d;const y=w(),B=I(),a=j(()=>A.burgers.find(e=>e._id===y.params.id)),k=([i,d]=R(()=>E(c.BURGERS)),i=await i,d(),i),$=async e=>{await k.$api.delete(e),h("deleteItem"),B.push({name:c.BURGERS})};return(e,g)=>{const b=S("router-link");return t(a)?(o(),l("section",{key:0,class:s(e.$style.burger)},[n("h2",{class:s([e.$style.title,"h2"])},_(t(a).name),3),n("img",{src:t(a).image,alt:t(a).name,class:s(e.$style.img)},null,10,M),n("div",{class:s(e.$style.ingredients)},[n("h3",{class:s(["h3",e.$style.subtitle])},"Состав",2),n("ul",{class:s(e.$style.list)},[(o(!0),l(p,null,m(t(a).ingredients,r=>(o(),l("li",{key:r,class:s(e.$style.item)},_(r),3))),128))],2)],2),n("div",{class:s(e.$style.restaurants)},[n("h3",{class:s(["h3",e.$style.subtitle])},"Рестораны, где его можно попробовать",2),t(a).restaurants?(o(),l("ul",N,[(o(!0),l(p,null,m(t(a).restaurants,r=>(o(),l("li",{key:r,class:s(e.$style.item)},_(r),3))),128))])):(o(),l("div",U,[u("Знаете ресторан, где готовят этот бургер? "),V]))],2),n("button",{class:s(e.$style.deleteBtn),onClick:g[0]||(g[0]=r=>$(t(a)._id))},"Удалить",2)],2)):(o(),l("div",F,[u(" Кажется, произошла ошибка, "),v(b,{to:{name:t(c).BURGERS},class:s(e.$style.goBack)},{default:C(()=>[u("вернуться на главную")]),_:1},8,["to","class"]),u("? ")]))}}}),z="_burger_hp0jg_9",D="_deleteBtn_hp0jg_17",L="_fadeIn_hp0jg_1",T="_title_hp0jg_22",q="_subtitle_hp0jg_27",H="_img_hp0jg_31",J="_ingredients_hp0jg_38",K="_restaurants_hp0jg_42",O="_item_hp0jg_46",Q="_list_hp0jg_66",W="_goBack_hp0jg_78",X={burger:z,deleteBtn:D,fadeIn:L,title:T,subtitle:q,img:H,ingredients:J,restaurants:K,item:O,list:Q,goBack:W},Y={$style:X},ee=G(P,[["__cssModules",Y]]);export{ee as default};
