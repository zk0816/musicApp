import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //在浏览器中安装了redux的相关插件，开启redux状态的调试模式。

const store = createStore (reducer, composeEnhancers (
  applyMiddleware (thunk)
));

export default store;