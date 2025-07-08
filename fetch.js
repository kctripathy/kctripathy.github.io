function fetchDownloads() {
  fetch("./assets/data/downloads.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("download-list");
      container.innerHTML = "";

      //   ayurveda
      const div = document.createElement("div");
      div.className = "col-lg-12 m-0 mb-2 bg-light";
      div.innerHTML = "AYURVEDA";
      container.appendChild(div);

      data.ayurveda.forEach((download) => {
        const div = document.createElement("div");
        div.className = "col-lg-6 m-0 mb-2";
        div.innerHTML = `<a href='${download.link}' class='download-link' target='_blank'>${download.name}</a>
                        <div class='small-text text-secondary'>${download.author}</div>
                        `;
        container.appendChild(div);
      });

      //   ayurveda
      let div2 = document.createElement("div");
      div2.className = "col-lg-12 m-0 mb-2 bg-light";
      div2.innerHTML = "BOOKS";
      container.appendChild(div2);

      data.books.forEach((download) => {
        const div = document.createElement("div");
        div.className = "col-lg-6 m-0 mb-2";
        div.innerHTML = `<a href='${download.link}' class='download-link' target='_blank'>${download.name}</a>
                        <div class='small-text text-secondary'>${download.author}</div>
                        `;
        container.appendChild(div);
      });

       //   music
      div2 = document.createElement("div");
      div2.className = "col-lg-12 m-0 mb-2 bg-light";
      div2.innerHTML = "MUSIC";
      container.appendChild(div2);

      data.music.forEach((download) => {
        const div = document.createElement("div");
        div.className = "col-lg-6 m-0 mb-2";
        div.innerHTML = `<a href='${download.link}' class='download-link' target='_blank'>${download.name}</a>
                        <div class='small-text text-secondary'>${download.author}</div>
                        `;
        container.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

    

}