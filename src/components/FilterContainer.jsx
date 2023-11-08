import React from 'react'

const FilterContainer = ({isOpen}) => {
  return (
    <div className={`${isOpen ? "top-0" : "top-full"} absolute h-full w-full md:w-1/3 bg-white z-100 transition-all duration-300 ease-in-out`}>FilterContainer</div>
  )
}

export default FilterContainer