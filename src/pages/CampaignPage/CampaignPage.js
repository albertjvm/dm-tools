import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import './CampaignPage.scss';
import { Icon, Page } from '../../components';

export const CampaignPage = () => {
    const { campaignId } = useParams();
    const [ campaign, setCampaign ] = useState({});

    useEffect(() => {
        const unsubCampaign = onSnapshot(doc(db, "campaigns", campaignId), doc => 
            setCampaign(doc.data())
        );

        return () => {
            unsubCampaign();
        };
    }, [campaignId]);

    return (
        <Page className="CampaignPage">
            <div className='body'>
                <h2>{campaign?.name}</h2>
                <Outlet />
            </div>
            <footer>
                <Link to="party">
                    <Icon name="users" />
                </Link>
                <Link to="initiative">
                    <Icon name="arrow-down-short-wide"/>
                </Link>
            </footer>
        </Page>
    );
};