import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {userReducer} from './reducers/userReducer';
// import {postReducer} from '../reducers/postReducer';
// import {storyReducer} from '../reducers/storyReducer';
const combinedReducer = combineReducers({
    userReducer,
    
});
const store = createStore(combinedReducer, compose(
    applyMiddleware(thunk), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);
export default store;
