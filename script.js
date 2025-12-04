// script.js - VERSÃO CORRIGIDA
import { FORMULARIO_COMPLETO } from "./JS/data/formulario.js";

import perguntas from 'perguntas.json' assert { type: 'json' };


window.exportHTML = exportHTML;

document.addEventListener("DOMContentLoaded", () => {
    buildForm(perguntas);
    loadData();
    initSearch();
});


// Renderizar seção completa
function renderSecao(secao) {
    const { meta, schema } = secao;
    const { titulo } = meta;
    const { type, fields } = schema;

    let camposHTML = "";

    if (type === "checklist" || type === "form" || type === "checklist_com_escala") {
        camposHTML = fields.map(renderField).join("");
    }

    return `
        <section class="secao" data-id="${meta.id}">
            <h2>${titulo}</h2>
            <div class="secao-content">
                ${camposHTML}
            </div>
        </section>
    `;
}

// Renderizar formulário completo
function renderFormulario() {
    const secoesOrdenadas = FORMULARIO_COMPLETO.sort((a, b) => a.meta.ordenacao - b.meta.ordenacao);
    app.innerHTML = secoesOrdenadas.map(renderSecao).join("");

    // Adicionar listeners
    addEventListeners();
}

// Adicionar eventos aos campos
function addEventListeners() {
    // Textos, números, datas, textareas
    document.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], textarea, select')
        .forEach(input => {
            input.addEventListener('input', (e) => {
                model[e.target.id] = e.target.value;
                console.log(`Model atualizado: ${e.target.id} = ${e.target.value}`);
            });
        });

    // Radio buttons (sim/não)
    document.querySelectorAll('.radio-group input[type="radio"]')
        .forEach(radio => {
            radio.addEventListener('change', (e) => {
                const name = e.target.name;
                model[name] = e.target.value;
                console.log(`Model atualizado: ${name} = ${e.target.value}`);
            });
        });

    // Sliders (scale)
    document.querySelectorAll('input[type="range"]')
        .forEach(slider => {
            slider.addEventListener('input', (e) => {
                model[e.target.id] = e.target.value;
                // Atualizar display
                const display = e.target.nextElementSibling;
                if (display && display.classList.contains('scale-value')) {
                    display.textContent = e.target.value;
                }
            });
        });
}

// INICIAR
document.addEventListener('DOMContentLoaded', () => {
    renderFormulario();

    // Botão salvar
    document.getElementById('btnSalvar').addEventListener('click', async () => {
        console.log('Modelo para salvar:', model);
        try {
            await salvarPaciente(model);
            alert('Paciente salvo com sucesso!');
        } catch (err) {
            console.error('Erro ao salvar:', err);
            alert('Erro ao salvar paciente.');
        }
    });

    // Botão gerar DOCX (precisa das bibliotecas)
    document.getElementById('btnGerarDoc').addEventListener('click', gerarDoc);
});

// Gerar DOCX (versão simplificada)
async function gerarDoc() {
    if (typeof PizZip === 'undefined' || typeof docxtemplater === 'undefined') {
        alert('Bibliotecas PizZip/docxtemplater não carregadas!');
        return;
    }

    try {
        const response = await fetch("template.docx");
        const content = await response.arrayBuffer();

        const zip = new PizZip(content);
        const doc = new docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

        doc.setData(model);
        doc.render();

        const out = doc.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });

        const nome = model.ident_nome || "Paciente";
        saveAs(out, `Registro_${nome}_${new Date().toISOString().split('T')[0]}.docx`);

        alert("Documento gerado com sucesso!");
    } catch (err) {
        console.error("Erro ao gerar DOCX:", err);
        alert("Falha ao gerar documento. Verifique o console.");
    }
}