import { Search, RotateCw, UserPlus, Edit2, Trash2 } from 'lucide-react';

export function UsersTable({
  usersList = [],
  userSearch = '',
  setUserSearch,
  fetchUsers,
  setEditingUser,
  handleDeleteUser
}) {
  const filteredUsers = usersList.filter(u => {
    const q = (userSearch || '').toLowerCase().trim();
    if (!q) return true;
    const username = (u.username || '').toLowerCase();
    const email = (u.email || '').toLowerCase();
    const name = `${u.givenName || ''} ${u.familyName || ''}`.toLowerCase();
    const passport = (u.passport || '').toLowerCase();
    const dob = (u.dob || '').toLowerCase();
    const uRole = (u.role || '').toLowerCase();
    return username.includes(q) || email.includes(q) || name.includes(q) || passport.includes(q) || dob.includes(q) || uRole.includes(q);
  });

  return (
    <div className="ca-card">
      <div className="ca-card-header">
        <h2>Created Accounts ({filteredUsers.length})</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <input
              type="text"
              className="ca-form-control"
              placeholder="Search accounts..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              style={{ paddingLeft: '30px' }}
            />
            <Search size={16} color="#777" style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
          <button type="button" className="ca-btn ca-btn-secondary ca-btn-sm" onClick={fetchUsers} title="Refresh Users">
            <RotateCw size={14} /> Refresh
          </button>
        </div>
      </div>
      <div className="ca-table-responsive">
        <table className="ca-table">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Passport</th>
              <th>Role</th>
              <th>Origin</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(u => (
                <tr key={u._id}>
                  <td>
                    <strong>
                      {u.givenName || u.familyName ? `${u.givenName || ''} ${u.familyName || ''}`.trim() : '—'}
                    </strong>
                  </td>
                  <td>{u.username}</td>
                  <td>{u.email || '—'}</td>
                  <td>{u.dob || '—'}</td>
                  <td>{u.passport || '—'}</td>
                  <td>
                    <span className={`ca-badge ca-badge-${u.role === 'admin' ? 'danger' : u.role === 'employe' ? 'warning' : 'navy'}`}>
                      {u.role === 'employe' ? 'Employee' : u.role}
                    </span>
                  </td>
                  <td>
                    <span className="ca-badge ca-badge-info">
                      {(u.origin || 'CA').toUpperCase()}
                    </span>
                  </td>
                  <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        className="ca-btn ca-btn-secondary ca-btn-sm"
                        onClick={() => setEditingUser(u)}
                        title="Edit User"
                      >
                        <Edit2 size={13} /> Edit
                      </button>
                      {u.role !== 'admin' && (
                        <button
                          type="button"
                          className="ca-btn ca-btn-danger ca-btn-sm"
                          onClick={() => handleDeleteUser(u._id)}
                          title="Delete User"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '24px', color: '#666', fontStyle: 'italic' }}>
                  No accounts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AccountsTab({
  accountFormData,
  setAccountFormData,
  isAccountSubmitting,
  handleCreateAccount,
  role = 'admin',
  usersList = [],
  fetchUsers,
  userSearch = '',
  setUserSearch,
  setEditingUser,
  handleDeleteUser
}) {
  return (
    <>
      <div className="ca-card">
        <div className="ca-card-header">
          <h2>Create Account</h2>
        </div>
        <div className="ca-card-body">
          <div className="ca-form-grid">
            <div className="ca-form-group">
              <label>Given Name</label>
              <input
                type="text"
                className="ca-form-control"
                placeholder="e.g. John"
                value={accountFormData.givenName || ''}
                onChange={(e) => setAccountFormData(prev => ({ ...prev, givenName: e.target.value }))}
              />
            </div>
            <div className="ca-form-group">
              <label>Family Name</label>
              <input
                type="text"
                className="ca-form-control"
                placeholder="e.g. Smith"
                value={accountFormData.familyName || ''}
                onChange={(e) => setAccountFormData(prev => ({ ...prev, familyName: e.target.value }))}
              />
            </div>
          </div>

          <div className="ca-form-grid">
            <div className="ca-form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                className="ca-form-control"
                value={accountFormData.dob || ''}
                onChange={(e) => setAccountFormData(prev => ({ ...prev, dob: e.target.value }))}
              />
            </div>
            <div className="ca-form-group">
              <label>Passport Number</label>
              <input
                type="text"
                className="ca-form-control"
                placeholder="e.g. AA1234567"
                value={accountFormData.passport || ''}
                onChange={(e) => setAccountFormData(prev => ({ ...prev, passport: e.target.value }))}
              />
            </div>
          </div>

          <div className="ca-form-grid">
            <div className="ca-form-group">
              <label>Username (Required)</label>
              <input
                type="text"
                className="ca-form-control"
                placeholder="Enter login username"
                value={accountFormData.username || ''}
                onChange={(e) => setAccountFormData(prev => ({ ...prev, username: e.target.value }))}
                required
              />
            </div>
            <div className="ca-form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="ca-form-control"
                placeholder="user@example.ca"
                value={accountFormData.email || ''}
                onChange={(e) => setAccountFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>

          <div className="ca-form-grid">
            <div className="ca-form-group">
              <label>Password (Required)</label>
              <input
                type="password"
                className="ca-form-control"
                placeholder="Enter password"
                value={accountFormData.password || ''}
                onChange={(e) => setAccountFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            {role === 'admin' && (
              <div className="ca-form-group">
                <label>Account Role</label>
                <select
                  className="ca-form-control"
                  value={accountFormData.role || 'user'}
                  onChange={(e) => setAccountFormData(prev => ({ ...prev, role: e.target.value }))}
                >
                  <option value="user">User</option>
                  <option value="employe">Employee</option>
                </select>
              </div>
            )}
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="ca-btn ca-btn-primary"
              disabled={isAccountSubmitting}
              onClick={() => handleCreateAccount(accountFormData.role || 'user')}
            >
              <UserPlus size={16} />
              {isAccountSubmitting ? 'Creating...' : `Create ${accountFormData.role === 'employe' ? 'Employee' : 'User'} Account`}
            </button>
            <button
              type="button"
              className="ca-btn ca-btn-secondary"
              onClick={() => setAccountFormData({
                username: '',
                password: '',
                email: '',
                givenName: '',
                familyName: '',
                passport: '',
                dob: '',
                role: 'user',
                origin: 'ca'
              })}
            >
              Clear Form
            </button>
          </div>
        </div>
      </div>

      <UsersTable
        usersList={usersList}
        userSearch={userSearch}
        setUserSearch={setUserSearch}
        fetchUsers={fetchUsers}
        setEditingUser={setEditingUser}
        handleDeleteUser={handleDeleteUser}
        role={role}
      />
    </>
  );
}
