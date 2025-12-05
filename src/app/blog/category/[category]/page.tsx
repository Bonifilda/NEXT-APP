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
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  
  if (!res.ok) {
    return []
  }
  
  const allPosts: Post[] = await res.json()
  const categoryPostIds = categoryMapping[category] || []
  
  return allPosts.filter(post => categoryPostIds.includes(post.id))
}

export async function generateStaticParams() {
  return [
    { category: 'tech' },
    { category: 'lifestyle' },
    { category: 'education' }
  ]
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const posts = await getCategoryPosts(params.category)
  const categoryTitle = categoryTitles[params.category] || params.category

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">{categoryTitle} Posts</h1>
      <p className="text-gray-600 mb-8">
        Showing posts in the {categoryTitle.toLowerCase()} category.
      </p>
      
      {posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No posts found in this category.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <article key={post.id} className="bg-white border rounded-lg p-6 shadow-sm">
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
          ))}
        </div>
      )}
    </div>
  )
}