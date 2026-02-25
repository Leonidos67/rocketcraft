import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface BlogTag {
  id: string;
  name: string;
  slug: string;
  color: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  tags: BlogTag[];
}

const BlogHome = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Заглушка для демонстрации
    const tags: BlogTag[] = [
      { id: 'automation', name: 'Автоматизация процессов', slug: 'automation', color: 'blue' },
      { id: 'solutions', name: 'Готовые решения', slug: 'solutions', color: 'green' },
      { id: 'ai-tools', name: 'ИИ-инструменты', slug: 'ai-tools', color: 'purple' },
      { id: 'cases', name: 'Кейсы и истории', slug: 'cases', color: 'orange' },
      { id: 'startup', name: 'Старт и масштабирование', slug: 'startup', color: 'pink' },
      { id: 'integrations', name: 'Интеграции и технологии', slug: 'integrations', color: 'yellow' },
      { id: 'opinions', name: 'Мнения и тренды', slug: 'opinions', color: 'indigo' },
      { id: 'resources', name: 'Бесплатные ресурсы', slug: 'resources', color: 'red' },
      { id: 'knowledge', name: 'База знаний / Помощь', slug: 'knowledge', color: 'teal' }
    ];

    const mockPosts: BlogPost[] = [
      {
        id: 1,
        title: "5 инструментов, которые заменят целый штат уже сегодня",
        excerpt: "Это первый пост в моем новом блоге. Здесь я буду делиться интересными мыслями и идеями.",
        date: "2026-01-09",
        author: "Автор",
        image: "https://i.ibb.co/qXjfL99/image.png",
        tags: [tags[0], tags[2]]
      },
      {
        id: 2,
        title: "Как создать успешный сайт",
        excerpt: "В этом посте я расскажу о ключевых принципах создания современных веб-приложений.",
        date: "2026-01-08",
        author: "Автор",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
        tags: [tags[1], tags[5]]
      }
    ];
    setPosts(mockPosts);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      
      <main className="container mx-auto px-0 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Блог</h1>
          <p className="text-gray-400 text-lg">
            Больше результата, меньше рутины. Гид по автоматизации.
          </p>
        </div>
        
        {/* Видео */}
        {/* <div className="mb-16">
          <video 
            src="https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto rounded-xl shadow-2xl"
            style={{ maxHeight: '500px' }}
          />
        </div> */}
        
        {/* Список постов с обложками */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <article 
              key={post.id}
              className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-2xl border border-white/5 hover:border-white/5"
            >
              <Link to={`/post/${post.id}`} className="block h-full">
                <div className="flex">
                  {/* Обложка слева */}
                  <div className="w-1/3">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Контент справа */}
                  <div className="w-2/3 p-6 flex flex-col">
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-300 mb-4 flex-grow">
                      {post.excerpt}
                    </p>
                    {/* Теги */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag.id}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            tag.color === 'blue' ? 'bg-blue-500/20 text-blue-300' :
                            tag.color === 'green' ? 'bg-green-500/20 text-green-300' :
                            tag.color === 'purple' ? 'bg-purple-500/20 text-purple-300' :
                            tag.color === 'orange' ? 'bg-orange-500/20 text-orange-300' :
                            tag.color === 'pink' ? 'bg-pink-500/20 text-pink-300' :
                            tag.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-300' :
                            tag.color === 'indigo' ? 'bg-indigo-500/20 text-indigo-300' :
                            tag.color === 'red' ? 'bg-red-500/20 text-red-300' :
                            tag.color === 'teal' ? 'bg-teal-500/20 text-teal-300' :
                            'bg-gray-500/20 text-gray-300'
                          }`}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-800">
                      <span className="bg-gray-800 px-3 py-1 rounded-full text-gray-300">
                        {post.author}
                      </span>
                      <span>{new Date(post.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogHome;