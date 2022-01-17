import React, { useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import './Home.css';
import { Grid, GridItem } from '../../components';
import { AuthContext } from '../../context';
import { Toolbar } from '../Toolbar';
import { updateWidgetConfig } from '../../db';
import { Initiative } from '../Initiative';

export const Home = () => {
    const { isLoggedIn, user } = useContext(AuthContext);
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

    const renderWidget = (type, data, id) => {
        switch(type) {
            case 'iframe':
                return <iframe src={data.url} title={data.url}></iframe>
            case 'initiative':
                return <Initiative id={id} current={data?.current} />
            default:
                return <div />
        }
    };

    return (
        <>
            {isLoggedIn ? 
                <>
                    <div className="Home">
                        <Toolbar editAll={editAll} toggleEditAll={() => setEditAll(v => !v)} />
                        <Grid>
                            {
                                widgets.map(({id, type, config, ...data}, i) => (
                                    <GridItem
                                        key={`${type}-${i}`}
                                        gridConfig={config}
                                        onConfigChange={(newConfig) => {updateWidgetConfig(id, newConfig)}}
                                        forceEdit={editAll}
                                    >
                                        {renderWidget(type, data, id)}
                                    </GridItem>
                                ))
                            }
                        </Grid>
                    </div>
                </>
            : null}
        </>
    )
}
export default Home;
