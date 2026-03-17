'use client';

import { useState, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import styles from './FeedbackWidget.module.css';

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [category, setCategory] = useState('bug');
  const [reviewer, setReviewer] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const pathname = usePathname();
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const reviewers = [
    { key: 'cindy', name: 'Cindy', initials: 'CB' },
    { key: 'barb', name: 'Barb', initials: 'BT' },
    { key: 'nicole', name: 'Nicole', initials: 'NT' },
  ];

  const currentReviewer = reviewers.find(r => r.key === reviewer);

  const loadNotes = useCallback(() => {
    try {
      const saved = localStorage.getItem('feg-feedback-notes');
      if (saved) setNotes(JSON.parse(saved));
      const savedReviewer = localStorage.getItem('feg-reviewer');
      if (savedReviewer) setReviewer(savedReviewer);
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

  const selectReviewer = (key) => {
    setReviewer(key);
    localStorage.setItem('feg-reviewer', key);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Compress and convert to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxW = 800;
        const maxH = 600;
        let w = img.width;
        let h = img.height;
        if (w > maxW) { h = (maxW / w) * h; w = maxW; }
        if (h > maxH) { w = (maxH / h) * w; h = maxH; }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const compressed = canvas.toDataURL('image/jpeg', 0.7);
        setImageData(compressed);
        setImagePreview(compressed);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageData(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const addNote = () => {
    if (!currentNote.trim() || !reviewer) return;
    const newNote = {
      id: Date.now(),
      text: currentNote.trim(),
      page: pathname,
      category,
      reviewer: currentReviewer?.name || reviewer,
      timestamp: new Date().toLocaleString(),
      image: imageData || null,
    };
    const updated = [...notes, newNote];
    saveNotes(updated);
    setCurrentNote('');
    setCategory('bug');
    removeImage();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    if (textareaRef.current) textareaRef.current.focus();
  };

  const deleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id);
    saveNotes(updated);
  };

  const clearAllNotes = () => {
    if (confirm('Clear all reports? This cannot be undone.')) {
      saveNotes([]);
    }
  };

  const categoryLabels = {
    bug: 'Bug',
    change: 'Change',
    love: 'Love it',
    note: 'Note',
  };

  const categoryColors = {
    bug: '#E53E3E',
    change: '#D69E2E',
    love: '#38A169',
    note: '#718096',
  };

  const currentPageNotes = notes.filter(n => n.page === pathname);
  const otherNotes = notes.filter(n => n.page !== pathname);
  const bugCount = notes.filter(n => n.category === 'bug').length;

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`${styles.toggleBtn} ${isOpen ? styles.toggleOpen : ''}`}
        onClick={handleOpen}
        aria-label="Report Bug"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/>
              <path d="M9 16l2 2 4-4"/>
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
            <h3 className={styles.panelTitle}>Test Log</h3>
            <p className={styles.panelSubtitle}>
              {reviewer
                ? `Hi ${currentReviewer?.name}! Report bugs or leave feedback.`
                : 'Select who is reviewing below.'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {notes.length > 0 && (
              <a href="/test-log" className={styles.viewLogLink} title="View full test log">
                View Log
              </a>
            )}
            {notes.length > 0 && (
              <button onClick={clearAllNotes} className={styles.clearBtn} title="Clear all">
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Reviewer Picker */}
        {!reviewer && (
          <div className={styles.reviewerPicker}>
            <p className={styles.reviewerLabel}>Who is reviewing today?</p>
            <div className={styles.reviewerButtons}>
              {reviewers.map(r => (
                <button
                  key={r.key}
                  className={styles.reviewerBtn}
                  onClick={() => selectReviewer(r.key)}
                >
                  <span className={styles.reviewerInitials}>{r.initials}</span>
                  <span>{r.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add Report Form */}
        {reviewer && (
          <div className={styles.addForm}>
            <div className={styles.addFormTop}>
              <div className={styles.categoryPicker}>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <button
                    key={key}
                    className={`${styles.categoryBtn} ${category === key ? styles.categoryActive : ''}`}
                    onClick={() => setCategory(key)}
                    title={label}
                    style={category === key ? { borderColor: categoryColors[key], background: categoryColors[key] + '18' } : {}}
                  >
                    <span className={styles.categoryDot} style={{ background: categoryColors[key] }} />
                    {label}
                  </button>
                ))}
              </div>
              <button
                className={styles.switchReviewer}
                onClick={() => { setReviewer(''); localStorage.removeItem('feg-reviewer'); }}
                title="Switch reviewer"
              >
                {currentReviewer?.initials}
              </button>
            </div>

            <textarea
              ref={textareaRef}
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder={category === 'bug' ? "Describe the bug or issue..." : "What's on your mind about this page?"}
              className={styles.textarea}
              rows={2}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  addNote();
                }
              }}
            />

            {/* Image Upload Area */}
            <div className={styles.uploadRow}>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className={styles.fileInput}
                id="bug-image-upload"
              />
              <label htmlFor="bug-image-upload" className={styles.uploadLabel}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
                {imagePreview ? 'Change screenshot' : 'Attach screenshot'}
              </label>
              <button
                onClick={addNote}
                className={styles.addBtn}
                disabled={!currentNote.trim()}
              >
                {showSuccess ? 'Added!' : 'Submit'}
              </button>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className={styles.imagePreview}>
                <img src={imagePreview} alt="Attached screenshot" />
                <button onClick={removeImage} className={styles.removeImage} title="Remove image">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            )}

            <p className={styles.pageLabel}>
              Reporting on: <strong>{pathname}</strong>
            </p>
          </div>
        )}

        {/* Notes List */}
        <div className={styles.notesList}>
          {currentPageNotes.length > 0 && (
            <div className={styles.notesSection}>
              <h4 className={styles.notesSectionTitle}>This Page ({currentPageNotes.length})</h4>
              {currentPageNotes.map(note => (
                <div key={note.id} className={styles.noteItem}>
                  <span
                    className={styles.noteTag}
                    style={{ background: categoryColors[note.category] || '#718096' }}
                  >
                    {categoryLabels[note.category] || note.category}
                  </span>
                  <div className={styles.noteContent}>
                    <p className={styles.noteText}>{note.text}</p>
                    {note.image && (
                      <img src={note.image} alt="Bug screenshot" className={styles.noteImage} />
                    )}
                    <span className={styles.noteTime}>{note.reviewer} - {note.timestamp}</span>
                  </div>
                  <button onClick={() => deleteNote(note.id)} className={styles.deleteBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {otherNotes.length > 0 && (
            <div className={styles.notesSection}>
              <h4 className={styles.notesSectionTitle}>Other Pages ({otherNotes.length})</h4>
              {otherNotes.map(note => (
                <div key={note.id} className={styles.noteItem}>
                  <span
                    className={styles.noteTag}
                    style={{ background: categoryColors[note.category] || '#718096' }}
                  >
                    {categoryLabels[note.category] || note.category}
                  </span>
                  <div className={styles.noteContent}>
                    <p className={styles.noteText}>{note.text}</p>
                    {note.image && (
                      <img src={note.image} alt="Bug screenshot" className={styles.noteImage} />
                    )}
                    <span className={styles.noteMeta}>{note.page} - {note.reviewer} - {note.timestamp}</span>
                  </div>
                  <button onClick={() => deleteNote(note.id)} className={styles.deleteBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {notes.length === 0 && (
            <div className={styles.emptyState}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" style={{ marginBottom: '8px', opacity: 0.5 }}>
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                <rect x="9" y="3" width="6" height="4" rx="1"/>
                <path d="M9 14l2 2 4-4"/>
              </svg>
              <p>No reports yet. Browse the site and log any issues you find.</p>
            </div>
          )}
        </div>

        {/* Summary Bar */}
        {notes.length > 0 && (
          <div className={styles.summaryBar}>
            <div className={styles.summaryCounts}>
              <span style={{ color: categoryColors.bug }}>{bugCount} bug{bugCount !== 1 ? 's' : ''}</span>
              <span style={{ color: '#718096' }}>{notes.length} total</span>
            </div>
            <a href="/test-log" className={styles.viewLogBtn}>
              Open Test Log
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        )}
      </div>
    </>
  );
}
