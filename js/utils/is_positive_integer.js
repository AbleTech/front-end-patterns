// Requires ./_utils.js
utils.isPositiveInteger = function(value) {
	return (
		!value ||
		isNaN(value) ||
		value <= 0 ||
		value % 1 > 0
	) ? false : true;
};
