import { google } from 'googleapis'

export async function fetchDriveFiles() {
  try {
    // Parse service account key
    const key = JSON.parse(import.meta.env.VITE_GDRIVE_KEY)
    const folderId = import.meta.env.VITE_GDRIVE_FOLDER_ID

    // Authenticate
    const auth = new google.auth.GoogleAuth({
      credentials: key,
      scopes: ['https://www.googleapis.com/auth/drive.readonly']
    })

    const drive = google.drive({ version: 'v3', auth })

    // List files in folder
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: 'files(id, name, mimeType, webViewLink, webContentLink)'
    })

    return response.data.files || []
  } catch (err) {
    console.error('Error fetching Google Drive files:', err)
    return []
  }
}
