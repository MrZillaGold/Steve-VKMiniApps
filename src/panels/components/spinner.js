import React from 'react';
import IconChest from "./icons/chest";

class Spinner extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 50 }}>
                <IconChest/>
            </div>
        );
    }
}

export default Spinner;
