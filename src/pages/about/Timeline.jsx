import React from "react";

export default function Timeline({ posts }) {
  return (
    <div className="timeline space-y-6">
      {posts?.map((post) => (
        <div key={post.id} className="timeline-item flex gap-4 items-start">
          <div className="timeline-marker w-4 h-4 bg-blue-500 rounded-full" />
          <div className="timeline-content">
            <p className="font-medium">{post.content}</p>
            <span className="text-sm text-gray-500">
              {post.user} · {new Date(post.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
