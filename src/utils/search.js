import { ABILITIES, SKILLS } from "../data";

const VITALS = ['hp', 'ac', 'weight', 'level'];

const scoreToMod = (score, proficiency, level) => {
    const profBonus = Math.ceil(level / 4) + 1;
    return Math.floor((score - 10) / 2) + (proficiency * profBonus);
};

export const processSearchTokens = (tokens) => {
    if (tokens.length === 1) {
        const token = tokens[0];

        const vital = VITALS.find(v => (new RegExp(token)).test(v));
        if (vital) {
            return { 
                title: vital, 
                getSearchValue: character => character[vital]
            };
        }

        const ability = ABILITIES.find(a => (new RegExp(token)).test(a));
        if (ability) {
            return {
                title: ability, 
                getSearchValue: character => character?.abilities ? character.abilities[ability.slice(0, 3)] : '-'
            };
        }

        const skill = SKILLS.find(s => (new RegExp(token)).test(s.name));
        if (skill) {
            return {
                title: skill.name, 
                getSearchValue: character => {
                    if (!character?.skills) return '-';
                    const prof = character?.skills[skill.name] || 0;
                    const mod = scoreToMod(character.abilities[skill.ability], prof, character.level);
                    return `${mod < 0 ? mod : `+${mod}`}${new Array(prof).fill('*').join('')}`;
                },
                getSortValue: character => {
                    if (!character?.skills) return -99;
                    const prof = character.skills[skill.name] || 0;
                    return scoreToMod(character.abilities[skill.ability], prof, character.level);
                }
            };
        }
    } else {
        if (tokens.includes('save')) {
            const token = tokens.find(t => t!== 'save');
            const ability = ABILITIES.find(a => (new RegExp(token)).test(a));
            if (ability) {
                return {
                    title: `${ability} save`, 
                    getSearchValue: member => {
                        if (!member?.saves) return '-';
                        const prof = member.saves[ability.shortName] || 0;
                        const mod = scoreToMod(member.abilities[ability.slice(0, 3)], prof, member.level);
                        return `${mod < 0 ? mod : `+${mod}`}${new Array(prof).fill('*').join('')}`;
                    },
                    getSortValue: member => {
                        if (!member?.saves) return -99;
                        const prof = member.saves[ability.slice(0, 3)] || 0;
                        return scoreToMod(member.abilities[ability.slice(0, 3)], prof, member.level);
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