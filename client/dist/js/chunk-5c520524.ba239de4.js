(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5c520524"],{"293a":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"chat"}},[n("div",{staticClass:"header"},[n("h4",[n("div",{staticClass:"title"},[e._v("Conversation with "),n("span",[e._v(e._s(e.chatMembers[1]?e.chatMembers[1].username:""))])]),n("div",{staticClass:"info"},e._l(e.info,(function(t,s){return n("p",{key:s},[e._v(" "+e._s(t.username)+" "+e._s(t.type)+" ")])})),0)])]),n("div",{staticClass:"body"},[n("ul",{staticClass:"messages"},e._l(e.messages,(function(t,s){return n("li",{key:s},[n("span",{style:{"float-left":1===t.type}},[e._v(" "+e._s(t.message)+" "),n("small",[e._v(":"+e._s(t.user))])])])})),0)]),n("div",{staticClass:"footer"},[n("form",{on:{submit:function(t){return t.preventDefault(),e.send(t)}}},[n("div",{staticClass:"form-wrapper"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newMessage,expression:"newMessage"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Enter message here"},domProps:{value:e.newMessage},on:{keydown:function(t){return e.typeAction(!0)},keyup:function(t){return e.typeAction(!1)},input:function(t){t.target.composing||(e.newMessage=t.target.value)}}}),n("div",{staticClass:"button send-button",on:{click:e.send}},[e._v("send")])])]),e.typing?n("small",{staticClass:"text-white"},[e._v(e._s(e.typing)+" is typing")]):e._e()])])},i=[],r=(n("4de4"),n("7db0"),n("4160"),n("159b"),n("96cf"),n("1da1")),o=n("5530"),a=n("2f62"),c={data:function(){return{newMessage:null,messages:[],typing:!1,username:null,info:[],connections:0,chatId:"",chatMembers:[]}},created:function(){var e=this;this.user.username&&this.setMembers(),window.onbeforeunload=function(){e.$ioEmit("leave",e.user.username)},this.$ioOn("chat-message",(function(t){var n=e.chatMembers.find((function(e){return e.uid==t.from}));n&&e.messages.push({message:t.message,type:1,user:t.user}),e.$nextTick((function(){e.scrollWindow()}))})),this.$ioOn("typing",(function(t){var n=e.chatMembers.find((function(e){return e.uid==t.from}));n&&(e.typing=n.username+" is typing")})),this.$ioOn("stopTyping",(function(){e.typing=!1})),this.$ioOn("joinConversation",(function(t){console.log(t);var n=e.chatMembers.filter((function(e){return!e.admin})),s=e.conversations.find((function(e){return e.uid===t.from}));n.push(s)}))},watch:{user:function(e){e.username&&this.setMembers()},conversations:function(){(this.chatMembers.length>=0||this.chatMembers.length<=1)&&this.setMembers()},chatMembers:function(){if(!(this.chatMembers<=1)){var e=this,t=this.$db.collection("messages");this.chatMembers.forEach((function(e){e&&(t=t.where("members."+e.uid,"==",!0))})),t.get().then((function(t){var n=[];t.forEach((function(e){var t=Object(o["a"])({id:e.id},e.data());n.push(t)})),n.sort((function(e,t){return e.createdAt-t.createdAt})),e.messages=n,e.$nextTick((function(){e.scrollWindow()}))})).catch((function(e){console.log("Error getting documents: ",e)}))}}},computed:Object(o["a"])(Object(o["a"])({},Object(a["b"])(["conversations","user"])),{},{getAddresses:function(){var e=this;return this.chatMembers.filter((function(t){return e.user.id!=t.id}))}}),methods:{typeAction:function(e){var t=this;this.getAddresses.forEach((function(n){n.id!==t.user.id&&(e?t.$ioEmit("typing",{address:n.uid,from:t.user.uid}):t.$ioEmit("stopTyping",{address:n.uid,from:t.user.uid}))}))},setMembers:function(){var e,t=this;this.chatMembers=[],this.chatMembers.push(this.user),this.chatId=this.$route.query.id,this.chatId?e=this.conversations.find((function(e){return e.id==t.chatId})):(e=this.conversations.find((function(e){return e.admin&&e.online})),e||(e=this.conversations.find((function(e){return e.admin})))),this.chatMembers.push(e)},send:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.current="",n={message:e.newMessage,user:e.user.username,createdAt:Date.now()},e.messages.push(Object(o["a"])(Object(o["a"])({},n),{},{type:0})),e.$nextTick((function(){e.scrollWindow()})),n.members={},e.chatMembers.forEach((function(e){n.members[e.uid]=!0})),e.$db.collection("messages").add(n).then((function(e){console.log("Document written with ID: ",e.id)})).catch((function(e){console.error("Error adding document: ",e)})),e.chatMembers.forEach((function(t){t.id!==e.user.id&&(n.address=t.uid,n.from=e.user.uid,e.$ioEmit("chat-message",n))})),e.newMessage=null;case 9:case"end":return t.stop()}}),t)})))()},scrollWindow:function(){var e=document.scrollingElement||document.body;e.scrollTop=e.scrollHeight}}},u=c,d=(n("9c66"),n("2877")),f=Object(d["a"])(u,s,i,!1,null,null,null);t["default"]=f.exports},"7db0":function(e,t,n){"use strict";var s=n("23e7"),i=n("b727").find,r=n("44d2"),o=n("ae40"),a="find",c=!0,u=o(a);a in[]&&Array(1)[a]((function(){c=!1})),s({target:"Array",proto:!0,forced:c||!u},{find:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),r(a)},8264:function(e,t,n){},"9c66":function(e,t,n){"use strict";var s=n("8264"),i=n.n(s);i.a}}]);
//# sourceMappingURL=chunk-5c520524.ba239de4.js.map