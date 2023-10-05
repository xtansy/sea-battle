import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistedStore } from "./store";
import { Routing } from "./routing";
import "../shared/base.css";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistedStore}>
                    <Routing />
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
