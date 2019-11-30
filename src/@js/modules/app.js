import card_data from "../datas/card.json"

export const app = new Vue({
  el: "#app",
  data: {
    cards: card_data,
    col: `4`,
    rowGap: `30`,
    colGap: `20`,
  },
  methods: {
    background: function(index) {
      const imgIndex = String(index + 1).padStart(2, `0`);
      return {
        backgroundImage: `url(assets/img/cat${imgIndex}.jpg)`
      };
    },
    rowStyle: function() {
      return {
        marginTop: `-${this.rowGap}px`,
        marginLeft: `-${this.colGap}px`
      };
    },
    colStyle: function() {
      const widthNuber = ((1 / Number(this.col)) * 100);
      return {
        paddingTop: `${this.rowGap}px`,
        paddingLeft: `${this.colGap}px`,
        width: `${widthNuber}%`
      };
    },
    StyleWidth: function() {
      return Math.floor((1 / Number(this.col)) * 100 * 1e4) / 1e4;;
    }
  }
});
