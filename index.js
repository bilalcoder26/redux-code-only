const {
  redux,
  createStore,
  combineReducers,
  applyMiddleware,
} = require("redux"); //importing redux
// const createStore = redux.createStore; //creating store

const Buy_Book = "Buy_Book";
//initialize the store
const initialStateBooks = {
  numberOfBooks: 10,
};

const initialStatePens = {
  numberOfPens: 20,
};

//action creator:wrrapping the action in a single function
function buyBook() {
  //Action
  return {
    type: "Buy_Book",
    payload: "My First Action",
  };
}

function buyPen() {
  //Action
  return {
    type: "Buy_Pen",
    payload: "My second Action",
  };
}

//reducer(pervState,action)=>newState

const booksReducer = (state = initialStateBooks, action) => {
  switch (action.type) {
    case "Buy_Book":
      return {
        ...state,
        numberOfBooks: state.numberOfBooks - 1,
      };

    default:
      return state;
  }
};

const pensReducer = (state = initialStatePens, action) => {
  switch (action.type) {
    case "Buy_Pen":
      return {
        ...state,
        numberOfPens: state.numberOfPens - 2,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  book: booksReducer,
  pen: pensReducer,
});

//middleware
const logger = (store) => {
  return (next) => {
    return (action) => {
      const result = next(action);
      console.log("middleware log", result);
      return result;
    };
  };
};

const store = createStore(reducer, applyMiddleware(logger));
//by getstate() we access the state value
console.log("initial State", store.getState());
const unsubscribe = store.subscribe(() => {
  console.log("updated state value", store.getState());
});
store.dispatch(buyBook());
store.dispatch(buyBook());
store.dispatch(buyBook());
store.dispatch(buyPen());
store.dispatch(buyPen());
store.dispatch(buyPen());
unsubscribe();
