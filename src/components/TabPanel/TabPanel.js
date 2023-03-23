import { useState } from 'react';
import './TabPanel.scss';
import { Icon } from '../Icon';

export const TabPanel = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="TabPanel">
            <div className='tabbar'>
                {tabs.map(({ icon }, i) => (
                    <Icon
                        key={`tab-${i}`}
                        name={icon}
                        className={activeTab === i ? 'active' : ''}
                        onClick={() => setActiveTab(i)}
                    />
                ))}
            </div>
            <div className='body'>
                {tabs[activeTab].component}
            </div>
        </div>
    );
};