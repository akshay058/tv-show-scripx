import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ShowDetailsPage.css";

const ShowDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState([]);

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
  }, [id, navigate, show]);

  return (
    <div className="details">
      {show.length <= 0 ? (
        <div>
          <h1>Loading.........</h1>
        </div>
      ) : (
        <div className="data">
          <div>
            {" "}
            <h1>{show.name}</h1>
          </div>
          <div className="detailsview">
            <div className="leftbox">
              <div>
                {" "}
                {show.image && <img src={show.image.medium} alt={show.name} />}
              </div>
              <div style={{ marginLeft: 20, textAlign: "justify" }}>
                {" "}
                <p style={{ marginLeft: 20, marginRight: 20 }}>
                  {show.summary.slice(3, show.summary.length - 4)}
                </p>
              </div>
            </div>
            <div className="rightbox">
              <h2 style={{ marginBottom: 30, marginTop: 0 }}>Show Info</h2>
              <p>
                <b>Network:</b> {show.network ? show.network.name : "N/A"}
              </p>
              <p>
                <b>Schedule:</b> {show.schedule.days.join(",")}
              </p>
              <p>
                <b>Status:</b> {show.status}
              </p>

              <p>
                <b>Show Type:</b> {show.type}
              </p>
              <p>
                <b>Genres:</b> {show.genres[0] ? show.genres.join(", ") : "N/A"}
              </p>

              <p>
                <b>Language:</b> {show.language}
              </p>
              <p>
                <b>Runtime</b> {show.runtime} minutes
              </p>
              <p>
                Premiered:{" "}
                {new Date(show.premiered).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p>
                <b>Country:</b>{" "}
                {show.network ? show.network.country.name : "N/A"}
              </p>
              <p>
                <b>Rating:</b>{" "}
                {show.rating.average ? show.rating.average : "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowDetailsPage;
