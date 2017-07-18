<template>
  <div id="app">
    <controls></controls>
    <boards-list></boards-list>
  </div>
</template>

<script>
import Controls from './components/Controls';
import BoardsList from './components/BoardsList';

export default {
  name: 'app',
  components: {
    Controls,
    BoardsList,
  },
};
</script>

<style>
body {
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  background: #ffffff;
  margin: 0;
  padding: 0 0 50px 0;
  overflow-y: scroll;
}

*, *:before, *:after {
  box-sizing: border-box;
}

@media only print
{
  .github-corner {
    display: none;
  }
}
</style>
