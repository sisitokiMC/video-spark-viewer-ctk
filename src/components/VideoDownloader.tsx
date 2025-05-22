
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Download, Play, Settings, Folder, Link, Video, Music, List, User, 
  Infinity, Youtube, Globe, Plus, CheckCircle, RefreshCcw, X, Clock, Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

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
  const [subtitles, setSubtitles] = useState(false);
  const [smartMode, setSmartMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState('all');
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

  const filteredDownloads = downloads.filter(download => {
    if (currentTab === 'all') return true;
    if (currentTab === 'video') return download.format === 'MP4';
    if (currentTab === 'audio') return download.format === 'MP3';
    return true;
  }).filter(download => 
    download.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClearCompleted = () => {
    setDownloads(prev => prev.filter(d => d.status !== 'completed'));
    toast({
      title: "Cleared",
      description: "All completed downloads have been removed."
    });
  };

  const handlePauseAll = () => {
    toast({
      title: "Paused",
      description: "All active downloads have been paused."
    });
  };

  const handleDeleteDownload = (id: string) => {
    setDownloads(prev => prev.filter(d => d.id !== id));
    toast({
      title: "Deleted",
      description: "The download has been removed."
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
              <p className="text-sm text-gray-600">[Premium Version]</p>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Youtube className="w-4 h-4 mr-2" />
                        <span>Paste from YouTube</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Globe className="w-4 h-4 mr-2" />
                        <span>Paste from browser</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Format</label>
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
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Platform</label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="windows">Windows</SelectItem>
                        <SelectItem value="mac">Mac</SelectItem>
                        <SelectItem value="linux">Linux</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
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
                        <SelectItem value="Videos">
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

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Options</label>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <Settings className="w-4 h-4 mr-2" />
                            Advanced
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Advanced Options</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium">Download Subtitles</label>
                              <input 
                                type="checkbox" 
                                checked={subtitles}
                                onChange={(e) => setSubtitles(e.target.checked)}
                                className="rounded border-gray-300 text-green-600 focus:border-green-300 focus:ring focus:ring-offset-0 focus:ring-green-200 focus:ring-opacity-50"
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium">Smart Mode</label>
                              <input 
                                type="checkbox" 
                                checked={smartMode}
                                onChange={(e) => setSmartMode(e.target.checked)}
                                className="rounded border-gray-300 text-green-600 focus:border-green-300 focus:ring focus:ring-offset-0 focus:ring-green-200 focus:ring-opacity-50"
                              />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Downloads List */}
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <CardTitle>Downloads</CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <Input 
                      placeholder="Search downloads..." 
                      className="w-48" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="outline" size="sm" onClick={handlePauseAll}>
                      <Clock className="w-4 h-4 mr-2" />
                      Pause All
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleClearCompleted}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Clear Completed
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full" value={currentTab} onValueChange={setCurrentTab}>
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="video">Video</TabsTrigger>
                    <TabsTrigger value="audio">Audio</TabsTrigger>
                    <TabsTrigger value="playlists">Playlists</TabsTrigger>
                    <TabsTrigger value="channels">Channels</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-4 mt-4">
                    {filteredDownloads.length === 0 ? (
                      <div className="text-center py-10">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Download className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-gray-500 font-medium">No downloads found</h3>
                        <p className="text-gray-400 text-sm mt-1">
                          {searchTerm ? "Try a different search term" : "Paste a URL above to start downloading"}
                        </p>
                      </div>
                    ) : filteredDownloads.map((download) => (
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
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-900 truncate pr-4">{download.title}</h3>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 p-0 h-auto" onClick={() => handleDeleteDownload(download.id)}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mt-1">
                            <span>{download.size}</span>
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span>{download.format}</span>
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span>{download.quality}</span>
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span>{download.duration}</span>
                            <Badge variant={
                              download.status === 'completed' ? 'default' : 
                              download.status === 'downloading' ? 'secondary' : 
                              download.status === 'error' ? 'destructive' : 'outline'
                            } className="ml-2">
                              {download.status === 'completed' && 'Completed'}
                              {download.status === 'downloading' && 'Downloading...'}
                              {download.status === 'waiting' && 'Waiting'}
                              {download.status === 'error' && 'Error'}
                            </Badge>
                          </div>
                          {download.status === 'downloading' && (
                            <div className="mt-2">
                              <Progress value={download.progress} className="h-2" />
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>{Math.round(download.progress)}% completed</span>
                                <div className="flex space-x-2">
                                  <HoverCard>
                                    <HoverCardTrigger>
                                      <Button variant="ghost" size="sm" className="h-auto p-0">
                                        <Clock className="w-3 h-3 text-gray-400" />
                                      </Button>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-48">
                                      <div className="text-xs">
                                        <p className="font-medium">Download Details</p>
                                        <div className="mt-1 space-y-1">
                                          <p>Speed: 2.7 MB/s</p>
                                          <p>ETA: 1 min 42 sec</p>
                                          <p>Source: YouTube</p>
                                        </div>
                                      </div>
                                    </HoverCardContent>
                                  </HoverCard>
                                  <Button variant="ghost" size="sm" className="h-auto p-0">
                                    <RefreshCcw className="w-3 h-3 text-gray-400" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="video">
                    {/* Same layout as "all" tab, but filtered for videos */}
                    <div className="space-y-4 mt-4">
                      {filteredDownloads.length === 0 ? (
                        <div className="text-center py-10">
                          <Video className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                          <h3 className="text-gray-500 font-medium">No video downloads found</h3>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 mb-2">Showing video downloads only</div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="audio">
                    {/* Same layout as "all" tab, but filtered for audio */}
                    <div className="space-y-4 mt-4">
                      {filteredDownloads.length === 0 ? (
                        <div className="text-center py-10">
                          <Music className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                          <h3 className="text-gray-500 font-medium">No audio downloads found</h3>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 mb-2">Showing audio downloads only</div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="playlists">
                    <div className="text-center py-10 mt-4">
                      <List className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <h3 className="text-gray-500 font-medium">No playlists</h3>
                      <p className="text-gray-400 text-sm mt-1">Paste a playlist URL to download entire playlists</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="channels">
                    <div className="text-center py-10 mt-4">
                      <User className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <h3 className="text-gray-500 font-medium">No channels</h3>
                      <p className="text-gray-400 text-sm mt-1">Paste a channel URL to download from channels</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Smart Mode Info */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Target className="w-8 h-8 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Smart Mode Active</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Some items may not be available in the selected quality, format, and other settings. In such cases, they will be downloaded in the quality closest to your preferences.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Infinite Downloads */}
            <Card className="bg-green-500 text-white">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="text-3xl flex items-center justify-center">
                    <Infinity className="w-10 h-10" />
                  </div>
                  <div>
                    <p className="font-medium">Unlimited Downloads</p>
                    <p className="text-sm opacity-90">Premium version activated</p>
                  </div>
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
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Youtube className="w-4 h-4 mr-2" />
                      Supported Sites
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Supported Sites</DrawerTitle>
                      <DrawerDescription>
                        4K Video Downloader supports videos from these platforms
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {['YouTube', 'Vimeo', 'Facebook', 'TikTok', 'Twitch', 'Dailymotion', 'Instagram', 'Twitter'].map(site => (
                        <div key={site} className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{site}</span>
                        </div>
                      ))}
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDownloader;
