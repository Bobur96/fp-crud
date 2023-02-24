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

    <!-- add modal -->

    <div class="q-pa-md q-gutter-sm">
      <q-btn label=" Add " color="primary" @click="medium = true" />

      <q-dialog v-model="medium">
        <q-card style="width: 1000px; max-width: 80vw">
          <q-card-section>
            <div class="text-h6">Add Product</div>
          </q-card-section>

          <!-- <q-card-section class="q-pt-none"> -->
            <div>
              <q-form
                style="padding: 30px 6%"
                @submit="onSubmit"
                @reset="onReset"
                class="row"
              >
                <div class="col-sm-6">
                  <q-input
                    filled
                    v-model="item.name_uz"
                    label="Name *"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Name field is required',
                    ]"
                  />
                </div>

                <div class="col-sm-6">
                  <q-input
                    filled
                    type="number"
                    v-model="item.cost"
                    label="Cost *"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val !== null && val !== '') ||
                        'Cost field is required',
                      (val) =>
                        (val > 0 && val < 10000000) ||
                        'Please type a real cost',
                    ]"
                  />
                </div>

                <div class="col-sm-6">
                  <q-input
                    filled
                    v-model="item.address"
                    label="Address *"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val !== null && val !== '') ||
                        'Address field is required',
                    ]"
                  />
                </div>

                <div class="col-sm-6">
                  <q-select
                    filled
                    option-label="name_uz"
                    option-value="id"
                    v-model="item.product_type_id"
                    :options="options"
                    label="Product type *"
                    emit-value
                    map-options
                    :rules="[
                      (val) =>
                        (val !== null && val !== '') ||
                        'Product type field is required',
                    ]"
                  />
                </div>

                <div class="col-sm-6">
                  <q-input
                    filled
                    v-model="item.created_date"
                    label="Create date *"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val !== null && val !== '') ||
                        'Date field is required',
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="item.created_date"
                            mask="YYYY-MM-DD HH:mm"
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>

                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time
                            v-model="item.created_date"
                            mask="YYYY-MM-DD HH:mm"
                            format24h
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <div class="col-12 q-pt-sm q-pl-sm" >
                  <q-btn label="Submit" type="submit" color="primary" />
                  <q-btn flat label="cencel" color="primary" v-close-popup class="q-ml-md"/>
                </div>
              </q-form>
            </div>
          <!-- </q-card-section> -->

          <!-- <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="cencel" v-close-popup />
          </q-card-actions> -->
        </q-card>
      </q-dialog>
    </div>

    <!-- add modal -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      item: {
        name_uz: null,
        cost: null,
        address: null,
        product_type_id: null,
        created_date: null,
      },
      options: [],
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
      console.log(id);
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

    // add product

    getOptions() {
      axios
        .get("http://94.158.54.194:9092/api/product/get-product-types")
        .then((response) => {
          this.options = response.data;
        });
    },

    onSubmit() {
      this.item.created_date = Date.parse(this.item.created_date.slice(0, 10));
      console.log(this.item);
      axios
        .post("http://94.158.54.194:9092/api/product", this.item)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    onReset() {
      (this.item.name_uz = null),
        (this.item.cost = null),
        (this.item.address = null),
        (this.item.product_type_id = null),
        (this.item.created_date = null);
    },
  },
  mounted() {
    this.getProducts();
    this.getOptions();
  },
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
