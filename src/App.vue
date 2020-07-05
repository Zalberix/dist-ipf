<template>
  <div id="app">
    <div id="main">
      <HeaderVue @tools="()=>this.isSeeTools=true"></HeaderVue>
      <div id="change">
        <div class="info" v-if="!isFirstSelectTools">
          <div class="group">{{info.groupname}}</div>
          <div class="day">{{info.day}}</div>
        </div>
        <div class="wrap-change" v-if="!isFirstChange">
          <ul class="info-point"
          v-if="isActiveInfoPoint"
          >
            <li>Урок: {{infoPoint.number}}</li>
            <li>Подгруппа: {{infoPoint.subgroup}}</li>
            <li>Предмет: {{infoPoint.lesson}}</li>
            <li>Преподаватель: {{infoPoint.teacher}}</li>
            <li>Кабинет: {{infoPoint.room}}</li>
          </ul>
          <div class="change-add" v-if="!isSeeChange" v-on:click="addChange"></div>
          <div class="change-point" v-else-if="isSeeChange && !isConfirmChange">
            <div class="change-actions">
              <div class="title">Действие</div>
              <DropDrowWithFilter :items="options.actions" @select="(val)=>this.itemConfirmChange.action=val"></DropDrowWithFilter>
              <div class="success" @click="confirmChange"></div>
            </div>
            <div class="change-options">
              <div v-if="isEnableListSubgroups">
                <label for="subgroups">Подгруппа</label>
                <DropDrowWithFilter :items="renderListOnNumber(options.count_subgroup)" @select="(val)=>this.itemConfirmChange.subgroup=val"></DropDrowWithFilter>
              </div>
              <div v-if="isEnableListLessons">
                <label for="lessons">Предмет</label>
                <DropDrowWithFilter :items="options.lessons" @select="(val)=>this.itemConfirmChange.lesson=val"></DropDrowWithFilter>
              </div>
              <div v-if="isEnableListTeacher">
                <label for="teachers">Преподаватель</label>
                <DropDrowWithFilter :items="options.teachers" @select="(val)=>this.itemConfirmChange.teacher=val"></DropDrowWithFilter>  
              </div>
              <div v-if="isEnableListRooms">
                <label for="rooms">Кабинет</label>
                <DropDrowWithFilter :items="options.rooms" @select="(val)=>this.itemConfirmChange.room=val"></DropDrowWithFilter>  
              </div>
            </div>
          </div>
          <div class="change-confirm" v-else>
            <div class="change-actions">
              <div class="title">{{itemConfirmChange.action}}</div>
              
              <div class="success" @click="confirmChange"></div>
            </div>
          </div>
        </div>
        <div class="none-change" v-else>Выбирите урок для изменений</div>
      </div>
      <div id="timetable">
        <div class="edit" v-if="isSeeTools">
          <div class="header">
            <div class="title">Настройки</div>
            <div class="exit" v-on:click="exitTools"></div>
          </div>
          <input type="submit" value="Сохранить" id="save" />
          <input type="submit" value="Экспортировать" id="print" />
          <DropDrowWithFilter :items="options.groups" @select="(val)=>this.idGroup=val"></DropDrowWithFilter>  
          <DropDrowWithFilter :items="options.week" @select="(val)=>this.idDay=val"></DropDrowWithFilter>
          <DropDrowWithFilter :items="options.weekList" @select="(val)=>this.dateInfo=val"></DropDrowWithFilter>    
        </div>
        <div class="st_wrap_table">
          <header class="st_table_header">
            <div class="st_row">
              <div class="st_column _id">№</div>
              <div class="st_column _lesson">Предмет</div>
              <div class="st_column _surgroup"></div>
              <div class="st_column _teacher">Преподаватель</div>
              <div class="st_column _room">Каб.</div>
            </div>
          </header>
          <div v-if="!isFirstSelectTools" class="st_table">
            <div v-for="id in 12" :key="id" :class="{st_row:true, black:(id%2==0), select:(id==idSelectTimetableRow)}" :data-id="id"  v-on:click="selectTimetableRow">
              <div class="st_column _id">{{id}}</div>
              <div v-if="isTimetableRowsData(timetable,id)" class="st_column _lesson">{{timetableRowsData(timetable,id).subject | shortString}}</div>
              <div v-else class="st_column _lesson">-</div>
              <div v-if="isTimetableRowsData(timetable,id)" class="st_column _surgroup">{{timetableRowsData(timetable,id).subgroup}}</div>
              <div v-else class="st_column _surgroup">-</div>
              <div v-if="isTimetableRowsData(timetable,id)" class="st_column _teacher">{{timetableRowsData(timetable,id).teacher}}</div>
              <div v-else class="st_column _teacher">-</div>
              <div v-if="isTimetableRowsData(timetable,id)" class="st_column _room">{{timetableRowsData(timetable,id).room}}</div>
              <div v-else class="st_column _room">-</div>
            </div>
          </div>
          <div v-else class="dont-select" ><div>Выберите группу и день неделию для изменеий</div></div>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
import HeaderVue from "./components/Header/HeaderVue"
import DropDrowWithFilter from "./components/BasicElement/DropDrowWithFilter"

export default {
  name:"App",
  components: {
    HeaderVue,
    DropDrowWithFilter
  },
  filters:{
      shortString : function (value) {
        if (value.split(' ').length > 7) return value.split(' ',7).join(' ') + '...'
        return value
      } 
  },
  data () {
    return {
      isActiveInfoPoint: true,
      checkActiveTimetable: [],
      infoPoint: [],
      options: [],
      changes: [],
      timetable:[],
      itemConfirmChange: {
        action: "",
        group: "",
        room: "",
        lesson: "",
        teacher: ""
      },
      info:{},
      idDay: 1,
      idGroup: 1,
      dateInfo:"",
      idSelectTimetableRow:-1,
      isSeeTools:false,
      isSeeChange: false,
      isFirstChange: true,
      isFirstSelectTools: true,
      isConfirmChange: false,
      isEnableListLessons: false,
      isEnableListTeacher: false,
      isEnableListRooms: false,
      isEnableListSubgroups: true,


    };
  },
  watch : {
    idGroup   : "timetableChangeAttribute",
    idDay     : "timetableChangeAttribute",
    dateInfo  : "timetableChangeAttribute"

  },
  methods : {
    renderListOnNumber(num){
      let list = {}
      for (let i=0; i<num; i++) {
        list[i]=i
      }
      console.log(list)
      return list
    },
    timetableChangeAttribute () {
      // console.log(val, oldval)
      this.requestTimetable(this.idDay,this.idGroup,this.dateInfo)
    },
    requestTimetable(day, group, date){
      this.info.groupname = this.options.groups[group-1].name
      this.info.day = this.options.week[day-1].name
      this.isFirstSelectTools = false
      this.isFirstChange = true
      this.isSeeChange = false
      this.$store
        .dispatch("timetableOptions", {day, group, date})
        .then(response => (this.timetable = response.data))
      console.log('good')
    },
    selectTimetableRow (e) {
      this.isFirstChange = false
      this.isSeeChange = false
      let id = e.currentTarget.dataset["id"]
      this.idSelectTimetableRow = id
      this.infoPoint = this.timetable.filter((item) =>item.number == id )[0]
      if (!this.infoPoint) {
        this.isActiveInfoPoint = false
      } else {
        this.isActiveInfoPoint = true

      }
    },
    isTimetableRowsData (timetable, id) {
      let answer = timetable.filter(function (index) {
        return index.hour == id
      })
      // console.log(answer)
      return answer.length > 0 ? true : false
    },
    timetableRowsData (timetable, id) {
      return timetable.filter(function (index) {
        return index.hour == id
      })[0]
    },
    exitTools (e) {
      e.stopPropagation();
      this.isSeeTools = false;
    },
    addChange () {
      this.itemConfirmChange.room = this.options.rooms[0].name
      this.itemConfirmChange.action = this.options.actions[0].name
      this.itemConfirmChange.group = this.options.groups[0].name
      this.itemConfirmChange.lesson = this.options.lessons[0].name
      this.itemConfirmChange.teacher = this.options.teachers[0].name
      this.itemConfirmChange.subgroup = 1
      this.itemConfirmChange.number = 1
      this.isSeeChange = true
    },
    confirmChange () {
      this.isConfirmChange = true
    },
    isEnableLessons () {
      let is = !(this.itemConfirmChange.action!=='ОТМЕНА ЗАНЯТИЯ' && this.itemConfirmChange.action!=='ЗАМЕНА КАБИНЕТА')
      console.log(is)
      return is 
    },
    changeActionInput ({currentTarget:{value:val}}) {
      if (val == "ОТМЕНА ЗАНЯТИЯ"){
        this.isEnableListLessons = false
        this.isEnableListTeacher = false
        this.isEnableListRooms = false
        this.isEnableListSubgroups = true
      }
      if (val == "ЗАМЕНА КАБИНЕТА"){
        this.isEnableListLessons = false
        this.isEnableListTeacher = false
        this.isEnableListRooms = true
        this.isEnableListSubgroups = true
      }
      if (val == "ЗАМЕНА ПРЕПОДАВАТЕЛЯ"){
        this.isEnableListLessons = false
        this.isEnableListTeacher = true
        this.isEnableListRooms = false
        this.isEnableListSubgroups = true
      }
      if (val == "ЗАМЕНА ЗАНЯТИЯ"){
        this.isEnableListLessons = true
        this.isEnableListTeacher = true
        this.isEnableListRooms = true
        this.isEnableListSubgroups = true
      }
      if (val == "БУДЕТ"){
        this.isEnableListLessons = true
        this.isEnableListTeacher = true
        this.isEnableListRooms = true
        this.isEnableListSubgroups = true
      }
    }
  },
  created() {
    console.log(this.$options.components)
    this.$store
      .dispatch("changeOptions")
      .then(respons => (this.options = respons.data));

    // this.$store
    //   .dispatch("changes")
    //   .then(respons => (this.changes = respons.data));
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
#main {
  position: absolute;
  display: grid;

  grid-template-areas: "h h" "t c";

  grid-template-columns: 50% 50%;
  grid-template-rows: 50px 1fr;
  top: 0;
  bottom: 0;
  left:0;
  right: 0;
  background: #251e38;
}
#change {
  grid-area: c;
  overflow: hidden;
  padding: 10px;
}
.change-add{
  height:24px;
  width: 24px;
  margin:auto;
  margin-top: 10px;
  background-color: #f6f7f8;
  mask-image: url('./assets/add.svg');
}
.change-point {
  /* border-radius: 10px;
  box-shadow: 0px 1px 6px rgba(180, 167, 167, 0.685); */
}
.change-actions{
  padding: 10px;
  background: #f2f3f4;
  display: flex;
  align-items: center;
  /* height: 10px; */
  position:relative;
}
.success{
  position: absolute;
  right:0;
  top:0;
  height: 24px;
  width: 24px;
  margin: 6px;
  background: #13b429;
  mask-image: url('./assets/done.svg')
}

.change-options{
  border:3px dashed #f2f3f4;
  color:#f6f7f8;
  border-top: none; 
  /* background: #cccccc; */
  padding: 10px;
  padding-bottom: 5px;
  position: relative;
}
.change-options div {
  margin-bottom:5px; 
}
.change-options select{
  position: absolute;
  right: 10px;
}
.change-confirm{
  padding: 10px;
  background: #f2f3f4;
}
.change-confirm input {
  border: none;
  background: #f2f3f4;
}

.change-confirm select {
  border: none;
  background: #f2f3f4;
  width: 50%;
}
.change-confirm select:focus {
  border: none;
  outline: none; 
}
.info-point{
  list-style-type: none;
  background-color: #f2f3f4;
  margin-bottom: 10px;
  padding:10px;
}

.info{
  display: flex;
  justify-content: space-around;
  margin:10px;
  margin-bottom: 15px;
  font-size: 16px;
}

.info .group, .info .day{
  color:#f6f7f8;
}

.none-change{
  color: #cccccc;
  text-align: center;
}

#timetable {
  grid-area: t;
  /* box-shadow: -1px 0 12px #390b75; */
  background: #f6f7f8;
  /* border-radius: 15px 0 0 15px; */
  overflow: auto;
}
.edit {
  position:absolute;
  background: #f6f7f8;
  right:0;
  bottom: 0;
  left: 60%;
  top:20%;
}
.edit .header{
  background: #342853;
  height: 50px;
  position: relative;
}
.edit .header .title{
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  color:#f2f3f4;
}
.edit .header .exit {  
  height:24px;
  width: 24px;
  position: absolute;
  right: 13px;
  top:13px;

  background-color: #f6f7f8;
  mask-image: url('./assets/close.svg');
}
#timetable .select{
  background: #251e38;
  color:white;
  min-height: 60px;
  transition: min-height .5s ;
}
.timetable_veiw{
  border-collapse: collapse;
  width: 100%;
}
.timetable_veiw div{
  text-align: center;
}

thead{
  color: #f2f3f4;
  background: #342853;
  position: sticky;
  top: 0;
}
tr{
  height: 50px;
}
th{
  padding: 10px;
}

tbody{
  height: 100%;
}
tbody .subselect{
  border-bottom-left-radius: 10px;
}
tbody .supselect{
  border-top-left-radius: 10px;
}
tr{
  height: calc(100%/12);
  background: #f2f3f4;
  transition: height .5s ;
}
td{
  padding: 10px;
  text-align: center;
}
      
td.black{
  background: #cacaca;
}
td.select{
  background: #251e38;
  color:white;
  height: 100px;
  transition: height .5s ;
}

.st_viewport{
  max-height: 500px;
  overflow: auto;
}

._id{
  grid-area: num;
}
._lesson{
  grid-area: les;

}
._subgroup{
  grid-area: subg;

}
._teacher{
  grid-area: teacher;

}
._room{
  grid-area: room;

}

/** Sticky table styles **/
.st_viewport{
  background-color: rgb(62,148,236);
  color: rgb(27,30,36);
  margin: 20px 0;
}
/* ###  Table wrap */
.st_wrap_table{
  
}
/* ##   header */
.st_table_header{
  position: -webkit-sticky;
  position: sticky;

  top: 0px;
  height: 50px;
  z-index: 1;
  background-color: #342853;
  
}
.st_table_header .st_row{
  font-weight: bold;
  color: #f2f3f4;
  font-size: 16px;
}
.st_table_header .st_column{
  
}
/* ##  table */
.st_table{
}
/* #   row */
.st_row{
  padding: 5px 0px;
  min-height: 40px;
  transition: min-height .5s;
  display: grid;
  grid-template-areas: "num les subg teacher room";
  grid-template-columns: 30px 2fr 30px 1fr 60px ;
  margin: 0;
}
.st_table .st_row:nth-child(even){
  background-color: rgba(0,0,0, .1)
}
/* #   column */
.st_column{
  text-align: center;
}
.dont-select{
  text-align: center;
  padding: 10px;
}

</style>