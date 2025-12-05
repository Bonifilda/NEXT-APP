import Link from 'next/link'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

// Mock category mapping - in real app, this would come from a database
const categoryMapping: { [key: string]: number[] } = {
  tech: [1, 2, 3, 4],
  lifestyle: [5, 6, 7, 8], 
  education: [9, 10, 11, 12]
}

const categoryTitles: { [key: string]: string } = {
  tech: 'Technology',
  lifestyle: 'Lifestyle', 
  education: 'Education'
}

async function getCategoryPosts(category: string): Promise<Post[]> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      next: { revalidate: 3600 } 
    })
    
    if (!res.ok) {
      return []
    }
    
    const allPosts: Post[] = await res.json()
    const categoryPostIds = categoryMapping[category] || []
    
    return allPosts.filter(post => categoryPostIds.includes(post.id))
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function generateStaticParams() {
  return [
    { category: 'tech' },
    { category: 'lifestyle' },
    { category: 'education' }
  ]
}

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}) {
  const { category } = await params
  
  // Validate category
  if (!categoryMapping[category]) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Invalid Category</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-4">The category "{category}" does not exist.</p>
        <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← Back to Blog
        </Link>
      </div>
    )
  }
  
  const posts = await getCategoryPosts(category)
  const categoryTitle = categoryTitles[category]

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">{categoryTitle} Posts</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Showing posts in the {categoryTitle.toLowerCase()} category.
      </p>
      
      {posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No posts found in this category.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <article key={post.id} className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                <Link 
                  href={`/blog/${post.id}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                {post.body.substring(0, 150)}...
              </p>
              <Link 
                href={`/blog/${post.id}`}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm mt-2 inline-block"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}