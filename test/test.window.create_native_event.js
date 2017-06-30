describe('utils.createNativeEvent', function() {

	var clickEvent,
	    mouseDownEvent,
	    mouseUpEvent,
	    changeEvent;

	it('should create a click event', function() {
		clickEvent = utils.createNativeEvent('click');
		assert.equal(clickEvent.type, 'click');
	});

	it('should create a mousedown event', function() {
		mouseDownEvent = utils.createNativeEvent('mousedown');
		assert.equal(mouseDownEvent.type, 'mousedown');
	});

	it('should create a mouseup event', function() {
		mouseUpEvent = utils.createNativeEvent('mouseup');
		assert.equal(mouseUpEvent.type, 'mouseup');
	});

	it('should create a change event', function() {
		changeEvent = utils.createNativeEvent('change');
		assert.equal(changeEvent.type, 'change');
	});



});
