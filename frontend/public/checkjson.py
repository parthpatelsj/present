import json
import os

def is_valid_json(file_path):
    try:
        with open(file_path, 'r') as file:
            json.load(file)
        return True
    except (json.JSONDecodeError, FileNotFoundError):
        return False

def find_invalid_json_files(directory):
    invalid_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            if not is_valid_json(file_path):
                invalid_files.append(file_path)
    return invalid_files

# Replace 'your_directory_path' with the path to the directory you want to check
directory_path = 'kirtans'
invalid_json_files = find_invalid_json_files(directory_path)

if invalid_json_files:
    print("Invalid JSON files found:")
    for file_path in invalid_json_files:
        print(file_path)
else:
    print("No invalid JSON files found.")
