// db.js — Sistema de armazenamento local usando IndexedDB

const DB_NAME = "form_psicologia";
const STORE_NAME = "pacientes";
const VERSION = 1;

export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, VERSION);

        request.onerror = () => reject("Erro ao abrir IndexedDB");

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = () => resolve(request.result);
    });
}

export async function salvarPaciente(data) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).add(data);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject("Erro ao salvar");
    });
}

export async function listarPacientes() {
    const db = await openDB();
    return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();

        req.onsuccess = () => resolve(req.result);
    });
}

export async function atualizarPaciente(id, data) {
    const db = await openDB();
    data.id = id;
    return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).put(data);
        tx.oncomplete = () => resolve(true);
    });
}

export async function deletarPaciente(id) {
    const db = await openDB();
    return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).delete(id);
        tx.oncomplete = () => resolve(true);
    });
}
