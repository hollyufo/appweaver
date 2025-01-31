import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Client, Databases } from 'appwrite';

export default function Preview() {
  const { id } = useParams<{ id: string }>();
  const [previewContent, setPreviewContent] = useState('');

  useEffect(() => {
    if (!id) {
      console.error('ID parameter is missing');
      setPreviewContent('<p>ID is required to fetch the document</p>');
      return;
    }

    const client = new Client();
    const databases = new Databases(client);

    client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('675c476f002ac321486a'); // Replace with your project ID

    const getDocument = async () => {
      try {
        const response = await databases.getDocument(
          '677e894b003892a46ace', // Replace with your database ID
          '677e964e0024844b80d7', // Replace with your collection ID
          id
        );
        setPreviewContent(response.html || '<p>No preview available</p>');
      } catch (error) {
        console.error('Failed to fetch document:', error);
        setPreviewContent('<p>Error loading preview</p>');
      }
    };

    getDocument();
  }, [id]);

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-lg">
            Back to Home
          </Link>
        </div>
      </nav>
      
      <div className="flex-grow bg-white">
        <iframe
          srcDoc={previewContent}
          className="w-full h-full border-none"
          title="Preview"
        />
      </div>
    </div>
  );
}
