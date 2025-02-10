import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

export default function IndividualGame() {
    const { id } = useParams();
    const [ game, setGame ] = useState()

    useEffect(() => {
        retrieveGame();
    }, []);

    function retrieveGame() {
    axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/games/${id}`, {
            withCredentials: true,
        })
        .then((response) => {
            setGame(response.data.game);
        });
    }


    return (
        <div>
            <div>{game ? 
                    <div>
                        <h2>Title: {game.title}</h2>
                        <h2>{game.shortDescription}</h2>
                        <h3>{game.description}</h3>
                        <h2>${game.price}</h2>
                        <h2>Release date: {game.releaseDate}</h2>
                        <h2>Status: {game.status}</h2>
                        <h2>Publisher: {game.publisher}</h2>
                        <h2>Developer: {game.developer}</h2>
                    </div>
                : <div>game not found</div>}
            </div>
        </div>
    );
}