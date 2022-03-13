import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Times from '../pages/times';
import Home from './../pages/home';


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />

                <Route path="/times/:id" element={<Times />} />

            </Routes>
        </BrowserRouter>
    );
}