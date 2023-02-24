import { SocialImpactCategories } from '../../services/firebase/types'

export const updateSocialImpactTags = (category: SocialImpactCategories, tag: string) => {
	socialImpactCategories[category].tags = [...socialImpactCategories[category].tags, tag]
}

const commonTags = [
	'fome',
	'roupas',
	'educação',
	'renda e trabalho',
	'paz e justiça',
	'igualdade social',
	'moradia',
	'igualdade de gênero',
	'energia',
	'água',
	'mudança climática',
	'biodiversidade',
	'polução',
	'preservação ',
]

const socialImpactCategories = {
	ONGs: {
		label: 'ONGs',
		value: 'ONGs',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/dd5e0863-9cfb-4ee0-a42b-954153b691e0/Ong.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T201644Z&X-Amz-Expires=86400&X-Amz-Signature=6e2d4ca2462604d6a794f69bcae4b8cb7c8a35c4f1d5cd0be0d722db901f2d13&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Ong.svg%22&x-id=GetObject',
		tags: commonTags
	},

	popularIniciatives: {
		label: 'iniciativas populares',
		value: 'popularIniciatives',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/49e71e86-00b3-43f4-a799-ec9ba288a08d/Iniciativas_Populares.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T203738Z&X-Amz-Expires=86400&X-Amz-Signature=9b563afb58be10023945de5d72d2c31d65a9df52bf9513f4f7360d429f66b4eb&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Iniciativas%2520Populares.svg%22&x-id=GetObject',
		tags: commonTags
	},

	charityBazaars: {
		label: 'bazares beneficentes',
		value: 'charityBazaars',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/34eeac16-29c2-4a12-b0b7-f22f3b482b11/Bazares_Beneficentes.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T164759Z&X-Amz-Expires=86400&X-Amz-Signature=d7d04da1f8fe144b6faf4d6b21c9c051cd7786d396e5021277234b6529f414a5&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D"Bazares%2520Beneficentes.svg"&x-id=GetObject',
		tags: commonTags
	},

	associations: {
		label: 'associações',
		value: 'associations',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/33c8a4a9-9a3c-4856-87a3-882670fb009e/Associao.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T203751Z&X-Amz-Expires=86400&X-Amz-Signature=f518efe353c4abc47d40e143b4d5ab4055fb3cb3e57d18b0d2b10151ab3ab6fa&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Associa%25C3%25A7%25C3%25A3o.svg%22&x-id=GetObject',
		tags: commonTags
	},
	collective: {
		label: 'coletivos',
		value: 'collective',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7e8c5c07-50f0-421d-af2f-938ee3878f70/Coletivo.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T171042Z&X-Amz-Expires=86400&X-Amz-Signature=2019b0f739672203f1570c65ff71d47a4fb1c3371bf1177295bae54fb56807c8&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Coletivo.svg%22&x-id=GetObject',
		tags: commonTags
	},

	socialProjects: {
		label: 'projetos sociais',
		value: 'socialProjects',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/40efa31d-a9a7-4d78-b794-70ace8490a0a/Projetos_Sociais.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T201227Z&X-Amz-Expires=86400&X-Amz-Signature=823508c15c1a1e4bd5e0e03832d4bded04bed2544f966f6079d69c6cee5f4e79&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Projetos%2520Sociais.svg%22&x-id=GetObject',
		tags: commonTags
	},

	volounteering: {
		label: 'voluntariado',
		value: 'volounteering',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8762796f-b9fd-4b4b-b419-b07b45aa0d23/Voluntariado.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T193340Z&X-Amz-Expires=86400&X-Amz-Signature=0b4822b9f9bcf6ea46698a2748a7870b7fa0f68a4c7cecbc71562b3733cb5cbd&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Voluntariado.svg%22&x-id=GetObject',
		tags: commonTags
	},

	donations: {
		label: 'doações',
		value: 'donations',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c67bdbf8-f432-4fd6-b50b-cf4c57baa222/Doaes_1.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T171619Z&X-Amz-Expires=86400&X-Amz-Signature=12cd77a9b05135e92813a683e1afae9c995847068d171460d627cbbe82ffcfa1&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Doa%25C3%25A7%25C3%25B5es%25201.svg%22&x-id=GetObject',
		tags: commonTags
	},

	others: {
		label: 'outros',
		value: 'others',
		tags: []
	},
}

export { socialImpactCategories }
