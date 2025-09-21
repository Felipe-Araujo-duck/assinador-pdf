# 📄 PDF Signer

Um projeto Node.js para assinar documentos PDF digitalmente usando certificados PFX/P12.

## ✨ Funcionalidades

- ✅ Assinatura digital de documentos PDF
- ✅ Suporte a certificados PFX/P12
- ✅ Adição automática de placeholder para assinatura
- ✅ Configuração de metadados (motivo, local, contato)
- ✅ Verificação técnica da assinatura
- ✅ Interface de linha de comando simples

## 🛠️ Pré-requisitos

- Node.js versão 22 ou superior
- Certificado digital no formato PFX/P12

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/Felipe-Araujo-duck/assinador-pdf.git

# Instale as dependências
npm install
```

## 🔧 Configuração
Coloque seu certificado PFX na raiz do projeto com o nome certificado.pfx

Coloque o PDF a ser assinado com o nome teste.pdf

Configure a senha do certificado no arquivo assinador.js

## 🚀 Como usar
Configuração básica
Edite as variáveis no final do arquivo assinador.js:

javascript
```bash
const input = "teste.pdf";          // Arquivo de entrada
const output = "teste_assinado.pdf"; // Arquivo de saída
const pfxPath = "certificado.pfx";   // Caminho do certificado
const password = "sua_senha_aqui";   // Senha do certificado
```

Execução
```bash
node assinador.js
```

## 📋 Estrutura do projeto
```text
pdf-signer/
├── assinador.js          # Arquivo principal
├── teste.pdf         # PDF de entrada (a ser criado)
├── certificado.pfx   # Certificado digital (a ser adicionado)
├── package.json      # Dependências do projeto
└── README.md         # Este arquivo
```

## 📚 Dependências
pdf-lib - Manipulação de PDFs

```bash
@signpdf/placeholder-pdf-lib - Adição de placeholders para assinatura

@signpdf/signer-p12 - Assinatura com certificados P12

@signpdf/signpdf - Biblioteca principal de assinatura
```

## 🔍 Verificação técnica
O projeto inclui uma função de verificação que verifica:

✅ Presença da assinatura no PDF

✅ Existência do campo ByteRange

✅ Tamanho do arquivo resultante

✅ Status da validação (esperado como "inválido" para certificados autoassinados)

⚠️ Notas importantes
Certificados autoassinados mostrarão status "inválido" no Adobe Reader - isso é esperado

Certifique-se de que o certificado e o PDF existam nos caminhos especificados

A senha do certificado deve ser configurada corretamente 

Crie o seu proprio certificado

## 🐛 Solução de problemas
Erro de certificado
Verifique se o caminho do certificado e a senha estão corretos

PDF não encontrado
Certifique-se de que o arquivo PDF existe no local especificado

Problemas de permissão
Verifique as permissões de leitura/escrita dos arquivos

## 📄 Licença
Este projeto é de uso livre para fins educacionais e comerciais.

## 👨‍💻 Autor
Felipe de Carvalho Araújo