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
import Adjustdataservice from "@/services/Adjustdataservice.js"
import Harvestdataservice from "@/services/Harvestdataservice.js"
import Scrapdataservice from "@/services/Scrapdataservice.js"
import Purchasedataservice from "@/services/Purchasedataservice.js"

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


		//下面兩個都是抓日個功能的最新id+1
		changeidtitle(Length , act , lastid) {
			switch(Length){
				case 1:
					this.newid = act + '0000000000000';
					break;
				case 2:
					this.newid = act + '000000000000';
					break;
				case 3:
					this.newid = act + '00000000000';
					break;
				case 4:
					this.newid = act + '0000000000';
					break; 
				case 5:
					this.newid = act + '000000000';
					break;
				case 6:
					this.newid = act + '00000000';
					break;
				case 7:
					this.newid = act + '0000000';
					break;
				case 8:
					this.newid = act + '000000';
					break;
				case 9:
					this.newid = act + '00000';
					break;
				case 10:
					this.newid = act + '0000';
					break;
				case 11:
					this.newid = act + '000';
					break;
				case 12:
					this.newid = act + '00';
					break; 
				case 13:
					this.newid = act + '0';
					break;
				case 14:
					this.newid = act;
					break;
			}
			switch(act) {
				case 'AD':
					this.ADid = this.newid +  + lastid;
					break;
				case 'SC':
					this.SCid = this.newid +  + lastid;
					break;
				case 'HV':
					this.HVid = this.newid +  + lastid;
					break;
				case 'PC':
					this.PCid = this.newid +  + lastid;
					break;
			}
		},

		GetBiggestID() {
			let lastid = null
			let act = null

			Adjustdataservice.getID()
				.then(response => {
					act = 'AD';
					lastid = String(Number(response.data[0].adjust_id.split(act)[1]) + 1)
					this.changeidtitle(lastid.length, act, lastid)
				})
				.catch(e => {
					console.log(e);
				});

			Scrapdataservice.getID()
				.then(response => {
					act = 'SC';
					lastid = String(Number(response.data[0].scrap_id.split(act)[1]) + 1)
					this.changeidtitle(lastid.length, act, lastid)
				})
				.catch(e => {
					console.log(e);
				});

			Harvestdataservice.getID()
				.then(response => {
					act = 'HV';
					lastid = String(Number(response.data[0].harvest_id.split(act)[1]) + 1)
					this.changeidtitle(lastid.length, act, lastid)
				})
				.catch(e => {
					console.log(e);
				});

			Purchasedataservice.getID()
				.then(response => {
					act = 'PC';
					lastid = String(Number(response.data[0].purchase_id.split(act)[1]) + 1)
					this.changeidtitle(lastid.length, act, lastid)
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
			let getdate = new Date();
			this.InventoryData = getdate.getFullYear() + '-' + (getdate.getMonth()+1) + '-' + getdate.getDate() + ' ' + getdate.getHours() + ':' + getdate.getMinutes() + ":" + getdate.getSeconds()

			if(this.FuncSelects == '進貨'){  //進貨增加存貨 還沒寫紀錄
				this.inventory = Number(this.currentTutorial.product_inventory) + Number(InventoryNum);
				
				this.purchase.purchase_date = this.InventoryData
				this.purchase.purchase_id = this.PCid
				this.purchase.product_id = this.currentTutorial.product_id
				this.purchase.purchase_amount = Number(InventoryNum)
				this.purchase.purchase_subtotal = 40
				this.purchase.purchase_total = 40

				Purchasedataservice.create(this.purchase);
			}

			if(this.FuncSelects == '採收'){  //採收增加存貨
				this.inventory = Number(this.currentTutorial.product_inventory) + Number(InventoryNum);
				
				this.harvest.harvest_date = this.InventoryData
				this.harvest.harvest_id = this.SCid
				this.harvest.product_id = this.currentTutorial.product_id
				this.harvest.harvest_amount = Number(InventoryNum)

				Scrapdataservice.create(this.scrap);
			}

			if(this.FuncSelects == '調整'  && this.AdjustMinuss == false){  //調整增加存貨
				this.inventory = Number(this.currentTutorial.product_inventory) + Number(InventoryNum);

				this.adjust.adjust_date = this.InventoryData
				this.adjust.adjust_id = this.ADid
				this.adjust.product_id = this.currentTutorial.product_id
				this.adjust.adjust_amount = Number(InventoryNum)
				
				// Adjustdataservice.create(this.adjust);
				Adjustdataservice.create(this.adjust);
			}

			if(this.FuncSelects == '調整'  && this.AdjustMinuss != false){  //調整減少存貨 還沒辦法辨識增加或減少
				this.inventory = Number(this.currentTutorial.product_inventory) + Number(InventoryNum);
				
				this.adjust.adjust_date = this.InventoryData
				this.adjust.adjust_id = this.ADid
				this.adjust.product_id = this.currentTutorial.product_id
				this.adjust.adjust_amount = Number(InventoryNum)

				Adjustdataservice.create(this.adjust);
			}

			if(this.FuncSelects == '報廢'){  //報廢減少存貨
				this.inventory = Number(this.currentTutorial.product_inventory) - Number(InventoryNum);

				this.scrap.scrap_date = this.InventoryData
				this.scrap.scrap_id = this.SCid
				this.scrap.product_id = this.currentTutorial.product_id
				this.scrap.scrap_amount = Number(InventoryNum)

				Scrapdataservice.create(this.scrap);
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
			this.GetBiggestID();
		},

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
			this.GetBiggestID();

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
