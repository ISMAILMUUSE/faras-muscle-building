'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogAPI } from '@/lib/api';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  image?: string;
  category: string;
  author: string;
  createdAt: string;
  views: number;
}

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      blogAPI.getBySlug(params.slug as string)
        .then((res) => {
          setPost(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-400">Loading post...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-400">Post not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold text-white mt-8 mb-4">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-white mt-6 mb-3">{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold text-white mt-4 mb-2">{line.substring(4)}</h3>;
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={index} className="text-gray-300 ml-6 mb-2">{line.substring(2)}</li>;
      } else if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="text-white font-semibold my-4">{line.substring(2, line.length - 2)}</p>;
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return <p key={index} className="text-gray-300 mb-4 leading-relaxed">{line}</p>;
      }
    });
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {post.image && (
              <div className="aspect-video bg-dark-lighter rounded-lg overflow-hidden mb-8">
                <img
                  src={post.image.startsWith('http') ? post.image : `http://localhost:5000${post.image}`}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="mb-8">
              <span className="text-primary font-semibold">{post.category}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-gray-400">
                <span>By {post.author}</span>
                <span>•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{post.views} views</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              {renderContent(post.content)}
            </div>
          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

