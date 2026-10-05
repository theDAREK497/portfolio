import type { Lang } from './types';

interface KnowledgeSection {
  id: string;
  title: string;
  paragraphs: string[];
  figure?: number;
}

interface KnowledgeArticle {
  title: string;
  byline: string;
  deck: string;
  opening: string[];
  sections: KnowledgeSection[];
}

export const knowledgeArticleCopy: Record<Lang, KnowledgeArticle> = {
  ru: {
    title: 'Как ответ модели становится частью базы знаний Demiurge Assistant',
    byline: 'Инженерные заметки · Часть 2 · Илья Гуриков',
    opening: [
      'В первой статье я рассказал, почему обычного ИИ-чата оказалось недостаточно для работы с Эоном. Идеи появлялись быстро, но персонажей, события и связи всё равно приходилось переносить в базу мира вручную. При этом нужно было следить, чтобы случайная деталь из ответа не стала подтверждённым фактом.',
      'В Demiurge Assistant между ответом модели и базой знаний есть отдельный этап: предложение изменений. Оно содержит конкретные сущности и связи, которые можно проверить и отредактировать до сохранения.',
      'Теперь хочу разобрать, как устроен этот переход в коде. Начнём с небольшого примера и пройдём весь путь до записи в базу. Здесь важны и формат ответа, и порядок операций, и то, что происходит при ошибке.',
    ],
    sections: [
      {
        id: 'changes',
        title: 'В одном абзаце может оказаться несколько изменений',
        paragraphs: [
          'Возьмём условный пример, который не относится к существующему канону Эона. Модель предлагает торговку Миру: она работает в Старом порту, снабжает местную гильдию и тайно передаёт сведения её противникам.',
          'Для читателя это короткое описание NPC. Для базы знаний здесь сразу несколько разных элементов: персонаж, локация, фракция и направленные связи между ними. Причём Старый порт и гильдия могут уже существовать. Повторно создавать их при каждом упоминании было бы ошибкой.',
          'Ещё одна деталь требует отдельного решения. Знакомство Миры с гильдией может быть общедоступным, а передача сведений должна остаться секретом мастера. Если сохранить весь абзац одним полем, эти сведения сложнее использовать по отдельности.',
          'Поэтому задача извлечения состоит в том, чтобы разложить исходный текст на элементы модели мира. В этот момент содержание ещё остаётся предложением. Даже аккуратно заполненная карточка может описывать персонажа, которого я не захочу добавлять в кампанию.',
        ],
      },
      {
        id: 'extraction',
        title: 'Что именно возвращает извлечение',
        paragraphs: [
          'Контракт этого этапа описан в классе ExtractionPayload. В нём есть отдельные списки сущностей, связей, правил мира, случайных таблиц и их строк. Для нашего примера достаточно первых двух, но остальной контент проходит через тот же механизм предложений.',
          'У сущности есть тип, имя, краткое и полное описание, псевдонимы и теги. Отдельными полями хранятся секретность и статус проверки. Для дополнительных свойств предусмотрено поле attributes со словарём значений. Это позволяет передавать содержательную карточку, а не пытаться позднее разобрать один большой текст.',
          'Связь тоже является самостоятельным объектом. У неё есть источник, цель и тип. Дополнительно можно указать описание, период действия, основание и секретность, а также заполнить поля confidence и weight. Поле confidence описывает уверенность в связи, а поле weight отражает её значимость или силу. Само наличие числа в поле confidence ещё не означает, что оценка модели статистически откалибрована.',
          'У языковой модели (LLM) запрашивается структурированный ответ в формате JSON. Полученный ответ затем проходит разбор, нормализацию и валидацию с помощью библиотеки Pydantic. Например, у каждого конца связи должна быть ровно одна ссылка, а временные идентификаторы сущностей внутри пакета должны быть уникальными.',
          'Некоторые повреждения JSON система пытается исправить локально. Если результат всё равно не удаётся разобрать, предусмотрен один дополнительный запрос к модели с описанием ошибки. Если и он не помогает, операция извлечения заканчивается ошибкой. Такой ограниченный повтор не позволяет незаметно крутить генерацию до случайно подходящего ответа.',
          'Важно понимать границу этой проверки. Корректный JSON и допустимые поля говорят о форме данных. Они не подтверждают, что Мира действительно связана с нужной гильдией или что предложенная история подходит миру.',
        ],
        figure: 0,
      },
      {
        id: 'references',
        title: 'Как связать нового персонажа с существующей локацией',
        paragraphs: [
          'У существующей карточки уже есть постоянный идентификатор (ID). У нового персонажа его пока нет, но связь с ним нужно описать в том же предложении.',
          'Для этого у черновика сущности есть поле client_id с временным идентификатором. В примере это поле у Миры получает значение mira. В черновике связи поле source_client_id содержит значение mira, а поле target_entity_id содержит постоянный ID уже существующего Старого порта. Если обе сущности новые, ссылки на значения их полей client_id хранятся в полях source_client_id и target_client_id связи.',
          'Отдельное поле match_entity_id у черновика сущности означает, что сведения относятся к существующей карточке. Таким образом, предложение умеет одновременно создавать новое и дополнять уже известное.',
          'При применении сначала обрабатываются сущности. Сервис создаёт карточки или обновляет найденные, получает их постоянные ID и собирает соответствие между временными и постоянными идентификаторами. Затем через это соответствие разрешаются ссылки отношений.',
          'Проверяется и принадлежность объектов текущему миру. Существующий ID из другого мира не должен случайно стать концом связи в Эоне.',
          'В обработке ответа LLM есть дополнительная очистка. Неизвестный ID, выдуманный для якобы существующей сущности, можно преобразовать в новую черновую сущность. Связь, для которой не удалось найти допустимые концы, может быть отброшена. Это помогает сохранить полезную часть результата, но также означает, что исходный ответ и итоговый набор изменений могут различаться. Их нужно сравнивать при проверке.',
        ],
        figure: 1,
      },
      {
        id: 'review',
        title: 'Предложение можно прочитать до применения',
        paragraphs: [
          'После извлечения сохраняется объект класса ExtractionProposal: исходный текст, структурированные изменения и статус pending. Это отдельная запись, которую можно открыть и проверить. Сущности мира в этот момент ещё не создаются самим фактом сохранения предложения.',
          'В чате включённое сохранение в wiki запускает именно этот путь. Оно создаёт предложение, а не вызывает применение изменений. Если извлечение не удалось, обычный ответ модели сохраняет смысл сам по себе: API возвращает его вместе с отдельной ошибкой сохранения в wiki.',
          'В интерфейсе у активного черновика видны исходный текст и элементы предложения. Для сущностей можно увидеть намерение создать или обновить карточку, а для обновлений предусмотрено сравнение полей. К элементам добавляются фрагменты исходного текста, чтобы было проще понять, откуда взялось предложение.',
          'У такой ссылки на источник есть ограничение. Если источник представляет собой ответ модели, цитата из него помогает проследить происхождение идеи. Она не становится независимым доказательством её правильности.',
          'Редактор позволяет изменить поля существующих элементов и удалить лишнее перед публикацией в базу мира. Например, можно уточнить описание Миры или убрать сомнительную связь. При этом текущий редактор не даёт произвольно менять концы отношений или статус проверки каждого элемента. Эти возможности не стоит подразумевать только потому, что они есть в схеме данных.',
          'Ещё одна особенность реализации: новые извлечения могут объединяться с уже ожидающим предложением. Поэтому активный черновик может содержать материал из нескольких источников. Перед применением нужно просмотреть его целиком, особенно если после предыдущей проверки появлялись новые извлечения.',
        ],
      },
      {
        id: 'statuses',
        title: 'Сохранение и подтверждение факта разделены',
        paragraphs: [
          'У предложения и у его содержимого разные статусы.',
          'У предложения есть статусы pending, applied и rejected. Они описывают, что произошло с пакетом изменений. У сущности или связи есть собственный статус проверки: proposed, verified, unknown или rejected.',
          'Поэтому статус applied у предложения не означает, что все сохранённые сведения автоматически получили статус verified. Например, новая запись может сохранить статус proposed или unknown. В базе остаётся место для предложенной идеи или неизвестного факта, который ещё требует решения.',
          'Для мира это полезное различие. Я могу сохранить заготовку персонажа, чтобы продолжить работу позднее, не объявляя каждую её деталь подтверждённым каноном. Решение записать информацию и решение считать её установленным фактом нужно принимать осознанно.',
          'Секретность хранится отдельно от этих статусов. Сведения могут быть подтверждёнными и при этом предназначаться только для мастера. Подробная проверка доступа заслуживает отдельного разбора: одного поля is_secret для вывода о безопасности всей системы недостаточно.',
        ],
      },
      {
        id: 'application',
        title: 'Что происходит в момент применения',
        paragraphs: [
          'Применение начинается с повторной проверки состояния предложения и его содержимого. Затем сервис создаёт или обновляет сущности, разрешает ссылки, сохраняет отношения и остальное содержимое отредактированного предложения. Изменения также связываются с предложением в истории мира. Применение разрешено только для предложений со статусом pending: повторный запрос для уже применённого предложения получает HTTP-код ответа 409.',
          'Записи и переход предложения в статус applied фиксируются одним вызовом метода commit() сессии базы данных. При перехвате исключения класса ProposalError вызывается метод rollback(), после чего текст ошибки записывается отдельно. Благодаря этому предусмотренный путь ошибки не должен оставлять успешно созданную половину пакета рядом с недописанной второй половиной.',
          'В тестах есть конкретный сценарий: ошибка возникает после того, как сущность уже была добавлена и вызван метод flush() сессии базы данных. Проверяется, что после отката сущности в базе нет, предложение осталось в статусе pending, а ошибка сохранена. Это полезнее общего обещания, что сохранение «надёжное»: виден точный случай, который проверяет тест.',
          'Для СУБД PostgreSQL код дополнительно использует блокировку конвейера предложений на уровне мира и блокировку строки предложения. Для СУБД SQLite такого же участка с блокировками нет. Запрос применения содержит ID предложения, но не версию просмотренного черновика. Блокировки сами по себе не связывают решение мастера с точным состоянием, которое он видел. Поэтому здесь нельзя обещать отсутствие любых гонок или гарантию выполнения ровно один раз (exactly once) при всех возможных сбоях.',
          'Есть и более обычная проблема: повторные упоминания одних персонажей. Сервис сопоставляет имена и псевдонимы, а также ищет уже существующие отношения с теми же источником, целью и типом. Это уменьшает повторные записи, но эвристическое совпадение имени ещё не доказывает, что речь идёт об одном персонаже.',
        ],
      },
      {
        id: 'result',
        title: 'Что в итоге получает мастер',
        paragraphs: [
          'В примере с Мирой результат можно проверить по частям: действительно ли нужен новый NPC, правильно ли выбрана локация, стоит ли сохранять связь с гильдией и какие сведения должны оставаться секретными. После этой проверки данные можно применить к базе мира.',
          'Такой процесс оставляет за моделью полезную работу: предложить содержание и разложить его по структуре. У мастера остаётся возможность увидеть конкретные изменения до записи.',
          'Demiurge по-прежнему остаётся экспериментом. Структурированный ответ не устраняет ошибки извлечения, сопоставление имён не решает все случаи дублирования, а сохранённый статус не заменяет решение человека. Но теперь эти проблемы можно рассматривать на уровне конкретной карточки, связи и операции записи.',
          'Именно такой следующий шаг мне нужен после генерации текста: понятный набор изменений, который можно проверить, поправить и включить в дальнейшую работу над миром.',
        ],
      },
    ],
    deck: 'В Demiurge Assistant между ответом модели и базой знаний есть отдельный этап: предложение изменений. Оно содержит конкретные сущности и связи, которые можно проверить и отредактировать до сохранения.',
  },
  en: {
    title: 'How a model response enters the Demiurge Assistant knowledge base',
    byline: 'Engineering notes · Part 2 · Ilia Gurikov',
    opening: [
      'In the first article, I explained why a regular AI chat was not enough for working on Eon. Ideas arrived quickly, but I still had to transfer characters, events, and relationships into the world database by hand. I also had to keep an incidental detail in a response from becoming an established fact.',
      'In Demiurge Assistant, there is a separate step between a model response and the knowledge base: a change proposal. It contains specific entities and relationships that can be reviewed and edited before they are saved.',
      'Now I want to explain how this transition works in the code. We will start with a small example and follow it through to a database write. The response format matters, as do the order of operations and what happens when something fails.',
    ],
    sections: [
      {
        id: 'changes',
        title: 'One paragraph can contain several changes',
        paragraphs: [
          "Consider a hypothetical example that is not part of Eon's existing canon. The model proposes a merchant named Mira: she works in the Old Port, supplies a local guild, and secretly passes information to its opponents.",
          'For a reader, this is a short NPC description. For the knowledge base, it contains several different elements: a character, a location, a faction, and directed relationships between them. The Old Port and the guild may already exist. Creating them again every time they are mentioned would be a mistake.',
          "Another detail needs its own decision. Mira's association with the guild might be public, while her information sharing should remain a game master secret. If the whole paragraph is stored in a single field, these details are harder to use separately.",
          'Extraction therefore breaks the source text into elements of the world model. At this stage, the content is still a proposal. Even a neatly completed record may describe a character I do not want to add to the campaign.',
        ],
      },
      {
        id: 'extraction',
        title: 'What extraction actually returns',
        paragraphs: [
          'The contract for this stage is defined in the ExtractionPayload class. It contains separate lists of entities, relationships, world rules, random tables, and table rows. Our example only needs the first two, but the other content uses the same proposal mechanism.',
          'An entity has a type, a name, a summary, a description, aliases, and tags. Secrecy and verification status are separate fields. The attributes field holds a dictionary of additional properties. This makes it possible to pass a meaningful record instead of trying to parse one large piece of prose later.',
          "A relationship is also an object in its own right. It has a source, a target, and a type. Optional fields include a description, a validity period, evidence, secrecy, confidence, and weight. The confidence field describes certainty about a relationship, while the weight field reflects its importance or strength. A number in the confidence field does not establish that the model's estimate is statistically calibrated.",
          'The large language model (LLM) is asked for a structured response in JSON format. The response then goes through parsing, normalization, and validation using the Pydantic library. For example, each end of a relationship must have exactly one reference, and temporary entity identifiers must be unique within the payload.',
          'The system first attempts to repair some malformed JSON locally. If the result still cannot be parsed, it makes one additional request to the model with the error description. If that also fails, extraction ends with an error. This bounded retry avoids quietly repeating generation until a response happens to fit.',
          'The limit of this validation matters. Valid JSON and acceptable fields establish the shape of the data. They do not establish that Mira really belongs to the right guild or that the proposed story fits the world.',
        ],
        figure: 0,
      },
      {
        id: 'references',
        title: 'Referencing a character before it exists in the database',
        paragraphs: [
          'An existing record already has a permanent identifier (ID). A new character does not, but a relationship involving that character needs to be described in the same proposal.',
          "The client_id field on an entity draft holds a temporary identifier. In our example, this field contains mira for Mira's draft. In the relationship draft, the source_client_id field contains mira, while the target_entity_id field contains the permanent ID of the existing Old Port record. If both entities are new, the relationship's source_client_id and target_client_id fields refer to the values in their client_id fields.",
          'A separate match_entity_id field on an entity draft indicates that its information belongs to an existing record. A proposal can therefore introduce new content and extend known content at the same time.',
          'During application, entities are processed first. The service creates records or updates the ones it finds, obtains their permanent IDs, and builds a mapping from temporary identifiers to permanent ones. It then uses that mapping to resolve relationship references.',
          'The system also checks that referenced objects belong to the current world. An existing ID from another world must not accidentally become the endpoint of a relationship in Eon.',
          'The LLM response path includes additional cleanup. An unknown ID invented for a supposedly existing entity can be recovered as a new draft entity. A relationship whose endpoints cannot be resolved may be dropped. This helps retain useful parts of the result, but it also means the original response and the final set of changes can differ. They need to be compared during review.',
        ],
        figure: 1,
      },
      {
        id: 'review',
        title: 'A proposal can be read before it is applied',
        paragraphs: [
          'After extraction, an instance of the ExtractionProposal class is saved with the source text, structured changes, and a pending status. This is a separate record that can be opened and reviewed. Saving the proposal does not itself create its world entities.',
          'Enabling save to wiki in chat uses this path. It creates a proposal rather than applying the changes. If extraction fails, the ordinary model response still stands on its own: the API returns it with a separate wiki-save error.',
          'The active draft interface shows the source text and proposed items. For entities, it identifies whether the intent is to create or update a record, with field comparisons for updates. Items also receive source excerpts to help explain where a proposal came from.',
          'There is a limit to what these excerpts establish. If the source is a model response, quoting it helps trace the origin of an idea. It does not provide independent evidence that the idea is correct.',
          "The editor allows fields on existing items to be changed and unwanted items to be removed before publication to the world database. I could refine Mira's description or remove a questionable relationship. However, the current editor does not expose arbitrary relationship endpoint changes or each item's verification status. Those controls should not be assumed to exist simply because the data schema supports the fields.",
          'There is another implementation detail: new extractions can be merged into a proposal with a pending status. The active draft may therefore contain material from several sources. It needs a complete review before application, especially if new extractions have arrived since the previous review.',
        ],
      },
      {
        id: 'statuses',
        title: 'Saving information and verifying it are separate decisions',
        paragraphs: [
          'A proposal and its contents have different statuses.',
          'A proposal can have a pending, applied, or rejected status. These statuses describe what happened to the change package. An entity or relationship has its own verification status: proposed, verified, unknown, or rejected.',
          'As a result, an applied proposal status does not mean that every saved item automatically received a verified status. For example, a newly created record can retain a proposed or unknown status. The database can retain a proposed idea or an unknown fact that still needs a decision.',
          'This distinction is useful for a fictional world. I can save a character draft to continue working on later without declaring every detail established canon. The decision to record information and the decision to treat it as established both need to be deliberate.',
          'Secrecy is stored separately from these statuses. Information can have a verified status and still be intended only for the game master. Access control deserves its own detailed examination: the existence of an is_secret field is not enough to establish the security of the whole system.',
        ],
      },
      {
        id: 'application',
        title: 'What happens when changes are applied',
        paragraphs: [
          "Application starts by checking the proposal's state and contents again. The service then creates or updates entities, resolves references, and saves relationships and the remaining contents of the edited proposal. The changes are also linked to the proposal in the world's history. Application is allowed only while the proposal has a pending status: a repeat request for an already applied proposal receives HTTP status code 409.",
          "The writes and the proposal's transition to the applied status are committed together in one call to the database session's commit() method. When an exception of the ProposalError class is caught, the rollback() method is called before the error is recorded separately. This is intended to prevent that failure path from leaving half the package successfully created while the other half remains unwritten.",
          "The tests contain a specific scenario: an error occurs after an entity has been added and the database session's flush() method has been called. The test checks that the entity is absent after rollback, the proposal retains its pending status, and the error is saved. This is more informative than a broad claim that saving is reliable: it identifies the exact case the test covers.",
          "For the PostgreSQL database system, the code also uses a world-level proposal-pipeline lock and a row lock on the proposal. The SQLite database system does not have the equivalent locking branch. An apply request contains the proposal ID, but not the version of the draft that was reviewed. Locks alone do not bind the game master's decision to the exact state they saw. This does not justify a universal claim of freedom from races or exactly-once behavior under every possible failure.",
          'A more ordinary problem is repeated mentions of the same characters. The service matches names and aliases and looks for existing relationships with the same source, target, and type. This reduces repeated records, but a heuristic name match does not prove that two mentions describe the same character.',
        ],
      },
      {
        id: 'result',
        title: 'What the game master gets',
        paragraphs: [
          "The result in Mira's example can be reviewed piece by piece: whether a new NPC is needed, whether the location is correct, whether to keep the guild relationship, and which details should remain secret. After this review, the data can be applied to the world database.",
          'The process gives the model useful work: proposing content and organizing it into a structure. The game master can see the specific changes before they are written.',
          'Demiurge remains an experiment. Structured responses do not eliminate extraction errors, name matching does not solve every duplicate, and a stored status does not replace a human decision. But these problems can now be examined at the level of a particular record, relationship, and write operation.',
          'This is the next step I need after text generation: a clear set of changes that can be reviewed, adjusted, and used in the continuing work on the world.',
        ],
      },
    ],
    deck: 'In Demiurge Assistant, there is a separate step between a model response and the knowledge base: a change proposal. It contains specific entities and relationships that can be reviewed and edited before they are saved.',
  },
};

export const knowledgeFigures = [
  {
    name: 'pipeline',
    width: 1800,
    height: 720,
    caption: {
      ru: 'Путь от текста до базы мира',
      en: 'From source text to the world database',
    },
  },
  {
    name: 'references',
    width: 1800,
    height: 770,
    caption: {
      ru: 'Временная ссылка становится постоянной',
      en: 'A temporary reference becomes a permanent one',
    },
  },
];

export const knowledgeImage = (index: number, lang: Lang, extension = 'png') =>
  `./images/articles/demiurge-knowledge-base/demiurge_${knowledgeFigures[index].name}_${lang.toUpperCase()}.${extension}`;
