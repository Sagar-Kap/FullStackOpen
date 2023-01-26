const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <ul>
        <li>Population 🡆 {country.population}</li>
        <li>Capital 🡆 {country.capital}</li>
      </ul>
      <img
        src={country.flags.png}
        height="100"
        alt={`flag of ${country.name.common}`}
      />
    </div>
  );
};

export default Country;
