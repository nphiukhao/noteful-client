import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
import UserContext from '../UserContext';
import PropTypes from 'prop-types';

export default class NotePageNav extends Component {

  static contextType = UserContext;

  static defaultProps = {
    history: {
      goBack: () => {}
    }
  }

  render() {
    const { folders } = this.context;
   return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
        {folders && (
          <h3 className='NotePageNav__folder-name'>
            {folders.name}
          </h3>
        )}
      </div>
    )
  }
}

NotePageNav.propTypes = {
  folder: PropTypes.object,
  newNote: PropTypes.object
}