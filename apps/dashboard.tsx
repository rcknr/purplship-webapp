import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import RestClientContext from '@/context/rest';
import GraphClientContext, { graphqlClient } from '@/context/graphql';
import FeatureFlagsContext from '@/context/feature-flags';
import { Router } from "@reach/router";
import ShipmentPage from '@/views/shipments';
import TrackersPage from '@/views/trackers';
import ConnectionsPage from '@/views/connections';
import AddressesPage from '@/views/addresses';
import ParcelsPage from '@/views/parcels';
import APILogPage from '@/views/api-logs';
import Account from '@/views/account';
import APISettings from '@/views/api-settings';
import WebhooksPage from '@/views/webhooks';
import CustomsInfoPage from '@/views/customs-infos';
import UserQuery from '@/context/user-query';
import TokenQuery from '@/context/token-query';
import APIReferenceQuery from '@/context/references-query';
import AddressTemplatesQuery from '@/context/address-templates-query';
import ParcelTemplatesQuery from '@/context/parcel-templates-query';
import CustomInfoTemplatesQuery from '@/context/customs-templates-query';
import TemplatesQuery from '@/context/default-templates-query';
import ShipmentsQuery from '@/context/shipments-query';
import WebhooksQuery from '@/context/webhooks-query';
import TrackersQuery from '@/context/trackers-query';
import UserConnectionsQuery from '@/context/user-connections-query';
import SystemConnectionsQuery from '@/context/system-connections-query';
import LabelDataQuery from '@/context/shipment-query';
import OrganizationsQuery from '@/context/organizations-query';
import ExpandedSidebar from '@/components/sidebars/expanded-sidebar';
import LabelCreator from '@/components/label/label-creator';
import Navbar from '@/components/navbar/navbar';
import Loader from '@/components/loader';
import Notifier from '@/components/notifier';
import LocationTitle from '@/components/location-title';
import ShipmentDetails from '@/components/descriptions/shipment-details';
import AppModeProvider, { computeBasePath } from '@/context/app-mode';
import '@/style/dashboard.scss';
import 'highlight.js/styles/stackoverflow-light.css';


const DATA_CONTEXTS = [
    AddressTemplatesQuery,
    CustomInfoTemplatesQuery,
    ParcelTemplatesQuery,
    APIReferenceQuery,
    ShipmentsQuery,
    WebhooksQuery,
    LabelDataQuery,
    TrackersQuery,
    UserConnectionsQuery,
    SystemConnectionsQuery,
    TemplatesQuery,
    Loader,
    Notifier,
    AppModeProvider,

    UserQuery,
    GraphClientContext,
    RestClientContext,
    OrganizationsQuery,
    FeatureFlagsContext,
    TokenQuery,
];


const DashboardContexts: React.FC = ({ children }) => {
    const NestedContexts = DATA_CONTEXTS.reduce((_, Ctx) => <Ctx>{_}</Ctx>, children);

    return (
        <>
            <ApolloProvider client={graphqlClient}>{NestedContexts}</ApolloProvider>
        </>
    );
};

const Dashboard: React.FC = () => {
    return (
        <DashboardContexts>
            <LocationTitle />
            <ExpandedSidebar />

            <div className="plex-wrapper pb-6">
                <div className="wrapper-inner mb-6">
                    <Notifier />
                    <Navbar />

                    <div className="dashboard-content" style={{ position: 'relative' }}>
                        <Router basepath={computeBasePath()}>
                            <ShipmentPage path="/" />
                            <TrackersPage path="trackers" />

                            <AddressesPage path="configurations/addresses" />
                            <ConnectionsPage path="configurations/carriers" />
                            <ParcelsPage path="configurations/parcels" />
                            <CustomsInfoPage path="configurations/customs_infos" />

                            <Account path="settings/account" />
                            <APILogPage path="api_logs/*" />
                            <APISettings path="settings/api" />
                            <WebhooksPage path="settings/webhooks" />
                            <LabelCreator path="buy_label/:id" />
                            <ShipmentDetails path="shipments/:id" />
                        </Router>
                    </div>

                </div>
            </div>

        </DashboardContexts>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Dashboard />
    </React.StrictMode>,
    document.getElementById('root')
);