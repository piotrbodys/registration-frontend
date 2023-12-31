import axios from "axios";
import config from "./config";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import "./App.css";
import Table from "./components/Table";

function App() {
  const [events, setEvents] = useState([]);

  

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

  const deleteEvent = (rowId) => {
    if (window.confirm("usunąć zapis na szkolenie?")) {
      axios
        .delete(config.api.url + "/events/delete/" + rowId)
        .then((res) => {
          if (res.data.deleted) {
            getEvents();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="App">
      <div className="formContener">
        <Form getEvents={getEvents} />
      </div>
      <div className="tableContainer">
        <Table events={events} deleteEvent={deleteEvent} className="table" />
      </div>
    </div>
  );
}

export default App;