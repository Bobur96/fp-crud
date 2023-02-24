<template>
  <div style="padding: 20px 5vw">
    <h5 class="text-center" style="margin: 0px">View</h5>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%)"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">Cafe Basilico</div>
            <div
              class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
            >
              <q-icon name="place" />
              250 ft
            </div>
          </div>

          <q-rating v-model="stars" :max="5" size="32px" />
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="event" />
          <q-btn flat color="primary"> Reserve </q-btn>
        </q-card-actions>
      </q-card>

      <q-card style="padding: 10px 20px" class="col-md-8">
        <div>
          <div class="">
            <div class="">
              <div class="row items-center" style="margin: 17px 0">
                <div class="col-sm-3">
                  <p class="text-subtitle2 items-center q-ma-none">Product Name</p>
                </div>
                <div class="">
                  {{ name }}
                </div>
              </div>
              <hr />
              <div class="row items-center" style="margin: 17px 0">
                <div class="col-sm-3">
                  <p class="text-subtitle2 items-center q-ma-none">
                    Cost
                  </p>
                </div>
                <div class="">
                  {{ cost }}
                </div>
              </div>
              <hr />
              <div class="row items-center" style="margin: 17px 0">
                <div class="col-sm-3">
                  <p class="text-subtitle2 items-center q-ma-none">Address</p>
                </div>
                <div class="">
                  {{ address }}
                </div>
              </div>
              <hr />
              <div class="row items-center" style="margin: 17px 0">
                <div class="col-sm-3">
                  <p class="text-subtitle2 items-center q-ma-none">
                    Create Date
                  </p>
                </div>
                <div class="">
                  {{ create_date }}
                </div>
              </div>
              <hr />
              <div class="row items-center" style="margin: 17px 0">
                <div class="col-sm-12">
                  <q-btn
                    :loading="loading4"
                    color="primary"
                    @click="simulateProgress(4)"
                    style="width: 150px"
                  >
                    Edit
                    <template v-slot:loading>
                      <q-spinner-hourglass class="on-left" />
                      Loading...
                    </template>
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stars: 4,
      name: "Laptop i7 11570U",
      cost: "$500",
      address: "Alisher Navoiy street",
      create_date: "12-02-2022",

      loading4: false,
    };
  },
  methods: {
    simulateProgress (number) {
      this[`loading${number}`] = true
      setTimeout(() => {
        this[`loading${number}`] = false
      }, 3000)
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
