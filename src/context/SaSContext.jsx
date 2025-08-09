import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import SpellBridge from '../bridges/SpellBridge';
import SkillBridge from '../bridges/SkillBridge';
import useAlert from './AlertContext';
import { Spell } from '@models/Spell';
import { Skill } from '@models/Skill';
import PropTypes from 'prop-types';

const SaSContext = createContext();

export default () => {
	return useContext(SaSContext);
};

const SSProvider = ({ children }) => {
	const { setAlert } = useAlert();
	const [spells, setSpells] = useState([]);
	const [skills, setSkills] = useState([]);
	const [loading, setLoading] = useState(true);

	const getSpellById = (id) => {
		const spell = spells.find((spell) => spell._id === id);
		return spell;
	};

	const handleCreateSpell = async (spell) => {
		try {
			const response = await SpellBridge.createSpell(spell);
			setSpells((before) => [...before, response.data]);
			return response.data;
		} catch (error) {
			setAlert({ type: 'error', msg: error.message });
		}
	};

	const handleUpdateSpell = async (spell) => {
		try {
			const response = await SpellBridge.updateSpell(spell);
			setSpells((before) => [...before.filter((sp) => sp._id !== response.data._id), response.data]);
			return response.data;
		} catch (error) {
			setAlert({ type: 'error', msg: error.message });
		}
	};

	const handleDeleteSpell = async (spell) => {
		try {
			await SpellBridge.deleteSpell(spell._id);
			setSpells((before) => [...before.filter((sp) => sp._id !== spell._id)]);
		} catch (error) {
			setAlert({ type: 'error', msg: error.message });
		}
	};

	const getSkillById = (id) => {
		const skill = skills.find((skill) => skill._id === id);
		return skill;
	};

	const handleCreateSkill = async (skill) => {
		try {
			const response = await SkillBridge.createSkill(skill);
			setSkills([...skills, response.data]);
			return response.data;
		} catch (error) {
			setAlert({ type: 'error', msg: error.message });
		}
	};

	const handleUpdateSkill = async (skill) => {
		try {
			const response = await SkillBridge.updateSkill(skill);
			setSkills((before) => [...before.filter((s) => s._id !== response.data._id), response.data]);
			return response.data;
		} catch (error) {
			setAlert({ type: 'error', msg: error.message });
		}
	};

	const handleDeleteSkill = async (skill) => {
		try {
			await SkillBridge.deleteSkill(skill._id);
			setSkills((before) => [...before.filter((s) => s._id !== skill._id)]);
		} catch (error) {
			setAlert({ type: 'error', msg: error.message });
		}
	};

	useEffect(() => {
		const timeout = setTimeout(async () => {
			try {
				const response = await SkillBridge.getSkills();
				setSkills(response.data);
			} catch (error) {
				setAlert({ type: 'error', msg: error.message });
				setSkills([]);
			}

			try {
				const response = await SpellBridge.getSpells();
				setSpells(response.data);
			} catch (error) {
				setAlert({ type: 'error', msg: error.message });
				setSpells([]);
			}

			setLoading(false);
		}, 25);

		return () => clearTimeout(timeout);
	}, []);

	const contextValue = useMemo(
		() => ({
			Spell,
			Skill,
			spells,
			loading,
			getSpellById,
			handleCreateSpell,
			handleUpdateSpell,
			handleDeleteSpell,
			skills,
			getSkillById,
			handleCreateSkill,
			handleUpdateSkill,
			handleDeleteSkill,
		}),
		[spells, skills]
	);

	return (
		<SaSContext.Provider value={contextValue}>
			{' '}
			{loading ? (
				<div className="min-h-screen bg-[#2f1f17] bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] bg-repeat flex flex-col justify-center items-center p-6 font-['Tex Gyre Schola',serif] antialiased">
					<h2 className="text-center w-full text-6xl md:text-7xl font-extrabold text-[#dca34c] tracking-widest select-none drop-shadow-[0_0_8px_rgba(143,87,5,0.6)]"> Cargando Hechizos y Habilidades</h2>
				</div>
			) : (
				children
			)}
		</SaSContext.Provider>
	);
};

SSProvider.propTypes = {
	children: PropTypes.element.isRequired,
};

export { SSProvider };
