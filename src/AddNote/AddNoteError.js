import React from 'react';
import PropTypes from 'prop-types';

function AddNoteError (props) {
    if (props.message) {
        return (
            <div className="error-message">
                {props.message}
            </div>
        );
    }
    return <></>
}

export default AddNoteError;

AddNoteError.propTypes = {
    message: PropTypes.string
}