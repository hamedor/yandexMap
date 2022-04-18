<template>
<div class="root">
  <div class="pannel">
    <div class="button__container">
      <button class="active" ref="rusButton" @click='makeRusVisible'>Россия</button>
      <button ref="belButton" @click='makeBelVisible'>Белоруссия</button>
    </div>
    <div>
      <details v-for="city in getRusCity"
          @click='openDetails'
          v-bind:key="city"
          v-show="rusIsActive"
          ref="detail"
          >

          <summary>
            <div>{{city}}</div>
              <div class="arrow-2-top"></div>
              <div class="arrow-2-bottom"></div>
            </summary>

          <div v-for="item in innerSort(city)"
          v-bind:key="item.id"
          >
          <div class="item">
              <div class="item__title">{{item.title}}</div>
              <div class="item__name">{{item.name}}</div>
              <div class="item__tel">{{item.tel}}</div>
              <div class="item__email">{{item.email}}</div>
          </div>
          </div>

          </details>
    </div>
      <div>
      <details v-for="city in getBelCity"
          @click='openDetails'
          v-bind:key="city"
          v-show="belIsActive"
          ref="detail"
          >
          <summary>
            <div>{{city}}</div>
            <div class="arrow-2-top"></div>
            <div class="arrow-2-bottom"></div>
          </summary>

          <div v-for="item in innerSort(city)"
          v-bind:key="item.id"
          >
          <div class="item">
              <div class="item__title">{{item.title}}</div>
              <div class="item__name">{{item.name}}</div>
              <div class="item__tel">{{item.tel}}</div>
              <div class="item__email">{{item.email}}</div>
          </div>
          </div>
          </details>
      </div>
  </div>
  <div class="map">
    <yandex-map class="map"
      @map-was-initialized="mapLoaded"
      :coords="coords"
      :zoom="zoom"
    >
    <ymap-marker
      ref="balloon"
      v-for="marker in allData"
      marker-type="placemark"
      cluster-name="1"
      :key="marker.id"
      :balloon-template="mapBalloon(marker)"
      :marker-id="marker.id"
      :coords="marker.coords"
      :icon= markerIcon
        />
    </yandex-map>
  </div>
</div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
      myMap:{},
      markerIcon:{
      layout: 'default#imageWithContent',
      imageHref: '',
      imageSize: [43, 43],
      imageOffset: [0, 0],
      content: '',
      contentOffset: [-10, -10],
      contentLayout: '<div style="background: #1e355d; width: 30px; height:30px; border-radius:100%; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      },
      allData:[],
      coords:
        [63.91972844805031,
        65.05019812245018],
      rusCoords:[
        63.91972844805031,
        65.05019812245018,
      ],
      belCoords:[
        53.881069073333144,
        27.588064177753026,
      ],
      zoom:4,
      belZoom:7,
      rusZoom:4,
      items:[0,0,1,2,2,3,4],
      list:{},
      title:[],
      ids:[1,2,3,4,5,6,7],
      city:[],
      cities:[],
      name:[],
      tel:[],
      email:[],
      id:[],
      details:[0,1,2,3,4,5],
      item:'',
      items:[],
      rusIsActive: true,
      belIsActive: false
    }
  },
  methods:{
    getCities() {
    fetch("./cities2.json")
      .then(response => response.json())
      .then(data => (this.list= data))
      .then(()=> this.getData())
    },
    getData(){
      for(let key in this.list){
      let array = Object.entries(this.list[key]);
      array.forEach(el=>{
        let myTarget = JSON.parse(JSON.stringify(el))
        myTarget[1].forEach(x =>
        {this.allData.push({id: x.id, title: x.title, city: x.city, name: x.name, tel: x.tel, email:x.email,coords:x.coords})
          this.cities.push(x.city)

        })
      })
      }
      this.makeArrUnique();
    },
    makeArrUnique(){
      let myTarget = JSON.parse(JSON.stringify(this.cities))
      let uniqueCities = [...new Set(myTarget)]
      this.cities = uniqueCities;
    },
    close(){
      console.log(this.open)
    },
    mapBalloon(markers){
      return `
      <div class="balloon">
      <div class="item__title">${markers.title} </div>
      <div class="item__name">${markers.name} </div>
      <div class="item__tel">${markers.tel} </div>
      <div class="item__email">${markers.email} </div>
      </div>
      `
    },
    makeBelVisible(){
      this.rusIsActive = false;
      this.belIsActive = true;
      this.coords = this.belCoords;
      this.$refs.belButton.classList.add('active');
      this.$refs.rusButton.classList.remove('active');
      setTimeout(() =>this.zoom = this.belZoom, 1000)
    },
    makeRusVisible(){
      this.rusIsActive = true;
      this.belIsActive = false;
      this.coords = this.rusCoords;
      this.$refs.belButton.classList.remove('active');
      this.$refs.rusButton.classList.add('active');
      setTimeout(() =>this.zoom = this.rusZoom, 1000)
    },
    openDetails(event){
      let target = event.target.textContent;
      let a = this.allData.filter(el =>el.city === target)
      a.forEach(x => {this.coords = x.coords,
      this.zoom = x.zoom})
      this.openBalloon(target)
      this.$refs.detail.forEach((targetDetail) => {
        targetDetail.addEventListener("click", () => {
            this.$refs.detail.forEach((detail) => {
              if (detail !== targetDetail) {
                detail.removeAttribute("open");
              }
          });
        });
      });

      },
      openBalloon(target){
        let a = this.allData.filter(el => el.city === target)
        this.myMap.setCenter(this.coords)
        a.forEach(x =>{
          let title = x.title;
          let name = x.name;
          let tel = x.tel;
          let email = x.email;

          let template = `<div>
          <p> ${title}</p>
          <p> ${name}</p>
          <p> ${tel}</p>
          <p> ${email}</p>
          </div>`
          this.myMap.balloon.open(this.coords, template)
        })

      },
    mapLoaded: function(myMap) {
      this.myMap = myMap;
      this.myMap.panes.get('ground').getElement().style.filter = 'grayscale(100%)'
      this.myMap.controls.remove('zoomControl');
      this.myMap.controls.remove('searchControl');
      this.myMap.controls.remove('geolocationControl');
      this.myMap.controls.remove('routeButtonControl');
      this.myMap.controls.remove('trafficControl');
      this.myMap.controls.remove('typeSelector');
      this.myMap.controls.remove('fullscreenControl');
      this.myMap.controls.remove('rulerControl');
    },
    innerSort(city){
          return this.allData.filter(el =>el.city === city);
    }
  },
  created(){
    this.getCities();
  },
  computed: {
        getRusCity(){
          return this.cities.filter(city => city === "Москва" || city === "Екатеринбург" || city === "Красноярск" || city === "Норильск" || city === "Челябинск" )
        },
        getBelCity(){
          return this.cities.filter(city => city === "Минск" || city === "Борисов" || city === "Столбцы" || city === "Любань" || city === "Крупки" )
        },
  },
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

button{
  height: 34px;
  background-color: #fff;
  color: #929292;
  border: 1px solid #929292;
}
.active{
  background-color:#ff9e00;
  color: #fff;
  border: none;
}

details{
  position: relative;
}
summary{
  position: relative;
  padding-top:50px;
  padding-bottom: 35px ;
  text-align: left;
  padding-left: 15px;
  color: #1e355d;
  font-weight: 700;
}

.item{
  text-align: left;
  padding-left: 15px;
  margin-top: 10px;
}

.item__name,
.item__tel,
.item__email{
  padding-top:15px;
}

.item__title{
  color:#1e355d;
  font-weight: 700;
  padding-top: 20px;
}
.item__name{

}
.item__tel{

}
.item__email a{
  color: #8fd4f1;
  text-decoration: none;
}

.map{
  height: 850px;
  flex: 1 0 auto;
}
.root{
  display: flex;
  max-width: 1600px;
  padding: 0 25px 0 25px;
  margin: 0 auto;
}
.pannel{
  width: 300px;
  flex: none;
  height: auto;
  box-shadow: 1px 2px 5px 0px #C6BEB1;
}
.button__container{
  display: flex;
  justify-content: center;
}
button{
  width: 100%;
}
details summary::-webkit-details-marker {
  display: none;
}
details > summary {
  list-style: none;
}
.arrow-2 {
      cursor: pointer;
      height: 120px;
      width: 80px;
      position: relative;
      margin: 20px;
  }
  .arrow-2-top, 
  .arrow-2-bottom {
      background: #337AB7;
      height: 4px;
      /* left: 51px; */
      position: absolute;
      top: 49px;
      width: 11px;
      right: 32px;
      pointer-events: none;
  }
  .arrow-2-top {
          top: 56px;
          right: 38px;
  }
  .arrow-2-top {
      transform: rotate(45deg);
      transform-origin: bottom right;
  }
  .arrow-2-bottom {
      transform: rotate(-45deg);
      transform-origin: top right;
  }
  .arrow-2-top::after, 
  .arrow-2-bottom::after {
      background: #000;
      content: '';
      height: 100%;
      position: absolute;
      top: 0;
      transition: all 0.15s;
  }
  .arrow-2-top::after {
      left: 100%;
      right: 0;
      transition-delay: 0s;
  }
  .arrow-2-bottom::after {
      left: 0;
      right: 100%;
      transition-delay: 0.15s;
  }
  .arrow-2:hover .arrow-2-top::after {
      left: 0;
      transition-delay: 0.15s;
  }
  .arrow-2:hover .arrow-2-bottom::after {
      right: 0;
      transition-delay: 0s;
  }
  
  .menu details[open] > summary:before {
    transform: rotate(180deg);
  }

  details[open] > summary{
    color:#ff9e00;
    animation: spoiler 1s;
  }
  details[open] > summary .arrow-2-bottom{
    right: 39px;
    background: #ff9e00;
    animation: spoiler 1s;
  }
  details[open] > summary .arrow-2-top{
    right: 33px;
    background: #ff9e00;
    animation: spoiler 1s;
  }
  @keyframes spoiler {
    0%   {opacity: 0;}
    100% {opacity: 1;}
  }

</style>