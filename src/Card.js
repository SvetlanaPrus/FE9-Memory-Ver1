import './App.css';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Card(props) {

    const {oneCard,openCards} = props;

    return (
        <button className="styleCard" onClick={() => openCards(oneCard.id)}>
            {oneCard.open && oneCard.image}
        </button>
    );
}

export default Card;
