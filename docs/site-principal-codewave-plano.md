# Plano de Evolucao do Site Principal da Code Wave

## Diagnostico

O site atual ja tem uma base visual forte, boa organizacao de secoes e assets reais de projetos. O principal ponto de melhoria esta na estrategia de conversao: a primeira dobra ainda vende "tecnologia" de forma ampla, enquanto o site principal da empresa precisa vender a Code Wave como parceira confiavel, premium e capaz de entregar sites, sistemas e automacoes com impacto comercial.

## Estrategia

Posicionamento escolhido: vitrine premium orientada a leads.

A pagina deve provar rapidamente tres coisas:

- A Code Wave cria experiencias digitais profissionais.
- Existem projetos reais e variados por tras da promessa.
- O visitante tem um caminho claro para pedir diagnostico ou orcamento.

## Prioridades de implementacao

1. Reforcar o hero com marca maior, headline mais direta, CTA primario e mosaico de projetos reais.
2. Trocar parte da comunicacao generica por narrativa comercial: dor, solucao, prova, processo e contato.
3. Reestruturar projetos como cases com problema, solucao, stack e beneficio.
4. Adicionar uma secao objetiva sobre o que a empresa constroi: landing pages, sistemas, dashboards, apps, automacoes/IA e e-commerce.
5. Melhorar SEO tecnico com canonical, metadados revisados e JSON-LD de Organization.
6. Instrumentar conversoes com eventos para WhatsApp, formulario, selecao de projeto e pacotes, sem depender de biblioteca nova.
7. Manter o projeto 100% estatico, sem framework, bundler ou dependencia de build.

## Checklist de aceite

- Hero comunica Code Wave como marca principal e mostra projetos reais na primeira dobra.
- CTA principal leva para WhatsApp com contexto de orcamento.
- Projetos deixam claro tipo, stack e beneficio de cada entrega.
- Secoes seguem uma jornada comercial coerente: promessa, prova, solucoes, pacotes, processo, FAQ e contato.
- SEO basico contem title, description, Open Graph, canonical e Organization JSON-LD.
- Eventos de conversao sao disparados quando `gtag` estiver presente.
- Site continua abrindo como HTML estatico.
- Validacao local cobre console, menu, ancoras, formulario e responsividade.

## Referencias

- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- web.dev Core Web Vitals: https://web.dev/articles/vitals
- GA4 Recommended Events: https://support.google.com/analytics/answer/9267735
- Google Organization Structured Data: https://developers.google.com/search/docs/appearance/structured-data/organization
