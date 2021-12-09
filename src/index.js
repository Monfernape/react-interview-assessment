import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import TaskDescription from "./TaskDescription";

const SEARCH_ENDPOINT = "https://api.github.com/search/repositories?q=react";

const getReactRepositories = () =>
  axios
    .get(SEARCH_ENDPOINT)
    .then((result) => result.data.items)
    .then((repos) =>
      repos.map(({ forks, name, stargazers_count, html_url }) => ({
        forks,
        name,
        stars: stargazers_count,
        url: html_url
      }))
    );

const App = () => <RepositoryStats />;

const RepositoryStats = () => {
  const [stats, setStatus] = useState([]);

  useEffect(() => {
    getReactRepositories().then((data) => setStatus(data));
  }, []);

  return (
    <ul>
      {stats.map(({ name, stars, forks }, index) => (
        <li key={index}>
          {name} - 🌟 {stars} - 🍴 {forks}
        </li>
      ))}
    </ul>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
