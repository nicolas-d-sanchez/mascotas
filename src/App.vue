<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-app-bar-nav-icon
          v-if="$vuetify.breakpoint.width < 1265"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
        <v-icon @click.stop="dialog = !dialog">mdi-cart</v-icon>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64">
          <img
            src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-pets-vector-logo-template-this-cat-and-dog-logo-could-be-png-image_3641319.jpg"
          />
        </v-avatar>
        <div>Mascotas</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="item in items" :key="item.text" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-dialog v-model="dialog" max-width="290">
      <v-card height="350">
        <v-card-title class="text-h5"> Resumen de Compra </v-card-title>
        <v-card-text v-if="this.$store.state.cart.length === 0">
          El carro esta vacio
        </v-card-text>
        <ul v-for="item in this.$store.state.cart" :key="item.id">
          <li>
            {{ item.producto }}
          </li>
          <li>${{ item.precio }}</li>
        </ul>
        <v-col>Total: ${{ sumatoria }}</v-col>
      </v-card>
    </v-dialog>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: true,
    dialog: false,
    sumatoria: 0,
    items: [
      {
        text: "Todos",
        icon: "mdi-account-edit",
        link: "/",
      },
      {
        text: "Alimentos",
        icon: "mdi-account-edit",
        link: "/productos/Alimentos",
      },
      {
        text: "Juguetes",
        icon: "mdi-gamepad-round",
        link: "/productos/Juguetes",
      },
      {
        text: "Gatos",
        icon: "mdi-cat",
        link: "/productos/Gatos",
      },
      {
        text: "Perros",
        icon: "mdi-dog",
        link: "/productos/Perros",
      },
      {
        text: "Medicamentos",
        icon: "mdi-medical-bag",
        link: "/productos/Medicamentos",
      },
    ],
  }),

  watch: {
    "$store.state.cart": function () {
      this.$store.state.cart.forEach((element) => {
        this.sumatoria += element.precio;
      });
    },
  },
};
</script>
<style>
.li {
  list-style: none;
}
</style>
