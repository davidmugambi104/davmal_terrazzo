// components/layout/SocialMediaSynergy/LivePageFeed.jsx
export default function LivePageFeed({ posts, theme }) {
    return (
      <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <h3 className="text-xl font-bold mb-4">Live Activity</h3>
        <div className="space-y-4">
          {posts?.map(post => (
            <div key={post.id} className="p-4 rounded-lg bg-white/10">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <p>{post.content}</p>
              </div>
              <div className="mt-2 text-sm opacity-75">
                {post.user} · {new Date(post.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }