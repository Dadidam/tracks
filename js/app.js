const dataAtribute = "data-tracks";

function getSavedTracks() {
  const cards = document.querySelector("#cards");

  if (cards.hasAttribute(dataAtribute)) {
    return JSON.parse(cards.getAttribute(dataAtribute));
  }

  console.warn("No saved tracks found.");

  return [];
}

function sortByArtist() {
  const tracks = getSavedTracks();

  // apply sorting rule by `artist field`
  tracks.sort((x, y) => {
    const artistX = x.artist.toUpperCase();
    const artistY = y.artist.toUpperCase();

    if (artistX < artistY) return -1;
    if (artistX > artistY) return 1;

    return 0;
  });

  // now just re-render the list by passing sorted list to the renderer helper
  renderTrackList(tracks);
}

function sortByPlayCount() {
  const tracks = getSavedTracks();

  tracks.sort((x, y) => Number(y.playCount) - Number(x.playCount));

  renderTrackList(tracks);
}

function sortRandomly() {
  const tracks = getSavedTracks();

  tracks.sort(() => Math.random() - 0.5);

  renderTrackList(tracks);
}

function showAlert(message = "Test") {
  alert(message);
}

// Returns html layout for genre labels
function generateGenres(genresList) {
  if (genresList && genresList.length) {
    const elementList = genresList
      .map(genre => {
        return `<li class='${genre}'>${genre}</li>`;
      })
      .join("");

    return `<ul>${elementList}</ul>`;
  }

  return "";
}

// Helper method to generate image name from artist name
function getImageByArtistName(artistName) {
  return artistName.replace(/\s+/g, "-").toLowerCase();
}

// Returns html chunk for main card template
function renderTrack(track) {
  const { artist, title, genre } = track;
  const imageTitle = getImageByArtistName(artist);
  const genresList = generateGenres(genre);
  const imgAlt = `${artist} — ${title}`;

  return `<div class="card">
  <img src="images/artists/${imageTitle}.jpg" alt="${imgAlt}" />
  <div class="card__info">
    <div class="card__info--artist">
      <h3>${artist}</h3>
    </div>
    <div class="card__info--title">${title}</div>
    <div class="card__info--genre">
      ${genresList}
    </div>
  </div>
</div>`;
}

function renderTrackList(tracks) {
  const cards = document.querySelector("#cards");
  const html = tracks.map(track => renderTrack(track)).join("");

  // get rid of "preloader"
  cards.innerHTML = "";

  // update html layout with a list of tracks
  cards.insertAdjacentHTML("afterbegin", html);

  // save data as data attribute
  cards.setAttribute(dataAtribute, JSON.stringify(tracks));

  console.log("Tracks:", JSON.parse(cards.getAttribute(dataAtribute)));
}

function fetchTracks() {
  fetch("tracks/top.json")
    .then(res => {
      if (!res.ok) {
        throw Error("Fetching data error");
      }

      return res.json();
    })
    .then(data => {
      renderTrackList(data.tracks);
    })
    .catch(error => console.error(error));
}

fetchTracks();
