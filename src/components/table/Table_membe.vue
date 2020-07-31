<template>
    <section class="awesome-table">
        <table>
            <thead class="t-head">
                <tr>
                    <th>編號</th>
                    <th>姓名</th>
                    <th>性別</th>
                    <th>電話</th>
                    <th>地址</th>
                    <th>餘額</th>
                </tr>
            </thead>
            <tbody class="t-body">
                <tr :class="{ active: index == currentIndex }" 
                    v-for="(member, index) in members" 
                    :key="index" 
                    @click="choosenone(member, index)">
                    <td>{{ members[index].member_id }}</td>
                    <td>{{ members[index].member_name }}</td>
                    <td>{{ members[index].member_gender }}</td>
                    <td>{{ members[index].member_phone }}</td>
                    <td>{{ members[index].member_address }}</td>
                    <td>{{ members[index].member_balance }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import Memberdataservice from "@/services/Memberdataservice.js"

export default {
    name: "member-table",

    data() {
        return {
            members: [],
            currentTutorial: null,
            currentIndex: -1,
            title: ""
        };
    },
    methods: {
        retrievemembers() {
            Memberdataservice.getAll()
                .then(response => {
                    this.members = response.data;
                    this.$emit('passlastid', response.data[response.data.length - 1].member_id);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        
        choosenone(member, index) {
            this.currentTutorial = member;
            this.currentIndex = index;
            this.$emit('showdata', this.currentTutorial)
        }
    },
    mounted() {
        this.retrievemembers();
        this.$root.$on('refresh', () => {
            this.retrievemembers()
        })
    }
};
</script>

<style scoped src="@/assets/css/management_table.css"></style>
