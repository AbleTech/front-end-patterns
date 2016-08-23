// Requires ../lib/element.classList.js
// Requires ../utils/window.create_native_event.js
// Requires ./_ui.js
// ============================================
// This UI function adds dropdown menu capabilities to any element that matches
// a certain container class pattern.
// NOTE:
// There's a bug with opening one menu, Then opening another without closing the first.
// This widget should probably also expose the menu open and close methods, or
// create instances of single menus.
(function(w, d, UI){

	var CONSTANTS = {
		CONTAINER_CLASS: 'dropdown_container',
		LINK_CLASS: 'dropdown_link',
		MENU_CLASS: 'dropdown_menu',
		ACTIVE_CLASS: 'js_menu_active',
		ACTIVE_BODY_CLASS: 'js_dropdown_menu_active',
		MASK_ID: 'menu_mask'
	};

	function _menuClose() {
		d.querySelector('.' + CONSTANTS.LINK_CLASS + '.' + CONSTANTS.ACTIVE_CLASS).classList.remove(CONSTANTS.ACTIVE_CLASS);
		d.body.classList.remove(CONSTANTS.ACTIVE_BODY_CLASS);
		d.getElementById(CONSTANTS.MASK_ID).removeEventListener('click', _maskClickHandler);
		d.removeEventListener('keydown', _documentKeyDownHandler);
	}

	function _menuOpen(link) {
		link.classList.add(CONSTANTS.ACTIVE_CLASS);
		d.body.classList.add(CONSTANTS.ACTIVE_BODY_CLASS);
		d.getElementById(CONSTANTS.MASK_ID).addEventListener('click', _maskClickHandler);
		d.addEventListener('keydown', _documentKeyDownHandler);
	}

	function _documentKeyDownHandler(event) {
		if (event.keyCode === 27) {
			_menuClose();
		}
	}
	function _maskClickHandler(event) {
		_menuClose();
	}
	function _containerClickHandler(event) {
		var link = event.target;
		(link.classList.contains(CONSTANTS.ACTIVE_CLASS)) ? _menuClose() : _menuOpen(link);
	};
	function _closeAllOpenMenus(){
		var openLinks = document.querySelectorAll('.' + CONSTANTS.ACTIVE_CLASS);
		var openLinksLen = openLinks.length;
		if (openLinksLen) {
			var i = 0;
			for (i; i < openLinksLen; i++) {
				var clickEvent = createNativeEvent('click');
				openLinks[i].dispatchEvent(clickEvent);
			}
		}
	}
	function _dropdownClickHandler() {
		_closeAllOpenMenus();
	}

	function DropdownMenu() {
		var ddm = this;
		ddm.elements = [];
		ddm.findAllDropdowns = function() {
			ddm.elements = d.querySelectorAll('.' + CONSTANTS.CONTAINER_CLASS);
		}
		ddm.bindDropdowns = function() {
			for (var i=0; i < ddm.elements.length; i++) {
				var element = ddm.elements[i];
				element.querySelector('.' + CONSTANTS.LINK_CLASS).addEventListener('click', _containerClickHandler);
				element.querySelector('.' + CONSTANTS.MENU_CLASS).addEventListener('click', _dropdownClickHandler);
			}
		}
		ddm.init = function() {
			ddm.findAllDropdowns();
			if (ddm.elements.length) {
				ddm.bindDropdowns();
			}
		}
		return ddm;
	};
	UI.DropdownMenu = DropdownMenu;

})(window, document, UI);
