import { Client, Databases    } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("675c476f002ac321486a");

const databases = new Databases(client);

/**
 * Uploads two strings to the Appwrite database and connects them.
 *
 * @param string1 - The first string to upload.
 * @param string2 - The second string to upload.
 * @returns A promise that resolves when the document is created.
 */
export function uploadStrings(string1: string, string2: string, uniqueid:string): Promise<any> {
  console.log("Deploying your project...");

  // Generate a unique ID for the document
 
  // Specify your database ID and collection ID
  const databaseId = '677e894b003892a46ace';
  const collectionId = '677e964e0024844b80d7';

  // Create a document with the two strings
  return databases.createDocument(databaseId, collectionId, uniqueid, {
    html: string1,
    title: string2,
  })
  .then((response: any) => {
    console.log('Document created successfully:', response);
    return response;
  })
  .catch((error: any) => {
    console.error('Error creating document:', error);
    throw error;
  });
}
