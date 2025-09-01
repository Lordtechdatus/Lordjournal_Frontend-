// src/components/InstitutionField.jsx
import { useMemo, useState } from 'react';
import { INDIAN_INSTITUTIONS } from '../data/institutions';

export default function InstitutionField({ userProfile, setUserProfile }) {
  const [editing, setEditing] = useState(false);
  const [query, setQuery] = useState(userProfile.institution || '');
  const [focused, setFocused] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return INDIAN_INSTITUTIONS.slice(0, 10);
    return INDIAN_INSTITUTIONS.filter(n => n.toLowerCase().includes(q)).slice(0, 20);
  }, [query]);

  const onPick = (name) => {
    setQuery(name);
    setUserProfile(prev => ({ ...prev, institution: name })); // save to state
    setEditing(false);
  };

  const onSaveFreeText = () => {
    const name = query.trim();
    if (!name) return;
    setUserProfile(prev => ({ ...prev, institution: name })); // allow custom
    setEditing(false);
  };

  return (
    <div className="profile-field">
      <div className="profile-field-label">Institution</div>

             {!editing ? (
         <div className="profile-field-value" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
           {userProfile.institution
             ? <span>{userProfile.institution}</span>
             : <span className="empty">Not specified</span>}
           <button 
             className="profile-edit-btn" 
             onClick={() => setEditing(true)}
             style={{
               background: '#0052cc',
               color: 'white',
               border: 'none',
               padding: '8px 16px',
               borderRadius: '6px',
               cursor: 'pointer',
               fontSize: '0.8rem',
               marginLeft: '15px',
               transition: 'background 0.2s ease'
             }}
             onMouseEnter={(e) => e.target.style.background = '#003d99'}
             onMouseLeave={(e) => e.target.style.background = '#0052cc'}
           >
             {userProfile.institution ? 'Change' : 'Add'}
           </button>
         </div>
      ) : (
        <div style={{ position: 'relative', maxWidth: 560 }}>
          <input
            className="profile-input"
            placeholder="Type to search or write your institution name…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)} // allow click on dropdown
            style={{ 
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #e1e5ee',
              borderRadius: '6px',
              fontSize: '0.9rem',
              backgroundColor: '#fff'
            }}
          />
          {focused && (
            <div
              style={{
                position: 'absolute', zIndex: 10, top: '110%', left: 0, right: 0,
                background: '#fff', border: '1px solid #ddd', borderRadius: 8,
                maxHeight: 260, overflowY: 'auto', boxShadow: '0 6px 24px rgba(0,0,0,0.08)'
              }}
            >
              {filtered.length === 0 ? (
                <div style={{ padding: 10, color: '#666' }}>No matches — you can save what you typed</div>
              ) : filtered.map((name) => (
                <div
                  key={name}
                  onMouseDown={() => onPick(name)}
                  style={{ padding: '10px 12px', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f6f8ff')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {name}
                </div>
              ))}
            </div>
          )}

                     <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
             <button 
               className="profile-save-btn" 
               onClick={onSaveFreeText}
               style={{
                 background: '#10b981',
                 color: 'white',
                 border: 'none',
                 padding: '8px 16px',
                 borderRadius: '6px',
                 cursor: 'pointer',
                 fontSize: '0.8rem',
                 transition: 'background 0.2s ease'
               }}
               onMouseEnter={(e) => e.target.style.background = '#059669'}
               onMouseLeave={(e) => e.target.style.background = '#10b981'}
             >
               Save
             </button>
             <button 
               className="profile-cancel-btn" 
               onClick={() => { setEditing(false); setQuery(userProfile.institution || ''); }}
               style={{
                 background: '#6b7280',
                 color: 'white',
                 border: 'none',
                 padding: '8px 16px',
                 borderRadius: '6px',
                 cursor: 'pointer',
                 fontSize: '0.8rem',
                 transition: 'background 0.2s ease'
               }}
               onMouseEnter={(e) => e.target.style.background = '#4b5563'}
               onMouseLeave={(e) => e.target.style.background = '#6b7280'}
             >
               Cancel
             </button>
           </div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>
            Tip: List me naam na mile to apna institution naam likh kar "Save" dabaa den.
          </div>
        </div>
      )}
    </div>
  );
}
