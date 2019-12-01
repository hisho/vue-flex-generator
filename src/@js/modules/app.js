import card_data from "../datas/card.json"

export const app = new Vue({
  el: "#app",
  data: {
    cards: card_data,
    cardLength: card_data.length,
    cardtest: ``,
    addText: null,
    removeText: null,
    col: `4`,
    rowGap: `30`,
    colGap: `20`,
  },
  methods: {
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
    },
    shuffle: function () {
      this.cards = _.shuffle(this.cards);
    },
    add: function() {
      if(this.cards.length + 1 <= this.cardLength) {
        const lastItem = this.cardtest[this.cardtest.length - 1];
        this.cardtest.pop();
        this.cards.push(lastItem);
        this.addText = null;
        this.removeText = null;
      } else {
        this.addText = `これ以上追加できません`;
      }
    },
    remove: function() {
      if(this.cards.length >= 1) {
        const lastItem = this.cards[this.cards.length - 1];
        this.cardtest = [...this.cardtest,lastItem];
        this.cards.pop();
        this.addText = null;
        this.removeText = null;
      } else {
        this.removeText = `これ以上削除できません`;
      }
    }
  }
});
