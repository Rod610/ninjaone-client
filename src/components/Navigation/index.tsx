import logo from "../../assets/NinjaOneLogo.svg";

const Navigation = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-4 lg:px-8 bg-[#002A42]" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5" aria-label="NinjaOne logo">
            <span className="sr-only">Ninja One</span>
            <img src={logo} alt="Ninja One" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
