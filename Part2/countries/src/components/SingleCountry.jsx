import Weather from "./Weather";

const SingleCountry = ({ country }) => {
  const lang = Object.values(country.languages);
  var counter = 0;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div className="primary-info">
        <li>Capital {country.capital[0]}</li>
        <li>Area {country.area} km2</li>
      </div>
      <h2>Languages:</h2>
      <ul>
        {lang.map((language) => (
          <li key={counter++}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Flag of the country" />
      <Weather country={country} />
    </div>
  );
};

export default SingleCountry;
