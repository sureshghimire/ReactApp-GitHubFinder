import { useContext , useEffect} from "react";
import GithubContext from "../../context/github/GithubContext";
import Spinner from '../layouts/Spinner'
import UserItem from "./UserItem";

function UserResults() {
    const {users, loading} = useContext(GithubContext)  // add fetchUser to test

    // just for testing
    // useEffect(()=>{
    //   fetchUsers()
    // },[])
 
  

  if (!loading) {
    return (
      <div className="grid gird-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <UserItem  key={user.id} user={user}/>
        ))}
      </div>
    );
  } else {
    return <Spinner/>;
  }
}

export default UserResults;
