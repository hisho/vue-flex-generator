import card_data from "../datas/card.json";
const collist = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5},{id: 6},{id: 7},{id: 8},{id: 9},{id: 10}];
const rowgaplist = [{id: 0},{id: 5},{id: 10},{id: 15},{id: 20},{id: 25},{id: 30},{id: 35},{id: 40},{id: 45},{id: 50}];
const colgaplist = [{id: 0},{id: 5},{id: 10},{id: 15},{id: 20},{id: 25},{id: 30}];

export const app = new Vue({
  el: "#app",
  data: {
    cards: card_data,
    cardLength: card_data.length,
    cardtest: [],
    addText: null,
    removeText: null,
    select: {
      col: {
        state: 4,
        active: false,
        show: false,
        list: collist
      },
      rowgap: {
        state: 30,
        active: false,
        show: false,
        list: rowgaplist
      },
      colgap: {
        state: 20,
        active: false,
        show: false,
        list: colgaplist
      },
    }
  },
  methods: {
    rowStyle: function() {
      return {
        marginTop: `-${this.select.rowgap.state}px`,
        marginLeft: `-${this.select.colgap.state}px`
      };
    },
    colStyle: function() {
      const widthNuber = ((1 / Number(this.select.col.state)) * 100);
      return {
        paddingTop: `${this.select.rowgap.state}px`,
        paddingLeft: `${this.select.colgap.state}px`,
        width: `${widthNuber}%`
      };
    },
    StyleWidth: function() {
      return Math.floor((1 / Number(this.select.col.state)) * 100 * 1e4) / 1e4;
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
    },
    selectEv: function(main,item) {
      const isNumber = typeof item === `number`;
      if(isNumber) main.state = item;
      main.show = !main.show;
    },
  }
});