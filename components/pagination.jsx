import PageLink from "./pageLink";

function Pagination({ length, currentLink, setCurrentLink, setData, data }) {
  return (
    <div className="flex space-x-1 justify-center">
      {[...Array(Math.ceil(length/10))].map((_, i) => {
        return <PageLink number={i + 1} activeLink={currentLink} setCurrentLink={setCurrentLink} key={i} setData={setData} data={data}/>
        })}
    </div>
  )
}

export default Pagination;