(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["app"],{0:function(e,n,t){e.exports=t("2f39")},"2f39":function(e,n,t){"use strict";t.r(n);var r=t("967e"),a=t.n(r),o=(t("a481"),t("96cf"),t("7d6e"),t("e54f"),t("985d"),t("31cd"),t("2b0e")),c=t("b05d"),u=t("2a19"),i=t("f508");o["a"].use(c["a"],{config:{},plugins:{Notify:u["a"],Loading:i["a"]}});var s=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"q-app"}},[t("router-view")],1)},l=[],p={name:"App"},f=p,d=t("2877"),h=Object(d["a"])(f,s,l,!1,null,null,null),b=h.exports,w=t("2f62");o["a"].use(w["a"]);var v=function(){var e=new w["a"].Store({modules:{},strict:!1});return e},m=t("8c4f"),x=[{path:"/",component:function(){return Promise.all([t.e("a14cc35e"),t.e("2d22c0ff")]).then(t.bind(null,"f241"))},children:[{path:"",name:"Auth",component:function(){return Promise.all([t.e("a14cc35e"),t.e("2d0b2002")]).then(t.bind(null,"21f3"))}},{path:"accounts",name:"Accounts",component:function(){return Promise.all([t.e("a14cc35e"),t.e("2d230477")]).then(t.bind(null,"ec36"))}},{path:"account/:id",name:"Account",component:function(){return Promise.all([t.e("a14cc35e"),t.e("c879bb62")]).then(t.bind(null,"8c2d"))}}]}];x.push({path:"*",component:function(){return Promise.all([t.e("a14cc35e"),t.e("4b47640d")]).then(t.bind(null,"e51e"))}});var k=x;o["a"].use(m["a"]);var g=function(){var e=new m["a"]({scrollBehavior:function(){return{x:0,y:0}},routes:k,mode:"hash",base:""});return e},y=function(){var e="function"===typeof v?v({Vue:o["a"]}):v,n="function"===typeof g?g({Vue:o["a"],store:e}):g;e.$router=n;var t={el:"#q-app",router:n,store:e,render:function(e){return e(b)}};return{app:t,store:e,router:n}},P=t("bc3a"),A=t.n(P),V=t("5132"),$=t.n(V);o["a"].use(new $.a({debug:!0,connection:"https://horizonedge.tech",options:{path:"/blockpesa/io"}})),o["a"].prototype.$axios=A.a;var q=y(),J=q.app,_=q.store,j=q.router;function z(){var e,n,t,r,c;return a.a.async((function(u){while(1)switch(u.prev=u.next){case 0:e=!0,n=function(n){e=!1,window.location.href=n},t=window.location.href.replace(window.location.origin,""),r=[void 0],c=0;case 5:if(!(!0===e&&c<r.length)){u.next=23;break}if("function"===typeof r[c]){u.next=8;break}return u.abrupt("continue",20);case 8:return u.prev=8,u.next=11,a.a.awrap(r[c]({app:J,router:j,store:_,Vue:o["a"],ssrContext:null,redirect:n,urlPath:t}));case 11:u.next=20;break;case 13:if(u.prev=13,u.t0=u["catch"](8),!u.t0||!u.t0.url){u.next=18;break}return window.location.href=u.t0.url,u.abrupt("return");case 18:return console.error("[Quasar] boot error:",u.t0),u.abrupt("return");case 20:c++,u.next=5;break;case 23:if(!1!==e){u.next=25;break}return u.abrupt("return");case 25:new o["a"](J);case 26:case"end":return u.stop()}}),null,null,[[8,13]])}z()},"31cd":function(e,n,t){}},[[0,"runtime","vendor"]]]);