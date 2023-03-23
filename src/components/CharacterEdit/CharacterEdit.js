import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Row } from '../Row';
import { ABILITIES, PROFICIENCY, SKILLS } from '../../data';
import './CharacterEdit.scss';
import { TabPanel } from '../TabPanel';

export const CharacterEdit = ({ character }) => {
    const { 
        id,
        name,
        level,
        abilities,
        hp,
        ac,
        weight,
        skills,
        saves
    } = character;

    const updateCharacter = (key, value) => {
        const docRef = doc(db, "partyMembers", id);

        updateDoc(docRef, {
            [key]: value
        });
    };

    const proficiency = (skillName) => skills?.hasOwnProperty(skillName) ? skills[skillName] : PROFICIENCY.NONE;
    const save = (name) => saves?.hasOwnProperty(name) ? saves[name] : PROFICIENCY.NONE;

    const handleCheckSkill = (e) => {
        const { name, checked } = e.target;
        const [ key, expertString ] = name.split('-');
        const expert = expertString === 'expert';

        const value = checked ? (
            expert ? PROFICIENCY.EXPERT
                : PROFICIENCY.NORMAL
        ) : (
            expert ? PROFICIENCY.NORMAL
                : PROFICIENCY.NONE
        );

        updateCharacter(`skills.${key}`, value);
    };

    const handleCheckSave = (e) => {
        const { name, checked } = e.target;

        updateCharacter(`saves.${name}`, checked ? PROFICIENCY.NORMAL : PROFICIENCY.NONE);
    };

    return (
        <div className="CharacterEdit">
            <Row>
                <h3 style={{width: '5rem'}}>Name</h3>
                <input 
                    value={name}
                    style={{width: '10rem'}}
                    onChange={(e) => updateCharacter('name', e.target.value)}
                />
            </Row>
            <Row>
                <h3 style={{width: '5rem'}}>Level</h3>
                <input 
                    value={level}
                    type="number"
                    style={{width: '5rem'}}
                    onChange={(e) => updateCharacter('level', parseInt(e.target.value))}
                />
            </Row>
            <div className='abilities'>
                {ABILITIES.map(a => (
                    <>
                        <h3 key={`label-${a}`} style={{width: '5rem'}}>{a.slice(0, 3)}</h3>
                        <input 
                            key={`input-${a}`}
                            value={abilities[a.slice(0, 3)]}
                            type="number"
                            style={{width: '5rem'}}
                            onChange={(e) => updateCharacter(`abilities.${a.slice(0, 3)}`, parseInt(e.target.value))}
                        />
                    </>
                ))}
            </div>
            <TabPanel 
                tabs={[
                    { icon: 'heartbeat', component: <>
                        <Row>
                            <h3 style={{width: '5rem'}}>Max HP</h3>
                            <input 
                                value={hp}
                                type="number"
                                style={{width: '10rem'}}
                                onChange={(e) => updateCharacter('hp', e.target.value)}
                            />
                        </Row>
                        <Row>
                            <h3 style={{width: '5rem'}}>AC</h3>
                            <input 
                                value={ac}
                                type="number"
                                style={{width: '10rem'}}
                                onChange={(e) => updateCharacter('ac', e.target.value)}
                            />
                        </Row>
                        <Row>
                            <h3 style={{width: '5rem'}}>Weight</h3>
                            <input 
                                value={weight}
                                type="number"
                                style={{width: '10rem'}}
                                onChange={(e) => updateCharacter('weight', e.target.value)}
                            />
                        </Row>
                    </>},
                    { icon: 'running', component: <div className='skills'>
                        {SKILLS.map(({ name: skillName }) => (
                            <Row key={`skill-${skillName}`}>
                                <input
                                    type="checkbox"
                                    name={skillName} 
                                    checked={proficiency(skillName) >= PROFICIENCY.NORMAL}
                                    onChange={handleCheckSkill}
                                />
                                <input 
                                    type="checkbox" 
                                    name={`${skillName}-expert`} 
                                    checked={proficiency(skillName) >= PROFICIENCY.EXPERT}
                                    onChange={handleCheckSkill}
                                />
                                <h3>{skillName}</h3>
                            </Row>
                        ))}
                    </div> },
                    { icon: 'save', component: <div className='saves'>
                        {ABILITIES.map(a => (
                            <Row key={`ability-${a}`}>
                                <input
                                    type="checkbox"
                                    name={a.slice(0, 3)} 
                                    checked={save(a.slice(0, 3)) >= PROFICIENCY.NORMAL}
                                    onChange={handleCheckSave}
                                />
                                <h3>{a}</h3>
                            </Row>
                        ))}
                    </div> },
                ]}
            />
        </div>
    );
};