"use client";

import { useState, useEffect, useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { languageOptions, LanguageOption } from "./languageOptions";

type EditorPanelProps = {
  code: string;
  language: LanguageOption;
  onCodeChange: (code: string) => void;
  onLanguageChange: (language: LanguageOption) => void;
  onRunCode: () => void;
  isSubmitting: boolean;
};

function EditorPanel({
  code,
  language,
  onCodeChange,
  onLanguageChange,
  onRunCode,
<<<<<<< HEAD
  isSubmitting,
=======
  isSubmitting
<<<<<<< Updated upstream
=======
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
}: EditorPanelProps) {
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
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRunCode();
    });

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
    const selectedLanguage = languageOptions.find(
      (lang) => lang.value === value
    );
    if (selectedLanguage) {
      // Notify parent component of language change
      onLanguageChange(selectedLanguage);
    }
  };

  // Effect to update editor language highlighting
  useEffect(() => {
    if (
      editorRef.current &&
      monacoRef.current &&
      language.value !== previousLanguage
    ) {
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
          <Select value={language.value} onValueChange={handleLanguageChange}>
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

          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vs-dark">Dark</SelectItem>
              <SelectItem value="vs-light">Light</SelectItem>
            </SelectContent>
          </Select>
        </div>
<<<<<<< HEAD

        <Button disabled={isSubmitting} className="gap-2" onClick={onRunCode}>
=======
        
        <Button 
          disabled={isSubmitting} 
          className="gap-2"
          onClick={onRunCode}
        >
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
          <Play className="h-4 w-4" />
          Run
        </Button>
      </div>

      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          width="100%"
          language={language.value}
          value={code}
          theme={theme}
          options={{
            fontSize: fontSize,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            readOnly: isSubmitting,
          }}
          onChange={handleCodeChange}
          onMount={handleEditorDidMount}
        />
      </div>
    </Card>
  );
}

export default EditorPanel;
