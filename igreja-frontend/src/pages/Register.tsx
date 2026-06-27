import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import Swal from 'sweetalert2';

// Importe sua logo branca aqui
import logoBranca from '../assets/logo-branca.png'; 

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [validations, setValidations] = useState({
    min: false,
    upper: false,
    num: false,
    special: false,
    match: false
  });

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

  useEffect(() => {
    const { password, confirmPassword } = formData;
    setValidations({
      min: password.length >= 8,
      upper: /[A-Z]/.test(password),
      num: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password),
      match: password === confirmPassword && password !== ''
    });
  }, [formData]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Object.values(validations).every(v => v)) return;

    try {
      const dataToSubmit = {
        nome: `${formData.nome} ${formData.sobrenome}`,
        email: formData.email,
        password: formData.password
      };

      await api.post('/api/auth/cadastrar', dataToSubmit);

      Swal.fire({
        title: 'Bem-vindo!',
        text: 'Seu cadastro foi realizado com sucesso.',
        icon: 'success',
        background: '#111827',
        color: '#fff',
        confirmButtonColor: '#374151',
        confirmButtonText: 'Ir para o Login'
      }).then(() => {
        navigate('/login');
      });
    } catch (error: any) {
      Swal.fire({
        title: 'Ops!',
        text: error.response?.data?.message || "Erro ao realizar cadastro.",
        icon: 'error',
        background: '#111827',
        color: '#fff',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden">
      
      {/* BOTÃO INÍCIO MANTIDO */}
      <Link 
        to="/" 
        className="absolute top-6 right-6 z-50 flex items-center gap-2 text-[#1F2937]/40 hover:text-[#1F2937] transition-all font-bold text-[10px] uppercase tracking-[0.2em] bg-black/5 backdrop-blur-md p-2.5 px-5 rounded-full border border-black/10 shadow-sm"
      >
        <span>Início</span>
        <Home size={14} />
      </Link>

      {/* LADO DO FORMULÁRIO (ESCURO) */}
      <div className="flex-1 bg-[#111827] p-8 md:p-20 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
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
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Cadastro</h2>
            <p className="text-gray-500 text-xs mt-3 font-medium uppercase tracking-widest">Crie sua conta IMW</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Nome</label>
                <input 
                  type="text" placeholder="Ex: João" required
                  className="w-full mt-1 p-4 bg-white/5 border border-white/10 rounded-2xl outline-none text-white focus:border-white/40 transition-all"
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Sobrenome</label>
                <input 
                  type="text" placeholder="Ex: Silva" required
                  className="w-full mt-1 p-4 bg-white/5 border border-white/10 rounded-2xl outline-none text-white focus:border-white/40 transition-all"
                  onChange={(e) => setFormData({...formData, sobrenome: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">E-mail</label>
              <input 
                type="email" placeholder="seu@email.com" required
                className="w-full mt-1 p-4 bg-white/5 border border-white/10 rounded-2xl outline-none text-white focus:border-white/40 transition-all"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Senha</label>
                <input 
                  type="password" placeholder="••••••••" required
                  className="w-full mt-1 p-4 bg-white/5 border border-white/10 rounded-2xl outline-none text-white focus:border-white/40 transition-all"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Confirmar</label>
                <input 
                  type="password" placeholder="••••••••" required
                  className="w-full mt-1 p-4 bg-white/5 border border-white/10 rounded-2xl outline-none text-white focus:border-white/40 transition-all"
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>

            {/* BOX DE VALIDAÇÃO MANTIDO */}
            <div className="bg-black/30 p-5 rounded-2xl border border-white/5 shadow-2xl">
              <div className="grid grid-cols-2 gap-3 text-[10px]">
                {[
                  { key: 'min', label: '8+ Caracteres' },
                  { key: 'upper', label: 'Letra Maiúscula' },
                  { key: 'num', label: 'Um Número' },
                  { key: 'match', label: 'Senhas Iguais' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${(validations as any)[item.key] ? "bg-green-500 shadow-[0_0_8px_#22c55e]" : "bg-gray-700"}`}></div>
                    <span className={`font-bold uppercase tracking-tighter ${(validations as any)[item.key] ? "text-green-500" : "text-gray-600"}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={!Object.values(validations).every(v => v)}
              className="w-full bg-white text-[#111827] font-black py-4 rounded-2xl shadow-xl hover:bg-gray-200 transition-all active:scale-[0.97] uppercase tracking-widest text-xs disabled:opacity-20"
            >
              Finalizar Cadastro
            </button>

            <div className="text-center pt-4">
              <Link to="/login" className="text-[10px] font-black text-gray-500 hover:text-white transition-colors uppercase tracking-[0.2em]">
                ← Voltar para o Login
              </Link>
            </div>
          </form>
        </motion.div>
      </div>

      {/* LADO DAS FRASES (CLARO) */}
      <div className="flex-1 bg-gradient-to-br from-[#F9FAFB] to-[#D1D5DB] p-12 md:p-24 flex items-center justify-center">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={randomQuote}
              initial={{ opacity: 0, x: 20 }}
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
    </div>
  );
};

export default Register;