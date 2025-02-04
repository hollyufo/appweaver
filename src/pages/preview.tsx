import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Client, Databases } from "appwrite";

export default function Preview() {
  const { id } = useParams<{ id: string }>();
  const [previewContent, setPreviewContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("ID parameter is missing");
      setPreviewContent("<p>ID is required to fetch the document</p>");
      setLoading(false);
      return;
    }

    const client = new Client();
    const databases = new Databases(client);

    client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("675c476f002ac321486a"); // Replace with your project ID

    const getDocument = async () => {
      try {
        const response = await databases.getDocument(
          "677e894b003892a46ace", // Replace with your database ID
          "677e964e0024844b80d7", // Replace with your collection ID
          id
        );
        setPreviewContent(response.html || "<p>No preview available</p>");
      } catch (error) {
        console.error("Failed to fetch document:", error);
        setError("Error loading preview. Please try again later.");
        setPreviewContent("<p>Error loading preview</p>");
      } finally {
        setLoading(false);
      }
    };

    getDocument();
  }, [id]);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex items-center justify-between shadow-lg">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="flex items-center space-x-2 text-white hover:text-gray-400">
            <Home size={24} />
            <span className="font-semibold">Home</span>
          </Link>
          <h1 className="text-lg font-semibold ml-auto">Preview Document</h1>
        </div>
      </nav>

      {/* Preview Content */}
      <div className="flex-grow bg-gray-100 flex justify-center items-center p-4">
        {loading ? (
          <p className="text-gray-700 text-lg animate-pulse">Loading preview...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : (
          <iframe
            srcDoc={previewContent}
            className="w-full h-full border-none rounded-lg shadow-md bg-white"
            title="Preview"
          />
        )}
      </div>
    </div>
  );
}
