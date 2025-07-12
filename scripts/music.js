
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