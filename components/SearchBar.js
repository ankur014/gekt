const SearchBar = ({ searchBarValue, onSearchBarValueChange, onFetchClick, isErrored, isLoading }) => {
  return (
    <div className="pb-2">
      <input
        className="rounded-l-lg md:w-1/5 sm:w-3/5 p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
        placeholder={'Enter address'}
        value={searchBarValue}
        disabled={isLoading}
        onChange={onSearchBarValueChange}
      />
      <button
        className="cursor-pointer px-8 sm:px-2 rounded-r-lg md:w-1/12 sm:w-2/5 bg-red-400 text-white hover:text-red-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r"
        onClick={onFetchClick}
        disabled={isLoading || searchBarValue.length === 0}
      >
        {isLoading ? 'Wait..' : 'Fetch'}
      </button>
      {isErrored && <p className="py-2 text-red-600">Failed to fetch some transactions, please try again later</p>}
    </div>
  );
};

export default SearchBar;
