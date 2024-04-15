import InfiniteScroll from "./Slide";
import { useState, useEffect } from "react";
import axios from "axios";

const Test = () => {

  const [pogs, setPogs] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/pogs/api');
      setPogs(response.data);
    } catch (error) {
      console.error('Error fetching pogs:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>Hello World</h1>
      <InfiniteScroll pogs={pogs} />
    </div>
  )
}

export default Test