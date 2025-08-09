import PropTypes from 'prop-types';
import _ from '../../helpers/Translator';

const PerkLevelExtension = ({ perkLevel, type }) => {
	return (
		<div className="min-w-1/3 p-2 flex flex-col">
			<p className="underline font-black">Nivel 3</p>
			{Object.entries(perkLevel).map(([talent, value], i) => (
				<p key={`${talent}-${value}-${i}`}>
					{_('es', talent)}: {type === 'negative' && '-'}
					{value}
				</p>
			))}
		</div>
	);
};

PerkLevelExtension.propTypes = {
	perkLevel: PropTypes.object.isRequired,
	type: PropTypes.string.isRequired,
};

export default PerkLevelExtension;
