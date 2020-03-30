import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import { uuid } from 'uuidv4';

import './style.css'

export default function AddNote() {
    const notas = [];
    const [noteTitle, setNoteTitle] = useState('');
    const [noteBody, setNoteBody] = useState('')

    const history = useHistory();
    
    
    const handleAddNote = function addNoteToList(e) {
        e.preventDefault();
        const noteId = uuid();
        const newNote = { noteId, noteTitle, noteBody }
        if(localStorage.getItem('notas')) {
            let oldNotes = JSON.parse(localStorage.getItem('notas'));
            oldNotes = [...oldNotes, newNote];
            localStorage.setItem('notas', JSON.stringify(oldNotes));
        }
        else {
            notas.push(newNote);
            localStorage.setItem('notas', JSON.stringify(notas))
        }

        setNoteBody('');
        setNoteTitle('');
        history.push('/');
    }

    return(
        <div className="note-container">
            <header>
                <div className="header-left">
                <h1>Notes</h1>
                <span>Salve suas notas sem complicações.</span>
                </div>
                <section className="header-right">
                <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#a8a8b3" />
                        Voltar
                    </Link>
            </section>
            </header>

            <div className="form-container">
                <section className="left-section">
                    <h1>Adicione uma nova nota</h1>
                    <p>Digita o título, o conteúdo da nota e pronto,
                    sua nota estará disponível para você.</p>
                </section>
                <section className="form">
                    <form onSubmit={handleAddNote}>
                        <p><input value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} placeholder="Título da nota"/></p>
                        <p><textarea value={noteBody} onChange={(e) => setNoteBody(e.target.value)} cols="30" rows="10" placeholder="Conteúdo da nota" /></p>
                        <p><button className="button__add-note">Adicionar nota</button></p>
                    </form>
                </section>
            </div>
        </div>
    )
}