import Link from 'next/link'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

// Mock category assignment for demo
const getPostCategory = (id: number): string => {
  if (id <= 4) return 'tech'
  if (id <= 8) return 'lifestyle'
  return 'education'
}

const categoryColors: { [key: string]: string } = {
  tech: 'bg-blue-100 text-blue-800',
  lifestyle: 'bg-green-100 text-green-800',
  education: 'bg-purple-100 text-purple-800'
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  
  return res.json()
}

export default async function Blog() {
  const posts = await getPosts()
  
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Blog Posts (SSG)</h1>
      <p className="text-gray-600 mb-8">
        This page uses Static Site Generation (SSG) to pre-render blog posts at build time.
      </p>
      <div className="grid gap-6">
        {posts.slice(0, 12).map((post) => {
          const category = getPostCategory(post.id)
          return (
            <article key={post.id} className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[category]}`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2">
                <Link 
                  href={`/blog/${post.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 line-clamp-3">
                {post.body.substring(0, 150)}...
              </p>
              <Link 
                href={`/blog/${post.id}`}
                className="text-blue-600 hover:underline text-sm mt-2 inline-block"
              >
                Read more →
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}