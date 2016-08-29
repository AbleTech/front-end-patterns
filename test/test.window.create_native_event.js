describe('utils.window.create_native_event', function() {

	if (document.createEvent) {
		it('should create a `initMouseEvent` in a non-compliant browser', function() {
			var clickEvent = utils.createNativeEvent('click');
			assert.equal(typeof clickEvent, 'object');
		});
	} else {
		it('should create a `MouseEvent` in a compliant browser', function() {
			var clickEvent = utils.createNativeEvent('click');
			assert.equal(typeof clickEvent, 'object');
		});
	}

});
