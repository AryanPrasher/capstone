import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_USERS = [
  {
    name: 'Alex Morgan',
    email: 'alex.morgan@nature.io',
    username: 'alexmorgan',
    password: 'password123',
    joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    avatarSeed: 'alex'
  },
  {
    name: 'Demo Explorer',
    email: 'demo@nature.io',
    username: 'demo',
    password: 'password123',
    joinedAt: new Date().toISOString(),
    avatarSeed: 'demo'
  }
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('nature_auth_users');
      return saved ? JSON.parse(saved) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nature_auth_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('nature_auth_users', JSON.stringify(users));
    } catch (e) {
      console.error('Failed to persist users to localStorage', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('nature_auth_session', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('nature_auth_session');
      }
    } catch (e) {
      console.error('Failed to persist session to localStorage', e);
    }
  }, [currentUser]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(curr => (curr?.message === message ? null : curr));
    }, 4000);
  };

  const login = (identifier, password) => {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    const user = users.find(
      u => (u.username.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId) && u.password === cleanPass
    );

    if (!user) {
      showToast('Invalid username or password', 'error');
      return { success: false, message: 'Invalid username/email or password.' };
    }

    const sessionUser = {
      name: user.name,
      email: user.email,
      username: user.username,
      avatarSeed: user.avatarSeed || user.username,
      loginTime: new Date().toISOString()
    };

    setCurrentUser(sessionUser);
    showToast(`Welcome back, ${user.name}!`, 'success');
    return { success: true, user: sessionUser };
  };

  const register = ({ name, email, username, password }) => {
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanUsername = (username || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanName || !cleanEmail || !cleanUsername || !cleanPassword) {
      showToast('Please fill in all fields', 'error');
      return { success: false, message: 'All fields are required.' };
    }

    const existingUser = users.find(
      u => u.username.toLowerCase() === cleanUsername || u.email.toLowerCase() === cleanEmail
    );

    if (existingUser) {
      const field = existingUser.username.toLowerCase() === cleanUsername ? 'Username' : 'Email';
      showToast(`${field} is already in use`, 'error');
      return { success: false, message: `${field} is already taken.` };
    }

    const newUser = {
      name: cleanName,
      email: cleanEmail,
      username: cleanUsername,
      password: cleanPassword,
      joinedAt: new Date().toISOString(),
      avatarSeed: cleanUsername
    };

    setUsers(prev => [...prev, newUser]);
    
    const sessionUser = {
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
      avatarSeed: newUser.avatarSeed,
      loginTime: new Date().toISOString()
    };

    setCurrentUser(sessionUser);
    showToast(`Account created! Welcome, ${newUser.name}!`, 'success');
    return { success: true, user: sessionUser };
  };

  const logout = () => {
    const prevName = currentUser?.name || 'User';
    setCurrentUser(null);
    showToast(`Signed out successfully. See you soon, ${prevName}!`, 'info');
  };

  const dismissToast = () => setToast(null);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        toast,
        showToast,
        dismissToast,
        registeredCount: users.length
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
