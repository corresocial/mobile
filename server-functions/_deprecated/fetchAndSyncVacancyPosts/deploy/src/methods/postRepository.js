"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRegisteredVacancies = exports.deleteRegisteredVacancies = exports.saveVacancies = exports.getRegisteredExternalVacancies = void 0;
const admin = __importStar(require("firebase-admin"));
function getRegisteredExternalVacancies() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = admin.firestore();
        const vacanciesRef = db.collection('posts');
        try {
            const vacanciesSnaphot = yield vacanciesRef
                .where('macroCategory', '==', 'vacancy')
                .where('externalPostId', '>', '0')
                .get();
            return vacanciesSnaphot.docs.map((doc) => (Object.assign({ postId: doc.id }, doc.data())));
        }
        catch (error) {
            console.log(error);
            return [];
        }
    });
}
exports.getRegisteredExternalVacancies = getRegisteredExternalVacancies;
function saveVacancies(vacancies) {
    return __awaiter(this, void 0, void 0, function* () {
        let lastVacancyId = '';
        const savedVacancies = [];
        try {
            const db = admin.firestore();
            const batch = db.batch();
            const vacanciesCollection = db.collection('posts');
            vacancies.forEach((vacancy) => {
                const docRef = vacanciesCollection.doc();
                batch.create(docRef, Object.assign(Object.assign({}, vacancy), { createdAt: new Date(), source: 'prefeituraLondrina' }));
                console.log('Salvando vaga com o id', vacancy.externalPostId);
                lastVacancyId = vacancy.externalPostId || docRef.id;
                savedVacancies.push(Object.assign(Object.assign({}, vacancy), { postId: docRef.id }));
                batch.update(docRef, { postId: docRef.id });
            });
            yield batch.commit();
            return savedVacancies;
        }
        catch (error) {
            console.log(error);
            console.log('Erro ao salvar o vaga: ', lastVacancyId);
            return [];
        }
    });
}
exports.saveVacancies = saveVacancies;
function deleteRegisteredVacancies(vacancies, registeredExternalVacancies) {
    return __awaiter(this, void 0, void 0, function* () {
        let lastVacancyId = '';
        const removedVacancies = [];
        try {
            const db = admin.firestore();
            const batch = db.batch();
            const vacanciesCollection = db.collection('posts');
            vacancies.forEach((vacancy) => {
                const vacancyId = getPostIdByExternalVacancyId(vacancy, registeredExternalVacancies);
                if (!vacancyId)
                    return;
                lastVacancyId = vacancyId;
                removedVacancies.push(vacancy);
                const docRef = vacanciesCollection.doc(vacancyId);
                console.log('Deletando vaga com o id', vacancy.externalPostId);
                batch.delete(docRef);
            });
            yield batch.commit();
            return removedVacancies;
        }
        catch (error) {
            console.log(error);
            console.log('Erro ao deletar o vaga: ', lastVacancyId);
            return [];
        }
    });
}
exports.deleteRegisteredVacancies = deleteRegisteredVacancies;
function updateRegisteredVacancies(vacancies, registeredExternalVacancies) {
    return __awaiter(this, void 0, void 0, function* () {
        let lastVacancyId = '';
        const removedVacancies = [];
        try {
            const db = admin.firestore();
            const batch = db.batch();
            const vacanciesCollection = db.collection('posts');
            vacancies.forEach((vacancy) => {
                const vacancyId = getPostIdByExternalVacancyId(vacancy, registeredExternalVacancies);
                if (!vacancyId)
                    return;
                lastVacancyId = vacancyId;
                removedVacancies.push(vacancy);
                const docRef = vacanciesCollection.doc(vacancyId);
                // console.log('Atualizando vaga com o id', vacancy.externalPostId)
                batch.update(docRef, Object.assign(Object.assign({}, vacancy), { completed: true, source: 'prefeituraLondrina' }));
            });
            yield batch.commit();
            return removedVacancies;
        }
        catch (error) {
            console.log(error);
            console.log('Erro ao atualizar a vaga: ', lastVacancyId);
            return [];
        }
    });
}
exports.updateRegisteredVacancies = updateRegisteredVacancies;
function getPostIdByExternalVacancyId(vacancy, registeredExternalVacancies) {
    const currentVacancy = registeredExternalVacancies.find((registeredVacancy) => registeredVacancy.externalPostId === vacancy.externalPostId);
    return currentVacancy && (currentVacancy === null || currentVacancy === void 0 ? void 0 : currentVacancy.postId) ? currentVacancy === null || currentVacancy === void 0 ? void 0 : currentVacancy.postId : null;
}
