const intlFormat = (num) => {
	return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
};

const commorize = (num) => {
	if (isNaN(num)) return null;

	if (num >= 1000000) return intlFormat(num / 1000000) + 'M';
	if (num >= 1000) return intlFormat(num / 1000) + 'k';
	return intlFormat(num);
};

export default commorize;
