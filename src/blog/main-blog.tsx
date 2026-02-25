import React from 'react';
import ReactDOM from 'react-dom/client';

// Полностью самостоятельный блог без внешних зависимостей
const BlogHeader = () => (
  <header style={{
    background: 'white',
    padding: '1rem 2rem',
    borderBottom: '1px solid #eee',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }}>
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          style={{ color: '#333' }}
        >
          <path d="M12 2v20M2 12h20" />
          <path d="M20 16l-4-4 4-4" />
          <path d="M4 8l4 4-4 4" />
        </svg>
        <span style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Smart AI
        </span>
      </div>
      <nav style={{ display: 'flex', gap: '1.5rem' }}>
        <a 
          href="/" 
          style={{
            textDecoration: 'none',
            color: '#666',
            fontWeight: '500',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#333'}
          onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#666'}
        >
          Главная
        </a>
        <a 
          href="/admin"
          style={{
            textDecoration: 'none',
            color: '#666',
            fontWeight: '500',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#333'}
          onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#666'}
        >
          Админка
        </a>
      </nav>
    </div>
  </header>
);

const BlogHome = () => {
  const posts = [
    {
      id: 1,
      title: "5 инструментов, которые заменят целый штат уже сегодня",
      excerpt: "Это первый пост в моем новом блоге. Здесь я буду делиться интересными мыслями и идеями.",
      date: "2026-01-09",
      author: "Автор"
    },
    {
      id: 2,
      title: "Как создать успешный сайт",
      excerpt: "В этом посте я расскажу о ключевых принципах создания современных веб-приложений.",
      date: "2026-01-08",
      author: "Автор"
    }
  ];

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        Блог
      </h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {posts.map((post) => (
          <article 
            key={post.id}
            style={{
              background: 'white',
              borderRadius: '8px',
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            <a 
              href={`/post/${post.id}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block'
              }}
            >
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#333',
                marginBottom: '0.5rem',
                transition: 'color 0.2s'
              }}>
                {post.title}
              </h2>
              <p style={{
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                {post.excerpt}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.875rem',
                color: '#999'
              }}>
                <span>{post.author}</span>
                <span style={{ margin: '0 0.5rem' }}>•</span>
                <span>{new Date(post.date).toLocaleDateString('ru-RU')}</span>
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
};

const AppBlog = () => (
  <div style={{
    minHeight: '100vh',
    background: '#000'
  }}>
    <BlogHeader />
    <main>
      <BlogHome />
    </main>
  </div>
);

// Отключаем все курсоры
const disableAllCursors = () => {
  const style = document.createElement('style');
  style.textContent = `
    * { cursor: auto !important; }
    html, body { cursor: auto !important; }
    body * { cursor: auto !important; }
    [style*="cursor"] { cursor: auto !important; }
  `;
  document.head.appendChild(style);
};

// Запускаем приложение
document.addEventListener('DOMContentLoaded', () => {
  disableAllCursors();
  ReactDOM.createRoot(document.getElementById('root')).render(<AppBlog />);
});