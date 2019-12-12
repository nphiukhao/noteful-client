import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import { countNotesForFolder } from "../notes-helpers";
import "./NoteListNav.css";
import AddFolder from "../AddFolder/AddFolder";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import PropTypes from 'prop-types';

export default class NoteListNav extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       showForm: false
    }
  }
  
  updateShowForm = (e) => {
    e.preventDefault();
    this.setState({
      showForm: !this.state.showForm
    })
  }

  addFolder = (e) => {
    this.props.addFolder(e)
    this.setState({
      showForm: false
    })
  }

  render() {

    return (
      <div className="NoteListNav">
        <ul className="NoteListNav__list">
          {this.props.folders.map(folder => (
            <li key={folder.id}>
              <NavLink
                className="NoteListNav__folder-link"
                to={`/folder/${folder.id}`}
              >
                <span className="NoteListNav__num-notes">
                  {countNotesForFolder(this.props.notes, folder.id)}
                </span>
                {folder.folder_name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="NoteListNav__button-wrapper">
          <CircleButton
            type="button"
            className="NoteListNav__add-folder-button"
            onClick={(e) => this.updateShowForm(e)}
          >
            <FontAwesomeIcon icon="plus" />
            <br />
            Folder
          </CircleButton>
          <ErrorBoundary>
            {this.state.showForm && <AddFolder
              newFolderName={this.props.newFolderName}
              updateNewFolder={this.props.updateNewFolder}
              addFolder={this.addFolder}
            />}
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

NoteListNav.propTypes = {
  addFolder: PropTypes.func.isRequired,
  folders: PropTypes.array,
  newNote: PropTypes.object,
  notes: PropTypes.array,
  updateNewFolder: PropTypes.func.isRequired
}

NoteListNav.defaultProps = {
  folders: []
};