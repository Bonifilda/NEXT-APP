interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
  company: {
    name: string
  }
}

async function getAuthorInfo(): Promise<User> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users/1', {
    cache: 'no-store' // This ensures SSR
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch author info')
  }
  
  return res.json()
}

export default async function About() {
  const author = await getAuthorInfo()
  
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl text-black font-bold mb-6">About (SSR)</h1>
      
        <h2 className="text-2xl  text-black font-semibold mb-4">Author Information</h2>
        <div className="space-y-2 text-black">
          <p><strong>Name:</strong> {author.name}</p>
          <p><strong>Email:</strong> {author.email}</p>
          <p><strong>Phone:</strong> {author.phone}</p>
          <p><strong>Website:</strong> {author.website}</p>
          <p><strong>Company:</strong> {author.company.name}</p>
        </div>
        <p className="text-sm text-black mt-4">
          This data is fetched using Server-Side Rendering (SSR)
        </p>
      </div>
    
  )
}