const Search = ({ searchName, typeSearchName}) => (
  <div>
    search by name: <input value={searchName} onChange={typeSearchName}/>
  </div>
)

export default Search;