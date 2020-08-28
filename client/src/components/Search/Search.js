import React from 'react';
import { BsSearch as SearchIcon } from "react-icons/bs";
import {connect} from 'react-redux';
import {searchUser} from '../../actions/userActions';
import './Search.css';
const Search = ({onSearch, searchResult, token}) => {
  console.log(token);
  const handleOnChange = (event) => {
    console.log(event.target.value);
    const value = event.target.value;
    return (
      onSearch('/api/searchUsers', 'POST', {value }, token)
    ); 
  }
  
  return (
    <>
      <div className="searchUser-bar">
        <div className="searchUserIcon">
          <SearchIcon />
        </div>
        <input 
          className="form-control mr-sm-2" 
          type="search" 
          placeholder="Search" 
          onChange={handleOnChange}
           />
      </div>
    </>
  )
}
const mapStateToProps = (state) => ({
  searchResult: state.userReducer.searchElem,
  token: state.userReducer.token,
})
const mapDispatchToProps = (dispatch) => ({
  onSearch: (url, method, data, token) => dispatch(searchUser(url, method, data, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Search);