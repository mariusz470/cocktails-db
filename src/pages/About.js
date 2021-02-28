import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const About = () => {
  return (
    <section className="section about-section">
      <h1>About Cocktails Database</h1>
      <p>
        In the main page you can type to search your favourite cocktail name.{" "}
        <br />
        Click cocktail image or details button to see details of your cocktail.
      </p>

      <p>This project was inspired by John Smilga's Youtube tutorial.</p>
      <p>
        I added my own styling and some features. It uses thecocktaildb.com API.
      </p>
      <p>Saving favourite cocktails of the user will be added soon.</p>
      <Link to="/" className="btn btn-primary btn-home">
        <ArrowBackIcon />
      </Link>
    </section>
  );
};

export default About;
