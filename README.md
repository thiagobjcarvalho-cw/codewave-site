# Code Wave Landing Page

Landing page estatica da Code Wave para apresentar servicos digitais, pacotes comerciais, demonstracoes visuais, projetos e canais de contato.

Projeto 100% estatico (HTML + CSS + JS), sem framework, bundler ou dependencias de build.

## Estrutura de arquivos

```
/
├── index.html              # Estrutura da pagina, SEO, secoes, formulario
├── style.css               # Estilos organizados por secao
├── script.js               # Comportamento (menu, scroll, portfolio)
├── robots.txt              # Regras de indexacao
├── sitemap.xml             # Mapa inicial do site
├── assets/
│   ├── brand/              # Logos e marca da Code Wave
│   │   ├── codewave-logo.png      # Logo completa (simbolo + nome) — header/hero
│   │   ├── codewave-wordmark.png  # Wordmark horizontal — footer
│   │   └── codewave-icon.png      # Icone/simbolo — favicon, apple-touch-icon
│   ├── *_unused/           # Assets nao referenciados (candidatos a remocao)
│   ├── portfolio/          # Screenshots dos projetos
│   ├── showcase-*.png/webp # Imagens de showcases (dashboards, mobile, automacao)
│   └── logo-tech.*         # Logos antigas (ainda referenciadas? verificar)
└── README.md
```

## Logos e marca

| Uso | Arquivo |
|---|---|
| Header (logo completa) | `assets/brand/codewave-logo.png` |
| Footer (wordmark) | `assets/brand/codewave-wordmark.png` |
| Favicon / Apple Touch | `assets/brand/codewave-icon.png` |
| Icone compacto | `assets/brand/codewave-icon.png` |

## Onde alterar dados de contato

- **WhatsApp**: substituir `5561982859870` em todos os links `wa.me/55...` no `index.html` (hero, header, pacotes, CTA, contato, botao flutuante)
- **E-mail**: alterar `thiago.b.j.carvalho@gmail.com` no `index.html` (link mailto e action do FormSubmit)
- **FormSubmit**: a action do formulario ja aponta para `https://formsubmit.co/thiago.b.j.carvalho@gmail.com` — manter este e-mail

## Como rodar localmente

```bash
# Opcao 1 — abrir direto no navegador
open index.html

# Opcao 2 — servidor local (Python)
python3 -m http.server 4173
# Depois abrir http://localhost:4173
```

## Checklist rapido de publicacao

- [ ] WhatsApp correto em todos os links (`5561982859870`)
- [ ] E-mail correto no mailto e no FormSubmit
- [ ] Testar menu mobile e desktop
- [ ] Testar links internos das secoes
- [ ] Testar botoes de WhatsApp
- [ ] Enviar um teste pelo formulario
- [ ] Conferir title, meta description, OG e Twitter Card
- [ ] Ajustar URL final no `sitemap.xml` e `robots.txt` se dominio for diferente de `codewave.com.br`
- [ ] Ativar captcha no FormSubmit (remover `_captcha=false`)
- [ ] Otimizar imagens PNG (alvo <300 KB cada)
- [ ] Excluir `assets/_unused/` do deploy
- [ ] Testar PageSpeed Insights
- [ ] Verificar responsividade em dispositivos reais

## Deploy

Projeto estatico. Publicar a raiz do projeto em qualquer servidor que sirva arquivos estaticos.

### Vercel / Netlify / GitHub Pages

1. Conectar repositorio ou fazer upload da pasta
2. Sem comando de build
3. Pasta de publicacao: raiz do projeto

## Pendencias reais

- Gerar versoes `.webp` e multiplos tamanhos de favicon (16, 32, 48, 180, 192, 512) — pendente por ausencia de `cwebp`/`magick` no ambiente
- Ativar protecao contra spam no formulario (captcha ou servico equivalente)
- Confirmar dominio final para `sitemap.xml`, `robots.txt` e metadados OG
- Substituir imagens showcase conceituais por screenshots reais dos projetos
