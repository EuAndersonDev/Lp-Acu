export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
    isNew?: boolean;
}

export const CATEGORIES = [
    'Todos',
    'Cimento e Argamassa',
    'Ferramentas',
    'Hidráulica',
    'Elétrica',
    'Tintas',
    'Acabamentos'
];

export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Cimento CP II - 50kg - Votoran',
        category: 'Cimento e Argamassa',
        price: 34.90,
        image: 'https://placehold.co/400x400/f8fafc/1e293b?text=Cimento',
        description: 'Cimento de alta qualidade para uso geral em obras residenciais e comerciais.',
        isNew: true
    },
    {
        id: '2',
        name: 'Areia Média Lavada - Saco 20kg',
        category: 'Cimento e Argamassa',
        price: 8.50,
        image: 'https://placehold.co/400x400/f8fafc/1e293b?text=Areia',
        description: 'Areia lavada ideal para assentamento de tijolos e reboco.'
    },
    {
        id: '3',
        name: 'Kit Ferramentas 12 Peças Profissional',
        category: 'Ferramentas',
        price: 129.90,
        image: 'https://placehold.co/400x400/f8fafc/1e293b?text=Ferramentas',
        description: 'Maleta completa com as principais ferramentas para manutenção e reparos.'
    },
    {
        id: '4',
        name: 'Tinta Acrílica Fosca Branco Neve 18L',
        category: 'Tintas',
        price: 389.90,
        image: 'https://placehold.co/400x400/f8fafc/1e293b?text=Tinta',
        description: 'Tinta de alto rendimento e cobertura para paredes internas e externas.'
    },
    {
        id: '5',
        name: 'Bloco Cerâmico 9x19x29 (Milheiro)',
        category: 'Cimento e Argamassa',
        price: 1850.00,
        image: 'https://placehold.co/400x400/f8fafc/1e293b?text=Bloco',
        description: 'Bloco de vedação cerâmico de alta resistência e qualidade garantida.'
    },
    {
        id: '6',
        name: 'Argamassa ACIII Branca 20kg',
        category: 'Cimento e Argamassa',
        price: 42.90,
        image: 'https://placehold.co/400x400/f8fafc/1e293b?text=Argamassa',
        description: 'Argamassa colante de alta aderência para porcelanatos e pisos grandes.'
    },
    {
        id: '7',
        name: 'Tubo PVC Soldável 25mm - 3m',
        category: 'Hidráulica',
        price: 18.90,
        image: 'https://placehold.co/400x400/f8fafc/1e293b?text=Tubo+PVC',
        description: 'Tubo para condução de água fria com alta durabilidade e resistência.'
    },
    {
        id: '8',
        name: 'Fio Cabo Flexível 2.5mm - 100m',
        category: 'Elétrica',
        price: 145.00,
        image: 'https://placehold.co/400x400/f8fafc/1e293b?text=Fio+Cabo',
        description: 'Cabo elétrico flexível antichama para instalações residenciais seguras.'
    }
];
