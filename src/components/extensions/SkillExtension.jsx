import { useState, useEffect, useRef } from 'react';
import SkillsSelection from '../SkillsSelection';
import useSaS from '../../context/SaSContext';
import { Skill } from '@models/Skill';
import PropTypes from 'prop-types';

const SkillExtension = ({ charSkills, handleSetSkills }) => {
	const { skills: skillList } = useSaS();
	const [skills, setSkills] = useState([]);

	const initialized = useRef(false);

	useEffect(() => {
		if (!initialized.current && charSkills.length > 0) {
			setSkills(charSkills.map(Skill.fromRaw));

			initialized.current = true;
		}
	}, [charSkills]);

	const handleAddSkill = (e) => {
		e.preventDefault();
		const found = skillList.find((skill) => skill._id === e.target.id);
		if (found) setSkills((before) => [...before, found]);
	};

	const handleRemoveSkill = (e) => {
		e.preventDefault();
		setSkills((before) => [...before.filter((skill) => skill._id !== e.target.id)]);
	};

	useEffect(() => {
		handleSetSkills(skills);
	}, [skills]);
	return (
		<section className="p-1 mt-6">
			<SkillsSelection mainSkills={skills} handleOnAdd={handleAddSkill} handleOnRemove={handleRemoveSkill} skillList={skillList} />
		</section>
	);
};

SkillExtension.propTypes = {
	charSkills: PropTypes.array.isRequired,
	handleSetSkills: PropTypes.func.isRequired,
};

export default SkillExtension;
