import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import { useParams } from 'react-router-dom'



import './style.css'

export default function AddNote() {
    const history = useHistory();
    
    const { noteId } = useParams();

    const notas = JSON.parse(localStorage.getItem('notas'));
    const noteToEdit = notas.find((nota) => nota.noteId === noteId);

    const [noteTitle, setNoteTitle] = useState(noteToEdit.noteTitle);
    const [noteBody, setNoteBody] = useState(noteToEdit.noteBody);

    
    

    

    const handleEditNote = function addNoteToList(e) {
        e.preventDefault();
        const noteIndex = notas.indexOf(noteToEdit);

        notas.splice(noteIndex, 1, { noteId, noteTitle, noteBody});
        localStorage.setItem('notas', JSON.stringify(notas));
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
                    <h1>Edite sua nota</h1>
                    <p>Digite o novo título, o novo conteúdo da nota e pronto,
                    sua nota estará disponível para você.</p>
                </section>
                <section className="form">
                    <form onSubmit={handleEditNote}>
                        <p><input value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} placeholder="Título da nota"/></p>
                        <p><textarea value={noteBody} onChange={(e) => setNoteBody(e.target.value)} cols="30" rows="10" placeholder="Conteúdo da nota" /></p>
                        <p><button className="button__add-note">Salvar Alterações</button></p>
                    </form>
                </section>
            </div>
        </div>
    )
}