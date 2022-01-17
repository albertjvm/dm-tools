import React, { useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import './Home.css';
import { Grid, GridItem } from '../../components';
import { AuthContext, ModalContext } from '../../context';
import { Toolbar } from '../Toolbar';
import { updateWidgetConfig } from '../../db';
import { Initiative } from '../Initiative';
import { Modal } from '../Modal';
import { PartyModal } from '../PartyModal';

export const Home = () => {
    const { isLoggedIn, user } = useContext(AuthContext);
    const { activeModal, MODALS } = useContext(ModalContext);
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
            default:
                return <div />
        }
    };

    const renderModal = () => {
        switch(activeModal) {
            case MODALS.PARTY:
                return <PartyModal />
            default:
                return null;
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
                                        onDelete={() => deleteWidget(id)}
                                    >
                                        {renderWidget(type, data, id)}
                                    </GridItem>
                                ))
                            }
                        </Grid>
                    </div>
                    {renderModal()}
                </>
            : null}
        </>
    )
}
export default Home;
