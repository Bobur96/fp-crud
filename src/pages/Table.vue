<template>
  <div class="q-pa-md">
    <h5 class="text-center" style="margin: 14px">Products</h5>
    <div style="display: flex; justify-content: flex-end; margin-bottom: 15px">
      <q-btn
        label=" Add Product"
        color="primary"
        @click="
          mode = 'create';
          addShow = true;
        "
      />
    </div>
    <q-table :data="products" :columns="columns" :loading="loading" row-key="id">
      <template v-slot:body-cell-actions="props">
        <td style="width: 210px" :props="props">
          <q-icon
            class="text-primary"
            name="edit"
            size="xs"
            @click="editProduct(props.row)"
          >
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
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="addShow">
        <AddProductVue @added=" () => { getProducts(); addShow = false;}"
          :mode="mode"
          :updateItem="currentItem"
        />
      </q-dialog>
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </div>
</template>

<script>
import axios from "axios";
import AddProductVue from "src/components/AddProduct.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    AddProductVue,
  },
  data() {
    return {
      loading: true,
      addShow: false,
      mode: "create",
      currentItem: {},
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
  computed: {
    ...mapState("products", { products: "list" }),
  },
  methods: {
    ...mapActions("products", ["getProducts"]),
    async getProductsAll() {
      try {
        this.loading = true;
        this.getProducts();
      } finally {
        this.loading = false;
      }
    },
    deleteProduct(id) {
      axios.delete(`http://94.158.54.194:9092/api/product/${id}`).then((res) => {
        this.showNotif();
        this.getProductsAll();
      });
    },

    editProduct(item) {
      this.currentItem = item;
      this.mode = "update";
      this.addShow = true;
    },

    showNotif() {
      this.$q.notify({
        message: "Successfully deleted!",
        color: "purple",
      });
    },
  },
  mounted() {
    this.getProductsAll();
  },
};
</script>

<style scoped>
i {
  margin-right: 25px !important;
  cursor: pointer !important;
}
</style>
