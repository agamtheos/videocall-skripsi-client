import { useState } from "react";

const useToggleState = (initialState) => {
    const [state, setState] = useState(initialState);

    const toggleState = () => {
        setState((prevState) => !prevState);
    };

    return [state, toggleState];
};

export default useToggleState;
