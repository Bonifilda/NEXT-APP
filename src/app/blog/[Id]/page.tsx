import Link from 'next/link'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface User {
  id: number
  name: string
  email: string
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 60 } // ISR: revalidate every 60 seconds
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch post')
  }
  
  return res.json()
}

async function getUser(userId: number): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
    next: { revalidate: 60 }
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch user')
  }
  
  return res.json()
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)
  const author = await getUser(post.userId)
  
  return (
    <div>
      <article className="bg-white rounded-lg p-8 shadow-sm">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center mb-6 text-gray-600">
          <span>By {author.name}</span>
          <span className="mx-2">•</span>
          <span>{author.email}</span>
        </div>
        
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">{post.body}</p>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">
            This page uses Incremental Static Regeneration (ISR) - content is revalidated every 60 seconds.
          </p>
        </div>
      </article>
      
      <div className="mt-6">
        <Link 
          href="/blog" 
          className="text-blue-600 hover:underline"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  )
}