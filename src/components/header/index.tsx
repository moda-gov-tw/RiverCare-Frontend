"use client"

import { useContext, useEffect, useState } from "react"
import { Context } from "@/context"
import { showWallet } from "@/utils/string"
import styles from "./styles.module.scss"
import Link from "next/link"
import LogoSrc from "@/../public/images/logo.png"
import Image from "next/image"
import { Burger } from "./burger"
import { LanguageController } from "./language-controller"
import { Language } from "@/utils/language"

import { usePathname } from "next/navigation"
import { WalletController } from "./wallet-controller"

const Menu = ({
  currPath,
  mobile,
  onClick
}: {
  currPath: string
  mobile: boolean
  onClick?: any
}) => {
  const lang = Language()

  return (
    lang?.menu?.length > 0 &&
    lang.menu.map((item, i) => (
      <li key={i} className={mobile ? "w-full border-b py-4" : ""}>
        <Link
          href={`/${item.route}`}
          onClick={onClick}
          className={`
              ${currPath === item.route ? "underline underline-offset-8" : ""}
              MainText font-black text-white duration-300 hover:text-title`}
        >
          {item.title}
        </Link>
      </li>
    ))
  )
}

const Header = () => {
  const currPath = usePathname().substring(1)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const context = useContext(Context)

  return (
    <header className="sticky right-0 top-0 z-50 flex h-[60px] w-full justify-between border-b bg-white p-3 text-2xl">
      {/* LOGO */}
      <Link href="/">
        <Image src={LogoSrc} alt="RiverCare" className="h-full w-auto" />
      </Link>
      {/* Navigation bar */}
      <nav className="flex items-center pr-2">
        <section className="justify-center xl:hidden">
          <Burger isNavOpen={isNavOpen} setIsNavOpen={async () => setIsNavOpen(!isNavOpen)} />
          {/* toggle menu based on isNavOpen state */}
          <div className={isNavOpen ? styles.showNav : styles.hideNav}>
            <ul className=" flex flex-col items-center justify-between pb-2 font-black ">
              <Menu
                currPath={currPath}
                mobile={true}
                onClick={(e: any) => {
                  setIsNavOpen(!isNavOpen)
                }}
              />
              <li className="bg-gray-400 w-screen p-4">
                <LanguageController mobile={true} />
              </li>

              <li className="bg-gray-400 w-screen p-4">{<WalletController />}</li>
            </ul>
          </div>
        </section>

        {/* DESKTOP */}
        <ul className="hidden flex-row items-center space-x-8 xl:flex ">
          <Menu currPath={currPath} mobile={false} />
          <LanguageController mobile={false} />
          <WalletController />
        </ul>
      </nav>
    </header>
  )
}
export default Header
