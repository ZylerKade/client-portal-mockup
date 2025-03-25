import { useState } from "react";
import { File } from "../../../types";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { FileUploadZone } from "@/components/ui/file-upload-zone";
import { formatDistanceToNow } from "date-fns";

interface FilesSectionProps {
  files: File[];
  onAddFile: (file: File) => void;
  onDeleteFile: (id: string) => void;
}

export default function FilesSection({ files, onAddFile, onDeleteFile }: FilesSectionProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentUpload, setCurrentUpload] = useState<{ name: string; size: string } | null>(null);

  const handleFileDrop = (uploadedFiles: FileList | null) => {
    if (!uploadedFiles || uploadedFiles.length === 0) return;
    
    const file = uploadedFiles[0];
    const fileSize = formatFileSize(file.size);
    
    setCurrentUpload({ name: file.name, size: fileSize });
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Add file to state
          setTimeout(() => {
            const newFile: File = {
              id: `file-${Date.now()}`,
              name: file.name,
              size: fileSize,
              type: file.name.split('.').pop() || 'unknown',
              uploadedAt: new Date()
            };
            
            onAddFile(newFile);
            setIsUploading(false);
            setCurrentUpload(null);
            
            toast({
              title: "File uploaded",
              description: `${file.name} has been uploaded successfully.`,
              variant: "default",
            });
          }, 500);
        }
        return newProgress;
      });
    }, 100);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string): { icon: string; bgColor: string; textColor: string } => {
    const type = fileType.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(type)) {
      return { icon: 'ri-image-line', bgColor: 'bg-violet-100', textColor: 'text-violet-600' };
    } else if (['xlsx', 'xls', 'csv'].includes(type)) {
      return { icon: 'ri-file-excel-2-line', bgColor: 'bg-emerald-100', textColor: 'text-emerald-600' };
    } else if (['pdf'].includes(type)) {
      return { icon: 'ri-file-pdf-line', bgColor: 'bg-red-100', textColor: 'text-red-600' };
    } else if (['doc', 'docx'].includes(type)) {
      return { icon: 'ri-file-word-line', bgColor: 'bg-blue-100', textColor: 'text-blue-600' };
    } else {
      return { icon: 'ri-file-text-line', bgColor: 'bg-blue-100', textColor: 'text-blue-600' };
    }
  };

  const handleDeleteFile = (id: string, name: string) => {
    onDeleteFile(id);
    toast({
      title: "File deleted",
      description: `${name} has been deleted.`,
      variant: "default",
    });
  };

  return (
    <section className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="sm:flex sm:items-center sm:justify-between mb-5">
            <h2 className="text-lg font-medium text-slate-900">Your Files</h2>
            <Button 
              onClick={() => document.getElementById('file-input')?.click()}
              className="mt-3 sm:mt-0"
            >
              <i className="ri-upload-2-line mr-2"></i>
              <span>Upload New</span>
            </Button>
          </div>

          {/* File Upload Zone */}
          <FileUploadZone onFileDrop={handleFileDrop} />

          {/* Upload Progress (Initially Hidden) */}
          {isUploading && currentUpload && (
            <div className="mb-6 mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{currentUpload.name}</span>
                <span className="text-sm text-slate-500">{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            </div>
          )}

          {/* Files List */}
          <div className="mt-6">
            <div className="border-b border-slate-200 pb-2 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="text-sm font-medium text-slate-700 px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200">
                    All Files
                  </button>
                  <button className="text-sm font-medium text-slate-600 px-3 py-1 rounded-md hover:bg-slate-100">
                    Recent
                  </button>
                  <button className="text-sm font-medium text-slate-600 px-3 py-1 rounded-md hover:bg-slate-100">
                    Shared
                  </button>
                </div>
                <div className="relative">
                  <input 
                    type="search" 
                    placeholder="Search files..." 
                    className="pl-8 pr-3 py-1 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <i className="ri-search-line absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                </div>
              </div>
            </div>

            {/* File Items */}
            <div className="space-y-3">
              {files.length > 0 ? (
                files.map(file => {
                  const { icon, bgColor, textColor } = getFileIcon(file.type);
                  return (
                    <div 
                      key={file.id} 
                      className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded ${bgColor} flex items-center justify-center ${textColor} mr-3`}>
                          <i className={`${icon} text-xl`}></i>
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{file.name}</p>
                          <p className="text-xs text-slate-500">
                            {file.size} • Uploaded {formatDistanceToNow(new Date(file.uploadedAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100">
                          <i className="ri-download-line"></i>
                        </button>
                        <button 
                          className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                          onClick={() => handleDeleteFile(file.id, file.name)}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center">
                  <div className="mb-3 flex justify-center">
                    <i className="ri-file-list-3-line text-4xl text-slate-300"></i>
                  </div>
                  <h3 className="text-slate-700 font-medium mb-1">No files yet</h3>
                  <p className="text-slate-500 text-sm mb-4">Upload your first file to get started</p>
                  <Button onClick={() => document.getElementById('file-input')?.click()}>
                    <i className="ri-upload-2-line mr-2"></i>
                    <span>Upload a File</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
