// Requires ../lib/element.classList.js
// ============================================
// Call this function when you want to find an ancestor node
// that contains the given className.
function _findMatchingParentByClass(elem, classValue){
	var currentElem = elem;
	function checkForClass(){
		// Check if the current node contains the matching class
		if (!currentElem.classList.contains(classValue)) {
			if (currentElem.nodeName == 'HTML') {
				// If the currentElem is the `<html>` node, we've gone too far.
				currentElem = false;
			} else {
				// The currentElem is not the `<html>` node yet,
				// so let's set context to the parentNode and call ourselves again
				currentElem = currentElem.parentNode;
				checkForClass();
			}
		} // else, the currentElem has the class,
		// return control to the outer function.
	}
	checkForClass();
	// currentElem could be the current node, an ancestor, or false.
	return currentElem;
}
