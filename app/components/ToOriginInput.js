"use client";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import SearchItem from "./molecule/SearchItem";
import { useState } from "react";

const ToOriginInput = ({
  searchFormData,
  setSearchFormData,
  setQuery,
  error,
  setError,
  searchData,
  setSearchData,
}) => {
  const [searchToLoader, setSearchToLoader] = useState(false);
  const handleSearchChangeToOrigin = () => {
    setSearchToLoader(true);
    setSearchData([]);
    setError("");
    let searchInput = document.getElementById("searchInputToOrigin").value;
    async function lallala() {
      const lala = await fetch(
        `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${searchInput}&page[limit]=5`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const lulu = await lala.json();

      if (lulu.data[0] == undefined) {
        setSearchToLoader(false);
        setError("No search results found");
        setSearchData([]);
        return;
      }

      setSearchData(lulu.data);
      setSearchToLoader(false);
    }
    lallala();
  };
  return (
    <div
      id="searchFormToOrigin"
      className={`absolute hidden z-20 inset-0 backdrop-blur`}
    >
      <motion.div
        key={"tooriginalinput"}
        initial={{
          scale: 0.8,
          opacity: 0,
          skewX: 5,
        }}
        whileInView={{
          scale: 1,
          opacity: 1,
          skewX: 0,
        }}
        transition={{
          duration: 0.1,
          type: "spring",
          stiffness: 50,
        }}
        className="flex justify-center h-screen w-screen inset-0 items-center"
      >
        <div className="w-[90vw] py-5 bg-sky-50 md:w-[40vw] shadow-2xl">
          <div className="relative">
            <HiMiniXMark
              onClick={() => {
                document
                  .getElementById("searchFormToOrigin")
                  .classList.toggle("hidden");
              }}
              className="absolute top-0 right-0 mr-3 cursor-pointer text-3xl"
            />
          </div>
          <div className="relative">
            <div className="absolute top-2 right-20 mr-3 cursor-pointer ">
              <FaSearch
                onClick={() => handleSearchChangeToOrigin()}
                className="text-2xl"
              />
            </div>
          </div>
          <input
            id="searchInputToOrigin"
            placeholder="To Where..."
            className="text-lg py-3 mb-3 px-4 mx-4 w-[80%] focus:outline-none focus:border-b-2 bg-inherit border-b-2"
          />

          <div className="w-[95%] mx-auto  my-3">
            {searchToLoader && (
              <div className="flex justify-center items-center">
                <div
                  style={{
                    position: "relative",
                    width: 50,
                    height: 50,
                  }}
                >
                  <motion.span
                    key={"tosearchloader"}
                    style={{
                      opacity: 2,
                      display: "block",
                      width: 50,
                      height: 50,
                      border: "7px solid #eee",
                      borderTop: "7px solid #2D3134",
                      borderRadius: "50%",
                      boxSizing: "border-box",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      ease: "easeInOut",
                      // width: ['100%', '50%'],
                      duration: 1,
                    }}
                  />
                </div>
              </div>
            )}
            {error ? error : null}
            {!searchData || searchData.data == [null] ? (
              <div className=" w-full hover:bg-sky-400/30 rounded  px-3 relative flex py-2">
                <div className="text-sm">No Data , Search </div>
              </div>
            ) : (
              searchData.map((data, ind) => {
                if (data.subType == "AIRPORT") {
                  return (
                    <SearchItem
                      key={`${ind} laralappa `}
                      data={data}
                      origin={"to"}
                      searchFormData={searchFormData}
                      setSearchFormData={setSearchFormData}
                      setQuery={setQuery}
                      error={error}
                      setError={setError}
                      searchData={searchData}
                      setSearchData={setSearchData}
                    />
                  );
                }
              })
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ToOriginInput;
