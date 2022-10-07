import React from "react";

export const combineComponents = (...components) => ({ children }) => {
    return components.reduce(
        (children, Parent) => <Parent>{children}</Parent>,
        children
    );
};
