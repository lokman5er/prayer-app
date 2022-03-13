import React, { useEffect, useState } from "react";
import "../App.css"
import { Link } from 'react-router-dom';



function Home() {


    const [countries, setCountries] = useState([]);

    const [states, setStates] = useState([]);
    const [stateId, setStateId] = useState('33');

    const [cities, setCities] = useState([]);
    const [cityId, setCityId] = useState('581');

    const [regionsId, setRegionsId] = useState('8573');


    useEffect(() => {
        getCountries();
        getStates();
        getCities();
    }, []);

    const getCountries = async () => {
        const response = await fetch(
            `https://ezanvakti.herokuapp.com/ulkeler`
        );
        const data = await response.json();
        setCountries(data);
    }

    const getStates = async () => {
        const response = await fetch(
            `https://ezanvakti.herokuapp.com/sehirler/${stateId}`
        );
        const data = await response.json();
        setStates(data);
    }

    useEffect(() => {
        getStates();
    }, [stateId]);

    const getCities = async () => {
        const response = await fetch(
            `https://ezanvakti.herokuapp.com/ilceler/${cityId}`
        );
        const data = await response.json();
        setCities(data);
    }

    useEffect(() => {
        getCities();
        console.log('asd')
    }, [cityId]);


    return (
        <div className="App">
            <h1>Prayer App</h1>
            <div style={{ height: '5vh' }} />
            <form style={{ backgroundColor: '' }}>
                <label style={{ backgroundColor: '' }}>
                    Pick Your Country
        </label>
                <div style={{ height: '10vh' }} />
                <select onChange={(event) => setStateId(event.target.value) & console.log(stateId)}
                    style={{}}>
                    {countries.map(countrie => (
                        <option key={countrie.UlkeID} value={countrie.UlkeID}>{countrie.UlkeAdiEn}</option>
                    ))};
          </select>
                <div style={{ height: '10vh' }} />

                <label style={{}}>
                    Pick Your State
        </label>
                <div style={{ height: '10vh' }} />

                <select onChange={(event) => setCityId(event.target.value) & console.log(cityId)}
                    style={{}}>
                    {states.map(state => (
                        <option key={state.SehirID} value={state.SehirID}>{state.SehirAdiEn}</option>
                    ))};
          </select>
                <div style={{ height: '10vh' }} />

                <label style={{ backgroundColor: '' }}>
                    Pick Your City
        </label>
                <div style={{ height: '10vh' }} />

                <select onChange={(event) => setRegionsId(event.target.value) & console.log(regionsId)}
                    style={{ backgroundColor: '', }}>
                    {cities.map(city => (
                        <option key={city.IlceID} value={city.IlceID}>{city.IlceAdiEn}</option>
                    ))};
          </select>
                <div style={{ height: '10vh' }} />
            </form>
            <Link
                to={`/times/${regionsId}`}
            >
                <button>Enter</button>
            </Link>
        </div>
    )
}



export default Home;
