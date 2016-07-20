describe('utils.isPositiveInteger', function() {
	// Failing values
	var nullValue = null;
	var undefinedValue = undefined;
	var alphabeticString = 'a';
	var emptyString = '';
	var float = 1.2345678901;
	var zero = 0;
	var negativeInteger = -1;
	it('should return false if the value is null', function() {
		var valueTest = utils.isPositiveInteger(nullValue);
		assert.equal(valueTest, false);
	});
	it('should return false if the value is undefined', function() {
		var valueTest = utils.isPositiveInteger(undefinedValue);
		assert.equal(valueTest, false);
	});
	it('should return false if the value is an alphabetic string', function() {
		var valueTest = utils.isPositiveInteger(alphabeticString);
		assert.equal(valueTest, false);
	});
	it('should return false if the value is an empty string', function() {
		var valueTest = utils.isPositiveInteger(emptyString);
		assert.equal(valueTest, false);
	});
	it('should return false if the value is a float', function() {
		var valueTest = utils.isPositiveInteger(float);
		assert.equal(valueTest, false);
	});
	it('should return false if the value is zero', function() {
		var valueTest = utils.isPositiveInteger(zero);
		assert.equal(valueTest, false);
	});
	it('should return false if the value is less than zero', function() {
		var valueTest = utils.isPositiveInteger(negativeInteger);
		assert.equal(valueTest, false);
	});

	// Passing values
	var integerAsString = '1';
	var positiveInteger = 2;
	it('should return true if the value is an integer as a string', function() {
		var valueTest = utils.isPositiveInteger(integerAsString);
		assert.equal(valueTest, true);
	});
	it('should return true if the value is greater than zero', function() {
		var valueTest = utils.isPositiveInteger(positiveInteger);
		assert.equal(valueTest, true);
	});
});
