function sayHello() {
  alert("Hello");
}

// This function will show the page on click of the link
function showPage(pageName) {
  var btns = $("#navbarNav .navbar-nav .nav-link");

  for (var i = 0; i < btns.length; i++) {
    var section_name = btns[i].innerText.toLowerCase();
    var page_section = document.getElementById(section_name);

    // add active css to the link
    if (btns[i].innerText.toLowerCase() == pageName) {
      btns[i].classList.add("active-menu");
    } else {
      btns[i].classList.remove("active-menu");
    }

    // hide all the sections in the index page
    page_section.className = "d-none";
  }

  // get the current section by page name and show it
  var page_current = document.getElementById(pageName);
  page_current.className = "d-block";

  if (pageName == "home") {
    loadHTML("home", "home-page");
  } else if (pageName == "about") {
    loadHTML("about", "about-page");
  } else if (pageName == "downloads") {
    fetchDownloads();
  } else if (pageName == "projects") {
    fetchProject();
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
          var li_conent = populateContent(arrayProps1)
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

function populateContent(arr)
{
  const inner_ul = document.createElement("ul");

  arr.forEach((obj)=> {

    var category_name = obj.path;
    var category_arr = obj.value;

    const inner_li = document.createElement("li");
    inner_li.className = "category-li";
    inner_li.innerHTML = `<i class='bi-play-fill'></i>${toProperCase(category_name)}`;
    inner_ul.appendChild(inner_li);

    category_arr.forEach((v)=> {

      const inner_li_2 = document.createElement("li");
      inner_li_2.innerHTML = `<a href='${v.link}' target='_blank'>${v.name}</a><div class='author-name'>${v.author}</div>`;
      inner_ul.appendChild(inner_li_2);
    })
  })
  return inner_ul;
}

function fetchDownloads_original() {
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

        // arrayValue.forEach((v)=>{
        //   const inner_li = document.createElement("li");
        //   li.innerHTML = v.name;
        //   div_ul.appendChild(inner_li);
        //   console.log(`${v.name} ${v.author}`);
        // });

        div.appendChild(div_ul);

        tabContent.appendChild(div);
        ul.appendChild(li);

        var tabUl = document.getElementById(`${arrayName}-ul`);

        arrayValue.forEach((v) => {
          const inner_li = document.createElement("li");
          // const inner_link = document.createElement("a");
          // inner_link.setAttribute("href",v.link);
          // inner_link.setAttribute("target","_blank");
          // inner_link.innerHTML = `${v.name}<br/>${v.author}`;
          inner_li.innerHTML = `<a href='${v.link}' target='_blank'>${v.name}</a><div class='author-name'>${v.author}</div>`;
          //inner_li.appendChild(inner_link);

          tabUl.appendChild(inner_li);
          //li.innerHTML = v.name;
          //div_ul.appendChild(inner_li);
          //console.log(`${v.name} ${v.author}`);
        });
      });
    })
    .catch((error) => {
      document.getElementById("page-title").innerHTML =
        "Error loading projects.";
      console.error("Error:", error);
    });
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

//https://api.tsdcollege.in/api/College/Staffs
function loadData(page, id) {
  fetch("https://api.tsdcollege.in/api/College/Staffs")
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function toProperCase(str) {
  return str.toLowerCase().replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}
