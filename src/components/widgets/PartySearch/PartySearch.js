import { useContext, useEffect, useState } from 'react';
import { Icon, IconButton, TextInput } from '../..';
import { PartyContext } from '../../../context';
import { ABILITIES, SKILLS } from '../../../data';
import './PartySearch.scss';

const VITALS = ['hp', 'ac', 'weight', 'level'];

export const PartySearch = ({ activeSearch = '', updateWidget }) => {
    const [tokens, setTokens] = useState([]);
    const [sort, setSort] = useState(false);
    const { party } = useContext(PartyContext);

    useEffect(() => {
        setTokens(activeSearch.toLowerCase().trim().split(/\s+/));
    }, [activeSearch])

    const setSearch = (value) => {
        updateWidget({
            activeSearch: value
        });
    };

    const scoreToMod = (score, proficiency, level) => {
        const profBonus = Math.ceil(level / 4) + 1;
        return Math.floor((score - 10) / 2) + (proficiency * profBonus);
    };

    const processTokens = () => {
        if (tokens.length === 1) {
            const token = tokens[0];

            const vital = VITALS.find(v => (new RegExp(token)).test(v));
            if (vital) {
                return { 
                    title: vital, 
                    getSearchValue: member => member[vital]
                };
            }

            const ability = ABILITIES.find(a => (new RegExp(token)).test(a.name));
            if (ability) {
                return {
                    title: ability.name, 
                    getSearchValue: member => member?.abilities ? member.abilities[ability.shortName] : '-'
                };
            }

            const skill = SKILLS.find(s => (new RegExp(token)).test(s.name));
            if (skill) {
                return {
                    title: skill.name, 
                    getSearchValue: member => {
                        if (!member?.skills) return '-';
                        const prof = member?.skills[skill.name] || 0;
                        const mod = scoreToMod(member.abilities[skill.ability], prof, member.level);
                        return `${mod < 0 ? mod : `+${mod}`}${new Array(prof).fill('*').join('')}`;
                    },
                    getSortValue: member => {
                        if (!member?.skills) return -99;
                        const prof = member.skills[skill.name] || 0;
                        return scoreToMod(member.abilities[skill.ability], prof, member.level);
                    }
                };
            }
        } else {
            if (tokens.includes('save')) {
                const token = tokens.find(t => t!== 'save');
                const ability = ABILITIES.find(a => (new RegExp(token)).test(a.name));
                if (ability) {
                    return {
                        title: `${ability.name} save`, 
                        getSearchValue: member => {
                            if (!member?.saves) return '-';
                            const prof = member.saves[ability.shortName] || 0;
                            const mod = scoreToMod(member.abilities[ability.shortName], prof, member.level);
                            return `${mod < 0 ? mod : `+${mod}`}${new Array(prof).fill('*').join('')}`;
                        },
                        getSortValue: member => {
                            if (!member?.saves) return -99;
                            const prof = member.saves[ability.shortName] || 0;
                            return scoreToMod(member.abilities[ability.shortName], prof, member.level);
                        }
                    };
                }
            } else if (tokens.includes('passive')) {
                const token = tokens.find(t => t!== 'passive');
                const skill = SKILLS.find(s => (new RegExp(token)).test(s.name));
                if (skill) {
                    return {
                        title: `passive ${skill.name}`, 
                        getSearchValue: member => {
                            if (!member?.skills) return '-';
                            const prof = member.skills[skill.name] || 0;
                            let mod = scoreToMod(member.abilities[skill.ability], prof, member.level);
                            if ((member.feats || []).includes('observant') && ['perception', 'investigation'].includes(skill.name)) {
                                mod += 5;
                            }

                            return 10 + mod;
                        }
                    };
                }
            }
        }

        return {title: '', getSearchValue: () => {}, getSortValue: null}
    };

    const {title, getSearchValue, getSortValue} = processTokens();

    const sortedParty = () => (
        sort ? party.sort((a, b) => {
            if (getSortValue) {
                return getSortValue(b) - getSortValue(a);
            } else {
                return getSearchValue(b) - getSearchValue(a);
            }
        }) : party
    );


    return (
        <div className='PartySearch'>
            <header className='PartySearch-Header'>
                <Icon name="search" className='PartySearch-SearchIcon' />
                <TextInput
                    value={activeSearch}
                    onChange={setSearch}
                    placeholder="hp, ac, skill, save..."
                />
                <IconButton
                    onClick={()=> setSort(!sort)}
                    title="Sort results"
                    toggled={sort}
                >
                    <Icon name='arrow-down' color={sort ? 'black' : 'white'} />
                </IconButton>
            </header>

            {party.length ? 
                <>
                    <div className='PartySearch-Row'>
                        <h3>Name</h3>
                        <h3>{title}</h3>
                    </div>

                    {sortedParty().map((member, i) => (
                        <div className='PartySearch-Row' key={`party-search-${i}`}>
                            <div>{member.name}</div>
                            <div>{getSearchValue(member)}</div>
                        </div>
                    ))}
                </>
                :
                <div className='PartySearch-Row'>
                        <h3>Use the <Icon name="users" /> button in the toolbar to configure your party.</h3>
                    </div>
            }
        </div>
    );
};

export default PartySearch;
