import React, { useReducer } from 'react';
import GithubReducer from './githubReducer';
import GithubContext from './githubContext';
import {
  SEARCH_USERS,
  CLEAR_USERS,
  GET_USERS_REPOS,
  GET_USERS
} from '../types';

//useReducer is an alternative to useState.

const GithubState = (props) => {
  const initialState = {
    users: [],
    particularuser: {},
    createdRepos: [],
    readme: [],
    user_repo_url: [],
    repos_id: []
  }
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const github_id = "d20b59a667ed4b931be6";
  const github_secret = "4a293f41b9f53bbbec836a53fe3d0c88f78d97c6"

  // Search Users
  const searchUsers = async (text) => {
    
    let response = await fetch(`https://api.github.com/search/users?q=${text}&client_id=${github_id}&client_secret=${github_secret}`);
    let data = await response.json();
    let items = await data.items

    dispatch({
      type: SEARCH_USERS,
      payload: items // It is the actual data which we want to set or send 
    });
  };

  // Get User
    const getUser = async (username) => {
    let response = await fetch(`https://api.github.com/users/${username}?client_id=${github_id}&client_secret=${github_secret}`);
    let particulardata = await response.json();
  
    dispatch({type: GET_USERS,payload: particulardata});
  };
 
  // Get User Repos
  const getUserRepos = async (username) => {
    let response = await fetch(`https://api.github.com/users/${username}/repos?client_id=${github_id}&client_secret=${github_secret}`);
    let userRepos = await response.json();
    let top5 = 0;
    userRepos.forEach(element => {
      if(element.fork === false && top5 <=4 ){
      state.createdRepos.push(element.name);
      state.readme.push(element.description);
      state.user_repo_url.push(element.html_url);
      state.repos_id.push(element.id)
      top5 +=1
    }
    });
    // setCreatedRepos(createdRepos);
    // setReadme(readme);
    // setUser_repo_url(user_repo_url);
    dispatch({
      type: GET_USERS_REPOS,
      payload: { createdRepos: state.createdRepos, readme: state.readme, user_repo_url: state.user_repo_url, repos_id: state.repos_id }
    })
  };
  // Clear Users
  const clearUsers = () => dispatch({type: CLEAR_USERS});

  return (<GithubContext.Provider
    value={{
      users: state.users,
      particularuser: state.particularuser,
      createdRepos: state.createdRepos,
      user_repo_url: state.user_repo_url,
      readme: state.readme,
      repos_id: state.repos_id,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos
    }}
  >
    {props.children}
  </GithubContext.Provider>)
}

// https://api.github.com/users/lavlife06/repos
  // https://api.github.com/repos/lavlife06/mycalculator/contents/README.md?ref=master


export default GithubState;

