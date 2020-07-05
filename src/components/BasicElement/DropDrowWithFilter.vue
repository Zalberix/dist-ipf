<template>
        <select class="selector" v-model="idSelect" required>
                <option value="" hidden>Выберете группу</option>
                <option v-for="item in items" :key="item.id" :value="item.id">{{item.name}}</option>
        </select>
</template>

<script>

export default {
        name:"DropDrowWithFilter",
        props:{
                items:{
                        type: Array,
                        default: Array
                }
        },
        watch:{
                idSelect: function (val) {
                        this.idSelect = val
                        this.$emit("select", val)
                }
        },
        data (){
               return {
                       idSelect: {}
               }
        },
        methods:{

        }
}

</script>
<style scoped>
        select{
                color:#000;
        }
        option{
                color:#000;

        }
</style>