export const removeWhiteSpace = (text) => {
	const modifiedText = text.split(' ').join('').toLowerCase();
	return modifiedText || '';
};
export const formatLink = (link) => {
	const modifiedLink = link.toLowerCase().split(' ').join('-');
	return modifiedLink || '';
};
