'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import client from '../services/apolloClient'; // Import your Apollo Client instance
import { GET_COUNTRIES_QUERY } from '../services/coutryService';
import countries from '../data/countriesData';
import CountryMap from './CountryMap';
import { LeafletCountry } from '../types/country';
import Loader from './Loader';

const CountryDataComponent: React.FC = () => {
  const codes = useMemo(() => countries.map(c => c.isoCode), []);
  const [countriesData, setCountriesData] = useState<LeafletCountry[]>([]);


  const fetchCountries = useCallback(async () => {
    const { data } = await client.query({
      query: GET_COUNTRIES_QUERY,
      variables: { codes },
      fetchPolicy: 'cache-first',
    });

    const countriesWithCoordinates = data?.countries.map((c: LeafletCountry) => ({
      ...c,
      ...countries.find(country => country.isoCode === c.code),
    }));

    setCountriesData(countriesWithCoordinates);
  }, [codes]);

  useEffect(() => {
    fetchCountries()
  },[fetchCountries])

  return (
    <>
      {countriesData.length > 0 ? (
        <CountryMap countries={countriesData} />
      ) : (
        <Loader/>
      )}
    </>
  );
};

export default CountryDataComponent;
