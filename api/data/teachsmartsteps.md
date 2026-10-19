# Teach Smart Steps – Project dossier

> Curated summary written from the project sources. References in brackets: [doku p.N = TeachSmartSteps_Dokumentation (68 slides/pages), endp N = final presentation slide N, code = LEANTWO prototype source (app.py, prompts.py, package.json, src/), board = Lean Design process board, lehrplan = Medienkompetenzlehrplan.csv]. Items marked **(unverified)** need confirmation.

## At a glance

- **What:** An AI-assisted web tool that helps primary-school teachers create media-literacy tasks that fit into their regular lessons. Teachers set parameters (or upload their own material), the AI proposes task variants mapped to a media-education curriculum, and generates an editable lesson guide plus a collectible card for pupils. Tagline: "Für mehr Sicherheit von Kindern im Netz" (for more safety of children online). [doku p.1, p.24; endp 5]
- **Context:** Course "Lean Design", winter semester 2024/25, Interaction Design B.A., HfG Schwäbisch Gmünd. Lecturers: Hans Krämer, Jens Döring. [doku p.1]
- **Team:** Fabrice Rio, Nina Hielscher, Lea Haferbier, Andreas Schweizer (four students). [doku p.1]
- **Fabrice's role:** Lead responsibility for prototyping, development – building the software – and testing; also worked on ideation, research, concept and the design [stated by Fabrice]. The project was a team of four. In the sources, "development" corresponds to the coded prototype (React + Vite frontend, Flask backend calling OpenAI's o1-mini with the curriculum-grounded prompts).
- **Deliverables:** research and concept, clickable prototype / click dummy, a working coded prototype (React + Vite frontend, Flask backend calling an OpenAI reasoning model), landing page, lesson-guide PDF output, a set of illustrated collectible cards (printed and tested with children), documentation and final presentation with demo video. [doku; endp 21–33; code]

## Problem

- Children use digital media early but often without media literacy; risks include cybergrooming, cyberbullying, problematic content and excessive screen time. [doku p.6–7]
- Media education is an official guiding perspective in Baden-Württemberg's 2016 curricula, but primary schools lack structured concepts, suitable materials and trained staff; it is not a fixed part of primary-school teaching. [doku p.4–5]
- Teachers are open to the topic but short on time, struggle to keep up with fast technological change, and find it hard to fit media education into a full curriculum ("damit nicht deutschtechnisch was runterfällt"). [doku p.14–15; endp 8–9]
- Opening question of the final presentation: "But how well do children actually understand what's behind the media?" [endp 2]

## Research

- **Design sprint** starting from "How can we better protect children in the digital world?", using the KIM and JIM studies; HMWs such as sensitising children playfully to digital risks and involving parents. [doku p.6]
- **Risk-group and stakeholder analysis** (neglected or very curious children, children without close friends; parents, teachers, platforms, legislators; how groomers and cyberbullies operate). Insight: bullying and grooming are closely linked; prevention is more effective than prosecution. [doku p.7]
- **Prototype as research tool – "Internet-Detektive":** a card game simulating a chat with a stranger (profile pictures, usernames, follower counts, chat messages); children decide whether interactions are trustworthy. Tested in a workshop with 4th graders: this age group is receptive to prevention; children had "aha moments" when they realised how easily a supposedly safe profile could be manipulated. [doku p.8]
- **Parent interview** (mother of two teenagers): parents who don't use platforms like TikTok themselves struggle to follow their children's activities; parents differ widely in how much control they consider appropriate; police-led parents' evenings on cybergrooming help. [doku p.9]
- **Scenario workshop** on "media education in BW schools in 2030": STEEP trend collection, Future Wheel ("Edutainment becomes standard"), Three Horizons, Future Cone and four scenarios (Digi Sprint, school subject Digital Literacy & Critical Thinking, Digital Campus, Sync-Learn). Decision: focus on school as the place for media education. [doku p.10–11, p.22]
- **Interview with a trainee teacher** (practical semester at a primary school): curriculum overload makes choosing topics hard, uncertainty in choosing methods/materials, uses Eduki, Canva and occasionally AI tools, small rewards (collecting stars) motivate pupils, critical topics can be woven in subtly or explicitly. Resulted in a teacher **user journey** (topic selection → detailed planning → lesson → reflection) with problems and emotions per phase. [doku p.12–13]
- **Expert interview with an LMZ representative** (Landesmedienzentrum BW; teaches grades 1–2 and creates teacher materials): media are used situationally, technical equipment and teacher skills vary between schools, time is the main barrier, digital projects strongly motivate pupils; "media competence" is often equated with technical use while critical reflection gets less attention. [doku p.14–15]
- **Stakeholder map** of influences on pupils' media competence (parents, siblings, older pupils, teachers, experts, influencers, police, state) with current vs. desired communication paths. Insight: the most structured and sustainable path runs through primary-school teachers. [doku p.24–25; endp 4]
- **Process board:** mind map of internet risks mapped against primary-school subjects and their typical task formats. [board]
- Literature used (not included in full): a study on media-literacy promotion for children and adolescents, Mayrberger (media education), Jarvin 2015 on edutainment games, and an educational-science article. [references]

## Requirements

- **Pupils:** focus on reflection rather than mere use; motivation and gamification. [endp 10; doku p.16]
- **Teachers:** easy integration into lessons; low entry barrier; flexible entry (inform first or start directly); professional, trustworthy appearance; support for analogue and digital methods; direct, non-patronising feedback during task creation. [endp 10; doku p.18]
- **Personas:** Frau Meier – the curious one (58, near retirement, sceptical of tech, wants to try quickly), Herr Schmidt – the goal-oriented one (42, pragmatic, wants tasks that fit his lesson exactly, little time), Frau Keller – the ambitious one (29, media-education enthusiast, wants curriculum-aligned materials). [doku p.19–21]

## Concept

- **From prevention idea to lesson tool:** big idea = a dedicated school subject for media criticism; feasible approach = a tool for bringing media competence into existing lessons; **smallest viable solution = an AI-assisted task generator for teachers**. [doku p.22, p.24]
- **Self-compiled media-education curriculum** (7 competence areas × description × 4 content items: getting to know media, intro to the internet, safe on the internet, social networks, advertising & consumption, media analysis, media and their effects), stored as CSV and injected into prompts so every task maps to a competence. [doku p.34–35; lehrplan]
- **Parameters:** grade, subject, topic, competence, social form, duration, media-education competence, task format, digital tools; optional uploads (worksheets, links, book pages, videos) as context; pupils' interests folded into "topic" to keep prompts manageable. [doku p.26]
- **Prompt engineering:** structured, cloze-style prompts instead of free input; pedagogical instructions (clear learning goal), forbidding tasks without curriculum reference; several tested prompt versions (curriculum V1–V3, document V1–V2) with notes on what improved results; standardised HTML output matched to CSS classes; a separate JSON summary prompt per task. [doku p.26–27, p.30, p.33; code]
- **Three use cases / entry paths:** 1) direct entry into the editor (quick start), 2) targeted creation from a curriculum-coverage overview, 3) full guided setup with support (main use case). Matched to the three personas. [doku p.28–29; endp 11–19]
- **Human–AI division of labour:** #1 teacher input → AI builds optimised prompt; #2 AI generates two task variants separately (reasoning model + curriculum) and summarises them → teacher chooses and adjusts; #3 AI fills a structured lesson guide → teacher edits it, with AI rewording on selected text. Any parameter can be left to the AI ("auto-fill"), visibly marked. [doku p.30–32, p.36; endp 20]
- **Collectible cards:** after each completed task pupils receive a card matching its topic; 32 cards cover the whole curriculum; cards motivate and support reflection and recall. [doku p.36]

## Design process and iterations

- **First concept – node system:** parameters as connected nodes for modular, explorative input and visible dependencies; mapping which inputs are mandatory, dependent or derivable from documents. [doku p.38–39]
- **Usability test** of the first design prototype with a primary-school teacher (grades 3–4, mid-30s, tech-savvy), think-aloud, exploration plus predefined tasks. Positive: big central CTA understood, multiple entry options appreciated, "generate suggestions" seen as the logical next step. Problems: "Konkretisieren" vs. "Schnellstart" labels unclear; parameter extraction from uploaded documents not transparent (all parameters briefly appeared then disappeared); parameters suddenly activating confused; the AI's role was not understood; icons not distinct; options too far from their buttons. [doku p.42–43]
- **Rethinking the input:** compared a wizard (clear guidance but rigid, illogical order, no exploration), prioritised input, completely free input, and live generation (rejected: regenerating the whole task overwrites earlier inputs and makes teachers feel they are not the author). [doku p.44–45]
- **Final approach – "precision vs. flexibility":** teachers decide the order of inputs or generate directly; open inputs are interpreted by the AI; a **status curve** visualises how open (high variance) or targeted the task will be. [doku p.46; endp 25–27]

## Final design

- **Visual identity:** "Balanced Modernity" – warm off-white UI, orange for brand/selection/current position, **purple consistently marks AI-generated content**, Google Material icons, an orange robot mascot; 12-column grid. [doku p.47–48]
- **Flow:** class selection → start method → material import → setup screen "Setze den Rahmen für deine Aufgabe" (duration, subject, competence, social form, task type, topic, digital tools, with auto-fill toggles and material-import notice) → two AI task suggestions (e.g. "Freundschaft in Worten", "Streit per Nachricht") → task editor → practice-guide editor with page overview, modular blocks, notes, differentiation (easier variant), change history → PDF export + matching card. [doku p.49–54; endp 22–32]
- **Overview dashboard:** media-education curriculum coverage per class (e.g. 62.5 %), eight competence cards with progress and "new task", list of created tasks. [endp 14]
- **Landing page:** hero "Medienbildung durch individuelle Aufgaben", how-it-works, starter set, example tasks, features, benefits, partner schools, testimonials, FAQ. [doku p.56–57]
- **Lesson guide:** learning goals, preparation, task for pupils (step by step), classroom procedure with timing and moderation hints, follow-up & reflection, media-education comment, extra materials, notes column. [doku p.59; endp 30–31]
- **Cards:** iterated from first drafts to a final layout with clear hierarchy, separate stat boxes and child-friendly verbs (Wissen, Schützen, Beobachten, Prüfen), e.g. "Mira – die Medien-Magierin"; one back design for all eight colour schemes with a name field ("Ich gehöre in die Sammlung von:"). Printed and played with children. [doku p.61–63; endp 32–33]

## Technical prototype

- Frontend: React 18 + Vite, React Router, react-markdown; components for material import, grade selection, setup (sidebar, selector, parameter input, duration slider, status indicator, breadcrumb, info pop-up), task preview/detail/summaries. [code]
- Backend: Flask endpoint `/generate-tasks` building prompts from form data and calling OpenAI's reasoning model **o1-mini**; prompts in German with the curriculum embedded and HTML output structure. [code]
- Test material: publicly sold worksheets from Eduki were used as sample uploads (third-party material, not part of the portfolio content). [LEANTWO/ABs]

## Outcome and outlook

- Vision: "Media education is not an option but a necessity"; long-term goal: media education as a fixed part of lessons. [endp 34]
- Outlook: worksheet editor for pupils' materials, community/sharing between teachers (like Eduki), personalisation via teacher and class profiles, use in teacher training. [doku p.64–65]
- No quantitative results; validation = one usability test with a teacher and card testing with children. [doku]

## Inconsistencies in the sources

- Persona ages: Frau Keller's card header says 58 while the text says 29; Herr Schmidt (42) is labelled "close to retirement". [doku p.20–21]
- The documentation refers to the reasoning model generically; the code uses OpenAI o1-mini. [doku p.34; code]

## Open questions for Fabrice

- Was the coded prototype used in the final demo, or the click dummy?
- Any feedback from the course or later use?

---

# Teach Smart Steps – Deep dive

> Complete, question-oriented synthesis of the Teach Smart Steps project. Companion to the short dossier. Organised as: frame & process → research synthesis (every source) → requirements & personas → concept → decision log → design iterations → final design in detail → technical prototype → outcome, limitations, outlook → quote bank.
> Source keys: [doku p.N] = TeachSmartSteps_Dokumentation PDF page N (printed page numbers are about two lower); [endp N] = final presentation slide N; [board] = Lean Design process board; [lehrplan] = Medienkompetenzlehrplan.csv; [prompts.py], [app.py], [src], [package.json] = LEANTWO prototype code. German quotes are kept in the original with an English translation.

## 1. Project frame and process

- Course "Lean Design", winter semester 2024/25, Interaction Design B.A., HfG Schwäbisch Gmünd. Lecturers: Hans Krämer and Jens Döring. Team of four: Fabrice Rio, Nina Hielscher, Lea Haferbier, Andreas Schweizer. Subtitle/topic: "Für mehr Sicherheit von Kindern im Netz" / "Sicherheit von Kindern im Netz" (more safety for children online). [doku p.1, p.67]
- Product: "Teach Smart Steps" / "Smart Steps" – an AI-assisted task generator that helps primary-school teachers bring media education and media criticism into their regular subjects, plus a printable lesson guide and collectible cards for pupils. [doku p.1, p.24]
- The foreword frames the motivation: children grow up in a world where media are everywhere – "how do they learn to use them consciously and critically?" The project is about understanding media and using them responsibly "in a way that is fun and makes you think", supporting teachers "practically and flexibly". Closing line: "Stellen wir also die Weichen für eine starke Medienkompetenz!" (Let's set the course for strong media literacy.) [doku p.2]
- Process as documented (chapters): 1 Introduction → 2 Research (design sprint, scenario workshop, target-group research) → 3 User requirements (pupils, teachers, personas) → 4 Concept process (ideation, MVP, stakeholder map, system, use cases, overall system + technical implementation) → 5 Design process (node system, screen flow, user testing, rethinking the input concept) → 6 Final design (style guide, screen flow, lesson-guide design, card design) → 7 Outlook. [doku p.3]
- Final presentation structure: Problem → Research → Requirements → Solution → Overview → Flow → Output → Conclusion; it included a demo video shot in a real classroom (empty classroom "3b", a young teacher using the tool at the desk, children looking at the cards in a schoolyard). [endp 4, 21, 23, 33]
- Method arc: broad problem space (child safety online) → narrowed to school as the place for media education → narrowed to teachers as the lever → smallest viable product = AI task generator. This narrowing is the "lean" core of the course.

## 2. Research synthesis

### 2.1 Context: media education in (Baden-Württemberg) primary schools [doku p.4–5]
- Media are part of children's everyday life, but many primary schools lack structured concepts, suitable materials and trained staff for media education.
- Media education is not just technical device handling but a critical understanding of media content, data protection and digital communication.
- Since the 2016 education plans, media education is one of six binding overarching "Leitperspektiven" (guiding perspectives) in Baden-Württemberg; a basic course in grade 5 is meant to lay the groundwork. Youth media protection has a central place alongside learning with media.
- The Landesmedienzentrum Baden-Württemberg (LMZ) supports schools with pedagogical/technical advice, training, vetted teaching media and loan devices (tablets, laptops).
- Chances (enriched, individualised learning) vs. risks (unreflected consumption, data-protection problems, misinformation). Conclusion: media education is still not a fixed part of primary schools, so there is an urgent need for age-appropriate concepts and practical approaches.

### 2.2 Design sprint: "How can we better protect children in the digital world?" [doku p.6–8]
- Desk research with the **KIM study** (Kinder + Medien, Computer + Internet: children get access to digital media earlier and earlier, often without sufficient media literacy) and the **JIM study** (Jugend, Information, Medien: social networks and digital risks among adolescents).
- Critical, often underestimated problem areas: cyber-grooming, (cyber)bullying, problematic content, excessive screen time.
- HMW questions, e.g. "How might we sensitise children to digital risks through playful methods?" and "How can parents be actively involved in protecting their children?"
- **Risk groups:** neglected children, very curious children, children without close friendships. Also analysed: parents' and educators' risk perception and knowledge and their influence on children's online behaviour, and the perpetrator side (how groomers and cyberbullies operate, which mechanisms they use, how children can recognise them).
- **First stakeholder analysis:** children (main target group), parents (most important companions), teachers/schools (mediators of media competence), technology companies (platform providers), legislators and authorities (rule-makers) → the challenges sit in a complex ecosystem; at that point, a close parent–child connection seemed essential for effective media education.
- **User journey mappings** of how children behave online ("Wie verhalten sich Kinder, wenn's brenzlig wird?" – how do children behave when things get dicey?) showed many children use digital platforms unsupervised.
- **Core problem fields defined:** cyber-grooming (one of the biggest dangers), bullying (strong both socially and digitally), problematic content with unfiltered access, prosecution and prevention of online offenders. Key insight: **bullying and cyber-grooming are closely linked, and prevention is more effective than prosecution.**

### 2.3 Prototype as research tool: "Internet-Detektive" (school workshop) [doku p.8]
- A card game simulating a chat with a stranger: cards with profile pictures, usernames, descriptions, follower counts and chat messages. Children navigate scenarios and decide whether an interaction is trustworthy or potentially dangerous – learning to spot fake profiles and building a critical awareness of online identities.
- Tested in a workshop with **4th graders**. Findings:
  - **Preventive training works at this age:** 4th graders are receptive and already have first internet experiences – a well-definable target group for prevention.
  - **Critical thinking "aha moments":** children realised how easily a supposedly safe profile can be manipulated – e.g. one child swapped her own profile picture for that of an unknown man without immediately noticing. This showed how important it is to train children to notice suspicious changes.

### 2.4 Parent interview [doku p.9]
- Mother of two (a 17-year-old son and a 14-year-old daughter); the children mainly use tablets and smartphones and are active on TikTok, Instagram and WhatsApp.
- **Usage and protection:** the family handles media deliberately with clear agreements about strangers; the daughter does not accept unknown contacts and blocks strangers immediately; the older son checks which apps his sister downloads and talks with her about it.
- **Security and control:** strong awareness of online dangers, but uncertainty because she does not use all platforms herself (e.g. TikTok); relies on parents' evenings (e.g. on cyber-grooming, held by the police) and her own internet research.
- **Different approaches among parents:** large differences in how much control parents find appropriate – some check activities regularly, others worry about invading privacy → media handling differs from family to family.
- Derived opportunities: targeted information material for parents who don't use social media; exchange formats/workshops between parents; expanding expert-led parents' evenings.

### 2.5 Scenario workshop: "What does media education in BW schools look like in 2030?" [doku p.10–11, p.22]
- Deliberately focused on schools because that area had not yet been researched in depth.
- **STEEP trend collection** (social, technological, economic, environmental, political) with focus on safety, knowledge culture and individualisation. Implications for the tool: individualisation → adaptable functions for teachers and pupils; safety → enable teachers to address risks preventively; knowledge culture & education → digital competence of teachers and pupils is central, the tool should also support teacher training; connectivity → opportunities and risks, the tool should help teachers guide pupils to a reflective use.
- Team stance: a holistic concept is needed to tackle cybercrime against children so every child is reached – and the chance lies in school education, where not only digitalisation lags behind but also education about media.
- **Future Wheel** with the thesis "Edutainment wird Standard" (edutainment becomes standard): first-order effects – higher motivation through playful, interactive content; teachers get new tools; parents benefit indirectly through contact with their children's digital learning. Second-order effects – stronger media literacy among parents could lead to new training concepts; curricula would need to integrate edutainment; long-term benefits from digital competences but possible technological dependencies.
- **Three Horizons:** H1 (2 years) – digitalisation of teaching advances, edutainment platforms become part of school life, teachers need training, schools might partner with tech companies; H2 (5 years) – schools and technologies network more, programmes for technical and critical competences, soft skills like critical thinking gain importance; H3 (10 years) – digital competence is a fixed part of the curriculum, a new subject "Digital Literacy" and "Critical Thinking".
- **Future Cone:** developments placed on time (x) vs. probability (y) to show positive and negative developments; opposing pairs emerged (e.g. return to real social contact vs. loss of social skills).
- **Four scenarios** from the axis extremes (short-/long-term edutainment enthusiasm × critical online thinking / connectivity between digital and real world): "Digi Sprint", "Schulfach: Digital Literacy & Critical Thinking", "Digital Campus", "Sync-Learn".
- Outcome: **school becomes the central place for media education**; the team did not want to create a separate subject but to integrate into existing lesson structures.

### 2.6 Interview with a trainee teacher [doku p.12–13]
- Semi-structured interview with a student teacher who had completed her practical semester at a primary school and currently works in the support programme "Rückenwind".
- Topics: choice of teaching materials, differentiation, experience with digital tools, structuring lessons, pupil motivation.
- Findings: young teachers struggle to settle into school life, especially with choosing methods and materials; she uses Eduki and Canva and occasionally AI tools; open to new approaches but time pressure and uncertainty make implementation hard; covering the curriculum while addressing individual needs is challenging.
- Insight cards: **challenge of topic diversity** (curriculum overload, prioritising is demanding); **uncertainty in material selection** (without an established repertoire of methods it is hard to find suitable formats; teachers fall back on existing materials but want more targeted support); **interactive teaching** (too much frontal teaching inhibits participation); **motivation through small incentives** (reward systems like collecting stars); **integration of critical topics** (topics like media criticism or sustainability can be woven in explicitly or subtly).
- **Teacher user journey** derived from it:
  1. *Topic choice & rough planning* (days to weeks before): check the curriculum to set the competence, see whether current topics like sustainability or media competence fit, get an overview of pupils' challenges and interests, brainstorm methods and materials. Problems: curriculum overload, choosing relevant content, difficulty integrating current topics meaningfully. Emotion: „Ich will eine spannende und sinnvolle Stunde gestalten!" (I want to create an exciting, meaningful lesson!)
  2. *Detailed planning & material creation* (1–2 days before): lesson sketch, learning goal, structure, methods, differentiation for different levels, find or create materials, time management, decide between proven methods and trying something new ("a balancing act between safety and the joy of experimenting"). Problems: choosing task formats is challenging; missing method repertoire leads to uncertainty; limited time leads to pragmatic but less innovative solutions; planning is hampered by missing structured templates. Emotion: „Habe ich die richtige Methode gewählt? Wird es klappen? Schaffe ich alles rechtzeitig?" (Did I choose the right method? Will it work? Will I finish on time?)
  3. *Teaching* (day of the lesson): motivating introduction with everyday references or interactive elements, tasks in different social forms with interactivity and differentiation, staying flexible, reward system. Problems: too much frontal teaching inhibits participation; spontaneous adjustments demand high flexibility; keeping motivation up for the whole lesson. Emotion: „Ich ziehe den Plan durch und reagiere, wenn nötig." (I follow the plan and react when needed.)
  4. *Reflection & adjustment* (after the lesson): pupil feedback, self-reflection (goal reached? which methods worked?), notes for future lessons. Problems: reflection is often neglected in hectic school life; pupil feedback rarely flows into the next planning. Emotion: „Was kann ich beim nächsten Mal besser machen?" (What can I do better next time?)

### 2.7 Expert interview with an LMZ representative [doku p.14–15; endp 9]
- Interviewee teaches grades 1 and 2 and works at the Landesmedienzentrum BW, where she creates materials for teachers and runs robotics workshops. Semi-structured: own background → current situation of media education in primary schools (existing concepts, implementation challenges) → planned reforms and developments (especially towards 2025) → teachers' everyday challenges → potentials and solutions → recommendations and best practices.
- **General situation:** a media-education curriculum exists but is not worked through strictly – mostly integrated flexibly; implementation depends heavily on schools' technical and staff resources. „Man muss natürlich immer schauen, was die Schulen überhaupt an technischer Ausstattung haben und ob die Lehrer die Kompetenzen dafür besitzen." (You always have to see what technical equipment schools have and whether teachers have the competences.) Digital presentations or video projects are normal at some schools, a big challenge at others.
- **Use of digital media:** situational and flexible – Book Creator, Antolin, GarageBand; video projects instead of classic presentations; document cameras, audio plays. „Das ist nicht jeden Tag gleich, sondern man setzt es ein, wie es gerade passt." (It isn't the same every day; you use it as it fits.)
- **Challenges for teachers:** great openness but limited time – „Da muss man immer zeitlich schauen, wie kann ich es integrieren, damit nicht deutschtechnisch was runterfällt." (You always have to see how to fit it in time-wise so nothing in German falls by the wayside.) Fast technological change makes it hard to stay up to date; teachers set different priorities (digital vs. craft/artistic approaches) → exchange among colleagues, materials and training are key.
- **Effect on pupils:** high motivation – „Das hat einfach eine Motivation entfacht, und die sind dann so da drin versunken. Die haben das toll gemacht, mit so einem Interesse und einer Begeisterung." (It sparked motivation, they were completely absorbed, did it with such interest and enthusiasm.) Children also learn social skills (helping each other, collaborative work).
- **Critical media use:** she could report little from practice because she works with young pupils; the LMZ has materials and workshops on it for teachers, parents and pupils. Children should see digital media not only as entertainment but as creative tools: „Ah toll, damit kann ich programmieren, damit kann ich ein digitales Buch herstellen." (Great, I can program with it, I can make a digital book.)
- **Future:** media education is in the education plan; programmes like Digitalpakt 2.0 should equip schools better and train teachers. „Wenn alles schon da ist, wird es, glaube ich, noch reibungsloser und selbstverständlicher ablaufen." (Once everything is in place, it will run more smoothly and naturally.)
- **Team's conclusion:** the semi-structured method worked well; many assumptions about teachers' challenges were confirmed. Most striking: **"media competence" was often equated with technical use, while critical engagement with digital media was discussed far less** – a gap the project decided to address. In the final presentation condensed to: support is needed to reduce uncertainty, and teachers must be supported through rapid technological change; teachers are open to integrating current topics, and critical topics can be brought in subtly or holistically. [endp 8–9]

### 2.8 Stakeholder / system map [doku p.24–25; endp 4]
- Influences on pupils' (≈10 years) media competence: parents, siblings, older pupils, primary-school teachers, experts/pedagogues, influencers, police/justice, state.
- Arrow coding: **purple** = current information and influence paths, **orange** = desirable improvements from the project's point of view, **blue** = the strongest active connections regarding media competence (where media education is consciously taught, not just through incidental contact with media).
- Insight: **the most structured and sustainable learning path runs through primary-school teachers**, who can actively and reflectively integrate media criticism into lessons. In the final presentation: "Anchor media education early – teach about media before problems arise" and "Teachers as central mediators – in class, media education can reach all pupils". [endp 4]

### 2.9 Process board: risks × subjects × task formats [board]
- A large mind map pairing "Risiken im Internet" with "Grundschule Fächer".
- Internet risks and sub-points: cyber-grooming (initiating contacts, manipulation of victims), threats to privacy (data misuse, data protection, identity theft), insufficient security measures (viruses, malware, trojans, ransomware), online addiction (gaming addiction, social-media addiction, effects on real life), public Wi-Fi/unsafe networks (lack of encryption, data interception), identity fraud (fake profiles, deception in social networks, risks for personal safety), disinformation (fake news, manipulation of public opinion, influence on elections), cyberbullying (harassment and threats, reputational damage, psychological effects), phishing (fraud via fake e-mails, fake websites, data theft), illegal downloads (copyright infringement, spreading protected content, consequences for users), inappropriate content (child and youth protection, access to dangerous platforms, lack of education), extremism and radicalisation (access to extremist content, recruitment via the internet, influence on young people).
- Primary-school subjects with sub-areas and typical task formats: German (reading – comprehension questions, text analysis, reading aloud; writing – essays, dictations, creative writing; grammar – cloze texts, sentence building, parts of speech; spelling – dictations, spelling games, error analysis; vocabulary – word games, picture cards, tests), English (grammar, listening and speaking – dialogues, role plays; reading and writing – simple texts, book presentations), social studies (history – timelines, historical figures; geography – reading maps, presenting countries, excursions; politics – discussions, role plays, current topics; social skills – group work, conflict resolution, team games), music (singing, instruments, music theory, music history), maths (numbers and operations, geometry, measures and weights, data and chance – diagrams, surveys, probabilities), science (biology, physics, chemistry, environmental studies – experiments, observation, projects), art (painting, drawing, art history, crafts).
- Purpose: show where media-education topics can plug into existing subjects and task formats – the foundation for "integrate into regular lessons instead of a new subject".

### 2.10 Literature [references]
- Federal ministry brochure on promoting media literacy for children and adolescents ("Medienkompetenzförderung für Kinder und Jugendliche", 107 pages).
- Galley & Mayrberger: "Tablets im Schulalltag" – evaluation of the BW project "tabletBS" on integrating tablets in vocational upper-secondary schools (MedienPädagogik, issue 31).
- Anikina & Yakimenko (2015): "Edutainment as a Modern Technology of Education".
- Jarvin (2015): "Edutainment, Games, and the Future of Education in a Digital World".
- The two edutainment papers back the Future Wheel thesis and the gamification/cards concept.

## 3. Requirements and personas

### 3.1 What pupils need – "from consumer to critical thinker" [doku p.16–17; endp 10]
- **Media criticism as a reflection process:** many existing offers focus on technical skills; the tool should make pupils question the effect and influence of media and form their own opinion.
- **Varied learning formats:** learning is most effective from different perspectives – pupils should apply and develop knowledge creatively, not just absorb it.
- **Motivation through interactive elements:** playful elements and visible progress keep motivation and long-term interest up. Early ideation sketches included a level system (points/progress visible, collect points by completing worksheets).
- Presentation summary: focus on reflection rather than mere use; motivation and gamification.

### 3.2 What teachers need [doku p.18; endp 10]
- **Inviting, flexible entry:** some want to learn how it works first, others want to start creating straight away → the start page needs a quick overview and several entry paths.
- **Easy integration into lessons:** intuitive, no long onboarding, clear structure; flexible enough for different teaching concepts and to complement curricula without extra planning effort.
- **Professional appearance and intuitive operation:** a serious, tidy design, clear language and well-thought-out structure create trust; users should find their way without uncertainty.
- **Link to proven teaching methods:** support digital and analogue ways of working; offline-usable supplementary content.
- **Direct feedback during task creation:** support that is not patronising; instead of a rigid step-by-step system, dynamic feedback adapted to the individual process (dialogue-like exchange or hints at the right places) so teachers always know whether they are on track.
- Presentation summary: easy integration into lessons; low entry barrier for teachers.

### 3.3 Personas [doku p.19–21]
- **Frau Meier – "Die Neugierige" (the curious one):** 58, close to retirement, 30+ years at a primary school; warm and dedicated; grew up with board and worksheets, recently interested in digital options but often overwhelmed and hesitant; colleagues describe her as patient, empathetic, open but sceptical of innovations. Quote: „Ich möchte schnell eine Aufgabe generieren, um das Tool zu testen. Falls ich das Tool weiter benutze, soll es auch nützlich genug sein." (I want to quickly generate a task to test the tool. If I keep using it, it should be useful enough.) Goals: get to know the tool, gain first experience with AI tools, more confidence with digital tools. Needs: easily accessible, clearly structured tool; clear instructions and examples; support without much prior knowledge. Skills: very experienced in German and maths, creative with stories and games, basic computer skills. Pain points: put off by complex technology and terms like "AI"; fears new tools cost more time than they save; worries digital tasks feel too technical and impersonal.
- **Herr Schmidt – "Der Zielgerichtete" (the goal-oriented one):** 42, 10+ years at a primary school, also involved in school management and project organisation; pragmatic, values structure and efficiency; experienced with digital tools; little time for detailed preparation. Quote: „Mir ist wichtig, dass die Aufgabe genau in meine Unterrichtsstunde passt, also dazu, was wir sonst so behandeln. Ich habe auch schon grobe Vorstellungen, wie sie aussehen soll." (It's important that the task fits my lesson exactly … I already have a rough idea what it should look like.) Goals: a task that sensibly complements his lesson, fast and efficient, didactically valuable without much adaptation. Needs: precise suggestions based on uploaded documents or given parameters; flexibility to adapt; easy way to set time frame, social form or digital tools. Pain points: time pressure; hard to find suitable tasks for specific requirements quickly; frustrated by tools with too many options.
- **Frau Keller – "Die Ambitionierte" (the ambitious one):** 29, 4+ years at a primary school; dedicated to media competence and digital education with many successful projects; knows the media-education curriculum well. Quote: „Ich möchte gezielt Medienkompetenzen in meinen Unterricht integrieren, um den Kindern ein vollumfängliches Bild der Medienwelt zu vermitteln." (I want to integrate media competences specifically to give children a complete picture of the media world.) Goals: implement the media-education curriculum completely and effectively; practical, ready-to-use tasks that fit the curriculum; a more efficient way than creating new material for every topic. Needs: a tool linking curriculum goals with practical tasks; curriculum-compliant yet inspiring materials; time savings with quality. Pain points: hard to find materials tailored to the curriculum; time to create pedagogically and media-competently sound tasks; existing resources don't match her unit goals.
- The three personas map directly onto the three use cases / entry paths (see D6).

## 4. Concept

### 4.1 From prevention idea to lesson tool [doku p.22–24]
- At the start only one thing was clear: convey media criticism to children sustainably and understandably – the best approach was open.
- **Morphological box** to explore the solution space systematically (dimensions such as analogue games, simulation, video, online, points collection, level-up) and keep track of directions, excluded approaches and relevant dimensions.
- Three levels of ambition: **big idea** – a dedicated school subject for media criticism; **feasible approach** – a tool to bring media competence into lessons; **smallest viable solution (MVP)** – an AI-assisted task generator for teachers that creates suitable media-education and media-criticism tasks.
- The team decided to "attack in the first horizon" (near future, H1 of the Three Horizons) and integrate into existing subjects because a new subject was not realistic.

### 4.2 Requirements for the AI [doku p.26]
- Tasks must be age-appropriate, understandable and factually correct; oriented to existing curricula so they can be used directly; able to cover both media education and media criticism.
- **Technology choice:** an LLM-based solution because the AI must understand and produce complex linguistic relations.
- **Structured inputs:** a clear prompt structure to stop the AI generating unsystematically; different prompts tested.
- **Quality control via templates:** a fixed output structure (e.g. learning goal, task, form of work).
- **Core parameters:** grade, school subject, topic, competence, social form, duration, media-education competence, task format, digital tools. **Optional:** uploads as task context (worksheets, links, book pages, videos – used as information base or integrated directly).
- **Pupils' interests are folded into "topic"** instead of being a separate parameter: otherwise the AI would have to combine four dimensions (topic, interests, media competence, subject) at once, which often led to unclear, hard-to-implement tasks; integrated, the input stays manageable and can still include current media-related content.

### 4.3 Prompt engineering as a design activity [doku p.27; Abb. 2]
- "One of the biggest challenges was developing a precise and consistent prompt structure" – an LLM only produces didactically valuable tasks if instructed very precisely.
- **Structured input:** a fixed prompt structure; the teacher's input is inserted as a **cloze text (Lückentext)** into the AI prompt so a clearly formatted task always comes out.
- **Optimised instructions:** pedagogical structure (e.g. a clear learning-goal formulation); **ban on unsuitable results** – the AI may not create tasks without direct reference to the curriculum.
- **Test phase:** four prompt versions combining curriculum versions V1–V3 and document versions V1–V2, each with an intro for the LLM, the task prompt and an output-format section. Testing notes included: overall feeling that tasks got worse (perhaps due to too-strong constraints in the structure); the worksheet has too much content and confuses the AI → shorter document; results "pretty good, only fine revisions needed"; even clearer structure for suggestions needed; unclear how strongly the prompt follows the worksheet – its "clouds" were hardly picked up → tell the AI the task should complement the document; digital tools are suggested too often → introduce a rule; clear naming of structure elements needed; a more adapted curriculum needed; don't use the curriculum information loosely → precise note in the intro and revision of the curriculum: "…wobei jeder Aufgabe ein Thema, einer der Unterpunkte und die dazugehörige inhaltsbezogene Kompetenz auf dem Medienbildungslehrplan zugeordnet werden kann" (…so that every task can be assigned a topic, one of the sub-points and the related content competence of the media-education curriculum); perhaps choose either a subject with competence or a media-education competence.
- Then the structure was refined further to secure task quality.

### 4.4 Three use cases [doku p.28–29; endp 11–19]
1. **Direct entry into the editor** – for teachers who want a task fast without defining settings first; saves time, ideal for spontaneous lesson changes or experienced users. Starts at the landing page.
2. **Media competence as starting point** – for teachers who want to focus on a specific competence: select it from the media-education curriculum in a clear selection mask showing competences, contents and progress; because the competence is an input rather than an AI output, the subsequent setup differs. Starts at the overview.
3. **Step by step to the individual task (main use case)** – detailed, supported planning: a workflow asks for duration, subject, current curriculum competence, social form, task type and topic, plus whether digital tools should be used; inputs can be skipped or auto-filled by the AI; AI suggestions simplify the process. Especially helpful for complex units or teachers new to digital tools. Landing page → task setup → task editor.
- In the final presentation: "Drei Wege zur optimalen Aufgabe" – direct entry into the editor, targeted task creation via the overview, complete input with support.

### 4.5 How the system works together (human–AI division of labour) [doku p.30–36; endp 20]
- **#1 Teacher: inputs as starting point** via a clear side menu – duration, subject, competence (anchored in the official curriculum, coupled to the subject), social form (individual, partner, group – influences which task types are offered), task type (depends on social form and other parameters), topic, digital tools (yes/no/partly).
- **#1 AI: optimised prompt preparation** – parameters are embedded in a predefined prompt structure; uploaded documents auto-fill parameters; **dynamic prompts** – specific templates per field (media competence, social form, task type) address only that sub-area; **standardised structure** – the final prompt requires output in a predefined **HTML structure matched exactly to CSS classes**, so output is consistent in content and appearance.
- **Auto-fill any parameter:** for each parameter an AI suggestion can be activated; the field is colour-marked as "open" and animated with continuously changing values to show the dynamic process; during generation the AI checks which fields were not set manually and fills them based on the existing inputs; no restriction on which parameters can be auto-filled. Purpose: take away teachers' worry that empty fields harm the result.
- **#2 AI: intelligent task creation** – two task variants are generated separately (so the model can focus on each), cached, then sent to the API again to create a structured summary per task (short description, AI-added parameters, selected media competence). After the teacher chooses, the task is loaded from the cache into edit mode, where the AI stays active and reacts to parameter changes with suggestions.
- **#2 Teacher: preparing the task for pupils** – compares the two summaries, picks one, makes final adjustments (timing, details).
- **Reasoning model:** used for generating and adapting tasks because it is designed to draw logical conclusions, understand complex relations and make structured decisions – not just generate text but evaluate, compare and optimise content in context.
- **Media-education curriculum** stored as a structured CSV and retrieved automatically during generation; the AI picks a fitting content competence and integrates it into the prompt; it is also linked to other components such as the choice of the matching playing card. Documentation: seven main areas, each with a competence description and four specific contents.
- **#3 AI: structure for the practice guide** – precise instructions for sections (learning goals, preparation, implementation, follow-up, reflection), order and fields (title, short description, topic-specific fields) so every guide is consistent, complete and clear.
- **#3 Teacher: adapting the practice guide** in a block-based editor: mark lines or blocks, let the AI reword them, change font size, bold/italic/underline/strikethrough, highlight, font colour, add notes.
- **#3 AI: editing support** – selected text is sent to the API and rewritten as requested; the new version appears in the editor to accept or keep editing.
- **Output:** print/export as PDF.

### 4.6 Collectible playing cards (gamification) [doku p.36–37, p.60–63]
- After each completed task, pupils receive a card reflecting the task's topic and capturing what was learned; all **32 different cards** are collected once the whole media-education curriculum has been worked through.
- The system suggests in the background which card to hand out, based on topic and assigned curriculum competence.
- Didactic value: playful incentive plus reflection tool; recognition effect; sustainable anchoring of media-education content. Builds on the trainee teacher's finding that small rewards (collecting stars) motivate.

## 5. Decision log

**D1 – Target teachers, not children or parents directly.** Problem: children are the ones at risk, parents vary widely in knowledge and control. Evidence: stakeholder map – the strongest active, structured path runs through primary-school teachers; in class, media education reaches all pupils, regardless of family background; parent interview showed big differences between families. Decision: teachers as central mediators; anchor media education early, before problems arise. [doku p.7, p.9, p.24; endp 4]

**D2 – School as the place, but no new school subject.** Scenario workshop pointed to school; a "Digital Literacy & Critical Thinking" subject is a 10-year horizon. Decision: integrate into existing subjects in the first horizon (near future). Rationale: realism and lean scope. [doku p.11, p.22, p.24]

**D3 – Smallest viable product = AI-assisted task generator.** From the three ambition levels (subject → tool → generator), the generator was the smallest thing that could be built and tested. [doku p.24]

**D4 – Focus on media criticism, not only technical skills.** Evidence: LMZ interview – "media competence" is equated with technical use, critical reflection is underserved; requirement "reflection rather than mere use". [doku p.15–16; endp 10]

**D5 – Ground the AI in a self-compiled media-education curriculum.** Problem: an LLM without clear control produces generic, superficial tasks with little reference to actual lessons. Decision: a structured curriculum (CSV) injected into prompts; every task must map to a topic, sub-point and content competence; tasks without curriculum reference are forbidden. The curriculum also drives the overview dashboard (coverage per class) and the card system. [doku p.26–27, p.34, p.64]

**D6 – Three entry paths for three personas.** Frau Meier (curious, wants to try quickly) → direct entry into the editor; Frau Keller (ambitious, curriculum-driven) → targeted creation from the overview; Herr Schmidt (goal-oriented, exact requirements, uploads) → full setup with support. Validated in testing: the different entry options were perceived as successful. [doku p.19–21, p.28, p.43; endp 19]

**D7 – Fold pupils' interests into "topic".** Four simultaneous dimensions confused the AI; one combined field keeps input lean. [doku p.26]

**D8 – Cloze-style structured prompts and fixed output structure.** Free input gave inconsistent results; structured templates and HTML/CSS output give consistent, printable tasks. Prompt iterations V1–V3 refined via testing notes. [doku p.27, p.30]

**D9 – "Auto-fill" for every parameter, visibly marked.** Fear of empty fields harming the result; teachers decide what to set and what to leave to the AI. AI content and auto-filled fields are consistently marked (purple). [doku p.32, p.45, p.49]

**D10 – Two task variants to choose from, summarised first.** Choice instead of a single answer keeps the teacher as decision-maker; summaries make comparison quick; separate generation improves quality. [doku p.32]

**D11 – Abandon the node system.** The first concept (parameters as connected nodes) aimed at modular, explorative input and visible dependencies. Work on it mapped which parameters are hierarchically dependent (document → subject → competence → grade), which are independent (social form, digital tools, duration), which can be read from a document and which are mandatory. In practice the freedom created uncertainty; testing showed confusion about labels, sudden parameter activation and the AI's role → rethink the input concept. [doku p.38–39, p.42–44]

**D12 – Neither wizard nor fully free input nor live generation – a hybrid.** Alternatives compared:
- *Wizard / grouping dependencies:* clear guidance, fewer inputs (much can be derived, e.g. competence → subject + grade), low cognitive load, context-dependent questions – but no flexibility (can't start mid-process), inflexible and illogical order ("it is simply not logical to choose the competence before the subject"), limited individualisation (users fill everything because they're used to it and can't see what's coming), no exploration (effects only visible at the end), linear constraint.
- *Prioritising input:* teachers state what matters most and the system adapts – targeted emphasis, saves time, focus on what counts; but forces early commitment and priorities may only affect the task late (unexpected results).
- *Even freer input:* any input can be the starting point – extremely flexible, avoids frustration, exploratory; but disorientation, lack of structure, more clicks.
- *Live generation:* instant feedback on how inputs affect the task (the idea recurred throughout) – but regeneration changes the whole text rather than one part, overwriting earlier inputs ("not like AI image editing where you refine single elements – targeted control is missing"); the first generated task contains content the user never entered → the teacher "doesn't feel like the author of the task but gets a ready-made solution that often doesn't fit". Rejected.
- Decision: combine the strengths – teachers choose the order of inputs or generate directly, define precisely what matters, and let the AI interpret open inputs. [doku p.44–46]

**D13 – Status curve: make "precision vs. flexibility" visible.** The central question "Präzision vs. Flexibilität: Wie viel Kontrolle braucht es bei der Aufgabenerstellung?" is answered with a status indicator ("status of your task") running from "high variance" to "very targeted": fewer inputs = more AI freedom/variety, more inputs = more targeted results. [doku p.46, p.50; endp 25–27]

**D14 – Teacher stays the author: two editors after generation.** Task editor and practice-guide editor with modular blocks, plus icons for free text, AI rewording on selection, notes, differentiation variants, change history and undo/redo. Rationale: AI as support, not replacement; the fear that digital tasks feel impersonal (Frau Meier). [doku p.36, p.53–54, p.66; endp 30–31]

**D15 – Printable PDF with a notes column.** Teachers work analogue and digital; the guide must work both on screen and printed; a free right-hand column allows handwritten notes after printing. [doku p.18, p.58–59]

**D16 – Collectible cards instead of points or a level system.** Early sketches explored a level/points system; interview evidence that small rewards motivate, plus edutainment literature, led to physical, collectible cards tied to curriculum competences – tangible, social and usable offline. [doku p.12, p.17, p.36]

**D17 – Card design: from minimal to trading-card style.** See 6.4. Rationale: children prefer colourful, dynamic cards; long-term motivation needs play appeal ("we had to orient ourselves more strongly on established trading cards like Pokémon"). [doku p.60–61]

**D18 – Visual language: warm, modern, trustworthy; purple = AI.** Professional appearance builds trust (teacher requirement); purple consistently marks AI-generated content so teachers always see what came from the AI; mood "Balanced Modernity". [doku p.18, p.47]

## 6. Design iterations

### 6.1 Node-system prototype → first screen flow [doku p.38–41]
- Requirements the node concept aimed to meet: flexible, modular input; visual structuring (parameters as linked nodes instead of a linear form); explorative use (try combinations and see effects); dynamic prompt structure depending on input; suggestions optimised on the basis of inputs.
- First screen flow ("from input to finished task"): *Pre-input phase* – 1 choose start method (state requirements first or generate automatically), 2 import material (own document, image, link as basis, or set all criteria manually), 3 choose the uploaded file. *Input phase* – 4 read parameters from the document, 5 automatic parameter display (check/adjust recognised values), 6 enter the three essential mandatory fields step by step, 7 add extended optional parameters (then the "generate suggestions" button appears), 8 AI completes missing elements (e.g. different possible task types), 9 review AI variants, select one into the editor or request a new generation.

### 6.2 Usability test (first design prototype) [doku p.42–43]
- **Participant:** a primary-school teacher of grades 3 and 4, mid-30s, solid technical understanding (likes new technology privately), already uses digital tools for lesson preparation.
- **Setup:** quiet room, laptop with stable internet, think-aloud. Procedure: introduction → scenario (use case: create a task for class) → free exploration → predefined test tasks → debrief.
- **Research questions:** Do users understand how to create a new task? How intuitive is parameter input? Are document upload and automatic parameter takeover understood? What do users expect from the AI function? How can user guidance be improved?
- **Observations:**
  - *Exploration:* immediately noticed the big central "Aufgabe generieren" (generate task) button as entry point; small floating icons unclear (clickable or decorative?); clicked through the features overview with interest; surprised by the partnership section – does every teacher have free access or is it tied to a partnership?; noticed in the FAQ that documents can be uploaded and roughly understood it helps determine parameters, but not how.
  - *Click "generate task":* recognised and clicked straight away – placement works.
  - *Specify requirements:* clicked "Schnellstart" (quick start) instead of "Konkretisieren" (specify); only after a short explanation did he understand that detailed adjustment happens under "Konkretisieren" → labels/placement need to be clearer.
  - *Upload a document:* knew from the FAQ that upload is possible but asked which information would be extracted; critical moment: after upload, all possible parameters were briefly shown before some were hidden automatically – he didn't understand they had been read from the document → needs step-by-step visual explanation.
  - *Set subject, duration, social form:* options recognised and set without problems, but it was not visible that some parameters had already been extracted; after choosing a duration, further parameters suddenly activated → confusion. Still, "Vorschläge erstellen" (create suggestions) was perceived as the logical next step.
  - *Further parameters (curriculum competence, topic, digital tools):* mostly smooth, but the AI auto-generation function was not understood – only on questioning did it become clear he didn't know what role the AI plays.
- **Problems identified:** Konkretisieren vs. Schnellstart labels ambiguous; document upload / automatic parameter recognition not transparent; sudden parameter activation confusing; AI function not explained enough; parameter icons not distinct enough; parameter options too far from their buttons.
- **Positive aspects:** onboarding – the different entry options were perceived as successful; central CTA recognised and interpreted correctly; interest in features (clicked through to inform himself); "create suggestions" as natural next step.
- **Proposed fixes:** clearer wording or short explanations; visual step-by-step explanation or direct feedback on what was recognised in a document; tooltip or interactive introduction to the AI's role; options closer to their buttons.

### 6.3 Rethinking the input concept [doku p.44–46]
See D11–D13. Result: a non-linear setup screen "Setze den Rahmen für deine Aufgabe" (set the frame for your task) with a parameter sidebar, freely orderable inputs, per-parameter auto-fill, a create button available at any time ("create directly – missing details will be sensibly completed"), material-import notices and the status curve.

### 6.4 Card design iterations [doku p.60–63]
- **First drafts – minimalist but not child-friendly:** the curriculum was then split into four main categories (Grundlagen, Sicherheit, Beobachten, Hinterfragen – basics, safety, observing, questioning), so the first cards had only four colours and icons; thick frame in one of four colours, neutral background, abstract black character with an accent colour. Clear, but too plain – lacking colour, dynamics and playful appeal, which matter for long-term motivation → orient towards established trading cards like Pokémon.
- **Second draft – more action, unclear hierarchy:** children prefer colourful, dynamic cards, so the eight sub-categories of the curriculum became the new colour and icon structure; each sub-category has four competences → four cards per colour (8 × 4 = 32). Layout: about two thirds character motif, bottom third for a description text and four stat values; stats still named after the original categories and visualised with numbers plus dots. Problems: transparent background made the description hard to read; unclear stat hierarchy (numbers + dots too cluttered; larger numbers and iconic highlights tried without immediate success); inconsistent stat names (mix of nouns and verbs, too complex for children).
- **Revision – readability and structure:** description text on a solid, high-contrast (beige) background; stats as plain numbers in separate white boxes (after experimenting with bars, icons and dot displays); child-friendly, consistent verbs as stat names – **Wissen, Schützen, Beobachten, Prüfen** (know, protect, observe, check); a **large, central total number** shows the card's overall strength at a glance. Example card: "Mira – die Medien-Magierin" (Mira the media magician).
- **Card back:** had to fit all eight front colour schemes → a subtle repeating pattern of all category icons as a connecting element; a free name field at the bottom ("Ich gehöre in die Sammlung von:" – I belong to the collection of) so pupils can personalise cards and avoid mix-ups in class; branding with a technical look, mainly orange (main brand colour) plus the mascot, linking the cards to the "Smart Steps" tool.
- **Conclusion:** iterative testing and optimisation for the target group produced a card set that increases motivation and supports long-term retention; the cards were printed and played with by children (photos outdoors and at a table; demo video in a schoolyard). [doku p.63; endp 33]

## 7. Final design in detail

### 7.1 Style tile and grid [doku p.47–48]
- Font sample "Smart St…": title SemiBold, headers medium/bold, body styles.
- Colours: dark neutrals for font/CTA/disabled, light greys for strokes/backgrounds, bright orange for brand/selection/current position, **purple for AI content**; warm off-white UI.
- Icons: Google Material (outlined). Mascot: an orange robot with headphones reading a book.
- Adjective chips: efficient, flexible, supportive, adaptive, intuitive, delightful, AI-powered, insightful, structured, personalised, child-friendly, dynamic, smart, streamlined, guided, modern, customisable, user-friendly, innovative, time-saving → mood **"Balanced Modernity"**.
- Screen anatomy: A header (logo, navigation, profile, settings), B breadcrumb (progress, switch between steps), C context heading (phrased so users understand what to do without knowing the page name), D central input/selection area, E CTA (always leads to the next action or repeats a process), F adjustment area for content. Grid: 12 columns, 24 px gutter, 124 px column width, 24 px margin.

### 7.2 Final screen flow (main use case, example "Cybermobbing / Streit per Nachricht") [doku p.49–55; endp 22–31]
1. **Class** – assign to an existing class (e.g. 4b, 3a) or create a new one; determines grade level and where the task appears in the overview.
2. **Start method** – generate directly or define requirements first (both lead to the same goal; all parameters remain editable); quick start leads to use case 1.
3. **Material import** – upload worksheets, textbook pages, videos or links; the AI uses them as context and extends existing materials. A toast confirms: "the details from the material import were applied – adjust as needed".
4. **Duration** – predefined chips (15/30/45/60 min) or a slider; a time range can be given for more AI leeway.
5. **Competence** – detected from the uploaded document, but set to "auto-fill" so the AI adds suitable suggestions (AI chips in purple).
6. **Social form** – individual work chosen (ideal to close a gap in the lesson); other social forms would lead to different task formats.
7. **Digital tools** – without tools / with tools (opens a further menu for a specific tool) / not relevant; in the example no tools.
8. **Suggestion phase** – "These tasks are available": two AI suggestions side by side (e.g. "Freundschaft in Worten" and "Streit per Nachricht") with description, competences, social form, "select and adapt", "regenerate". The teacher picks cyberbullying because it fits the current unit on friendship and offers an important level of reflection.
9. **Task editor** – lengthen the duration via dropdown (the topic is extensive) and read the media context of the task.
10. **Practice-guide editor** – overview of the generated guide (preparation, step-by-step pupil task, classroom procedure) in modular blocks; hovering shows plus icons to add free text.
11. **Add text and a note** – extra content in the task module plus a note on the last step to ease lesson reflection.
12. **Differentiation** – extend the task with an easier variant for weaker pupils via a context menu.
- Example output shown in the presentation: "Streit per Nachricht – Wie verändert sich die Wirkung von Nachrichten?" (Argument by message – how does the effect of messages change?), class 4b, 06.02.2025. Learning goals – media: pupils recognise that digital communication works differently from face-to-face conversation and that emotions/intentions get lost without non-verbal cues; subject: dialogue writing, word choice, strategies against misunderstandings. Preparation: paper, pens, optionally the board; 10–15 min. Pupil task: choose a typical argument situation, write a dialogue, turn it into a chat message (e.g. WhatsApp), compare and reflect, develop tips/three rules for respectful digital communication. Classroom procedure: intro 5 min, work 20 min, discussion 5 min, with moderation hints. A side note card ("get poster paper for the classroom…"); change history, undo/redo, preview. [endp 30–31]

### 7.3 Overview dashboard [doku p.55; endp 14]
- Individual teacher dashboard: every created task is saved; the overview shows which media competences are already covered by tasks.
- Integration with the media-education curriculum: each task is automatically assigned to a competence; teachers can check "Have I already created a task on fake news?" or "Which aspects of media criticism are still missing in my teaching?"
- Benefit: instead of a loose collection of tasks, a structured overview oriented to the curriculum – plan media education deliberately and long-term.
- Presentation example: "Übersicht Medienbildungs-Lehrplan" with class progress 62.5 %, eight competence cards (intro lesson, getting to know media, intro to the internet, safe on the internet, social networks, advertising & consumption, media analysis, media and their effects), each with a progress bar and "new task", plus a table of already created tasks (title, date, subject, competence, status).

### 7.4 Landing page [doku p.56–57]
- Hero "Medienbildung durch individuelle Aufgaben" (media education through individual tasks) with laptop and worksheet mockups and a CTA; tiles: how it works, starter set, example tasks; video section; feature list (generate tasks, adapt in the editor, progress overview, top-trump-style playing cards); banner "Discover our starter set – your introduction to media education".
- "Why SmartSteps?" benefits: individual adaptation, time saving, sharing, early prevention; "Our partners" with photos of primary schools; teacher testimonials (fictional "Frau Meier", "Herr Keller" with star ratings – mock content); FAQ ("What can I do with this tool?", "Must I upload my own document?", "Can tasks be edited later?").
- The partner section raised the question in testing whether access depends on a partnership. [doku p.42]

### 7.5 The PDF practice guide [doku p.58–59; Abb. 7]
- A multi-page, clearly structured PDF that serves as a complete lesson guide, usable digitally and printed.
- Page 1: large cover image visualising the unit's topic, with an overlay box summarising all inputs – parameter input (subject, topic, curriculum category etc.), material input and the media-pedagogical competence; below, a large heading and a short description of content and goal.
- Content blocks, each with heading and icon: **Learning goals** (media-pedagogical and subject-specific; highlighted), **Preparation** (preparation time and materials), **Task for pupils** (short description + step-by-step guide), **Classroom procedure** (time and moderation hints), **Follow-up and reflection** (discussion questions, feedback options), **Media-education comment** (background knowledge and hints on possible challenges; highlighted to stress the didactic value), **Additional materials** (links, examples, supplementary content).
- Extensions added in the editor (e.g. a differentiation task) appear in their block marked with a small purple "Erweiterung" (extension) tag.
- A free notes column on the right of every page for personal, also handwritten, notes after printing.

## 8. Technical prototype [prompts.py; app.py; src; package.json; doku p.30–34]
- **Frontend:** React 18 + Vite 6, React Router 7, react-markdown, ESLint; project name "leantwo". Components: LandingPageOld (create-task button, example, FAQ, feature, video sections, logo, nav), Material-import (grade selection, material upload), PreInput, SetUp (AufgabenSetUp with breadcrumb, content panels per parameter – task type, duration, digital tools, competence, subject, social form, topic – duration slider, info pop-up, parameter input, selector, sidebar, status indicator), TaskDetail, TaskPreview, TaskSummaries, ToggleSwitch, common (AutoFillButton, Header); styles for buttons, colours and text styles.
- **Backend:** Flask with CORS; endpoint `POST /generate-tasks` reads subject, competency, topic, social_form, duration, task_type, digital_tools from the form, builds the prompt with `create_task_prompt` and calls OpenAI's reasoning model **o1-mini** via the chat completions API; returns the generated task(s) with a timestamp. The API key is loaded from an environment file (not part of the portfolio).
- **prompts.py:**
  - `MEDIA_COMPETENCY_PLAN` – the curriculum as a CSV string: 7 competence areas, each with a description and four contents: Medien kennenlernen (media types, media history, structuring media content into information/entertainment/advertising, media technologies), Einführung des Internets (browsers and search engines, evaluating sources, connections and shared workspaces, online communication), Sicher im Internet (minimising digital footprints, recognising dangers like viruses, phishing, cyber-grooming, device security, creating passwords), Soziale Netzwerke (safe profiles, preventing cyberbullying, using opportunities, communication rules), Werbung und Konsum (advertising mechanisms, product placements, critical consumption, advertising vs. reality), Medienanalyse (recognising fake news, visual manipulation, responsibility of media makers, valuing diverse sources), Medien und ihre Wirkung (reflecting screen time, describing others' media use, media dependency, effects of media content).
  - `create_task_prompt` – German cloze-style prompt: "You are an AI model that supports teachers in designing individual and targeted lesson tasks. Create a task for grade 3 in subject {subject}…" with competence, topic, social form, duration, task type and digital tools inserted; each optional field carries the hint "if this value contains 'auto fill', determine a suitable … based on the context"; instructs the model to pick a "content" from one competence area of the curriculum; enforces an exact output structure: used parameters (incl. the selected curriculum content) → full task concept (title, concise guiding question, max. 3-sentence introduction on relevance and competences) → task for pupils in simple, clear language with a central reflection question → five steps; extra rules: keep the structure exactly, clear language suitable for pupils, sensible formatting, max. 3 sentences per section.
  - Field-specific helper prompts: `media_competency_prompt` (choose a fitting content competence from the plan and return it verbatim), `social_form_prompt`, `task_format_prompt`, `digital_tools_prompt` (each: consider grade, subject and current topic; return only the value, no explanation) – the "dynamic prompts per field" described in the documentation.
  - `SYSTEM_TASK_PROMPT` – generate tasks EXACTLY in an HTML structure with CSS classes (task-wrapper, task-title, task-subtitle, learning-objectives incl. a media-competence item, preparation, implementation) matching official curricula and promoting media-education competences.
  - `SUMMARY_PROMPT` – return valid JSON only: Titel (max 40 chars), Beschreibung (max 180 chars), Kompetenzbereich, Kompetenzbeschreibung, KI-Ergänzung (parameters added by the AI). Also shown in the documentation as Abb. 5.
- **Prototype vs. concept:** the coded backend generates one task per request and does not yet call the summary prompt; the two-variant flow, practice-guide editor, overview dashboard and PDF output are shown in the Figma click dummy and documentation. Grade is hard-coded to 3 in the prompt. Sample uploads during development were purchased worksheets from Eduki (third-party, not part of the portfolio).
- **Curriculum versions:** the earlier curriculum CSV (Medienkompetenzlehrplan.csv) groups topics under Grundlagen, Sicherheit, Beobachten (plus "Medien und ihre Wirkung") with sub-points and content competences – e.g. Sicherheit: digital footprints, online games and cyber-grooming, viruses and downloads; social networks and cyberbullying; Beobachten: advertising forms, advertising and children, fake news and disinformation, critically questioning texts, images and videos; effects: thinking and behaviour, images and language, too much screen time. The later prompt version reorganised this into 7 areas × 4 contents. [lehrplan; prompts.py]

## 9. Outcome, limitations, outlook

- **Conclusion (team):** the challenge was a system with enough freedom for individual adaptation yet clear structures to guarantee quality. Generative AI can create powerful content but without clear control often delivers unsuitable or superficial results – generic tasks with little relation to the actual lesson – and too many options or unclear structures overwhelm teachers. The answer: combine precision with intuition – step-by-step guidance and intelligent suggestions secure quality without taking away creative control. "AI in education should not be seen as a replacement for the teacher but as a tool that supports, guides and optimises… combining automation with pedagogical responsibility – technology that lets teachers focus on what matters: good teaching." [doku p.64, p.66]
- **Vision:** "Die Zukunft: Medien sind allgegenwärtig. Kritisches Denken muss es auch sein." (The future: media are everywhere – critical thinking must be too.) Long-term goal: media education as a fixed part of lessons. „Medienbildung ist keine Option, sondern eine Notwendigkeit." (Media education is not an option but a necessity.) [endp 34]
- **Validation and limitations:** one think-aloud usability test with a teacher on the first design prototype; card testing with children; earlier, the "Internet-Detektive" workshop with 4th graders. No quantitative metrics; the final hybrid setup was not re-tested in the sources; the coded prototype covers task generation only.
- **Outlook / potential extensions** [doku p.64–65]:
  - *Lesson design:* an integrated worksheet editor for pupils' materials (no switching between tools, tasks also appealing and easy to understand for pupils) → a holistic platform for planning and material creation.
  - *Networking among teachers:* a community/sharing function like Eduki to share tasks and access proven materials; use in teacher training (references to further training, inclusion in teacher education, a dynamic feed of current media-pedagogical topics so tasks keep up with current events and the zeitgeist).
  - *Personalisation:* auto-completion based on teacher and class profiles (more tailored and possibly faster – but maintaining the data could again cost teachers time); preferences and history for personalised recommendations; systematic feedback on created tasks to improve both materials and the tool.

## 10. Fabrice's role
- Fabrice's role: lead responsibility for prototyping, development – building the software – and testing; also worked on ideation, research, concept and the design [stated by Fabrice]. The project was a team of four.
- How this shows in the project:
  - **Ideation and concept:** the morphological box, the narrowing from prevention idea to MVP, the three use cases and the human–AI division of labour (4.1–4.5).
  - **Research:** the design sprint, the scenario workshop and the interviews (section 2).
  - **Prototyping (lead):** the node-system prototype, the click dummy and the iterations of the setup screen (6.1–6.3).
  - **Development (lead):** the coded prototype (section 8) – React + Vite frontend with setup sidebar, parameter inputs, status indicator and task views; Flask backend with the `/generate-tasks` endpoint calling OpenAI's o1-mini; the German cloze-style prompts with the embedded media-education curriculum.
  - **Testing (lead):** the think-aloud usability test with a primary-school teacher (6.2) and the prompt test rounds (4.3).
  - **Design:** worked on the design of the final tool (section 7); the sources don't specify which parts.

## 11. Inconsistencies in the sources
- Persona Frau Keller: card header 58, text 29; Herr Schmidt (42) and Frau Keller are labelled "Kurz vor der Rente" (close to retirement) – a template leftover. [doku p.20–21]
- Number of curriculum areas: documentation says seven main areas with four contents each (28), while the card system and overview use eight sub-categories × 4 = 32 cards (the overview adds an "intro lesson" card). [doku p.34, p.61; endp 14]
- The documentation describes two separately generated variants and summaries; the coded backend returns one task and doesn't use the summary prompt. [doku p.32; app.py]
- The stakeholder-map text partly addresses "ihr/euch" (you), apparently from feedback text left in. [doku p.24]

## 12. Quote bank (original → translation)
- LMZ expert: „Man muss natürlich immer schauen, was die Schulen überhaupt an technischer Ausstattung haben und ob die Lehrer die Kompetenzen dafür besitzen." → "You always have to look at what technical equipment schools have and whether teachers have the skills."
- LMZ expert: „Da muss man immer zeitlich schauen, wie kann ich es integrieren, damit nicht deutschtechnisch was runterfällt." → "You always have to see how to fit it in so nothing in German gets dropped."
- LMZ expert: „Das ist nicht jeden Tag gleich, sondern man setzt es ein, wie es gerade passt." → "It isn't the same every day; you use it when it fits."
- LMZ expert: „Das hat einfach eine Motivation entfacht, und die sind dann so da drin versunken." → "It sparked real motivation – they were completely absorbed."
- LMZ expert: „Ah toll, damit kann ich programmieren, damit kann ich ein digitales Buch herstellen." → "Great, I can program with this, I can make a digital book."
- LMZ expert: „Wenn alles schon da ist, wird es, glaube ich, noch reibungsloser und selbstverständlicher ablaufen." → "Once everything is in place, it will run even more smoothly and naturally."
- Teacher journey: „Habe ich die richtige Methode gewählt? Wird es klappen? Schaffe ich alles rechtzeitig?" → "Did I choose the right method? Will it work? Will I get everything done in time?"
- Persona Frau Meier: „Ich möchte schnell eine Aufgabe generieren, um das Tool zu testen." → "I want to quickly generate a task to test the tool."
- Persona Herr Schmidt: „Mir ist wichtig, dass die Aufgabe genau in meine Unterrichtsstunde passt." → "It's important to me that the task fits my lesson exactly."
- Persona Frau Keller: „Ich möchte gezielt Medienkompetenzen in meinen Unterricht integrieren." → "I want to integrate media competences into my teaching deliberately."
- Final presentation: „Aber wie gut verstehen Kinder eigentlich, was hinter den Medien steckt?" → "But how well do children actually understand what is behind the media?"
- Final presentation: „Präzision vs. Flexibilität: Wie viel Kontrolle braucht es bei der Aufgabenerstellung?" → "Precision vs. flexibility: how much control does task creation need?"
- Final presentation: „Medienbildung ist keine Option, sondern eine Notwendigkeit." → "Media education is not an option but a necessity."
