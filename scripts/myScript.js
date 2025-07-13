// This function will show the page on click of the link
function showPage(pageName, element) {
  document.querySelectorAll("section").forEach((s) => {
    s.classList.remove("d-block");
    s.classList.add("d-none");
  });

  debugger;

  var page_current = document.getElementById(pageName);
  page_current.className = "d-block";

  if (pageName == "home") {
    loadHTML("home", "home-page");
  } else if (pageName == "about") {
    loadHTML("about", "about-page");
  } else if (pageName == "downloads") {
    fetchDownloads();
  } else if (pageName == "music") {
    showMusicPage(element);
  } else if (pageName == "gallery") {
    showGallery(element);
  }  else if (pageName == "video") {
    showGallery_Video(element);
  } else if (pageName == "projects") {
    //fetchProject();
  } else if (pageName == "contact") {
    loadHTML("contact", "contact-page");
  }

  return false;
}

function loadHTML(page, id) {
  fetch(`./assets/html/${page}.html`)
    .then((response) => response.text())
    .then((text) => (document.getElementById(`${id}`).innerHTML = text));
}

function fetchDownloads() {
  fetch("./assets/data/downloads.json")
    .then((response) => response.json())
    .then((data) => {
      // clear the section before adding elements
      const container_nav = document.getElementById("myTab");
      const container_tabPanel = document.getElementById("myTabContent");
      container_nav.innerHTML = "";
      container_tabPanel.innerHTML = "";

      const ul = document.getElementById("myTab");
      const tabContent = document.getElementById("myTabContent");

      const arrayProps = findArrayProperties(data);

      var ctr = 0;
      arrayProps.forEach((arr) => {
        ctr++;
        var arrayName = arr.path;
        var arrayValue = arr.value;

        //------------------
        // SET NAV MENU BAR
        //------------------

        var li = document.createElement("li");
        li.className = "nav-item";
        li.setAttribute("role", "presentation");

        var btn = document.createElement("button");
        btn.innerHTML = toProperCase(arrayName);
        btn.className = "nav-link";
        btn.setAttribute("id", `${arrayName}-tab`);
        btn.setAttribute("data-bs-toggle", "tab");
        btn.setAttribute("data-bs-target", `#${arrayName}-1`);
        btn.setAttribute("aria-controls", `#${arrayName}-1`);
        btn.setAttribute("type", "button");
        btn.setAttribute("role", "tab");
        btn.setAttribute("aria-selected", "true");
        if (ctr == 1) {
          btn.classList.add("active");
        }

        li.appendChild(btn);

        //-----------------------------
        // SET TAB CONTENT FOR THE MENU
        //--------------------------------
        const div = document.createElement("div");

        div.classList.add("tab-pane", "fade");

        div.setAttribute("id", `${arrayName}-1`);
        div.setAttribute("role", "tabpanel");
        div.setAttribute("aria-labelledby", `#${arrayName}-tab`);
        if (ctr == 1) {
          div.classList.add("fade", "show", "active");
        }

        const div_ul = document.createElement("ul");
        div_ul.setAttribute("id", `${arrayName}-ul`);
        div_ul.className = "inner_ul";

        div.appendChild(div_ul);

        tabContent.appendChild(div);
        ul.appendChild(li);

        var tabUl = document.getElementById(`${arrayName}-ul`);

        arrayValue.forEach((v) => {
          const arrayProps1 = findArrayProperties(v);
          var li_conent = populateContent(arrayProps1);
          tabUl.appendChild(li_conent);
        });
      });
    })
    .catch((error) => {
      document.getElementById("page-title").innerHTML =
        "Error loading projects.";
      console.error("Error:", error);
    });
}

function showMusicPage(the_element) {
  let music_section = the_element.getAttribute("data-tag");
  readJsonGetSection("music", music_section).then((sectionData) => {
    populateMusicSection(sectionData);
  });

  var subTitle = document.getElementById("music-sub-title-2");
  subTitle.innerHTML = the_element.innerHTML;
}

function showGallery(element) {
  console.log(element);

  fetch("./assets/data/gallery-photo.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("gallery-container");
      container.innerHTML = ""; // clear 'Loading...'

      data.forEach((group) => {
        const title = document.createElement("h4");
        title.textContent = toProperCase(group.category).replace(/-/g, " ");
        title.className = "sub-title-2";
        container.appendChild(title);

        const gallery = document.createElement("div");
        gallery.className = "gallery";

        group.images.forEach((img) => {
          const item = document.createElement("div");
          item.className = "gallery-item";

          const imageEl = document.createElement("img");
          imageEl.classList.add("img", "img-fluid", "img-slide", "kt-photo");
          imageEl.src = img.url.replace(/\\/g, "/"); // convert backslashes to slashes
          imageEl.alt = img.name;

          imageEl.onerror = () => {
            imageEl.style.display = "none";
            item.innerHTML += `<div style="color:red">Image not found</div>`;
          };

          //
          imageEl.setAttribute("onclick", "showImage(this)");
          imageEl.setAttribute("data-bs-toggle", "modal");
          imageEl.setAttribute("data-bs-target", "#exampleModal");

          const caption = document.createElement("div");
          caption.className = "caption";
          caption.textContent = toProperCase(img.name).replace("-", " ");

          item.appendChild(imageEl);
          item.appendChild(caption);
          gallery.appendChild(item);
        });

        container.appendChild(gallery);
      });
    })
    .catch((err) => {
      document.getElementById("gallery-container").innerText =
        "Failed to load images.json";
      console.error(err);
    });
}

function showGallery_Video(element) {
  console.log(element);

  fetch("./assets/data/gallery-video.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("gallery-container-video");
      container.innerHTML = ""; // clear 'Loading...'
debugger;
      data.forEach((group) => {
        const title = document.createElement("h4");
        title.textContent = toProperCase(group.category).replace(/-/g, " ");
        title.className = "sub-title-2";
        container.appendChild(title);

        const gallery = document.createElement("div");
        gallery.className = "gallery-video";

        group.images.forEach((vdo) => {
          const item = document.createElement("div");
          item.className = "gallery-item-video";

          const iframeEl = document.createElement("iframe");
          // iframeEl.classList.add("kt-video");
          iframeEl.src = vdo.url.replace(/\\/g, "/");

          iframeEl.onerror = () => {
            iframeEl.style.display = "none";
            item.innerHTML += `<div style="color:red">Image not found</div>`;
          };
          debugger;
          iframeEl.setAttribute("frameborder", "0");
          iframeEl.setAttribute("width", "560");
          iframeEl.setAttribute("height", "315");
          iframeEl.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
          iframeEl.setAttribute("allowfullscreen","");          
          /*
          const imageEl = document.createElement("img");
          imageEl.classList.add("img", "img-fluid", "img-slide", "kt-photo");
          imageEl.src = img.url.replace(/\\/g, "/");
          imageEl.alt = img.name;

          imageEl.onerror = () => {
            imageEl.style.display = "none";
            item.innerHTML += `<div style="color:red">Image not found</div>`;
          };

          imageEl.setAttribute("onclick", "showImage(this)");
          imageEl.setAttribute("data-bs-toggle", "modal");
          imageEl.setAttribute("data-bs-target", "#exampleModal");
          */
          const caption = document.createElement("div");
          caption.className = "caption";
          caption.innerHTML = vdo.name; //toProperCase(vdo.name).replace("-", " ");

          item.appendChild(iframeEl);
          item.appendChild(caption);
          gallery.appendChild(item);
        });

        container.appendChild(gallery);
      });
    })
    .catch((err) => {
      document.getElementById("gallery-container").innerText =
        "Failed to load images.json";
      console.error(err);
    });
}

function populateContent(arr) {
  const inner_ul = document.createElement("ul");

  arr.forEach((obj) => {
    var category_name = obj.path;
    var category_arr = obj.value;

    const inner_li = document.createElement("li");
    inner_li.className = "category-li";
    inner_li.innerHTML = `<i class='bi-play-fill'></i>${toProperCase(
      category_name
    )}`;
    inner_ul.appendChild(inner_li);

    category_arr.forEach((v) => {
      const inner_li_2 = document.createElement("li");
      inner_li_2.innerHTML = `<a href='${v.link}' target='_blank'>${v.name}</a><div class='author-name'>${v.author}</div>`;
      inner_ul.appendChild(inner_li_2);
    });
  });
  return inner_ul;
}

function findAllArrays(obj) {
  let arrays = [];

  function recurse(current) {
    if (Array.isArray(current)) {
      arrays.push(current);
    } else if (typeof current === "object" && current !== null) {
      for (let key in current) {
        recurse(current[key]);
      }
    }
  }

  recurse(obj);
  return arrays;
}

function findArrayProperties(obj, parentPath = "") {
  let result = [];

  function recurse(current, path) {
    if (Array.isArray(current)) {
      result.push({ path, value: current });
    } else if (typeof current === "object" && current !== null) {
      for (let key in current) {
        let newPath = path ? `${path}.${key}` : key;
        recurse(current[key], newPath);
      }
    }
  }

  recurse(obj, parentPath);
  return result;
}

function toProperCase(str) {
  return str.toLowerCase().replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

function populateMusicSection(data) {
  const arrayProps = findArrayProperties(data[0]);
  // clear the section before adding elements
  const container_nav = document.getElementById("myTab_music");
  const container_tabPanel = document.getElementById("myTabContent_music");
  container_nav.innerHTML = "";
  container_tabPanel.innerHTML = "";

  const ul = document.getElementById("myTab_music");
  const tabContent = document.getElementById("myTabContent_music");

  var ctr = 0;
  arrayProps.forEach((arr) => {
    ctr++;
    var arrayName = arr.path;
    var arrayValue = arr.value;
    //console.log(arrayName);
    //console.log(arrayValue);
    //------------------
    // SET NAV MENU BAR
    //------------------

    var li = document.createElement("li");
    li.className = "nav-item";
    li.setAttribute("role", "presentation");

    var btn = document.createElement("button");
    btn.innerHTML = toProperCase(arrayName);
    btn.className = "nav-link";
    btn.setAttribute("id", `${arrayName}-tab`);
    btn.setAttribute("data-bs-toggle", "tab");
    btn.setAttribute("data-bs-target", `#${arrayName}-1`);
    btn.setAttribute("aria-controls", `#${arrayName}-1`);
    btn.setAttribute("type", "button");
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", "true");
    btn.setAttribute("onclick", "setTitle(this);");
    if (ctr == 1) {
      btn.classList.add("active");
    }

    li.appendChild(btn);

    //-----------------------------
    // SET TAB CONTENT FOR THE MENU
    //--------------------------------
    const div = document.createElement("div");

    div.classList.add("tab-pane", "fade");

    div.setAttribute("id", `${arrayName}-1`);
    div.setAttribute("role", "tabpanel");
    div.setAttribute("aria-labelledby", `#${arrayName}-tab`);
    if (ctr == 1) {
      div.classList.add("fade", "show", "active");
    }

    const div_ul = document.createElement("div");
    div_ul.setAttribute("id", `${arrayName}-div`);
    //div_ul.className = "inner_ul";

    div.appendChild(div_ul);

    tabContent.appendChild(div);
    ul.appendChild(li);

    var tabDiv = document.getElementById(`${arrayName}-div`);

    arrayValue.forEach((v) => {
      const arrayProps1 = findArrayProperties(v);
      var li_conent = traverseJsonGetMusicElement(v);
      tabDiv.appendChild(li_conent);
    });
  });
}

function readJsonGetSection(file, section) {
  return fetch(`./assets/data/${file}.json`)
    .then((response) => response.json())
    .then((data) => data[section])
    .catch((error) => {
      document.getElementById("page-title").innerHTML =
        "Error loading projects.";
      console.error("Error:", error);
    });
}

// This function will travese the object and return an ul element
function traverseJsonGetMusicElement(obj, indent = "") {
  const ul = document.createElement("ul");

  for (const key in obj) {
    // Get the object
    const value = obj[key];

    if (Array.isArray(value)) {
      // Read the array inside the object
      if (value != "") {
        const li2 = document.createElement("li");
        li2.className = "form-label-links";
        //li2.innerHTML = toProperCase(key) + ":- " + getInnerArrayValue(value);
        li2.innerHTML = getInnerArrayValue(value);
        ul.appendChild(li2);
      }
    } else if (typeof value === "object" && value !== null) {
      //console.log(`${indent}${key}: {Object}`);
      traverseJsonGetMusicElement(value, indent + "  ");
    } else {
      const li = document.createElement("li");
      if (key == "title") {
        li.className = "form-label-title";
        li.innerHTML = value;
        ul.appendChild(li);
      } else if (key == "images") {
        debugger;
        if (value == "") continue;
        li.className = "form-label-image";
        li.innerHTML = `<img src=${value} class='img img-fluid music-photo'>`;
        ul.appendChild(li);
      } else {
        li.className = "form-label";
        li.innerHTML = toProperCase(key);
        ul.appendChild(li);

        const li1 = document.createElement("li");
        li1.className = "form-value";
        li1.innerHTML = value;
        ul.appendChild(li1);
      }
    }
  }
  return ul;
}

function getInnerArrayValue(arr) {
  var htmlStr = "";
  arr.forEach((a) => {
    htmlStr =
      htmlStr +
      `<a class='inner-link' href='${a.url}' target='_blank'>${a.name}</a>`;
  });
  //htmlStr = "<ul>" + htmlStr + "</ul>"
  return htmlStr;
}



function setTitle(el) {
  const h2 = document.getElementById("music-sub-title-2");
  h2.innerHTML = `Songs based on Raaga : <span class='kt-highlight'>${el.innerText}</span>`;
}

function showImage(el) {
  //debugger;
  const img = document.getElementById("modalImage");
  img.setAttribute("src", el.src);
  img.classList.add("img", "img-fluid", "img-responsive", "modal-popup-image");

  const element = document.getElementById("modalLabel");
  element.innerHTML = el.alt;
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

function getTech(technologies) {
  var returnText = "";
  technologies.forEach((technology) => {
    returnText = returnText + technology + ", ";
  });

  return returnText.substring(0, returnText.length - 2);
}
