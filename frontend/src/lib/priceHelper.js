const formatPrice = (price) => {
	if (!price) return parseFloat('0').toLocaleString('en-CA');
	return parseFloat(price.toString()).toLocaleString('en-CA');
};

export { formatPrice };
