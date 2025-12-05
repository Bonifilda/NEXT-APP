import Link from 'next/link'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-blue-600 hover:underline font-medium">All Posts</Link></li>
              <li><Link href="/blog/category/tech" className="text-blue-600 hover:underline">Tech</Link></li>
              <li><Link href="/blog/category/lifestyle" className="text-blue-600 hover:underline">Lifestyle</Link></li>
              <li><Link href="/blog/category/education" className="text-blue-600 hover:underline">Education</Link></li>
            </ul>
          </div>
        </aside>
        <main className="md:col-span-3">
          {children}
        </main>
      </div>
    </div>
  )
}