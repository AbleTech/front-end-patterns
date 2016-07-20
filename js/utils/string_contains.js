// Requires ./_utils.js
utils.stringContains = function(ref, str) {
	if (!ref || !str) {
		throw new Error('stringContains: invalid parameters');
	}
	return (ref.search(new RegExp(str, "i")) > -1) ? true : false;
};
