import React, { useState, useEffect } from "react";

import './particles.css';

import raindrop from '../assets/raindrop.png';

function Raindrop({ pos }) {
    return (
        <img className="raindrop" src={ raindrop } style={{left: pos}} />
    )
}

function Snowflake({ pos }) {
    return (
        <div className="snowflake" style={{left: pos}} />
    )
}

export { Raindrop, Snowflake};