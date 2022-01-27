import firebase from 'firebase/app';
import { Modal, TextInput } from '..';
import './SettingsModal.scss';
import { RgbStringColorPicker as ColorPicker } from 'react-colorful';
import { useContext } from 'react';
import { AuthContext, SettingsContext } from '../../context';

const BACKGROUND_TYPES = {
    COLOR: 'color',
    IMAGE: 'image'
};

export const SettingsModal = () => {
    const { user } = useContext(AuthContext);
    const { settings } = useContext(SettingsContext);

    const updateSettings = ({ key, value }) => {
        firebase.firestore().collection('settings').doc(user?.uid).set({
            [key]: value
        }, {merge: true});
    };

    const handleTypeChange = e => {
        const { name, value, checked } = e.target;
        if (checked) {
            updateSettings({
                key: name,
                value
            });
        }
    };

    return (
        <Modal className="SettingsModal">
            <h3>Settings</h3>
            <h4>Background</h4>

            {Object.values(BACKGROUND_TYPES).map(type => (
                <label key={`background-type-${type}`}>
                    <input
                        type="radio"
                        name="backgroundType"
                        value={type}
                        onChange={handleTypeChange}
                        checked={settings?.backgroundType === type}
                    />
                    {type}
                </label>
            ))}
            { settings?.backgroundType === BACKGROUND_TYPES.COLOR  && <>
                <ColorPicker color={settings?.color1} onChange={value => updateSettings({key: 'color1', value})} />
                <ColorPicker color={settings?.color2} onChange={value => updateSettings({key: 'color2', value})} />
            </>}
            { settings?.backgroundType === BACKGROUND_TYPES.IMAGE  && <>
                <TextInput 
                    type="text" 
                    placeholder="image URL" 
                    value={settings?.imageUrl} 
                    onChange={(value => updateSettings({key: 'imageUrl', value}))} 
                />
            </>}
        </Modal>
    );
};

export default SettingsModal;