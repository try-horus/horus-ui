import { useRouter } from "next/router";

const Breadcrumb = ({ page }) => {
  const router = useRouter()
  if (page !== "singleTrace") {
    return (
      <div className="text-left pl-16 pt-8">
          <p className="font-header text-horusBlue text-lg"> 
          <a className="underline" href={`${process.env.UI_CLIENT_HOST}`}>
          Metrics</a> » <span className="text-horusViolet">Traces</span> 
          </p> 
      </div>
    )
  }
  else {
    return (
      <div className="text-left pl-16 pt-8">
          <p className="font-header text-horusBlue text-lg "> 
          <a className="underline" href={`${process.env.UI_CLIENT_HOST}`}>
          Metrics</a>  »  <a className="underline" href={"#"} onClick={e => router.back()}>
          Traces</a>  »  <span className="text-horusViolet">Single Trace</span>
          </p>
      </div>
    )
  }
}

module.exports = Breadcrumb;