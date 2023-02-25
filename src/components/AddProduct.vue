<template>
  <!-- add modal -->

  <div class="q-pa-md q-gutter-sm">
    <q-btn label=" Add " color="primary" @click="medium = true" />

    <q-dialog v-model="medium">
      <q-card style="width: 1000px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Add Product</div>
        </q-card-section>

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
                  (val) => (val && val.length > 0) || 'Name field is required',
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
                    (val !== null && val !== '') || 'Cost field is required',
                  (val) =>
                    (val > 0 && val < 10000000) || 'Please type a real cost',
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
                    (val !== null && val !== '') || 'Address field is required',
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
                    (val !== null && val !== '') || 'Date field is required',
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

            <div class="col-12 q-pt-sm q-pl-sm">
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn
                flat
                label="cencel"
                color="primary"
                v-close-popup
                class="q-ml-md"
              />
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
  </div>

  <!-- add modal -->
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      medium: false,
      item: {
        name_uz: null,
        cost: null,
        address: null,
        product_type_id: null,
        created_date: null,
      },
      options: [],
    };
  },
  // add product
  methods: {
    getOptions() {
      axios
        .get("http://94.158.54.194:9092/api/product/get-product-types")
        .then((response) => {
          this.options = response.data;
        });
    },

    onSubmit() {
      this.item.created_date = Date.parse(this.item.created_date.slice(0, 10));
      axios
        .post("http://94.158.54.194:9092/api/product", this.item)
        .then((response) => {
          this.addNotify();
          setTimeout(() => {
            this.medium = false;
          }, 700);
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

    addNotify() {
      this.$q.notify({
        message: "Successfully added!",
        color: "green",
      });
    },
  },
  mounted(){
    this.getOptions()
  }
};
</script>

<style></style>
