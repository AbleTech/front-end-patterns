function stringContains(ref, str) {
	if (!ref) return false;
	return (ref.search(new RegExp(str, "i")) > -1) ? true : false;
}
