import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import PropTypes from 'prop-types'

export default function NotePageMain(props) {
  return (
    <section className='NotePageMain'>
      <Note
        id={props.note.id}
        name={props.note.note_title}
        modified={props.note.date_modified}
        deleteNote={props.deleteNote}
      />
      <div className='NotePageMain__content'>
        {props.note.note_content}
      </div>
    </section>
  )
}

NotePageMain.propTypes = {
  addNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  folders: PropTypes.array,
  newNote: PropTypes.object.isRequired,
  notes: PropTypes.array,
  updateNewNote: PropTypes.func.isRequired
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
