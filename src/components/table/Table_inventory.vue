<template>
	<section class="awesome-table">
		<table>
			<thead class="t-head">
				<tr>
					<th>編號</th>
					<th>種類</th>
					<th>名稱</th>
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
			adjust: {
				adjust_id: null,
				user_id: 'U00001',
				product_id: null,
				adjust_amount: null,
				adjust_date: null,
			},
			scrap: {
				scrap_id: null,
				user_id: 'U00001',
				product_id: null,
				scrap_amount: null,
				scrap_date: null,
			},
			harvest: {
				harvest_id: null,
				user_id: 'U00001',
				product_id: null,
				harvest_amount: null,
				harvest_date: null,
			},
			purchase: {
				purchase_id: null,
				user_id: 'U00001',
				product_id: null,
				purchase_unit_price: 40,
				purchase_amount: null,
				purchase_unit: '包',
				purchase_date: null,
				purchase_subtotal: null,
				purchase_discount: 0,
				purchase_total: null,
			},
			newid: null,
			ADid: null,
			HVid: null,
			SCid: null,
			PCid: null,
			InventoryDate: null,
		};
	},
	methods: {
		Retrieveproducts() {  //取得產品所有的資料
			Productdataservice.getAll()
				.then(response => {
					this.products = response.data;
				})
				.catch(e => {
					console.log(e);
				});
		},

		TypeChange(Type) {  //根據父組件傳入的種類，更新Table顯示的資料
			Productdataservice.gettype(Type)
				.then(response => {
					this.products = response.data;
				})
				.catch(e => {
					console.log(e);
				});
		},


		//這個要留著喔
		choosenone(product, index) {  //紀錄選取的行
			this.choosen = index;
			this.currentTutorial = product;  //該行內容記錄到現在內容
			this.currentIndex = index;  //該行index記錄到現在index
			this.ProductChoosen = this.currentTutorial.product_id;  //現在內容的id寫進productid

			this.$root.$emit('currentproduct', this.currentTutorial);
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
			// this.GetBiggestID();

			this.$root.$on('ChangeType', (Type) => {
					if(Type == ''){  //更新後保持種類顯示
							this.Retrieveproducts();
					}
					else{
							this.TypeChange(Type)
					}
			});

			this.$root.$on('refresh', () => {
				this.Retrieveproducts();
				this.Retrieveproducts();
			});
    }
};
</script>

<style scoped>
.awesome-table{
  top: 0vh;
  width: 50vw;
  display: inline-block;
  overflow-y: scroll;
  max-height:83vh;
}
.awesome-table table {
  top: 0vh;
  width: 48.3vw;
  margin: 0;
  font-size: 25px;
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
