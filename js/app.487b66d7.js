(function(){"use strict";var t={162:function(t,e,i){var s=i(144),o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("YandexMap")],1)},r=[],a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"root"},[i("div",{staticClass:"pannel"},[i("div",{staticClass:"button__container"},[i("button",{ref:"rusButton",staticClass:"active",on:{click:t.makeRusVisible}},[t._v("Россия")]),i("button",{ref:"belButton",on:{click:t.makeBelVisible}},[t._v("Белоруссия")])]),i("div",t._l(t.getRusCity,(function(e){return i("details",{directives:[{name:"show",rawName:"v-show",value:t.rusIsActive,expression:"rusIsActive"}],key:e,ref:"detail",refInFor:!0,on:{click:t.openDetails}},[i("summary",[i("div",[t._v(t._s(e))]),i("div",{staticClass:"arrow-2-top"}),i("div",{staticClass:"arrow-2-bottom"})]),t._l(t.innerSort(e),(function(e){return i("div",{key:e.id},[i("div",{staticClass:"item"},[i("div",{staticClass:"item__title"},[t._v(t._s(e.title))]),i("div",{staticClass:"item__name"},[t._v(t._s(e.name))]),i("div",{staticClass:"item__tel"},[t._v(t._s(e.tel))]),i("div",{staticClass:"item__email"},[t._v(t._s(e.email))])])])}))],2)})),0),i("div",t._l(t.getBelCity,(function(e){return i("details",{directives:[{name:"show",rawName:"v-show",value:t.belIsActive,expression:"belIsActive"}],key:e,ref:"detail",refInFor:!0,on:{click:t.openDetails}},[i("summary",[i("div",[t._v(t._s(e))]),i("div",{staticClass:"arrow-2-top"}),i("div",{staticClass:"arrow-2-bottom"})]),t._l(t.innerSort(e),(function(e){return i("div",{key:e.id},[i("div",{staticClass:"item"},[i("div",{staticClass:"item__title"},[t._v(t._s(e.title))]),i("div",{staticClass:"item__name"},[t._v(t._s(e.name))]),i("div",{staticClass:"item__tel"},[t._v(t._s(e.tel))]),i("div",{staticClass:"item__email"},[t._v(t._s(e.email))])])])}))],2)})),0)]),i("div",{staticClass:"map"},[i("yandex-map",{staticClass:"map",attrs:{coords:t.coords,zoom:t.zoom},on:{"map-was-initialized":t.mapLoaded}},t._l(t.allData,(function(e){return i("ymap-marker",{key:e.id,ref:"balloon",refInFor:!0,attrs:{"marker-type":"placemark","cluster-name":"1","balloon-template":t.mapBalloon(e),"marker-id":e.id,coords:e.coords,icon:t.markerIcon}})})),1)],1)])},n=[],l={name:"HelloWorld",data(){return{myMap:{},markerIcon:{layout:"default#imageWithContent",imageHref:"",imageSize:[43,43],imageOffset:[0,0],content:"",contentOffset:[-10,-10],contentLayout:'<div style="background: #1e355d; width: 30px; height:30px; border-radius:100%; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'},allData:[],coords:[63.91972844805031,65.05019812245018],rusCoords:[63.91972844805031,65.05019812245018],belCoords:[53.881069073333144,27.588064177753026],zoom:4,belZoom:7,rusZoom:4,items:[0,0,1,2,2,3,4],list:{},title:[],ids:[1,2,3,4,5,6,7],city:[],cities:[],name:[],tel:[],email:[],id:[],details:[0,1,2,3,4,5],item:"",items:[],rusIsActive:!0,belIsActive:!1}},methods:{getCities(){fetch("./cities2.json").then((t=>t.json())).then((t=>this.list=t)).then((()=>this.getData()))},getData(){for(let t in this.list){let e=Object.entries(this.list[t]);e.forEach((t=>{let e=JSON.parse(JSON.stringify(t));e[1].forEach((t=>{this.allData.push({id:t.id,title:t.title,city:t.city,name:t.name,tel:t.tel,email:t.email,coords:t.coords}),this.cities.push(t.city)}))}))}this.makeArrUnique()},makeArrUnique(){let t=JSON.parse(JSON.stringify(this.cities)),e=[...new Set(t)];this.cities=e},close(){console.log(this.open)},mapBalloon(t){return`\n      <div class="balloon">\n      <div class="item__title">${t.title} </div>\n      <div class="item__name">${t.name} </div>\n      <div class="item__tel">${t.tel} </div>\n      <div class="item__email">${t.email} </div>\n      </div>\n      `},makeBelVisible(){this.rusIsActive=!1,this.belIsActive=!0,this.coords=this.belCoords,this.$refs.belButton.classList.add("active"),this.$refs.rusButton.classList.remove("active"),setTimeout((()=>this.zoom=this.belZoom),1e3)},makeRusVisible(){this.rusIsActive=!0,this.belIsActive=!1,this.coords=this.rusCoords,this.$refs.belButton.classList.remove("active"),this.$refs.rusButton.classList.add("active"),setTimeout((()=>this.zoom=this.rusZoom),1e3)},openDetails(t){let e=t.target.textContent,i=this.allData.filter((t=>t.city===e));i.forEach((t=>{this.coords=t.coords,this.zoom=t.zoom})),this.openBalloon(e),this.$refs.detail.forEach((t=>{t.addEventListener("click",(()=>{this.$refs.detail.forEach((e=>{e!==t&&e.removeAttribute("open")}))}))}))},openBalloon(t){let e=this.allData.filter((e=>e.city===t));this.myMap.setCenter(this.coords),e.forEach((t=>{let e=t.title,i=t.name,s=t.tel,o=t.email,r=`<div>\n          <p> ${e}</p>\n          <p> ${i}</p>\n          <p> ${s}</p>\n          <p> ${o}</p>\n          </div>`;this.myMap.balloon.open(this.coords,r)}))},mapLoaded:function(t){this.myMap=t,this.myMap.panes.get("ground").getElement().style.filter="grayscale(100%)",this.myMap.controls.remove("zoomControl"),this.myMap.controls.remove("searchControl"),this.myMap.controls.remove("geolocationControl"),this.myMap.controls.remove("routeButtonControl"),this.myMap.controls.remove("trafficControl"),this.myMap.controls.remove("typeSelector"),this.myMap.controls.remove("fullscreenControl"),this.myMap.controls.remove("rulerControl")},innerSort(t){return this.allData.filter((e=>e.city===t))}},created(){this.getCities()},computed:{getRusCity(){return this.cities.filter((t=>"Москва"===t||"Екатеринбург"===t||"Красноярск"===t||"Норильск"===t||"Челябинск"===t))},getBelCity(){return this.cities.filter((t=>"Минск"===t||"Борисов"===t||"Столбцы"===t||"Любань"===t||"Крупки"===t))}}},c=l,m=i(1),u=(0,m.Z)(c,a,n,!1,null,"1bf58975",null),d=u.exports,v={name:"App",components:{YandexMap:d}},p=v,h=(0,m.Z)(p,o,r,!1,null,null,null),f=h.exports,_=i(629);s.Z.use(_.ZP);var y=new _.ZP.Store({state:{},getters:{},mutations:{},actions:{},modules:{}}),b=i(250);s.Z.config.productionTip=!1;const C={apiKey:"c07b9436-87a1-4ee9-be64-e5954146cea3",lang:"ru_RU",coordorder:"latlong",enterprise:!1,version:"2.1"};s.Z.use(b.ZP,C),new s.Z({store:y,render:function(t){return t(f)}}).$mount("#app")}},e={};function i(s){var o=e[s];if(void 0!==o)return o.exports;var r=e[s]={exports:{}};return t[s](r,r.exports,i),r.exports}i.m=t,function(){var t=[];i.O=function(e,s,o,r){if(!s){var a=1/0;for(m=0;m<t.length;m++){s=t[m][0],o=t[m][1],r=t[m][2];for(var n=!0,l=0;l<s.length;l++)(!1&r||a>=r)&&Object.keys(i.O).every((function(t){return i.O[t](s[l])}))?s.splice(l--,1):(n=!1,r<a&&(a=r));if(n){t.splice(m--,1);var c=o();void 0!==c&&(e=c)}}return e}r=r||0;for(var m=t.length;m>0&&t[m-1][2]>r;m--)t[m]=t[m-1];t[m]=[s,o,r]}}(),function(){i.d=function(t,e){for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};i.O.j=function(e){return 0===t[e]};var e=function(e,s){var o,r,a=s[0],n=s[1],l=s[2],c=0;if(a.some((function(e){return 0!==t[e]}))){for(o in n)i.o(n,o)&&(i.m[o]=n[o]);if(l)var m=l(i)}for(e&&e(s);c<a.length;c++)r=a[c],i.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return i.O(m)},s=self["webpackChunkmap_project"]=self["webpackChunkmap_project"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=i.O(void 0,[998],(function(){return i(162)}));s=i.O(s)})();
//# sourceMappingURL=app.487b66d7.js.map