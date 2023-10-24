import { useEffect, useState } from "react";
import axios from "axios";
import "./Card.css";

const Card = ({ image, rotation }) => {
    const style = {
        position: "absolute",
        borderRadius: "3px",
        transform: `rotate(${rotation}deg)`,
    };

    console.log(image, rotation);
    return (
        <>
            <img class="card-style" src={image} style={style} />
        </>
    );
};

export default Card;
