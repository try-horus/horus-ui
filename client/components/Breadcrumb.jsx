const Breadcrumb = () => {
  return (
    <div className="text-left pl-16 pt-5">
        <p className="font-header text-horusBlue text-lg"> 
        <a className="underline" href={`${process.env.UI_CLIENT_HOST}`}>
        Metrics</a> » <span className="text-horusViolet">Traces</span> 
        </p> 
    </div>
  )
}

module.exports = Breadcrumb;