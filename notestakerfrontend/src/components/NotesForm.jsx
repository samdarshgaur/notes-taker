import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, useNavigate } from 'react-router-dom';
import './NotesForm.css';

const NotesForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // save note handler
    const saveNoteHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const noteData = { title: title, content: content };
        axios.post('http://localhost:8000/api/notes/', noteData)
            .then((res) => {
                console.log("Response:", res.data);
                setLoading(false);
                navigate("/notes");
            })
            .catch((error) => {
                console.log("Error:", error);
                setLoading(false);
            })
    }

    return (
        <div className='form-page'>
            <h1 className='create-note-header'>Let's take some notes... <span>📝</span></h1>
            <div className='notes-form-container'>
                <Form className='notes-form' action="" onSubmit={saveNoteHandler}>
                    <div className='title-container'>
                        <label htmlFor="title">Title</label>
                        <br />
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className='content-container'>
                        <label htmlFor="content">Content</label>
                        <br />
                        <textarea
                            type="text"
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                    <button className='save-btn' disabled={loading}>{loading ? "Saving..." : "Save Note"}</button>
                    {loading && <p>Saving note...</p>}
                </Form>
            </div>
        </div>
    )
}

export default NotesForm;