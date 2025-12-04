
const root = document.getElementById("formulario");
if (!root) {
    console.error("ERRO: container #formulario não encontrado.");
}

// MODELO DE RESPOSTAS
export const model = {};

// ===============================
// Carregar Perguntas
// ===============================
let perguntas = [];

async function carregarPerguntas() {
    const res = await fetch("./perguntas.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Falhou ao carregar perguntas.json: " + res.status);
    perguntas = await res.json();
}

function el(tag, opts = {}, inner = "") {
    const e = document.createElement(tag);
    if (opts.cls) e.className = opts.cls;
    if (opts.id) e.id = opts.id;
    if (opts.attrs) Object.entries(opts.attrs).forEach(([k, v]) => e.setAttribute(k, v));
    if (inner) e.innerHTML = inner;
    return e;
}

// ===============================
// Renderizadores de campos
// ===============================

function renderText(item) {
    const wrap = el("div", { cls: "campo" });
    wrap.innerHTML = `
        <label for="${item.id}">${item.text}</label>
        <input type="text" id="${item.id}" name="${item.id}">
    `;
    wrap.querySelector("input").addEventListener("input", e => model[item.id] = e.target.value);
    return wrap;
}

function renderNumber(item) {
    const wrap = el("div", { cls: "campo" });
    wrap.innerHTML = `
        <label for="${item.id}">${item.text}</label>
        <input type="number" id="${item.id}" name="${item.id}">
    `;
    wrap.querySelector("input").addEventListener("input", e => model[item.id] = e.target.value);
    return wrap;
}

function renderDate(item) {
    const wrap = el("div", { cls: "campo" });
    wrap.innerHTML = `
        <label for="${item.id}">${item.text}</label>
        <input type="date" id="${item.id}" name="${item.id}">
    `;
    wrap.querySelector("input").addEventListener("input", e => model[item.id] = e.target.value);
    return wrap;
}

function renderTextarea(item) {
    const wrap = el("div", { cls: "campo" });
    wrap.innerHTML = `
        <label for="${item.id}">${item.text}</label>
        <textarea id="${item.id}" name="${item.id}" rows="3"></textarea>
    `;
    wrap.querySelector("textarea").addEventListener("input", e => model[item.id] = e.target.value);
    return wrap;
}

function renderSimNao(item) {
    const wrap = el("div", { cls: "Ask" });
    wrap.innerHTML = `
        <label class="ask-label">${item.text}</label>
        <div class="radio-group">
            <label><input type="radio" name="${item.id}" value="Sim"> Sim</label>
            <label><input type="radio" name="${item.id}" value="Não"> Não</label>
        </div>
        ${item.has_observation ? `<textarea id="${item.id}_obs" placeholder="Observações"></textarea>` : ""}
    `;
    wrap.querySelectorAll(`input[name="${item.id}"]`)
        .forEach(r => r.addEventListener("change", e => model[item.id] = e.target.value));

    if (item.has_observation) {
        wrap.querySelector(`#${item.id}_obs`)
            .addEventListener("input", e => model[item.id + "_obs"] = e.target.value);
    }

    return wrap;
}

function renderRadio(item) {
    const wrap = el("div", { cls: "campo" });
    const opts = item.options.map(opt =>
        `<label><input type="radio" name="${item.id}" value="${opt}"> ${opt}</label>`
    ).join(" ");

    wrap.innerHTML = `<label>${item.text}</label><div>${opts}</div>`;

    wrap.querySelectorAll(`input[name="${item.id}"]`)
        .forEach(r => r.addEventListener("change", e => model[item.id] = e.target.value));

    return wrap;
}

// ===============================
// AGRUPAMENTO EM SEÇÕES (COLLAPSE)
// ===============================
function createSection(titleText) {
    const title = el("div", { cls: "section-title" }, titleText);
    const content = el("div", { cls: "section-content" });

    title.addEventListener("click", () => {
        content.classList.toggle("open");
        title.classList.toggle("active");
    });

    root.appendChild(title);
    root.appendChild(content);
    return content;
}

// ===============================
// Distribuidor de componentes
// ===============================
function renderItem(item, section) {
    switch (item.type) {
        case "text": return section.appendChild(renderText(item));
        case "number": return section.appendChild(renderNumber(item));
        case "date": return section.appendChild(renderDate(item));
        case "textarea": return section.appendChild(renderTextarea(item));
        case "sim_nao": return section.appendChild(renderSimNao(item));
        case "radio": return section.appendChild(renderRadio(item));
        default:
            console.warn("Tipo desconhecido:", item.type);
    }
}

// ===============================
// Renderização Geral
// ===============================
async function renderFormulario() {
    await carregarPerguntas();

    let secAtual = null;

    perguntas.forEach(item => {
        if (item.type === "group") {
            secAtual = createSection(item.text);
            return;
        }
        if (!secAtual) secAtual = createSection("Geral");
        renderItem(item, secAtual);
    });
}

// Iniciar renderização
renderFormulario();

// ===============================
// BOTÃO DE SALVAR (JSON)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnSalvar").addEventListener("click", () => {
        const blob = new Blob([JSON.stringify(model, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "respostas.json";
        a.click();
    });
});
