import React from 'react';

class Spinner extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <img src={require('../assets/loading.svg')} alt="Загрузка..." style={{ marginTop: 50, height: '100px', width: '100px' }} />
            </div>
        );
    }
}

export default Spinner;
