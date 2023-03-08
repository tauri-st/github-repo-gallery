//Div where profile information appears
const profileDiv = document.querySelector(".overview");
const username = "tauri-st";
//Unordered list where repos appear
const repoList = document.querySelector(".repo-list");
//Section where repos appear
const repoSection = document.querySelector(".repos");
//Section where repo data appears
const repoDataSection = document.querySelector(".repos");
//Section where individual repo data appears
const repoData = document.querySelector(".repo-data");
const backToGalleryButton = document.querySelector(".view-repos");
//Input with "search by the name" placeholder
const filterInput = document.querySelector(".filter-repos");

const getProfile = async function () {
    const profile = await fetch(
        `https://api.github.com/users/${username}`
    );
    const data = await profile.json();
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
    showRepos(repoData);
};

const showRepos = function (repos) {
    filterInput.classList.remove("hide");
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
    const fetchLanguages = await fetch(
        repoInfo.languages_url
    );
    const languageData = await fetchLanguages.json();
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    };
    showThatRepo(repoInfo, languages);
};

const showThatRepo = async function (repoInfo, languages) {
    repoData.innerHTML = "";
    const repoDetails = document.createElement("div");
    repoDetails.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `
        repoData.append(repoDetails);
        repoData.classList.remove("hide");
        repoDataSection.classList.add("hide");
        backToGalleryButton.classList.remove("hide");
};

backToGalleryButton.addEventListener("click", function () {
    repoDataSection.classList.remove("hide");
    repoData.classList.add("hide");
    backToGalleryButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const searchInput = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowerCaseSearch = searchInput.toLowerCase();

    for (const repo of repos) {
        const repoLowerCase = repo.innerText.toLowerCase();
        if (repoLowerCase.includes(lowerCaseSearch)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});