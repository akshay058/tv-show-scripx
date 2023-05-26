import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ShowsListPage = () => {
  const { search } = useParams();
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${search}`
        );
        setShows(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShows();
  }, [search]);

  return (
    <div>
      <h1>TV Shows - {search}</h1>
      {shows.length <= 0 ? (
        <h1>Loading.........</h1>
      ) : (
        shows.slice(0, 20).map((show) => (
          <div key={show.show.id}>
            <Link to={`/tv-shows/details/${show.show.id}`}>
              {" "}
              <h2>{show.show.name}</h2>
            </Link>
            <p>Language: {show.show.language}</p>
            <p>Genres: {show.show.genres.join(", ")}</p>
            <p>Runtime: {show.show.runtime} minutes</p>
            <p>
              Premiered:{" "}
              {new Date(show.show.premiered).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p>Rating: {show.show.rating.average}</p>
            <p>
              Country:{" "}
              {show.show.network ? show.show.network.country.name : "N/A"}
            </p>
            {show.show.image && (
              <img src={show.show.image.medium} alt={show.show.name} />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ShowsListPage;
