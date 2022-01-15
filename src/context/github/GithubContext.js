import {createContext, useReducer, useState} from 'react'
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({children})=>{


    //  ---- These lines are use when we don't use reducer
  // const [users, setUsers] =useState([]);
  // const [loading, setLoading] = useState(true);

  const initialState= {
    users: [],
    user:{},
    repos:[],
    loading: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  

  // ---- just for testing purpose. fetching api data
    // const fetchUsers = async () => {
    //     setLoading()

    //   const response = await fetch(`${GITHUB_URL}/users`, {
    //     headers: {
    //       Authorization: `token ${GITHUB_TOKEN}`,
    //     },
    //   });

    //   const data = await response.json()
      
    //   dispatch({
    //     type: 'GET_USERS',
    //     payload: data
    //   })  
    // };


    // Search Users Function
    const searchUsers = async (text) => {
      setLoading()

      const params = new URLSearchParams({
        q:text
      })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    // const data = await response.json()
    //After destructuring data.items same as '{items}'
    const {items}= await response.json()
    console.log(items)
    // console.log(response.url)
    
    dispatch({
      type: 'GET_USERS',
      payload: items
    })  
  };

  // Clear loading users
  const clearUsers = ()=>{
    dispatch({
      type: 'CLEAR_USERS'
    })
  }


  // Search About Single User
  const getUser = async (login) => {
    setLoading()

  const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  if(response.status===404){
    window.location='/notFound'
  }else{

    const data= await response.json()

    //Testing
    //console.log(data)


    dispatch({
      type: 'GET_USER',
      payload: data
    })  

  }

 
};

// Get User Repos
const getUserRepos = async (login) => {
  setLoading()

  const params = new URLSearchParams({
    sort:'created',
    per_page:10
  })
  
const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});


const data = await response.json()


dispatch({
  type: 'GET_REPOS',
  payload: data
})  
};


  // Set Loading Function
  const setLoading = ()=>{dispatch({type:'SET_LOADING'})}

  

  
    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading ,
        user: state.user,
        repos: state.repos,
       getUser,
       getUserRepos,
        //fetchUsers,
        searchUsers,
        clearUsers
        }}>

        {children}
    </GithubContext.Provider>

}

export default GithubContext