function fetchTracks() {
  const app = document.querySelector("#track-list");
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
        .map(track => `<p>Title: ${track.title}</p>`)
        .join("");

      // get rid of "preloader"
      app.innerHTML = "";

      // update html layout with a list of tracks
      app.insertAdjacentHTML("afterbegin", html);
    })
    .catch(error => console.error(error));
}

fetchTracks();
