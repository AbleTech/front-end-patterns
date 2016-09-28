// Requires classList.js
(function(w, d){

	var CONSTANTS = {
		PANEL_CLASS: 'panel_carousel',
		CONTAINER_CLASS: 'carousel_container',
		DATA_ATTR_COUNT: 'data-slides',
		DATA_ATTR_INDEX: 'data-slide-index',
		NAV_CLASS_NEXT: 'next',
		NAV_CLASS_PREVIOUS: 'previous',
		SELECTOR_SLIDE: 'li'
	};

	function Carousel(elem){

		/* Private */
		function _handleNavClick(event){
			var clickedNode = event.target;
			if (clickedNode.nodeName === 'A') {
				if (clickedNode.classList.contains(CONSTANTS.NAV_CLASS_NEXT)) {
					c.setSlideIndex(1);
				}
				if (clickedNode.classList.contains(CONSTANTS.NAV_CLASS_PREVIOUS)) {
					c.setSlideIndex(-1);
				}
			}
		}

		/* Public */
		var c = this;
		c.elem = elem;
		c.container = c.elem.querySelector('.' + CONSTANTS.CONTAINER_CLASS);
		c.nav = c.container.querySelector('nav');
		c.maxSlides = 0;
		c.currentIndex = 0;
		c.setSlideIndex = function(increment) {
			c.currentIndex = c.currentIndex + increment;
			if (c.currentIndex < 0) {
				c.currentIndex = c.maxSlides - 1;
			}
			if (c.currentIndex == c.maxSlides) {
				c.currentIndex = 0;
			}
			c.container.setAttribute(CONSTANTS.DATA_ATTR_INDEX, c.currentIndex);
		}
		c.countSlides = function(){
			var slides = c.container.querySelectorAll(CONSTANTS.ELEM_SLIDE);
			c.container.setAttribute(CONSTANTS.DATA_ATTR_COUNT, slides.length);
			return slides.length;
		}
		c.bindLinks = function(){
			c.nav.addEventListener('click', _handleNavClick);
		}
		c.setupCarousel = function(){
			c.maxSlides = c.container.getAttribute(CONSTANTS.DATA_ATTR_COUNT) || c.countSlides();
			c.currentIndex = c.elem.getAttribute(CONSTANTS.DATA_ATTR_INDEX) || 0;
			c.bindLinks();
		}
		c.init = function(){
			if (c.elem) {
				c.setupCarousel();
			}
		}
		c.init();
		return c;
	}

	function Carousels(){
		var cs = this;
		cs.activeCarousels = [];
		cs.addCarousels = function(){
			var i = 0,
			    len = cs.listOfCarousels.length;
			for (i; i < len; i++) {
				var newCarousel = new UI.Carousel(cs.listOfCarousels[i]);
				cs.activeCarousels.push(newCarousel);
			}
		}
		cs.init = function(){
			cs.listOfCarousels = d.querySelectorAll('.' + CONSTANTS.PANEL_CLASS);
			if (cs.listOfCarousels.length) {
				cs.addCarousels();
			}
		}
		return cs;
	}

	UI.Carousels = Carousels;
	UI.Carousel = Carousel;

})(window, document);
