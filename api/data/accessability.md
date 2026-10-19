# AccessAbility – Project dossier

> Curated summary written from the project sources. References in brackets: [doku p.N = AccessAbility_Doku.pdf (95-page documentation, German) page N, praesi N = AccessAbility_Präsi.pdf slide N, poster = exhibition poster]. Statements marked **(open question)** need input from Fabrice.

## At a glance

- **What:** A modular control system for electric wheelchairs – an exchangeable control module (joystick, power button, LED status ring, turn-signal light) on individually selected bases with interchangeable joystick tops, plus a B2B tablet app with which sales advisers scan a user's hand and arm and configure the right combination. [poster; doku p.69–87]
- **Context:** Interface Design 2, Interaction Design B.A., HfG Schwäbisch Gmünd, summer semester 2023 (4th semester). Supervisor: Prof. Carmen Hartmann-Menzel. Research ran in April 2023. [poster; doku p.24–27]
- **Team:** Anton Stallbörger, Fabrice Rio, Jun Wang (three students). [doku p.1]
- **Type of work:** physical product and interaction design with a service-design component – user research, ergonomic prototyping in clay, Kapa/foam and 3D print, 3D renderings, tablet UI.
- **Fabrice's role:** Lead responsibility for 3D modelling, hardware prototyping, 3D printing and testing; also worked on rendering, concept, interviewing and documentation [stated by Fabrice]. The project was a team of three. In the sources this maps to the physical prototype rounds (clay → Kapa/foam → 3D print), the 3D renderings of the final product family, the user and expert tests, the wheelchair-user interviews and the 95-page documentation.
- **Process:** four phases – Entdecken (discover), Definieren (define), Entwerfen (design), Fazit (conclusion). [doku p.2–3]

## Problem

Electric-wheelchair users have very individual needs and very different impairments, yet existing control systems all follow the same joystick-plus-buttons pattern and are each suited to only one specific target group. "No single model is suitable for all people, especially those with disabilities." [poster; doku p.9; praesi 5]

The team started from a broader mobility exploration (delivery and taxi drivers, emergency services, public transport; haptic display technologies such as ultrasonic or vibration feedback to reduce distraction while driving) and then chose wheelchair control because they saw considerable potential for improvement. [doku p.6–7]

## Research

- **Desk research and benchmark** of existing power-wheelchair controllers (joystick boxes with button rows, LED bars, colour displays). [doku p.8–9]
- **Function analysis:** a function tree of a typical control – joystick (direction, acceleration), buttons (horn, light, speed, turn signal, hazard lights, seat position, on/off, profiles, mode) and display (navigation, settings such as sensitivity/brightness/driving assistants/feedback volume, battery status, speed, clock, mode). [doku p.10–11]
- **Stakeholder map** (power × interest): manage closely – manufacturers, disabled users, very old users; keep satisfied – TÜV, health insurers; keep informed – sales advisers, family members; monitor – clinics/rehab, carers, medical-supply stores. [doku p.12–13]
- **Online survey** in Facebook groups of wheelchair users (about 30 respondents; many over 60): demographics, usage time and activities, satisfaction (usability, reliability, safety, adaptability, cost), existing functions, learning time and what was hardest to learn, comfort of hand/arm posture, precision on uneven ground and in crowds, app use. [doku p.14–19; praesi 7–8]
  - Functions present: on/off and direction ~97 %, speed control ~93 %, speed-mode selection ~87 %, lights ~70 %, seat position ~50 %, profiles ~40 %, Bluetooth/footrest adjustment rare. [praesi 7]
  - Hand mobility differs widely and often between left and right hand – from "only fingers movable" to "hand and arm fully movable". [doku p.15; praesi 8]
  - Most respondents don't use an app for their wheelchair. [doku p.16]
- **Four in-depth interviews** with wheelchair users (partly at home, April 2023), using a guide on use, functions, speed, terrain, joystick calibration, everyday challenges, financing, learning time, important features and wished-for functions. Each interview was documented in a dashboard with answers, clustered notes, photos and videos. [doku p.20–27; conclusion p.94] Key findings:
  - *Older user (71, in a care home, 6–7 years):* learned the control in ~5 minutes; max 10 km/h; cobblestones and sensitive control are difficult; relies on help to go out and fears breakdowns when alone; poor rear view; the wheelchair was assigned and paid for, not chosen. Wishes: battery and speed display, seat adjustment, backup electronics, GPS tracker/emergency button. [doku p.24]
  - *Everyday user:* uses it for shopping and carrying; kerbs and uneven ground are hardest; learned in 2–3 days; horn and speed matter; wishes a jerk-free joystick. [doku p.25]
  - *Experienced young user (23, 10+ years):* uses modes, cruise control, standby, regenerative braking; 7 km/h max (8 km/h upgrade costs €100, insurers pay only essentials); meadows and gravel drain the battery; some settings only adjustable by the medical-supply store; control "not personalisable" and "very imprecise"; metal grip parts get very cold or hot; learned in 3–4 weeks; wishes a kerb mode, navigation/phone connection, rain protection. [doku p.27]
  - *Relative of a new user* (helping his father, who had used the wheelchair for about 4 months). [doku p.22]
- **Self-test:** the team test-drove a Quickie Q700 power wheelchair in a medical-supply store with an industry developer and a store adviser. [doku p.32–33]
- **User journey map** of the self-test (learning to control → test driving → testing functions → testing seat position): acceleration pleasant, very slow in curves, braking distance not adjustable, turning on the spot possible, not having to look at a display helps avoid accidents. Opportunities: adjustable braking strength, cruise control, haptic and better button feedback. [doku p.28–29]
- **Question Zero** canvas (what, what for, for whom, where, why, status quo, how) to fix the project frame. [doku p.30–31]

## Define

- **Persona:** Mark, 40, product designer, lives with wife and child, paraplegic after an accident; values good design, quality, aesthetics and innovation; dislikes disorder and things that don't work. [doku p.38; praesi 27–28]
- **User need statements:** "Users of electric wheelchairs need a control system with modular options for joystick choice and model shape so they can adapt their wheelchair to individual preferences and needs." And: Mark "needs a reliable control he can use on smooth roads and gravel, to be restricted as little as possible by his disability in everyday life." [doku p.34–35]
- **How-might-we:** a control that is easy to learn and ergonomic; integrate all necessary and additional functions; make the control individualisable for different situations; restrict users as little as possible in everyday life. [doku p.42–43]
- **Kano model:** basics – horn, light, direction, hazard lights, speed, battery status, on/off, turn signal; performance – mode, profiles, brightness, seat position, footrest height, settings, sensitivity; delighters – emergency/GPS, standing function, clock, smartphone holder, Bluetooth, feedback volume. [doku p.44–45]
- **MoSCoW:** must – horn, speed, direction, on/off, battery status, hazard lights, brake, turn signal; should – brightness, seat position, footrest height, mode, sensitivity, light; could – clock, Bluetooth, navigation, emergency/GPS, profiles, settings, driving assistants, feedback volume; won't – standing function, smartphone holder. Requirements: reliable, responsive control with interchangeable joysticks and grip aids; should: adjustable sensitivity and grip sizes; could: voice or gesture control. [doku p.40, p.50]
- **Name:** ten candidates (SmartRoll, FreedomMotion, EasyGlide, EmpowerChair, ModuChair …); "AccessAbility" chosen unanimously for the word play. [doku p.41, p.48]

## Design process and iterations

1. **Ideation:** sketches of basic input forms (joystick, knob, fixed joystick, armrest support, ball with buttons, free-floating joystick) and Crazy 8s borrowing from game controllers, drone controllers and car controls. [doku p.46, p.52]
2. **Prototype I – three clay grip models** sized for different hand sizes, testing where joystick, horn, turn signal, speed and brake should sit. [doku p.47]
3. **User testing** with many people: Model 3 preferred (slim, fits different hand sizes, intuitive); criticism included buttons too far forward, confusing button pairs, too big/heavy for small hands, unclear elements; one tester suggested a "lazy button" to drive without holding the joystick forward. [doku p.53, p.56; praesi 3]
4. **Concept revision – the key insight:** no single model fits everyone → split the controller into freely combinable parts (also saves budget). Functions reduced to the essentials: steering, turn signals, horn and switches. All main functions go into one main module that combines with different external bases. [doku p.54]
5. **Three user groups** with their own design focus: [doku p.54, p.59; praesi 11–13]
   - *Only fingers usable* → device operated in a fixed position, shaped after computer-mouse ergonomics.
   - *Whole hand usable* → comfortable wrist angle; turn signal moved to the back because the front was too crowded.
   - *Whole arm usable but imprecise* → more hand support and a fixed base; only the upper part is exchangeable (cost saving).
6. **Prototype II** – two external models (hand/arm free vs. fingers only) plus interchangeable direction-control tops; clay bases with separate square button modules. [doku p.57–60]
7. **Prototype III** – progression from clay to Kapa/foam to 3D print; plug-in modules tested on a wheelchair armrest. [doku p.61–68; praesi 15–19]
8. **Expert testing** with rehab experts. Positive: the concept supports people with hand tremor; fixing the hand helps precision; rests and side buttons are good. Suggestions: on/off-style control, thumb or index-finger operation (thumb probably best), the lower module offers more options, arm ergonomics (30° upward when resting), different top systems (length, ball). Further steps: add a joint, contact wheelchair manufacturers (standard vs. premium customised options), respect the budget. [doku p.66, p.71; praesi 34–36]

## Final design

- **Model 1:** slim grip base with square joystick module; buttons in different sizes for different hand sizes. [doku p.70]
- **Model 2:** rounded base with interchangeable tops (knob joystick, forked hand cradle, dome) for people with different disabilities. [doku p.74]
- **Module details:** turquoise LED ring around the joystick showing direction, illuminated power button doubling as battery indicator, red light strip as front turn signal, ribbed slider on the back for the turn signal, horn integrated into a soft leather front surface; usable on either side of the wheelchair. [doku p.73–80; poster]
- **Service system (tablet app for advisers):** customer list with wheelchair models; customer profile with a radar chart (strength, mobility, concentration, fine motor skills) and left/right hand cards; on-site **arm and hand scan** (back and side of the hand, "place the arm on a comfortable surface and keep it still", result e.g. sensitivity and size); **configurator** for base form, joystick top and armrest with unavailable options greyed out; "create control module" and stock check. [doku p.78–87; praesi 31]
- **Style guide** for the app: Inter typeface, black/light grey/white with a green accent, outline and filled buttons, line icons. [doku p.88–89; praesi 32]
- **Wheelchair simulator:** the control concept can be experienced by using Microsoft's Adaptive Accessories instead of the module to drive a "Wheelchair Simulator" game. [doku p.90–91]

## Outcomes and reflection

- No quantitative results; validation consisted of user tests of the clay models and expert feedback. [doku p.56, p.66]
- Team reflection: visited wheelchair users at home to understand their daily journeys, visited many rehab shops to learn how the right wheelchair is recommended, iterated to make the design usable for more people; "an exhausting project, but we had a lot of fun." [doku p.94]

## Open questions for Fabrice (not answerable from the sources)

- Which tools were used (e.g. Figma, CAD software, renderer, 3D printer)?
- Any later development or recognition (e.g. exhibition feedback)?

---

# AccessAbility – Deep dive

> Complete, question-oriented synthesis of the AccessAbility project. Companion to the short dossier. Organised as: frame & process → research synthesis (every source) → define → decision log → design iterations → final design in detail → outcome & limitations → quote bank.
> Source keys: [doku p.N] = AccessAbility_Doku.pdf page N (95 pages, German; text read via OCR, so a few words are reconstructed); [praesi N] = AccessAbility_Präsi slide N (English); [poster] = semester-exhibition poster. Interviewees are pseudonymised (Interviewee 1–4). German quotes are kept in the original with an English translation.

## 1. Project frame and process

- Course "Interface Design 2", Interaction Design B.A., HfG Schwäbisch Gmünd, summer semester 2023 (4th semester). Supervisor: Prof. Carmen Hartmann-Menzel. Team of three: Anton Stallbörger, Fabrice Rio, Jun Wang. [poster; doku p.1]
- One-line summary (poster): "AccessAbility is a project to improve the control of electric wheelchairs. Wheelchair users have very individual needs and many different impairments. Current control systems have one thing in common: they are only ever suitable for one specific target group. To solve this, we developed a modular system that can be individually adapted and therefore covers a wider range of impairments than previous systems." [poster]
- Deliverables: research (desk research, survey, interviews, self-test), define artefacts (persona, need statements, HMW, Kano, MoSCoW), three rounds of physical prototypes (clay → Kapa/foam → 3D print), expert testing, 3D renderings of the final product family, a B2B service app for sales advisers (tablet UI with hand/arm scan and configurator), a style guide, a simulator concept, a 95-page documentation, a presentation and an exhibition poster. [doku p.2–3]
- Process: four phases – **01 Entdecken** (discover: topic finding, research, stakeholder map, survey, interviews, Question Zero, self-test, journey map), **02 Definieren** (define: persona, user need statement, HMW, Kano, MoSCoW, name), **03 Entwerfen** (design: Crazy 8, Prototype I, user testing, concept revision, Prototype II, Prototype III, expert testing, 3D model & renderings, service system, style guide, simulator), **04 Fazit** (conclusion). [doku p.2–3]
- Timeline evidence: interviews took place in April 2023 (14.04., 16.04., 22.04.2023). [doku p.24–27]
- Presentation structure (English, held after Prototype I): 01 Review → 02 New Design → 03 New Prototype → 04 Realization → 05 Service Design → 06 Expert advice. [praesi 2–36]

## 2. Research synthesis

### 2.1 Topic finding [doku p.6–7]
- The team agreed early to work on **mobility**. First idea: choose a specific target group in the automotive industry and research further. Explored target groups: package and food delivery, taxis, bus drivers, emergency services, technicians, public transport, ride-sharing drivers.
- Second idea: use **haptic display technology** in cars to reduce distraction while driving. Technologies looked at: high voltage on actuators, ultrasonic springs, liquid injection, vibration. Advantages noted: more intuitive operation, less distraction, better feedback on different buttons. Application areas: smartphones, car interiors, industrial machines, online shopping, exhibitions.
- Pivot: they came across the **control of electric wheelchairs** and recognised "considerable potential for improvement" → chose this topic. The interest in tactile feedback and distraction-free operation carried over (e.g. "not having to look at a display" in the self-test, haptic/LED feedback in the final module).

### 2.2 Desk research and benchmark [doku p.8–9]
- Goal: understand the current state – what electric-wheelchair controls look like today and how they are built.
- Benchmark of five existing controllers: classic joystick boxes with rows of buttons and LED bars, controllers with colour screens (e.g. a LiNX unit), armrest-mounted modules. Observation: **all follow the same joystick-plus-buttons pattern designed for one standard user.**

### 2.3 Function analysis [doku p.10–11]
- Function tree of a typical power-wheelchair control:
  - **Joystick:** direction, acceleration.
  - **Buttons:** horn, light, speed, turn signal, hazard lights, seat position, on/off, profiles, mode.
  - **Display:** navigation; settings (sensitivity, brightness, driving assistants, feedback volume); battery status; speed; clock; mode.
- This inventory later fed Kano and MoSCoW.

### 2.4 Stakeholder map [doku p.12–13]
- Stakeholders sorted by interest and influence "to find out whose needs we must address most strongly and which factors we also need to keep in view".
- **Manage closely:** manufacturers, disabled users, very old users. **Keep satisfied:** TÜV (testing/certification body), health insurers. **Keep informed:** sales advisers/consultants, family members. **Monitor:** clinics/rehab, carers, medical-supply stores.
- Implication: users and manufacturers are the key players; insurers and advisers control access to wheelchairs – which later motivated the B2B service system for advisers.

### 2.5 Online survey [doku p.14–19; praesi 7–8]
- Conducted in several **Facebook groups where wheelchair users exchange**; about 30 responses; many respondents were over 60 (age groups ranged from 20–29 to over 60).
- Question map (mandatory and optional): gender, age, cause, how long in a wheelchair, daily usage hours, activities (e.g. shopping, walks, museums), wheelchair type/manufacturer, contact; ratings of usability, reliability, safety, adaptability to individual needs, and cost vs. benefit of electric wheelchairs; everyday experiences; which functions the control system has (display with basic info – battery, speed, time; joystick for direction; buttons for seat position, horn, on/off; light; speed mode); whether an app is used for control; precision on uneven terrain; manoeuvring on crowded streets; time needed to learn the control (from under 10 minutes to under a month); what was hardest when learning (getting used to the speed, controlling direction, watching the road); comfort of hand and arm posture (scale 1–4); left and right hand mobility.
- Analysis focus: how strongly users are restricted in movement, which functions their wheelchairs have, what was hardest to learn, in which situations the wheelchair is used and which problems occur.
- **Results:**
  - Functions present in respondents' controls: on/off and direction ~97 %, speed control ~93 %, speed-mode selection ~87 %, lights ~70 %, seat position ~50 %, profiles ~40 %, Bluetooth and footrest adjustment only a few percent. [praesi 7]
  - **Hand mobility varies widely and is often asymmetric between left and right hand** – categories: only fingers movable; hand flexibly movable; hand and arm limited; hand and arm fully movable; can carry heavy things. Most respondents are in "hand flexibly movable" or "hand and arm fully movable", but there are distinct groups with only finger mobility or limited arm mobility. [doku p.15; praesi 8]
  - Most respondents do not use an app for their wheelchair. [doku p.16]
- This evidence justified designing for **different mobility levels** rather than one standard hand.

### 2.6 Interviews with wheelchair users [doku p.20–27, p.94]
- To go deeper, the team wrote an interview guide and talked to **four** people, partly visiting them at home to see their daily routes. Each interview was documented in a **dashboard** with questions/answers colour-coded (needs/functions, challenges, experiences, improvement ideas), clustered notes, photos and videos.
- Guide: What is the wheelchair used for? Which functions does it have (joystick / wheelchair)? Maximum speed? Which terrain or obstacles are hardest? Difficulties calibrating or adjusting the joystick? Everyday challenges? How is it financed? How long did it take to learn the control? Which functions and properties matter? Why this wheelchair (advantage, adviser)? "If you could equip your joystick with a special function, what would you wish for?" (prompts: navigation, automatic stop when something passes fast or there is danger).
- **Interviewee 1** (71, retired gear maker, 6–7 years in an electric wheelchair, lives in a care home; interview 16.04.2023): uses it for short distances but everywhere; battery sufficient; **max 10 km/h**; cobblestones difficult; **sensitive control is difficult**; relies on help to dare to go out and is **afraid when alone and the wheelchair breaks down**; buying trousers is difficult; **rear view is poor**; financed by the health insurer/care home – the **wheelchair was assigned, he could not choose it**; learned the control very quickly (about 5 minutes); ergonomics good, no complaints over long periods; the same control as his old one. Wishes: **display for battery status and speed levels**, seat adjustment ("would be very practical / more variety"), **backup electronics to prevent total failure**, **GPS tracker / emergency button**, telling carers that he is going out (carers could see via GPS where he is). A joystick test was filmed.
- **Interviewee 2** (interview 22.04.2023; photos of him in town with a shopping basket on his lap): uses it for carrying things and shopping, not at home; functions: seat and foot adjustment, horn, light, speed, hazard lights; **uneven ground and kerbs** are hardest; financed by the health insurer; learned in **2–3 days**; horn and speed matter; the wheelchair was assigned; wish: a **jerk-free joystick** („ruckelfreier Joystick“).
- **Interviewee 3** (23, works at a health insurer, more than 10 years in an electric wheelchair; interview 14.04.2023): uses it for distances above ~500 m on any terrain. Functions: modes "sensitive / supersensitive"; cruise control – it starts after a short push and holds the speed; standby mode; regenerative charging when braking; good dismantling for flying ("flight mode" = automatic discharge for air travel). **7 km/h max** – an upgrade to 8 km/h costs €100, and **the insurer pays only the bare essentials**. Meadows and gravel are difficult and drain the battery; high supermarket shelves are out of reach; **some settings can only be changed by the medical-supply store**; public spaces with crowds are difficult (in big crowds he rather drives manually); battery not removable, so the wheelchair has to be charged in the flat (long charging time); **cruise-control feedback lights dazzle**; works despite a weak battery, range ~25 km; **"not personalisable"**; **"very imprecise control"**; the seat control on the outside of the wheelchair leads to accidental operation; **metal push rims get extremely cold or hot**; small choice of cruise-control settings; there is an app but he doesn't use it; learned in **3–4 weeks**; advised by the medical-supply store; chose this model because it is more robust. Wishes: **kerb mode** (more power at kerbs), **navigation** ("would be really cool"), connection between phone and wheelchair (currently no connectivity to other devices), **rain protection**.
- **Interviewee 4** (21, student): supports his father, who has needed an electric wheelchair for about 4 months because he can no longer walk – the perspective of a relative helping a new user (sparse notes).
- **Synthesis across interviews:**
  - Learning time varies from minutes to weeks.
  - Precision and smoothness are recurring frustrations (sensitive / imprecise / jerky control).
  - Terrain (cobblestones, kerbs, gravel, meadows) and crowds are the hardest situations.
  - Users rarely choose their wheelchair – it is assigned and financed by insurers, who pay only essentials; settings are locked to the medical-supply store → **lack of personalisation**.
  - Safety and reliability concerns dominate for older users (breakdowns, emergency button, backup electronics).
  - Material and comfort issues: metal parts too cold or hot, dazzling feedback lights.

### 2.7 Self-test in a medical-supply store [doku p.28–29, p.32–33]
- To understand what it feels like to steer an electric wheelchair, the team tested one in a medical-supply store. An **industry developer** provided a **Quickie Q700** (a very modern, well-equipped power wheelchair); together with the developer and a store adviser they tested the functions, and each team member did a test drive.
- Results were mapped in a **user journey map** with a proto-persona (a team member: design student in Schwäbisch Gmünd, technically interested, first time in an electric wheelchair). Stages: **learning to control → test driving → testing functions → testing seat position**, with user actions, goals and experiences, feelings and thoughts, and opportunities.
- Observations: driving in circles, forwards, backwards, left/right, stopping, trying all driving options; **acceleration pleasant** (could be a bit faster); **very slow in curves** (no separate thrust control); **braking distance/strength cannot be adjusted on the spot**; can turn on the spot; **not having to look at a display constantly helps avoid accidents**.
- Opportunities: braking strength/braking distance adjustable in the interface; add cruise control; haptic feedback; better button feedback.
- In the conclusion the team also mentions visiting **many rehab shops** to learn how the right wheelchair is recommended to a user. [doku p.94]

### 2.8 Question Zero [doku p.30–31]
- Canvas used to define the frame and focus, and as a reference point throughout: What (object – what should the solution be, what is the minimum result?), What for (purpose – why does the problem exist, which user problem is addressed?), For whom (target group), Where (context – spatial, geographic, situation), Why (goal – why is it relevant, which principle should it support, e.g. simplicity, experience, customer experience?), Status quo (are there substitute products to replace?), How (technology). The sticky-note contents are not legible in the source.

## 3. Define

### 3.1 Persona [doku p.34–39; praesi 27–28]
- **Mark** (spelled "Marc" once), 40, product designer, lives with his wife (the persona canvas also mentions a child) in a flat. Values good design, quality, aesthetics, functionality, innovation. Daily: work, walks with the family, reading, museums/fairs. Friends describe him as orderly, helpful, creative, relaxed, intellectual. When unsure he asks his wife, ChatGPT or colleagues. Few people know he is picky, a perfectionist, curious and lazy. Annoyed when something doesn't work and by disorder. Living room: books, plants, wheelchair. Disability: paraplegia after an accident – he can't move his legs; the electric wheelchair is practical for longer distances and hills.
- Role in the project: a design-literate, active user who expects quality and aesthetics rather than a "medical device" look – explains the attention to materials (soft leather), light and renderings.

### 3.2 Need statements [doku p.34–35]
- General: „Benutzer:innen von Elektrorollstühlen benötigen ein Steuersystem, das modulare Optionen für die Auswahl des Joysticks und die Form des Modells bietet, damit sie ihren Rollstuhl nach ihren individuellen Vorlieben und Bedürfnissen anpassen können." (Users of electric wheelchairs need a control system with modular options for joystick choice and model shape so they can adapt their wheelchair to individual preferences and needs.)
- Persona-based: "Mark, a product designer who has used an electric wheelchair for 5 years, needs a wheelchair with a reliable control that he can operate without problems on smooth roads as well as on gravel, to be restricted as little as possible by his disability in everyday life."

### 3.3 How-might-we questions [doku p.42–43; praesi 6]
1. How might we design a control that is easy to learn and has good ergonomics?
2. How might we integrate all necessary and additional functions into the control?
3. How might we make the control individualisable to meet needs in different situations?
4. How might we design a control so that users are restricted as little as possible in everyday life?

### 3.4 Kano model [doku p.44–45]
- Framing in the documentation: basic joystick functions and a standard grip shape are must-haves; a touch-sensitive joystick or an ergonomic grip shape are one-dimensional (performance) features; haptic feedback in the joystick or a customisable grip with different materials or designs could delight.
- Function classification: **basic** – horn, light, direction, hazard lights, speed, battery status, on/off, turn signal; **performance** – mode, profiles, brightness, seat position, footrest height, settings, sensitivity; **delighters** – emergency/GPS, standing function, clock, smartphone holder, Bluetooth, feedback volume; **low/neutral** – navigation, driving assistants.

### 3.5 MoSCoW [doku p.40, p.50; praesi 7]
- **Must:** horn, speed, direction, on/off, battery status, hazard lights, brake, turn signal.
- **Should:** brightness, seat position, footrest height, mode, adjustable sensitivity, light.
- **Could:** clock, Bluetooth, navigation, emergency/GPS, profiles, settings, driving assistants, feedback volume.
- **Won't:** standing function, smartphone holder.
- Requirement framing: must – a reliable, responsive control system with **interchangeable joysticks and grip aids**; should – comfort and ergonomics such as adjustable joystick sensitivity and adaptable grip sizes; could – advanced features like voice control or gesture recognition; won't – features beyond the scope of a first version.

### 3.6 Name [doku p.41, p.48]
- The name should express versatility, modularity, individualisation, personalisation and adaptability. Ten candidates with taglines: SmartRoll, FreedomMotion, EasyGlide, AccessAbility ("project for barrier-free wheelchair control"), NextGenWheel, EmpowerChair, MobilityMatters, AdaptiveDrive, SmootherRide, InclusiveControl (also FlexiControl, ModuChair mentioned). The team chose **"AccessAbility" unanimously because the word play fits the project** (access + ability).

## 4. Decision log

**D1 – Pivot from automotive haptics to electric-wheelchair control.** Exploration of mobility target groups and haptic displays → wheelchair control showed the largest improvement potential and a clear user group with unmet needs. [doku p.6]

**D2 – Design for heterogeneous abilities instead of a standard user.** Evidence: benchmark (all controls follow one pattern for one target group), survey (wide, often asymmetric hand mobility), interviews (imprecise/sensitive control, no personalisation, settings locked to the store). Decision: the design must adapt to the user, not the other way round. [doku p.9, p.15, p.27; poster]

**D3 – From one ergonomic grip to a modular system.** First round: three clay grips sized for different hands; Model 3 was preferred. But testing revealed the key insight: **"no single model is suitable for all people"** („…dass kein einziges Modell für alle Menschen geeignet ist"). Decision: split the controller into several parts that can be freely combined – reaching more people **and saving budget** (manufacturers produce a few parts instead of many complete controls). [doku p.54; praesi 5]

**D4 – Reduce functions to the essentials in one main module.** After re-checking MoSCoW, the module focuses only on what is strictly necessary while driving: **steering, turn signals, horn and switches** (on/off). Different control options (joystick, slider, buttons) were tried to respect users' habits; all necessary functions are integrated into **one main module** that combines with different external bases. Rationale: less complexity, easier learning, universal module. [doku p.54]

**D5 – Three user groups with their own base design.** Derived from the survey's mobility categories:
- *Only fingers can be used flexibly* → a device operated in a **fixed position**; shape based on the **ergonomics of a computer mouse**.
- *The whole hand can be used flexibly* → focus on a **comfortable wrist angle**; because it was hard to fit all functions at the front, the **turn signal moved to the back**.
- *The whole arm is usable but not precisely* → **more hand support and a fixed base**; the earlier base design is reused and only the **upper part is exchangeable** (also a cost saving). [doku p.54, p.59; praesi 11–13]

**D6 – Interchangeable joystick tops.** The joystick on the module can be unscrewed and swapped for other tops (stick, knob, forked hand cradle, dome, puck…) – "depending on the impairment, other tops are mounted". Supported by the expert's suggestion that the top offers different systems (length, ball…). [poster; doku p.60, p.66]

**D7 – Light instead of a display for status.** The self-test showed that not having to look at a display constantly helps avoid accidents; interviewees wanted battery and speed information. Decision: an **LED ring around the joystick shows the driving direction**, an **illuminated power button doubles as battery indicator**, and a **red light strip at the front acts as turn signal**. Module variants were explored systematically (a 4×5 grid of LED/icon layouts around a central joystick ring, two selected). [doku p.29, p.73, p.75; praesi 17; poster]

**D8 – Turn-signal slider on the back, horn on a leather front surface.** The turn signal is a ribbed slider on the back of every base, "comfortably reachable while driving"; the horn is integrated into a soft leather front surface with an embossed horn symbol; all hand-contact surfaces are soft leather "for a pleasant feeling" (responds to the complaint that metal parts get extremely cold or hot). [doku p.76–77; poster]

**D9 – Usable on both sides of the wheelchair.** Both base forms are constructed so they can be mounted on the left or right – important because hand mobility often differs between left and right. [poster; doku p.15]

**D10 – A B2B service system for sales advisers.** Wheelchairs are assigned via insurers and medical-supply stores, and settings are made by the store. Decision: a tablet app for advisers to view user data, **scan the user's hand and arm on site** and configure and produce the right module – "to ensure a system that is as individualisable as possible". [doku p.78; poster; stakeholder map p.13; interviews p.24, p.27]

**D11 – Wheelchair simulator as a low-cost way to experience the concept.** Instead of the physical module, the **Microsoft Adaptive Accessories** (adaptive buttons, joystick, hub) can be used to steer the game "Wheelchair Simulator" and get a feel for the control concept. [doku p.90–91]

**D12 – Deliberately scoped out.** Won't-haves (standing function, smartphone holder) and could-haves such as navigation, Bluetooth, GPS/emergency, profiles, voice or gesture control were not designed, although interviewees wished for navigation, an emergency button, a kerb mode and rain protection. [doku p.40, p.50]

## 5. Design iterations

### 5.1 Ideation [doku p.46, p.52; praesi 10]
- Pencil sketches of basic input forms: joystick, knob, fixed joystick, armrest support, ball with buttons, free-floating joystick.
- **Crazy 8** to stimulate divergent thinking, borrowing from **video-game controllers, drone controls and car controls** – e.g. a remote-like handheld with horn button, a throttle-style grip with steer/brake/gas, a game-controller-like device with display and brake/gas triggers, a wheel-like controller. Goal: "a new and more suitable controller for wheelchairs".
- Brainstorm II (after the concept revision): armrest-mounted base with sliding element, small button modules, joystick tops of different shapes.

### 5.2 Prototype I – three clay grips [doku p.47]
- Three designs chosen through discussion and voting and modelled in clay. Dimensions considered comfort for different hand sizes; the form followed ergonomic findings.
- Main question: **how to allocate functions to buttons** – where to put the direction joystick, whether to combine the horn with the joystick, or whether a separate turn-signal button "like in a car" would be more comfortable. One sketch labelled display, main button, joystick, brake/horn, turn signals and speed.

### 5.3 User testing of Prototype I [doku p.53, p.56; praesi 3]
- Tested with "a large number of people" (classmates; structured feedback table "All the feedback from you" with star votes). **Most testers found Model 3 the most comfortable**: slim design that adapts better to different hand sizes and looks appealing; buttons on the back were meant for forward motion. Some disagreed with the button positions.
- Feedback per model:
  - *Model 1:* "best"; buttons too far forward; the two buttons on the left under the stick were confusing; buttons hard to press (distance).
  - *Model 2:* "also good"; looks a bit big and has a few buttons too many; quite wide; "I don't understand what the big green thing at the front edge is – maybe I didn't pay attention, but it wasn't intuitively recognisable"; too heavy and big for small hands, tips forward.
  - *Model 3:* the left thumb button is uncomfortable to reach; small button front right too far forward; "the hand nestles nicely around the controller"; "lay well in the hand, more intuitive concept"; and one idea: „Ist es möglich, dass man nur durch Drücken der Taste unten steuern kann? … wie eine Art ‚faule Taste'…, damit der Stuhl fährt und ich nicht ständig den Joystick nach vorne drücken muss" (could it drive just by pressing the bottom button – a kind of "lazy button" – so I don't have to keep pushing the joystick forward?) – echoing the cruise-control wish from the self-test and Interviewee 3.
- Stiffer buttons were also requested. [praesi 3]

### 5.4 Concept revision [doku p.54–55, p.59]
- The test showed no single model fits everyone → modular split (D3), essential functions in one module (D4), three user groups (D5). Revision sketches: grips with direction joystick, horn, turn signal, hazard lights, profile button and tempo control; a wrist-strap variant; a module with display, LED, buttons and joystick.

### 5.5 Prototype II – bases and modules [doku p.57–60; praesi 4, 15]
- To check feasibility, further test models: **two external models** built on ergonomic principles – one for users who can move hand and arm freely, one for users who can only move their fingers – plus **interchangeable direction-control methods** so the module with all main functions suits different users.
- Clay explorations: nine models in white and grey (different grip shapes, a teardrop-shaped base with black joystick, square button modules); a grey U-shaped hand cradle/base and four square clay button modules with different arrangements of round and oval buttons/joystick caps; a clay grip with labelled joystick, switch and turn signal.

### 5.6 Prototype III – fidelity progression [doku p.61–65; praesi 16, 19, 24, 26]
- Progression **clay → Kapa (foam board) → foam → 3D print**, shown as a circle of all models. Black 3D-printed square modules plug into tall grip bases; a flat puck module; rounded black/white base with small joystick tested on a **wheelchair armrest** with a wheelchair user's hand; compact square module held on the armrest.
- Team statement: through constant iteration and validation they developed "a set of models aiming to support different user types with a suitable choice of controllers… we are proud of the development and results and look forward to further feedback".

### 5.7 Expert testing [doku p.66, p.71; praesi 33–36]
- Discussed with **experts for rehabilitation measures and rehabilitation devices** (photo: the team talking with a wheelchair user in a rehab setting). Feedback "very positive".
- **Positive:** the concept is good because it **supports people with hand tremor**; **fixing the hand is advantageous for precise control**; rests and top/side buttons are good.
- **Suggestions:** control probably only with an on/off function; operation with thumb or index finger – **thumb control probably best**; the lower module/armrest offers even more options; **ergonomics and arm position matter (30° upward when the arm rests)**; the top button can offer different systems (length, ball, etc.).
- **Further considerations / next steps:** include a **joint** for further development; contact **wheelchair manufacturers** for different options (standard, or premium with individualisation); respect the **cost frame**.

## 6. Final design in detail

### 6.1 Product family [doku p.69–77; praesi 21–26; poster]
- Rendered in black: a **slim grip base** with square joystick module, a **rounded base** with forked hand-cradle top, and loose square modules with dome, knob, puck and small joystick tops.
- **Model 1:** slim grip base; joystick module with buttons in different sizes for different hand sizes; alternative square joystick modules (larger puck, smaller knob). For users with good hand mobility.
- **Model 2:** rounded, wider base with a tall knob joystick, plus forked hand-cradle and dome tops – "equipped with controls for people with different disabilities"; for users with limited precision.
- **Module ("Modul"):** joystick for direction; **illuminated power button** and **LED battery indicator**; a further **LED strip around the module shows the driving direction** (turquoise/green ring); **red light strip at the front as turn signal**; the joystick can be unscrewed and exchanged for other tops.
- **Base ("Basis"):** individually selectable – experts or advisers offer a suitable form depending on the impairment; every base has a **turn-signal slider** reachable while driving; hand-contact surfaces in **soft leather**; horn integrated in the leather front surface; both forms usable on **either side** of the wheelchair.

### 6.2 Service system (B2B tablet app for sales advisers) [doku p.78–87; praesi 31; poster]
- Context: adviser consultation at a desk with a tablet.
- **Customer list** ("Kund:innen 1,320"): sidebar with customers, analysis, wheelchairs, calendar; search, filter, select; table with ID, name, age, gender, wheelchair model (e.g. Airwheel Robot H3P10, Meyra Optimus 2, Sunrise Medical Q200 R, Scewo BRO, FreedomChair A10) and status icons for the right and left hand; "add customer". All customer data is fictional.
- **Customer profile** (example "John Maurer, 47, male, customer since 12.06.19", fictional): wheelchair card (editable); a **radar chart of strength, mobility, concentration and fine motor skills**; separate cards for **left and right hand** ("no data yet – run analysis").
- **Hand and arm scan** on site: back of the hand and side of the hand views with a grid and scan line; instruction "Lege den Arm auf einer angenehmen Oberfläche ab und halte ihn still" (place the arm on a comfortable surface and keep it still); evaluation, e.g. sensitivity low, size.
- **Configurator ("Steuermodul")**: rows of options for **form (base), joystick top and armrest**, unavailable options greyed out; "Steuermodul erstellen" (create control module).
- **Result**: chosen form, joystick options and armrests with a large rendering; "Vorrätigkeit prüfen" (check stock).

### 6.3 Style guide [doku p.88–89; praesi 32]
- Purpose: consistency and a uniform visual identity; guidelines for typography, colour palettes, iconography and UI; should also respect **accessibility standards** so the system is usable by and includes everyone.
- Colours: black, light grey, white, **green** accent (matching the hardware LED). Typography: **Inter** – H1 36 px medium, H2 20 px medium, H3 16 px semibold, paragraph. Buttons: "Abbrechen" (outline) and "Weiter" (filled black). Small line icons.

### 6.4 Simulator [doku p.90–91]
- Microsoft Adaptive Accessories + the game "Wheelchair Simulator" as a substitute for the module to experience the control concept.

## 7. Outcome, reflection and limitations
- Team conclusion: "During this project we did many new things and learned a lot. In our interviews with wheelchair users we visited their homes and got insight into their daily routes to better understand the inconveniences of using a wheelchair. We also visited many rehab shops to find out how they recommend the right wheelchair to a user. The design process was iterative – we kept thinking about how to make our design usable for more people. It was an exhausting project, but we had a lot of fun." [doku p.94]
- Validation: survey (~30), four interviews, self-test with a developer and an adviser, peer tests of clay models, testing on a wheelchair armrest, expert feedback. No quantitative usability metrics; no test of the final 3D-printed system or the service app with real users is documented.
- Open technical points named by experts: a joint, manufacturer options, cost frame. [doku p.71]

## 8. Fabrice's role
- Fabrice's role: lead responsibility for 3D modelling, hardware prototyping, 3D printing and testing; also worked on rendering, concept, interviewing and documentation [stated by Fabrice]. The project was a team of three.
- How this shows in the project:
  - **Concept:** the pivot to a modular system, the three user groups and the module/base split (D3–D6).
  - **Interviewing:** the four wheelchair-user interviews and their dashboards (2.6).
  - **Hardware prototyping and 3D printing (lead):** the clay grips of Prototype I, the bases and modules of Prototype II, and the progression clay → Kapa/foam → 3D print in Prototype III (5.2–5.6).
  - **3D modelling (lead) and rendering:** the CAD models and renderings of the final product family and module details (6.1).
  - **Testing (lead):** peer tests of the clay models, tests on a wheelchair armrest, the self-test and the expert testing (2.7, 5.3, 5.7).
  - **Documentation:** the 95-page project documentation.

## 9. Inconsistencies in the sources
- Persona Mark: "lives with his wife" in the doku text vs. "wife and child" on the canvas; "Marc" vs. "Mark"; need statement says 5 years in a wheelchair. [doku p.35, p.38]
- The presentation lists three HMW questions, the documentation four. [praesi 6; doku p.43]
- Kano puts navigation and driving assistants as low/neutral, MoSCoW lists them as could-haves. [doku p.40, p.45]
- Prototype numbering: the documentation's table of contents lists "Prototyp II" twice (p.57 and p.61); the text calls the clay-to-3D-print stage Prototype III. [doku p.3, p.64]

## 10. Quote bank (original → translation)
- Poster: „Die derzeitigen Steuerungssysteme haben eines gemeinsam: Sie sind immer nur für eine bestimmte Zielgruppe geeignet." → "Current control systems have one thing in common: they are only ever suitable for one specific target group."
- Presentation: "No single model is suitable for all people, especially those with disabilities. Everyone has a different impairment and everyone has different scenarios and needs for use." (original English)
- Documentation: „Während der Tests haben wir jedoch festgestellt, dass kein einziges Modell für alle Menschen geeignet ist." → "During the tests we realised that no single model is suitable for everyone."
- User need statement: „…damit sie ihren Rollstuhl nach ihren individuellen Vorlieben und Bedürfnissen anpassen können." → "…so they can adapt their wheelchair to their individual preferences and needs."
- Interviewee 3: „nicht personalisierbar" / „sehr ungenaue Steuerung" → "not personalisable" / "very imprecise control".
- Interviewee 3: „Krankenkasse zahlt nur das Nötigste." → "The health insurer only pays for the bare essentials."
- Interviewee 1: „Angst, wenn er alleine ist und der Rollstuhl defekt geht" → "afraid when he is alone and the wheelchair breaks down".
- Interviewee 2: „Ruckelfreier Joystick" → "a jerk-free joystick" (his wish).
- Peer tester on Model 3: „…wie eine Art ‚faule Taste'…, damit der Stuhl fährt und ich nicht ständig den Joystick nach vorne drücken muss." → "…a kind of 'lazy button' so the chair drives and I don't have to keep pushing the joystick forward."
- Peer tester on Model 3: „Hand schmiegt sich schön um Controller." → "The hand nestles nicely around the controller."
- Self-test: „Dadurch, dass man nicht ständig auf ein Display schauen muss, kann man Unfälle vermeiden." → "Not having to look at a display all the time helps avoid accidents."
- Expert: "Supports people with shaking hands. Fixation of the hand is advantageous for precise control." (original English)
- Team: „Es war ein anstrengendes Projekt, das uns aber viel Spaß gemacht hat." → "It was an exhausting project, but we had a lot of fun."
