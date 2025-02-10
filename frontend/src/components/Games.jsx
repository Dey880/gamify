import { useEffect, useState } from "react";
import axios from "axios";
import "../css/components/gameCard.css"

export default function Games() {
    const [games, setGames] = useState();

    useEffect(() => {
        GetAllGames();
    }, []);

    function GetAllGames() {
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/games`, {
            withCredentials: true,
        })
        .then((response) => {
            setGames(response.data.games);
        });
    }

    function handleClick(id) {
        window.location.href=`/game/${id}`
    }

    return (
        <div>
            <h1>Games</h1>
            <div className="games">
                {games ? (
                    games.map((game) => {
                        return (
                            <div key={game._id} className="gameCard" onClick={() => {handleClick(game._id)}}>
                                <h2>Title: {game.title}</h2>
                                <h2>{game.shortDescription}</h2>
                                <h3>{game.description}</h3>
                                <h2>${game.price}</h2>
                                <h2>Release date: {game.releaseDate}</h2>
                                <h2>Status: {game.status}</h2>
                                <h2>Publisher: {game.publisher}</h2>
                                <h2>Developer: {game.developer}</h2>
                            </div>
                        );
                    })
                ) : (
                    <div>no gaymes :(</div>
                    )
                }
            </div>
        </div>
    );
}
