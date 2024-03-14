    import React, { useState, useEffect } from 'react';
    import { useLocation, Link } from 'react-router-dom';
    import "../../styles/mains/Main.css";
    import "../../styles/common/Common.css";
    import "../../styles/mains/SearchPage.css";

    function SearchPage() {
        const location = useLocation();
        const { searchTerm } = location.state || {};
        const [searchResults, setSearchResults] = useState([]);

        useEffect(() => {
            const fetchSearchResults = async () => {
                if (!searchTerm) return;

                try {
                    const response = await fetch(`http://localhost:8001/search?keyword=${encodeURIComponent(searchTerm)}`);
                    if (!response.ok) throw new Error('Network response was not ok');

                    const data = await response.json();
                    console.log(data); 
                    console.log(data[0]);
                    setSearchResults(data);
                } catch (error) {
                    console.error('Failed to fetch search results:', error);
                }
            };

            fetchSearchResults();
        }, [searchTerm]);

        return (
            <div className="searchPage">
                <h2>검색 결과</h2>
                <div className="searchResultsContainer">
                    {searchResults.length > 0 ? (
                        searchResults.map((story, index) => (
                            <div key={index} className="searchResultItem">
                                <Link to={`/bookContent/${story.fairytaleCode}`}>
                                    <img src={story.thumbnail} alt={story.title} className="searchThumbnail" />
                                    <h3>{story.title}</h3>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="noSearchResults">
                            검색 결과가 없습니다.
                        </div>
                    )}
                </div>
            </div>
        );
    }
    
    export default SearchPage;
