(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4eccaceb"],{"0cde":function(e,t,n){},1296:function(e,t,n){"use strict";var i=n("0cde"),r=n.n(i);r.a},2532:function(e,t,n){"use strict";var i=n("23e7"),r=n("5a34"),c=n("1d80"),s=n("ab13");i({target:"String",proto:!0,forced:!s("includes")},{includes:function(e){return!!~String(c(this)).indexOf(r(e),arguments.length>1?arguments[1]:void 0)}})},"3a39":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"conversations"},[n("div",{staticClass:"form-wrapper filter"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.filterName,expression:"filterName"}],attrs:{type:"filterName"},domProps:{value:e.filterName},on:{input:function(t){t.target.composing||(e.filterName=t.target.value)}}}),n("select",{directives:[{name:"model",rawName:"v-model",value:e.selectActive,expression:"selectActive"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.selectActive=t.target.multiple?n:n[0]}}},[n("option",[e._v("all")]),n("option",[e._v("active")]),n("option",[e._v("offline")])])]),e._l(e.filteredConversations,(function(t,i){return n("div",{key:i,staticClass:"session",class:{active:t.online},on:{click:function(n){return e.openConversation(t)}}},[e._v(" "+e._s(t.firstName?t.firstName+" "+t.lastName:t.username)+" ")])}))],2)},r=[],c=(n("4de4"),n("caad"),n("2532"),n("5530")),s=n("2f62"),a={data:function(){return{filteredConversations:[],selectActive:"all",filterName:[]}},created:function(){this.changeList()},watch:{filterName:function(e){this.filter((function(t){var n=t.username+t.firstName+t.lastName;return n.includes(e)}))},selectActive:function(){this.changeList()},conversations:function(){this.changeList()}},computed:Object(c["a"])({},Object(s["b"])(["conversations","user"])),methods:{changeList:function(){"active"===this.selectActive&&this.filter((function(e){return e.online})),"offline"===this.selectActive&&this.filter((function(e){return!e.online})),"all"===this.selectActive&&this.filter((function(e){return e}))},filter:function(e){var t=this;this.filteredConversations=this.conversations.filter(e).filter((function(e){return e.uid!==t.user.uid}))},openConversation:function(e){this.$router.push({name:"chat",query:{id:e.id}}),this.$store.commit("set-customer",e)}}},o=a,u=(n("1296"),n("2877")),l=Object(u["a"])(o,i,r,!1,null,null,null);t["default"]=l.exports},"44e7":function(e,t,n){var i=n("861d"),r=n("c6b6"),c=n("b622"),s=c("match");e.exports=function(e){var t;return i(e)&&(void 0!==(t=e[s])?!!t:"RegExp"==r(e))}},"5a34":function(e,t,n){var i=n("44e7");e.exports=function(e){if(i(e))throw TypeError("The method doesn't accept regular expressions");return e}},ab13:function(e,t,n){var i=n("b622"),r=i("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[r]=!1,"/./"[e](t)}catch(i){}}return!1}},caad:function(e,t,n){"use strict";var i=n("23e7"),r=n("4d64").includes,c=n("44d2"),s=n("ae40"),a=s("indexOf",{ACCESSORS:!0,1:0});i({target:"Array",proto:!0,forced:!a},{includes:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),c("includes")}}]);
//# sourceMappingURL=chunk-4eccaceb.9e2cdbd3.js.map