# NYC Pixel Reading Quest

This is a fully offline browser game built with vanilla HTML, CSS, and JavaScript. Open [index.html](/Users/joshbarocas/Documents/nyc-pixel-reading-quest/index.html) in a browser and it will run without installs, build tools, or a local server.

## What is included

- Tile-based overworld maps inspired by classic Game Boy era JRPG pacing: small readable maps, collision, highlighted trigger tiles, and fast tile-step movement.
- Four NYC-themed environments: a Brooklyn townhouse block, apartment hallway, bodega, and public school hallway.
- Branching narrative data with 12 nodes per environment, text-only reading moments, and two large choice buttons while the overworld stays visible behind the modal.
- Teacher / Builder mode with program selection, unit selection, strictness, NYC vocabulary toggle, decision tree viewer, JSON export, and shareable URL generation.
- A real decodability validator driven by `data/wordbank.json`, with debug mode for out-of-scope highlighting, pattern reporting, and validity explanations.

## Source analysis applied

The supplied pixel references were treated as layout and pacing references rather than copied art. The implementation follows the same core traits:

- Tile-based maps with readable walk lanes and landmark objects.
- Small overworld character proportions with only minimal walk animation.
- Dialogue presented in a boxed overlay at the bottom of the map.
- Frequent, short interaction bursts instead of long cutscenes.
- Clear next-goal pacing, like early Pokémon routes and towns.

The supplied UFLI and Fundations PDFs informed the structured progression maps in [data/ufli.json](/Users/joshbarocas/Documents/nyc-pixel-reading-quest/data/ufli.json) and [data/fundations.json](/Users/joshbarocas/Documents/nyc-pixel-reading-quest/data/fundations.json). Those files are gameplay-ready summaries: each level includes the concept, grapheme-phoneme correspondences, high-frequency words, and unlocked skills used by the decodability engine.

## How to run

Open [index.html](/Users/joshbarocas/Documents/nyc-pixel-reading-quest/index.html) directly in a browser.

No install step is required.

Each play session now starts with a centered `Your Quest` screen. Press `START` before movement unlocks.

Desktop confirm is `SPACE` or a nearby click on the highlighted target tile. Mobile confirm is the on-screen `GO` button.

## How to generate a parent link

1. Open the title screen.
2. Click `Teacher / Builder`.
3. Choose the program, unit, strictness, and environment.
4. Toggle NYC vocabulary, debug mode, or large text if needed.
5. Use the generated link field.

Example:

```text
index.html?program=fundations&unit=3&strictness=strict&env=bodega
```

If those parameters are present on page load, the game opens straight into that configured story.

## How to add new units

Update both the JSON file and the mirrored `PROGRAM_DATA` constant in [main.js](/Users/joshbarocas/Documents/nyc-pixel-reading-quest/main.js).

For each new unit:

- Add `unit`
- Add `concept`
- Add `graphemePhonemeCorrespondences`
- Add `highFrequencyWords`
- Add `skillsUnlocked`
- Extend `FEATURE_LADDER` in [main.js](/Users/joshbarocas/Documents/nyc-pixel-reading-quest/main.js) so the validator knows which tags unlock at that unit

## How to expand the wordbank

Edit [data/wordbank.json](/Users/joshbarocas/Documents/nyc-pixel-reading-quest/data/wordbank.json) and mirror the word in `WORD_BANK` inside [main.js](/Users/joshbarocas/Documents/nyc-pixel-reading-quest/main.js).

Each entry should include:

- `word`
- `tags`

Useful tags already used by the validator include:

- `short-a`, `short-i`, `short-o`, `short-e`, `short-u`
- `digraph`
- `blend`
- `ffllsszz`
- `glued`
- `welded`
- `silent-e`
- `open`
- `vowel-team`
- `trick`
- `nyc`
- `hf`

## How to create new narratives

1. Add a new JSON file under [data/narratives](/Users/joshbarocas/Documents/nyc-pixel-reading-quest/data/narratives).
2. Mirror that narrative in the `NARRATIVES` constant in [main.js](/Users/joshbarocas/Documents/nyc-pixel-reading-quest/main.js) so it still works from `file://`.
3. Add a matching map and trigger set in `MAPS`.
4. Keep each node in this shape:

```json
{
  "id": "node-id",
  "location": "map-trigger-key",
  "text": ["Short line one.", "Short line two."],
  "choiceA": "Text only choice",
  "choiceB": "Text only choice",
  "nextA": "next-node-id",
  "nextB": "next-node-id",
  "effects": ["optionalTag"]
}
```

## Internal usability review

This build includes a self-check module in Teacher / Builder mode. It evaluates:

- Button size against a 44px minimum tap target
- Words per sentence
- Choice count
- Visual clutter
- Movement responsiveness
- Dialogue pacing

### Adjustments made for young users

- All action and choice buttons use at least a 44px tap target.
- Dialogue is capped at two short lines with only two choices.
- The current destination tile glows so the child has one immediate goal.
- A large-text toggle increases the full UI scale.

### Adjustments made for fun

- Movement uses quick tile stepping for responsive JRPG feel.
- Each map has short cause-and-effect loops and positive social stakes.
- The game gives frequent interaction beats instead of long reading walls.
- Simple retro blip sounds reinforce movement and choices, with mute control.

### Differences from adult JRPG conventions

- No combat, menus, inventories, or layered stat systems.
- Far fewer simultaneous objects on screen.
- Faster reward cadence and shorter narrative loops.
- Reading is tightly scoped to the exact visible location to reduce cognitive load.

## Quick self-check

- Can a 5–7 year old tell what to do within 3 seconds: yes, the quest gate appears first and movement is locked until `START`.
- Is the START / Quest flow obvious: yes, the large centered `START` button is the only action before play begins.
- Are tap targets large enough: yes, action buttons remain at or above the 44px target.
- Does the block read as a Brooklyn street with townhouses and corner stores: the Brooklyn map now uses a perimeter ring of rowhouses, inner backyard space, alley access, an asphalt street edge, parked cars, and signed corner storefronts.
- Reachability check: runtime flood-fill validation runs on map load, automatically relocates unreachable targets, and reports `5/5` sample path trials in the builder status when the map is connected.
- Spawn visibility check: the game uses a safe spawn zone, delays the hint bubble fade-in for the first beat of play, and can re-anchor the hint or relocate the player so the sprite is not covered at start.
- Locate check: the `Locate` button and the opening pulse ring make the player immediately findable without adding clutter during reading moments.
- Narrative audit check: Teacher / Builder mode now flags UI-language choices, scene-vocabulary drift, branch continuity issues, and out-of-scope decodability warnings, and it includes path preview buttons so each branch can be read as a continuous mini-story.
- Natural language check: display-time refinement now swaps awkward first-reference phrases like `Ask the pal` to `Ask a pal` when that change stays within the active phonics scope, and the Language Audit lists safe replacements plus blocked rewrites.
- Causality check: the instruction bubble is now derived from the last choice, the latest consequence text, active clues, and introduced entities, and the Causality Audit simulates both branches of every node to flag any disconnected follow-up.
- Narrative style check: display text is refined toward second-person voice, short clue-led beats, and repeat-with-a-twist sentence frames, while the Beat Planner maps each quest through setup, search, clues, false lead, social beat, reveal, and finish.
- Modal usability check: reading moments now open in a centered overlay on the board, the play loop stays visible without page scrolling, and movement stays frozen until a single choice tap closes the modal.
- Hallway clarity check: the apartment map now uses a linear prewar corridor with a lobby tile shift, brass mailboxes, stair landing, elevator alcove, and numbered doors sized to read as landmarks for young players.
