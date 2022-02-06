import React, { useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import './Home.scss';
import { Grid, GridItem, Toolbar } from '../../components';
import { Widget } from '../../components/widgets';
import { AuthContext, CampaignContext, ModalContext, SettingsContext } from '../../context';
import { updateWidgetConfig } from '../../db';
import { Snackbar } from '../Snackbar/Snackbar';

export const Home = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const { activeCampaign } = useContext(CampaignContext);
    const { modalStack } = useContext(ModalContext);
    const { settings = {} } = useContext(SettingsContext);
    const [widgets, setWidgets] = useState([]);
    const [editAll, setEditAll] = useState(false);

    useEffect(() => {
        if(activeCampaign) {
            const unsubscribe = firebase
                .firestore()
                .collection('widgets')
                .where('campaignId', '==', activeCampaign?.id)
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
    }, [activeCampaign]);

    const deleteWidget = (id) => {
        firebase
            .firestore()
            .collection('widgets')
            .doc(id)
            .delete();
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
                                widgets.map(({id, name, type, config, ...data}, i) => (
                                    <GridItem
                                        key={`${type}-${i}`}
                                        gridConfig={config}
                                        onConfigChange={(newConfig) => {updateWidgetConfig(id, newConfig)}}
                                        forceEdit={editAll}
                                        onDelete={() => deleteWidget(id)}
                                    >
                                        <Widget id={id} type={type} name={name} data={data} />
                                    </GridItem>
                                ))
                            }
                        </Grid>
                    </div>
                    <Snackbar />
                    {modalStack}
                </>
            : null}
        </>
    )
}
export default Home;
