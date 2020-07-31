<template>
    <section class="awesome-table">
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
                <tr v-for="(product, index) in products" 
                    :key="index" 
                    @click="choosenone(product, index)" :class="{'highlight': (index == choosen)}">
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
    
    props: {  //接收父組件在子組件的tag傳進來的值
        FuncSelects:{ //判斷現在是哪種功能 String 1.2.3.4
            type: String,
            required: false  //不一定要有值
        },
        ProductTypes:{ //將蔬菜、水果...轉換成C0005、C0004
            type: String,
            required: false
        },
        AdjustMinuss:{ //判斷是否為調整的減少存貨 Boolean
            type: Boolean,
            required: false
        }
    },

    data() {
        return {
            InventoryData: 0,
            products: [],
            currentTutorial: null,
            currentIndex: null,
            title: '',
            inventory: null,
            ProductChoosen: null,
            choosen: null,
        };
    },
    methods: {
        // TRColor(a) {
        //     if(a%2 != 0){
        //         this.class = "odd";
        //         return this.class;
        //     }
        //     else{
        //         this.class = "even";
        //         return this.class;
        //     }
        // },

        Retrieveproducts() {  //取得產品所有的資料
            Productdataservice.getAll()
                .then(response => {
                    this.products = response.data;
                    this.TransformType();
                })
                .catch(e => {
                    console.log(e);
                });
        },

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

        TypeChange(Type) {  //根據父組件傳入的種類，更新Table顯示的資料
            Productdataservice.gettype(Type)
                .then(response => {
                  this.products = response.data;
                  this.TransformType();
                })
                .catch(e => {
                  console.log(e);
                });
        },

        InventoryChange(InventoryNum) {  //更新存貨
            this.inventory = null
            if(this.FuncSelects == '進貨'){  //進貨增加存貨 還沒寫紀錄
                this.inventory = Number(this.currentTutorial.product_inventory) + Number(InventoryNum);
            }

            if(this.FuncSelects == '採收'){  //採收增加存貨 還沒寫紀錄
                this.inventory = Number(this.currentTutorial.product_inventory) + Number(InventoryNum);
            }

            if(this.FuncSelects == '調整'  && this.AdjustMinuss == false){  //調整增加存貨 還沒寫紀錄
                this.inventory = Number(this.currentTutorial.product_inventory) + Number(InventoryNum);
            }

            if(this.FuncSelects == '調整'  && this.AdjustMinuss != false){  //調整減少存貨 還沒寫紀錄
                this.inventory = Number(this.currentTutorial.product_inventory) + Number(InventoryNum);
            }

            if(this.FuncSelects == '報廢'){  //報廢減少存貨 還沒寫紀錄
                this.inventory = Number(this.currentTutorial.product_inventory) - Number(InventoryNum);
            }

            this.InventoryData = {
                product_inventory: this.inventory
            };

            Productdataservice.update(this.ProductChoosen, this.InventoryData); //更新存貨 傳入id以及.json

            if(this.ProductTypes == ''){  //更新後保持種類顯示
                this.Retrieveproducts();
                this.Retrieveproducts();
            }
            else{
                this.TypeChange(this.ProductTypes)
                this.TypeChange(this.ProductTypes)
            }
            this.$emit('InitialData');
            this.initdata();
        },

        choosenone(product, index) {  //紀錄選取的行
            this.choosen = index;
            this.currentTutorial = product;  //該行內容記錄到現在內容
            this.currentIndex = index;  //該行index記錄到現在index
            this.ProductChoosen = this.currentTutorial.product_id;  //現在內容的id寫進productid
        },

        initdata() {
            this.choosen = null;
            this.currentTutorial = null;  //該行內容記錄到現在內容
            this.currentIndex = null;  //該行index記錄到現在index
            this.ProductChoosen = null;  //現在內容的id寫進productid
        }
    },

    
    mounted() {
        this.Retrieveproducts();

        this.$root.$on('ChangeType', (Type) => {
            if(Type == ''){  //更新後保持種類顯示
                this.Retrieveproducts();
            }
            else{
                this.TypeChange(Type)
            }
        });

        this.$root.$on('ChangeInventory', (InventoryNum) => {
            if(this.ProductChoosen != null){  //防止沒有選取行就按確認
                this.InventoryChange(InventoryNum);
            }
            // else
            //     console.log('!!');  //要做toast警告沒有選取行 還沒做
        });
    }
};
</script>

<style scoped>
.awesome-table{
  top: 0vh;
  width: 59vw;
  display: inline-block;
  overflow-y: scroll;
  max-height:83vh;
}
.awesome-table table {
  top: 0vh;
  width: 57.3vw;
  margin: 0;
  font-size: 30px;
  overflow-y: scroll;
}
thead {
  background-color: cadetblue;
}
tbody tr{
    height: 8vh;
    background-color:bisque;
}
.t-body {
    cursor: pointer;
}
.odd {
    background-color: bisque;
}
.even {
    background-color:cornsilk;
}
.highlight {
    background-color:darkseagreen
}
</style>
