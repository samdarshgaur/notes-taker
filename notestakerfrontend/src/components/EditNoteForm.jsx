import React, { useState } from 'react';
import { Form } from 'react-router-dom';

const EditNoteForm = ({ editNoteHandler, setSelectedEditNote, selectedEditNote, setUpdatedTitle, setUpdatedContent, loading }) => {
    return (
        <div className='overlay'>
            <div className='edit-note-form-container'>
                <h1>Edit Note <span>📝</span></h1>
                <div>
                    <Form className='edit-note-form' action="" onSubmit={editNoteHandler(selectedEditNote.id)}>
                        <div className='edit-title-container'>
                            <label htmlFor="title">Title</label>
                            <br />
                            <input
                                type="text"
                                id="title"
                                value={selectedEditNote.title}
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
                                value={selectedEditNote.content}
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
                                onClick={() => setSelectedEditNote(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default EditNoteForm;