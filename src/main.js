import Vue from 'vue';
import Vuex from 'vuex';
import App from './components/App.vue';

Vue.use(Vuex)

const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr
}

const store = new Vuex.Store({
  state: {
    boardOption: {
      size: [10, 10],
      mines: 50
    },
    boardState: [],
    gameState: {
      startedAt: null,
      missed: 0,
      sweeped: 0,
    }
  },
  mutations: {
    initialize (state, options) {
      state.boardOption.size = options.size;
      state.boardOption.mines = options.mines;

      const generateInitial = () => { return {
        isMine: false,
        surroundingMinesCount: 0,
        opened: false,
        marked: false,
      }};
      Vue.set(state, 'boardState', Array(options.size[0] * options.size[1]));
      for (let j=0;j<state.boardState.length;j++){
        Vue.set(state.boardState, j, generateInitial())
      }
      let mineAddresses = shuffle(
        [...Array(options.size[0] * options.size[1]).keys()]
      ).slice(
        0, options.mines 
      );
      for (let i=0;i<options.mines;i++) {
        let address = mineAddresses[i];
        state.boardState[address].isMine = true;
        this.getters.surroundingCells(address).forEach(function(surrounding) {
          state.boardState[surrounding].surroundingMinesCount++;
        })
      }
    },
    _open (state, key) {
      let s = state.boardState[key];
      if (!s.opened && !s.marked) {
        s.opened = true;
        if (s.isMine) {
          state.gameState.missed++;
          alert('Oops!');
        }
      }
      if (!state.gameState.startedAt) {
        state.gameState.startedAt = Date.now();
      }
    },
    _mark (state, key) {
      let s = state.boardState[key];
      if (!s.opened && !s.marked) {
        s.marked = true;
        if (!s.isMine) {
          alert('???');
        } else {
          state.gameState.sweeped++;
        }
      }
    }

  },
  actions: {
    open (context, key) {
      let s = context.state.boardState[key];
      if (!s.opened) {
        context.commit('_open', key);
        if (s.surroundingMinesCount === 0 && !s.isMine) {
          this.getters.surroundingCells(key).forEach( function (s) {
            context.dispatch('open', s)
          });
        }
      }
    },
    mark (context, key) {
      context.commit('_mark', key)
    }
  },
  getters: {
    surroundingCells: state => key => {
      let size = state.boardOption.size
      let exists = {
        U: !( key - size[1] < 0 ),
        D: !( key + size[1] >= size[0] * size[1] ),
        L: !( key % size[1] === 0 ),
        R: !( key % size[1] === size[1] - 1 ),
        C: true,
      };
      let surroundings = new Array();
      let surroundingsFactory = {
        UL: key - size[1] - 1,
        UC: key - size[1] + 0,
        UR: key - size[1] + 1,
        CL: key - 1,
        CR: key + 1,
        DL: key + size[1] - 1,
        DC: key + size[1] + 0,
        DR: key + size[1] + 1,
      };
      for ( let target in surroundingsFactory ) {
        if ( exists[target[0]] && exists[target[1]] ) {
          surroundings.push(surroundingsFactory[target])
        }
      }
      return surroundings;
    },
    remainingMines: (state) => {
      return state.boardOption.mines
        - state.gameState.missed
        - state.gameState.sweeped;
    }
  }
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});