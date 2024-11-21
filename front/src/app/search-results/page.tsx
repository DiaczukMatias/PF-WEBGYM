import SearchResultsView from "@/views/searchResults/SearchResultsView";
import { Suspense } from "react";

const SearchResults :React.FC = () => {
    return (
        <Suspense fallback={<div>Cargando...</div>}>

            <SearchResultsView/>

        </Suspense>
    );
  };
  
  export default SearchResults;
  