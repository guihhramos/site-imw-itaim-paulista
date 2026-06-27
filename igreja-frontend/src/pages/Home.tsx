import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  MessageCircle,
  ArrowRight,
  BookOpen,
  Users,
  Heart
} from 'lucide-react';
import api from '../services/api';
import { buildImageUrl } from '../constants/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { churchInfo } from '../config/churchInfo';

// Assets
import adoracaoImg from '../assets/adoracao.jpg';
import foto2 from '../assets/foto2.jpg';
import foto3 from '../assets/foto3.jpg';
import foto4 from '../assets/foto4.jpg';
import foto5 from '../assets/foto5.jpg';
import foto6 from '../assets/foto6.jpg';
import foto7 from '../assets/foto7.jpg';
import foto8 from '../assets/foto8.jpg';
import { Link } from 'react-router-dom';

const heroImages = [adoracaoImg, foto2, foto3, foto4, foto5, foto6, foto7, foto8];

interface Aviso {
  id: string;
  titulo: string;
  conteudo: string;
  fotoUrl?: string;
  dataPublicacao: string;
  ativo: boolean;
}

const Home: React.FC = () => {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    api.get('/api/avisos/public')
      .then((res) => setAvisos(res.data))
      .catch(() => setAvisos([]))
      .finally(() => setLoading(false));
  }, []);

  // Timer do Carrossel Hero - 7 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % Math.max(avisos.length, 1));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + Math.max(avisos.length, 1)) % Math.max(avisos.length, 1));
  };

  const getVisibleAvisos = () => {
    if (avisos.length === 0) return [];

    // Se tiver 4 ou menos avisos, apenas mostre os que existem sem inventar moda
    if (avisos.length <= 4) return avisos;

    // Se tiver mais de 4, pegamos os próximos 4 a partir do carouselIndex
    const items = [];
    for (let i = 0; i < 4; i++) {
      const nextIndex = (carouselIndex + i) % avisos.length;
      items.push(avisos[nextIndex]);
    }
    return items;
  };

  const visibleAvisos = getVisibleAvisos();

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header />

      {/* ===== HERO SECTION COM CARROSSEL DINÂMICO ===== */}
      <section className="relative h-screen flex items-center justify-start text-white overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={heroImages[heroIndex]}
              className="w-full h-full object-cover"
              alt="Background"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

        <div className="relative z-10 px-8 md:px-16 max-w-5xl w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#B59A57] font-bold tracking-[0.3em] mb-4 uppercase text-sm"
            >
              Bem-vindo à IMW Itaim Paulista
            </motion.p>

            <h1 className="text-6xl md:text-8xl font-black leading-none mb-6 uppercase tracking-tighter">
              JESUS TRANSFORMA
              <br />
              <span className="text-[#B59A57] drop-shadow-2xl">VIDAS E HISTÓRIAS</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl font-light leading-relaxed">
              Somos uma igreja em movimento, apaixonados por Deus e por pessoas.
              Um lugar de recomeços, fé e comunhão verdadeira. Venha fazer parte da nossa família!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#avisos"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold text-black transition-all hover:scale-105 bg-[#B59A57] shadow-[0_0_20px_rgba(181,154,87,0.4)]"
              >
                VER AVISOS <ArrowRight size={20} />
              </a>

              <Link
                to="/sobre"
                className="inline-flex items-center justify-center px-10 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
              >
                SOBRE NÓS
              </Link>
            </div>

            {/* Indicadores Dinâmicos */}
            <div className="flex gap-3 items-center">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroIndex(idx)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${idx === heroIndex ? 'w-12 bg-[#B59A57]' : 'w-3 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== INFO CARDS SECTION ===== */}
      <section className="relative -mt-24 px-4 md:px-16 pb-20 z-20 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-8">
          <QuickCard
            icon={<MapPin className="text-[#B59A57]" />}
            title="LOCALIZAÇÃO"
            content={`${churchInfo.address}, ${churchInfo.city}`}
            linkText="Ver no Mapa"
          />
          <QuickCard
            icon={<MessageCircle className="text-[#B59A57]" />}
            title="AVISOS WHATSAPP"
            content="Fique por dentro de tudo que acontece na nossa igreja em tempo real!"
            isWhatsapp
          />
          <QuickCard
            icon={<Clock className="text-[#B59A57]" />}
            title="NOSSOS CULTOS"
            content={<>Quinta: {churchInfo.schedule.thursday} <br /> Domingo: 18h - Culto</>}
            dark
            linkText="Programação completa"
          />
        </div>
      </section>

      {/* ===== AVISOS SECTION ===== */}
      <section id="avisos" className="py-32 px-4 md:px-16 bg-gray-50 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B59A57]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <p className="font-bold text-[#B59A57] text-xs tracking-[0.4em] mb-3 uppercase">Fique Ligado</p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-00 uppercase tracking-tighter">Avisos & Eventos</h2>
            </div>
            <div className="flex gap-3">
              <button onClick={prevSlide} className="p-4 border border-gray-200 rounded-full hover:bg-white hover:shadow-xl transition-all text-gray-400 hover:text-[#B59A57]"><ChevronLeft size={24} /></button>
              <button onClick={nextSlide} className="p-4 border border-gray-200 rounded-full hover:bg-white hover:shadow-xl transition-all text-gray-400 hover:text-[#B59A57]"><ChevronRight size={24} /></button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B59A57] mx-auto"></div>
            </div>
          ) : avisos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {visibleAvisos.map((aviso, index) => (
                <EventCard key={`${aviso.id}-${index}`} aviso={aviso} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
              <p className="text-gray-400 italic">Nenhum aviso ou evento programado para os próximos dias.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="py-32 px-4 md:px-16 bg-[#041d37] text-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#B59A57] rounded-tl-3xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-[#B59A57] rounded-br-3xl" />
            <div className="rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-[600px]">
              <img src={adoracaoImg} alt="Nossa Igreja" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#B59A57] font-bold tracking-[0.3em] mb-4 uppercase text-sm">Nossa Essência</p>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-none tracking-tighter uppercase">UMA IGREJA, <br /><span className="text-[#B59A57]">UMA MISSÃO.</span></h2>
            <p className="text-gray-400 mb-12 text-lg leading-relaxed font-light">
              A Igreja Metodista Wesleyana do Itaim Paulista é um lugar de recomeços e esperança.
              Comprometidos em evangelizar, discipular e servir com excelência, somos uma família
              de braços abertos pronta para te acolher e caminhar ao seu lado.
            </p>

            <div className="grid grid-cols-3 gap-10">
              <StatItem label="Vidas Alcançadas" value="+500" />
              <StatItem label="Ministérios" value="+20" />
              <StatItem label="Anos de História" value="+40" />
            </div>

            <div className="mt-16 flex gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B59A57]/10 flex items-center justify-center text-[#B59A57]"><BookOpen size={20} /></div>
                <span className="text-xs font-bold tracking-widest uppercase">Palavra</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B59A57]/10 flex items-center justify-center text-[#B59A57]"><Users size={20} /></div>
                <span className="text-xs font-bold tracking-widest uppercase">Comunhão</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B59A57]/10 flex items-center justify-center text-[#B59A57]"><Heart size={20} /></div>
                <span className="text-xs font-bold tracking-widest uppercase">Serviço</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 px-4 md:px-16 bg-[#B59A57] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="text-center md:text-left">
            <h3 className="text-4xl md:text-5xl font-black text-black mb-4 uppercase tracking-tighter">Faça Parte Dessa História</h3>
            <p className="text-black/70 text-lg max-w-xl font-medium">
              Seja bem-vindo à nossa família! Juntos, podemos ir mais longe e alcançar mais vidas para o Reino de Deus.
            </p>
          </div>
          <button
            onClick={() =>
              window.open('https://maps.app.goo.gl/3ubwrpHVATwY6Y2MA', '_blank')
            }
            className="px-12 py-5 bg-[#041d37] text-white font-black rounded-full hover:scale-105 transition-all shadow-2xl uppercase tracking-widest text-sm"
          >
            Quero Visitar
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Componentes Internos Refinados
const QuickCard = ({ icon, title, content, dark, isWhatsapp, linkText }: any) => (
  <motion.div
    whileHover={{ y: -10 }}
    className={`p-10 rounded-[2.5rem] shadow-2xl transition-all duration-500 border border-transparent hover:border-[#B59A57]/30 ${dark ? 'bg-[#001c39] text-white' : 'bg-white text-black'}`}
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 bg-[#E8DCC8]/50 rounded-2xl flex items-center justify-center shadow-inner">{icon}</div>
      <h4 className="font-black text-xs tracking-[0.2em] uppercase">{title}</h4>
    </div>
    <div className={`text-base mb-8 leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{content}</div>
    {isWhatsapp ? (
      <a
        href={churchInfo.socialMedia.whatsappGroup}
        target="_blank"
        rel="noreferrer"
        className="bg-[#B59A57] text-white px-8 py-3 rounded-full font-black text-xs inline-block shadow-[0_10px_20px_rgba(181,154,87,0.3)] hover:shadow-[0_15px_30px_rgba(181,154,87,0.4)] transition-all uppercase tracking-widest"
      >
        ENTRAR NO GRUPO
      </a>
    ) : (
      <button className="text-[#B59A57] font-black text-xs uppercase tracking-[0.2em] hover:gap-3 transition-all flex items-center gap-2 group">
        {linkText} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    )}
  </motion.div>
);

const StatItem = ({ label, value }: any) => (
  <div className="group">
    <p className="text-5xl font-black text-[#B59A57] group-hover:scale-110 transition-transform duration-300 inline-block">{value}</p>
    <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">{label}</p>
  </div>
);

const EventCard: React.FC<{ aviso: Aviso, index: number }> = ({ aviso, index }) => {
  const imageUrl = buildImageUrl(aviso.fotoUrl);
  const data = new Date(aviso.dataPublicacao);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col h-full group border border-gray-100 hover:border-[#B59A57]/20 transition-all duration-500"
    >
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={imageUrl || adoracaoImg}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt={aviso.titulo}
        />
        <div className="absolute top-6 left-6 bg-[#B59A57] text-black px-4 py-2 rounded-xl font-black text-xs shadow-xl">
          {data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).toUpperCase()}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="font-black text-xl mb-4 uppercase leading-tight line-clamp-2 group-hover:text-[#B59A57] transition-colors">{aviso.titulo}</h3>
        <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed font-light">{aviso.conteudo}</p>
        <button className="mt-auto text-[#B59A57] font-black text-xs flex items-center gap-2 uppercase tracking-[0.2em] group/btn">
          Ver Detalhes <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default Home;
