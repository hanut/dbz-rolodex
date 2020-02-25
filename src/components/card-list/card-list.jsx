import React from 'react';

import './card-list.css';
import { Card } from '../card/card';


export const CardList = (props) => {
    return (
        <div className="card-list">
            {props.people.map(person => {
              return (
                <Card key={person.id} person={person}/>
              )
            })}
        </div>
    )
}