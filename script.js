let userListDiv = document.getElementById("user-list");
let buttonIsClicked = false;
let inputSearch = document.getElementById("search");
let searchIsUsed = false;

const getData = async () => {
  const url = "https://api.github.com/users";
  const responseJson = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseObj = await responseJson.json();

  renderData(responseObj);
};

getData();

const GetSearchedData = async (event) => {
  userListDiv.innerHTML = "";
  const url = "https://api.github.com/users";
  const responseJson = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseObj = await responseJson.json();
  const inputdata = event.target.value;
  let searchedData = [];

  for (const elem of responseObj) {
    if (elem.login.includes(inputdata)) {
      searchedData.push(elem);
    }
  }

  renderData(searchedData);
};

const renderData = (renderDataObj) => {
  renderDataObj.map((resData) => {
    let userContainer = document.createElement("div");
    userContainer.setAttribute("class", "user-container");

    let avatar = document.createElement("img");
    avatar.setAttribute("src", resData.avatar_url);
    avatar.setAttribute("class", avatar);

    let username = document.createElement("span");
    username.setAttribute("class", "username-span");
    username.innerText = resData.login;

    let showInfoBtn = document.createElement("button");
    showInfoBtn.innerText = "Show more";
    showInfoBtn.addEventListener("click", showInfo());

    userContainer.appendChild(avatar);
    userContainer.appendChild(username);
    userContainer.appendChild(showInfoBtn);
    userListDiv.appendChild(userContainer);

    let infoDiv = document.createElement("div");
    infoDiv.setAttribute("class", "info-div");

    let rank = document.createElement("span");
    rank.setAttribute("class", "rank-span");
    rank.innerText = `Rank : ${resData.type}`;

    let ifAdmin = document.createElement("span");
    ifAdmin.setAttribute("class", "admin-span");
    ifAdmin.innerText = `Admin : ${resData.site_admin}`;

    infoDiv.appendChild(rank);
    infoDiv.appendChild(ifAdmin);

    userContainer.appendChild(infoDiv);
  });
};

const showInfo = () => (event) => {
  buttonIsClicked = !buttonIsClicked;

  let infoDiv = event.target.parentElement.lastChild;

  if (buttonIsClicked) {
    infoDiv.classList.add("info-div-clicked");
  } else {
    infoDiv.classList.remove("info-div-clicked");
  }
};

inputSearch.addEventListener("input", GetSearchedData);
