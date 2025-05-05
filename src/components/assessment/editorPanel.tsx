"use client";

import { useState, useEffect, useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Play } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

// Define languages available
const languageOptions = [
  { id: 63, name: "JavaScript (Node.js 12.14.0)", value: "javascript" },
  { id: 71, name: "Python (3.8.1)", value: "python" },
  { id: 50, name: "C (GCC 9.2.0)", value: "c" },
  { id: 54, name: "C++ (GCC 9.2.0)", value: "cpp" },
  { id: 51, name: "C# (Mono 6.6.0.161)", value: "csharp" },
  { id: 62, name: "Java (OpenJDK 13.0.1)", value: "java" },
  { id: 78, name: "Kotlin (1.3.70)", value: "kotlin" },
  { id: 74, name: "TypeScript (3.7.4)", value: "typescript" },
  { id: 72, name: "Ruby (2.7.0)", value: "ruby" },
  { id: 73, name: "Rust (1.40.0)", value: "rust" },
  { id: 60, name: "Go (1.13.5)", value: "go" },
  { id: 68, name: "PHP (7.4.1)", value: "php" },
  { id: 79, name: "Swift (5.2.3)", value: "swift" },
];

type EditorPanelProps = {
  code: string;
  language: { id: number; name: string; value: string };
  onCodeChange: (code: string) => void;
  onLanguageChange: (language: { id: number; name: string; value: string }) => void;
  onRunCode: () => void;
  isSubmitting: boolean;
};

const EditorPanel = ({
  code,
  language,
  onCodeChange,
  onLanguageChange,
  onRunCode,
  isSubmitting
}: EditorPanelProps) => {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const [theme, setTheme] = useState<string>("vs-dark");
  const [fontSize, setFontSize] = useState<number>(14);
  const [previousLanguage, setPreviousLanguage] = useState(language.value);

  // Update editor content when code prop changes
  useEffect(() => {
    if (editorRef.current) {
      const currentValue = editorRef.current.getValue();
      if (code !== currentValue) {
        editorRef.current.setValue(code);
      }
    }
  }, [code]);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    
    // Set up editor
    editor.focus();
    
    // Set initial value
    if (code) {
      editor.setValue(code);
    }
    
    // Add keyboard shortcut for running code (Ctrl+Enter or Cmd+Enter)
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      () => {
        onRunCode();
      }
    );

    // Configure editor for a better coding experience
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
    });
  };

  // Handle language change
  const handleLanguageChange = (value: string) => {
    // Store previous language
    setPreviousLanguage(language.value);
    
    // Find selected language
    const selectedLanguage = languageOptions.find(lang => lang.value === value);
    if (selectedLanguage) {
      // Notify parent component of language change
      onLanguageChange(selectedLanguage);
    }
  };

  // Effect to update editor language highlighting
  useEffect(() => {
    if (editorRef.current && monacoRef.current && language.value !== previousLanguage) {
      // Properly access the Monaco editor API through our saved reference
      const editor = editorRef.current;
      const model = editor.getModel();
      if (model) {
        monacoRef.current.editor.setModelLanguage(model, language.value);
      }
      setPreviousLanguage(language.value);
    }
  }, [language.value, previousLanguage]);

  // Handle code change
  const handleCodeChange = (value: string = "") => {
    // Only update if the value actually changed to prevent infinite loops
    if (value !== code) {
      onCodeChange(value);
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="flex justify-between items-center p-3 border-b bg-slate-50">
        <div className="flex items-center gap-2">
          <Select
            value={language.value}
            onValueChange={handleLanguageChange}
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((lang) => (
                <SelectItem key={lang.id} value={lang.value}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={fontSize.toString()}
            onValueChange={(value) => setFontSize(parseInt(value))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Font size" />
            </SelectTrigger>
            <SelectContent>
              {[12, 14, 16, 18, 20, 22].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}px
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={theme}
            onValueChange={setTheme}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vs-dark">Dark</SelectItem>
              <SelectItem value="vs-light">Light</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={onRunCode} 
          disabled={isSubmitting}
          className="gap-2"
        >
          <Play className="h-4 w-4" />
          Run
        </Button>
      </div>
      
      <CardContent className="p-0 flex-1">
        <Editor
          height="100%"
          width="100%"
          language={language.value}
          value={code}
          theme={theme}
          onChange={handleCodeChange}
          onMount={handleEditorDidMount}
          options={{
            fontSize: fontSize,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            readOnly: isSubmitting,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default EditorPanel; 
