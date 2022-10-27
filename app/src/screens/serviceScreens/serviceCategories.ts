import { ServiceCategories } from "./types"

export const updateServiceTags = (category: ServiceCategories, tag: string) => {
    serviceCategories[category].tags = [...serviceCategories[category].tags, tag]
}

let serviceCategories = {
    house: {
        label: 'casa',
        value: 'house',
        tags: [
            'casa',
            'arquitetura',
            'home',
            'brasil',
            'decoracao',
            'design',
            'apartamento',
            'decoração',
            'architecture',
            'homedecor',
            'designdeinteriores',
            'interiores',
            'love',
            'imoveis',
            'instagood',
            'imobiliaria',
            'house',
            'interiordesign',
            'arte',
            'arquiteturadeinteriores',
            'interior',
            'decoration',
            'projeto',
            'lar',
            'cozinha',
            'arquiteto',
            'reforma'
        ]
    },

    health: {
        label: 'saúde',
        value: 'health',
        tags: [
            'medico',
            'enfermagem',
            'dermatologia',
            'hospital',
            'prontosocorre',
            'clinica',
            'fitness',
            'bemestar',
            'dieta',
            'foco',
            'academia',
            'treino',
            'emagreciment',
            'musculação',
            'personaltrainer',
            'crossfit',
            'musculacao',
            'bodybuilding',
            'modafitness',
            'nutrição'
        ]
    },

    leisure: {
        label: 'lazer',
        value: 'leisure',
        tags: [
            'turismo',
            'praia',
            'natureza',
            'familia',
            'viagem',
            'diversao',
            'cultura',
            'sol',
            'ferias',
            'esporte',
            'piscina',
            'mar',
            'hobby'
        ]
    },

    transport: {
        label: 'transporte',
        value: 'transport',
        tags: [
            'onibus',
            'rodoviario',
            'amador',
            'coletivo',
            'urbano',
            'vans',
            'motoboy',
            'frete',
            'uber',
            'motoboy',
            'mototaxi',
            'taxi',
            'moto',
            'carro',
            'cargaspequenas',
            'cargasmedias',
            'cargasgrandes'
        ]
    },

    sport: {
        label: 'esporte',
        value: 'sport',
        tags: [
            'futebol',
            'fitness',
            'saude',
            'corrida',
            'treino',
            'academia',
            'corrida',
            'surf',
            'skate',
            'basquete',
            'bike',
            'corridaderua',
            'luta',
            'jiujitsu'
        ]
    },

    foodAndDrink: {
        label: 'comida e bebida',
        value: 'foodAndDrink',
        tags: [
            'cerveja',
            'vinho',
            'marmita',
            'pizza',
            'japonesa',
            'gastronomia',
            'drinks',
            'gin',
            'vodka',
            'chopp',
            'bar',
            'gourmet',
            'restaurante',
            'lúpulo',
            'vegetariano',
            'hamburguer',
            'gourmet',
            'vegano',
            'petisco',
            'porcoes',
            'padaria'
        ]
    },

    education: {
        label: 'educação',
        value: 'education',
        tags: [
            'educação',
            'matemática',
            'portugues',
            'escola',
            'psicologia',
            'filosofia',
            'portugues',
            'cursinho',
            'online',
            'cursinho',
            'particular',
            'aula',
            'saude',
            'faculdade',
            'quimica',
            'arte',
            'dança',
            'psicologia',
            'uberlândia',
            'education',
            'sucesso'
        ]
    },

    technology: {
        label: 'tecnologia',
        value: 'technology',
        tags: [
            'assistencia',
            'inovação',
            'design',
            'informatica',
            'computador',
            'celular',
            'impressoras',
            'internet',
            'notebook',
            'marketing',
            'manutenção',
            'business',
            'programcao',
            'site',
            'portal',
            'android',
            'iphone',
            'ios'
        ]
    },

    beautyWellBeing: {
        label: 'beleza e bem-estar',
        value: 'beautyWellBeing',
        tags: [
            'bem-estar',
            'moda',
            'makeup',
            'maquiagem',
            'cuidados',
            'unha',
            'salao',
            'cabeleleiro',
            'cabelo',
            'mulher',
            'homem',
            'barbeiro',
            'corte',
            'bemestar',
            'maquiagem',
            'maquiadora',
            'hairstyle',
            'sobrancelhas',
            'depilacao',
            'dermatologia'
        ]
    },

    animals: {
        label: 'bichos',
        value: 'animals',
        tags: [
            'cachorro',
            'dog',
            'gato',
            'veterinario',
            'cirurgia',
            'dogs',
            'imagem',
            'adestramento',
            'petshop',
            'agrupecuaria',
            'gado',
            'boi',
            'passaros',
            'racao',
            'farmacia',
            'petshop'
        ]
    },

    finances: {
        label: 'financeiro',
        value: 'finances',
        tags: [
            'financeiro',
            'empreendedorismo',
            'credito',
            'emprestimo',
            'contabilidade',
            'gestão',
            'coach',
            'coaching',
            'administracao',
            'economia',
            'contador'
        ]
    },

    travel: {
        label: 'viajem',
        value: 'travel',
        tags: [
            'viajem',
            'natureza',
            'praia',
            'acampar',
            'escalar',
            'turismo',
            'agencia',
            'ferias',
            'brasil',
            'exterior',
            'passagens',
            'cachueira',
            'camping',
            'montanhas',
            'trilha'
        ]
    },

    events: {
        label: 'eventos',
        value: 'events',
        tags: [
            'casamento',
            'festas',
            'show',
            'cervejda',
            'aniversario',
            '15anos',
            'formatura',
            'personalizados',
            'brindes',
            'batizado',
            'casamentos',
            'brindespersonalizados',
            'copos',
            'buffet',
            'fotografia',
            'produçao'
        ]
    },

    others: {
        label: 'outros',
        value: 'others',
        tags: [
            'severino'
        ]
    },
}

export { serviceCategories }