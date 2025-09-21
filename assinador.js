import fs from "fs";
import { PDFDocument } from "pdf-lib";
import { pdflibAddPlaceholder } from "@signpdf/placeholder-pdf-lib";
import { P12Signer } from "@signpdf/signer-p12";
import { SignPdf } from "@signpdf/signpdf"; 
import dotenv from "dotenv";
dotenv.config();

async function signPDF(input, pfxPath, password, output) {
    try {
        console.log("📄 Carregando PDF...");

        const pdfBuffer = fs.readFileSync(input);
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        
        console.log("📍 Adicionando placeholder...");
        pdflibAddPlaceholder({
            pdfDoc,
            reason: "Assinado digitalmente - Trabalho",
            contactInfo: "email@exemplo.com",
            location: "Brasil",
            name: "Felipe de Carvalho Araújo",
        });

        const pdfWithPlaceholder = await pdfDoc.save();
        
        console.log("🔑 Assinando com certificado...");
        const p12Buffer = fs.readFileSync(pfxPath);
        const signer = new P12Signer(p12Buffer, { passphrase: password });
        
        const signPdf = new SignPdf();
        const signedPdf = await signPdf.sign(pdfWithPlaceholder, signer);

        console.log("💾 Salvando PDF assinado...");
        fs.writeFileSync(output, signedPdf);
        console.log("✅ PDF assinado:", output);

        checkTechnicalSuccess(output);
        
    } catch (error) {
        console.error("❌ Erro ao assinar PDF:", error.message);
    }
}

function checkTechnicalSuccess(outputFile) {
    const pdfBuffer = fs.readFileSync(outputFile);
    const pdfContent = pdfBuffer.toString('latin1');
    
    console.log("🔍 VERIFICAÇÃO TÉCNICA:");
    console.log("✅ Contém assinatura:", pdfContent.includes('/Sig'));
    console.log("✅ Contém ByteRange:", pdfContent.includes('/ByteRange'));
    console.log("✅ Tamanho do arquivo:", pdfBuffer.length, "bytes");
    console.log("📝 Status Adobe: 'Inválido' (NORMAL para certificado autoassinado)");
}

const input = process.env.INPUT_PDF || "documento.pdf";
const output = process.env.OUTPUT_PDF || "documento_assinado.pdf";
const pfxPath = process.env.CERT_PATH;
const password = process.env.CERT_PASSWORD;

if (!pfxPath || !password) {
    console.error("❌ Variáveis de ambiente CERT_PATH e CERT_PASSWORD são obrigatórias");
    process.exit(1);
}

signPDF(input, pfxPath, password, output);
