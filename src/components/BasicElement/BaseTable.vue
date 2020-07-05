<template>
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
      <div
        v-for="id in 12" :key="id" :class="{st_row:true, black:(id%2==0), select:(id==idSelectTimetableRow)}"
        :data-id="id" v-on:click="selectTimetableRow"
        >
        <div class="st_column _id">{{id}}</div>
        <div v-if="isTimetableRowsData(timetable,id)" class="st_column _lesson" >
            {{timetableRowsData(timetable,id).lesson | shortString}}
        </div>
        <div v-else class="st_column _lesson">-</div>
        <div v-if="isTimetableRowsData(timetable,id)" class="st_column _surgroup" >
            {{timetableRowsData(timetable,id).subgroup}}
        </div>
        <div v-else class="st_column _surgroup">-</div>
        <div v-if="isTimetableRowsData(timetable,id)" class="st_column _teacher">
            {{timetableRowsData(timetable,id).teacher}}
        </div>
        <div v-else class="st_column _teacher">-</div>
        <div v-if="isTimetableRowsData(timetable,id)" class="st_column _room" >
            {{timetableRowsData(timetable,id).room}}
        </div>
        <div v-else class="st_column _room">-</div>
      </div>
    </div>
  </div>
</template>

<script>
  
</script>


