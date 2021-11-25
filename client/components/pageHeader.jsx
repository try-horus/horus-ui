
function Header() {
  return (
    <header className="p-8 bg-horusBlue text-white flex items-center" >
        <img className="rounded-lg w-24 ml-5" src="/horus_logo.png" />
        <div className="w-full"></div>
        <a href="https://github.com/try-horus">
          <p className="font-body">Documentation</p>
        </a>
        <a href="https://github.com/try-horus">
          <img className="rounded-lg w-12 ml-5 mr-8" src="/github_logo.png"></img>
        </a>
    </header>
  )
}

export default Header;