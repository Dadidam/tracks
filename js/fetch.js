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

  return `<div class="card">
  <img src="images/artists/${imageTitle}.jpg" alt="" />
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

function fetchTracks() {
  const app = document.querySelector("#cards");
  app.innerHTML = "Loading...";

  fetch("tracks/top.json")
    .then(res => {
      if (!res.ok) {
        throw Error("Fetching data error");
      }

      return res.json();
    })
    .then(data => {
      const html = data.tracks
        // .map(track => `<p>Title: ${track.title}</p>`)
        .map(track => renderTrack(track))
        .join("");

      // get rid of "preloader"
      app.innerHTML = "";

      // update html layout with a list of tracks
      app.insertAdjacentHTML("afterbegin", html);
    })
    .catch(error => console.error(error));
}

fetchTracks();
