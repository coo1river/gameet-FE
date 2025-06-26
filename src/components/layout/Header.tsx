import Logo from "@/../public/icons/Gameet-Logo.svg";
import NavMenu from "../nav/NavMenu";
import AuthActions from "./AuthActions";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between fixed top-0 left-0 w-full h-[80px] bg-surface font-bold text-[18px] px-[60px] box-border">
      <div>
        <Link href={"/"}>
          <Logo width={45} height={45} alt="겜밋 로고" />
        </Link>
      </div>
      <NavMenu />
      <div>
        <AuthActions />
      </div>
    </header>
  );
}
