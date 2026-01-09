const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-10 mt-auto border-t border-slate-800">
      <div className="container mx-auto px-6 flex flex-col items-center text-center gap-6">
        {/* Brand & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
            Feastly
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-md">
            Delivering happiness one meal at a time.
          </p>
        </div>
        {/* Links & Copyright */}
        <div className="text-sm text-slate-500 flex flex-col gap-2">
          <p className="mt-2">
            &copy; {new Date().getFullYear()} Feastly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
