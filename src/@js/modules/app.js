import card_data from "../datas/card.json"

export const app = new Vue({
  el: "#app",
  data: {
    cards: card_data,
    cardIndex: null,
    message: "Hello Vue.js"
  },
  methods: {
    background: function(index) {
      const imgIndex = String(index + 1).padStart(2, `0`);
      return { backgroundImage: `url(assets/img/cat${imgIndex}.jpg)` };
    }
  }
});
