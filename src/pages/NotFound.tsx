import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="text-center max-w-sm">
        <p className="text-8xl font-extrabold text-gradient-primary mb-4">404</p>
        <h1 className="text-xl font-bold text-foreground mb-2">Página não encontrada</h1>
        <p className="text-sm text-muted-foreground mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm px-8 py-3 rounded-xl hover:brightness-110 transition-all glow-primary"
        >
          <Home className="w-4 h-4" />
          Voltar ao início
        </a>
      </div>
    </div>
  );
};

export default NotFound;
