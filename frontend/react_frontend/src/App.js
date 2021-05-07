// <<<<<<<< React libraries >>>>>>>>
import React from "react";

// <<<<<<<< Css files >>>>>>>>
import './App.css';
import './App_Style.css';

// <<<<<<<< Contexts >>>>>>>>
import { GlobalContextProvider } from "context/GlobalContext";
import { UserContextProvider } from './context/UserContext';
import { PeerContext } from './context/PeerContext';

// <<<<<<<< Main files >>>>>>>>
import ClientMain from "Client.Main";
import PanelAdminMain from "Admin.Main";

// <<<<<<<< Hooks >>>>>>>>
import useUser from "hooks/useUser";


export default function App() {
    return (
        <GlobalContextProvider>
            <PeerContext>
                <UserContextProvider>
                    <main className="App">
                        <PanelAdminSwitch />
                    </main>
                </UserContextProvider>
            </PeerContext>
        </GlobalContextProvider>
    );
}

const PanelAdminSwitch = () => {
    const { adminPanel } = useUser()
    return adminPanel === 'true' ? <PanelAdminMain /> : <ClientMain />
}