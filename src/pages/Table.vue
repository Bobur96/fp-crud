<template>
  <div class="q-pa-md">
    <h5 class="text-center" style="margin: 14px">Products</h5>
    <q-table :data="products" :columns="columns" :loading="loading" row-key="name" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      products: [],
      columns: [
        { name: "name_uz", label: "Name", align: "left", field: "name_uz", sortable: true, },
        { name: "address", label: "Address", align: "left", field: "address", sortable: true, },
        { name: "cost", label: "Cost", align: "left", field: "cost", sortable: true, },
        { name: "created_date", label: "Date", align: "left", field: "created_date", sortable: true, },
        { name: "actions", label: "Actions", align: "left", field: "actions", sortable: true, },
      ],
    };
  },
  mounted() {
    axios
      .get("http://94.158.54.194:9092/api/product")
      .then((res) => {
        res.data.forEach(el => {
          el.created_date = new Date(el.created_date).toISOString().slice(0, 10)
          el.actions = 'icon'
        })

        this.products = res.data
      })
      .finally(() =>
        setTimeout(() => {
          this.loading = false;
        }, 1000)
      );
  },
}

</script>

<style></style>
