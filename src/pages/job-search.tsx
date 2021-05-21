import React, { FC, useMemo, useState, useEffect, useRef } from "react"

import { useQueryParam, StringParam } from 'use-query-params';

import Header from "../components/Header"
import Footer from "../components/Footer"
import PostingList from "../components/JobSearch/PostingList"
import { useAllPostings } from "../hooks/useAllPostings"

const JobSearch: FC = () => {
  const postings = useAllPostings();
  const [showLocationsFilter, setShowLocationsFilter] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [showDepartmentsFilter, setShowDepartmentsFilter] = useState(false);
  const [selectedDepartaments, setSelectedDepartaments] = useState([]);

  const [showSeniorityFilter, setShowSeniorityFilter] = useState(false);
  const [selectedSeniorities, setSelectedSeniorities] = useState([]);

  const [filteringOptionsModal, setFilteringOptionsModal] = useState(false);
  const [hidePlaceholder, setHidePlaceholder] = useState(false);
  const [query, setQuery] = useState('');

  const [filteredPostings, setFilteredPostings] = useState(postings);

  const inputRef = useRef(null);

  const [selectedQueryLocation, setSelectedQueryLocation] = useQueryParam("locations", StringParam);
  const [selectedQueryDepartaments, setSelectedQueryDepartaments] = useQueryParam("departaments", StringParam);
  const [selectedQuerySeniority, setSelectedQuerySeniority] = useQueryParam("seniority", StringParam);

  useEffect(() => {
    if (selectedQueryLocation && selectedQueryLocation.length) {
      setSelectedLocations(selectedQueryLocation.split(','))
    } else {
      setSelectedLocations([]);
    }

    if (selectedQueryDepartaments && selectedQueryDepartaments.length) {
      setSelectedDepartaments(selectedQueryDepartaments.split(','))
    } else {
      setSelectedDepartaments([]);
    }
    
    if (selectedQuerySeniority && selectedQuerySeniority.length) {
      setSelectedSeniorities(selectedQuerySeniority.split(','))
    } else {
      setSelectedSeniorities([]);
    }
  }, [selectedQueryLocation, selectedQueryDepartaments, selectedQuerySeniority])
  
  useEffect(() => {
    const currentFilteredPostings = [];
    
    postings.forEach((post) => {
      if (
        (!query.length || post.title.toLowerCase().includes(query.toLowerCase())) &&
        (!selectedLocations.length || selectedLocations.includes(post.location)) &&
        (!selectedDepartaments.length || selectedDepartaments.includes(post.department)) && 
        (!selectedSeniorities.length || selectedSeniorities.includes(post.seniority))
        ) {
          currentFilteredPostings.push(post)
        } 
      })
      
      setFilteredPostings(currentFilteredPostings);
    }, [selectedLocations, selectedDepartaments, selectedSeniorities, query])

  function useOutsideAlerter() {
    useEffect(() => {
      function handleClickOutside(event) {

        if (
          (closeOnOutsideRef.current && !closeOnOutsideRef.current.some((element) => element === event.target)) &&
          (filterButtons.current && !filterButtons.current.some((element) => element === event.target))
        ) {
          setShowLocationsFilter(false);
          setShowDepartmentsFilter(false);
          setShowSeniorityFilter(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [closeOnOutsideRef]);
  }

  const closeOnOutsideRef = useRef([]);
  const filterButtons = useRef([]);
  useOutsideAlerter();

  // All of this should be extracted to a Filter components
  const agregate = useMemo(() => {
    return postings && postings.reduce((acc, { location }) => {
      if (!acc[location]){
        acc[location] = 0
      }

      acc[location]++ 

      return acc
    }, {})
  }, [postings])

  const locationOptions = useMemo(() => {
    return agregate ? Object.keys(agregate).map(loc => ({
      value: loc,
      label: `${loc} (${agregate[loc]})`
    })) : []
  }, [agregate])

  const departamentsAgregate = useMemo(() => {
    return postings && postings.reduce((acc, { department }) => {
      if (!acc[department]){
        acc[department] = 0
      }

      acc[department]++

      return acc
    }, {})
  }, [postings])

  const departamentsOptions = useMemo(() => {
    return departamentsAgregate ? Object.keys(departamentsAgregate).map(dept => ({
      value: dept,
      label: `${dept} (${departamentsAgregate[dept]})`
    })) : []
  }, [departamentsAgregate])

  const seniorityAgregate = useMemo(() => {
    return postings && postings.reduce((acc, { seniority }) => {
      if (!acc[seniority]){
        acc[seniority] = 0
      }

      acc[seniority]++
     return acc
    }, {})
  }, [postings])

  const seniorityOptions = useMemo(() => {
    return seniorityAgregate ? Object.keys(seniorityAgregate).map(snr => ({
      value: snr,
      label: `${snr} (${seniorityAgregate[snr]})`
    })) : []
  }, [seniorityAgregate])

  const handleSelectLocation = (value: string) => {
    let selectedLocationQueries = selectedQueryLocation ? selectedQueryLocation.split(',') : [];

    if (selectedLocationQueries.includes(value)) {
      selectedLocationQueries = selectedLocationQueries.filter((loc) => loc !== value);
    } else {
      selectedLocationQueries.push(value);
    }

    setSelectedQueryLocation(selectedLocationQueries.join(','))
  }

  const handleSelectDepartament = (value: string) => {
    let selectedDepartamentQueries = selectedQueryDepartaments ? selectedQueryDepartaments.split(',') : [];

    if (selectedDepartamentQueries.includes(value)) {
      selectedDepartamentQueries = selectedDepartamentQueries.filter((dpt) => dpt !== value);
    } else {
      selectedDepartamentQueries.push(value);
    }

    setSelectedQueryDepartaments(selectedDepartamentQueries.join(','))
  }

  const handleSelectSeniority= (value: string) => {
    let selectedSeniorityQueries = selectedQuerySeniority ? selectedQuerySeniority.split(',') : [];

    if (selectedSeniorityQueries.includes(value)) {
      selectedSeniorityQueries = selectedSeniorityQueries.filter((snr) => snr !== value);
    } else {
      selectedSeniorityQueries.push(value);
    }

    setSelectedQuerySeniority(selectedSeniorityQueries.join(','))
  }

  const onClickSearchButton = () => alert('search-button');
  
  const handleClearFilters = () => {
    setSelectedLocations([]);
    setSelectedDepartaments([]);
    setSelectedSeniorities([]);
  }

  const onClickPlaceholder = () => {
    setHidePlaceholder(true);
    inputRef.current.focus();
  }

  const onBlurSearchQuery = () => {
    if (!query.length) {
      setHidePlaceholder(false);
    }
  }

  return (
    <div className="job-search-main">
      <Header />
      {/* Extract into Header maybe */}
      <div
        style={{
          backgroundImage:
            "url(https://careers.vtex.com/wp-content/uploads/2020/10/bg_jobsearch.png)",
          backgroundPosition: "center left",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: 400
        }}
        className="w-100 cover-container"
      >
        <h2 className="cover-title">
          Explore our jobs and choose your next challenge.
        </h2>
        <form onSubmit={(event) => event.preventDefault()} style={{ width: '100%' }}>
          <div className="search-query-wrapper">
            <input
              ref={inputRef}
              type="text"
              id="search-query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onBlur={onBlurSearchQuery}
            />
            <button
              className={`search-query-placeholder${hidePlaceholder || query.length ? ' hide' : ''}`}
              type="button"
              onClick={onClickPlaceholder}
            >
              Write <span>here</span> your next future...
            </button>
          </div>
        </form>
      </div>
      {/* Extract into Filters */}
      <div className="w-100 flex flex-col justify-center items-center -mt-9 text-center">
        <div className="flex" style={{ width: '100%' }}>
          <div className="w-100 filters-list-container">
            <button
              id="search-button"
              type="button"
              onClick={onClickSearchButton}
            >
              Search Jobs
            </button>
            <button
              id="filtering-options-button"
              type="button"
              onClick={() => setFilteringOptionsModal(!filteringOptionsModal)}
            >
              Filtering options
            </button>
            <div
              id="filtering-options-modal"
              className={`${filteringOptionsModal ? 'show' : ''}`}
            >
              <div className="modal-content">
                <h5 className="modal-title">Filtering options</h5>
                <div 
                  className={`search-job-filters locations-filters${
                  showLocationsFilter ? ' show' : ''
                }`}>
                  <button
                    ref={(ref) => filterButtons.current.push(ref)}
                    type="button"
                    className="show-filters-list"
                    onClick={() => setShowLocationsFilter(!showLocationsFilter)}
                  >
                    Locations
                  </button>
                  <div
                    ref={(ref) => closeOnOutsideRef.current.push(ref)}
                    id="search-locations"
                    className="filters-list-content"
                    >
                    {locationOptions.map((location) => (
                      <button
                        className={`category-button${
                          selectedLocations.includes(location.value)
                            ? ' selected'
                            : ''}`}
                        onClick={() => handleSelectLocation(location.value)}
                        key={location.label}
                      >
                        {location.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={`search-job-filters areas-of-work-filters${
                  showDepartmentsFilter ? ' show' : ''
                }`}>
                  <button
                    ref={(ref) => filterButtons.current.push(ref)}
                    type="button"
                    className="show-filters-list"
                    onClick={() => setShowDepartmentsFilter(!showDepartmentsFilter)}
                  >
                    Areas of work
                  </button>
                  <div
                    id="search-areas-of-work"
                    className="filters-list-content"
                    ref={(ref) => closeOnOutsideRef.current.push(ref)}
                  >
                    {departamentsOptions.map((departament) => (
                      <button
                        className={`category-button${
                          selectedDepartaments.includes(departament.value)
                            ? ' selected'
                            : ''}`}
                        onClick={() => handleSelectDepartament(departament.value)}
                        key={departament.label}
                      >
                        {departament.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={`search-job-filters seniority-level-filters${
                  showSeniorityFilter ? ' show' : ''
                }`}>
                  <button
                    ref={(ref) => filterButtons.current.push(ref)}
                    type="button"
                    className="show-filters-list"
                    onClick={() => setShowSeniorityFilter(!showSeniorityFilter)}
                  >
                    Seniority level
                  </button>
                  <div
                    id="search-seniority-level"
                    className="filters-list-content"
                    ref={(ref) => closeOnOutsideRef.current.push(ref)}
                  >
                    {seniorityOptions.map((seniority) => (
                      <button
                        className={`category-button${
                          selectedSeniorities.includes(seniority.value)
                            ? ' selected'
                            : ''}`}
                        onClick={() => handleSelectSeniority(seniority.value)}
                        key={seniority.label}
                      >
                        {seniority.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                id="clear-all-filters-button"
                type="button"
                onClick={handleClearFilters}
              >
                Clear all filters
              </button>
              <button
                id="apply-filters-button"
                type="button"
                onClick={() => setFilteringOptionsModal(!filteringOptionsModal)}
              >
                Apply filters
              </button>
            </div>
          </div>
        </div>
        <p
          id="main-count-feedback"
          className="pt-4 text-md text-black"
        >
          We have
          {' '}
          <span className="all">{postings.length}</span>
          {' '}
          jobs in
          {' '}
          {Object.keys(agregate).length}
          {' '}
          locations in
          {' '}
          {Object.keys(departamentsAgregate).length}
          {' '}
          areas of work in
          {' '}
          {Object.keys(seniorityAgregate).length}
          {' '}
          seniority levels
        </p>
      </div>
      {postings?.length ? <PostingList postings={filteredPostings} /> : null}
      <Footer />
    </div>
  )
}

export default JobSearch
