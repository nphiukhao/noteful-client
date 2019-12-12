import React from 'react';
import PropTypes from 'prop-types';

function AddFolderError (props) {
    if (props.message) {
        return (
            <div className="error-message">
                {props.message}
            </div>
        );
    }
    return <></>
}

export default AddFolderError;

AddFolderError.propTypes = {
    message: PropTypes.string
}