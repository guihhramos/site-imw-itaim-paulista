import React, { useState, useCallback, useMemo } from 'react';
import { useParams as useParamDoc, useNavigate as useNavDoc } from 'react-router-dom';
import {
    ArrowLeft,
    Clock,
    User,
    ShieldCheck,
    Sparkles,
    ChevronRight,
    ChevronLeft,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { moveMinisterios, redeStartMinisterios, acaoSocialMinisterios } from '../utils/ministerios.ts';

const imagensAssets = import.meta.glob('../assets/*.{png,jpg,jpeg,svg}', { eager: true });

const getAssetUrl = (name: string): string => {
    const path = `../assets/${name}`;
    const asset = imagensAssets[path] as { default: string } | undefined;
    return asset ? asset.default : '';
};

// Componente de Animação de Entrada
const FadeInUp: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className={className}
    >
        {children}
    </motion.div>
);

// Componente de Card Reutilizável com suporte a classes customizadas
interface CardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay?: number;
    badge?: string;
    children?: React.ReactNode;
    containerClassName?: string;
}

const InfoCard: React.FC<CardProps> = ({
    icon,
    title,
    description,
    delay = 0,
    badge,
    children,
    containerClassName = '',
}) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className={`flex-1 flex flex-col ${containerClassName}`}
    >
        <div className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border border-white/15 rounded-3xl p-8 hover:border-[#B59A57]/50 hover:shadow-[0_0_40px_rgba(181,154,87,0.2)] transition-all duration-500 group relative overflow-hidden flex-1 flex flex-col justify-between">
            {/* Efeito de fundo gradiente */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#B59A57]/5 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-[#B59A57]/15 text-[#B59A57] rounded-2xl border border-[#B59A57]/30 group-hover:bg-[#B59A57] group-hover:text-[#041d37] transition-all duration-300 flex-shrink-0">
                                {icon}
                            </div>
                            <h4 className="font-black text-white text-lg uppercase tracking-wider">{title}</h4>
                        </div>
                        {badge && (
                            <span className="text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-[#B59A57] to-[#d4bc82] text-[#041d37] px-3 py-1.5 rounded-full shadow-lg flex-shrink-0">
                                {badge}
                            </span>
                        )}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">{description}</p>
                </div>
                {children && <div className="mt-4">{children}</div>}
            </div>
        </div>
    </motion.div>
);

// Componente de Carrossel de Fotos
const GaleriaCarrossel: React.FC<{ fotos: string[]; titulo: string }> = ({ fotos, titulo }) => {
    const [fotoAtiva, setFotoAtiva] = useState(0);

    const proximaFoto = useCallback(() => {
        setFotoAtiva((prev) => (prev === fotos.length - 1 ? 0 : prev + 1));
    }, [fotos.length]);

    const fotoAnterior = useCallback(() => {
        setFotoAtiva((prev) => (prev === 0 ? fotos.length - 1 : prev - 1));
    }, [fotos.length]);

    // Navegação por teclado
    React.useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') fotoAnterior();
            if (e.key === 'ArrowRight') proximaFoto();
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [proximaFoto, fotoAnterior]);

    return (
        <FadeInUp>
            <div className="space-y-6">
                <div className="flex items-center gap-3 px-4">
                    <div className="p-2 bg-[#B59A57]/20 rounded-lg">
                        <Sparkles size={20} className="text-[#B59A57]" />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-wider">{titulo}</h3>
                    <span className="text-xs font-bold text-gray-400 ml-auto">
                        {fotoAtiva + 1} / {fotos.length}
                    </span>
                </div>

                <div className="relative h-[50vh] md:h-[65vh] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/60 backdrop-blur-md group/carousel">
                    {/* Imagem com animação */}
                    <div className="absolute inset-0 w-full h-full">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={fotoAtiva}
                                src={fotos[fotoAtiva]}
                                initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                                transition={{ duration: 0.6 }}
                                className="w-full h-full object-cover"
                                alt={`Foto ${fotoAtiva + 1}`}
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>

                    {/* Botões de Navegação */}
                    <motion.button
                        onClick={fotoAnterior}
                        whileHover={{ scale: 1.1, x: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-black/40 hover:bg-[#B59A57] text-white hover:text-[#041d37] rounded-full border border-white/10 backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-30 shadow-lg"
                        aria-label="Foto anterior"
                    >
                        <ChevronLeft size={28} />
                    </motion.button>

                    <motion.button
                        onClick={proximaFoto}
                        whileHover={{ scale: 1.1, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-black/40 hover:bg-[#B59A57] text-white hover:text-[#041d37] rounded-full border border-white/10 backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-30 shadow-lg"
                        aria-label="Próxima foto"
                    >
                        <ChevronRight size={28} />
                    </motion.button>

                    {/* Indicadores de Foto */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-30 bg-black/40 backdrop-blur-md px-5 py-3 rounded-full border border-white/10">
                        {fotos.map((_: string, index: number) => (
                            <motion.button
                                key={index}
                                onClick={() => setFotoAtiva(index)}
                                whileHover={{ scale: 1.2 }}
                                className={`rounded-full transition-all duration-300 ${index === fotoAtiva
                                    ? 'w-8 h-3 bg-gradient-to-r from-[#B59A57] to-[#d4bc82] shadow-lg'
                                    : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                                    }`}
                                aria-label={`Ir para foto ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </FadeInUp>
    );
};

// Componente Principal
const MinisterioDetalhe: React.FC = () => {
    const { id } = useParamDoc();
    const navigate = useNavDoc();

    const todosMinisterios = useMemo(
        () => [...moveMinisterios, ...redeStartMinisterios, ...acaoSocialMinisterios],
        []
    );

    const ministerio = useMemo(() => todosMinisterios.find((m) => m.id === id), [id, todosMinisterios]);

    // Estado de Carregamento
    if (!ministerio) {
        return (
            <div className="min-h-screen bg-[#020c16] flex flex-col justify-between text-white">
                <Header />
                <div className="text-center py-32 px-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(181,154,87,0.1),transparent_60%)]" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                            Ministério não encontrado
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg">
                            O departamento selecionado não foi localizado ou foi movido.
                        </p>
                        <motion.button
                            onClick={() => navigate('/sobre')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[#B59A57] to-[#d4bc82] text-[#041d37] font-black uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:shadow-[0_0_30px_rgba(181,154,87,0.4)] transition-all shadow-[0_0_20px_rgba(181,154,87,0.3)]"
                        >
                            Voltar para Sobre
                        </motion.button>
                    </motion.div>
                </div>
                <Footer />
            </div>
        );
    }

    const IconComponent = ministerio.icon;
    const imagemUrl = getAssetUrl(ministerio.imageName) || ministerio.fallbackImage;

    const listaFotos: string[] = useMemo(
        () =>
            ministerio.galeria && ministerio.galeria.length > 0
                ? ministerio.galeria.map((nomeFoto) => getAssetUrl(nomeFoto) || ministerio.fallbackImage)
                : [
                    imagemUrl,
                    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
                ],
        [ministerio, imagemUrl]
    );

    return (
        <div className="min-h-screen bg-[#020c16] font-sans overflow-x-hidden text-gray-200 selection:bg-[#B59A57] selection:text-white">
            <Header />

            {/* === HERO BANNER IMERSIVO === */}
            <section className="relative h-[65vh] flex items-end p-6 md:p-20 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020c16] via-[#020c16]/70 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020c16] via-transparent to-transparent z-10" />
                    <motion.img
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.35 }}
                        transition={{ duration: 0.8 }}
                        src={imagemUrl}
                        className="w-full h-full object-cover filter brightness-75 contrast-125"
                        alt={ministerio.title}
                    />
                </div>

                {/* Efeito de Luz Dinâmica */}
                <motion.div
                    animate={{
                        x: [0, 20, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#B59A57]/10 rounded-full blur-[120px] pointer-events-none"
                />

                <div className="relative z-20 max-w-7xl mx-auto w-full">
                    {/* Botão de Voltar */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate(-1)}
                        whileHover={{ x: -5 }}
                        className="group flex items-center gap-2 text-gray-300 font-bold text-xs uppercase tracking-widest bg-white/5 hover:bg-[#B59A57] hover:text-[#041d37] backdrop-blur-md px-5 py-3 rounded-full transition-all mb-8 w-fit border border-white/10 shadow-lg"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Voltar para Sobre
                    </motion.button>

                    {/* Cabeçalho Principal */}
                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                        <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', damping: 15 }}
                            className="p-5 bg-gradient-to-br from-[#B59A57] to-[#d4bc82] text-[#041d37] rounded-3xl shadow-[0_0_40px_rgba(181,154,87,0.5)] flex items-center justify-center w-fit"
                        >
                            <IconComponent size={40} />
                        </motion.div>

                        <div>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-xs font-bold text-[#B59A57] uppercase tracking-[0.4em] block mb-2"
                            >
                                Departamento Oficial IMW Itaim
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none"
                            >
                                {ministerio.title}
                            </motion.h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* === CONTEÚDO PRINCIPAL COM LAYOUT BALANCEADO SIMÉTRICO === */}
            <section className="py-16 px-4 md:px-6 relative z-20 -mt-12">
                <div className="max-w-6xl mx-auto">
                    {/* Ajuste no items-stretch e lg:auto-rows-fr garante que as colunas
            fiquem alinhadas perfeitamente por igual em telas grandes.
          */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch lg:auto-rows-fr">

                        {/* COLUNA ESQUERDA: PROPÓSITO */}
                        <FadeInUp className="lg:col-span-2 h-full">
                            <div className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border border-white/15 rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden group h-full flex flex-col justify-center">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#B59A57]/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-2 bg-[#B59A57]/20 rounded-lg">
                                            <Sparkles size={20} className="text-[#B59A57]" />
                                        </div>
                                        <h2 className="text-xs font-bold text-[#B59A57] uppercase tracking-[0.2em]">
                                            Nossa Missão Estratégica
                                        </h2>
                                    </div>

                                    <p className="text-white text-xl md:text-2xl leading-relaxed font-light mb-10 border-l-4 border-[#B59A57] pl-6 md:pl-8 italic">
                                        "{ministerio.desc}"
                                    </p>

                                    <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                                        Cada ação, escala e projeto desenvolvido por este departamento visa consolidar o crescimento
                                        espiritual da nossa comunidade local, atuando de forma integrada com a visão geral da IMW Itaim
                                        Paulista.
                                    </p>
                                </div>
                            </div>
                        </FadeInUp>

                        {/* COLUNA DIREITA: TRÊS CARDS BEM DISTRIBUÍDOS SEM DEIXAR BURACOS */}
                        <div className="lg:col-span-1 flex flex-col gap-6 h-full justify-between">

                            {/* CARD DE LIDERANÇA */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0, duration: 0.6 }}
                                className="flex-1 flex flex-col"
                            >
                                <div className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border border-white/15 rounded-3xl p-8 hover:border-[#B59A57]/50 hover:shadow-[0_0_40px_rgba(181,154,87,0.2)] transition-all duration-500 group relative overflow-hidden flex-1 flex flex-col justify-between">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#B59A57]/5 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10 flex flex-col h-full justify-between">
                                        <div>
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-2.5 bg-[#B59A57]/15 text-[#B59A57] rounded-xl border border-[#B59A57]/30">
                                                        <User size={18} />
                                                    </div>
                                                    <h4 className="font-black text-white text-xs uppercase tracking-widest">Liderança</h4>
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-[#B59A57] to-[#d4bc82] text-[#041d37] px-3 py-1 rounded-full shadow-sm">
                                                    Oficial
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4 mb-4">
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    className="relative w-16 h-16 shrink-0 rounded-full p-[2px] bg-gradient-to-br from-[#B59A57] to-[#d4bc82] shadow-md"
                                                >
                                                    <div className="w-full h-full rounded-full overflow-hidden bg-[#041d37]">
                                                        {ministerio.lideranca?.fotoName ? (
                                                            <img
                                                                src={getAssetUrl(ministerio.lideranca.fotoName)}
                                                                alt={ministerio.lideranca?.nome}
                                                                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-105"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-[#B59A57]">
                                                                <User size={24} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>

                                                <div>
                                                    <h5 className="font-black text-white text-lg tracking-tight leading-snug">
                                                        {ministerio.lideranca?.nome || 'Liderança Local'}
                                                    </h5>
                                                    <p className="text-[#B59A57] text-xs font-medium tracking-wide">
                                                        {ministerio.lideranca?.cargo || `Líder de ${ministerio.title}`}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-400 text-sm italic font-light leading-relaxed border-t border-white/5 pt-4 mt-4">
                                            {ministerio.lideranca?.frase ||
                                                '"Servindo ao corpo de Cristo com integridade, zelo e paixão pelo Reino."'}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* CARD DE ESCALAS */}
                            <InfoCard
                                icon={<Clock size={22} />}
                                title="Escalas e Ensaios"
                                description="Cronogramas organizados internamente. Os dias de reuniões e preparações variam conforme a demanda dos cultos públicos."
                                delay={0.1}
                            />

                            {/* CARD DE PROTEÇÃO DE DADOS */}
                            <InfoCard
                                icon={<ShieldCheck size={22} />}
                                title="Dados Protegidos"
                                description="Suas informações de cadastro e escalas ministeriais seguem rígidos critérios de privacidade e conformidade com a LGPD."
                                delay={0.2}
                            />
                        </div>

                    </div>
                </div>

                {/* === GALERIA DE FOTOS === */}
                <div className="max-w-6xl mx-auto mt-20">
                    <GaleriaCarrossel fotos={listaFotos} titulo="Galeria de Registro do Departamento" />
                </div>

                {/* === CALL TO ACTION === */}
                <FadeInUp delay={0.3}>
                    <div className="max-w-6xl mx-auto mt-20">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-gradient-to-r from-[#B59A57]/25 via-[#d4bc82]/10 to-transparent border border-[#B59A57]/40 p-8 md:p-14 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm relative overflow-hidden group"
                        >
                            <motion.div
                                animate={{
                                    opacity: [0.5, 0.8, 0.5],
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(181,154,87,0.2),transparent_50%)]"
                            />

                            <div className="relative z-10 text-center md:text-left">
                                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-3">
                                    Sentiu o chamado para servir?
                                </h3>
                                <p className="text-gray-300 text-sm md:text-base max-w-xl">
                                    Venha colocar os seus talentos à disposição do Reino. Faça parte ativamente da engrenagem do MOVE.
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05, x: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative z-10 w-full md:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-[#B59A57] to-[#d4bc82] text-[#041d37] font-black uppercase tracking-widest text-xs px-10 py-5 rounded-full hover:shadow-[0_0_40px_rgba(181,154,87,0.4)] transition-all shadow-[0_0_30px_rgba(181,154,87,0.2)] whitespace-nowrap"
                            >
                                Fazer Inscrição no Ministério <ChevronRight size={16} />
                            </motion.button>
                        </motion.div>
                    </div>
                </FadeInUp>
            </section>

            <Footer />
        </div>
    );
};

export default MinisterioDetalhe;