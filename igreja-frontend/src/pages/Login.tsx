import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

// Importe sua logo branca
import logoBranca from '../assets/logo-branca.png'; 

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [randomQuote, setRandomQuote] = useState('');

  const wesleyQuotes = [
    "A conversão tira o cristão do mundo; A santificação tira o mundo do cristão.",
    "Coloque fogo em sua vida e as pessoas virão para vê-lo queimar.",
    "O mundo é minha paróquia.",
    "Fazei todo o bem que puderdes, por todos os meios que puderdes...",
    "A Bíblia sabe nada sobre religião solitária."
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * wesleyQuotes.length);
    setRandomQuote(wesleyQuotes[randomIndex]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#111827',
        color: '#fff'
      });

      Toast.fire({
        icon: 'success',
        title: 'Login realizado com sucesso!'
      });

      navigate('/admin');
    } catch (err: any) {
      setError('E-mail ou senha inválidos.');
      Swal.fire({
        title: 'Falha no acesso',
        text: 'E-mail ou senha incorretos.',
        icon: 'error',
        background: '#111827',
        color: '#fff',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden"> 
      
      {/* BOTÃO INÍCIO MANTIDO NO CANTO ESQUERDO */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-[#111827]/40 hover:text-[#111827] transition-all font-bold text-[10px] uppercase tracking-[0.2em] bg-white/30 backdrop-blur-md p-2.5 px-5 rounded-full border border-black/5 shadow-sm"
      >
        <Home size={14} />
        <span>Início</span>
      </Link>

      {/* LADO DAS FRASES (CLARO) - ALINHADO À ESQUERDA */}
      <div className="flex-1 bg-gradient-to-br from-[#F9FAFB] to-[#D1D5DB] p-12 md:p-24 flex items-center justify-center">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={randomQuote}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-start text-left"
            >
              <p className="text-3xl md:text-5xl font-serif text-[#1F2937] leading-tight mb-8 italic">
                “{randomQuote}”
              </p>
              <div className="h-1.5 bg-[#111827] mb-6 w-16" />
              <p className="text-xl md:text-2xl font-black text-[#111827] uppercase tracking-tighter">
                John Wesley
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* LADO DO FORMULÁRIO (ESCURO) */}
      <div className="flex-1 bg-[#111827] p-12 md:p-20 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          {/* LOGO BRANCA ACIMA DO TÍTULO */}
          <div className="flex justify-center mb-6">
            <Link to="/">
              <img 
                src={logoBranca} 
                alt="Logo IMW" 
                className="h-28 md:h-32 w-auto hover:scale-105 transition-transform duration-300" 
              />
            </Link>
          </div>

          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Login</h2>
            <p className="text-gray-500 text-xs mt-3 font-medium uppercase tracking-widest">Portal IMW Itaim Paulista</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="w-full mt-1 p-4 bg-white/5 border border-white/10 rounded-2xl outline-none text-white focus:border-white/40 transition-all placeholder:text-white/10"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Senha</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none text-white focus:border-white/40 transition-all placeholder:text-white/10 pr-12"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/20 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-[#111827] font-black py-4 rounded-2xl shadow-xl hover:bg-gray-200 transition-all active:scale-[0.97] uppercase tracking-widest text-xs"
            >
              {loading ? 'Entrando...' : 'Entrar no Sistema'}
            </button>

            <div className="text-center">
              <Link 
                to="/register" 
                className="text-[10px] font-black text-gray-500 hover:text-white transition-colors uppercase tracking-[0.2em]"
              >
                Não tem cadastro? Clique aqui
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;