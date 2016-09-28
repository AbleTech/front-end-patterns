(function(w, d){

	var CONSTANTS = {
		DATA_ATTR_SOURCE: 'data-remove-target'
	};

	function RemoveTarget(){
		function _handleClick(event){
			var clickedNode = event.target;
			if (clickedNode.nodeName === 'A') {
				var target = d.querySelector(clickedNode.getAttribute('href'));
				target.parentNode.removeChild(target);
			}
		}

		var rt = this;
		rt.init = function(){
			rt.elems = d.querySelectorAll('[' + CONSTANTS.DATA_ATTR_SOURCE + ']');
			for (var i = 0; i < rt.elems.length; i++) {
				rt.elems[i].addEventListener('click', _handleClick);
			}
		}
		return rt;
	}

	UI.RemoveTarget = RemoveTarget;

})(window, document);
