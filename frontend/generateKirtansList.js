const fs = require('fs');
const path = require('path');

const kirtansPath = path.join(__dirname, 'public', 'kirtans');
const kirtanListPath = path.join(kirtansPath, 'kirtanList.json');

// Create the directory if it doesn't exist
if (!fs.existsSync(kirtansPath)) {
  fs.mkdirSync(kirtansPath, { recursive: true });
}

const kirtansFolder = path.join(__dirname, 'public', 'kirtans');

const kirtanFiles = fs.readdirSync(kirtansFolder)
  .filter(file => path.extname(file) === '.json');

const kirtanList = kirtanFiles.map(file => {
  const filePath = path.join(kirtansFolder, file);
  const kirtanData = require(filePath); // Assuming each JSON file is a valid module
  return {
    title: kirtanData.title,
    // Add other properties you want to include in kirtanList
  };
});

// Write the file
fs.writeFileSync(kirtanListPath, JSON.stringify(kirtanList, null, 2));

console.log('Kirtan list generated successfully!');
