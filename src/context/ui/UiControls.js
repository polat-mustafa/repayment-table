import { useState, createContext, useContext } from "react";

const UiControlsContext = createContext();

export const UiControlsProvider = ({ children }) => {
        
    const [uiControls, setUiControls] = useState({
        
        // Header
        header: {
            logo: {
                src: "https://avatars.githubusercontent.com/u/70276265?v=4",
                width: "50",
                height: "50",
                alt: ""
            },
            nav: {
                links: [
                    {
                        href: "https://github.com/polat-mustafa",
                        target: "blanck",
                        text: "Home"
                    }
                ]
            }
        },
        
    });
    
    return (
        <UiControlsContext.Provider value={{ uiControls, setUiControls }}>
            {children}
        </UiControlsContext.Provider>
    )

}

export const useUiControls = () => useContext(UiControlsContext);



