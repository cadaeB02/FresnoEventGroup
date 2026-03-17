'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './testlog.module.css';

const categoryLabels = {
  bug: 'Bug',
  change: 'Change',
  love: 'Love it',
  note: 'Note',
  general: 'Note',
  remove: 'Remove',
};

const categoryColors = {
  bug: '#E53E3E',
  change: '#D69E2E',
  love: '#38A169',
  note: '#718096',
  general: '#718096',
  remove: '#E53E3E',
};

export default function TestLog() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [expandedImage, setExpandedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  // Fetch from API on mount
  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await fetch('/api/feedback');
        const data = await res.json();
        if (data.notes) {
          setNotes(data.notes);
        } else if (data.fallback) {
          const saved = localStorage.getItem('feg-feedback-notes');
          if (saved) setNotes(JSON.parse(saved));
        }
      } catch (e) {
        console.error('API error, using localStorage:', e);
        const saved = localStorage.getItem('feg-feedback-notes');
        if (saved) setNotes(JSON.parse(saved));
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotes();
  }, []);

  const deleteNote = async (id) => {
    try {
      await fetch(`/api/feedback?id=${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Delete error:', e);
    }
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = async () => {
    if (confirm('Clear all reports? This cannot be undone.')) {
      try {
        await fetch('/api/feedback?id=all', { method: 'DELETE' });
      } catch (e) {
        console.error('Clear error:', e);
      }
      setNotes([]);
    }
  };

  // Copy a single report to clipboard
  const copyReport = async (note) => {
    const tag = (categoryLabels[note.category] || 'Note').toUpperCase();
    let text = `[${tag}] Page: ${note.page}\n`;
    text += `${note.text}\n`;
    if (note.image) text += `[Screenshot attached - see test log]\n`;
    text += `Reporter: ${note.reviewer} - ${note.timestamp}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(note.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  const filtered = filter === 'all'
    ? notes
    : notes.filter(n => n.category === filter);

  // Group by page
  const grouped = {};
  filtered.forEach(note => {
    if (!grouped[note.page]) grouped[note.page] = [];
    grouped[note.page].push(note);
  });

  const bugCount = notes.filter(n => n.category === 'bug').length;
  const changeCount = notes.filter(n => n.category === 'change').length;
  const loveCount = notes.filter(n => n.category === 'love').length;
  const noteCount = notes.filter(n => ['note', 'general'].includes(n.category)).length;

  const exportAll = async () => {
    let text = `FEG Test Log - ${new Date().toLocaleDateString()}\n`;
    text += `Total: ${notes.length} reports (${bugCount} bugs, ${changeCount} changes)\n`;
    text += `${'='.repeat(50)}\n\n`;
    Object.entries(grouped).forEach(([page, pageNotes]) => {
      text += `Page: ${page}\n`;
      text += `${'-'.repeat(30)}\n`;
      pageNotes.forEach(note => {
        const tag = (categoryLabels[note.category] || 'Note').toUpperCase();
        text += `  [${tag}] ${note.text}`;
        if (note.image) text += ' [has screenshot]';
        text += `\n  By ${note.reviewer} on ${note.timestamp}\n\n`;
      });
    });

    try {
      await navigator.clipboard.writeText(text);
      alert('Full test log copied to clipboard!');
    } catch (e) {
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `feg-test-log-${Date.now()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // Download a screenshot image
  const downloadImage = (imageData, noteId) => {
    const a = document.createElement('a');
    a.href = imageData;
    a.download = `feg-screenshot-${noteId}.jpg`;
    a.click();
  };

  return (
    <>
      {/* Header */}
      <section className={styles.header}>
        <div className="container">
          <Link href="/" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to Site
          </Link>
          <h1 className={styles.title}>Test Log</h1>
          <p className={styles.subtitle}>Bug reports and feedback from site reviewers</p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsInner}>
            <div className={styles.statCards}>
              <div className={styles.statCard}>
                <span className={styles.statNumber} style={{ color: '#E53E3E' }}>{bugCount}</span>
                <span className={styles.statLabel}>Bugs</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber} style={{ color: '#D69E2E' }}>{changeCount}</span>
                <span className={styles.statLabel}>Changes</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber} style={{ color: '#38A169' }}>{loveCount}</span>
                <span className={styles.statLabel}>Love It</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber} style={{ color: '#718096' }}>{noteCount}</span>
                <span className={styles.statLabel}>Notes</span>
              </div>
            </div>
            <div className={styles.actions}>
              <button onClick={exportAll} className={styles.exportBtn} disabled={notes.length === 0}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>
                  <rect x="8" y="2" width="8" height="4" rx="1"/>
                </svg>
                Export All to Clipboard
              </button>
              {notes.length > 0 && (
                <button onClick={clearAll} className={styles.clearAllBtn}>
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className={styles.filterBar}>
        <div className="container">
          <div className={styles.filters}>
            <button
              className={`${styles.filterBtn} ${filter === 'all' ? styles.filterActive : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({notes.length})
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'bug' ? styles.filterActive : ''}`}
              onClick={() => setFilter('bug')}
              style={filter === 'bug' ? { borderColor: '#E53E3E', color: '#E53E3E' } : {}}
            >
              Bugs ({bugCount})
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'change' ? styles.filterActive : ''}`}
              onClick={() => setFilter('change')}
              style={filter === 'change' ? { borderColor: '#D69E2E', color: '#D69E2E' } : {}}
            >
              Changes ({changeCount})
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'love' ? styles.filterActive : ''}`}
              onClick={() => setFilter('love')}
              style={filter === 'love' ? { borderColor: '#38A169', color: '#38A169' } : {}}
            >
              Love It ({loveCount})
            </button>
          </div>
        </div>
      </section>

      {/* Reports */}
      <section className={`section ${styles.reports}`}>
        <div className="container">
          {isLoading ? (
            <div className={styles.emptyState}>
              <p>Loading reports...</p>
            </div>
          ) : Object.keys(grouped).length === 0 ? (
            <div className={styles.emptyState}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" style={{ opacity: 0.4 }}>
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                <rect x="9" y="3" width="6" height="4" rx="1"/>
                <path d="M9 14l2 2 4-4"/>
              </svg>
              <h3>No reports yet</h3>
              <p>Use the feedback widget on any page to log bugs and feedback. They will appear here.</p>
            </div>
          ) : (
            Object.entries(grouped).map(([page, pageNotes]) => (
              <div key={page} className={styles.pageGroup}>
                <div className={styles.pageHeader}>
                  <h2 className={styles.pageName}>{page}</h2>
                  <span className={styles.pageCount}>{pageNotes.length} report{pageNotes.length !== 1 ? 's' : ''}</span>
                </div>
                <div className={styles.reportGrid}>
                  {pageNotes.map(note => (
                    <div key={note.id} className={styles.reportCard}>
                      <div className={styles.reportTop}>
                        <span
                          className={styles.reportTag}
                          style={{ background: categoryColors[note.category] || '#718096' }}
                        >
                          {categoryLabels[note.category] || 'Note'}
                        </span>
                        <span className={styles.reportMeta}>{note.reviewer} - {note.timestamp}</span>
                        <div className={styles.reportActions}>
                          <button
                            onClick={() => copyReport(note)}
                            className={styles.reportCopy}
                            title="Copy to clipboard"
                          >
                            {copiedId === note.id ? (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38A169" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            ) : (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2"/>
                                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                              </svg>
                            )}
                          </button>
                          <button onClick={() => deleteNote(note.id)} className={styles.reportDelete} title="Delete report">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className={styles.reportText}>{note.text}</p>
                      {note.image && (
                        <div className={styles.reportImageWrap}>
                          <img
                            src={note.image}
                            alt="Bug screenshot"
                            className={styles.reportImage}
                            onClick={() => setExpandedImage(note.image)}
                          />
                          <button
                            className={styles.downloadImageBtn}
                            onClick={() => downloadImage(note.image, note.id)}
                            title="Download screenshot"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                              <polyline points="7 10 12 15 17 10"/>
                              <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Lightbox for expanded images */}
      {expandedImage && (
        <div className={styles.lightbox} onClick={() => setExpandedImage(null)}>
          <button className={styles.lightboxClose} onClick={() => setExpandedImage(null)}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <img
            src={expandedImage}
            alt="Expanded screenshot"
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
