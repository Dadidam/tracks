function showAlert(message = 'Test') {
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
  cards.setAttribute("data-tracks", JSON.stringify(tracks));

  console.log("Tracks:", JSON.parse(cards.getAttribute("data-tracks")));
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
