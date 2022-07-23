import React from 'react';

type Props = {};

const Spinner = (props: Props) => {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className='sr-only' />
            </div>
        </div>
    );
};

export default Spinner;
