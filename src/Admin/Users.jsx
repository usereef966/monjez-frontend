import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiUser } from 'react-icons/fi';

const ROLE_COLORS = {
  admin: 'linear-gradient(90deg, #7F00FF 0%, #E100FF 100%)',
  manager: 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)',
  user: 'linear-gradient(90deg, #ddd 0%, #eee 100%)',
};

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [modal, setModal] = useState({ open: false, mode: 'add', user: {} });
  const [modalShow, setModalShow] = useState(false);

  // Fetch users
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('https://monjez-online.onrender.com/api/admin/users');
        setUsers(res.data);
        setError('');
      } catch {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Modal animation (simple CSS class toggle)
  useEffect(() => {
    if (modal.open) {
      setTimeout(() => setModalShow(true), 10);
    } else {
      setModalShow(false);
    }
  }, [modal.open]);

  // Filter, sort, paginate
  const processed = users
    .filter(u =>
      u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.role?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let v1 = a[sortField], v2 = b[sortField];
      if (sortField === 'created_at') {
        v1 = new Date(v1);
        v2 = new Date(v2);
      }
      if (v1 < v2) return sortOrder === 'asc' ? -1 : 1;
      if (v1 > v2) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(processed.length / pageSize);
  const display = processed.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = field => {
    if (sortField === field) setSortOrder(o => (o === 'asc' ? 'desc' : 'asc'));
    else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // CRUD actions
  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    await axios.delete(`https://monjez-online.onrender.com/api/admin/user/${id}`);
    setUsers(users.filter(u => u.id !== id));
  };

  const openModal = (mode, user = {}) => setModal({ open: true, mode, user });
  const closeModal = () => setModal({ open: false, mode: 'add', user: {} });

  const handleSubmit = async e => {
    e.preventDefault();
    const form = new FormData(e.target);
    const body = Object.fromEntries(form.entries());

    try {
      if (modal.mode === 'add') await axios.post('https://monjez-online.onrender.com/api/admin/user', body);
      else await axios.patch(`https://monjez-online.onrender.com/api/admin/user/${modal.user.id}`, body);
      closeModal();
      const res = await axios.get('https://monjez-online.onrender.com/api/admin/users');
      setUsers(res.data);
    } catch {
      alert('Save error');
    }
  };

  // Custom signature
  const Signature = () => (
    <div style={{
      position: 'absolute',
      bottom: 10,
      right: 24,
      fontSize: 12,
      color: '#D5BFFF',
      fontWeight: 'bold',
      opacity: 0.7,
      pointerEvents: 'none',
      letterSpacing: 1
    }}>
      Joseph_don
    </div>
  );

  return (
    <div style={{
      position: 'relative',
      zIndex: 100,
      minHeight: '30vh',
      
      padding: '40px 8px 8px 8px',
      fontFamily: 'Poppins, Tajawal, Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: 2000,
        margin: 'auto',
        background: '#fff',
        borderRadius: 24,
        boxShadow: '0 4px 40px 0 rgba(110,40,255,.13), 0 2px 4px rgba(44,62,80,.05)',
        padding: 32,
        position: 'relative',
        border: '1px solid #ecebfc',
        overflow: 'hidden'
      }}>
        <Signature />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <h2 style={{
              fontFamily: '"GraffitiPremium", Tajawal, Arial, sans-serif',
              fontSize: 34,
              color: '#7C3AED',
              margin: 0,
              letterSpacing: 2,
              textShadow: '0 2px 8px #e5e0f7'
            }}>
              User Management
            </h2>
            <div style={{
              height: 5,
              width: 110,
              background: 'linear-gradient(90deg, #7F00FF 0%, #E100FF 100%)',
              borderRadius: 99,
              margin: '7px 0 9px 0'
            }} />
            <div style={{ color: '#A5A3BC', fontSize: 15, fontWeight: 400, fontFamily: 'Poppins, Tajawal, Arial, sans-serif' }}>
              Full control panel for users – add, edit, delete & search with style
            </div>
          </div>
          <button
            onClick={() => openModal('add')}
            style={{
              background: 'linear-gradient(90deg,#7F00FF,#E100FF)',
              color: '#fff',
              border: 'none',
              borderRadius: 15,
              padding: '12px 28px',
              fontWeight: 'bold',
              fontSize: 17,
              boxShadow: '0 4px 12px #7c3aed2c',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              transition: '0.2s',
              outline: 'none'
            }}
          >
            <FiPlus style={{ fontSize: 20, verticalAlign: 'middle' }} /> Add User
          </button>
        </div>
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search name, email or role…"
          style={{
            width: '100%',
            padding: '13px 17px',
            borderRadius: 12,
            border: '1px solid #ecebfc',
            boxShadow: '0 1.5px 12px #f7f5ff88',
            marginBottom: 22,
            fontSize: 16,
            outline: 'none'
          }}
        />

        {loading && <p style={{ textAlign: 'center', color: '#aaa', padding: 30 }}>Loading…</p>}
        {error && <p style={{ textAlign: 'center', color: '#F06', padding: 30 }}>{error}</p>}

        {!loading && !error && (
          <>
            <div style={{
              overflowX: 'auto',
              borderRadius: 16,
              border: '1px solid #ecebfc',
              background: '#F9F7FF'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: 'inherit'
              }}>
                <thead>
                  <tr style={{ color: '#6c63a2', fontSize: 13, background: '#fff', fontWeight: 600 }}>
                    {['avatar', 'full_name', 'email', 'role', 'created_at', 'actions'].map(col => {
                      const labels = {
                        avatar: 'Avatar',
                        full_name: 'Name',
                        email: 'Email',
                        role: 'Role',
                        created_at: 'Created At',
                        actions: 'Actions'
                      };
                      return (
                        <th
                          key={col}
                          onClick={() => col !== 'actions' && toggleSort(col)}
                          style={{
                            textAlign: col === 'avatar' ? 'center' : 'left',
                            padding: '18px 13px',
                            cursor: col === 'actions' ? 'default' : 'pointer',
                            userSelect: 'none',
                            background: '#fff',
                            transition: '0.15s',
                            borderBottom: '1.5px solid #ecebfc'
                          }}
                        >
                          {labels[col]}
                          {sortField === col && (
                            <span style={{ marginLeft: 4 }}>{sortOrder === 'asc' ? '▲' : '▼'}</span>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {display.map(u => (
                    <tr key={u.id}
                      style={{
                        borderTop: '1.5px solid #f3f2fa',
                        background: '#fff',
                        transition: 'background 0.16s',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F6F1FF'}
                      onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                    >
                      <td style={{ textAlign: 'center', padding: '11px 7px' }}>
                        {u.avatar ? (
                          <img
                            src={u.avatar}
                            alt=""
                            style={{ width: 44, height: 44, borderRadius: 22, border: '2.5px solid #F0E6FF', objectFit: 'cover', background: '#eee' }}
                          />
                        ) : (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 44,
                            height: 44,
                            borderRadius: 22,
                            background: 'linear-gradient(135deg, #e9d5ff 0%, #fbc2eb 100%)',
                            color: '#9067cd',
                            fontWeight: 900,
                            fontSize: 20,
                            boxShadow: '0 2px 5px #ede7ff91'
                          }}>
                            <FiUser />
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '11px 7px', fontWeight: 600, color: '#6B46C1', fontSize: 16 }}>{u.full_name}</td>
                      <td style={{ padding: '11px 7px', color: '#8382aa', fontSize: 15 }}>{u.email}</td>
                      <td style={{ padding: '11px 7px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 16px',
                          borderRadius: 24,
                          fontWeight: 700,
                          fontSize: 13,
                          color: ROLE_COLORS[u.role] ? '#fff' : '#585878',
                          background: ROLE_COLORS[u.role] || '#f2f2f2',
                          backgroundImage: ROLE_COLORS[u.role] || undefined,
                          boxShadow: '0 1.5px 8px #ecebfc63'
                        }}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ padding: '11px 7px', color: '#aaa', fontSize: 14 }}>{dayjs(u.created_at).format('YYYY-MM-DD')}</td>
                      <td style={{
                        padding: '11px 7px',
                        textAlign: 'center',
                        display: 'flex',
                        gap: 8,
                        alignItems: 'center'
                      }}>
                        <button
                          title="Edit"
                          onClick={() => openModal('edit', u)}
                          style={{
                            border: 'none',
                            background: '#e8e2f7',
                            color: '#7C3AED',
                            borderRadius: '50%',
                            width: 35,
                            height: 35,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 4px #e6dbff82',
                            fontSize: 17,
                            transition: '.17s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#D8BBFF'}
                          onMouseLeave={e => e.currentTarget.style.background = '#e8e2f7'}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => handleDelete(u.id)}
                          style={{
                            border: 'none',
                            background: '#fde0e6',
                            color: '#E74C3C',
                            borderRadius: '50%',
                            width: 35,
                            height: 35,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 4px #fcd9e3b6',
                            fontSize: 17,
                            transition: '.17s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#faacc1'}
                          onMouseLeave={e => e.currentTarget.style.background = '#fde0e6'}
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div style={{
              marginTop: 22,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 8
            }}>
              <div style={{ color: '#888', fontSize: 13 }}>
                Showing <b>{display.length}</b> of <b>{processed.length}</b> users
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <select
                  value={pageSize}
                  onChange={e => { setPageSize(+e.target.value); setPage(1); }}
                  style={{ border: '1px solid #ecebfc', borderRadius: 6, padding: '4px 10px', fontSize: 15 }}
                >
                  {[5, 10, 20, 50].map(n => (
                    <option key={n} value={n}>{n} per page</option>
                  ))}
                </select>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{
                    background: '#fff',
                    border: '1px solid #ecebfc',
                    padding: '6px 18px',
                    borderRadius: 7,
                    color: '#7C3AED',
                    fontWeight: 500,
                    opacity: page === 1 ? 0.6 : 1,
                    cursor: page === 1 ? 'not-allowed' : 'pointer',
                    margin: '0 5px'
                  }}
                >Prev</button>
                <span style={{ color: '#aaa', fontSize: 14 }}>Page {page} of {totalPages}</span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{
                    background: '#fff',
                    border: '1px solid #ecebfc',
                    padding: '6px 18px',
                    borderRadius: 7,
                    color: '#7C3AED',
                    fontWeight: 500,
                    opacity: page === totalPages ? 0.6 : 1,
                    cursor: page === totalPages ? 'not-allowed' : 'pointer'
                  }}
                >Next</button>
              </div>
            </div>
          </>
        )}

        {/* Modal */}
        {modal.open && (
          <div
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.38)',
              zIndex: 200,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: '0.2s'
            }}>
            <form
              onSubmit={handleSubmit}
              style={{
                background: '#fff',
                borderRadius: 19,
                padding: 34,
                width: 380,
                position: 'relative',
                zIndex: 210,
                boxShadow: '0 4px 44px #a684e9a0',
                border: '1.5px solid #ecebfc',
                transform: modalShow ? 'scale(1)' : 'scale(0.93)',
                opacity: modalShow ? 1 : 0.67,
                transition: '.3s cubic-bezier(.82,2,.51,.89)'
              }}
            >
              <button
                type="button"
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: 15,
                  right: 18,
                  background: 'none',
                  border: 'none',
                  color: '#b2a6d7',
                  fontSize: 22,
                  cursor: 'pointer',
                  transition: '0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#E100FF'}
                onMouseLeave={e => e.currentTarget.style.color = '#b2a6d7'}
              >
                <FiX />
              </button>
              <h3 style={{
                marginTop: 0,
                marginBottom: 25,
                fontSize: 23,
                fontWeight: 700,
                color: '#7C3AED',
                fontFamily: 'inherit'
              }}>
                {modal.mode === 'add' ? 'Add New User' : 'Edit User'}
              </h3>
              {['first_name', 'last_name', 'email', 'phone', 'password', 'role', 'avatar'].map(field => (
                <div key={field} style={{ marginBottom: 14 }}>
                  <label style={{
                    display: 'block',
                    marginBottom: 4,
                    fontWeight: 700,
                    color: '#6C63A2',
                    fontSize: 14,
                    fontFamily: 'inherit'
                  }}>
                    {field === 'avatar' ? 'Avatar URL' : field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </label>
                  <input
                    name={field}
                    defaultValue={modal.user[field] || ''}
                    type={field === 'password' ? 'password' : 'text'}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      border: '1px solid #ecebfc',
                      borderRadius: 8,
                      fontSize: 15,
                      fontFamily: 'inherit',
                      outline: 'none'
                    }}
                    required={modal.mode === 'add' || field !== 'password'}
                  />
                </div>
              ))}
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(90deg,#7F00FF,#E100FF)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '12px 0',
                  width: '100%',
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginTop: 11,
                  boxShadow: '0 2px 16px #e5d7ff55',
                  cursor: 'pointer',
                  transition: '0.13s'
                }}
              >Save</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
