import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/videos');
      setVideos(res.data);
    } catch (err) {
      console.error('Error fetching videos:', err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleUpload = async () => {
    if (!videoFile) return alert('Choose a video first');

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Upload successful!');
      fetchVideos(); // Refresh list
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      

      <h3>📺 Available Videos</h3>
      {videos.map(video => (
        <div key={video.key} style={{ marginBottom: '1rem' }}>
          <video width="480" controls>
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p>{video.key}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
