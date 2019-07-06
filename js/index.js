const root = 'https://api.github.com'

function getRepositories() {
	let name = document.getElementById("username").value
	let uri = root + '/users/' + name + '/repos'
	let xhr = new XMLHttpRequest()
	xhr.addEventListener('load', displayRepositories)
	xhr.open('GET', uri)
	xhr.send()
	return false
}