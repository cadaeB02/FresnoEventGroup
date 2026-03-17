'use client';

import { useState, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import styles from './FeedbackWidget.module.css';

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [category, setCategory] = useState('general');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const pathname = usePathname();
  const textareaRef = useRef(null);

  // Load notes from localStorage on mount
  const loadNotes = useCallback(() => {
    try {
      const saved = localStorage.getItem('feg-feedback-notes');
      if (saved) setNotes(JSON.parse(saved));
    } catch (e) {
      console.error('Error loading notes:', e);
    }
  }, []);

  const saveNotes = useCallback((updatedNotes) => {
    localStorage.setItem('feg-feedback-notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  }, []);

  const handleOpen = () => {
    if (!isOpen) loadNotes();
    setIsOpen(!isOpen);
  };

  const addNote = () => {
    if (!currentNote.trim()) return;
    const newNote = {
      id: Date.now(),
      text: currentNote.trim(),
      page: pathname,
      category,
      timestamp: new Date().toLocaleString(),
    };
    const updated = [...notes, newNote];
    saveNotes(updated);
    setCurrentNote('');
    setCategory('general');
    if (textareaRef.current) textareaRef.current.focus();
  };

  const deleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id);
    saveNotes(updated);
  };

  const clearAllNotes = () => {
    if (confirm('Clear all notes? This cannot be undone.')) {
      saveNotes([]);
    }
  };

  const formatNotesForText = () => {
    if (notes.length === 0) return 'No notes yet.';
    const grouped = {};
    notes.forEach(note => {
      if (!grouped[note.page]) grouped[note.page] = [];
      grouped[note.page].push(note);
    });

    let message = 'FEG Site Review Notes\n\n';
    Object.entries(grouped).forEach(([page, pageNotes]) => {
      message += `Page: ${page}\n`;
      pageNotes.forEach(note => {
        const icon = note.category === 'love' ? '[love]' : note.category === 'change' ? '[change]' : note.category === 'remove' ? '[remove]' : '[note]';
        message += `  ${icon} ${note.text}\n`;
      });
      message += '\n';
    });
    return message;
  };

  const sendToText = async () => {
    const message = formatNotesForText();

    // Try Web Share API first (works great on mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FEG Site Review Notes',
          text: message,
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        return;
      } catch (e) {
        // User cancelled or share failed, fall through to SMS
      }
    }

    // Fallback: open SMS with pre-filled message
    const encoded = encodeURIComponent(message);
    window.open(`sms:2096949503?&body=${encoded}`, '_blank');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const categoryIcons = {
    general: '[note]',
    love: '[love]',
    change: '[change]',
    remove: '[remove]',
  };

  const currentPageNotes = notes.filter(n => n.page === pathname);
  const otherNotes = notes.filter(n => n.page !== pathname);

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`${styles.toggleBtn} ${isOpen ? styles.toggleOpen : ''}`}
        onClick={handleOpen}
        aria-label="Leave Feedback"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            {notes.length > 0 && (
              <span className={styles.badge}>{notes.length}</span>
            )}
          </>
        )}
      </button>

      {/* Panel */}
      <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}>
        <div className={styles.panelHeader}>
          <div>
            <h3 className={styles.panelTitle}>Review Notes</h3>
            <p className={styles.panelSubtitle}>Hi Cindy! Leave your feedback here.</p>
          </div>
          {notes.length > 0 && (
            <button onClick={clearAllNotes} className={styles.clearBtn} title="Clear all notes">
              Clear All
            </button>
          )}
        </div>

        {/* Add Note Form */}
        <div className={styles.addForm}>
          <div className={styles.categoryPicker}>
            {Object.entries(categoryIcons).map(([key, icon]) => (
              <button
                key={key}
                className={`${styles.categoryBtn} ${category === key ? styles.categoryActive : ''}`}
                onClick={() => setCategory(key)}
                title={key}
              >
                {icon}
              </button>
            ))}
          </div>
          <div className={styles.inputRow}>
            <textarea
              ref={textareaRef}
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="Type your note about this page..."
              className={styles.textarea}
              rows={2}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  addNote();
                }
              }}
            />
            <button onClick={addNote} className={styles.addBtn} disabled={!currentNote.trim()}>
              Add
            </button>
          </div>
          <p className={styles.pageLabel}>
            Noting on: <strong>{pathname}</strong>
          </p>
        </div>

        {/* Notes List */}
        <div className={styles.notesList}>
          {currentPageNotes.length > 0 && (
            <div className={styles.notesSection}>
              <h4 className={styles.notesSectionTitle}>This Page</h4>
              {currentPageNotes.map(note => (
                <div key={note.id} className={styles.noteItem}>
                  <span className={styles.noteIcon}>{categoryIcons[note.category]}</span>
                  <div className={styles.noteContent}>
                    <p className={styles.noteText}>{note.text}</p>
                    <span className={styles.noteTime}>{note.timestamp}</span>
                  </div>
                  <button onClick={() => deleteNote(note.id)} className={styles.deleteBtn}>×</button>
                </div>
              ))}
            </div>
          )}

          {otherNotes.length > 0 && (
            <div className={styles.notesSection}>
              <h4 className={styles.notesSectionTitle}>Other Pages</h4>
              {otherNotes.map(note => (
                <div key={note.id} className={styles.noteItem}>
                  <span className={styles.noteIcon}>{categoryIcons[note.category]}</span>
                  <div className={styles.noteContent}>
                    <p className={styles.noteText}>{note.text}</p>
                    <span className={styles.noteMeta}>{note.page} • {note.timestamp}</span>
                  </div>
                  <button onClick={() => deleteNote(note.id)} className={styles.deleteBtn}>×</button>
                </div>
              ))}
            </div>
          )}

          {notes.length === 0 && (
            <div className={styles.emptyState}>
              <p>No notes yet! Browse the site and leave your thoughts.</p>
            </div>
          )}
        </div>

        {/* Send Button */}
        {notes.length > 0 && (
          <div className={styles.sendSection}>
            <button onClick={sendToText} className={styles.sendBtn} disabled={isSending}>
              {showSuccess ? (
                'Sent!'
              ) : (
                <>Send Notes to Cade</>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
