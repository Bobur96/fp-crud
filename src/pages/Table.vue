<template>
  <div class="q-pa-md">
    <h5 class="text-center" style="margin: 14px">Products</h5>
    <q-table
      :data="products"
      :columns="columns"
      :loading="loading"
      row-key="id"
    >
      <template v-slot:body-cell-actions="props">
        <td style="width: 210px" :props="props">
          <q-icon class="text-primary" name="print" size="xs">
            <q-tooltip>view</q-tooltip>
          </q-icon>
          <q-icon class="text-warning" name="edit" size="xs">
            <q-tooltip>edit</q-tooltip>
          </q-icon>
          <q-icon
            class="text-red"
            name="delete"
            size="xs"
            @click="deleteProduct(props.row.id)"
            ><q-tooltip>delete</q-tooltip></q-icon
          >
        </td>
      </template>
    </q-table>
    <AddProductVue />
  </div>
</template>

<script>
import axios from "axios";
import AddProductVue from "src/components/AddProduct.vue";

export default {
  components:{
    AddProductVue,
  },
  data() {
    return {
      loading: true,
      medium: false,
      products: [],
      columns: [
        {
          name: "name_uz",
          label: "Name",
          align: "left",
          field: "name_uz",
          sortable: true,
        },
        {
          name: "address",
          label: "Address",
          align: "left",
          field: "address",
          sortable: true,
        },
        {
          name: "cost",
          label: "Cost",
          align: "left",
          field: "cost",
          sortable: true,
        },
        {
          name: "created_date",
          label: "Date",
          align: "left",
          field: "created_date",
          sortable: true,
        },
        {
          name: "actions",
          label: "Actions",
          align: "left",
          field: "actions",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    getProducts() {
      axios
        .get("http://94.158.54.194:9092/api/product")
        .then((res) => {
          res.data.forEach((el) => {
            el.created_date = new Date(el.created_date)
              .toISOString()
              .slice(0, 10);
          });

          this.products = res.data;
        })
        .finally(() =>
          setTimeout(() => {
            this.loading = false;
          }, 1000)
        );
    },

    deleteProduct(id) {
      axios
        .delete(`http://94.158.54.194:9092/api/product/${id}`)
        .then((res) => {
          this.showNotif();
          this.getProducts();
        });
    },

    showNotif() {
      this.$q.notify({
        message: "Successfully deleted!",
        color: "purple",
      });
    },

  },
  mounted() {
    this.getProducts();
  },
  updated(){
    this.getProducts();
  }
};
</script>

<style>
.col-sm-6{
  padding: 0 10px;
  margin: 4px 0;
}

i {
  margin-right: 25px;
  cursor: pointer !important;
}
</style>
