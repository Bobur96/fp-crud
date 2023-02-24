<template>
  <div style="padding-top: 20px">
    <h5 class="text-center" style="margin: 0">Add Product</h5>
    <q-form
      style="padding: 30px 6%"
      @submit="onSubmit"
      @reset="onReset"
      class="row gap-2"
    >
      <div class="col-sm-6" style="padding: 0 5px;">
        <q-input
          filled
          v-model="name"
          label="Name *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Name field is required',
          ]"
        />
      </div>

      <div class="col-sm-6" style="padding: 0 5px;">
        <q-input
          filled
          type="number"
          v-model="cost"
          label="Cost *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Cost field is required',
            (val) => (val > 0 && val < 10000000) || 'Please type a real cost',
          ]"
        />
      </div>

      <div class="col-sm-6" style="padding: 0 5px;">
        <q-input
          filled
          v-model="address"
          label="Address *"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Address field is required',
          ]"
        />
      </div>

      <div class="col-sm-6" style="padding: 0 5px;">
        <q-input
          filled
          v-model="creation_date"
          label="Create date *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Date field is required',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="creation_date" mask="YYYY-MM-DD HH:mm">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time
                  v-model="creation_date"
                  mask="YYYY-MM-DD HH:mm"
                  format24h
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      cost: null,
      address: null,
      creation_date: null,
    };
  },
  methods: {
    onSubmit() {
      console.log(this.name);
    },

    onReset() {
      this.name = null;
      this.cost = null;
      this.accept = false;
    },
  },
};
</script>

<style></style>
