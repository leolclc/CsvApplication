const { getCSVData } = require('./filesController');

exports.searchUsers = (req, res) => {
  const searchTerm = req.query.q;

  if (!searchTerm) {
    return res.status(400).json({ error: 'No search term provided' });
  }
  const csvData = getCSVData();
  const results = csvData.filter((row) => {
    for (const column of Object.values(row)) {
      if (column.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
    }
    return false;
  });
  if (results.length === 0) {
    return res.status(404).json({ message: 'No matching results found' });
  }
  const formattedResults = results.map((row) => {
    const name = row[0];
    const city = row[1];
    const country = row[2]; 
    const favorite_sport = row[3]; 
    return { name, city, country, favorite_sport };
  });
  res.status(200).json({ results: formattedResults });
};