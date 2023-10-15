import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as ModalProvider } from "@ebay/nice-modal-react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { store, persistedStore } from "./store";
import { Routing } from "./routing";
import "../shared/base.css";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <ModalProvider>
            <BrowserRouter>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistedStore}>
                        <DndProvider backend={HTML5Backend}>
                            <Routing />
                        </DndProvider>
                    </PersistGate>
                </Provider>
            </BrowserRouter>
        </ModalProvider>
    </React.StrictMode>
);
