import React, { useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import './Home.scss';
import { DamageTracker, Grid, GridItem, Initiative, Toolbar, PartySearch } from '../../components';
import { AuthContext, ModalContext, SettingsContext } from '../../context';
import { updateWidgetConfig } from '../../db';
import { WordGenerator } from '../WordGenerator';

export const Home = () => {
    const { isLoggedIn, user } = useContext(AuthContext);
    const { modalStack } = useContext(ModalContext);
    const { settings = {} } = useContext(SettingsContext);
    const [widgets, setWidgets] = useState([]);
    const [editAll, setEditAll] = useState(false);

    useEffect(() => {
        if(isLoggedIn && user) {
            const unsubscribe = firebase
                .firestore()
                .collection('widgets')
                .where('userId', '==', user?.uid)
                .onSnapshot(
                    snapshot => {
                        setWidgets(snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        })));
                    }
                );

            return () => unsubscribe();
        }
    }, [isLoggedIn, user]);

    const deleteWidget = (id) => {
        firebase
            .firestore()
            .collection('widgets')
            .doc(id)
            .delete();
    };

    const renderWidget = (type, data, id) => {
        switch(type) {
            case 'iframe':
                return <iframe src={data.url} title={data.url}></iframe>
            case 'initiative':
                return <Initiative id={id} current={data?.current} />
            case 'partysearch':
                return <PartySearch id={id} activeSearch={data?.activeSearch} />
            case 'damagetracker':
                return <DamageTracker id={id} />
            case 'wordgenerator':
                return <WordGenerator id={id} count={data?.count} />
            default:
                return <div />
        }
    };

    const backgroundStyle = () => {
        const { backgroundType = 'color', color1 = 'black', color2 = '#345', imageUrl } = settings;

        if (backgroundType === 'color') {
            return {
                background: `linear-gradient(20deg, ${color1} 0%, ${color2} 100%)`
            };
        } else if (backgroundType === 'image') {
            return {
                backgroundImage: `url(${imageUrl})`
            }
        }
    };

    return (
        <>
            {isLoggedIn ? 
                <>
                    <div className="Home" style={backgroundStyle()}>
                        <Toolbar editAll={editAll} toggleEditAll={() => setEditAll(v => !v)} />
                        <Grid>
                            {
                                widgets.map(({id, type, config, ...data}, i) => (
                                    <GridItem
                                        key={`${type}-${i}`}
                                        gridConfig={config}
                                        onConfigChange={(newConfig) => {updateWidgetConfig(id, newConfig)}}
                                        forceEdit={editAll}
                                        onDelete={() => deleteWidget(id)}
                                    >
                                        {renderWidget(type, data, id)}
                                    </GridItem>
                                ))
                            }
                        </Grid>
                    </div>
                    {modalStack}
                </>
            : null}
        </>
    )
}
export default Home;
