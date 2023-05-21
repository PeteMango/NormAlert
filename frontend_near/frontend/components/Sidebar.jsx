import React, {useState} from 'react'

export const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleToggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <button
          onClick={handleToggleSidebar}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
          }}
        >
          Toggle Sidebar
        </button>
        {sidebarOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '50%',
              height: '100%',
              backgroundColor: '#fff',
              zIndex: 9998,
            }}
          >
            <h2>Sidebar Content</h2>
            <p>This is the sidebar that appears on the right side of the screen.</p>
            <p>You can put any content you want inside it.</p>
          </div>
        )}
        <div style={{ flex: 1, backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
          {/* Main content of the page */}
          <h1>Main Content</h1>
          <p>This is the main content of the page that goes behind the sidebar.</p>
        </div>
      </div>
    );
}
