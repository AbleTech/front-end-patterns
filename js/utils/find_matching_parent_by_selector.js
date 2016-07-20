// Requires ../lib/element.matches.js
// Requires ./_utils.js
// ===================================================
// Call this function when you want to find an ancestor node
// that matches the given selector.
// Useful when a bubbled event doesn't match the current `event.target`
utils.findMatchingParentBySelector = function(elem, selector){
	var currentElem = elem;
	if (!currentElem || !selector) {
		throw new Error('findMatchingParentBySelector: invalid parameters');
		return null;
	} else {
		function checkForSelector(){
			// Check if the current node matches the selector
			if (!currentElem.matches(selector)) {
				if (currentElem.nodeName == 'HTML') {
					// If the currentElem is the `<html>` node, we've gone too far.
					currentElem = false;
				} else {
					// The currentElem is not the `<html>` node yet,
					// so let's set context to the parentNode and call ourselves again
					currentElem = currentElem.parentNode;
					checkForSelector();
				}
			} // else, the currentElem has matched the selector,
			// return to the outer function.
		}
		checkForSelector();
		// currentElem could be the current node, an ancestor, or false.
		return currentElem;
	}
};
