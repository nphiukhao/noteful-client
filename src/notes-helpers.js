
export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.folder_id === folderId)

export const findNote = (notes=[], noteId) =>
  notes.find(note => 
    {
      const noteid = parseInt(noteId, 10)
        return (
        note.id == noteid
        )
      
    })

export const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => {
      return note.folder_id == folderId
    })
)

export const countNotesForFolder = (notes=[], folderId) =>
  notes.filter(note => note.folder_id === folderId).length
