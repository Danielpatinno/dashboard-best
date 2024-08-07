"use client"

import { RenderLinks } from "./render-links"

import { 
    MdOutlineDashboardCustomize, 
    MdOutlineShoppingBag,
    MdAttachMoney,
    MdGroups 
  } from "react-icons/md";
import { Pizza } from "lucide-react";

const links = [
    {name:'Painel' , icon:<MdOutlineDashboardCustomize  size={30}/> , url:'/'},
    {name:'Produtos' , icon:<MdOutlineShoppingBag size={30} /> , url:'/products'},
    {name:'Vendas' , icon:<MdAttachMoney size={30} /> , url:'/sales'},
    {name:'Clientes' , icon:<MdGroups  size={30} /> , url:'/clients'},
  ]

export function Sidebar() {
  return (
    <section className="max-w-fit bg-black h-full z-10 fixed ">
      <div className="flex border-b justify-center">
        <Pizza className="my-4 text-red-500" size={40}/>
      </div>
      <nav>
        <RenderLinks links={links}/>
      </nav>
    </section>
  )
}