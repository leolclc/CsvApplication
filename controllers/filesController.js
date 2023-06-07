let csvData = [];

const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    if (req.file.mimetype !== 'text/csv') {
        return res.status(400).json({ error: 'Invalid file format. Only CSV files are allowed' });
    }

    csvData = [];

    req.file.buffer
        .toString('utf8')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .forEach((line) => {
            const row = line.split(',');
            csvData.push(row);
        });
    if (csvData.length === 0) {
        return res.status(400).json({ error: 'Empty CSV file. Please upload a valid CSV file' });
    }
    res.status(200).json({ message: 'File uploaded successfully'});
};

const getCSVData = () => {
    return csvData;
}
module.exports = { uploadFile, getCSVData };