import { CreditProvider } from "./credit/CreditContext";
import { UiControlsProvider } from "./ui/UiControls";
import { InputProvider } from "./input/index";

import { combineComponents } from "./combineComponents";

const components = [
    CreditProvider,
    UiControlsProvider,
    InputProvider
];

export const ContextProvider = combineComponents(...components);
