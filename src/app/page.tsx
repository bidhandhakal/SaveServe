import { createPost, getPosts } from './actions'
import PostForm from './PostForm'

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-zinc-950 text-zinc-100">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Next.js + Prisma + Neon.tech
        </h1>

        <div className="mb-12 p-6 border border-zinc-800 rounded-lg bg-zinc-900/50">
          <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
          <PostForm />
        </div>

        <div className="grid gap-6">
          <h2 className="text-2xl font-semibold">Latest Posts</h2>
          {posts.map((post: Awaited<ReturnType<typeof getPosts>>[number]) => (
            <div key={post.id} className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors">
              <h3 className="text-xl font-medium mb-2">{post.title}</h3>
              <p className="text-zinc-400 mb-4">{post.content}</p>
              <div className="flex justify-between text-xs text-zinc-500">
                <span>By {post.author.name}</span>
                <span>{post.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <p className="text-zinc-500 italic">No posts yet. Create one above!</p>
          )}
        </div>
      </div>
    </main>
  )
}
