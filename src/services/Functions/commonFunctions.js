export const removeWhiteSpace = (text) => {
	const modifiedText = text.split(' ').join('').toLowerCase();
	return modifiedText || '';
};

export const formatLink = (link) => {
	const modifiedLink = link.toLowerCase().split(' ').join('-');
	return modifiedLink || '';
};

export const modifyPrice = (price) => {
    if (!price) return "";
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

export const estimatePriceCalc = (designPrice, fabricPrice, fabricLength) => {
	return 1.2 * (designPrice + (fabricPrice * fabricLength)) + 120000
}