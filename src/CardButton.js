import { useEffect, useState } from "react";
import axios from "axios";

const CardButton = ({ deck_id, addCard }) => {
    const style = {
        position: "absolute",
        borderRadius: "3px",
        transform: "rotate",
    };
    const [retrieving, setRetrieving] = useState(false);
    const [currInterval, setCurrInterval] = useState(null);

    useEffect(() => {
        const getCard = async () => {
            const card = await axios
                .get(
                    `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
                )
                .then((res) => {
                    const suit = res.data.cards[0].suit;
                    const value = res.data.cards[0].value;
                    const image = res.data.cards[0].image;

                    addCard({
                        suit,
                        value,
                        image,
                        rotation: Math.random() * 30,
                    });
                })
                .catch(function (err) {
                    if (typeof err == TypeError) {
                        console.log(err);
                        setRetrieving(false);
                        clearInterval(currInterval);
                    }
                });
            return card;
        };
        clearInterval(currInterval);
        if (retrieving) {
            const startRetrieving = setInterval(getCard, 500);
            setCurrInterval(startRetrieving);
        }
    }, [retrieving]);

    const callAPI = () => {
        setRetrieving((retrieving) => !retrieving);
    };

    return (
        <button
            style={{
                marginTop: "2rem",
                borderRadius: "3px",
                backgroundColor: "grey",
                padding: ".5rem",
            }}
            onClick={callAPI}
        >
            {!retrieving ? "Start Drawing" : "Stop Drawing"}
        </button>
    );
};

export default CardButton;
