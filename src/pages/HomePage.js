import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h3>TV- Show App</h3>
      <Link to={`/tv-shows/avengers`}>
        {" "}
        <h2>Go To Avengers Data</h2>
      </Link>
    </div>
  );
}
