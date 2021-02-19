import './App.css';
import React from 'react';
import Card from "./Card";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function CardsTable(props) {

    const {cards,openCards} = props;

    return (
        <div className="styleTable">
            {cards.map( el => <Card key={el.id} oneCard={el} openCards={openCards}/> )}
        </div>
    );
}

export default CardsTable;
