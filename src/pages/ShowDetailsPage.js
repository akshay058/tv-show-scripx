import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ShowDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`); //api.tvmaze.com/search/shows?q=avengers
        setShow(response.data);
        console.log(show);
      } catch (error) {
        console.error(error);
        navigate("/"); // Redirect to home page if an error occurs
      }
    };

    fetchShow();
  }, [id, navigate]);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {show === ""}
      <h1>{show.name}</h1>
      <p>Language: {show.language}</p>
      {/* <p>Genres: {show.genres.join(", ")}</p> */}
      <p>Runtime: {show.runtime} minutes</p>
      <p>
        Premiered:{" "}
        {new Date(show.premiered).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      {/* <p>Rating: {show.rating.average}</p> */}
      <p>Country: {show.network ? show.network.country.name : "N/A"}</p>
      {show.image && <img src={show.image.medium} alt={show.name} />}
    </div>
  );
};

export default ShowDetailsPage;
