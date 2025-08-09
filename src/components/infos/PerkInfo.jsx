import _ from '../../helpers/Translator';
import PropTypes from 'prop-types';

const PerkInfo = ({ perk }) => {
	if (!perk) return null;

	return (
		<div className="space-y-6 bg-[#3c291f]/80 p-8 rounded-2xl shadow-xl shadow-black/60 border-4 border-[#5a3b2e] text-[#f0d9b5] w-full max-w-3xl mx-auto font-serif tracking-wide">
			<h2 className="text-3xl font-extrabold text-center border-b-2 border-[#f0d9b5] pb-2 mb-4">{perk.name}</h2>

			<p className="italic text-yellow-100 mb-4">
				Tipo: <span className="capitalize">{_('es', perk.type)}</span>
			</p>

			<p className="text-base leading-relaxed whitespace-pre-line">{perk.description}</p>

			<div className="flex flex-row justify-between mt-2">
				{perk.levelOne && (
					<div className="min-w-1/3 p-2 flex flex-col">
						<p className="underline font-black">Nivel 1</p>
						{Object.entries(perk.levelOne).map(([talent, value], i) => (
							<p key={`${talent}-${value}-${i}`}>
								{_('es', talent)}: {perk.type === 'negative' && '-'}
								{value}
							</p>
						))}
					</div>
				)}

				{perk.levelTwo && (
					<div className="min-w-1/3 p-2 flex flex-col">
						<p className="underline font-black">Nivel 2</p>
						{Object.entries(perk.levelTwo).map(([talent, value], i) => (
							<p key={`${talent}-${value}-${i}`}>
								{_('es', talent)}: {perk.type === 'negative' && '-'}
								{value}
							</p>
						))}
					</div>
				)}
				{perk.levelThree && (
					<div className="min-w-1/3 p-2 flex flex-col">
						<p className="underline font-black">Nivel 3</p>
						{Object.entries(perk.levelThree).map(([talent, value], i) => (
							<p key={`${talent}-${value}-${i}`}>
								{_('es', talent)}: {perk.type === 'negative' && '-'}
								{value}
							</p>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

PerkInfo.propTypes = {
	perk: PropTypes.object.isRequired,
};

export default PerkInfo;
