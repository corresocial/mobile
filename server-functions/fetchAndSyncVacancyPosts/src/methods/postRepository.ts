import * as admin from 'firebase-admin'
import { VacancyPost } from '../types/vacancyPost';

async function getRegisteredExternalVacancies() {
    const db = admin.firestore();
    const vacanciesRef = db.collection('posts')

    try {
        const vacanciesSnaphot = await vacanciesRef
            .where('macroCategory', '==', 'vacancy')
            .where('externalPostId', '>', '0')
            .get()

        return vacanciesSnaphot.docs.map((doc) => ({ ...doc.data(), postId: doc.id })) as VacancyPost[]
    } catch (error) {
        console.log(error)
        return [] as VacancyPost[]
    }
}

async function saveVacancies(vacancies: VacancyPost[]): Promise<VacancyPost[]> {
    let lastVacancyId = ''
    const savedVacancies: VacancyPost[] = []

    try {
        const db = admin.firestore()
        const batch = db.batch()

        const vacanciesCollection = db.collection('posts')

        vacancies.forEach((vacancy) => {
            const docRef = vacanciesCollection.doc()
            batch.create(docRef, { ...vacancy, createdAt: new Date(), source: 'prefeituraLondrina' })

            console.log('Salvando vaga com o id', vacancy.externalPostId)
            lastVacancyId = vacancy.externalPostId || docRef.id
            savedVacancies.push({ ...vacancy, postId: docRef.id })

            batch.update(docRef, { postId: docRef.id })
        })

        await batch.commit()
        return savedVacancies
    } catch (error) {
        console.log(error)
        console.log('Erro ao salvar o vaga: ', lastVacancyId)
        return []
    }
}

async function deleteRegisteredVacancies(vacancies: VacancyPost[], registeredExternalVacancies: VacancyPost[]): Promise<VacancyPost[]> {
    let lastVacancyId = '';
    const removedVacancies: VacancyPost[] = []

    try {
        const db = admin.firestore();
        const batch = db.batch();

        const vacanciesCollection = db.collection('posts');

        vacancies.forEach((vacancy) => {
            const vacancyId = getPostIdByExternalVacancyId(vacancy, registeredExternalVacancies);
            if (!vacancyId) return

            lastVacancyId = vacancyId;
            removedVacancies.push(vacancy)

            const docRef = vacanciesCollection.doc(vacancyId);
            console.log('Deletando vaga com o id', vacancy.externalPostId)
            batch.delete(docRef);
        });

        await batch.commit();

        return removedVacancies;
    } catch (error) {
        console.log(error);
        console.log('Erro ao deletar o vaga: ', lastVacancyId);
        return []
    }
}

async function updateRegisteredVacancies(vacancies: VacancyPost[], registeredExternalVacancies: VacancyPost[]): Promise<VacancyPost[]> {
    let lastVacancyId = '';
    const removedVacancies: VacancyPost[] = []

    try {
        const db = admin.firestore();
        const batch = db.batch();

        const vacanciesCollection = db.collection('posts');

        vacancies.forEach((vacancy) => {
            const vacancyId = getPostIdByExternalVacancyId(vacancy, registeredExternalVacancies);
            if (!vacancyId) return

            lastVacancyId = vacancyId;
            removedVacancies.push(vacancy)

            const docRef = vacanciesCollection.doc(vacancyId);
            // console.log('Atualizando vaga com o id', vacancy.externalPostId)
            batch.update(docRef, { ...vacancy, completed: true, source: 'prefeituraLondrina' });
        });

        await batch.commit();

        return removedVacancies
    } catch (error) {
        console.log(error);
        console.log('Erro ao atualizar a vaga: ', lastVacancyId);
        return []
    }
}

function getPostIdByExternalVacancyId(vacancy: VacancyPost, registeredExternalVacancies: VacancyPost[]) {
    const currentVacancy = registeredExternalVacancies.find((registeredVacancy) => registeredVacancy.externalPostId === vacancy.externalPostId)
    return currentVacancy && currentVacancy?.postId ? currentVacancy?.postId : null
}

export {
    getRegisteredExternalVacancies,
    saveVacancies,
    deleteRegisteredVacancies,
    updateRegisteredVacancies
}