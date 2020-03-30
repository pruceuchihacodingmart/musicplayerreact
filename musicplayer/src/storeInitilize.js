import { createStore } from "redux";
import rootReducer from "./Reducers/rootReducer";

export const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(()=>{
    // console.log("store updated")
    console.log(store.getState())
  })