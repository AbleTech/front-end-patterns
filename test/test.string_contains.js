describe('utils.stringContains', function() {
	var referenceString = 'The quick brown fox jumps over the lazy dog.',
	    undefinedValue = undefined,
	    nullValue = null,
	    nonMatchingValue = 'ostriches',
	    emptyString = '',
	    uppercaseMatchingValue = 'FOX',
	    matchingValue = 'fox',
	    matchingStartValue = 'The quick',
	    matchingEndValue = 'dog.';

	// Reference Values null
	it('should throw an error if the reference value is undefined', function() {
		var valueTest = function(){return utils.stringContains(undefinedValue, matchingValue);};
		assert.throw(valueTest, Error, 'stringContains: invalid parameters');
	});
	it('should throw an error if the reference value is null', function() {
		var valueTest = function(){return utils.stringContains(nullValue, matchingValue);};
		assert.throw(valueTest, Error, 'stringContains: invalid parameters');
	});
	it('should throw an error if the reference value is an empty string', function() {
		var valueTest = function(){return utils.stringContains(emptyString, matchingValue);};
		assert.throw(valueTest, Error, 'stringContains: invalid parameters');
	});

	// Matching value null
	it('should throw an error if the matching value is undefined', function() {
		var valueTest = function(){return utils.stringContains(referenceString, undefinedValue);};
		assert.throw(valueTest, Error, 'stringContains: invalid parameters');
	});
	it('should throw an error if the matching value is null', function() {
		var valueTest = function(){return utils.stringContains(referenceString, nullValue);};
		assert.throw(valueTest, Error, 'stringContains: invalid parameters');
	});
	it('should throw an error if the matching value is an empty string', function() {
		var valueTest = function(){return utils.stringContains(referenceString, emptyString);};
		assert.throw(valueTest, Error, 'stringContains: invalid parameters');
	});

	// Matching value vs. Reference value == false
	it('should return false if the matching value is not within the reference value', function() {
		var valueTest = utils.stringContains(referenceString, nonMatchingValue);
		assert.equal(valueTest, false);
	});

	// Matching value vs. Reference value == true
	it('should return true if the matching value is at the beginning of the reference value', function() {
		var valueTest = utils.stringContains(referenceString, matchingStartValue);
		assert.equal(valueTest, true);
	});
	it('should return true if the matching value is contained in the reference value', function() {
		var valueTest = utils.stringContains(referenceString, matchingValue);
		assert.equal(valueTest, true);
	});
	it('should return true if the matching value is at the end of the reference value', function() {
		var valueTest = utils.stringContains(referenceString, matchingEndValue);
		assert.equal(valueTest, true);
	});
	it('should return true if the matching value uses a different case', function() {
		var valueTest = utils.stringContains(referenceString, uppercaseMatchingValue);
		assert.equal(valueTest, true);
	});

});
