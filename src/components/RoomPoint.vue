<template>
    <div>
        <div>{{item.id}}</div>
        <div>{{item.name}}</div>
    </div>
</template>

<script>
export default {
    name: 'RoomPoint',
    props :{
        room:[]
    },

    data () {
        return {
            item: this.room
        }
    }
}
</script>