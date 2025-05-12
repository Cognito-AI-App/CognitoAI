import os
import pathlib
from typing import List, Set

# Files, folders and extensions to ignore
ignored_files = {"yarn.lock", "temp.py", "temp.txt", "temp_init.txt", "package-lock.json"}
ignored_folders = {"node_modules", ".vscode", ".git", ".next"}
ignored_extensions = {".png", ".wav", ".ico", ".svg", ".webp"}


def is_ignored(path: str) -> bool:
    """Check if a path should be ignored."""
    filename = os.path.basename(path)
    if filename in ignored_files:
        return True

    # Check extensions
    ext = os.path.splitext(filename)[1].lower()
    if ext in ignored_extensions:
        return True

    # Check if path contains any ignored folder
    path_parts = pathlib.Path(path).parts
    for folder in ignored_folders:
        if folder in path_parts:
            return True

    return False


def dfs_directory(root_dir: str, output_file) -> None:
    """Perform DFS on the directory and write structure to the output file."""
    # First, generate and write the folder structure
    output_file.write("PROJECT FOLDER STRUCTURE:\n")
    output_file.write("=======================\n\n")

    for root, dirs, files in os.walk(root_dir, topdown=True):
        # Filter out ignored directories in-place
        dirs[:] = [d for d in dirs if d not in ignored_folders]

        level = root.replace(root_dir, "").count(os.sep)
        indent = " " * 4 * level
        output_file.write(f"{indent}{os.path.basename(root)}/\n")

        sub_indent = " " * 4 * (level + 1)
        for file in sorted(files):
            file_path = os.path.join(root, file)
            if not is_ignored(file_path):
                output_file.write(f"{sub_indent}{file}\n")

    # Then, write the content of each file
    output_file.write("\n\nFILE CONTENTS:\n")
    output_file.write("=============\n\n")

    for root, dirs, files in os.walk(root_dir, topdown=True):
        # Filter out ignored directories in-place
        dirs[:] = [d for d in dirs if d not in ignored_folders]

        for file in sorted(files):
            file_path = os.path.join(root, file)
            if not is_ignored(file_path):
                rel_path = os.path.relpath(file_path, root_dir)
                output_file.write(f"File: {rel_path}\n")
                output_file.write("=" * (len(rel_path) + 6) + "\n\n")

                try:
                    with open(file_path, "r", encoding="utf-8", errors="replace") as f:
                        content = f.read()
                        output_file.write(content)
                except Exception as e:
                    output_file.write(f"[Error reading file: {str(e)}]\n")

                output_file.write("\n\n" + "=" * 80 + "\n\n")


def main():
    # Current directory is the root of the project
    root_dir = os.path.dirname(os.path.abspath(__file__))

    with open("temp.txt", "w", encoding="utf-8") as output_file:
        dfs_directory(root_dir, output_file)

    print(f"Project structure and file contents have been written to temp.txt")


if __name__ == "__main__":
    main()
