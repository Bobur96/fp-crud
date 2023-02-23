<template>
  <q-page class="flex flex-center">
    <q-table
      title="Products"
      color="secondary"
      v-model:pagination="pagination"
      :loading="loading"
      :rows="products"
      :columns="columns"
    >
      <template #loading>
        <q-inner-loading showing color="secondary" />
      </template>
    </q-table>
  </q-page>
</template>

<script>
import axios from "axios";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name : 'Table',
  // data() {
  //   return {
  //     loading: true,
  //     pagination: {
        // sortBy: "name",
        // descending: false,
        // page: 1,
        // rowsPerPage: 3,
  //     },
  //     products: [],
      // columns: [
      //   {
      //     name: "name_uz",
      //     label: "Name",
      //     align: "left",
      //     field: "name_uz",
      //     sortable: true,
      //   },
      //   {
      //     name: "address",
      //     label: "Address",
      //     align: "left",
      //     field: "address",
      //     sortable: true,
      //   },
      //   {
      //     name: "cost",
      //     label: "Cost",
      //     align: "left",
      //     field: "cost",
      //     sortable: true,
      //   },
      //   {
      //     name: "created_date",
      //     label: "Date",
      //     align: "left",
      //     field: "created_date",
      //     sortable: true,
      //   },
      // ],
  //   };
  // },
  // mounted() {
    // axios
    //   .get("http://94.158.54.194:9092/api/product")
    //   .then((res) => (this.products = res.data))
    //   .finally(() =>
    //     setTimeout(() => {
    //       this.loading = false;
    //     }, 1000)
    //   );
  // },
  setup() {
    const loading = ref()
    const products = ref([])
    const pagination = ref({
        sortBy: "name",
        descending: false,
        page: 1,
        rowsPerPage: 5,
    })
    const columns = [
        { name: "name_uz", label: "Name", field: "name_uz", align: "left", sortable: true, },
        { name: "address", label: "Address", field: "address", align: "left", sortable: true, },
        { name: "cost", label: "Cost", field: "cost", align: "left", sortable: true, },
        { name: "created_date", label: "Date", field: "created_date", align: "left", sortable: true, }
      ]

      axios.get("http://94.158.54.194:9092/api/product")
      .then((res) => products.value = res.data)
      .finally(() => setTimeout(() => {
          loading.value = false;
        }, 1000)
      );

    return {
      pagination, loading, products, columns,
    }
  }
})
</script>

<style></style>
