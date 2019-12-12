import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers';
import './App.css';
import UserContext from '../UserContext';
import config from '../config'

class App extends Component {
    state = {
        notes: [],
        folders: [],
        newFolderName: '',
        newNote: {
            name: '',
            content: '',
            folderId: ''
        }
    };


    deleteNote = (noteId) => {
        return (
            fetch(`${config.API_ENDPOINT}/notes/${noteId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json'
                    }
                })

                .then(this.setState({ notes: this.state.notes.filter(note => note.id !== noteId) }))
                
        )
    }
    componentDidMount() {

        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([responseNote, responseFolder]) =>
                Promise.all([responseNote.json(), responseFolder.json()])
                    .then(([notes, folders]) => this.setState({ notes, folders }))
            )
    }

    updateNewFolder = (e) => {
        this.setState({
            newFolderName: e.target.value
        })
    }

    addFolder = (e) => {
        e.preventDefault();
        const body = JSON.stringify({ folder_name: this.state.newFolderName });
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: body
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error('something went wrong')
            })
            .then((data) => {
                this.setState({ folders: [...this.state.folders, data] })
            })
            .catch(err => {
                alert(`Error: ${err.message}`)
            })
    }


    updateNewNote = (e, inputName) => {
        let newNote = {...this.state.newNote, [inputName]: e.target.value}
        this.setState({
            newNote
        })
    }


    addNote = (e) => {
        e.preventDefault();
        const body = JSON.stringify(
            {
                note_title: this.state.newNote.name,
                date_modified: new Date(),
                note_content: this.state.newNote.content,
                folder_id: this.state.newNote.folderId
            }
        )
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: body
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error('something went wrong')
            })
            .then((data) => {
       
                this.setState({ notes: [...this.state.notes, data] })
            })
            .catch(err => {
                alert(`Error: ${err.message}`)
            })
    }


    renderNavRoutes() {
        const { notes, folders, newFolderName, newNote } = this.state;
        return (
            <>
                <UserContext.Provider value={{ ...this.state }}>
                    {['/', '/folder/:folderId'].map(path => (
                        <Route
                            exact
                            key={path}
                            path={path}
                            render={routeProps => (
                                <NoteListNav
                                    folders={folders}
                                    notes={notes}
                                    newFolderName={newFolderName}
                                    deleteNote={this.deleteNote}
                                    {...routeProps}
                                    updateNewFolder={this.updateNewFolder}
                                    addFolder={this.addFolder}
                                />
                            )}
                        />
                    ))}
                    <Route
                        path="/note/:noteId"
                        render={routeProps => {
                            const { noteId } = routeProps.match.params;
                            //const noteIdStr = noteId.toString()

                            const note = findNote(notes, noteId) || {};
                    
                            const folder = findFolder(folders, note.folderId);
                            return <NotePageNav
                                newNote={newNote}
                                {...routeProps}
                                folder={folder}
                                routeProps={this.routeProps}
                            />;
                        }}
                    />
                    <Route path="/add-folder" component={NotePageNav} />
                    <Route path="/add-note"/>
                </UserContext.Provider>
            </>
        );
    }

    renderMainRoutes() {
        const { notes, folders, newNote } = this.state;
        return (
            <>
                <UserContext.Provider value={{ ...this.state }}>
                    {['/', '/folder/:folderId'].map(path => (
                        <Route
                            exact
                            key={path}
                            path={path}
                            render={routeProps => {
                                const { folderId } = routeProps.match.params;
            
                                const notesForFolder = getNotesForFolder(
                                    notes,
                                    folderId
                                );
                              
                                return (
                                    <NoteListMain
                                        {...routeProps}
                                        notes={notesForFolder}
                                        deleteNote={this.deleteNote}
                                        updateNewNote={this.updateNewNote}
                                        newNote={newNote}
                                        addNote={this.addNote}
                                        folders={folders}
                                    />
                                );
                            }}
                        />
                    ))}
                    <Route
                        path="/note/:noteId"
                        render={routeProps => {
                            const { noteId } = routeProps.match.params;
                            const note = findNote(notes, noteId);
                            return <NotePageMain 
                                {...routeProps} 
                                note={note} 
                                deleteNote={this.deleteNote} 
                                updateNewNote={this.updateNewNote}
                                newNote={newNote}
                                addNote={this.addNote}
                                />;
                        }}
                    />
                </UserContext.Provider>
            </>
        );
    }

    render() {
        return (
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
        );
    }
}

export default App;