import React, { Component } from 'react';
import './App.css';

class SeriesSelector extends Component {
  render() {

    return (
      <select id="series" onChange={this.getRandomSeries}>
        <option id="random" value="random">Suprise Me!</option>
        <option value="tt0060028">The Original Series</option>
        <option value="tt0069637">The Animated Series</option>
        <option value="tt0092455">The Next Generation</option>
        <option value="tt0106145">Deep Space Nine</option>
        <option value="tt0112178">Voyager</option>
        <option value="tt0244365">Enterprise</option>
      </select>
    );
  }
}
class App extends Component {
  getRandomSeries = () => {
    const n = Math.floor(Math.random() * 6);
    let series = "";
      if (n === 0) series = "tt0060028";
      else if (n === 1) series = "tt0069637";
      else if (n === 2) series = "tt0092455";
      else if (n === 3) series = "tt0106145";
      else if (n === 4) series = "tt0112178";
      else if (n === 5) series = "tt0244365";
      document.getElementById("random").value = series;
      console.log(series);
  }
  getIMDB = async () => {
    let e = document.getElementById('series');
    let seriesId = e.options[e.selectedIndex].value;
    const imdb = require('imdb-api');
    const things = await imdb.getById(seriesId, { apiKey: 'c014b5f6' });
    const episodes = await things.episodes();
    return episodes;
  }
  createImage = (props) => {
    const oldImage = document.getElementById('pic');
    while (oldImage.hasChildNodes()) { 
      oldImage.removeChild(oldImage.lastChild); 
    } 
    let img = document.createElement("img");
    img.setAttribute('id', 'episodePicture');
    img.setAttribute('src', props);
    return img;
  }
  giveEpisode = async () => {
    //call Imdb-API
    const episodes = await this.getIMDB();
    let numberOfEpisodes = Object.keys(episodes).length;
    const n = Math.floor(Math.random() * numberOfEpisodes);
    let randomEpisode = episodes[n];
    console.log(numberOfEpisodes);
    console.log(randomEpisode);
    //query for episode image information
    const imdb = require('imdb-api');
    const things = await imdb.getById(randomEpisode.imdbid, { apiKey: 'c014b5f6' });
    const retrievedEpisode = await things;
    //add episode info to page
    const name = document.getElementById("episodeName");
    name.innerText = randomEpisode.name;
    const description = document.getElementById("episodeDescription");
    description.innerText = "Season: " + randomEpisode.season + " Episode: " + randomEpisode.episode;
    document.getElementById('pic').appendChild(this.createImage(retrievedEpisode.poster));
    console.log(retrievedEpisode);
    const rating = document.getElementById("rating");
    rating.innerText = "Rating: " + randomEpisode.rating;
    return randomEpisode;
  }
  getRandomizedEpisode = () => {
    this.getRandomSeries();
    this.giveEpisode();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Star Trek Episode Randomizer</h1>
        </header>
        <div className="body">
          <div className="seriesChoice">
            <SeriesSelector />
            <input type="button" value="Engage" onClick={this.getRandomizedEpisode} />
          </div>
          <div id="episodeInfo">
            <h2 id="episodeName"></h2>
            <div id="pic"> </div>
            <p id="episodeDescription"></p>
            <h3 id="rating"></h3>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
