import Link from "next/link"
import Button from "../button"

const Header = ({}) => {
  return (
    <header className="sticky left-0 top-0 z-50 flex h-[60px] w-full justify-between border-b  bg-white">
      <Link className="flex items-center" href="/">
        LOGO
      </Link>
      <div className="flex items-center">
        <div>Create River</div>
        <div>River List</div>
        <div>Q&A</div>
        <div>English</div>
        <div>Connect wallet</div>
      </div>
    </header>
  )
}
export default Header
