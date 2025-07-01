import Link from "next/link"

function Page() {

  return (
    <div>
      <Link href="/news-list/business">US business</Link>
      <br />
      <Link href="/news-list/health">Uk health</Link>
      <br />
      <Link href="/news-list/technology">technology</Link>
    </div >
  )
}

export default Page