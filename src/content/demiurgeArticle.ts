import type { Lang } from './types';

export type ArticleBlock = {
  type: 'paragraph' | 'subheading' | 'quote' | 'inline-flow';
  text: string;
};

interface ArticleSectionCopy {
  title: string;
  blocks: ArticleBlock[];
}

export interface DemiurgeArticleCopy {
  back: string;
  eyebrow: string;
  title: string;
  deck: string;
  tocLabel: string;
  toc: Array<{ href: string; label: string }>;
  opening: string[];
  coverCaption: string;
  world: ArticleSectionCopy;
  worldFigureTitle: string;
  worldFigureCaption: string;
  chat: ArticleSectionCopy;
  processFigureTitle: string;
  processFigureCaption: string;
  processChat: string;
  processDemiurge: string;
  processChatNodes: string[];
  processDemiurgeNodes: string[];
  rag: ArticleSectionCopy;
  ragFigureTitle: string;
  ragFigureCaption: string;
  hypothesis: ArticleSectionCopy;
  reviewFigureTitle: string;
  reviewFigureCaption: string;
  goal: ArticleSectionCopy;
  nextLabel: string;
  nextTitle: string;
}

const paragraph = (text: string): ArticleBlock => ({
  type: 'paragraph',
  text,
});
const subheading = (text: string): ArticleBlock => ({
  type: 'subheading',
  text,
});
const quote = (text: string): ArticleBlock => ({ type: 'quote', text });
const inlineFlow = (text: string): ArticleBlock => ({
  type: 'inline-flow',
  text,
});

export const demiurgeArticleCopy: Record<Lang, DemiurgeArticleCopy> = {
  ru: {
    back: 'Все заметки',
    eyebrow: 'Инженерные заметки · Demiurge Assistant',
    title:
      'Почему обычного ИИ-чата оказалось недостаточно для моего вымышленного мира',
    deck: 'Я веду настольную ролевую игру в полностью самописном мире Эон.',
    tocLabel: 'В этой статье',
    toc: [
      { href: '#world', label: 'Мир, который перестал помещаться в голове' },
      { href: '#chat', label: 'Где обычный ИИ-чат начал мешать' },
      { href: '#rag', label: 'Почему одного RAG тоже недостаточно' },
      { href: '#hypothesis', label: 'Основная гипотеза' },
      { href: '#goal', label: 'К чему я хочу прийти' },
    ],
    opening: [
      'Это не готовый сеттинг, для которого уже существуют энциклопедии, карты и официальные справочники. Историю, географию, фракции, персонажей и правила мира мне приходится создавать самому. Более того, мир не остаётся неизменным: после каждой игровой сессии в нём появляются новые события, связи и последствия решений игроков.',
      'В какой-то момент стало понятно, что одной основной сюжетной линии недостаточно. Перед каждой игрой нужны десятки деталей: случайные встречи, необычные торговцы, мутанты, предметы, модификации оружия, небольшие задания и ответы на вопросы, которые невозможно предсказать заранее.',
      'Нейросети хорошо помогают придумывать такой контент. Можно за несколько минут получить описание поселения, идею противника или список событий для путешествия.',
      'Но чем дольше я работал с Эоном через обычные чаты, тем яснее становилось: генерация текста сама по себе не решает мою задачу.',
      'Модель не знает мир так, как знаю его я. Она постепенно теряет контекст, повторяет уже использованные идеи и иногда добавляет детали, которые противоречат существующему лору.',
      'Так появился Demiurge Assistant — проект, в котором ИИ должен не просто отвечать на вопросы, а работать с управляемой базой знаний о мире.',
    ],
    coverCaption:
      'Эон постепенно вырос из набора заметок в мир, где персонажи, события и правила связаны друг с другом.',
    world: {
      title: 'Мир, который перестал помещаться в голове',
      blocks: [
        paragraph(
          'Эон начинался как мир для одной кампании. Постепенно вокруг первоначального сюжета появились новые места, культы, фракции, мутанты и персонажи.',
        ),
        paragraph(
          'Во время игры происходили события, которых я не планировал. Игроки заключали неожиданные союзы, вступали в конфликты, игнорировали подготовленные сюжетные линии и отправлялись туда, куда я вообще не ожидал их вести.',
        ),
        paragraph('После каждой сессии мир немного менялся.'),
        paragraph(
          'Нужно было помнить, кто с кем знаком, какие персонажи изменили свои цели, какие события уже произошли и какую информацию успели получить игроки. При этом часть сведений должна была оставаться только у мастера: скрытые мотивы персонажей, тайные связи, будущие события и настоящие свойства некоторых предметов.',
        ),
        paragraph('Одновременно Эон нужно было продолжать наполнять.'),
        paragraph(
          'Допустим, для следующей игры мне нужен торговец, которого группа встретит в разрушенном городе. Самого персонажа придумать не так сложно. Гораздо труднее встроить его в существующий мир.',
        ),
        paragraph(
          'Почему он находится именно здесь? С какой фракцией он связан? Что он знает о последних событиях? Соответствуют ли его товары технологическому уровню мира? Не создавал ли я раньше похожего персонажа под другим именем?',
        ),
        paragraph(
          'В этот момент творческая задача постепенно превращается в работу с информацией.',
        ),
        paragraph(
          'Проблема была не в недостатке идей. Мне становилось всё сложнее одновременно создавать новый контент и удерживать в голове связи между уже существующими элементами мира.',
        ),
        paragraph(
          'Поэтому мне понадобился ассистент, которому не нужно перед каждым разговором заново объяснять, что такое Эон и по каким правилам он существует.',
        ),
      ],
    },
    worldFigureTitle: 'Из чего состоит Эон',
    worldFigureCaption:
      'Мир состоит не только из заметок. Персонажи, локации, события и правила влияют друг на друга, поэтому их трудно поддерживать отдельно.',
    chat: {
      title: 'Где обычный ИИ-чат начал мешать',
      blocks: [
        paragraph(
          'Сначала я работал с миром через обычные диалоги с нейросетями.',
        ),
        paragraph(
          'Для разовых запросов этого было достаточно. Модель могла быстро придумать несколько случайных встреч, описать поселение, создать необычного мутанта или предложить способности для противника.',
        ),
        paragraph(
          'Проблемы начинались, когда я хотел продолжить работу через несколько дней или использовать результат в другой части кампании.',
        ),
        subheading('Каждый разговор приходилось начинать с объяснений'),
        paragraph(
          'Чтобы получить ответ, подходящий именно для Эона, мне снова приходилось рассказывать, как устроен мир, какие фракции в нём существуют, какие технологии доступны и что уже произошло в кампании.',
        ),
        paragraph(
          'Чем сложнее становился вопрос, тем длиннее получался вводный контекст.',
        ),
        paragraph(
          'В какой-то момент я заметил, что трачу больше времени на объяснение мира, чем на обсуждение самой идеи.',
        ),
        paragraph(
          'Можно создать отдельный чат для кампании, написать длинный системный промпт или загрузить в него документы. Это улучшает результат, но не решает проблему полностью.',
        ),
        paragraph(
          'Модель всё равно может изменить ранее установленный факт, перепутать роли персонажей или предложить уже существующую идею под новым названием. Она также может добавить технологию, которая не соответствует правилам мира, или случайно использовать в ответе информацию, предназначенную только для мастера.',
        ),
        paragraph(
          'Чем больше становился Эон, тем труднее было замечать такие ошибки.',
        ),
        subheading('Факты и выдумки выглядели одинаково'),
        paragraph('Обычный чат возвращает единый текст.'),
        paragraph(
          'В одном ответе могут смешиваться подтверждённые сведения о мире, интерпретации модели, новые идеи и случайные художественные детали. Иногда нейросеть предлагает изменить уже существующего персонажа, но никак не отделяет это предложение от фактов, которые получила во входном контексте.',
        ),
        paragraph('Для человека граница между ними не всегда очевидна.'),
        paragraph(
          'Если просто перенести весь ответ в wiki, случайно придуманная деталь может незаметно стать частью канона. Через несколько месяцев уже сложно вспомнить, было ли это первоначальным правилом мира или удачной импровизацией модели.',
        ),
        subheading('Хороший результат оставался внутри чата'),
        paragraph(
          'Даже когда нейросеть создавала интересного персонажа, работа на этом не заканчивалась.',
        ),
        paragraph(
          'Его имя, описание, связи и участие в событиях всё равно приходилось вручную переносить в разные части базы знаний: в карточку NPC, хронологию, список фракций и заметки мастера.',
        ),
        paragraph(
          'Получался странный эффект. ИИ ускорял создание черновика, но одновременно создавал новую работу по организации результата.',
        ),
      ],
    },
    processFigureTitle: 'Чат и управляемый процесс',
    processFigureCaption:
      'В обычном чате результат остаётся сообщением. В Demiurge полезные части ответа могут стать проверяемыми изменениями базы знаний.',
    processChat: 'Обычный чат',
    processDemiurge: 'Demiurge Assistant',
    processChatNodes: ['Промпт', 'Ответ', 'История чата'],
    processDemiurgeNodes: [
      'База мира',
      'Поиск контекста',
      'LLM',
      'Предложение',
      'Проверка',
      'Обновление мира',
    ],
    rag: {
      title: 'Почему одного RAG тоже недостаточно',
      blocks: [
        paragraph(
          'Самый очевидный способ дать модели знания о мире — использовать RAG.',
        ),
        paragraph(
          'В упрощённом виде система находит подходящие фрагменты документов, добавляет их в контекст и передаёт модели вместе с вопросом:',
        ),
        inlineFlow('Документы → поиск фрагментов → контекст → ответ'),
        paragraph(
          'Это полезный подход. Он позволяет не помещать всю базу знаний в каждый запрос и выбирать только те материалы, которые относятся к текущему вопросу.',
        ),
        paragraph(
          'Но при каждом новом запросе модель всё равно заново собирает представление о мире из найденных фрагментов.',
        ),
        paragraph(
          'У Андрея Карпати есть близкая идея, которую он называет LLM-Wiki. Вместо того чтобы каждый раз восстанавливать знания непосредственно из исходных документов, модель постепенно создаёт и поддерживает отдельную связанную wiki.',
        ),
        paragraph(
          'Новые источники в таком подходе не просто индексируются. LLM извлекает из них факты, обновляет существующие страницы, создаёт новые ссылки и отмечает возможные противоречия.',
        ),
        paragraph(
          'В результате между исходными материалами и пользователем появляется постоянный слой знаний, который развивается вместе с проектом.',
        ),
        paragraph(
          'Эта идея очень близка к тому, что я хочу получить в Demiurge Assistant. Важные сведения не должны исчезать в истории чата. Они должны накапливаться, связываться друг с другом и оставаться доступными для следующих запросов.',
        ),
        paragraph(
          'Но у ролевого мира есть особенность, которая немного меняет задачу.',
        ),
        subheading(
          'LLM-Wiki работает с источниками. Demiurge — с состоянием мира',
        ),
        paragraph(
          'В типичном сценарии LLM-Wiki у пользователя уже есть материалы: статьи, книги, документы или заметки. Модель читает их и превращает в связанную базу знаний.',
        ),
        paragraph(
          'Главная задача состоит в том, чтобы поддерживать эту базу в актуальном состоянии.',
        ),
        paragraph(
          'В ролевой кампании информация не всегда существует заранее.',
        ),
        paragraph(
          'Новый персонаж может появиться прямо во время разговора с моделью. Город может перейти под контроль другой фракции после игровой сессии. Предмет может получить нового владельца, а секрет, который раньше был известен только мастеру, может стать доступен игрокам.',
        ),
        paragraph(
          'Это уже не просто дополнение текста. Меняется состояние мира.',
        ),
        paragraph(
          'Поэтому для Demiurge недостаточно автоматически обновляемых Markdown-страниц. Система должна понимать, что в мире существуют отдельные сущности, направленные связи, правила, события и уровни доступа.',
        ),
        paragraph('Но главное различие связано не с форматом хранения.'),
        paragraph('Оно связано с правом на запись.'),
        paragraph(
          'В LLM-Wiki модель выполняет значительную часть работы по обновлению wiki. В Demiurge сгенерированные сведения сначала становятся предложением.',
        ),
        paragraph(
          'Мастер может принять их, отредактировать, сохранить только часть или полностью отклонить. До проверки новая информация не считается подтверждённой частью мира.',
        ),
        paragraph(
          'Поэтому я не воспринимаю Demiurge как противоположность LLM-Wiki. Скорее, это более предметная и осторожная интерпретация похожей идеи.',
        ),
        paragraph('LLM-Wiki отвечает на вопрос:'),
        quote(
          'Как превратить набор источников в постоянно развивающуюся базу знаний?',
        ),
        paragraph('Demiurge добавляет к нему ещё один:'),
        quote(
          'Как позволить ИИ участвовать в развитии изменяемого мира, не отдавая ему контроль над каноном?',
        ),
      ],
    },
    ragFigureTitle: 'RAG, LLM-Wiki и Demiurge Assistant',
    ragFigureCaption:
      'RAG извлекает информацию по запросу. LLM-Wiki накапливает знания в постоянной wiki. Demiurge дополнительно учитывает изменяемое состояние мира и не применяет изменения без проверки мастером.',
    hypothesis: {
      title: 'Основная гипотеза Demiurge Assistant',
      blocks: [
        paragraph('В основе проекта лежит достаточно простая идея.'),
        paragraph(
          'Для длительной работы со сложным вымышленным миром нужен не просто чат с большим контекстом. Нужна система управления знаниями, в которой LLM помогает создавать и связывать данные, но не становится источником истины.',
        ),
        paragraph('Обычный чат в первую очередь генерирует текст.'),
        paragraph(
          'Demiurge должен работать с моделью мира: персонажами, локациями, правилами, событиями, отношениями и разделением информации на публичную и секретную.',
        ),
        paragraph(
          'При этом модель не обязана сразу выдавать идеальный результат.',
        ),
        paragraph(
          'Она может создать черновик, предложить связь между персонажами или заметить возможное противоречие. Но окончательное решение о том, что действительно существует в Эоне, остаётся за человеком.',
        ),
        paragraph(
          'Я хочу превратить генерацию из одноразового ответа в последовательный процесс.',
        ),
        paragraph(
          'Сначала система находит подходящий контекст. Затем модель создаёт черновик. Полезные части ответа извлекаются в структурированном виде и показываются мастеру как предложение. Только после проверки подтверждённые изменения попадают в базу мира и становятся доступными для будущих запросов.',
        ),
        paragraph('Это не попытка сделать ещё один интерфейс поверх LLM.'),
        paragraph(
          'Цель в том, чтобы результат разговора не исчезал в истории сообщений, но при этом модель не могла незаметно переписать мир.',
        ),
      ],
    },
    reviewFigureTitle: 'Проверка изменений',
    reviewFigureCaption:
      'Сгенерированные сведения сначала становятся предложением. Частью мира становится только то, что подтвердил мастер.',
    goal: {
      title: 'К чему я хочу прийти',
      blocks: [
        paragraph('В идеальном сценарии я хочу написать ассистенту:'),
        quote(
          'Создай торговца для этой локации. Не повторяй существующих NPC, учитывай местные фракции, доступные технологии и последние события кампании.',
        ),
        paragraph('И получить не просто красивый абзац.'),
        paragraph(
          'Система должна предложить полноценного персонажа, его мотивацию, товары, связи, секрет и сюжетный крючок. Если в результате появилась новая информация о мире, она должна быть отдельно показана мастеру и сохранена только после подтверждения.',
        ),
        paragraph(
          'При следующем запросе ассистент уже должен помнить этого персонажа и учитывать его существование.',
        ),
        paragraph('Пока Demiurge Assistant остаётся экспериментом.'),
        paragraph(
          'Сейчас стабильно работают генерация черновиков, заполнение сущностей и создание связей. Помимо меня, проектом пользовался только один человек, поэтому говорить о проверенном продукте для широкой аудитории пока рано.',
        ),
        paragraph('Но основную гипотезу уже можно проверять на практике:'),
        quote(
          'Может ли LLM стать не просто генератором идей, а полезным соавтором, который знает мир и при этом не получает права незаметно его переписывать?',
        ),
        paragraph(
          'Именно на этот вопрос я пытаюсь ответить, развивая Demiurge Assistant.',
        ),
      ],
    },
    nextLabel: 'Следующая статья:',
    nextTitle:
      'как ответ модели превращается в сущности, связи и проверяемые предложения.',
  },
  en: {
    back: 'All notes',
    eyebrow: 'Engineering notes · Demiurge Assistant',
    title: 'Why a Regular AI Chat Was Not Enough for My Fictional World',
    deck: 'I run a tabletop role-playing game set in Eon, a world I created entirely from scratch.',
    tocLabel: 'In this article',
    toc: [
      { href: '#world', label: 'The world that no longer fit in my head' },
      {
        href: '#chat',
        label: 'Where a regular AI chat started getting in the way',
      },
      { href: '#rag', label: 'Why RAG alone was not enough either' },
      { href: '#hypothesis', label: 'The core hypothesis' },
      { href: '#goal', label: 'What I want to build toward' },
    ],
    opening: [
      'This is not an established setting with existing encyclopedias, maps, and official reference books. I have to create its history, geography, factions, characters, and rules myself. The world also never stays unchanged: after every game session, new events, relationships, and consequences of the players’ decisions appear.',
      'At some point, it became clear that one main storyline was not enough. Every game requires dozens of details: random encounters, unusual merchants, mutants, items, weapon modifications, small quests, and answers to questions that are impossible to predict in advance.',
      'Neural networks are good at helping create this kind of content. In a few minutes, they can produce a settlement description, an enemy concept, or a list of travel events.',
      'But the longer I worked on Eon through regular chats, the clearer it became: generating text alone did not solve my problem.',
      'The model does not know the world the way I do. It gradually loses context, repeats ideas I have already used, and sometimes introduces details that contradict the existing lore.',
      'That is how Demiurge Assistant emerged—a project where AI should not simply answer questions, but work with a controlled knowledge base about the world.',
    ],
    coverCaption:
      'Eon gradually grew from a collection of notes into a world where characters, events, and rules are connected to one another.',
    world: {
      title: 'The world that no longer fit in my head',
      blocks: [
        paragraph(
          'Eon began as a world for a single campaign. Over time, new places, cults, factions, mutants, and characters appeared around the original story.',
        ),
        paragraph(
          'Things happened during the game that I had never planned. The players formed unexpected alliances, entered conflicts, ignored prepared storylines, and traveled to places I had never expected to take them.',
        ),
        paragraph('After every session, the world changed a little.'),
        paragraph(
          'I had to remember who knew whom, which characters had changed their goals, which events had already happened, and what information the players had learned. At the same time, some information had to remain available only to the game master: hidden motives, secret relationships, future events, and the true properties of certain items.',
        ),
        paragraph('Meanwhile, Eon still needed to be expanded.'),
        paragraph(
          'Suppose I need a merchant whom the group will meet in a ruined city during the next game. Inventing the character is not particularly difficult. Fitting them into the existing world is much harder.',
        ),
        paragraph(
          'Why are they here? Which faction are they connected to? What do they know about recent events? Do their goods match the world’s technological level? Have I already created a similar character under a different name?',
        ),
        paragraph(
          'At this point, a creative task gradually turns into information work.',
        ),
        paragraph(
          'The problem was not a lack of ideas. It was becoming increasingly difficult to create new content while keeping the relationships between existing parts of the world in my head.',
        ),
        paragraph(
          'I therefore needed an assistant that would not require me to explain what Eon is and which rules govern it before every conversation.',
        ),
      ],
    },
    worldFigureTitle: 'What Eon Is Made Of',
    worldFigureCaption:
      'A world is more than a collection of notes. Characters, locations, events, and rules affect one another, which makes them difficult to maintain separately.',
    chat: {
      title: 'Where a regular AI chat started getting in the way',
      blocks: [
        paragraph(
          'At first, I worked on the world through regular conversations with neural networks.',
        ),
        paragraph(
          'That was enough for one-off requests. The model could quickly invent several random encounters, describe a settlement, create an unusual mutant, or suggest abilities for an enemy.',
        ),
        paragraph(
          'Problems began when I wanted to continue the work a few days later or use the result in another part of the campaign.',
        ),
        subheading('Every conversation had to begin with an explanation'),
        paragraph(
          'To get an answer that actually fit Eon, I had to explain the structure of the world again: which factions existed, which technologies were available, and what had already happened in the campaign.',
        ),
        paragraph(
          'The more complex the question became, the longer the introductory context grew.',
        ),
        paragraph(
          'At some point, I noticed that I was spending more time explaining the world than discussing the idea itself.',
        ),
        paragraph(
          'You can create a dedicated campaign chat, write a long system prompt, or upload documents. This improves the result, but it does not solve the problem completely.',
        ),
        paragraph(
          'The model can still change an established fact, confuse character roles, or suggest an existing idea under a new name. It can also introduce technology that does not fit the rules of the world or accidentally use information intended only for the game master.',
        ),
        paragraph(
          'The larger Eon became, the harder these mistakes were to notice.',
        ),
        subheading('Facts and inventions looked the same'),
        paragraph('A regular chat returns a single piece of text.'),
        paragraph(
          'One response can mix confirmed facts about the world, the model’s interpretations, new ideas, and incidental narrative details. Sometimes the neural network suggests changing an existing character but does not separate that suggestion from the facts it received in the input context.',
        ),
        paragraph(
          'For a human reader, the boundary between them is not always obvious.',
        ),
        paragraph(
          'If the entire answer is simply copied into a wiki, an invented detail can quietly become part of the canon. A few months later, it may be difficult to remember whether it was an original rule of the world or a successful improvisation by the model.',
        ),
        subheading('A good result remained trapped inside the chat'),
        paragraph(
          'Even when the neural network created an interesting character, the work did not end there.',
        ),
        paragraph(
          'Their name, description, relationships, and involvement in events still had to be transferred manually into different parts of the knowledge base: the NPC card, timeline, faction list, and game master notes.',
        ),
        paragraph(
          'This created a strange effect. AI accelerated the creation of a draft while simultaneously creating more work to organize the result.',
        ),
      ],
    },
    processFigureTitle: 'Chat and a Controlled Process',
    processFigureCaption:
      'In a regular chat, the result remains a message. In Demiurge, useful parts of the answer can become reviewable changes to the knowledge base.',
    processChat: 'Regular chat',
    processDemiurge: 'Demiurge Assistant',
    processChatNodes: ['Prompt', 'Response', 'Chat history'],
    processDemiurgeNodes: [
      'World database',
      'Context retrieval',
      'LLM',
      'Proposal',
      'Review',
      'World update',
    ],
    rag: {
      title: 'Why RAG alone was not enough either',
      blocks: [
        paragraph(
          'The most obvious way to give a model knowledge about the world is to use RAG.',
        ),
        paragraph(
          'In simplified terms, the system finds relevant document fragments, adds them to the context, and passes them to the model together with the question:',
        ),
        inlineFlow('Documents → fragment search → context → response'),
        paragraph(
          'This is a useful approach. It avoids placing the entire knowledge base into every request and selects only the material related to the current question.',
        ),
        paragraph(
          'But with every new request, the model still reconstructs its understanding of the world from the retrieved fragments.',
        ),
        paragraph(
          'Andrej Karpathy has a related idea that he calls LLM-Wiki. Instead of reconstructing knowledge directly from source documents every time, the model gradually creates and maintains a separate connected wiki.',
        ),
        paragraph(
          'In this approach, new sources are not merely indexed. The LLM extracts facts, updates existing pages, creates new links, and marks potential contradictions.',
        ),
        paragraph(
          'As a result, a persistent knowledge layer appears between the source material and the user, evolving together with the project.',
        ),
        paragraph(
          'This idea is very close to what I want from Demiurge Assistant. Important information should not disappear into chat history. It should accumulate, become connected, and remain available for future requests.',
        ),
        paragraph(
          'A role-playing world, however, has one characteristic that changes the problem.',
        ),
        subheading(
          'LLM-Wiki works with sources. Demiurge works with world state',
        ),
        paragraph(
          'In a typical LLM-Wiki scenario, the user already has material: articles, books, documents, or notes. The model reads them and turns them into a connected knowledge base.',
        ),
        paragraph('The main task is to keep that knowledge base up to date.'),
        paragraph(
          'In a role-playing campaign, information does not always exist in advance.',
        ),
        paragraph(
          'A new character can appear directly during a conversation with the model. A city can fall under another faction’s control after a game session. An item can gain a new owner, and a secret once known only to the game master can become available to the players.',
        ),
        paragraph(
          'This is no longer just an addition to the text. The state of the world changes.',
        ),
        paragraph(
          'That is why automatically updated Markdown pages are not enough for Demiurge. The system must understand that the world contains distinct entities, directed relationships, rules, events, and access levels.',
        ),
        paragraph('But the main difference is not the storage format.'),
        paragraph('It is the right to write.'),
        paragraph(
          'In LLM-Wiki, the model performs a significant part of the work of updating the wiki. In Demiurge, generated information first becomes a proposal.',
        ),
        paragraph(
          'The game master can accept it, edit it, save only part of it, or reject it completely. Until it has been reviewed, new information is not considered a confirmed part of the world.',
        ),
        paragraph(
          'I therefore do not see Demiurge as the opposite of LLM-Wiki. It is better understood as a more domain-specific and cautious interpretation of a similar idea.',
        ),
        paragraph('LLM-Wiki asks:'),
        quote(
          'How can a collection of sources become a continuously evolving knowledge base?',
        ),
        paragraph('Demiurge adds another question:'),
        quote(
          'How can AI participate in the development of a changing world without being given control over its canon?',
        ),
      ],
    },
    ragFigureTitle: 'RAG, LLM-Wiki, and Demiurge Assistant',
    ragFigureCaption:
      'RAG retrieves information for a request. LLM-Wiki accumulates knowledge in a persistent wiki. Demiurge also accounts for a changing world state and does not apply changes without the game master’s approval.',
    hypothesis: {
      title: 'The core hypothesis behind Demiurge Assistant',
      blocks: [
        paragraph('The project is based on a fairly simple idea.'),
        paragraph(
          'Long-term work with a complex fictional world requires more than a chat with a large context window. It requires a knowledge management system in which an LLM helps create and connect data without becoming the source of truth.',
        ),
        paragraph('A regular chat primarily generates text.'),
        paragraph(
          'Demiurge should work with a model of the world: characters, locations, rules, events, relationships, and a separation between public and secret information.',
        ),
        paragraph(
          'The model does not have to produce a perfect result immediately.',
        ),
        paragraph(
          'It can create a draft, suggest a relationship between characters, or notice a possible contradiction. But the final decision about what actually exists in Eon remains with a human.',
        ),
        paragraph(
          'I want to turn generation from a one-off answer into a sequential process.',
        ),
        paragraph(
          'First, the system finds relevant context. Then the model creates a draft. Useful parts of the answer are extracted in a structured form and shown to the game master as a proposal. Only after review do confirmed changes enter the world database and become available to future requests.',
        ),
        paragraph(
          'This is not an attempt to build yet another interface on top of an LLM.',
        ),
        paragraph(
          'The goal is to prevent the result of a conversation from disappearing into message history while also preventing the model from quietly rewriting the world.',
        ),
      ],
    },
    reviewFigureTitle: 'Reviewing Changes',
    reviewFigureCaption:
      'Generated information first becomes a proposal. Only what the game master confirms becomes part of the world.',
    goal: {
      title: 'What I want to build toward',
      blocks: [
        paragraph('In an ideal scenario, I want to write to the assistant:'),
        quote(
          'Create a merchant for this location. Do not repeat existing NPCs; account for the local factions, available technologies, and the latest events in the campaign.',
        ),
        paragraph('And receive more than a well-written paragraph.'),
        paragraph(
          'The system should propose a complete character, including their motivation, goods, relationships, secret, and story hook. If the result introduces new information about the world, it should be shown separately to the game master and saved only after approval.',
        ),
        paragraph(
          'The next time the assistant is asked a question, it should already remember this character and account for their existence.',
        ),
        paragraph('For now, Demiurge Assistant remains an experiment.'),
        paragraph(
          'Draft generation, entity population, and relationship creation now work reliably. Only one person besides me has used the project, so it is still too early to describe it as a proven product for a broad audience.',
        ),
        paragraph('But the core hypothesis can already be tested in practice:'),
        quote(
          'Can an LLM become more than an idea generator—a useful co-author that knows the world without being given the power to rewrite it unnoticed?',
        ),
        paragraph(
          'That is the question I am trying to answer as I continue developing Demiurge Assistant.',
        ),
      ],
    },
    nextLabel: 'Next article:',
    nextTitle:
      'how a model response becomes entities, relationships, and reviewable proposals.',
  },
};
