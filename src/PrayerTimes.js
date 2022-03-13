import React, { useState, createContext, useEffect } from 'react';

export const PrayerContext = createContext();

export const PrayerProvider = (props) => {
    const [prayerTimes1, setPrayerTimes1] = useState([])

    const getPrayerTimes = async () => {
        const response = await fetch(
            `https://ezanvakti.herokuapp.com/vakitler/11023`
        );
        const data = await response.json();
        setPrayerTimes1(data);
    }




    return (
        <PrayerContext.Provider value={[prayerTimes1, setPrayerTimes1]}>
            {props.children}
        </PrayerContext.Provider>
    )
}