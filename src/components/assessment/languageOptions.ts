/**
 * Language options for the code editor and Judge0 API
 */

export interface LanguageOption {
  id: number;       // Judge0 language ID
  name: string;     // Display name
  value: string;    // Monaco editor language identifier
}

export const languageOptions: LanguageOption[] = [
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

/**
 * Get a language option by its value (Monaco identifier)
 */
export function getLanguageByValue(value: string): LanguageOption | undefined {
  return languageOptions.find(lang => lang.value === value);
}

/**
 * Get a language option by its ID (Judge0 ID)
 */
export function getLanguageById(id: number): LanguageOption | undefined {
  return languageOptions.find(lang => lang.id === id);
}

/**
 * Get the default language (JavaScript)
 */
export function getDefaultLanguage(): LanguageOption {
  return languageOptions[0];
} 
