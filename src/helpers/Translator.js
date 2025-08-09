const Locales = import.meta.glob('../Local/*.json', { eager: true });
const allData = Object.entries(Locales).reduce((acc, [path, module]) => {
	const name = path.split('/').pop().replace('.json', '');
	acc[name] = module.default;
	return acc;
}, {});

export default function _(lang, textCode) {
	if (textCode === '' || textCode === null || textCode === undefined) return '';
	if (typeof textCode !== 'string') return textCode;
	if (typeof lang !== 'string') return textCode;
	const locale = allData[lang];
	if (!locale) return textCode;
	const text = locale[textCode];
	return text;
}
