//Div where profile information appears
const profileDiv = document.querySelector(".overview");
const username = "tauri-st";
//Unordered list where repos appear
const repoList = document.querySelector(".repo-list");

const getProfile = async function () {
    const profile = await fetch(
        `https://api.github.com/users/${username}`
    );
    const data = await profile.json();
    //console.log(data);
    showProfile(data);
};

getProfile();

const showProfile = function (data) {
    let div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
        <img alt="user avatar" src=${data.avatar_url}/>
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
    `;
    profileDiv.append(div);
};

const getRepos = async function () {
    const fetchRepos = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
        );
    const repoData = await fetchRepos.json();
    console.log(repoData);
};

getRepos();