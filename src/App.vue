<template>
  <div id="app">
    <sl-alert
      open
      :closable="isClosable"
    >
      <sl-icon slot="icon" name="info-circle"></sl-icon>
      {{alertText}}
    </sl-alert>
    <br/>
    <h2>{{text}}</h2> 
    <sl-menu style="max-width: 200px; border: solid 1px var(--sl-color-gray-90); border-radius: var(--sl-border-radius-medium);">
      <sl-menu-item v-for="setting in menu" :key="setting.value" :value="setting.value">{{setting.text}}</sl-menu-item>
    </sl-menu>
    <div class="card-group">
      <sl-card  v-for="card in cards" :key="card.id" :kitten="kittenUrl" class="card-overview" style="max-width: 300px;">
        <img  
            :src="kittenUrl" 
        ><br/>
        <strong>{{card.id}} - {{card.title}}</strong><br/>
        {{card.body}}
      </sl-card>
    </div>
    <div>
      <sl-tab-group>
        <template v-for="tab in tabs" :key="tab.id">
          <sl-tab v-if="tab.active" :id="tab.id" :panel="tab.name" active>{{tab.name}}
            <slot name="nav"></slot>
          </sl-tab>
          <sl-tab v-else :id="tab.id" :panel="tab.name" @click="setActiveTab(tab.name)">{{tab.name}}
            <slot name="nav"></slot>
          </sl-tab>
        </template>
        <template v-for="tab in tabs" :key="tab.id">
          <sl-tab-panel v-if="tab.active" :name="tab.name" active>This is the {{tab.name}} tab panel.</sl-tab-panel>
          <sl-tab-panel v-else :name="tab.name">This is the {{tab.name}} tab panel.</sl-tab-panel>
        </template>
      </sl-tab-group>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const alertText = ref("This is an alert!");
    const isClosable = ref(true);
    const text = ref("This is a test!");
    const menu = ref(
      [
        {
          text: 'Undo',
          value: 'undo'
        },
        {
          text: 'Redo',
          value: 'redo'
        },
        {
          text: 'Cut',
          value: 'cut'
        },
        {
          text: 'Copy',
          value: 'copy'
        },
        {
          text: 'Paste',
          value: 'paste'
        },
        {
          text: 'Delete',
          value: 'delete'
        }
      ]
    );
    const cards = ref([
      {id: 1, title: '', body: ''},
      {id: 2, title: '', body: ''},
      {id: 3, title: '', body: ''},
      {id: 4, title: '', body: ''},
      {id: 5, title: '', body: ''},
      {id: 6, title: '', body: ''},
      {id: 7, title: '', body: ''},
      {id: 8, title: '', body: ''}
    ]);
    const kittenUrl = 'https://placekitten.com/g/200/300';
    const tabs = ref([
      {name: 'starter', active: true},
      {name: 'professional', active: false},
      {name: 'advanced', active: false},
      {name: 'enterprise', active: false}
    ]);

    const getCardValues = async () => {
      console.log('Getting values...');
      const fetchUrlPrefix = 'https://jsonplaceholder.typicode.com/posts/';
      const promises = cards.value.map(async (card, index) => {
        const cardValue = await fetch(fetchUrlPrefix+card.id).catch((err) => {
          const errObj = {id: index, title: "Error", body: err.message}
          return errObj;
        });
        try {
          return cardValue.json();
        } catch(err) {
          const errObj = {id: index, title: "Error", body: "Problem connecting to "+fetchUrlPrefix}
          return errObj;
        }
      });
      const cardValues = await Promise.all(promises);
      cardValues.map((card, index) => {
        cards.value[index].title = card.title;
        cards.value[index].body = card.body; 
      });   
      //console.log(cardValues);
      console.log('Values obtained...');
    };

    const setActiveTab = (tabName) => {
      tabs.value.map((tab, index) => {
        tabs.value[index].active = (tab.name === tabName) ? true : false;
      });
    };

    // Run any pre-render methods:
    getCardValues();
    // Render
    return {
      alertText,
      isClosable,
      text,
      menu,
      cards,
      kittenUrl,
      tabs,
      getCardValues,
      setActiveTab
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
