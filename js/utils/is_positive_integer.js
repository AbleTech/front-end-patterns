function isPositiveInteger(value) {
	return (value == undefined || parseInt(value) == NaN || value < 0) ? false : true;
}
