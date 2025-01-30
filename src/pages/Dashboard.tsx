import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  ExternalLink,
  Search,
  Filter,
  Grid,
  List,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Client, Databases } from "appwrite";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("675c476f002ac321486a");

const databases = new Databases(client);
const databaseId = "677e894b003892a46ace";
const collectionId = "677e964e0024844b80d7";

export default function Dashboard() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name">("newest");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true);
        const response = await databases.listDocuments(
          databaseId,
          collectionId
        );
        setDocuments(response.documents);
        setFilteredDocs(response.documents);
      } catch (error) {
        setError("Failed to fetch projects. Please try again later.");
        console.error("Error fetching documents:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  useEffect(() => {
    const filtered = documents.filter((doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    let sorted = [...filtered];
    switch (sortBy) {
      case "newest":
        sorted.sort(
          (a, b) =>
            new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
        );
        break;
      case "oldest":
        sorted.sort(
          (a, b) =>
            new Date(a.$createdAt).getTime() - new Date(b.$createdAt).getTime()
        );
        break;
      case "name":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredDocs(sorted);
  }, [searchTerm, documents, sortBy]);

  const ProjectCard = ({ doc }: { doc: any }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-sm overflow-hidden border border-gray-700/50 transition-all duration-300 hover:border-[#95cb63] hover:shadow-xl hover:shadow-blue-500/20"
    >
      <div className="p-4 border-b border-gray-700/50">
        <h2 className="text-xl font-semibold text-white truncate">
          {doc.title}
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-gray-400">
            Created: {new Date(doc.$createdAt).toLocaleDateString()}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-[#95cb63] text-black">
            ID: {doc.$id.slice(0, 8)}
          </span>
        </div>
      </div>

      <div className="relative aspect-video bg-gray-900">
        <iframe
          srcDoc={doc.html}
          title={doc.title}
          className="w-full h-full border-none"
          scrolling="no"
        />
        <div
          onClick={() => window.open(`/preview/${doc.$id}`, "_blank")}
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-white font-medium bg-[#95cb63]/80 px-4 py-2 rounded-full"
          >
            <ExternalLink className="w-4 h-4" />
            Open Preview
          </motion.span>
        </div>
      </div>
    </motion.div>
  );

  const ProjectList = ({ doc }: { doc: any }) => (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="group flex items-center gap-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 transition-all duration-300 hover:border-[#95cb63]"
    >
      <div className="w-40 aspect-video relative rounded-lg overflow-hidden bg-gray-900">
        <iframe
          srcDoc={doc.html}
          title={doc.title}
          className="w-full h-full border-none"
          scrolling="no"
        />
      </div>

      <div className="flex-1">
        <h2 className="text-xl font-semibold text-white">{doc.title}</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-gray-400">
            Created: {new Date(doc.$createdAt).toLocaleDateString()}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-[#95cb63]  text-black">
            ID: {doc.$id}
          </span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => window.open(`/preview/${doc.$id}`, "_blank")}
        className="px-4 py-2 rounded-full bg-[#95cb63] text-black hover:bg-[#669a35] hover:text-white transition-all duration-300"
      >
        Open Preview
      </motion.button>
    </motion.div>
  );

return (
  <div className="min-h-screen to-black">
    <main className="container mx-auto px-6 py-8">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <LayoutDashboard className="w-8 h-8 text-[#95cb63]" />
          <h1 className="text-4xl font-bold text-white">The weaver hub</h1>
        </div>
        <p className="text-gray-400">
          Take a look at what people are making with Appweaver
        </p>
      </header>

      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-[#95cb63] transition-all duration-300"
          />
        </div>

        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 text-white focus:outline-none focus:border-[#95cb63] transition-all duration-300"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name</option>
          </select>

          <div className="flex items-center gap-2 bg-gray-800/50 p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-[#95cb63] text-white"
                  : "text-gray-400"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-[#95cb63] text-white"
                  : "text-gray-400"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-500/20 border border-red-500/50 text-red-400 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-[#95cb63] animate-spin" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            layout
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredDocs.map((doc) =>
              viewMode === "grid" ? (
                <ProjectCard key={doc.$id} doc={doc} />
              ) : (
                <ProjectList key={doc.$id} doc={doc} />
              )
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {!isLoading && filteredDocs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">
            No projects found matching your search.
          </p>
        </div>
      )}
    </main>
  </div>
);

}
