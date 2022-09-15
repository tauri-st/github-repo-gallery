//Div where profile information appears
const profileDiv = document.querySelector(".overview");
const username = "tauri-st";
//Unordered list where repos appear
const repoList = document.querySelector(".repo-list");
//Section where repos appear
const repoSection = document.querySelector(".repos");
//Section where repo data appears
const repoDataSection = document.querySelector(".repos");

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
    getRepos();
};

const getRepos = async function () {
    const fetchRepos = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
        );
    const repoData = await fetchRepos.json();
    console.log(repoData);
    showRepos(repoData);
};

const showRepos = function (repos) {
    for (const repo of repos) {
        const repoObject = document.createElement("li");
        repoObject.classList.add("repo");
        repoObject.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoObject);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        pullThatRepo(repoName);
    }
});

const pullThatRepo = async function (repoName) {
    const fetchThatRepo = await fetch(
        `https://api.github.com/repos/${username}/${repoName}`
    );
    const repoInfo = await fetchThatRepo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(
        `repoInfo.languages_url`
    );
    console.log(fetchLanguages);
};