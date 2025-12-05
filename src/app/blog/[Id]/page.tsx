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

async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      next: { revalidate: 60 } // ISR: revalidate every 60 seconds
    })
    
    if (!res.ok) {
      return null
    }
    
    return res.json()
  } catch (error) {
    return null
  }
}

async function getUser(userId: number): Promise<User | null> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      next: { revalidate: 60 }
    })
    
    if (!res.ok) {
      return null
    }
    
    return res.json()
  } catch (error) {
    return null
  }
}

export async function generateStaticParams() {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .catch(() => [])
  
  return posts.slice(0, 10).map((post: Post) => ({
    id: post.id.toString(),
  }))
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)
  
  if (!post) {
    return (
      <div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Post Not Found</h1>
          <p className="text-red-500 mb-6">The requested blog post could not be found.</p>
          <Link 
            href="/blog" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }
  
  const author = await getUser(post.userId)
  
  return (
    <div>
      <article className="bg-white rounded-lg p-8 shadow-sm">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center mb-6 text-gray-600">
          <span>By {author?.name || 'Unknown Author'}</span>
          {author?.email && (
            <>
              <span className="mx-2">•</span>
              <span>{author.email}</span>
            </>
          )}
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