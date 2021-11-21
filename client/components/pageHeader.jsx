
function Header() {
  return (
    <header className="py-8 p-8 bg-horusBlue text-white">
      <div className="container flex mx-auto items-center justify-start">
        <img className="rounded-lg w-24 ml-5" src="/horus_logo.png"/>
        <span className="w-screen"></span>
        <p className="font-head">Documentation</p>
        <img className="rounded-lg w-12 ml-5" src="/github_logo.png"></img>
      </div>
    </header>
  )
}

export default Header;