import '@infra/config/index';

import { Telegraf, Markup } from "telegraf";
const Extra = require("telegraf/extra");
import config from "../config/index";
import SalvarLista from '../../app/service/SalvarLista';
import ConsultarLista from '../../app/service/ConsultarLista';

const bot = new Telegraf(config.token);
const salvar = new SalvarLista();
const carregar = new ConsultarLista();

let dados = {}

const wordSave = "salvar|salva|save";
const wordStart = "oi|oie|ola|olá|hi|hello|iniciar|start"

const patSave = new RegExp(`(\W|^)(${wordSave})(\W|$)`, "gi");
const patStart = new RegExp(`(\W|^)(${wordStart})(\W|$)`, "gi");

enum CHECK {
    SAVE = "save",
    START = "start",
    NONE = "none"
}

const checkWords = (texto: string): string => {
    const save = texto.match(patSave)
    const start = texto.match(patStart)//texto.match(patStart)

    if (save) {

        return CHECK.SAVE;

    } else if (start) {
        return CHECK.START;
    }

    return CHECK.NONE;
}

const gerarBotoes = lista => Extra.markup(
    Markup.inlineKeyboard(
        lista.map(item => Markup.callbackButton(item, `delete ${item}`))
        , { columns: 2 }
    )
)

bot.start(async ctx => {
    const name = ctx.update.message.from.first_name

    await ctx.reply(`Seja bem vindo, ${name}!`)
    await ctx.reply('Este bot foi criado para ajudar a criar, salvar e consultar sua lista de compras.')
    await ctx.reply('A utilização é muito simples: basta digitar o item, que ele vai adicionar automaticamente na sua lista temporária.')
    await ctx.reply('Para marcar um item como comprado e remover da lista temporária basta clicar em cima do item que se encontra em formato de botão.')
    await ctx.reply(`Caso você tenha o desejo de salvar basta digitar uma das seguintes palavras: ${wordSave}`)
    await ctx.reply(`A qualquer momento você pode trazer sua lista que foi salva, usando uma das seguintes palavras: ${wordStart}`)
    await ctx.reply('Lembre-se, para manter sua lista atualizada é necessário salvar antes de realizar uma consulta.')
    await ctx.reply('Espero que ajude, boas compras.....')
})

bot.command('iniciar', async ctx => {
    const chatId = ctx.chat.id
    await ctx.reply(`Carregando lista....`)

    const lista = await carregar.execute(chatId.toString());

    dados[chatId] = []
    ctx.itens = dados[chatId]
    lista.itens.map(i => {
        ctx.itens.push(i)
    })

    if (lista.itens.length !== 0) {
        ctx.reply('Lista Carregada, boas compras', gerarBotoes(ctx.itens))
    } else {
        ctx.reply('Sua lista se encontra vazia escreva os itens que você deseja adicionar...')
    }
})

bot.command('salvar', async ctx => {

    const chatId = ctx.chat.id
    await ctx.reply(`Salvando lista....`)
    const lista: string = dados[chatId];
    salvar.execute({ chat_id: chatId.toString(), lista })
    await ctx.reply('Lista salva, caso deseje começar suas compras utilize o comando /iniciar')

})

bot.use((ctx, next) => {
    const chatId = ctx.chat.id
    if (!dados.hasOwnProperty(chatId)) dados[chatId] = []
    ctx.itens = dados[chatId]
    next()
})



bot.on('text', async ctx => {
    let texto = ctx.update.message.text
    texto = texto?.toLowerCase()

    switch (checkWords(texto)) {
        case CHECK.SAVE: {
            const chatId = ctx.chat.id
            await ctx.reply(`Salvando lista....`)
            const lista: string = dados[chatId];
            salvar.execute({ chat_id: chatId.toString(), lista })
            await ctx.reply(`Lista salva, para visualizar a lsita salva utilize as seguintes as palavras ${wordStart} ou clicar no: /iniciar`)


            break;
        }
        case CHECK.START: {
            const chatId = ctx.chat.id
            await ctx.reply(`Carregando lista....`)

            const lista = await carregar.execute(chatId.toString());

            dados[chatId] = []
            ctx.itens = dados[chatId]
            lista.itens.map(i => {
                ctx.itens.push(i)
            })

            if (lista.itens.length !== 0) {
                ctx.reply('Lista Carregada, boas compras', gerarBotoes(ctx.itens))
            } else {
                ctx.reply('Sua lista se encontra vazia escreva os itens que você deseja adicionar...')
            }

            break;
        }
        default: {

            if (texto.startsWith('/')) texto = texto.substring(1)
            let itens: Array<String> = []

            if (texto?.search("\n")) {
                itens = texto.split("\n");
            }

            if (itens.length !== 0) {
                itens.map(i => {
                    ctx.itens.push(i)
                })
            } else {
                ctx.itens.push(texto)
            }

            // ctx.itens.push(texto)
            ctx.reply(`Item(ns) inserido(s)!`, gerarBotoes(ctx.itens))
        }
    }

})

bot.action(/delete (.+)/, ctx => {
    const indice = ctx.itens.indexOf(ctx.match[1])
    if (indice >= 0) ctx.itens.splice(indice, 1)
    ctx.reply(`${ctx.match[1]} deletado!`, gerarBotoes(ctx.itens))
})




bot.startPolling()


