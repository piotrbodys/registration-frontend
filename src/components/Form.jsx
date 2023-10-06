import axios from "axios";
import config from "../config";
import { useState } from "react";
import Select from "./Select";
import "./Form.css";

const Form = (props) => {
    const [name, setName] = useState("");
    const [event, setEvent] = useState({ key: "", val: "" });
    const [city, setCity] = useState({ key: "", val: "" });
    const [errors, setErrors] = useState([]);

    const choicesEvents = [
        ["", "- - - - - -"],
        ["front-end-react", "Front End - ReactJS"],
        ["back-end-react", "Back End - NodeJS"],
        ["full-stack-react", "Full Stack - MERN"],
        ["tester-manual", "Tester manualny"],
    ];

    const choicesCities = [
        ["", "- - - - - -"],
        ["online", "Online"],
        ["warsaw", "Warszawa"],
        ["cracow", "Kraków"],
    ];

    const saveEvent = (eventObj) => {
        axios
            .post(config.api.url + "/events/add", eventObj, { mode: "cors" })
            .then((res) => {
                props.getEvents();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const resetForm = () => {
        setName("");
        setEvent({ key: "", val: "" });
        setCity({ key: "", val: "" });
        setErrors([]);
    };

    const validateForm = (e) => {
        e.preventDefault();

        let errorsValidate = [];

        if (name.trim() === "") {
            errorsValidate.push("Wpisz imię i Nazwosko");
        }

        if (event.key.trim() === "") {
            errorsValidate.push("Wybierz Szkolenie");
        }

        if (city.key.trim() === "") {
            errorsValidate.push("Wybierz Miasto");
        }

        if (errorsValidate.length > 0) {
            setErrors(
                errorsValidate.map((errorTxt, index) => {
                    return <li key={index}>{errorTxt}</li>;
                })
            );
            return false;
        }
        const newEvent = {
            name: name,
            event: event,
            city: city,
        };

        saveEvent(newEvent);

        resetForm();
    };

    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const handleChangeEvent = (e) => {
        setEvent({
            key: e.target.value,
            val: e.target.options[e.target.selectedIndex].innerText,
        });
    };

    const handleChangeCity = (e) => {
        setCity({
            key: e.target.value,
            val: e.target.options[e.target.selectedIndex].innerText,
        });
    };
    return (
        <div className="formContainer">
            <form action="#" onSubmit={validateForm}>
                <div className="wrapper">
                    <label htmlFor="name">Imię i Nazwisko</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleChangeName}
                    />
                </div>
                <div className="wrapper">
                    <label htmlFor="event">Wydarzenie</label>
                    <Select
                        values={choicesEvents}
                        selectedValue={event.key}
                        onValueChange={handleChangeEvent}
                        id="event"
                    />
                </div>
                <div className="wrapper">
                    <label htmlFor="city">Miasto</label>
                    <Select
                        values={choicesCities}
                        selectedValue={city.key}
                        onValueChange={handleChangeCity}
                        id="city"
                    />
                </div>
                <div className="wrapper">
                    <button type="submit" className="submit">
                        Zapisz na szkolenie
                    </button>
                </div>
            </form>

            <div className="errorWrapper">
                <ul className="errors">{errors}</ul>
            </div>
        </div>
    );
};

export default Form;