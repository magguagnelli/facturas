import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X, Download, Eye } from 'lucide-react';
import './XMLUploadForm.css';

export default function XMLUploadForm() {
  const [files, setFiles] = useState<any[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [xmlContent, setXmlContent] = useState('');
  const [parsedData, setParsedData] = useState<any>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const parseXML = (xmlString: string) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");
      
      const parserError = xmlDoc.querySelector('parsererror');
      if (parserError) {
        throw new Error('Error al parsear el XML');
      }

      const xmlToJson = (node: any): any => {
        const obj: any = {};
        
        if (node.attributes && node.attributes.length > 0) {
          obj['@attributes'] = {};
          for (let i = 0; i < node.attributes.length; i++) {
            obj['@attributes'][node.attributes[i].name] = node.attributes[i].value;
          }
        }
        
        if (node.childNodes && node.childNodes.length > 0) {
          for (let i = 0; i < node.childNodes.length; i++) {
            const child = node.childNodes[i];
            
            if (child.nodeType === 3) {
              const text = child.textContent.trim();
              if (text) {
                obj['#text'] = text;
              }
            } else if (child.nodeType === 1) {
              const nodeName = child.nodeName;
              
              if (!obj[nodeName]) {
                obj[nodeName] = xmlToJson(child);
              } else {
                if (!Array.isArray(obj[nodeName])) {
                  obj[nodeName] = [obj[nodeName]];
                }
                obj[nodeName].push(xmlToJson(child));
              }
            }
          }
        }
        
        return obj;
      };

      return xmlToJson(xmlDoc.documentElement);
    } catch (error) {
      console.error('Error parsing XML:', error);
      return null;
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const xmlFiles = Array.from(fileList).filter(file => 
      file.name.endsWith('.xml') || file.type === 'text/xml' || file.type === 'application/xml'
    );

    const newFiles = xmlFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      status: 'ready',
      uploadDate: new Date().toLocaleString()
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    if (selectedFile?.id === id) {
      setSelectedFile(null);
      setXmlContent('');
      setParsedData(null);
    }
  };

  const viewFile = async (fileObj: any) => {
    setSelectedFile(fileObj);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setXmlContent(content);
      const parsed = parseXML(content);
      setParsedData(parsed);
    };
    reader.readAsText(fileObj.file);
  };

  const processFiles = () => {
    const updatedFiles = files.map(f => ({
      ...f,
      status: 'processed'
    }));
    setFiles(updatedFiles);
  };

  const downloadJSON = () => {
    if (!parsedData) return;
    
    const json = JSON.stringify(parsedData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.name.replace('.xml', '.json');
    a.click();
  };

  return (
   
	<div className="xml-upload-container"> 
	  <div>
	  
	  </div>
      <div className="xml-upload-max-width">
        <div className="xml-upload-header">
          <div className="xml-upload-header-content">
            <FileText size={48} color="#026757" />
            <h1 className="xml-upload-title">ATENCIÓN A PROVEEDORES</h1>
			<br/><br/>
            
          </div>
		  <h2 className="xml-upload-title-2">Carga de Archivos XML Abraham</h2>
          <p className="xml-upload-subtitle">Arrastra tus archivos XML o haz clic para seleccionarlos</p>
        </div>

        <div className="xml-upload-grid-large">
          <div className="xml-upload-grid">
            <div
              className={`xml-upload-area ${dragActive ? 'active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                accept=".xml,text/xml,application/xml"
                onChange={handleChange}
                className="xml-upload-input"
              />
              
              <Upload size={64} color="#026757" className="xml-upload-icon-center" />
              <h3 className="xml-upload-area-title">Selecciona o arrastra archivos XML</h3>
              <p className="xml-upload-area-subtitle">Soporta múltiples archivos • Formato: .xml</p>
            </div>

            <div className="xml-upload-card">
              <div className="xml-upload-card-header">
                <h3 className="xml-upload-card-title">Archivos cargados ({files.length})</h3>
                {files.length > 0 && (
                  <button onClick={processFiles} className="xml-upload-button">
                    <CheckCircle size={16} />
                    Procesar todos
                  </button>
                )}
              </div>

              {files.length === 0 ? (
                <div className="xml-upload-empty-state">
                  <FileText size={48} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
                  <p>No hay archivos cargados</p>
                </div>
              ) : (
                <div className="xml-upload-files-container">
                  {files.map(file => (
                    <div
                      key={file.id}
                      className={`xml-upload-file-item ${selectedFile?.id === file.id ? 'selected' : ''}`}
                    >
                      <div className="xml-upload-file-info">
                        <FileText size={20} color="#026757" />
                        <div className="xml-upload-file-details">
                          <p className="xml-upload-file-name">{file.name}</p>
                          <p className="xml-upload-file-size">{file.size} • {file.uploadDate}</p>
                        </div>
                      </div>
                      
                      <div className="xml-upload-file-actions">
                        {file.status === 'processed' && (
                          <CheckCircle size={20} color="#026757" />
                        )}
                        <button
                          onClick={() => viewFile(file)}
                          className="xml-upload-icon-button"
                          title="Ver contenido"
                        >
                          <Eye size={16} color="#026757" />
                        </button>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="xml-upload-icon-button"
                          title="Eliminar"
                        >
                          <X size={16} color="#026757" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="xml-upload-card">
            {selectedFile ? (
              <>
                <div className="xml-upload-card-header">
                  <h3 className="xml-upload-card-title">Vista Previa</h3>
                  {parsedData && (
                    <button onClick={downloadJSON} className="xml-upload-button-purple">
                      <Download size={16} />
                      JSON
                    </button>
                  )}
                </div>

                <div className="xml-upload-preview-box">
                  <p className="xml-upload-preview-title">{selectedFile.name}</p>
                  <p className="xml-upload-preview-size">{selectedFile.size}</p>
                </div>

                <div className="xml-upload-section">
                  <h4 className="xml-upload-section-title">XML Original</h4>
                  <pre className="xml-upload-code-block">{xmlContent}</pre>
                </div>

                {parsedData && (
                  <div className="xml-upload-section">
                    <h4 className="xml-upload-section-title">Datos en formato JSON</h4>
                    <pre className="xml-upload-code-block-blue">{JSON.stringify(parsedData, null, 2)}</pre>
                  </div>
                )}

                {!parsedData && (
                  <div className="xml-upload-alert">
                    <AlertCircle size={20} color="#fbbf24" />
                    <p className="xml-upload-alert-text">No se pudo parsear el XML</p>
                  </div>
                )}
              </>
            ) : (
              <div className="xml-upload-empty-state">
                <Eye size={64} style={{ margin: '0 auto 1rem', opacity: 0.5}} color ="#026757" />
                <h3 className="xml-upload-empty-state-large">
                  Selecciona un archivo para ver su contenido
                </h3>
                <p className="xml-upload-empty-state-small">
                  Haz clic en el ícono de ojo en cualquier archivo
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}