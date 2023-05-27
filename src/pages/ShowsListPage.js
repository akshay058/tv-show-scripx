import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ShowsListPage.css";

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
    <div className="list">
      <div className="heading">
        <h1>TV Shows - {search}</h1>
      </div>
      {shows.length <= 0 ? (
        <div>
          <h1>Loading.........</h1>
        </div>
      ) : (
        shows.slice(0, 20).map((show) => (
          <div key={show.show.id} className="listview">
            <>
              <Link to={`/tv-shows/details/${show.show.id}`}>
                {" "}
                <h2>{show.show.name}</h2>
              </Link>
            </>
            <div className="leftbox1">
              {show.show.image && (
                <img
                  src={show.show.image.medium}
                  className="img1"
                  alt={show.show.name}
                />
              ) ? (
                show.show.image && (
                  <img
                    src={show.show.image.medium}
                    className="img1"
                    alt={show.show.name}
                  />
                )
              ) : (
                <p>No Image</p>
              )}
            </div>

            <div className="rightbox1">
              <p>
                <b>Language:</b> {show.show.language}
              </p>
              <p>
                <b>Genres:</b>{" "}
                {show.show.genres[0] ? show.show.genres.join(", ") : "N/A"}
              </p>
              <p>
                <b>Runtime:</b> {show.show.runtime} minutes
              </p>
              <p>
                <b> Premiered: </b>

                {new Date(show.show.premiered).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p>
                <b>Country: </b>

                {show.show.network ? show.show.network.country.name : "N/A"}
              </p>
              <p>
                <b>Rating:</b>{" "}
                {show.show.rating.average ? show.show.rating.average : "N/A"}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ShowsListPage;
