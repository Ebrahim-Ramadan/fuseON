import React from 'react'

export const Blog = ({data}) => {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen">
          {data.blogsOverview.map((blog) => (
            <div key={blog.id}>
              <h1>{blog.title}</h1>
              <p>{blog.content}</p>
            </div>
          ))}
    </div>
  )
}
