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

const gerarBotoes = lista => Extra.markup(
    Markup.inlineKeyboard(
        lista.map(item => Markup.callbackButton(item, `delete ${item}`))
        , { columns: 2 }
    )
)

bot.start(async ctx => {
    const name = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo, ${name}!`)
    await ctx.reply('Escreva os itens que você deseja adicionar...')
})

bot.command('iniciar', async ctx => {
    const chatId = ctx.chat.id
    await ctx.reply(`Carregando lista....`)

    const lista = await carregar.execute(chatId.toString());

    //if (!dados.hasOwnProperty(chatId)) 
    dados[chatId] = []
    ctx.itens = dados[chatId]
    await lista.itens.map(i => {
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


bot.on('text', ctx => {
    let texto = ctx.update.message.text
    if (texto.startsWith('/')) texto = texto.substring(1)
    ctx.itens.push(texto)
    ctx.reply(`${texto} adicionado!`, gerarBotoes(ctx.itens))
    console.log(dados)
})

bot.action(/delete (.+)/, ctx => {
    const indice = ctx.itens.indexOf(ctx.match[1])
    if (indice >= 0) ctx.itens.splice(indice, 1)
    ctx.reply(`${ctx.match[1]} deletado!`, gerarBotoes(ctx.itens))
})




bot.startPolling()


