function sayHello() {
  alert("Hello");
}

function showPage(pageName) {
  var btns = $("#navbarNav .navbar-nav .nav-link");

  for (var i = 0; i < btns.length; i++) {
    console.log(btns[i].innerText.toLowerCase());
    var section_name = btns[i].innerText.toLowerCase();
    var page_section = document.getElementById(section_name);

    if (btns[i].innerText.toLowerCase() == pageName) {
      btns[i].classList.add("active-menu");
    } else {
      btns[i].classList.remove("active-menu");
    }

    page_section.className = "d-none";
  }

  var page_current = document.getElementById(pageName);
  page_current.className = "d-block";

  if (pageName == "home") {
    loadHTML('home', 'home-page');
  } 
  else if (pageName == "about") {
    loadHTML('about', 'about-page');
  } 
  else if (pageName == "downloads") {
    fetchDownloads();
  } 
  else if (pageName == "projects") {
    fetchProject();
  }

  return false;
}

function loadHTML(page, id) {
  fetch(`./assets/html/${page}.html`)
      .then(response => response.text())
      .then(text => document.getElementById(`${id}`).innerHTML = text);
}


function fetchProject() {
  fetch("./assets/data/projects.json")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("page-title").innerHTML = data.title;

      const container = document.getElementById("project-list");
      container.innerHTML = "";
      // data.projects.forEach(project => {
      //   const div = document.createElement('div');
      //   div.classList.add('row','project');
      //   div.innerHTML = `<h3>${project.name}</h3><p>${project.description}</p>`;
      //   container.appendChild(div);
      // });

      var ctr = 0;
      data.projects.forEach((project) => {
        ctr++;
        const div = document.createElement("div");
        div.classList.add("row", "project");
        div.innerHTML = `<div class='col-12 m-1'> 
                                <div class='row'>
                                    <div class='col-lg-9'>#${ctr}: <span class='project-title'>${
          project.name
        }</span></div>
                                    
                                    <div class='col-lg-3 text-secondary'>${
                                      project.duration
                                    }</div>
                                </div>
                            </div>
                            <div class='col-12 m-1'>${project.description}</div>
                            <div class='col-12 m-1'><span class='project-sub-title'>Project for Company: </span>${
                              project.company
                            }</div>
                            <div class='col-12 m-1'><span class='project-sub-title'>Technologies Used: </span> 
                                ${getTech(project.technologies)}
                            </div>
                            <div class='col-12 m-2'><span class='project-sub-title'>My Role: </span> 
                                ${project.role}
                            </div>
                            `;

        //   div.innerHTML = `<h3>${project.name}</h3><p>${project.description}</p>`;
        container.appendChild(div);
      });
    })
    .catch((error) => {
      document.getElementById("page-title").innerHTML =
        "Error loading projects.";
      console.error("Error:", error);
    });
}

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

function getTech(technologies) {
  var returnText = "";
  technologies.forEach((technology) => {
    returnText = returnText + technology + ", ";
  });

  return returnText.substring(0, returnText.length - 2);
}
