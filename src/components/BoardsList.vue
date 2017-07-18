<template>
  <div id="boards-list" v-if="phrases.current != null">
    <div v-for="n in parseInt(count)" :key="n" class="bingo-board-container">
      <div class="logo-container">
        <img src="../assets/logo.png" alt="Heroes of the Storm" />
      </div>
      <div class="bingo-board">
        <ul v-for="row in 5" :key="row" class="bingo-row" >
          <li v-for="col in 5" :key="col">
            <div class="hexagon-container">
              <div class="hexagon-text">
                <span>{{ getBoard(n)[(row-1) * 5 + (col-1)] }}</span>
              </div>
              <div class="hexagon"></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="instructions">
        While you watch the <em>Heroes of the Storm</em>, mark each hex as a caster says the indicated phrase. Be the first player to mark five hexes in a row (horizontal, vertical, or diagonal) and shout “<strong>BINGO</strong>” to win!
      </div>
      <div v-if="n != count" class="page-break"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'boards-list',
  store: {
    count: 'count',
    phrases: 'phrases',
  },
  methods: {
    shuffle(arr) {
      const shuffled = arr.slice();
      let currentIndex = arr.length;
      let temporaryValue;
      let randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = shuffled[currentIndex];
        shuffled[currentIndex] = shuffled[randomIndex];
        shuffled[randomIndex] = temporaryValue;
      }

      return shuffled;
    },
    getBoard(n) {
      while (this.phrases.current == null);

      if (!this.phrases.boards[n]) {
        this.phrases.boards[n] = this.shuffle(this.phrases.current).slice(0, 25);
      }

      return this.phrases.boards[n];
    },
  },
};
</script>

<style scoped>
.logo-container {
  width: 590px;
  height: 100px;
  text-align: center;
  margin: 0px auto;
  padding: 20px 0 0 0;
}

.instructions {
  width: 590px;
  margin: 0px auto;
  padding-top: 40px;
  font-size: 14px;
}

.bingo-board {
  margin: 0px auto;
  padding: 20px 0 0 0;
  height: 505px;
  width: 590px;
}

.bingo-row {
  margin: 0;
  padding: 0;
}

.bingo-row>li {
  list-style-type: none;
  display: inline-block;
  padding: 0 5px 0 100px;
}

.bingo-board ul {
  padding: 72px 0 0 0;
}

.bingo-board ul:nth-child(odd) {
  padding-left: 52px;
}

.bingo-board ul:first-child {
  padding-top: 0;
}

.bingo-board ul>li:first-child {
  padding-left: 10px;
}

.hexagon {
  position: relative;
  width: 100px;
  height: 57.74px;
  margin: 28.87px 0;
  background: #ffffff;
  border-left: solid 5px #333333;
  border-right: solid 5px #333333;
  top: -60px;
}

.hexagon:before,
.hexagon:after {
  content: "";
  position: absolute;
  z-index: 1;
  width: 70.71px;
  height: 70.71px;
  -webkit-transform: scaleY(0.5774) rotate(-45deg);
  -ms-transform: scaleY(0.5774) rotate(-45deg);
  transform: scaleY(0.5774) rotate(-45deg);
  background-color: inherit;
  left: 9.6447px;
}

.hexagon:before {
  top: -35.3553px;
  border-top: solid 7.0711px #333333;
  border-right: solid 7.0711px #333333;
}

.hexagon:after {
  bottom: -35.3553px;
  border-bottom: solid 7.0711px #333333;
  border-left: solid 7.0711px #333333;
}

.hexagon-container {
  position: absolute;
  width: 100px;
  height: 100px;
}

.hexagon-text {
  position: relative;
  z-index: 999;
  top: 25px;
  left: 5px;
  width: 90px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}

.hexagon-text > span {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

.page-break {
  height: 80px;
  width: 100%;
  border-bottom: 1px dashed #333333;
  margin-bottom: 40px;
  min-width: 590px;
}

@media only print
{
  .page-break {
    display: block;
    height: 0;
    margin: 0;
    padding: 0;
    border: none;
    page-break-before: always;
  }

  /* .bingo-board {
    page-break-after: left;
  }
  .bingo-board:last-of-type {
    page-break-after: auto;
  } */
}
</style>
