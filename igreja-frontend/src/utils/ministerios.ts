import React from 'react';
import { 
    Music, Users, Camera, UserPlus, Footprints, Theater, Heart, GraduationCap, Link 
} from 'lucide-react';

// Tipagem para os Líderes
export interface Lider {
    nome: string;
    cargo: string;
    frase: string;
    fotoName?: string; // Nome do arquivo dentro de src/assets/
}

// Tipagem para os Ministérios
export interface Ministerio {
    id: string;
    title: string;
    icon: React.ComponentType<{ size: number }>;
    imageName: string;
    fallbackImage: string;
    desc: string;
    galeria?: string[];
    lideranca?: Lider; // Dados da liderança premium
}

export const moveMinisterios: Ministerio[] = [
    {
        id: 'louvor',
        title: 'Louvor',
        icon: Music,
        imageName: 'louvor.jpeg',
        fallbackImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=600',
        desc: 'Adoração que rompe barreiras e prepara o caminho para o agir de Deus.',
        galeria: ['louvor.jpeg', 'imgLouvor.png',],
        lideranca: {
            nome: 'Sem. Tamires',
            cargo: 'Líder do Ministério de Louvor',
            frase: '“Adoração que conduz pessoas à presença de Deus.”',
            fotoName: 'louvor.jpeg' // Substitua pelo arquivo de imagem real do líder
        }
    },
    {
        id: 'juventude',
        title: 'Juventude',
        icon: Users,
        imageName: 'juve.jpeg',
        fallbackImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600',
        desc: 'Uma geração apaixonada, conectada e focada no Reino.',
        galeria: ['juve.jpeg'],
        lideranca: {
            nome: 'Guilherme Silva',
            cargo: 'Lider da Juventude',
            frase: '“Uma geração apaixonada, conectada e focada no Reino.”',
            fotoName: 'juve.jpeg'
        }
    },
    {
        id: 'midia',
        title: 'Mídia & Som',
        icon: Camera,
        imageName: 'midia.jpeg',
        fallbackImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600',
        desc: 'Tecnologia e arte a serviço da mensagem eterna.',
        galeria: ['midia.jpeg', 'foto7.jpg'],
        lideranca: {
            nome: 'Coordenador de Mídia',
            cargo: 'Diretor de Comunicação',
            frase: '“Tecnologia e arte a serviço da mensagem eterna.”',
            fotoName: 'midia.jpeg'
        }
    },
    {
        id: 'integracao',
        title: 'Integração',
        icon: UserPlus,
        imageName: 'integracao.jpeg',
        fallbackImage: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600',
        desc: 'Acolhendo novos membros e conectando pessoas ao corpo de Cristo.',
        galeria: ['integracao.jpeg'],
        lideranca: {
            nome: 'Líder de Integração',
            cargo: 'Supervisor de Recepção',
            frase: '“Acolhendo novos membros e conectando pessoas ao corpo de Cristo.”',
            fotoName: 'integracao.jpeg'
        }
    },
    {
        id: 'danca',
        title: 'Dança',
        icon: Footprints,
        imageName: 'danca.jpeg',
        fallbackImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600',
        desc: 'Expressão corporal que adora ao Senhor através de movimentos e coreografias.',
        galeria: ['danca.jpeg'],
        lideranca: {
            nome: 'Líder de Dança',
            cargo: 'Coreógrafa Geral',
            frase: '“Expressão corporal que adora ao Senhor através de movimentos.”',
            fotoName: 'danca.jpeg'
        }
    },
    {
        id: 'teatro',
        title: 'Teatro',
        icon: Theater,
        imageName: 'foto7.jpg',
        fallbackImage: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=600',
        desc: 'Arte dramática para comunicar as verdades do Evangelho de forma criativa.',
        galeria: ['foto7.jpg'],
        lideranca: {
            nome: 'Diretor de Teatro',
            cargo: 'Coordenador de Artes Cênicas',
            frase: '“Arte dramática para comunicar as verdades do Evangelho.”',
            fotoName: 'foto7.jpg'
        }
    }
];

export const redeStartMinisterios: Ministerio[] = [
    {
        id: 'kids',
        title: 'Start Kids',
        icon: Link,
        imageName: 'kids1.jpeg',
        fallbackImage: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=600',
        desc: 'Um ambiente seguro e divertido onde as crianças aprendem sobre Jesus de forma criativa e relevante.',
        galeria: ['kids1.jpeg'],
        lideranca: {
            nome: 'Líder Start Kids',
            cargo: 'Coordenadora de Ministério Infantil',
            frase: '“Ensinando o caminho em que a criança deve andar.”',
            fotoName: 'kids1.jpeg'
        }
    },
    {
        id: 'pre',
        title: 'Conexão Pré',
        icon: Link,
        imageName: 'pres1.jpeg',
        fallbackImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600',
        desc: 'Um espaço para pré-adolescentes se conectarem, crescerem na fé e descobrirem seu propósito.',
        galeria: ['pres1.jpeg'],
        lideranca: {
            nome: 'Líder Conexão Pré',
            cargo: 'Líder de Pré-Adolescentes',
            frase: '“Conectando corações ao propósito eterno desde cedo.”',
            fotoName: 'pres1.jpeg'
        }
    }
];

export const acaoSocialMinisterios: Ministerio[] = [
    {
        id: 'cestas',
        title: 'Cestas Básicas',
        icon: Heart,
        imageName: 'cestas.jpeg',
        fallbackImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600',
        desc: 'Distribuição de alimentos para famílias carentes, garantindo nutrição e esperança.',
        galeria: ['cestas.jpeg'],
        lideranca: {
            nome: 'Coordenador de Ação Social',
            cargo: 'Diretor de Logística Solidária',
            frase: '“Manifestando o amor de Deus através do cuidado prático.”',
            fotoName: 'cestas.jpeg'
        }
    },
    {
        id: 'educacional',
        title: 'Apoio Educacional',
        icon: GraduationCap,
        imageName: 'educacional.jpeg',
        fallbackImage: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600',
        desc: 'Suporte escolar e atividades de reforço para crianças e adolescentes.',
        galeria: ['educacional.jpeg'],
        lideranca: {
            nome: 'Líder Educacional',
            cargo: 'Coordenador de Pedagogia Social',
            frase: '“Transformando realidades através do conhecimento e do amor.”',
            fotoName: 'educacional.jpeg'
        }
    },
    {
        id: 'visitas',
        title: 'Visitas e Aconselhamento',
        icon: Users,
        imageName: 'visitas.jpeg',
        fallbackImage: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600',
        desc: 'Oferecendo suporte emocional e espiritual para aqueles que precisam.',
        galeria: ['visitas.jpeg'],
        lideranca: {
            nome: 'Pastor de Visitação',
            cargo: 'Conselheiro Pastoral Local',
            frase: '“Acolhimento, escuta ativa e direcionamento debaixo da graça.”',
            fotoName: 'visitas.jpeg'
        }
    }
];