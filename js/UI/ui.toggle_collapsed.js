// Requires ../lib/element.classlist.js
// Requires ./_ui.js
(function(d){

	var CONSTANTS = {
		ATTR_TOGGLE_TARGET: 'data-toggle-collapsed',
		CLASS_COLLAPSED:    'js_collapsed'
	};

	function ToggleCollapsed() {
		var tc = this;
		tc.elems = []; // nodeList

		tc.findElements = function(){
			tc.elems = d.querySelectorAll('[' + CONSTANTS.ATTR_TOGGLE_TARGET + ']');
		};

		tc.checkedHandler = function(elem){
			elem.addEventListener('change', function(e){
				var target = event.target.getAttribute(CONSTANTS.ATTR_TOGGLE_TARGET);
				d.querySelector(target).classList.toggle(CONSTANTS.CLASS_COLLAPSED);
			});
		};

		tc.groupCheckedHandler = function(elem){
			elem.addEventListener('change', function(e){
				var groupElems = d.querySelectorAll('[name="' + elem.name + '"][' + CONSTANTS.ATTR_TOGGLE_TARGET + ']');
				var i = 0,
						groupElemsLen = groupElems.length;
				for (i; i < groupElemsLen; i++) {
					var target = d.querySelector(groupElems[i].getAttribute(CONSTANTS.ATTR_TOGGLE_TARGET));
					if (el.checked) {
						target.classList.remove(CONSTANTS.CLASS_COLLAPSED);
					} else {
						target.classList.add(CONSTANTS.CLASS_COLLAPSED);
					}
				}
			});
		};

		tc.clickHandler = function(elem){
			elem.addEventListener('click', function(e){
				var target = elem.getAttribute(CONSTANTS.ATTR_TOGGLE_TARGET);
				if (elem.href) {
					var anchorTarget = '#' + elem.href.split('#')[1];
					if (anchorTarget == target){
						e.preventDefault();
					}
				}
				d.querySelector(target).classList.toggle(CONSTANTS.CLASS_COLLAPSED)
			});
		};

		tc.bindHandlers = function(){
			var i = 0,
					elemLen = tc.elems.length;
			for (i; i < elemLen; i++) {
				var elem = tc.elems[i];
				if (elem.tagName == 'INPUT') {
					if (elem.type == 'checkbox') {
						tc.checkedHandler(elem);
					} else if (elem.type == 'radio') {
						tc.groupCheckedHandler(elem);
					}
				} else if (elem.tagName == 'A') {
					tc.clickHandler(elem);
				}
			}
		};

		tc.init = function(){
			tc.findElements();
			if (tc.elems.length) {
				tc.bindHandlers();
			}
		};

		return tc;
	}
	UI.ToggleCollapsed = ToggleCollapsed;

})(document);
