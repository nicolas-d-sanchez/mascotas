<template>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <v-col v-for="item in alimentos" :key="item.id" cols="4">
        <v-card height="380">
          <v-img id="img" height="100" width="100" :src="item.photo"></v-img>
          <v-card-title class="text-h5">
            {{ item.name }}
          </v-card-title>
          <v-card-text> ${{ item.price }} </v-card-text>
          <v-card-actions>
            <v-col cols="3">
              <v-text-field
                class="cantidad"
                type="number"
                :name="item.id"
                :value="counter"
                append-icon="mdi-plus"
                prepend-inner-icon="mdi-minus"
                @click:prepend-inner="changeCounter('-1')"
                @click:append="changeCounter('1')"
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Quitar
            </v-btn>
            <v-btn color="green darken-1" text @click="agregar(item)">
              Agregar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Alimentos",
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,
    counter: 0,
    alimentos: [],
    links: [
      ["mdi-inbox-arrow-down", "Inbox"],
      ["mdi-send", "Send"],
      ["mdi-delete", "Trash"],
      ["mdi-alert-octagon", "Spam"],
    ],
  }),

  methods: {
    changeCounter: function (num) {
      this.counter += +num;
      console.log(this.counter);
      !isNaN(this.counter) && this.counter > 0
        ? this.counter
        : (this.counter = 0);
    },

    agregar(item) {
      let product = {
        producto: item.name,
        precio: item.price,
        id: item.id,
        codigo: item.code,
        foto: item.photo,
        descripcion: item.description,
      };
      this.$store.state.cart.push(product);
    },
  },

  mounted() {
    axios
      .get("http://sva.talana.com:8000/api/product/?format=json")
      .then((response) => {
          response.data.forEach(element => {
            if(element.category.name === "Alimentos"){                      
              this.alimentos.push(element)
            }       
          });      
      });
  },
};
</script>
<style>
#img {
  display: block;
  margin: 0 auto;
}
</style>
