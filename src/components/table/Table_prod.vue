<template>
    <section class="awesome-table adjust">
        <table>
            <thead class="t-head">
                <tr>
                    <th>編號</th>
                    <th>種類</th>
                    <th>名稱</th>
                    <th>單價</th>
                    <th>存貨</th>
                </tr>
            </thead>
            <tbody class="t-body">
                <tr  
                    v-for="(product, index) in products" 
                    :key="index" 
                    @click="choosenone(product, index)">
                    <td>{{ products[index].product_id }}</td>
                    <td>{{ products[index].product_category_id }}</td>
                    <td>{{ products[index].product_name }}</td>
                    <td>{{ products[index].product_unit_price }}</td>
                    <td>{{ products[index].product_inventory }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import Productdataservice from "@/services/Productdataservice.js"

export default {
    name: "product-table",
    data() {
        return {
            products: [],
            currentTutorial: null,
            currentIndex: -1,
            title: ""
        };
    },
    methods: {
        TransformType() {  //將c0005轉成蔬菜
            let i = 0;
            for(i = 0; i < this.products.length; i++){
                let TransType = this.products[i].product_category_id;
                if(TransType == 'C0005'){
                    TransType = '蔬菜';
                    this.products[i].product_category_id = TransType;
                }
                if(TransType == 'C0004'){
                    TransType = '水果';
                    this.products[i].product_category_id = TransType;
                }
            }
        },

        retrieveproducts() {
            Productdataservice.getAll()
                .then(response => {
                    this.products = response.data;
                    this.TransformType();
                    this.$emit('passdata', response.data[response.data.length - 1].product_id);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        
        choosenone(product, index) {
            this.currentTutorial = product;
            this.currentIndex = index;
            this.$emit('pushdata',this.currentTutorial)
        }
    },
    mounted() {
        this.retrieveproducts();
        this.$root.$on('refresh', () => {
            this.retrieveproducts()
        })
    }
};
</script>

<style scoped src="@/assets/css/management_table.css"></style>