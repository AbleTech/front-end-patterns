describe('utils.findMatchingParentBySelector', function() {

	var htmlNode = document.documentElement,
	    grandParentNode = document.createElement('div'),
	    parentNode = document.createElement('p'),
	    childNode = document.createElement('a'),
	    htmlNodeElementSelector = 'html',
	    grandParentNodeIDSelector = '#testGrandParentNode',
	    parentNodeIDSelector = '#testParentNode',
	    childNodeIDSelector = '#testChildNode',
	    childNodeElementSelector = 'a',
	    childNodeChildSelector = 'p > a',
	    childNodeDescendentSelector = 'div a',
	    childNodeAttributeSelector = '[href="http://www.google.com/"]';

	/* Test setup *********************************/
	function testSetup() {
		grandParentNode.id = 'testGrandParentNode';
		parentNode.id = 'testParentNode';
		childNode.id = 'testChildNode';
		childNode.href = 'http://www.google.com/';
		childNode.innerHTML = 'Google';

		parentNode.appendChild(childNode);
		grandParentNode.appendChild(parentNode);
		document.body.appendChild(grandParentNode);
	}
	before(testSetup);
	/* End setup *************************************/

	/* Test cleanup *********************************/
	function testCleanup() {
		document.body.removeChild(grandParentNode);
	}
	after(testCleanup);
	/* End cleanup *************************************/

	// Invalid input
	it('should throw an error if the node arguement is null', function() {
		var valueTest = function(){return utils.findMatchingParentBySelector(null, parentNodeIDSelector);};
		assert.throw(valueTest, Error, 'findMatchingParentBySelector: invalid parameters');
	});
	it('should throw an error if the node arguement is undefined', function() {
		var valueTest = function(){return utils.findMatchingParentBySelector(undefined, parentNodeIDSelector);};
		assert.throw(valueTest, Error, 'findMatchingParentBySelector: invalid parameters');
	});
	it('should throw an error if the node arguement is an empty string', function() {
		var valueTest = function(){return utils.findMatchingParentBySelector('', parentNodeIDSelector);};
		assert.throw(valueTest, Error, 'findMatchingParentBySelector: invalid parameters');
	});
	it('should throw an error if the selector arguement is null', function() {
		var valueTest = function(){return utils.findMatchingParentBySelector(childNode, null);};
		assert.throw(valueTest, Error, 'findMatchingParentBySelector: invalid parameters');
	});
	it('should throw an error if the selector arguement is undefined', function() {
		var valueTest = function(){return utils.findMatchingParentBySelector(childNode, undefined);};
		assert.throw(valueTest, Error, 'findMatchingParentBySelector: invalid parameters');
	});
	it('should throw an error if the selector arguement is an empty string', function() {
		var valueTest = function(){return utils.findMatchingParentBySelector(childNode, '');};
		assert.throw(valueTest, Error, 'findMatchingParentBySelector: invalid parameters');
	});

	// Valid input
	it('should check that the immediate node matches the various selectors', function() {
		var testArray = [
			childNodeIDSelector,
			childNodeElementSelector,
			childNodeChildSelector,
			childNodeDescendentSelector,
			childNodeAttributeSelector
		];
		for (var i = 0; i < testArray.length; i++) {
			var returnElem = utils.findMatchingParentBySelector(childNode, testArray[i]);
			assert.equal(returnElem, childNode);
		}
	});

	it('should check that parent node matches the ID selector', function() {
		var returnElem = utils.findMatchingParentBySelector(childNode, parentNodeIDSelector);
		assert.equal(returnElem, parentNode);
	});

	it('should return false if there are no matching elements in the stack', function() {
		var returnElem = utils.findMatchingParentBySelector(childNode, '#myNonExistentID');
		assert.equal(returnElem, false);
	});

	it('should still work with the HTML node', function() {
		var returnElem = utils.findMatchingParentBySelector(childNode, htmlNodeElementSelector);
		assert.equal(returnElem, htmlNode);
	});
});
