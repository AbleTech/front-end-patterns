// Requires ../lib/element.classList.js
// Requires ../utils/find_matching_parent_by_selector.js
// Requires ./_ui.js
// ============================================
// This UI function converts a `<nav>` and block of `<section>`s into a tab-based control.
(function(w, d, UI){

	var CONSTANTS = {
		DATA_ATTRIBUTE: 'data-current-tab-index',
		INITIAL_DATA_ATTRIBUTE: 'data-initial-index',
		ANCHOR_DATA_ATTRIBUTE: 'data-set-index',
		CLASS_MATCH: 'tabs_container'
	};

	function Tabs(){

		/* Private **********************************************/
		function _tabClickHandler(event){
			var elem = event.target;
			var nodeType = elem.nodeName;
			if (nodeType != 'A') {
				// The clicked node could be a child of the <a>.
				// If so, go up in parentNodes until you find the <a>
				return false;
			} else {
				event.preventDefault();
				var targetIndex = parseInt(elem.getAttribute(CONSTANTS.ANCHOR_DATA_ATTRIBUTE));
				var tabContainer = utils.findMatchingParentBySelector(elem, '.' + CONSTANTS.CLASS_MATCH);
				if (tabContainer) {
					tabContainer.setAttribute(CONSTANTS.DATA_ATTRIBUTE, targetIndex);
				}
			}
		}
		function _addAnchorIndexes(arrayOfLinks){
			for (var i = 0; i < arrayOfLinks.length; i++) {
				var anchor = arrayOfLinks[i];
				anchor.setAttribute(CONSTANTS.ANCHOR_DATA_ATTRIBUTE, i+1);
			}
		}
		/* *******************************************************/

		var t = this;
		t.findMatchingElements = function(){
			t.tabs = d.querySelectorAll('.' + CONSTANTS.CLASS_MATCH);
		}
		t.initialiseTabGroup = function(){
			for (var i = 0; i < t.tabs.length; i++) {
				var currentTabGroup = t.tabs[i];
				if (currentTabGroup.getAttribute(CONSTANTS.DATA_ATTRIBUTE)) {
					continue;
				} else {
					var initialIndex = currentTabGroup.getAttribute(CONSTANTS.INITIAL_DATA_ATTRIBUTE) || 1;
					currentTabGroup.setAttribute(CONSTANTS.DATA_ATTRIBUTE, initialIndex);
					var links = currentTabGroup.querySelectorAll('nav a');
					_addAnchorIndexes(links);
				}
			}
		}
		t.addClickHandlers = function(){
			for (var i = 0; i < t.tabs.length; i++) {
				var item = t.tabs[i];
				item.querySelector('nav').addEventListener('click', _tabClickHandler);
			}
		}
		t.init = function(){
			t.findMatchingElements();
			if (t.tabs.length) {
				t.initialiseTabGroup();
				t.addClickHandlers();
			}
		}
		return t;
	}

	UI.Tabs = Tabs;

})(window, document, UI);
