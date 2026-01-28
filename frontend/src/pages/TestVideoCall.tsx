// frontend/src/pages/TestVideoCall.tsx
import { useState, useEffect } from 'react';
import { Video, Mic, MicOff, VideoOff, Phone, User, Camera } from 'lucide-react';
import T from '@/components/T';

const TestVideoCall = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const startCamera = async () => {
      try {
        console.log('🎥 Requesting camera access...');
        
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          },
          audio: true
        });
        
        console.log('✅ Camera access granted');
        console.log('📹 Video tracks:', mediaStream.getVideoTracks().length);
        console.log('🎤 Audio tracks:', mediaStream.getAudioTracks().length);
        
        setStream(mediaStream);
        
        // Log track details
        mediaStream.getTracks().forEach((track, i) => {
          console.log(`Track ${i}:`, {
            kind: track.kind,
            id: track.id,
            label: track.label,
            enabled: track.enabled,
            readyState: track.readyState
          });
        });
        
      } catch (err: any) {
        console.error('❌ Camera error:', err);
        setError(`Error: ${err.name} - ${err.message}`);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        console.log('🧹 Cleaning up stream...');
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
        console.log(`📹 Video ${videoTrack.enabled ? 'enabled' : 'disabled'}`);
      }
    }
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
        console.log(`🎤 Audio ${audioTrack.enabled ? 'enabled' : 'disabled'}`);
      }
    }
  };

  const listDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log('📱 Available devices:', devices);
      
      alert(`Found ${devices.length} devices. Check console for details.`);
    } catch (err) {
      console.error('Error listing devices:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            <T>Camera & Video Test</T>
          </h1>
          <p className="text-gray-400">
            <T>Test your camera and microphone permissions</T>
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg">
            <h3 className="text-white font-bold mb-2">
              <T>Error:</T>
            </h3>
            <p className="text-red-300">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Camera Preview */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              <T>Camera Preview</T>
            </h2>
            
            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6 relative">
              {stream ? (
                <video
                  autoPlay
                  playsInline
                  muted
                  ref={(video) => {
                    if (video && stream) {
                      video.srcObject = stream;
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">
                      <T>Camera feed will appear here</T>
                    </p>
                  </div>
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <div className="bg-black/70 text-white px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isVideoOn ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>
                      <T>Camera</T>{' '}
                      {isVideoOn ? <T>On</T> : <T>Off</T>}
                    </span>
                  </div>
                </div>
                
                <div className="bg-black/70 text-white px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${!isMuted ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>
                      <T>Mic</T>{' '}
                      {isMuted ? <T>Muted</T> : <T>On</T>}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full ${!isVideoOn ? 'bg-red-500' : 'bg-gray-700'} text-white hover:opacity-90 transition`}
              >
                {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
              </button>
              
              <button
                onClick={toggleAudio}
                className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700'} text-white hover:opacity-90 transition`}
              >
                {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
              </button>
              
              <button
                onClick={listDevices}
                className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Status Info */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              <T>Status Information</T>
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h3 className="text-gray-300 font-medium mb-2">
                  <T>Camera Status</T>
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      <T>Stream Active:</T>
                    </span>
                    <span className={stream ? 'text-green-400' : 'text-red-400'}>
                      {stream ? <T>Yes</T> : <T>No</T>}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      <T>Video Tracks:</T>
                    </span>
                    <span className="text-white">
                      {stream?.getVideoTracks().length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      <T>Audio Tracks:</T>
                    </span>
                    <span className="text-white">
                      {stream?.getAudioTracks().length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      <T>Video Enabled:</T>
                    </span>
                    <span className={isVideoOn ? 'text-green-400' : 'text-red-400'}>
                      {isVideoOn ? <T>Yes</T> : <T>No</T>}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      <T>Audio Enabled:</T>
                    </span>
                    <span className={!isMuted ? 'text-green-400' : 'text-red-400'}>
                      {!isMuted ? <T>Yes</T> : <T>No</T>}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h3 className="text-gray-300 font-medium mb-2">
                  <T>Browser Information</T>
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      <T>Browser:</T>
                    </span>
                    <span className="text-white">
                      {navigator.userAgent.split(' ')[0]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      <T>HTTPS:</T>
                    </span>
                    <span className={window.location.protocol === 'https:' ? 'text-green-400' : 'text-yellow-400'}>
                      {window.location.protocol === 'https:' ? <T>Yes</T> : <T>No (Localhost OK)</T>}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      <T>Localhost:</T>
                    </span>
                    <span className={window.location.hostname === 'localhost' ? 'text-green-400' : 'text-yellow-400'}>
                      {window.location.hostname === 'localhost' ? <T>Yes</T> : <T>No</T>}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h3 className="text-gray-300 font-medium mb-2">
                  <T>Next Steps</T>
                </h3>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>
                      <T>Test camera permissions</T>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">→</span>
                    <span>
                      <T>Open browser console (F12) for detailed logs</T>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">→</span>
                    <span>
                      <T>Click "List Devices" to see all available cameras/mics</T>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">→</span>
                    <span>
                      <T>Test Twilio connection after camera works</T>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => window.open('http://localhost:5001/api/health', '_blank')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <T>Test Backend Health</T>
          </button>
          
          <button
            onClick={() => window.open('http://localhost:5001/api/test', '_blank')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <T>Test Backend API</T>
          </button>
          
          <button
            onClick={() => {
              console.clear();
              console.log('🧹 Console cleared');
              alert('Console cleared');
            }}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            <T>Clear Console</T>
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <T>Reload Page</T>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestVideoCall;