import React from 'react';
import { Dumbbell, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import { formatDateFull, getTodayISODate } from '../../utils/dateUtils';

type HeaderProps = {
  activePage: string;
  setActivePage: (page: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const today = formatDateFull(getTodayISODate());

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (page: string) => {
    setActivePage(page);
    setMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-10 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-sm transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <Dumbbell className={`h-7 w-7 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
            <div>
              <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>God-First Reps</h1>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{today}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink active={activePage === 'home'} onClick={() => handleNavClick('home')}>
              Today
            </NavLink>
            <NavLink active={activePage === 'journal'} onClick={() => handleNavClick('journal')}>
              Journal
            </NavLink>
            <NavLink active={activePage === 'stats'} onClick={() => handleNavClick('stats')}>
              Stats
            </NavLink>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button 
              onClick={toggleMenu} 
              className="ml-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`} />
              ) : (
                <Menu className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className={`md:hidden mt-3 pt-3 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
            <div className="flex flex-col space-y-3">
              <MobileNavLink active={activePage === 'home'} onClick={() => handleNavClick('home')}>
                Today
              </MobileNavLink>
              <MobileNavLink active={activePage === 'journal'} onClick={() => handleNavClick('journal')}>
                Journal
              </MobileNavLink>
              <MobileNavLink active={activePage === 'stats'} onClick={() => handleNavClick('stats')}>
                Stats
              </MobileNavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

type NavLinkProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const NavLink: React.FC<NavLinkProps> = ({ active, onClick, children }) => {
  const { theme } = useTheme();
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 rounded-md transition-colors duration-200 ${
        active 
          ? `font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`
          : `${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`
      }`}
    >
      {children}
    </button>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ active, onClick, children }) => {
  const { theme } = useTheme();
  return (
    <button
      onClick={onClick}
      className={`py-2 px-3 rounded-md transition-colors duration-200 ${
        active 
          ? `font-semibold ${theme === 'dark' ? 'bg-slate-700 text-green-400' : 'bg-slate-100 text-green-600'}`
          : `${theme === 'dark' ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'}`
      }`}
    >
      {children}
    </button>
  );
};

export default Header;