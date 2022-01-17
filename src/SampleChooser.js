import React, {useState, useEffect} from 'react';
import classnames from 'classnames';
import {saveChoice, getChoice} from './db';
import './SampleChooser.css';

export const SampleChooser = () => {
    const options = ['red', 'green', 'blue'];
    const [selected, setSelected] = useState(null);

    const handleClick = (choice) => {
        setSelected(choice);
        saveChoice(choice);
    };

    useEffect(() => {
        const response = getChoice();
        if (response) {
            response.then(result => {
                setSelected(result.data()?.choice);
            });
        }
    });

    return (
        <div className="SampleChooser">
            {
                options.map(c => (
                    <div 
                        key={c}
                        className={classnames("Option", {selected: selected == c})}
                        style={{
                            backgroundColor: c
                        }}
                        onClick={() => handleClick(c)}
                    >

                    </div>
                ))
            }
        </div>
    );
};
export default SampleChooser;
