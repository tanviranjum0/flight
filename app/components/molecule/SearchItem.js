const SearchItem = ({
  data,
  origin,
  searchFormData,
  setSearchFormData,
  setQuery,
}) => {
  const handleFromLocation = (data) => {
    setSearchFormData({
      ...searchFormData,
      fromOrigin: data,
    });
    document.getElementById("searchFormFromOrigin").classList.toggle("hidden");
    setQuery({
      fromInput: true,
      toInput: false,
    });
  };

  const handleToSelect = (data) => {
    setSearchFormData({
      ...searchFormData,
      toOrigin: data,
    });
    document.getElementById("searchFormToOrigin").classList.toggle("hidden");
    setQuery({
      fromInput: false,
      toInput: true,
    });
  };

  return (
    <div>
      <div
        onClick={() => {
          if (origin == "from") {
            handleFromLocation(data);
          } else if (origin == "to") {
            handleToSelect(data);
          }
        }}
        key={data.id}
        className=" w-full cursor-pointer transition-all duration-300 active:scale-95 hover:bg-sky-400/30 rounded  px-3 relative flex py-2"
      >
        <div className="flex flex-col">
          <div>{data.address.cityName}</div>
          <div className="text-sm">
            {data.name} Airport, {data.address.countryName}
          </div>
        </div>
        <span className="absolute right-0 mr-4">{data.iataCode}</span>
      </div>
    </div>
  );
};

export default SearchItem;
