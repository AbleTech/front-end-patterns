// Requires ./_ui.js
// ============================================
// This UI function finds all elements with the attribute data-select-all then
//attaches a click event handler to it. When it is triggered, the event selects
//all in the range.

(function(w, d, UI){

	var CONSTANTS = {
		DATA_ATTRIBUTE: 'data-select-all'
	};

	function SelectAll(){

		/* Private **********************************************/
		function _findAllElements() {
			return document.querySelectorAll('[' + CONSTANTS.DATA_ATTRIBUTE + ']');
		}
		function _selectAllClickHandler(event) {
		  return event.target.setSelectionRange(0, event.target.value.length);
		};
		/* *******************************************************/

		var t = this;
		t.elements = new Array();

		t.attachClickHandler = function(){
			var len = t.elements.length;
			for (i=0; i< len; i++){
				var e = t.elements[i];
				e.addEventListener('click', _selectAllClickHandler);
				e.removeAttribute(CONSTANTS.DATA_ATTRIBUTE);
			}
		};

		t.init = function(){
			t.elements = _findAllElements();
			if (t.elements.length) {
				t.attachClickHandler();
			}
		};
		return t;
	}

	UI.SelectAll = SelectAll;

})(window, document, UI);
