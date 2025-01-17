import React, { useEffect,Fragment,useContext } from 'react'
import { Link } from 'react-router-dom';
import Repos from './Repos';
import GithubContext from '../../context/github/githubContext';

const Userinfo = ({ match }) => {
  
  const gitContext = useContext(GithubContext);
  const { particularuser, getUser, getUserRepos} = gitContext;
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, [])

  const {name,avatar_url,bio,login,html_url,followers,following,public_repos,blog,public_gists,location,company} = particularuser;

  return (
    <Fragment>
      <Link to="/" className="btn btn-dark" >
        Back to Search
      </Link>
      <div className='card grid-2'>
      <div className='all-center'>
        <img
          src={avatar_url}
          className='round-img'
          alt=''
          style={{ width: '150px' }}
        />
        <h1>{name}</h1>
        <p>Location: {location}</p>
      </div>
      <div>
        {bio && (
          <Fragment>
            <h3>Bio</h3>
            <p>{bio}</p>
          </Fragment>
        )}
        <a href={html_url} className='btn btn-dark my-1'>
          Visit Github Profile
        </a>
        <ul>
          <li>
            {login && (
              <Fragment>
                <strong>Username: </strong> {login}
              </Fragment>
            )}
          </li>

          <li>
            {company && (
              <Fragment>
                <strong>Company: </strong> {company}
              </Fragment>
            )}
          </li>

          <li>
            {blog && (
              <Fragment>
                <strong>Website: </strong> 
                <a href={blog} target="_blank" rel="noopener noreferrer" >{blog}</a>
              </Fragment>
            )}
          </li>
        </ul>
      </div>
    </div>
    <div className='card text-center'>
      <div className='badge badge-primary'>Followers: {followers}</div>
      <div className='badge badge-success'>Following: {following}</div>
      <div className='badge badge-dark'>Public Repos: {public_repos}</div>
      <div className='badge badge-light'>Public Gists: {public_gists}</div>
    </div>
    <Repos />
  </Fragment>
  )
}

export default Userinfo

