import { useEffect, useState } from "react";
import axios from "axios";

const CardButton = ({ deck_id, addCard }) => {
    console.log("CardButton called!");
    const style = {
        position: "absolute",
        borderRadius: "3px",
        transform: "rotate",
    };
    const [retrieving, setRetrieving] = useState(false);

    useEffect(() => {
        const getCard = async () => {
            console.log("getCard called!");
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

                    setRetrieving(false);
                });
            return card;
        };
        if (retrieving) {
            getCard();
        }
    }, [retrieving]);

    const callAPI = () => {
        console.log("callAPI called!");
        setRetrieving(true);
    };

    return <button onClick={callAPI}> Draw a card </button>;
};

export default CardButton;
