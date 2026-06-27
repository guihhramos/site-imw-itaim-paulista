import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Home, Sparkles, ChevronRight, Lightbulb, HandHeart, Quote, Mail, MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedCounter from './AnimatedCounter';

// Importando os dados estruturados da sua pasta utils
import { moveMinisterios, redeStartMinisterios, acaoSocialMinisterios } from '../utils/ministerios.ts';

// Mapeamento dinâmico de assets do Vite
const imagensAssets = import.meta.glob('../assets/*.{png,jpg,jpeg,svg}', { eager: true });

const getAssetUrl = (name: string): string => {
    const path = `../assets/${name}`;
    const asset = imagensAssets[path] as { default: string } | undefined;
    return asset ? asset.default : '';
};

// Interfaces para tipagem do TypeScript
interface MinisterioCardProps {
    id: string;
    title: string;
    icon: React.ReactNode;
    image: string;
    desc: string;
}

interface CapacitacaoCardProps {
    title: string;
    desc: string;
    tag: string;
}

interface SocialLinkProps {
    icon: React.ReactNode;
    label: string;
}

const Sobre: React.FC = () => {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <div className="min-h-screen bg-[#f8f9fa] font-sans selection:bg-[#B59A57] selection:text-white overflow-x-hidden">
            <Header />

            {/* --- HERO SECTION CINEMATOGRÁFICA --- */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#041d37]">
                <motion.div style={{ scale }} className="absolute inset-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#041d37] z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                        alt="Fundo IMW Itaim"
                    />
                </motion.div>

                <div className="relative z-20 text-center px-4">
                    <motion.div initial="hidden" animate="visible" >
                        <span className="inline-block px-4 py-1 mb-6 border border-[#B59A57] text-[#B59A57] text-xs font-bold tracking-[0.3em] uppercase rounded-full bg-[#B59A57]/10 backdrop-blur-sm">
                            Nossa Essência
                        </span>
                        <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                            IMW <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B59A57] to-[#d4bc82]">ITAIM</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
                            Uma igreja que se move pelo propósito, vive em unidade e transforma realidades através do amor de Cristo.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- O MOVIMENTO MOVE --- */}
            <section className="py-32 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-5xl md:text-7xl font-black text-[#041d37] uppercase tracking-tighter leading-none">
                                O Movimento <span className="text-[#B59A57]">MOVE</span>
                            </h2>
                            <p className="mt-8 text-gray-600 text-lg leading-relaxed">
                                Não somos apenas uma estrutura, somos um body em movimento. O MOVE é a engrenagem que organiza nossos ministérios para servir com excelência.
                            </p>
                        </div>
                        <div className="hidden md:block text-right">
                            <span className="text-8xl font-black text-gray-100 select-none">ESTRUTURA</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {moveMinisterios.map((min) => {
                            const IconComponent = min.icon;
                            return (
                                <MinisterioCard
                                    key={min.id}
                                    id={min.id}
                                    title={min.title}
                                    icon={<IconComponent size={32} />}
                                    image={getAssetUrl(min.imageName) || min.fallbackImage}
                                    desc={min.desc}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- REDE START --- */}
            <section className="py-32 px-6 bg-gray-100 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} >
                            <Lightbulb size={48} className="mx-auto text-[#B59A57] mb-6" />
                            <h2 className="text-5xl font-black text-[#041d37] uppercase tracking-tighter">
                                Rede <span className="text-[#B59A57]">START</span>
                            </h2>
                            <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                                Acreditamos no potencial da nova geração. A Rede START prepara crianças e pré-adolescentes para serem líderes e influenciadores no Reino de Deus.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                        {redeStartMinisterios.map((min) => {
                            const IconComponent = min.icon;
                            return (
                                <MinisterioCard
                                    key={min.id}
                                    id={min.id}
                                    title={min.title}
                                    icon={<IconComponent size={24} />}
                                    image={getAssetUrl(min.imageName) || min.fallbackImage}
                                    desc={min.desc}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- GCEU: IGREJA NAS CASAS --- */}
            <section className="py-32 bg-[#041d37] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#B59A57]/5 skew-x-12 translate-x-20" />

                <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/2"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-[#B59A57] rounded-2xl text-white">
                                <Home size={32} />
                            </div>
                            <h2 className="text-5xl font-black text-white uppercase tracking-tighter">GCEU</h2>
                        </div>
                        <h3 className="text-3xl font-bold text-[#B59A57] mb-8 leading-tight">
                            Crescimento, Evangelização e Unidade nos Lares.
                        </h3>
                        <p className="text-gray-400 text-xl leading-relaxed mb-10">
                            Acreditamos que a igreja não se limita a quatro paredes. Nos GCEUs, a vida cristã acontece de forma orgânica, onde cada casa se torna um farol de esperança para a vizinhança.
                        </p>
                        <button className="group flex items-center gap-3 text-white font-bold uppercase tracking-widest text-sm border-b-2 border-[#B59A57] pb-2 hover:text-[#B59A57] transition-colors">
                            Encontre um GCEU próximo <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/2 grid grid-cols-2 gap-4"
                    >
                        <div className="space-y-4 pt-12">
                            <img src={getAssetUrl('GCEUU.jpeg')} className="rounded-3xl h-64 w-full object-cover shadow-2xl" alt="Reunião GCEU" />
                            <div className="bg-[#B59A57] p-8 rounded-3xl text-white">
                                <Sparkles size={40} className="mb-4 opacity-50" />
                                <p className="font-bold text-2xl">Comunhão Real</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-white">
                                <span className="text-sm uppercase tracking-widest opacity-60 block mb-2">Casas Abertas</span>
                                <div className="text-4xl font-black text-[#B59A57]">
                                    <AnimatedCounter from={0} to={15} suffix="+" />
                                </div>
                            </div>
                            <img 
                                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600" 
                                className="rounded-3xl h-80 w-full object-cover shadow-2xl" 
                                alt="Casas e Comunhão" 
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- PROJETO AÇÃO SOCIAL --- */}
            <section className="py-32 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} >
                            <HandHeart size={48} className="mx-auto text-[#B59A57] mb-6" />
                            <h2 className="text-5xl font-black text-[#041d37] uppercase tracking-tighter">
                                Projeto <span className="text-[#B59A57]">Ação Social</span>
                            </h2>
                            <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
                                Transformando vidas e comunidades através do amor prático. Nosso projeto de Ação Social busca atender às necessidades de famílias e indivíduos em situação de vulnerabilidade.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {acaoSocialMinisterios.map((min) => {
                            const IconComponent = min.icon;
                            return (
                                <MinisterioCard
                                    key={min.id}
                                    id={min.id}
                                    title={min.title}
                                    icon={<IconComponent size={32} />}
                                    image={getAssetUrl(min.imageName) || min.fallbackImage}
                                    desc={min.desc}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- CAPACITAÇÃO & REINO --- */}
            <section className="py-32 px-6 bg-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-black text-[#041d37] uppercase tracking-tighter">Capacitação & Reino</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <CapacitacaoCard
                            title="Oficina da Alma"
                            desc="Um mergulho profundo no cuidado emocional e espiritual para uma vida plena."
                            tag="Espiritual"
                        />
                        <CapacitacaoCard
                            title="Escola de Servos"
                            desc="Treinamento técnico e ministerial para quem deseja servir com excelência."
                            tag="Técnico"
                        />
                        <CapacitacaoCard
                            title="EBD"
                            desc="Formação de discípulos comprometidos com o Reino através do estudo sistemático da Palavra."
                            tag="Domingo de Manhã"
                        />
                    </div>
                </div>
            </section>

            {/* --- SEÇÃO DO PASTOR --- */}
            <section className="py-32 px-6 bg-[#041d37] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 border-[20px] border-[#B59A57]/20 rounded-full" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 border-[20px] border-[#B59A57]/20 rounded-full" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="bg-white/5 backdrop-blur-sm rounded-[4rem] p-8 md:p-20 flex flex-col lg:flex-row items-center gap-16 border border-white/10 shadow-2xl">
                        <div className="relative group">
                            <div className="absolute -inset-4 border-2 border-[#B59A57] rounded-[3.5rem] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                className="w-72 h-72 md:w-[450px] md:h-[550px] rounded-[3rem] overflow-hidden shadow-2xl relative z-10"
                            >
                                <img
                                    src={getAssetUrl('pastor_palmireno.jpg')}
                                    alt="Pastor Palmireno Mendes"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop';
                                    }}
                                />
                            </motion.div>
                        </div>

                        <div className="flex-1 text-center lg:text-left">
                            <Quote size={80} className="text-[#B59A57] opacity-30 mb-6 mx-auto lg:mx-0" />
                            <h4 className="text-sm font-bold text-[#B59A57] uppercase tracking-[0.4em] mb-4">Nosso Pastor</h4>
                            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                                Palmireno <span className="text-[#B59A57]">Mendes</span>
                            </h2>
                            <p className="text-2xl text-gray-300 font-light italic leading-relaxed mb-12">
                                "Minha missão é ver cada pessoa da IMW Itaim Paulista vivendo o seu propósito máximo em Deus, sendo luz nesta cidade."
                            </p>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                                <SocialLink icon={<Mail size={20} />} label="contato@imwitaim.com" />
                                <MapPin size={20} className="text-[#B59A57]" /> <span className="text-sm font-bold text-gray-300">Itaim Paulista, SP</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

/* --- SUB-COMPONENTS ESTILIZADOS --- */

const MinisterioCard: React.FC<MinisterioCardProps> = ({ id, title, icon, image, desc }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            whileHover={{ y: -10 }}
            onClick={() => navigate(`/ministerio/${id}`)}
            className="group relative h-[400px] rounded-[3rem] overflow-hidden shadow-xl bg-[#041d37] cursor-pointer"
        >
            <img 
                src={image} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={title} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

            <div className="absolute bottom-0 left-0 p-8 w-full z-20">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/20">
                        {icon}
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{title}</h3>
                </div>
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-20 overflow-hidden">
                    {desc}
                </p>
            </div>
        </motion.div>
    );
};

const CapacitacaoCard: React.FC<CapacitacaoCardProps> = ({ title, desc, tag }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all"
    >
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
            {tag}
        </span>
        <h4 className="text-2xl font-black text-[#041d37] uppercase mb-4">{title}</h4>
        <p className="text-gray-600 leading-relaxed">{desc}</p>
    </motion.div>
);

const SocialLink: React.FC<SocialLinkProps> = ({ icon, label }) => (
    <div className="flex items-center gap-3 text-gray-300 hover:text-[#B59A57] transition-colors cursor-pointer">
        <div className="p-2 bg-white/10 rounded-lg">{icon}</div>
        <span className="text-sm font-bold">{label}</span>
    </div>
);

export default Sobre;