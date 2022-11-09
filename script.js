let userListDiv = document.getElementById("user-list")
let buttonIsClicked = false
let inputSearch = document.getElementById("search")
console.log(inputSearch)

// window.onload = (event) => {
//   console.log('page is fully loaded');
// };


const getData = async () => {
  const url = "https://api.github.com/users";
  const responseJson = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseObj = await responseJson.json();
  
  renderData(responseObj)
};

getData();



const renderData = (responseObj) => {

  responseObj.map((resData) => {

    let userContainer = document.createElement('div')
    userContainer.setAttribute("class", "user-container")

    let avatar = document.createElement('img')
    avatar.setAttribute('src', resData.avatar_url)
    avatar.setAttribute('class', avatar)

    let username = document.createElement('span')
    username.setAttribute('class', "username-span")
    username.innerText = resData.login

    let showInfoBtn = document.createElement('button')
    showInfoBtn.innerText = "Show more"
    showInfoBtn.addEventListener('click',showInfo())

    userContainer.appendChild(avatar)
    userContainer.appendChild(username)
    userContainer.appendChild(showInfoBtn)
    userListDiv.appendChild(userContainer)

    let infoDiv = document.createElement('div'); 
    infoDiv.setAttribute("class", "info-div")

    let rank = document.createElement('span')
    rank.setAttribute("class", 'rank-span')
    rank.innerText= `Rank : ${resData.type}`

    let ifAdmin = document.createElement("span")
    ifAdmin.setAttribute("class", 'admin-span')
    ifAdmin.innerText= `Admin : ${resData.site_admin}`

    infoDiv.appendChild(rank)
    infoDiv.appendChild(ifAdmin)

    userContainer.appendChild(infoDiv)

  })


}

const showInfo = () => (event) => {
  console.log(buttonIsClicked)
  buttonIsClicked =  !buttonIsClicked
  console.log(buttonIsClicked)
  console.log("click")

  let infoDiv = event.target.parentElement.lastChild

  if(buttonIsClicked){
    infoDiv.classList.add("info-div-clicked")
  
  }else{
    infoDiv.classList.remove("info-div-clicked")
  }
 
  
}

const searchUser = (event) => {
const inputdata = event.target.value

console.log(inputdata)

let userContainer = document.getElementsByClassName( "user-container")
let usernameSpan = document.getElementsByClassName("username-span")

console.log(userContainer)

for( const elem of usernameSpan){

 console.log(elem)

//  let text = elem.inn

 if( elem.innerText.includes(inputdata)){
  
  
 }
}



}

inputSearch.addEventListener('input', searchUser)

