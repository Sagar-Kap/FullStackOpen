const SingleCountry = ({ country }) => {
  const lang = Object.values(country.languages);
  console.log(lang);
  var counter = 0;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div className="primary-info">
        <li>Capital {country.capital[0]}</li>
        <li>Area {country.area}</li>
      </div>
      <h2>Languages:</h2>
      <ul>
        {lang.map((language) => (
          <li key={counter++}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Country's Flag" />
    </div>
  );
};

export default SingleCountry;
