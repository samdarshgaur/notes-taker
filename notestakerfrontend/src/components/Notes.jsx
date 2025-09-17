import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-router-dom';
import './Notes.css';
// import EditNoteForm from './EditNoteForm.jsx';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null); // for view note overlay
    const [selectedDeleteNote, setSelectedDeleteNote] = useState(null); // for delete note warning overlay
    const [selectedEditNote, setSelectedEditNote] = useState(null); // for edit note form overlay
    // states for edit note form
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedContent, setUpdatedContent] = useState("");

    // fetch notes handler
    const fetchNotesHandler = () => {
        axios.get("http://localhost:8000/api/notes/")
            .then((res) => {
                setNotes(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setLoading(false);
            });
    }

    // delete note handler
    const deleteNoteHandler = (noteId) => {
        axios.delete(`http://localhost:8000/api/notes/${noteId}/`)
            .then((res) => {
                // remove the deleted note from UI without refreshing
                setNotes(notes.filter(note => note.id !== noteId));
                setSelectedDeleteNote(null);
            })
            .catch((error) => {
                console.error("Error deleting note: ", error);
            });
    }

    // edit note handler
    const editNoteHandler = async (e, noteId) => {
        e.preventDefault();
        setLoading(true);

        const editedNoteData = { title: updatedTitle, content: updatedContent };

        axios.put(`http://localhost:8000/api/notes/${noteId}/`, editedNoteData)
            .then((res) => {
                // note = old note; res.data = new note
                setNotes((prevNotes) => prevNotes.map((note) => note.id === noteId ? { ...note, ...res.data } : note));
                setSelectedEditNote(null);
            })
            .catch((error) => {
                console.error("Error editing note: ", error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    // useEffect: load and fetch notes
    useEffect(() => {
        setLoading(true);
        fetchNotesHandler();
    }, []);

    return (
        <div>
            <h1 className='saved-notes-header'>My Notes</h1>
            {loading && <p className='loader'>Loading notes...</p>}
            <ul className='notes'>
                {
                    notes.map((note) => (
                        <li className='note' key={note.id}>
                            <h2 className='title'>{note.title}</h2>
                            <p className='content'>
                                {note.content.substring(0, 100)}
                                {note.content.substring(0, 100).length > 99 &&
                                    <span onClick={() => setSelectedNote(note)} className='read-more-btn'>read more...</span>}
                            </p>
                            <div className='edit-del-btns'>
                                <button id='delete-btn' onClick={() => setSelectedDeleteNote(note)}>Delete</button>
                                <button
                                    id='edit-btn'
                                    onClick={() => {
                                        setSelectedEditNote(note);
                                        setUpdatedTitle(note.title); // pre-fill title
                                        setUpdatedContent(note.content); // pre-fill content
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        </li>
                    ))
                }
            </ul>

            {/* view complete note overlay */}
            {selectedNote && (
                <div className="overlay">
                    <div className="overlay-note">
                        <h2>{selectedNote.title}</h2>
                        <p>{selectedNote.content}</p>
                        <button onClick={() => setSelectedNote(null)}>Close</button>
                    </div>
                </div>
            )}

            {/* delete note warning overlay */}
            {selectedDeleteNote && (
                <div className='overlay'>
                    <div className='delete-note-overlay'>
                        <h3>Do you want to delete this note?</h3>
                        <h4>{selectedDeleteNote.title} : {selectedDeleteNote.id}</h4>
                        <div className='btns'>
                            <button
                                onClick={() => deleteNoteHandler(selectedDeleteNote.id)}
                                className='delete-note-btn'
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setSelectedDeleteNote(null)}
                                className='cancel-btn'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* edit note form overlay */}
            {selectedEditNote && (
                // <EditNoteForm
                //     editNoteHandler={editNoteHandler}
                //     setSelectedEditNote={setSelectedEditNote}
                //     selectedEditNote={selectedEditNote}
                //     setUpdatedTitle={setUpdatedTitle}
                //     setUpdatedContent={setUpdatedContent}
                //     loading={loading}
                // />
                <div className='overlay'>
                    <div className='edit-note-form-container'>
                        <h1 className='edit-form-header'>Edit Note <span>📝</span></h1>
                        <Form className='edit-note-form' action="" onSubmit={(e) => editNoteHandler(e, selectedEditNote.id)}>
                            <div className='edit-title-container'>
                                <label htmlFor="title">Title</label>
                                <br />
                                <input
                                    type="text"
                                    id="title"
                                    value={updatedTitle}
                                    onChange={(e) => setUpdatedTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='edit-content-container'>
                                <label htmlFor="content">Content</label>
                                <br />
                                <textarea
                                    type="text"
                                    id="content"
                                    value={updatedContent}
                                    onChange={(e) => setUpdatedContent(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='edit-form-btns'>
                                <button
                                    type='submit'
                                    className='edit-btn'
                                    disabled={loading}
                                >
                                    {loading ? "Saving..." : "Edit Note"}
                                </button>
                                <button
                                    type='button'
                                    className='cancel-btn'
                                    onClick={() => setSelectedEditNote(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Notes;