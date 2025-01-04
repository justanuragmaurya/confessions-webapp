import UpvoteButton from "@/components/upvoteButton";
import prisma from "@/lib/db";

export default async function Confessions(){
    const data = await prisma.post.findMany({
        include: {
          author: true,
        },
        orderBy: {
          date: 'desc'
        }
      });

    return(
        <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Confessions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">👍 {post.upvotes}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{post.content}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span>{post.date.toLocaleDateString()}</span>
                  {post.isAnonymous ? (
                    <span className="bg-gray-100 px-2 py-1 rounded">Anonymous</span>
                  ) : (
                    <span className="bg-blue-100 px-2 py-1 rounded">{post.author.name || 'Unnamed User'}</span>
                  )}
                </div>
              </div>
              
              {post.image && (
                <div className="mt-4">
                  <a href={post.image}>
                  <img 
                    src={post.image} 
                    alt="Post image" 
                    className="w-full h-32 object-contain rounded"
                  />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    )
}