import requests
from bs4 import BeautifulSoup
import json
import os
import time

# Function to scrape and process a URL
def scrape_url(url, processed_urls):
    if url in processed_urls:
        print(f"Skipping already processed URL: {url}")
        return None
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract title, kirtan-info, and media-info
        title_elem = soup.find('h1', id='title_en')
        if title_elem:
            title = title_elem.get_text(strip=True)
        else:
            title = f"Untitled_{url}"  # Create a placeholder title

        kirtan_info = soup.find('div', id='kirtan-info_en')
        media_info = soup.find('div', id='media-info')

        # Extract metadata from media-info
        if media_info:
            no_media_message = media_info.find('p', class_='nomedia')
            
            if no_media_message:
                # Handle the case where the kirtan is not published in any known media
                media_info_dict = {'media_message': no_media_message.get_text(strip=True)}
            else:
                media_title_elem = media_info.find('div', class_='title')
                media_artist_elem = media_info.find('div', class_='artist')
                media_track_elem = media_info.find('div', class_='track')

                # Check if any of the elements is None
                if media_title_elem and media_artist_elem and media_track_elem:
                    media_title = media_title_elem.get_text(strip=True)
                    media_artist = media_artist_elem.get_text(strip=True)
                    media_track = media_track_elem.get_text(strip=True)
                    media_image = media_info.find('img', id='album_art')['src']
                    media_info_dict = {
                        'media_title': media_title,
                        'media_artist': media_artist,
                        'media_track': media_track,
                        'media_image': media_image
                    }
                else:
                    media_info_dict = {}
        else:
            media_info_dict = {}

        # Extract song lyrics
        song_div = soup.find('div', id='text_en')
        if song_div:
            lines = [line.get_text(strip=True) for line in song_div.find_all('p', class_='k_line_en')]
            song_json = {
                'song_lyrics': lines,
                'title': title,
                'metadata': {'kirtan_info': str(kirtan_info), 'media_info': media_info_dict},
                'part': int(url.split('&part=')[1].split('&')[0]),
                'no': int(url.split('&no=')[1])
            }
            return song_json
        else:
            print(f"Song div not found on the page: {url}")
    else:
        print(f"Failed to retrieve the page {url}. Status code: {response.status_code}")

# Load processed URLs from existing JSON files
def load_processed_urls(directory):
    processed_urls = set()
    for filename in os.listdir(directory):
        if filename.endswith(".json"):
            try:
                with open(os.path.join(directory, filename), 'r', encoding='utf-8') as json_file:
                    data = json.load(json_file)
                    if 'part' in data and 'no' in data:
                        url = f"https://anirdesh.com/kirtan/index.php?lang=EN&part={data['part']}&no={data['no']}"
                        processed_urls.add(url)
            except json.decoder.JSONDecodeError:
                print(f"Error decoding JSON in file: {filename}")
    return processed_urls

# Generate URLs dynamically
base_url = "https://anirdesh.com/kirtan/index.php"
lang = "EN"

# Define the range for part and no parameters
part_range = range(1, 3)  # Assuming it starts from 1 and ends at 2
no_range = range(601, 700)  # Assuming it starts from 1 and ends at 99

# Create a directory to store individual JSON files
output_directory = 'kirtans'
os.makedirs(output_directory, exist_ok=True)

# Load processed URLs
processed_urls = load_processed_urls(output_directory)

# Loop through all combinations of part and no
for part in part_range:
    for no in no_range:
        url = f"{base_url}?lang={lang}&part={part}&no={no}"
        song_data = scrape_url(url, processed_urls)
        if song_data:
            # Create a unique filename based on the title
            filename = os.path.join(output_directory, f'{song_data["title"]}.json')
            
            # Save the individual kirtan to a separate JSON file
            with open(filename, 'w', encoding='utf-8') as json_file:
                json.dump(song_data, json_file, ensure_ascii=False, indent=2)
        time.sleep(1)

print("Scraping completed.")
