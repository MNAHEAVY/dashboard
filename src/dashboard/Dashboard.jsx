import logo from "../assets/logo.png";
import Editar from "./Editar";
import Crear from "./Crear";
import Borrar from "./Borrar";
import Productos from "./AllProducts";
import Login from "./Login";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
//import Users from "./AllUsers";

const navigation = [
  { name: "Productos", component: "Productos" },
  { name: "Crear", component: "Crear" },
  { name: "Borrar", component: "Borrar" },
  { name: "Valores", component: "Editar" },
  // { name: "Usuarios", component: "Users" },
  // { name: "Banners", component: "Users" },
  // { name: "Ventas", component: "Users" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [selectedView, setSelectedView] = useState("Productos");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

  if (!isAuthenticated) {
    // Si no está autenticado, mostramos la pantalla de login
    return <Login onLogin={setIsAuthenticated} />;
  }

  const renderContent = () => {
    switch (selectedView) {
      case "Productos":
        return <Productos />;
      case "Crear":
        return <Crear />;
      case "Borrar":
        return <Borrar />;
      case "Editar":
        return <Editar />;
      // case "Usuarios":
      //   return <Users />;
      // case "Banners":
      //   return <Users />;
      // case "Ventas":
      //   return <Users />;
      default:
        return <Productos />;
    }
  };

  return (
    <>
      <div className='min-h-full'>
        <Disclosure as='nav' className='bg-gray-800'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex h-16 items-center justify-between'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <img alt='Iphone Case Obera' src={logo} className='h-12 w-auto' />
                </div>
                <div className='md:block'>
                  <div className='ml-10 flex items-baseline space-x-4'>
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => setSelectedView(item.component)}
                        className={classNames(
                          selectedView === item.component
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className='md:block'>
                <div className='ml-4 flex items-center md:ml-6'>
                  <span className='text-white'>Dashboard</span>
                </div>
              </div>
              <div className='-mr-2 flex md:hidden'>
                {/* Mobile menu button */}
                <DisclosureButton className='group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  <Bars3Icon
                    aria-hidden='true'
                    className='block h-6 w-6 group-data-[open]:hidden'
                  />
                  <XMarkIcon
                    aria-hidden='true'
                    className='hidden h-6 w-6 group-data-[open]:block'
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className='md:hidden'>
            <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as='a'
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>

        <header className='bg-white shadow'>
          <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
              {selectedView}
            </h1>
          </div>
        </header>
        <main>
          <div className=''>{renderContent()}</div>
        </main>
      </div>
    </>
  );
}
