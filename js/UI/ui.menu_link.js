// Requires ../lib/element.classList.js
// Requires ./_ui.js
// ============================================
// This UI function adds mobile menu capabilities to the main site navigation.
// It also adds a mask element that should be positioned behind the open menu,
// so that when it's clicked it closes the menu.
// The menu can be programmatically opened/closed by calling the
// `.openMenu()` and `.closeMenu()` methods respectively.
(function(w, d, UI){

	var CONSTANTS = {
		MENU_CLOSED_CLASS: 'js_menu_closed',
		MENU_CONTAINER_ID: 'menu',
		MENU_LINK_ID: 'menu_link',
		MENU_MASK_ID: 'menu_mask',
		MENU_MASK_CLASS: 'mask'
	};

	function MenuLink(){

		/* Private **********************************************/
		function _handleMaskClick(event){
			ml.closeMenu();
		}
		function _handleMenuLinkClick(event){
			event.preventDefault();
			(d.querySelector('body.' + CONSTANTS.MENU_CLOSED_CLASS)) ? ml.openMenu() : ml.closeMenu();
		}
		function _trapKeyUp(event){
			if (event.keyCode == 27){
				ml.closeMenu();
			}
		}
		/* *******************************************************/

		var ml       = this;
		ml.menu      = null; // Node
		ml.menu_link = null; // Node
		ml.mask      = null; // Node
		ml.closeMenu = function(){
			d.body.classList.add(CONSTANTS.MENU_CLOSED_CLASS);
			w.removeEventListener('keyup', _trapKeyUp);
		}
		ml.openMenu = function(){
			d.body.classList.remove(CONSTANTS.MENU_CLOSED_CLASS);
			w.addEventListener('keyup', _trapKeyUp);
		}
		ml.bindMaskHandlers = function(){
			ml.mask.addEventListener('click', _handleMaskClick);
		}
		ml.bindMenuLinkHandlers = function(){
			ml.menu_link.addEventListener('click', _handleMenuLinkClick);
		}
		ml.addMask = function(){
			var mask = d.createElement('div');
			mask.id = CONSTANTS.MENU_MASK_ID;
			mask.className = CONSTANTS.MENU_MASK_CLASS;
			d.body.appendChild(mask);
			ml.mask = d.getElementById(CONSTANTS.MENU_MASK_ID);
		}
		ml.init = function(){
			ml.menu      = d.getElementById(CONSTANTS.MENU_CONTAINER_ID);
			ml.menu_link = d.getElementById(CONSTANTS.MENU_LINK_ID);
			ml.mask      = d.getElementById(CONSTANTS.MENU_MASK_ID);
			if (ml.menu_link != null) {
				ml.bindMenuLinkHandlers();
				if (ml.mask == null) {
					ml.addMask();
				}
				if (ml.mask != null) {
					ml.bindMaskHandlers();
				}
			}
		}
		return ml;
	}

	UI.MenuLink = MenuLink;

})(window, document, UI);
