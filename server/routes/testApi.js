const fetchAutocomplete = async (query) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/autocomplete?q=${query}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching autocomplete data:', error);
  }
};

fetchAutocomplete('london').then((data) => console.log(data));
