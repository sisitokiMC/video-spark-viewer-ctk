
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Play, Settings, Folder, Link, Video, Music, List, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DownloadItem {
  id: string;
  title: string;
  url: string;
  progress: number;
  status: 'waiting' | 'downloading' | 'completed' | 'error';
  format: string;
  quality: string;
  size: string;
  duration: string;
  thumbnail: string;
}

const VideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [quality, setQuality] = useState('best');
  const [format, setFormat] = useState('video');
  const [platform, setPlatform] = useState('windows');
  const [saveLocation, setSaveLocation] = useState('Videos');
  const [downloads, setDownloads] = useState<DownloadItem[]>([
    {
      id: '1',
      title: 'PlayStation Leak UFO Statements Samsung News of the Week',
      url: 'https://example.com/video1',
      progress: 16,
      status: 'downloading',
      format: 'MP4',
      quality: '1080p',
      size: '45.7 MB of 277.9 MB',
      duration: '1 minute',
      thumbnail: '/placeholder.svg'
    },
    {
      id: '2',
      title: 'Sony X85L Review Better than the more expensive siblings',
      url: 'https://example.com/video2',
      progress: 100,
      status: 'completed',
      format: 'MP4',
      quality: '1080p',
      size: '199.3 MB',
      duration: '11:37',
      thumbnail: '/placeholder.svg'
    }
  ]);
  const [dailyDownloads, setDailyDownloads] = useState(29);
  const { toast } = useToast();

  const handleDownload = () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL.",
        variant: "destructive"
      });
      return;
    }

    const newDownload: DownloadItem = {
      id: Date.now().toString(),
      title: 'New Download...',
      url: url,
      progress: 0,
      status: 'waiting',
      format: format === 'video' ? 'MP4' : 'MP3',
      quality: quality,
      size: 'Calculating...',
      duration: 'Unknown',
      thumbnail: '/placeholder.svg'
    };

    setDownloads(prev => [newDownload, ...prev]);
    setUrl('');

    // Simulate download progress
    setTimeout(() => {
      setDownloads(prev => prev.map(d => 
        d.id === newDownload.id 
          ? { ...d, status: 'downloading', title: 'Video downloading...', size: '25.4 MB of 156.8 MB' }
          : d
      ));

      const interval = setInterval(() => {
        setDownloads(prev => prev.map(d => {
          if (d.id === newDownload.id && d.progress < 100) {
            const newProgress = Math.min(d.progress + Math.random() * 15, 100);
            if (newProgress >= 100) {
              clearInterval(interval);
              return { 
                ...d, 
                progress: 100, 
                status: 'completed',
                title: 'Download completed',
                size: '156.8 MB'
              };
            }
            return { ...d, progress: newProgress };
          }
          return d;
        }));
      }, 500);
    }, 1000);

    toast({
      title: "Download started",
      description: "The download has been added to the queue."
    });
  };

  const handleActivateLicense = () => {
    toast({
      title: "Activate license",
      description: "Activate your license to download more."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">4K Video Downloader+</h1>
              <p className="text-sm text-gray-600">[Not Activated]</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Account
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Download Controls */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Link className="w-5 h-5 text-green-500" />
                  <span>Paste Link</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Paste video URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleDownload} className="bg-green-500 hover:bg-green-600">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Video</label>
                    <Select value={format} onValueChange={setFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">
                          <div className="flex items-center">
                            <Video className="w-4 h-4 mr-2" />
                            Video
                          </div>
                        </SelectItem>
                        <SelectItem value="audio">
                          <div className="flex items-center">
                            <Music className="w-4 h-4 mr-2" />
                            Audio
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Quality</label>
                    <Select value={quality} onValueChange={setQuality}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="best">Best Quality</SelectItem>
                        <SelectItem value="4k">4K</SelectItem>
                        <SelectItem value="1440p">1440p</SelectItem>
                        <SelectItem value="1080p">1080p</SelectItem>
                        <SelectItem value="720p">720p</SelectItem>
                        <SelectItem value="480p">480p</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">For</label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="windows">Windows</SelectItem>
                        <SelectItem value="mac">Mac</SelectItem>
                        <SelectItem value="linux">Linux</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Save to</label>
                    <Select value={saveLocation} onValueChange={setSaveLocation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="videos">
                          <div className="flex items-center">
                            <Folder className="w-4 h-4 mr-2" />
                            Videos
                          </div>
                        </SelectItem>
                        <SelectItem value="downloads">Downloads</SelectItem>
                        <SelectItem value="desktop">Desktop</SelectItem>
                        <SelectItem value="custom">Custom...</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Downloads List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Downloads</CardTitle>
                  <div className="text-sm text-gray-600">2 items</div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="alle" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="alle">All</TabsTrigger>
                    <TabsTrigger value="video">Video</TabsTrigger>
                    <TabsTrigger value="audio">Audio</TabsTrigger>
                    <TabsTrigger value="playlists">Playlists</TabsTrigger>
                    <TabsTrigger value="kanale">Channels</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="alle" className="space-y-4 mt-4">
                    {downloads.map((download) => (
                      <div key={download.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-16 h-12 bg-gray-300 rounded overflow-hidden flex-shrink-0">
                          <img src={download.thumbnail} alt="" className="w-full h-full object-cover" />
                          {download.status === 'downloading' && (
                            <div className="relative -mt-12 w-full h-12 bg-black bg-opacity-50 flex items-center justify-center">
                              <Play className="w-6 h-6 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{download.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>{download.size}</span>
                            <span>{download.format}</span>
                            <span>{download.quality}</span>
                            <span>{download.duration}</span>
                            <Badge variant={download.status === 'completed' ? 'default' : download.status === 'downloading' ? 'secondary' : 'outline'}>
                              {download.status === 'completed' && 'Completed'}
                              {download.status === 'downloading' && 'Downloading...'}
                              {download.status === 'waiting' && 'Waiting'}
                              {download.status === 'error' && 'Error'}
                            </Badge>
                          </div>
                          {download.status === 'downloading' && (
                            <div className="mt-2">
                              <Progress value={download.progress} className="h-2" />
                              <div className="text-xs text-gray-500 mt-1">{Math.round(download.progress)}% completed</div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* License Activation */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Download className="w-8 h-8 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Automatic Settings Adjustment</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Some items may not be available in the selected quality, format, and other settings. In such cases, they will be downloaded in the quality closest to your preferences.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Downloads */}
            <Card className="bg-green-500 text-white">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold">{dailyDownloads}</div>
                  <div>
                    <p className="font-medium">daily downloads remaining</p>
                    <p className="text-sm opacity-90">Activate your license to download more</p>
                  </div>
                  <Button 
                    onClick={handleActivateLicense}
                    className="w-full bg-white text-green-500 hover:bg-gray-100"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Activate
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <List className="w-4 h-4 mr-2" />
                  Download Playlist
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Download Channel
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Folder className="w-4 h-4 mr-2" />
                  Open Download Folder
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDownloader;
