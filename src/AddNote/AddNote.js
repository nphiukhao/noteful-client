import React from 'react';
import AddNoteError from './AddNoteError';
import PropTypes from 'prop-types';
import './AddNote.css'

export default class AddNote extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name: {
                 touched: false
             },
             content: {
                touched: false
            }
        }
    }
    
    setNameTouched = (e) => {
        this.setState({
            name: {
                touched: true
            }
        })
    }

    setContentTouched = (e) => {
        this.setState({
            content: {
                touched: true
            }
        })
    }

    
    validateNoteName = () => {
        const name = this.props.newNote.name.trim();

        if(name.length === 0) {
            return 'Please enter a name';
        } else if(name.length < 2) {
            return 'Please enter a note that is longer than 2 characters';
        }
    }

    validateNoteContent = () => {
        const content = this.props.newNote.content.trim();

        if(content.length === 0) {
            return 'Please enter description';
        } else if(content.length < 3 || content.length > 80) {
            return 'Please enter a description that is between 3 and 80 characters';
        }
    }

    validateNoteFolderId = () => {
        const folderId = this.props.newNote.folderId.trim();

        if(folderId.length === 0) {
            return 'Please select a valid folder';
        }
    }


    render() {
        let noteNameError = this.validateNoteName();
        let contentError = this.validateNoteContent();
        let folderIdError=this.validateNoteFolderId();
        return (
            <div className="addNoteForm">
                <form onSubmit={(e) => this.props.addNote(e)}>
                    <div className="note-name">
                        <label htmlFor="note-name" className="add-note-label">Please enter note name</label>
                        <br />
                        <input type="text" id="note-name" name="note-name" value={this.props.newNote.name}
                        onChange={(e) => {
                            this.props.updateNewNote(e, 'name');
                            this.setNameTouched(e);
                        }}></input>
                        {this.state.name.touched && <AddNoteError message={noteNameError} />}
                    </div>
                    <div className="note-content">
                        <label htmlFor="note-content" className="add-note-label">Please enter note's content</label>
                        <br />
                        <input type="text" id="note-content" name="note-content" value={this.props.newNote.content}
                        onChange={(e) => {
                        this.props.updateNewNote(e, 'content');
                        this.setContentTouched(e);
                        }}></input>
                        {this.state.content.touched && <AddNoteError message={contentError} />}
                    </div>
                    <div className="note-folderId">
                        <label htmlFor="folder-names" className="add-note-label">Please select a folder</label>
                        <br />
                        <select 
                          name="folder-names" 
                          id="folder-names"
                          value={this.props.newNote.folderId}
                          onChange={(e) => {
                              this.props.updateNewNote(e, 'folderId');
                          }}
                          >
                            <option value="">Select folder...</option>
                        {this.props.folders.map(folder => <option className='add-note-options' value={folder.id} key={folder.id}>{folder.folder_name}</option>)}
                        </select>
                        <AddNoteError message={folderIdError} />
                    </div>
                    <div className="button-div">
                        <button type="submit" disabled={noteNameError || contentError || folderIdError}>Submit Note</button>
                    </div>
                </form>
            </div>
        )
    }
}

AddNote.propTypes = {
    addNote: PropTypes.func.isRequired,
    folders: PropTypes.arrayOf(PropTypes.object).isRequired,
    newNote: PropTypes.object.isRequired,
    updateNewNote: PropTypes.func.isRequired
}