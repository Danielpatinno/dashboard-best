
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/router"


export interface Link {
  name: string
  icon: React.ReactNode
  url: string
}  
  
interface linksProps {
  links:  Link[]
}


export function RenderLinks({links}:linksProps) { 
  const pathname = usePathname();

  return (
    <ul className="text-white">
      {links.map((link) => (
        <li key={link.name} className={`hover:bg-zinc-500 ${pathname === link.url ? "bg-zinc-500" : ""}`}>
          <Link className="block text-base text-center uppercase pt-4 px-4 flex flex-col items-center justify-center" href={link.url}>
            <div className="h-10 w-10 flex items-center justify-center">{link.icon}</div>
            <span>{link.name}</span>
          </Link>
        </li>
      ))}  
    </ul>
    
  )
}