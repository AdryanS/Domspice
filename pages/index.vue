<template>
  <header class="w-screen h-20 bg-gray-950 flex items-center justify-center">
    <div class="max-w-5xl w-full flex justify-center items-center px-8">
      <h1 class="text-white font-bold"><Icon name="" /> Dom Spice</h1>
    </div>
  </header>
  <div class="w-full flex flex-col justify-center items-center px-4">
    <div
      class="max-w-5xl w-full mt-8 flex items-center justify-center text-center bg-gray-950 text-white p-4 rounded"
    >
      <h1 class="text-base font-semibold">
        Clique no icone de adicão no produto desejado ou mude a quantidade para inserir ou remover-lo
        do carrinho.
      </h1>
    </div>

    <div
      class="max-w-5xl w-full mt-4"
      v-for="(product, index) in products"
      :key="index"
    >
      <div
        :class="`bg-gray-950 border-[2px] text-gray-100 py-4 px-4 box-border rounded-md transition-all duration-200 ${
          product.active && 'border-green-400'
        }`"
      >
        <div class="flex flex-row items-center justify-between">
          <div class="w-full mb-3 flex flex-col gap-y-2">
            <h2 class="text-lg font-bold">{{ product.name }}</h2>
            <hr />
            <p class="text-xs font-normal">{{ product.description }}</p>
          </div>
          <div
            class="m-3 w-8 h-8"
            @click="
              () => {
                product.active = !product.active;
                product.active == false
                  ? removeCart(product)
                  : addCard(product);
                product.active == false
                  ? product.quantity = 0
                  : product.quantity = 1;
              }
            "
          >
            <Icon
              class="w-7 h-7"
              :class="`${product.active && 'text-green-400'}`"
              name="material-symbols:add-circle"
            />
          </div>
        </div>
        <div class="flex flex-row justify-between items-center">
          <div class="flex flex-row text-white items-center">
            <label class="text-xs font-normal mr-2" for="qtd"
              >Quantidade:</label
            >
            <div class="border rounded">
              <button
                class="bg-gray-950 w-6"
                @click="
                  () => {
                    product.quantity >= 10 ? '' : product.quantity++;
                    product.quantity == 1 ? product.active = true : ''
                    product.quantity == 1 ? addCard(product) : ''
                  }
                  "
              >
              +
              </button>
              <input
                class="w-5 bg-gray-950 text-center text-sm"
                :value="product.quantity"
                type="number"
                disabled
                name="qtd"
                id="qtd"
                />
                <button
                class="bg-gray-950 w-6"
                @click="
                  () => {
                    product.quantity <= 0 ? '' : product.quantity--;
                    product.quantity == 0 ? product.active = false : ''
                    product.quantity == 0 ? removeCart(product) : ''
                  }
                  "
              >
              -
              </button>
            </div>
          </div>
          <h2 class="m-2 text-lg font-semibold">
            R${{
              product.quantity === 0 || product.quantity < 0
                ? product.price.toFixed(2).replace(".", ",")
                : (product.price * product.quantity)
                    .toFixed(2)
                    .replace(".", ",")
            }}
          </h2>
        </div>
      </div>
    </div>
  </div>

  <footer class="w-full h-12"></footer>

  <div
    class="h-12 w-auto drop-shadow-xl flex flex-row-reverse bottom-10 left-4 m-2 sticky"
  >
    <button
      @click="() => sendMessage()"
      class="w-12 h-12 flex rounded-r-md items-center justify-center bg-gray-950"
    >
      <Icon
        class="text-slate-50 ease-in-out w-7 h-7"
        name="material-symbols:send-rounded"
      />
    </button>
    <div
      :class="`rounded-l-xl bg-white w-40 h-full flex justify-center items-center`"
    >
      <p class="text-xs -translate-y-[2px] mr-1">total:</p>
      <p class="text-emerald-700 text-xl font-semibold">R$ {{ total }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import data from "../data.json";

type TypeDataProducts = typeof data[0];

export default {
  data() {
    return {
      isPrice: false,
      products: [...data],
      productCart: [] as TypeDataProducts[],
    };
  },
  methods: {
    removeCart(props: TypeDataProducts) {
      this.productCart.splice(this.productCart.indexOf(props), 1);

      console.log(this.productCart);
    },
    addCard(props: TypeDataProducts) {
      this.productCart.push(props);

      const result = this.productCart.filter((f) => f.id === props.id);

      if (result.length === 2) {
        this.productCart.pop();
      }

      console.log(this.productCart);
    },
    sendMessage() {
      let message = [];

      if (this.productCart.length != 0) {
        message.push(
          "Seu%20pedido%20foi:%0A",
          this.productCart
            .map(
              (i) =>
                `${i.quantity}x%20${i.name.replaceAll(
                  " ",
                  "%20"
                )}%20%2D%20%52%24${i.price.toFixed(2).replace(".", ",")}`
            )
            .join("%0A") + `%0A%0ATotal:%20%52%24${this.total}`
        );
        window.location.href = `https://api.whatsapp.com/send?phone=556181010674&text=${message.join(
          "%0A"
        )}`;
      }
    },
  },
  computed: {
    total() {
      let total = 0;

      this.productCart.forEach((product) => {
        total += product.price * product.quantity;
      });

      return total.toFixed(2).replace(".", ",");
    },
  },
  updated() {},
};
</script>
