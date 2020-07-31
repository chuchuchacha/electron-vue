<template>
    <section class="awesome-table">
        <table>
            <thead class="t-head">
                <tr>
                    <th>編號</th>
                    <th>名稱</th>
                    <th>電話</th>
                    <th>地址</th>
                    <th>描述</th>
                </tr>
            </thead>
            <tbody class="t-body">
                <tr :class="{ active: index == currentIndex }" 
                    v-for="(supplier, index) in suppliers" 
                    :key="index" 
                    @click="choosenone(supplier, index)">
                    <td>{{ suppliers[index].supplier_id }}</td>
                    <td>{{ suppliers[index].supplier_name }}</td>
                    <td>{{ suppliers[index].supplier_phone }}</td>
                    <td>{{ suppliers[index].supplier_address }}</td>
                    <td>{{ suppliers[index].supplier_disc }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import Supplierdataservice from "@/services/Supplierdataservice.js"

export default {
    name: "supplier-table",
    data() {
        return {
            suppliers: [],
            currentTutorial: null,
            currentIndex: -1,
            title: ""
        };
    },
    methods: {
        retrievesuppliers() {
            Supplierdataservice.getAll()
                .then(response => {
                    this.suppliers = response.data;
                    this.$emit('passdata', response.data[response.data.length - 1].supplier_id);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        
        choosenone(supplier, index) {
            this.currentTutorial = supplier;
            this.currentIndex = index;
            this.$emit('pushdata',this.currentTutorial)
        }
    },
    mounted() {
        this.retrievesuppliers();
        this.$root.$on('refresh', () => {
            this.retrievesuppliers()
        })
    }
};
</script>

<style scoped src="@/assets/css/management_table.css"></style>