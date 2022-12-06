import { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout";
import "./styles/App.css";
import "./styles/reponsiveAdmin.css";
import io from "socket.io-client";

function App() {
  // const ENDPOINT = "http://localhost:5000";
  // var socket;
  // const name = "abs";
  // const [age, setAge] = useState("");
  // socket = io(ENDPOINT);
  // useEffect(() => {
  //   socket.on("newOrder", (payload) => {
  //     console.log(payload);
  //   });
  //   socket.on("hadConnect", (data) => {
  //     console.log(data);
  //   });
  // });

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   socket.emit("hasConnect", age);
  // };

  return (
    // <>
    //   <form onSubmit={handleClick}>
    //     <input onChange={(e) => setAge(e.target.value)} />
    //     <button>Click</button>
    //   </form>

    //   {age}
    // </>
    <Layout />
  );
}

export default App;
