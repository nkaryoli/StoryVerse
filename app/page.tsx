import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center p-3 text-center">
    
      <div className="max-w-4xl mx-auto space-y-8">
        
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
          <span className="block text-white text-3xl">Descubre Mundos Increíbles con</span>
          StoryVerse
        </h1>

        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Explora nuestra extensa colección de libros y películas. 
          Encuentra tu próxima aventura literaria o tu próxima película favorita.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          <Link 
            href="/books"
            className="group p-6 bg-sidebar hover:bg-sidebar-border rounded-xl transition-all duration-300 border border-gray-700 hover:border-blue-500"
          >
            <div className="text-4xl mb-3">📚</div>
            <h2 className="text-xl font-semibold mb-2">Libros</h2>
            <p className="text-gray-400 group-hover:text-gray-300">
              Descubre libros por género
            </p>
          </Link>
          
          <Link 
            href="/movies"
            className="group p-6 bg-sidebar hover:bg-sidebar-border rounded-xl transition-all duration-300 border border-gray-700 hover:border-green-600"
          >
            <div className="text-4xl mb-3">🎬</div>
            <h2 className="text-xl font-semibold mb-2">Películas</h2>
            <p className="text-gray-400 group-hover:text-gray-300">
              Explora películas populares
            </p>
          </Link>
        </div>

      </div>
    </div>
  );
}