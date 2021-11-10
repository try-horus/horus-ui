function PageLink({ number, activeLink, setCurrentLink, setData, data }) {
  function handleSetActiveLink() {
    setCurrentLink(number);
    setData(data[number])
  }

  return (
    <a href="#"
       className={"flex items-center px-4 py-2 text-gray-500 rounded-md " + (number === Number(activeLink) ? "bg-blue-300" : "bg-gray-300")}
       onClick={handleSetActiveLink}
    >
      {number}
    </a>
  )
}

export default PageLink;