import card_data from "../datas/card.json";

/**
 * [{id: number}]のrange objectを生成する関数
 * @param length
 * @param callback
 * @return {{id: *|number}[]}
 */
function rangeObject(length,callback) {
  return [...Array(length)].map((_, i) => {
    return {
      id: callback ? callback(i) : i
    }
  })
}

const collist = rangeObject(10, (index) => index + 1);
const rowgaplist = rangeObject(11, (index) => index * 5);
const colgaplist = rangeObject(11, (index) => index * 5);

new Vue({
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
    rowStyle: function () {
      return {
        marginTop: `-${this.select.rowgap.state}px`,
        marginLeft: `-${this.select.colgap.state}px`
      };
    },
    colStyle: function () {
      const widthNuber = ((1 / Number(this.select.col.state)) * 100);
      return {
        paddingTop: `${this.select.rowgap.state}px`,
        paddingLeft: `${this.select.colgap.state}px`,
        width: `${widthNuber}%`
      };
    },
    StyleWidth: function () {
      return Math.floor((1 / Number(this.select.col.state)) * 100 * 1e4) / 1e4;
    },
    shuffle: function () {
      this.cards = _.shuffle(this.cards);
    },
    add: function () {
      if (this.cards.length + 1 <= this.cardLength) {
        const lastItem = this.cardtest[this.cardtest.length - 1];
        this.cardtest.pop();
        this.cards.push(lastItem);
        this.addText = null;
        this.removeText = null;
      } else {
        this.addText = `これ以上追加できません`;
      }
    },
    remove: function () {
      if (this.cards.length >= 1) {
        const lastItem = this.cards[this.cards.length - 1];
        this.cardtest = [...this.cardtest, lastItem];
        this.cards.pop();
        this.addText = null;
        this.removeText = null;
      } else {
        this.removeText = `これ以上削除できません`;
      }
    },
    selectEv: function (main, item) {
      const isNumber = typeof item === `number`;
      if (isNumber) main.state = item;
      main.show = !main.show;
    },
  }
});