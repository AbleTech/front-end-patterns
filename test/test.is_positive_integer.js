describe('utils.isPositiveInteger', function() {
	it('should return false if the value is null', function() {
		var valueTest = utils.isPositiveInteger(null);
		assert.equal(valueTest, false);
	});
	it('should return false if the value is undefined', function() {
		var valueTest = utils.isPositiveInteger(undefined);
		assert.equal(valueTest, false);
	});
	it('should return false if the value is an empty string', function() {
		var valueTest = utils.isPositiveInteger('');
		assert.equal(valueTest, false);
	});
	it('should return false if the value is an alphabetic string', function() {
		var valueTest = utils.isPositiveInteger('a');
		assert.equal(valueTest, false);
	});
	it('should return false if the value is a float', function() {
		var valueTest = utils.isPositiveInteger(1.2345678901);
		assert.equal(valueTest, false);
	});
	it('should return false if the value is zero', function() {
		var valueTest = utils.isPositiveInteger(0);
		assert.equal(valueTest, false);
	});
	it('should return false if the value is less than zero', function() {
		var valueTest = utils.isPositiveInteger(-1);
		assert.equal(valueTest, false);
	});

	// Passing values
	it('should return true if the value is an integer as a string', function() {
		var valueTest = utils.isPositiveInteger('1');
		assert.equal(valueTest, true);
	});
	it('should return true if the value is greater than zero', function() {
		var valueTest = utils.isPositiveInteger(2);
		assert.equal(valueTest, true);
	});
});
