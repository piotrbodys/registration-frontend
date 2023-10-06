import axios from "axios";
import config from "./config";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = () => {
    axios
      .get(config.api.url + "/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };



  return (
    <div className="App">
      <div className="formContener">
        <Form getEvents={getEvents} />
      </div>
    </div>
  );
}

export default App;