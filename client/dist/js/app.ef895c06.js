(function(e){function t(t){for(var r,o,u=t[0],i=t[1],s=t[2],l=0,f=[];l<u.length;l++)o=u[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);d&&d(t);while(f.length)f.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,o=1;o<n.length;o++){var u=n[o];0!==a[u]&&(r=!1)}r&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},a={app:0},c=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-4c012e8c":"084b3db0","chunk-4eccaceb":"9e2cdbd3","chunk-5c520524":"c078ad6c"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-4c012e8c":1,"chunk-4eccaceb":1,"chunk-5c520524":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-4c012e8c":"7c48bd1a","chunk-4eccaceb":"3252bfa2","chunk-5c520524":"a5194b06"}[e]+".css",a=i.p+r,c=document.getElementsByTagName("link"),u=0;u<c.length;u++){var s=c[u],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===a))return t()}var f=document.getElementsByTagName("style");for(u=0;u<f.length;u++){s=f[u],l=s.getAttribute("data-href");if(l===r||l===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete o[e],d.parentNode.removeChild(d),n(c)},d.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=c);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=u(e);var f=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",f.name="ChunkLoadError",f.type=r,f.request=o,n[1](f)}a[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var d=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"corner"},[n("div",{staticClass:"logo"},[e._v(e._s(e.user.username?e.user.username:""))]),e.user.username?n("div",{staticClass:"button",on:{click:e.logout}},[e._v("Logout")]):e._e()]),n("div",{attrs:{id:"nav"}},[e.user.admin&&"sessions"!==e.$route.name?n("router-link",{staticClass:"button",attrs:{to:"/sessions"}},[e._v(" Sessions ")]):e._e()],1),n("router-view")],1)},a=[],c=(n("4160"),n("fb6a"),n("159b"),n("96cf"),n("1da1")),u=n("5530"),i=n("2f62"),s={computed:Object(u["a"])({},Object(i["b"])(["user"])),created:function(){document.querySelector(".loader").style.display="none"},beforeCreate:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$request("get","users").then((function(t){t.users.forEach((function(e){e.online=t.online[e.uid]})),e.$store.commit("set-conversations",t.users)})),e.$ioOn("connectedUsers",(function(t){var n=e.$store.state.conversations.slice();n.forEach((function(e){e.online=t[e.uid]})),e.$store.commit("set-conversations",n)}));case 2:case"end":return t.stop()}}),t)})))()},methods:{logout:function(){localStorage.removeItem("_token"),localStorage.removeItem("user"),window.location.reload()}}},l=s,f=(n("5c0b"),n("2877")),d=Object(f["a"])(l,o,a,!1,null,null,null),p=d.exports,h=n("9483");Object(h["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});n("b0c0"),n("d3b7");var m=n("8c4f"),b=n("7338"),v=n.n(b),g=!1;function k(e){return g?"http://localhost:3000/"+e:""+e}function y(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"post",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return g&&console.log("req ->> ".concat(t)),v()({url:k(t),method:e,data:n}).then((function(e){return g&&console.log("<--",e),e.data}))}r["a"].use(i["a"]);var w=new i["a"].Store({state:{dialog:{},messages:[],user:{username:!1},conversations:[]},mutations:{"set-auth":function(e,t){e.user=t},"set-conversations":function(e,t){e.conversations=t}},actions:{initAuth:function(e){var t=e.commit,n=localStorage.getItem("_token");if(n)return y("post","credentials",{token:n}).then((function(e){e.uid&&t("set-auth",e)}))}},modules:{}});r["a"].use(m["a"]);var j=[{path:"/",name:"home",component:function(){return n.e("chunk-4c012e8c").then(n.bind(null,"2fef"))}},{path:"/chat",name:"chat",component:function(){return n.e("chunk-5c520524").then(n.bind(null,"293a"))}},{path:"/sessions",name:"sessions",component:function(){return n.e("chunk-4eccaceb").then(n.bind(null,"3a39"))}},{path:"/auth",name:"auth",component:function(){return n.e("chunk-4c012e8c").then(n.bind(null,"2fef"))}}],O=new m["a"]({mode:"history",base:"/",routes:j});O.beforeEach(function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t,n,r){var o,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(o=w.state.user,a=o.username,"home"!==t.name){e.next=5;break}return r("/auth"),e.abrupt("return");case 5:if("auth"===t.name){e.next=9;break}if(a){e.next=9;break}return r("/auth"),e.abrupt("return");case 9:if(!a){e.next=16;break}if("chat"===t.name||o.admin){e.next=13;break}return r("/chat"),e.abrupt("return");case 13:if("chat"!==t.name||!o.admin||t.query.id){e.next=16;break}return r("/sessions"),e.abrupt("return");case 16:if("auth"!==t.name||!a){e.next=24;break}if(!o.admin){e.next=22;break}return r("/sessions"),e.abrupt("return");case 22:return r("/chat"),e.abrupt("return");case 24:r();case 25:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}());var _=O,x=n("4bea"),S=n.n(x),A=n("8aa5"),E=n.n(A),C=(n("e71f"),{apiKey:"AIzaSyBaccQKkNcjZRoC2GsqbFDfuAMJ1IgAd9Q",authDomain:"test-5d51c.firebaseapp.com",projectId:"test-5d51c",databaseURL:"https://test-5d51c.firebaseio.com",storageBucket:"ttest-5d51c.appspot.com"});E.a.initializeApp(C),r["a"].config.productionTip=!1;var $=function(){var e="?token="+localStorage.getItem("_token");return S()(g?"http://localhost:3000"+e:""+e)},P=$();r["a"].prototype.$ioEmit=function(e,t){P.emit(e,t)},r["a"].prototype.$ioOn=function(e,t){P.on(e,t)},r["a"].prototype.$db=E.a.firestore(),r["a"].prototype.isDevelopment=g,r["a"].prototype.$request=y,w.dispatch("initAuth").then((function(){new r["a"]({router:_,store:w,render:function(e){return e(p)}}).$mount("#app")}))},"5c0b":function(e,t,n){"use strict";var r=n("9c0c"),o=n.n(r);o.a},"9c0c":function(e,t,n){}});
//# sourceMappingURL=app.ef895c06.js.map