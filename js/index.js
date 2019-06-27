// your code here
function getRepositories() {
  let username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send()
}

function displayRepositories() {
  // 'this' is XMLHTTPReqest object includeing responseText key
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
  //you can read out el(a tag data-repo value) via a dataset property
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
  let username = document.getElementById('username').value;
  //should be el.dataset.repo; in github
  //but for the test, el.dataset.repository
  let repoName = el.dataset.repository;
  console.log(`https://api.github.com/repos/${username}/${repoName}/branches`)
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${repoName}/branches` )
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`;

  document.getElementById('details').innerHTML = branchList;

  //create element for Branches
  // const h3 = document.createElement('h3');
  // h3.innerText = 'Branches';
  // const div = document.createElement('div');
  // div.append(h3);
  // const divTwo = document.createElement('div');
  // divTwo.setAttribute('id', 'branches');
  // div.append(divTwo);
  // document.querySelector('div').append(div);
  //
  // document.getElementById('branches').innerHTML = branchList;
}
