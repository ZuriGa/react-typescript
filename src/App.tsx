import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { AppProps, Users } from './App.types';
import User from './components/User';



const App: FC<AppProps> = ({ title }) => {
  // Store users in the state to display
  const [users, setUsers] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');


  // useEffect hook making the API call
  // useEffect(() => {
  //   const getUsers = async () => {
  //     try {
  //       setIsLoading(true);
  //       const { data } = await axios.get(
  //         'https://randomuser.me/api/?results=10'
  //       );
  //       console.log(data);
  //       setUsers(data.results);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   getUsers();
  // }, []);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        'https://randomuser.me/api/?results=10'
      );
      console.log(data);
      setUsers(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (event) => {
    setUsername(event.target.value);
  };


  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Show Users</button>
      <input type='text' onChange={handleChange} />
      <div>{username}</div>
      <ul>
        {isLoading && <p>Loading...</p>}
        {users.map(({ login, name, email }) => {
          return <User key={login.uuid} name={name} email={email} />;
        })}
      </ul>
    </div>
  );
};



export default App;