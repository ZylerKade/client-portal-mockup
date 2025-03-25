import React, { useState, useRef } from "react";

interface FileUploadZoneProps {
  onFileDrop: (files: FileList | null) => void;
}

export const FileUploadZone = ({ onFileDrop }: FileUploadZoneProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileDrop(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileDrop(e.target.files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={`file-upload-zone rounded-lg p-8 text-center cursor-pointer ${
        isDragActive ? 'active' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <div className="mb-3">
        <i className="ri-upload-cloud-2-line text-4xl text-slate-400"></i>
      </div>
      <p className="text-slate-600 mb-2">
        Drag and drop your files here, or <span className="text-primary font-medium">browse</span>
      </p>
      <p className="text-sm text-slate-500">Maximum file size: 10MB</p>
      <input 
        type="file" 
        id="file-input" 
        className="hidden" 
        onChange={handleFileSelect}
        ref={fileInputRef}
      />
    </div>
  );
};
