/**
 * public redirect attempts to redirect to the given URL.
 * 
 * @param url {String} The URL to redirect to.
 * @param force {Boolean} When true, the client can't prevent a redirect by adding 'noredirect' to the search query.
 * 
 * @author fivekWBassMachine
 */
function redirect(url, force) {
	var search = new URLSearchParams(window.location.search);
	if (search.has('noredirect') === true && force === false) {
		console.log(`Client prevented redirect to ${url}.`);
		return;
	}
	location.href = url;
}