<template>
  <div id="controls">
    <div>
      <h1>Heroes of the Storm Bingo Generator</h1>
      <dl>
        <dt>Number of boards</dt>
        <dd class="boards-count">
          <vue-slider v-model="count" :min="1" :max="10" tooltip="hover"></vue-slider>
        </dd>
        <dt>Phrase set</dt>
        <dd class="phrase-set">
          <multiselect v-model="phrases.sets.selected"
            :options="phrases.sets.available"
            :show-labels="false"
            :allow-empty="false"
            label="text"
            track-by="key"
            @input="updatePhrases">
          </multiselect>
        </dd>
      </dl>

      <h3>How to use</h3>
      <ol>
        <li>Choose your desired phrase set.</li>
        <li>Adjust number of boards to match players.</li>
        <li>Print this page. It will automatically be converted to the printer friendly version.</li>
      </ol>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import VueSlider from 'vue-slider-component';

export default {
  name: 'controls',
  store: {
    count: 'count',
    phrases: 'phrases',
  },
  components: {
    Multiselect,
    VueSlider,
  },
  methods: {
    updatePhrases() {
      fetch(`./static/phrases/${this.phrases.sets.selected.key}.json`)
        .then(r => r.json()).then((json) => {
          this.phrases.current = json;
          this.phrases.boards = {};
        });
    },
  },
  created() {
    this.updatePhrases();
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
#controls {
  width: 100%;
  background: #dddddd;
  border-bottom: 1px solid #bbbbbb;
  padding-bottom: 20px;
}

#controls>div {
  width: 590px;
  margin: 0px auto;
  clear: both;
}

.boards-count input {
  width: 200px;
}

h1 {
  margin-top: 0;
  padding-top: 10px;
}

h3 {
  clear: both;
}

dl {
  width: 100%;
  padding: 0;
  margin: 0;
}

dt {
  float: left;
  width: 200px;
  padding: 0;
  margin: 0;
}

dd {
  float: left;
  width: 390px;
  padding: 0 0 10px 0;
  margin: 0;
}

@media only print
{
  #controls {
    display: none;
  }
}
</style>
