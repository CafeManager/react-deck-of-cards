import { useEffect, useState } from "react";
import Card from "./Card";
import CardButton from "./CardButton";
import axios from "axios";
import "./";

const Deck = () => {
    const [deckID, setDeckID] = useState(null);
    const [drawnCards, setDrawnCards] = useState([]);

    useEffect(() => {
        async function getDeckID() {
            const deck = await axios
                .get(
                    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
                )
                .then((res) => res.data.deck_id);
            setDeckID(deck);
        }
        getDeckID();
    }, []);

    function addCard(newCard) {
        setDrawnCards([...drawnCards, newCard]);
    }

    return (
        <>
            {console.log(drawnCards)}
            {deckID ? (
                <CardButton deck_id={deckID} addCard={addCard}></CardButton>
            ) : null}
            <div className="card-container">
                {drawnCards ? (
                    drawnCards.map((card) => (
                        <Card
                            image={card.image}
                            rotation={card.rotation}
                        ></Card>
                    ))
                ) : (
                    <h1> loading... </h1>
                )}
            </div>
        </>
    );
};

export default Deck;
