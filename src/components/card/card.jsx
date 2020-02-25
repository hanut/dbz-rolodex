import React from 'react';

import './card.css';

export const Card = ({ person }) => {
    return (
        <div 
        className={
            "card-container " 
            + ((person.pl === 'God Level') ||
            (person.pl.includes("???"))  
            ? "god" : "")
            }>
            <img src={'/avatars/' + person.avatar} alt={person.name} />
            <h3>{person.name}</h3>
            <p>{person.pl}</p>
        </div>
    )
}