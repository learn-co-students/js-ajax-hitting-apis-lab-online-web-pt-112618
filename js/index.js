// your code here
function getRepositories() {
  let username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send()
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  console.log(repos);

  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">' + r.html_url + '</a>' + ' - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">' + 'Get Branches' + '</a></li>').join('')}</ul>`;

  document.getElementById('repositories').innerHTML = repoList;

}

function getCommits(el) {
  let username = document.getElementById('username').value;
  //should be el.dataset.repo; in github
  //but for the test, el.dataset.repository
  console.log(el)
  //https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
  let repoName = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${repoName}/commits` )
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits)

  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> - ' + commit.author.login + ' - ' + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const repoName = el.dataset.repository;
  const uri =
    'https://api.github.com' + '/repos/' + el.dataset.username + '/' + repoName + '/branches';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayBranches);
  xhr.open('GET', uri);
  xhr.send();
}
function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(branch => '<li>' + branch.name + '</li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
