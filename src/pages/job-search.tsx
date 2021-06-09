import React, { FC, useMemo, useState, useEffect, useRef } from "react"

import { useQueryParam, StringParam } from 'use-query-params';

import Header from "../components/Header"
import SEO from '../components/seo'
import Footer from "../components/Footer"
import PostingList from "../components/JobSearch/PostingList"
import { useAllPostings } from "../hooks/useAllPostings"

const JobSearch: FC = () => {
  const postings = useAllPostings();
  const [showLocationsFilter, setShowLocationsFilter] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [showDepartmentsFilter, setShowDepartmentsFilter] = useState(false);
  const [selectedDepartaments, setSelectedDepartaments] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  const [showSeniorityFilter, setShowSeniorityFilter] = useState(false);
  const [selectedSeniorities, setSelectedSeniorities] = useState([]);

  const [filteringOptionsModal, setFilteringOptionsModal] = useState(false);
  const [hidePlaceholder, setHidePlaceholder] = useState(false);
  const [query, setQuery] = useState('');

  const [filteredPostings, setFilteredPostings] = useState(postings);

  const inputRef = useRef(null);

  const [selectedQueryLocation, setSelectedQueryLocation] = useQueryParam("locations", StringParam);
  const [selectedQueryDepartaments, setSelectedQueryDepartaments] = useQueryParam("departaments", StringParam);
  const [selectedQueryTeams, setSelectedQueryTeams] = useQueryParam("teams", StringParam);
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

    if (selectedQueryTeams && selectedQueryTeams.length) {
      setSelectedTeams(selectedQueryTeams.split(','))
    } else {
      setSelectedTeams([]);
    }
    
    if (selectedQuerySeniority && selectedQuerySeniority.length) {
      setSelectedSeniorities(selectedQuerySeniority.split(','))
    } else {
      setSelectedSeniorities([]);
    }
  }, [selectedQueryLocation, selectedQueryDepartaments, selectedQueryTeams, selectedQuerySeniority])
  
  useEffect(() => {
    const currentFilteredPostings = [];
    
    postings.forEach((post) => {
      if (
        (!query.length || post.title.toLowerCase().includes(query.toLowerCase())) &&
        (!selectedLocations.length || selectedLocations.includes(post.location)) &&
        (!selectedDepartaments.length || selectedDepartaments.includes(post.department)) && 
        (!selectedTeams.length || selectedTeams.includes(post.team)) && 
        (!selectedSeniorities.length || selectedSeniorities.includes(post.seniority))
        ) {
          currentFilteredPostings.push(post)
        } 
      })
      
      setFilteredPostings(currentFilteredPostings);
    }, [selectedLocations, selectedDepartaments, selectedSeniorities, selectedTeams, query])

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

  const initialLocationAgregate = useMemo(() => {
    const agregateLocationRaw = postings && postings.reduce((acc, { location }) => {
      if (!acc[location]){
        acc[location] = 0
      }
      return acc
    }, {})

    return agregateLocationRaw ? Object.keys(agregateLocationRaw).map(loc => ({
      value: loc,
      label: `${loc} (${agregateLocationRaw[loc]})`,
      count: agregateLocationRaw[loc]
    })) : []
  }, [postings])

  const filteredLocationAgregate = useMemo(() => {
    return filteredPostings && filteredPostings.reduce((acc, { location }) => {
      if (!acc[location]){
        acc[location] = 0
      }

      acc[location]++
      return acc
    }, {})
  }, [filteredPostings])

  const locationOptions = useMemo(() => {
    const filteredCurrentAgregate = filteredLocationAgregate ? Object.keys(filteredLocationAgregate).map(loc => ({
      value: loc,
      label: `${loc} (${filteredLocationAgregate[loc]})`,
      count: filteredLocationAgregate[loc]
    })) : []

    const currentLocationOptions = [];

    if (initialLocationAgregate.length) {
      initialLocationAgregate.forEach((initialLocation) => {
        const loc = filteredCurrentAgregate.find((filteredLocation) => filteredLocation.value === initialLocation.value)
        if (loc) {
          currentLocationOptions.push(loc)
        } else {
          currentLocationOptions.push(initialLocation)
        }
      })
    }

    return currentLocationOptions
  }, [filteredLocationAgregate])

  const initialDepartamentAgregate = useMemo(() => {
    const agregateDepartamentRaw = postings && postings.reduce((acc, { department }) => {
      if (!acc[department]){
        acc[department] = 0
      }
      return acc
    }, {})

    return agregateDepartamentRaw ? Object.keys(agregateDepartamentRaw).map(loc => ({
      value: loc,
      label: `${loc} (${agregateDepartamentRaw[loc]})`,
      count: agregateDepartamentRaw[loc]
    })) : []
  }, [postings])

  const filteredDepartamentAgregate = useMemo(() => {
    return filteredPostings && filteredPostings.reduce((acc, { department }) => {
      if (!acc[department]){
        acc[department] = 0
      }

      acc[department]++
      return acc
    }, {})
  }, [filteredPostings])

  const departamentOptions = useMemo(() => {
    const filteredCurrentAgregate = filteredDepartamentAgregate ? Object.keys(filteredDepartamentAgregate).map(dept => ({
      value: dept,
      label: `${dept} (${filteredDepartamentAgregate[dept]})`,
      count: filteredDepartamentAgregate[dept]
    })) : []

    const currentDepartamentOptions = [];

    if (initialDepartamentAgregate.length) {
      initialDepartamentAgregate.forEach((initialDepartament) => {
        const dept = filteredCurrentAgregate.find((filteredDept) => filteredDept.value === initialDepartament.value)
        if (dept) {
          currentDepartamentOptions.push(dept)
        } else {
          currentDepartamentOptions.push(initialDepartament)
        }
      })
    }

    return currentDepartamentOptions
  }, [filteredDepartamentAgregate])

  const initialTeamAgregate = useMemo(() => {
    const teams = [];

    initialDepartamentAgregate.forEach((initialDepartament) => {
      const agregateTeamRaw = postings && postings.reduce((acc, { team, department }) => {
        if (department === initialDepartament.value) {
          if (!acc[team]){
            acc[team] = 0
          }

        }
  
        return acc
      }, {})

      const agregateTeamRawObjectKeys = Object.keys(agregateTeamRaw);

      if (agregateTeamRawObjectKeys && agregateTeamRawObjectKeys.length) {
        agregateTeamRawObjectKeys.forEach((t) => {
          teams.push({
            value: t,
            label: `${t} (${agregateTeamRaw[t]})`,
            count: agregateTeamRaw[t],
            departament: initialDepartament.value,
          })
        })
      }
    })

    return teams;
  }, [postings, initialDepartamentAgregate])

  const filteredTeamAgregate = useMemo(() => {
    const teams = [];

    initialDepartamentAgregate.forEach((initialDepartament) => {
      const agregateTeamRaw = filteredPostings && filteredPostings.reduce((acc, { team, department }) => {
        if (department === initialDepartament.value) {
          if (!acc[team]){
            acc[team] = 0
          }

          acc[team]++
        }
  
        return acc
      }, {})

      const agregateTeamRawObjectKeys = Object.keys(agregateTeamRaw);

      if (agregateTeamRawObjectKeys && agregateTeamRawObjectKeys.length) {
        agregateTeamRawObjectKeys.forEach((t) => {
          teams.push({
            value: t,
            label: `${t} (${agregateTeamRaw[t]})`,
            count: agregateTeamRaw[t],
            departament: initialDepartament.value,
          })
        })
      }
    })

    return teams;
  }, [filteredPostings, initialDepartamentAgregate])

  const teamsOptions = useMemo(() => {
    const currentTeamOptions = [];

    if (initialTeamAgregate.length) {
      initialTeamAgregate.forEach((initialTeam) => {
        const team = filteredTeamAgregate.find(
          (filteredTeam) => filteredTeam.value === initialTeam.value &&
            filteredTeam.departament === initialTeam.departament);

        if (team) {
          currentTeamOptions.push(team)
        } else {
          currentTeamOptions.push(initialTeam)
        }
      })
    }

    return currentTeamOptions
  }, [filteredTeamAgregate])

  const initialSeniorityAgregate = useMemo(() => {
    const agregateSeniorityRaw = postings && postings.reduce((acc, { seniority }) => {
      if (!acc[seniority]){
        acc[seniority] = 0
      }
      return acc
    }, {})

    return agregateSeniorityRaw ? Object.keys(agregateSeniorityRaw).map(senr => ({
      value: senr,
      label: `${senr} (${agregateSeniorityRaw[senr]})`,
      count: agregateSeniorityRaw[senr]
    })) : []
  }, [postings])

  const filteredSeniorityAgregate = useMemo(() => {
    return filteredPostings && filteredPostings.reduce((acc, { seniority }) => {
      if (!acc[seniority]){
        acc[seniority] = 0
      }

      acc[seniority]++
      return acc
    }, {})
  }, [filteredPostings])

  const seniorityOptions = useMemo(() => {
    const filteredCurrentAgregate = filteredSeniorityAgregate ? Object.keys(filteredSeniorityAgregate).map(senr => ({
      value: senr,
      label: `${senr} (${filteredSeniorityAgregate[senr]})`,
      count: filteredSeniorityAgregate[senr]
    })) : []

    const currentSeniorityOptions = [];

    if (initialSeniorityAgregate.length) {
      initialSeniorityAgregate.forEach((initialSeniority) => {
        const senr = filteredCurrentAgregate.find((filteredSenr) => filteredSenr.value === initialSeniority.value)
        if (senr) {
          currentSeniorityOptions.push(senr)
        } else {
          currentSeniorityOptions.push(initialSeniority)
        }
      })
    }

    return currentSeniorityOptions
  }, [filteredSeniorityAgregate])

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

  const handleSelectTeam = (value: string) => {
    let selectedTeamQueries = selectedQueryTeams ? selectedQueryTeams.split(',') : [];

    if (selectedTeamQueries.includes(value)) {
      selectedTeamQueries = selectedTeamQueries.filter((tm) => tm !== value);
    } else {
      selectedTeamQueries.push(value);
    }

    setSelectedQueryTeams(selectedTeamQueries.join(','))
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

  const onClickSearchButton = () => {
    setFilteringOptionsModal(!filteringOptionsModal);
  }
  
  const handleClearFilters = () => {
    setSelectedLocations([]);
    setSelectedDepartaments([]);
    setSelectedTeams([]);
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
      <SEO title="Job Search" />
      <Header />
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
                            : ''}
                          ${location.count === 0 ? ' disabled' : ''}`}
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
                    {departamentOptions.map((departament) => (
                      <div key={departament.label}>
                        <button
                          className={`category-button${
                            selectedDepartaments.includes(departament.value)
                              ? ' selected'
                              : ''}
                              ${departament.count === 0 ? ' disabled' : ''}`}
                          onClick={() => handleSelectDepartament(departament.value)}
                        >
                          {departament.label}
                        </button>
                        {teamsOptions.filter(t => t.departament === departament.value).map(team => (
                          <button
                            className={`category-button subcategory-button${
                              selectedTeams.includes(team.value)
                                ? ' selected'
                                : ''
                            }${team.count === 0 ? ' disabled' : ''}`}
                            onClick={() => handleSelectTeam(team.value)}
                            key={team.label}
                          >
                            {team.label}
                          </button>
                        ))}
                      </div>
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
                            : ''}
                            ${seniority.count === 0 ? 'disabled' : ''}`}
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
          <span className="all">{filteredPostings.length}</span>
          {' '}
          jobs in
          {' '}
          {Object.keys(filteredLocationAgregate).length}
          {' '}
          locations in
          {' '}
          {Object.keys(filteredDepartamentAgregate).length}
          {' '}
          areas of work in
          {' '}
          {Object.keys(filteredSeniorityAgregate).length}
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
