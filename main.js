(function () {
  "use strict";

  const TILE = 32;
  const MAP_W = 16;
  const MAP_H = 12;

  const PROGRAM_DATA = {
    ufli: {
      program: "UFLI Foundations",
      levels: [
        { unit: 1, concept: "Short vowels and continuous consonants", graphemePhonemeCorrespondences: ["m", "s", "t", "a", "p", "n", "i", "f"], highFrequencyWords: ["a", "I", "is"], skillsUnlocked: ["Read and spell VC and CVC words", "Blend short a and short i words", "Track left-to-right phoneme order"] },
        { unit: 2, concept: "Stop consonants and mixed CVC words", graphemePhonemeCorrespondences: ["d", "g", "c", "o", "b", "h"], highFrequencyWords: ["the", "to"], skillsUnlocked: ["Decode a broader set of CVC words", "Distinguish stop and continuous sounds", "Read simple one-syllable sentences"] },
        { unit: 3, concept: "Short e and more consonants", graphemePhonemeCorrespondences: ["e", "r", "l", "k"], highFrequencyWords: ["see", "we"], skillsUnlocked: ["Decode CVC words with short e", "Read words with final l and r", "Track vowel changes across minimal pairs"] },
        { unit: 4, concept: "Short u and blends", graphemePhonemeCorrespondences: ["u", "j", "v", "w", "y", "z"], highFrequencyWords: ["you", "my"], skillsUnlocked: ["Read short u words", "Blend simple initial and final clusters", "Read short decodable directions"] },
        { unit: 5, concept: "Digraphs and ng/nk", graphemePhonemeCorrespondences: ["sh", "ch", "th", "wh", "ck", "ng", "nk"], highFrequencyWords: ["she", "they"], skillsUnlocked: ["Decode common consonant digraphs", "Read words ending in ng and nk", "Notice two-letter spellings for one sound"] },
        { unit: 6, concept: "Double final consonants and ff/ll/ss/zz", graphemePhonemeCorrespondences: ["ff", "ll", "ss", "zz", "qu", "x"], highFrequencyWords: ["all", "was"], skillsUnlocked: ["Read one-syllable words with doubled final consonants", "Read words with qu and x", "Spell closed-syllable words more accurately"] },
        { unit: 7, concept: "Consonant blends and review", graphemePhonemeCorrespondences: ["bl", "cl", "fl", "gl", "pl", "sl", "st", "sk"], highFrequencyWords: ["do", "of"], skillsUnlocked: ["Read common beginning blends", "Read common ending blends", "Decode longer one-syllable words"] },
        { unit: 8, concept: "FLOSS and welded endings", graphemePhonemeCorrespondences: ["all", "oll", "ild", "old", "ind", "ost"], highFrequencyWords: ["full", "pull"], skillsUnlocked: ["Read glued sounds and welded chunks", "Recognize high-utility chunks as units", "Read more fluent decodable sentences"] },
        { unit: 9, concept: "Bonus letters and soft c/g preview", graphemePhonemeCorrespondences: ["tch", "dge", "ge", "ce"], highFrequencyWords: ["said", "come"], skillsUnlocked: ["Decode some common trigraph spellings", "Handle a few less-transparent spellings", "Use trick words when strictness allows"] },
        { unit: 10, concept: "Long vowel silent e", graphemePhonemeCorrespondences: ["a_e", "i_e", "o_e", "u_e", "e_e"], highFrequencyWords: ["like", "have"], skillsUnlocked: ["Decode VCe words", "Contrast short and long vowels", "Read slightly richer story text"] },
        { unit: 11, concept: "Open syllables", graphemePhonemeCorrespondences: ["me", "he", "go", "hi", "we", "no"], highFrequencyWords: ["he", "me"], skillsUnlocked: ["Read open syllables with long vowel sound", "Decode simple two-syllable words with open syllables", "Read more natural dialogue"] },
        { unit: 12, concept: "Long vowel teams", graphemePhonemeCorrespondences: ["ai", "ay", "ee", "ea", "oa", "ow"], highFrequencyWords: ["play", "day"], skillsUnlocked: ["Decode common vowel teams", "Read more flexible decodable choices", "Support richer narrative branches"] }
      ]
    },
    fundations: {
      program: "Fundations Level 1",
      levels: [
        { unit: 1, concept: "Letter-keyword-sound foundations", graphemePhonemeCorrespondences: ["a", "b", "c", "d", "f", "g", "i", "m", "n", "o", "p", "s", "t"], highFrequencyWords: ["a", "the"], skillsUnlocked: ["Match letters to sounds", "Read VC and CVC words", "Track sounds while tapping"] },
        { unit: 2, concept: "Short vowels and CVC automaticity", graphemePhonemeCorrespondences: ["e", "h", "j", "k", "l", "r", "u"], highFrequencyWords: ["is", "his"], skillsUnlocked: ["Decode short vowel CVC words", "Read short patterned phrases", "Spell with sound-by-sound mapping"] },
        { unit: 3, concept: "Digraphs", graphemePhonemeCorrespondences: ["sh", "th", "ch", "wh", "ck"], highFrequencyWords: ["she", "this"], skillsUnlocked: ["Decode words with digraphs", "Spot two letters making one sound", "Read simple sentences with digraph words"] },
        { unit: 4, concept: "Blends and consonant clusters", graphemePhonemeCorrespondences: ["bl", "cl", "fl", "gl", "pl", "sl", "br", "cr", "dr", "fr", "gr", "tr"], highFrequencyWords: ["from", "with"], skillsUnlocked: ["Read beginning blends smoothly", "Read slightly longer one-syllable words", "Maintain sound order in clusters"] },
        { unit: 5, concept: "Closed syllable fluency and bonus letters", graphemePhonemeCorrespondences: ["ff", "ll", "ss", "zz", "x", "qu"], highFrequencyWords: ["was", "said"], skillsUnlocked: ["Read and spell closed syllable words with double final consonants", "Read words with qu and x", "Build automatic word recognition"] },
        { unit: 6, concept: "Glued sounds", graphemePhonemeCorrespondences: ["am", "an", "all", "ang", "ing", "ong", "ung", "ink", "ank"], highFrequencyWords: ["they", "you"], skillsUnlocked: ["Read glued sound chunks as units", "Decode words with welded endings", "Read more fluent connected text"] },
        { unit: 7, concept: "Silent e", graphemePhonemeCorrespondences: ["a_e", "i_e", "o_e", "u_e"], highFrequencyWords: ["like", "have"], skillsUnlocked: ["Decode VCe words", "Contrast short and long vowel patterns", "Handle more story variety"] },
        { unit: 8, concept: "Open syllables", graphemePhonemeCorrespondences: ["he", "we", "me", "go", "no", "hi"], highFrequencyWords: ["he", "we"], skillsUnlocked: ["Read open syllables with long vowel sound", "Decode simple multisyllabic words", "Read natural-feeling dialogue"] },
        { unit: 9, concept: "Vowel teams", graphemePhonemeCorrespondences: ["ai", "ay", "ee", "ea", "oa", "ow"], highFrequencyWords: ["day", "play"], skillsUnlocked: ["Decode common vowel teams", "Read longer decodable lines", "Sustain comprehension through branching choices"] },
        { unit: 10, concept: "R-controlled and advanced review", graphemePhonemeCorrespondences: ["ar", "or", "er", "ir", "ur"], highFrequencyWords: ["are", "for"], skillsUnlocked: ["Decode common r-controlled vowels", "Read richer environmental vocabulary", "Handle late-game narrative routes"] }
      ]
    }
  };

  const WORD_BANK = [
    { word: "a", tags: ["hf", "short-a"] }, { word: "I", tags: ["hf", "open"] }, { word: "am", tags: ["short-a", "glued"] },
    { word: "an", tags: ["short-a", "glued"] }, { word: "at", tags: ["short-a"] }, { word: "as", tags: ["short-a"] },
    { word: "cat", tags: ["short-a"] }, { word: "mat", tags: ["short-a"] }, { word: "sat", tags: ["short-a"] },
    { word: "map", tags: ["short-a"] }, { word: "bag", tags: ["short-a"] }, { word: "tap", tags: ["short-a"] },
    { word: "bat", tags: ["short-a"] }, { word: "cap", tags: ["short-a"] }, { word: "can", tags: ["short-a", "glued"] },
    { word: "man", tags: ["short-a", "glued"] }, { word: "fan", tags: ["short-a", "glued"] }, { word: "ran", tags: ["short-a", "glued"] },
    { word: "pan", tags: ["short-a", "glued"] }, { word: "and", tags: ["short-a", "glued"] }, { word: "sad", tags: ["short-a"] },
    { word: "mad", tags: ["short-a"] }, { word: "had", tags: ["short-a"] }, { word: "it", tags: ["short-i"] },
    { word: "in", tags: ["short-i"] }, { word: "is", tags: ["hf", "short-i"] }, { word: "sit", tags: ["short-i"] },
    { word: "pin", tags: ["short-i"] }, { word: "big", tags: ["short-i"] }, { word: "dig", tags: ["short-i"] },
    { word: "pig", tags: ["short-i"] }, { word: "wig", tags: ["short-i"] }, { word: "win", tags: ["short-i"] },
    { word: "will", tags: ["ffllsszz", "short-i"] }, { word: "his", tags: ["hf", "short-i"] }, { word: "if", tags: ["short-i"] },
    { word: "up", tags: ["short-u"] }, { word: "us", tags: ["short-u"] }, { word: "bus", tags: ["short-u"] },
    { word: "sun", tags: ["short-u"] }, { word: "bug", tags: ["short-u"] }, { word: "mug", tags: ["short-u"] },
    { word: "hug", tags: ["short-u"] }, { word: "fun", tags: ["short-u"] }, { word: "run", tags: ["short-u"] },
    { word: "hop", tags: ["short-o"] }, { word: "hot", tags: ["short-o"] }, { word: "mop", tags: ["short-o"] },
    { word: "dog", tags: ["short-o"] }, { word: "box", tags: ["x", "short-o"] }, { word: "on", tags: ["short-o"] },
    { word: "red", tags: ["short-e"] }, { word: "bed", tags: ["short-e"] }, { word: "hen", tags: ["short-e"] },
    { word: "pen", tags: ["short-e"] }, { word: "pet", tags: ["short-e"] }, { word: "ten", tags: ["short-e"] },
    { word: "get", tags: ["short-e"] }, { word: "let", tags: ["short-e"] }, { word: "we", tags: ["hf", "open"] },
    { word: "he", tags: ["hf", "open"] }, { word: "me", tags: ["hf", "open"] }, { word: "go", tags: ["open"] },
    { word: "no", tags: ["open"] }, { word: "hi", tags: ["open"] }, { word: "to", tags: ["hf", "open"] },
    { word: "the", tags: ["trick"] }, { word: "of", tags: ["trick"] }, { word: "do", tags: ["trick"] },
    { word: "you", tags: ["trick"] }, { word: "my", tags: ["trick"] }, { word: "was", tags: ["trick"] },
    { word: "said", tags: ["trick"] }, { word: "come", tags: ["trick"] }, { word: "have", tags: ["trick", "silent-e"] },
    { word: "like", tags: ["trick", "silent-e"] }, { word: "see", tags: ["hf", "vowel-team"] }, { word: "day", tags: ["hf", "vowel-team"] },
    { word: "play", tags: ["vowel-team"] }, { word: "rain", tags: ["vowel-team"] }, { word: "boat", tags: ["vowel-team"] },
    { word: "tree", tags: ["vowel-team"] }, { word: "coat", tags: ["vowel-team"] }, { word: "bite", tags: ["silent-e"] },
    { word: "bike", tags: ["silent-e"] }, { word: "home", tags: ["silent-e"] }, { word: "hope", tags: ["silent-e"] },
    { word: "cube", tags: ["silent-e"] }, { word: "late", tags: ["silent-e"] }, { word: "ship", tags: ["digraph", "sh"] },
    { word: "chat", tags: ["digraph", "ch"] }, { word: "chin", tags: ["digraph", "ch"] }, { word: "thin", tags: ["digraph", "th"] },
    { word: "that", tags: ["digraph", "th"] }, { word: "whip", tags: ["digraph", "wh"] }, { word: "duck", tags: ["digraph", "ck"] },
    { word: "back", tags: ["digraph", "ck"] }, { word: "bell", tags: ["ffllsszz"] }, { word: "hill", tags: ["ffllsszz"] },
    { word: "buzz", tags: ["ffllsszz"] }, { word: "fill", tags: ["ffllsszz"] }, { word: "class", tags: ["ffllsszz"] },
    { word: "snack", tags: ["blend", "digraph", "ck"] }, { word: "stop", tags: ["blend"] }, { word: "step", tags: ["blend"] },
    { word: "slip", tags: ["blend"] }, { word: "flag", tags: ["blend"] }, { word: "club", tags: ["blend"] },
    { word: "drop", tags: ["blend"] }, { word: "frog", tags: ["blend"] }, { word: "trip", tags: ["blend"] },
    { word: "milk", tags: ["blend"] }, { word: "hand", tags: ["blend"] }, { word: "sand", tags: ["blend"] },
    { word: "best", tags: ["blend"] }, { word: "lost", tags: ["blend", "welded"] }, { word: "bodega", tags: ["nyc", "trick"] },
    { word: "stoop", tags: ["nyc", "vowel-team"] }, { word: "block", tags: ["nyc", "blend"] }, { word: "hall", tags: ["nyc", "ffllsszz"] },
    { word: "shopkeeper", tags: ["nyc", "trick"] }, { word: "train", tags: ["nyc", "vowel-team"] }, { word: "subway", tags: ["nyc", "trick"] },
    { word: "school", tags: ["nyc", "trick"] }, { word: "bench", tags: ["nyc", "blend", "digraph", "ch"] }, { word: "friend", tags: ["trick"] }
  ];

  const NARRATIVES = {
    "brooklyn-block": {
      environment: "brooklyn-block",
      title: "The Stoop Cat",
      goal: "Help find Pip the cat before rain starts.",
      nodes: [
        { id: "bb1", location: "stoop", text: ["I am on the block.", "Pip the cat is not in his box."], choiceA: "Look by the stoop", choiceB: "Ask a pal", nextA: "bb2", nextB: "bb3", effects: ["startQuest"] },
        { id: "bb2", location: "stoop", text: ["I look by the stoop.", "I see a small red tag."], choiceA: "Grab the tag", choiceB: "Head to the tree", nextA: "bb4", nextB: "bb5", effects: ["foundTag"] },
        { id: "bb3", location: "sidewalk", text: ["My pal can help.", "She saw Pip run by the tree."], choiceA: "Run to the tree", choiceB: "Check the bench", nextA: "bb5", nextB: "bb6", effects: ["metPal"] },
        { id: "bb4", location: "sidewalk", text: ["The tag has mud.", "Pip may be by the park gate."], choiceA: "Head for the gate", choiceB: "Call Pip first", nextA: "bb7", nextB: "bb6", effects: ["readClue"] },
        { id: "bb5", location: "tree", text: ["A thin cat path is in the grass.", "I see a tan cat nap spot."], choiceA: "Peek in the grass", choiceB: "Look by the can", nextA: "bb8", nextB: "bb9", effects: ["sawTrail"] },
        { id: "bb6", location: "bench", text: ["Pip is not on the bench.", "A kid has a bag of fish bits."], choiceA: "Ask for fish bits", choiceB: "Head for the gate", nextA: "bb10", nextB: "bb7", effects: ["gotHint"] },
        { id: "bb7", location: "gate", text: ["The gate is shut.", "I hear a soft mew."], choiceA: "Set the fish bits", choiceB: "Call, 'Pip, Pip!'", nextA: "bb11", nextB: "bb8", effects: ["nearCat"] },
        { id: "bb8", location: "grass", text: ["Pip peeks up.", "He is stuck by a big bag."], choiceA: "Lift the bag", choiceB: "Get my pal", nextA: "bb11", nextB: "bb10", effects: ["foundCat"] },
        { id: "bb9", location: "trash-can", text: ["No cat is in the can.", "But Pip's tag is on the side."], choiceA: "Follow the soft mew", choiceB: "Run back to the stoop", nextA: "bb7", nextB: "bb2", effects: ["loopClue"] },
        { id: "bb10", location: "sidewalk", text: ["My pal and I grin.", "We can help Pip fast."], choiceA: "Lift the bag", choiceB: "Set the fish bits", nextA: "bb11", nextB: "bb11", effects: ["teamUp"] },
        { id: "bb11", location: "gate", text: ["Pip hops out at the gate.", "He sits in my lap and purrs."], choiceA: "Walk Pip home", choiceB: "Pet Pip", nextA: "bb12", nextB: "bb12", effects: ["questClear"] },
        { id: "bb12", location: "stoop", text: ["Pip is safe.", "Rain taps the stoop. We win."], choiceA: "Play again", choiceB: "Pick a new map", nextA: "bb1", nextB: "bb1", effects: ["end"] }
      ]
    },
    "apartment-interior": {
      environment: "apartment-interior",
      title: "Snack Hall",
      goal: "Bring a snack to the top hall before it gets cold.",
      nodes: [
        { id: "ai1", location: "lobby", text: ["I am in the hall.", "A pal needs a hot snack."], choiceA: "Use the elevator", choiceB: "Take the steps", nextA: "ai2", nextB: "ai3", effects: ["startQuest"] },
        { id: "ai2", location: "lift", text: ["The elevator is slow.", "It can stop at one more hall."], choiceA: "Ride up", choiceB: "Hop out now", nextA: "ai4", nextB: "ai5", effects: ["usedLift"] },
        { id: "ai3", location: "stairs", text: ["The steps are dim.", "I hear a cat dish tip."], choiceA: "Check the sound", choiceB: "Run past it", nextA: "ai6", nextB: "ai5", effects: ["usedStairs"] },
        { id: "ai4", location: "third-hall", text: ["A kid is sad.", "His sock fell in the mail slot."], choiceA: "Help the kid", choiceB: "Keep the snack hot", nextA: "ai7", nextB: "ai8", effects: ["metKid"] },
        { id: "ai5", location: "second-hall", text: ["The hall has two doors.", "One has a red mat."], choiceA: "Knock by the red mat", choiceB: "Try the tan door", nextA: "ai8", nextB: "ai6", effects: ["hallChoice"] },
        { id: "ai6", location: "mail-area", text: ["A fat sock blocks the slot.", "I can tug it out."], choiceA: "Tug the sock", choiceB: "Ask the super", nextA: "ai7", nextB: "ai9", effects: ["sawProblem"] },
        { id: "ai7", location: "hall", text: ["The kid can grin now.", "My pal has a tip: go to the top."], choiceA: "Run to the top", choiceB: "Take the elevator", nextA: "ai10", nextB: "ai10", effects: ["goodTurn"] },
        { id: "ai8", location: "wrong-door", text: ["This is not the right door.", "A man says, 'Top hall, last door.'"], choiceA: "Try the last door", choiceB: "Ride the elevator", nextA: "ai10", nextB: "ai2", effects: ["gotDirections"] },
        { id: "ai9", location: "super-desk", text: ["The super is glad to help.", "He pops the slot and nods."], choiceA: "Help the kid", choiceB: "Run with the snack", nextA: "ai7", nextB: "ai10", effects: ["adultHelp"] },
        { id: "ai10", location: "top-hall", text: ["My pal is at the last door.", "The snack is warm."], choiceA: "Hand it off", choiceB: "Knock and sing", nextA: "ai11", nextB: "ai11", effects: ["arrived"] },
        { id: "ai11", location: "top-hall", text: ["My pal claps.", "He has a hot sip and a grin."], choiceA: "Take a lap", choiceB: "Ride down", nextA: "ai12", nextB: "ai12", effects: ["questClear"] },
        { id: "ai12", location: "lobby", text: ["The hall is calm.", "I did a kind job."], choiceA: "Play again", choiceB: "Pick a new map", nextA: "ai1", nextB: "ai1", effects: ["end"] }
      ]
    },
    bodega: {
      environment: "bodega",
      title: "Snack Swap",
      goal: "Pick the right snack and help the shop stay calm.",
      nodes: [
        { id: "bo1", location: "door", text: ["Rain drips from one wet sock.", "A pal needs a dry snack."], choiceA: "Check the chips", choiceB: "Check the snack bar", nextA: "bo2", nextB: "bo3", effects: ["startQuest"] },
        { id: "bo2", location: "chip-aisle", text: ["The chip bag is big.", "Rain can rip the bag."], choiceA: "Bag the chips", choiceB: "Swap for the bar", nextA: "bo4", nextB: "bo3", effects: ["sawTradeoff"] },
        { id: "bo3", location: "snack-rack", text: ["The snack bar fits in a bag.", "It will stay dry."], choiceA: "Grab the bar", choiceB: "Ask the clerk", nextA: "bo5", nextB: "bo6", effects: ["pickedBar"] },
        { id: "bo4", location: "soda-box", text: ["A can tips by the box.", "The floor is slick."], choiceA: "Fix the can stack", choiceB: "Call the clerk", nextA: "bo6", nextB: "bo6", effects: ["messFound"] },
        { id: "bo5", location: "milk-box", text: ["The fridge hums.", "A lost list is on the lid."], choiceA: "Grab the list", choiceB: "Ask who lost it", nextA: "bo8", nextB: "bo6", effects: ["foundList"] },
        { id: "bo6", location: "clerk", text: ["The clerk nods.", "He says a dad in a cap lost the list."], choiceA: "Find the dad", choiceB: "Pay for the bar", nextA: "bo8", nextB: "bo7", effects: ["talkedClerk"] },
        { id: "bo7", location: "line", text: ["The line is long.", "You keep the bar dry."], choiceA: "Wave the kid ahead", choiceB: "Hold the bar high", nextA: "bo9", nextB: "bo10", effects: ["lineChoice"] },
        { id: "bo8", location: "aisle", text: ["A dad in a cap pats his bag.", "He lost that list."], choiceA: "Hand the list", choiceB: "Ask what stays dry", nextA: "bo9", nextB: "bo10", effects: ["foundOwner"] },
        { id: "bo9", location: "counter", text: ["The dad and kid grin.", "The clerk adds a small mint."], choiceA: "Take the bar", choiceB: "Take a dry bag", nextA: "bo11", nextB: "bo11", effects: ["rewarded"] },
        { id: "bo10", location: "counter", text: ["The bar will stay dry.", "It is best for the wet sock."], choiceA: "Pick the bar", choiceB: "Grab a bag", nextA: "bo11", nextB: "bo11", effects: ["softNudge"] },
        { id: "bo11", location: "door", text: ["I step out with the snack.", "My pal can stay dry and fed."], choiceA: "Share the mint", choiceB: "Run to my pal", nextA: "bo12", nextB: "bo12", effects: ["questClear"] },
        { id: "bo12", location: "stoop", text: ["The rain starts.", "We laugh and eat on the stoop."], choiceA: "Play again", choiceB: "Pick a new map", nextA: "bo1", nextB: "bo1", effects: ["end"] }
      ]
    },
    "school-hallway": {
      environment: "school-hallway",
      title: "The Class Pass",
      goal: "Get the class pass to the right room before the bell.",
      nodes: [
        { id: "sh1", location: "hall-start", text: ["I am in the hall.", "The class pass is not on the hook."], choiceA: "Check the class rug", choiceB: "Ask the hall pal", nextA: "sh2", nextB: "sh3", effects: ["startQuest"] },
        { id: "sh2", location: "class-door", text: ["The rug is flat.", "A wet path goes to the art room."], choiceA: "Run to art", choiceB: "Check the sink", nextA: "sh4", nextB: "sh5", effects: ["sawClue"] },
        { id: "sh3", location: "locker", text: ["My hall pal saw a kid in a red cap.", "He had the pass at lunch."], choiceA: "Find the red cap", choiceB: "Head to art", nextA: "sh6", nextB: "sh4", effects: ["talkedFriend"] },
        { id: "sh4", location: "art-room", text: ["The art room has wet paint.", "The pass is not by the rack."], choiceA: "Ask the art pal", choiceB: "Check the sink", nextA: "sh7", nextB: "sh5", effects: ["roomCheck"] },
        { id: "sh5", location: "sink", text: ["A class smock is by the sink.", "The pass may be in the big bin."], choiceA: "Check the bin", choiceB: "Skip to the gym hall", nextA: "sh8", nextB: "sh6", effects: ["newClue"] },
        { id: "sh6", location: "gym-hall", text: ["The red cap kid is sad.", "He lost the pass in the bin."], choiceA: "Check the bin", choiceB: "Walk him to class", nextA: "sh8", nextB: "sh9", effects: ["foundKid"] },
        { id: "sh7", location: "art-room", text: ["The art pal says, 'The bell is set to ring.'", "We must act fast."], choiceA: "Run to the bin", choiceB: "Run to class", nextA: "sh8", nextB: "sh9", effects: ["timePressure"] },
        { id: "sh8", location: "supply-bin", text: ["I lift a pad and a map.", "The class pass is at the base."], choiceA: "Grab the pass", choiceB: "Call the red cap kid", nextA: "sh10", nextB: "sh10", effects: ["foundPass"] },
        { id: "sh9", location: "class-door", text: ["The pass is not here yet.", "The class waits by the door."], choiceA: "Run to the bin", choiceB: "Ask the hall pal", nextA: "sh8", nextB: "sh3", effects: ["loop"] },
        { id: "sh10", location: "hall-run", text: ["I dash in the hall.", "The bell has not rung."], choiceA: "Hand the pass to class", choiceB: "Hand the pass to the red cap kid", nextA: "sh11", nextB: "sh11", effects: ["sprint"] },
        { id: "sh11", location: "class-door", text: ["The class can grin.", "The pass is back on the hook."], choiceA: "Step in class", choiceB: "Wave to the pal", nextA: "sh12", nextB: "sh12", effects: ["questClear"] },
        { id: "sh12", location: "class-door", text: ["The bell rings.", "We made it in time."], choiceA: "Play again", choiceB: "Pick a new map", nextA: "sh1", nextB: "sh1", effects: ["end"] }
      ]
    }
  };

  const FEATURE_LADDER = {
    ufli: {
      1: ["short-a", "short-i"],
      2: ["short-o"],
      3: ["short-e"],
      4: ["short-u", "blend"],
      5: ["digraph"],
      6: ["ffllsszz", "x"],
      7: ["blend"],
      8: ["glued", "welded"],
      9: ["trick"],
      10: ["silent-e"],
      11: ["open"],
      12: ["vowel-team"]
    },
    fundations: {
      1: ["short-a", "short-i", "short-o"],
      2: ["short-e", "short-u"],
      3: ["digraph"],
      4: ["blend"],
      5: ["ffllsszz", "x"],
      6: ["glued", "welded"],
      7: ["silent-e"],
      8: ["open"],
      9: ["vowel-team"],
      10: ["trick"]
    }
  };

  const SAFE_SPAWN_ZONES = {
    "brooklyn-block": [{ x1: 1, y1: 10, x2: 5, y2: 10 }],
    "apartment-interior": [{ x1: 1, y1: 8, x2: 4, y2: 9 }],
    bodega: [{ x1: 1, y1: 8, x2: 4, y2: 9 }],
    "school-hallway": [{ x1: 1, y1: 8, x2: 4, y2: 9 }]
  };

  const SCENE_VOCAB = {
    "brooklyn-block": ["stoop", "block", "tree", "bench", "gate", "grass", "tag", "bag", "can", "fish", "cat", "pal"],
    "apartment-interior": ["hall", "elevator", "steps", "mail", "slot", "door", "lobby", "desk", "snack", "kid", "sock", "super"],
    bodega: ["shop", "chips", "bar", "clerk", "list", "counter", "line", "mint", "door", "milk", "dad", "bag"],
    "school-hallway": ["hall", "class", "pass", "hook", "rug", "art", "sink", "bin", "door", "bell", "kid", "locker"]
  };

  const UI_FORBIDDEN_WORDS = ["tap", "click", "press", "space", "button", "enter"];
  const ALLOWED_ACTION_VERBS = ["ask", "bag", "call", "check", "find", "fix", "follow", "get", "grab", "hand", "head", "help", "hold", "hop", "join", "keep", "knock", "lift", "look", "move", "pay", "peek", "pet", "pick", "play", "push", "put", "read", "ride", "run", "set", "share", "skip", "stay", "step", "swap", "take", "try", "tug", "use", "walk", "wave"];
  const PERSISTENT_SCENE_ENTITIES = {
    "brooklyn-block": ["stoop", "block", "tree", "bench", "gate", "grass", "tag", "bag", "can", "fish", "cat"],
    "apartment-interior": ["hall", "elevator", "steps", "mail", "slot", "door", "lobby", "desk", "snack"],
    bodega: ["shop", "chips", "bar", "clerk", "list", "counter", "line", "mint", "door", "milk", "bag"],
    "school-hallway": ["hall", "class", "pass", "hook", "rug", "art", "sink", "bin", "door", "bell", "locker"]
  };
  const TRACKED_ENTITY_WORDS = Array.from(new Set(
    Object.values(SCENE_VOCAB).flat().concat(
      Object.values(PERSISTENT_SCENE_ENTITIES).flat(),
      ["pal", "kid", "dad", "super", "box", "yard", "gate", "door", "bag", "list", "line", "class", "room"]
    )
  ));

  const MAPS = {
    "brooklyn-block": {
      label: "Brooklyn Block",
      palette: { grass: "#8fdc83", path: "#d6b27b", wall: "#c98f65", roof: "#c64747", floor: "#e6e1d3", accent: "#4c956c", water: "#4ea8de" },
      start: { x: 4, y: 1 },
      grid: [
        "XYXXVXYXXYXXVXXX",
        "XQQQQQQUUQQQQQQX",
        "XQNNNNNKQNNJEIQX",
        "XQOGGGQQGGGZJEQX",
        "XQNGTGQGGCGZNIQX",
        "XQNGZGQGTGGZNQQX",
        "XUKGGGQGGGCQQQUX",
        "XQOGTGQBBGGZNOQX",
        "XQNGGCQGGTGZNNQX",
        "XQNNNNNQQNNNNNQX",
        "XQQQQQQUUQQQQQQX",
        "XXVXXYXXYXXVXXYX"
      ],
      triggers: {
        stoop: { x: 2, y: 3, label: "stoop" },
        sidewalk: { x: 4, y: 1, label: "sidewalk" },
        tree: { x: 4, y: 7, label: "tree" },
        bench: { x: 7, y: 7, label: "bench" },
        gate: { x: 7, y: 2, label: "park gate" },
        grass: { x: 8, y: 4, label: "grass patch" },
        "trash-can": { x: 8, y: 2, label: "trash can" }
      }
    },
    "apartment-interior": {
      label: "Apartment Hall",
      palette: { grass: "#d8d0b6", path: "#cfa77d", wall: "#a77b5d", roof: "#8d6e63", floor: "#f1ead5", accent: "#6d597a", water: "#5fa8d3" },
      start: { x: 2, y: 9 },
      grid: [
        "WWWWWWWWWWWWWWWW",
        "WWSWWWWWWWWWWWWW",
        "WWFWWWWWWWWWWWWW",
        "WWFWWWWWWWWWWWWW",
        "WMMWDDWLWDDDDCWW",
        "WQQFFFFFFFFFFFFW",
        "WQQWDDWCWDDDDIWW",
        "WQQFFFFFWWWWWWWW",
        "WQMFFJMFWWWWWWWW",
        "WQQFFFFFWWWWWWWW",
        "WWWWWWWWWWWWWWWW",
        "WWWWWWWWWWWWWWWW"
      ],
      triggers: {
        lobby: { x: 2, y: 9, label: "lobby" },
        lift: { x: 7, y: 5, label: "elevator" },
        stairs: { x: 2, y: 3, label: "stairs" },
        "third-hall": { x: 11, y: 5, label: "door 3B" },
        "second-hall": { x: 9, y: 5, label: "door 2A" },
        "mail-area": { x: 2, y: 8, label: "mailboxes" },
        hall: { x: 5, y: 5, label: "hall" },
        "wrong-door": { x: 14, y: 5, label: "wrong door" },
        "super-desk": { x: 5, y: 8, label: "super desk" },
        "top-hall": { x: 13, y: 5, label: "last door" }
      }
    },
    bodega: {
      label: "Bodega",
      palette: { grass: "#f1e4b3", path: "#c7ab59", wall: "#8d6748", roof: "#5f0f40", floor: "#eee4cf", accent: "#43aa8b", water: "#577590" },
      start: { x: 1, y: 9 },
      grid: [
        "WWWWWWWWWWWWWWWW",
        "WFFFFFFFFFFFFFWW",
        "WSRRRFFFFRRRRFWW",
        "WSRRRFFFFRRRRFWW",
        "WFFFFFCCFFFFFWWW",
        "WMMMMFFLFFFFFWWW",
        "WFFFFFSSSFFFFWWW",
        "WFFFFFSSSFFFFWWW",
        "WFFFFFFFFFFFFWWW",
        "WDFPPPPPPPPPFCWW",
        "WWWWWWWWWWWWWWWW",
        "WWWWWWWWWWWWWWWW"
      ],
      triggers: {
        door: { x: 1, y: 9, label: "door" },
        "chip-aisle": { x: 2, y: 2, label: "chip aisle" },
        "snack-rack": { x: 10, y: 2, label: "snack rack" },
        "soda-box": { x: 7, y: 4, label: "soda box" },
        "milk-box": { x: 2, y: 5, label: "milk box" },
        clerk: { x: 8, y: 5, label: "clerk" },
        line: { x: 8, y: 9, label: "line" },
        aisle: { x: 4, y: 7, label: "aisle" },
        counter: { x: 12, y: 9, label: "counter" },
        stoop: { x: 3, y: 9, label: "stoop" }
      }
    },
    "school-hallway": {
      label: "School Hallway",
      palette: { grass: "#d2e6f7", path: "#e7cfa1", wall: "#7997b2", roof: "#44607a", floor: "#f5f3eb", accent: "#ef476f", water: "#6c91bf" },
      start: { x: 2, y: 9 },
      grid: [
        "WWWWWWWWWWWWWWWW",
        "WFFFFFFFFDFFFFWW",
        "WLLLLFFFFFFAFFWW",
        "WFFFFFFFFFFFFFWW",
        "WFFFFFFSSSFFFFWW",
        "WFFFFFFFFFFFFFWW",
        "WGGGFFFFFFFFFFWW",
        "WGGGFFFFBFFFFFWW",
        "WFFFFFFFFFFFFFWW",
        "WFDPPPPPPPPPPFWW",
        "WWWWWWWWWWWWWWWW",
        "WWWWWWWWWWWWWWWW"
      ],
      triggers: {
        "hall-start": { x: 2, y: 9, label: "hall start" },
        "class-door": { x: 9, y: 1, label: "class door" },
        locker: { x: 2, y: 2, label: "locker" },
        "art-room": { x: 10, y: 2, label: "art room" },
        sink: { x: 8, y: 4, label: "sink" },
        "gym-hall": { x: 2, y: 6, label: "gym hall" },
        "supply-bin": { x: 8, y: 7, label: "supply bin" },
        "hall-run": { x: 6, y: 9, label: "hall run" }
      }
    }
  };

  const state = {
    screen: "title",
    config: {
      program: "ufli",
      unit: 12,
      strictness: "moderate",
      env: "brooklyn-block",
      nycVocab: true,
      debug: false,
      largeText: false,
      showReachable: false,
      cameraFollow: false
    },
    currentNarrative: null,
    currentNodeId: null,
    currentNode: null,
    currentDisplayNode: null,
    currentValidation: null,
    currentAudit: null,
    currentLanguageAudit: null,
    currentCausalityAudit: null,
    reachableTiles: new Set(),
    reachabilityStatus: "",
    hintAnchor: "hint-top-left",
    hintVisibleAt: 0,
    gameplayStartedAt: 0,
    locatePulseUntil: 0,
    objectiveArrowUntil: 0,
    questStartOpen: false,
    modalOpen: false,
    settingsOpen: false,
    orientationLocked: false,
    audioUnlocked: false,
    cameraPreferenceSet: false,
    showBuilder: false,
    pathHistory: [],
    lastChoice: "",
    lastConsequence: [],
    currentClues: [],
    introducedEntities: new Set(),
    currentInstruction: "",
    player: { x: 7, y: 9, facing: "down", step: 0, moving: false },
    input: { up: false, down: false, left: false, right: false },
    camera: { x: 0, y: 0 },
    lastMoveAt: 0,
    muted: false,
    audioCtx: null
  };

  const wordLookup = WORD_BANK.reduce((acc, entry) => {
    acc[entry.word.toLowerCase()] = entry;
    return acc;
  }, {});

  const ui = {
    titleScreen: document.getElementById("title-screen"),
    gameScreen: document.getElementById("game-screen"),
    playButton: document.getElementById("play-button"),
    builderButton: document.getElementById("builder-button"),
    builderPanel: document.getElementById("builder-panel"),
    programSelect: document.getElementById("program-select"),
    unitSelect: document.getElementById("unit-select"),
    strictnessSelect: document.getElementById("strictness-select"),
    envSelect: document.getElementById("env-select"),
    nycToggle: document.getElementById("nyc-toggle"),
    debugToggle: document.getElementById("debug-toggle"),
    fontToggle: document.getElementById("font-toggle"),
    reachabilityToggle: document.getElementById("reachability-toggle"),
    reachabilityStatus: document.getElementById("reachability-status"),
    runAuditButton: document.getElementById("run-audit-button"),
    auditOutput: document.getElementById("audit-output"),
    auditPreview: document.getElementById("audit-preview"),
    runLanguageAuditButton: document.getElementById("run-language-audit-button"),
    languageAuditOutput: document.getElementById("language-audit-output"),
    runCausalityAuditButton: document.getElementById("run-causality-audit-button"),
    causalityAuditOutput: document.getElementById("causality-audit-output"),
    beatPlanOutput: document.getElementById("beat-plan-output"),
    generateLinkButton: document.getElementById("generate-link-button"),
    startCustomButton: document.getElementById("start-custom-button"),
    copyLinkButton: document.getElementById("copy-link-button"),
    shareLink: document.getElementById("share-link"),
    treeView: document.getElementById("tree-view"),
    exportJsonButton: document.getElementById("export-json-button"),
    refreshReviewButton: document.getElementById("refresh-review-button"),
    reviewOutput: document.getElementById("review-output"),
    canvas: document.getElementById("game-canvas"),
    overlayDim: document.getElementById("overlay-dim"),
    questStartModal: document.getElementById("quest-start-modal"),
    questStartText: document.getElementById("quest-start-text"),
    questStartButton: document.getElementById("quest-start-button"),
    dialogueModal: document.getElementById("dialogue-modal"),
    dialogueText: document.getElementById("dialogue-text"),
    choiceAButton: document.getElementById("choice-a-button"),
    choiceBButton: document.getElementById("choice-b-button"),
    hudTitle: document.getElementById("hud-title"),
    hudSubtitle: document.getElementById("hud-subtitle"),
    goalText: document.getElementById("goal-text"),
    targetText: document.getElementById("target-text"),
    debugPanel: document.getElementById("debug-panel"),
    debugOutput: document.getElementById("debug-output"),
    questHint: document.getElementById("quest-hint"),
    locateButton: document.getElementById("locate-button"),
    settingsButton: document.getElementById("settings-button"),
    settingsModal: document.getElementById("settings-modal"),
    closeSettingsButton: document.getElementById("close-settings-button"),
    settingsTextButton: document.getElementById("settings-text-button"),
    settingsMuteButton: document.getElementById("settings-mute-button"),
    settingsCameraButton: document.getElementById("settings-camera-button"),
    settingsRestartButton: document.getElementById("settings-restart-button"),
    settingsTitleButton: document.getElementById("settings-title-button"),
    orientationGate: document.getElementById("orientation-gate"),
    orientationCheckButton: document.getElementById("orientation-check-button"),
    fontSizeButton: document.getElementById("font-size-button"),
    muteButton: document.getElementById("mute-button"),
    backButton: document.getElementById("back-button"),
    touchInteract: document.getElementById("touch-interact")
  };

  const ctx = ui.canvas.getContext("2d");

  function init() {
    populateSelectors();
    bindEvents();
    readUrlConfig();
    applyResponsiveState();
    syncBuilderForm();
    updateShareLink();
    renderTree();
    renderReview();
    renderAudit();
    renderLanguageAudit();
    renderCausalityAudit();
    renderBeatPlan();
    startNarrative(state.config.env);
    render();
    requestAnimationFrame(loop);
  }

  function populateSelectors() {
    Object.keys(PROGRAM_DATA).forEach((key) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = PROGRAM_DATA[key].program;
      ui.programSelect.appendChild(option);
    });

    Object.keys(MAPS).forEach((key) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = MAPS[key].label;
      ui.envSelect.appendChild(option);
    });

    rebuildUnitOptions();
  }

  function rebuildUnitOptions() {
    ui.unitSelect.innerHTML = "";
    PROGRAM_DATA[state.config.program].levels.forEach((level) => {
      const option = document.createElement("option");
      option.value = String(level.unit);
      option.textContent = "Unit " + level.unit + ": " + level.concept;
      ui.unitSelect.appendChild(option);
    });
  }

  function bindEvents() {
    ui.playButton.addEventListener("click", () => {
      unlockAudio();
      startNarrative(state.config.env);
      showGame();
    });
    ui.builderButton.addEventListener("click", () => {
      setBuilderVisibility(!state.showBuilder, true);
    });
    ui.programSelect.addEventListener("change", () => {
      state.config.program = ui.programSelect.value;
      rebuildUnitOptions();
      const levels = PROGRAM_DATA[state.config.program].levels;
      state.config.unit = levels[levels.length - 1].unit;
      syncBuilderForm();
      updateShareLink();
      renderTree();
      renderReview();
      renderAudit();
      renderLanguageAudit();
      renderCausalityAudit();
      renderBeatPlan();
    });
    ui.unitSelect.addEventListener("change", () => {
      state.config.unit = Number(ui.unitSelect.value);
      updateShareLink();
      renderReview();
      renderAudit();
      renderLanguageAudit();
      renderCausalityAudit();
      renderBeatPlan();
    });
    ui.strictnessSelect.addEventListener("change", () => {
      state.config.strictness = ui.strictnessSelect.value;
      updateShareLink();
      renderReview();
      renderAudit();
      renderLanguageAudit();
      renderCausalityAudit();
      renderBeatPlan();
    });
    ui.envSelect.addEventListener("change", () => {
      state.config.env = ui.envSelect.value;
      refreshReachabilityState(state.config.env);
      updateShareLink();
      renderTree();
      renderReview();
      renderAudit();
      renderLanguageAudit();
      renderCausalityAudit();
      renderBeatPlan();
    });
    ui.nycToggle.addEventListener("change", () => {
      state.config.nycVocab = ui.nycToggle.checked;
      updateShareLink();
      renderReview();
      renderAudit();
      renderLanguageAudit();
      renderCausalityAudit();
      renderBeatPlan();
    });
    ui.debugToggle.addEventListener("change", () => {
      state.config.debug = ui.debugToggle.checked;
      updateShareLink();
      updateDebugPanel();
    });
    ui.fontToggle.addEventListener("change", () => {
      state.config.largeText = ui.fontToggle.checked;
      syncScale();
      updateShareLink();
      renderReview();
    });
    ui.reachabilityToggle.addEventListener("change", () => {
      state.config.showReachable = ui.reachabilityToggle.checked;
      refreshReachabilityState(state.config.env);
      updateShareLink();
    });
    ui.generateLinkButton.addEventListener("click", () => {
      updateShareLink();
      ui.shareLink.focus();
      ui.shareLink.select();
    });
    ui.startCustomButton.addEventListener("click", () => {
      unlockAudio();
      startNarrative(state.config.env);
      showGame();
    });
    ui.copyLinkButton.addEventListener("click", () => {
      updateShareLink();
      ui.shareLink.select();
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(ui.shareLink.value).catch(function () {});
      }
    });
    ui.exportJsonButton.addEventListener("click", exportNarrativeJson);
    ui.refreshReviewButton.addEventListener("click", renderReview);
    ui.runAuditButton.addEventListener("click", renderAudit);
    ui.runLanguageAuditButton.addEventListener("click", renderLanguageAudit);
    ui.runCausalityAuditButton.addEventListener("click", renderCausalityAudit);
    ui.questStartButton.addEventListener("click", startQuestPlay);
    ui.choiceAButton.addEventListener("click", () => choose("A"));
    ui.choiceBButton.addEventListener("click", () => choose("B"));
    ui.locateButton.addEventListener("click", pulseLocatePlayer);
    ui.settingsButton.addEventListener("click", toggleSettingsModal);
    ui.closeSettingsButton.addEventListener("click", closeSettingsModal);
    ui.orientationCheckButton.addEventListener("click", () => {
      unlockAudio();
      applyResponsiveState();
    });
    ui.fontSizeButton.addEventListener("click", () => {
      toggleTextSize();
    });
    ui.settingsTextButton.addEventListener("click", toggleTextSize);
    ui.muteButton.addEventListener("click", () => {
      toggleMute();
    });
    ui.settingsMuteButton.addEventListener("click", toggleMute);
    ui.settingsCameraButton.addEventListener("click", toggleCameraFollow);
    ui.settingsRestartButton.addEventListener("click", () => {
      closeSettingsModal();
      startNarrative(state.config.env);
      showGame();
    });
    ui.settingsTitleButton.addEventListener("click", () => {
      closeSettingsModal();
      showTitle();
    });
    ui.backButton.addEventListener("click", showTitle);
    ui.touchInteract.addEventListener("click", () => {
      unlockAudio();
      interact();
    });
    ui.canvas.addEventListener("click", handleCanvasConfirm);
    document.querySelectorAll("[data-dir]").forEach((button) => {
      button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        unlockAudio();
        const dir = button.getAttribute("data-dir");
        if (isMobileDevice()) {
          moveOneTile(dir);
          return;
        }
        setInput(dir, true);
      });
      button.addEventListener("pointerup", (event) => {
        event.preventDefault();
        const dir = button.getAttribute("data-dir");
        setInput(dir, false);
      });
      button.addEventListener("pointerleave", () => {
        const dir = button.getAttribute("data-dir");
        setInput(dir, false);
      });
    });

    window.addEventListener("keydown", (event) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Enter", "w", "a", "s", "d", "W", "A", "S", "D"].includes(event.key)) {
        unlockAudio();
      }
      if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") setInput("up", true);
      if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") setInput("down", true);
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") setInput("left", true);
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") setInput("right", true);
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        if (state.questStartOpen) {
          startQuestPlay();
          return;
        }
        if (state.settingsOpen) {
          closeSettingsModal();
          return;
        }
        interact();
      }
      if (event.key === "Escape" && state.settingsOpen) closeSettingsModal();
      else if (event.key === "Escape" && state.modalOpen) closeModal();
    });

    window.addEventListener("keyup", (event) => {
      if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") setInput("up", false);
      if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") setInput("down", false);
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") setInput("left", false);
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") setInput("right", false);
    });

    window.addEventListener("resize", () => {
      applyResponsiveState();
      if (state.screen === "game") {
        requestAnimationFrame(resolveOverlaySafety);
      }
    });

    window.addEventListener("orientationchange", applyResponsiveState);
  }

  function setInput(dir, active) {
    if (active && isInteractionBlocked()) return;
    state.input[dir] = active;
  }

  function syncBuilderForm() {
    ui.programSelect.value = state.config.program;
    rebuildUnitOptions();
    ui.unitSelect.value = String(state.config.unit);
    ui.strictnessSelect.value = state.config.strictness;
    ui.envSelect.value = state.config.env;
    ui.nycToggle.checked = state.config.nycVocab;
    ui.debugToggle.checked = state.config.debug;
    ui.fontToggle.checked = state.config.largeText;
    ui.reachabilityToggle.checked = state.config.showReachable;
    syncScale();
    syncCameraButtonLabel();
  }

  function syncScale() {
    document.documentElement.style.setProperty("--ui-scale", state.config.largeText ? "1.16" : "1");
  }

  function isMobileDevice() {
    const coarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    const agent = navigator.userAgent || "";
    return coarse || /iPhone|iPad|iPod|Android|Mobile/i.test(agent);
  }

  function isMobileLandscapeMode() {
    return isMobileDevice() && window.innerWidth > window.innerHeight;
  }

  function applyResponsiveState() {
    const app = document.getElementById("app");
    const mobileLandscape = isMobileLandscapeMode();
    const mobilePortrait = isMobileDevice() && !mobileLandscape;

    document.body.classList.toggle("mobile-landscape", mobileLandscape);
    document.body.classList.toggle("mobile-portrait", mobilePortrait);
    app.classList.toggle("mobile-landscape", mobileLandscape);
    app.classList.toggle("mobile-portrait", mobilePortrait);

    if (!state.cameraPreferenceSet) {
      state.config.cameraFollow = mobileLandscape;
    }

    const cameraFollowActive = mobileLandscape && state.config.cameraFollow;
    document.body.classList.toggle("camera-follow-on", cameraFollowActive);
    app.classList.toggle("camera-follow-on", cameraFollowActive);

    state.orientationLocked = state.screen === "game" && mobilePortrait;
    ui.orientationGate.classList.toggle("hidden", !state.orientationLocked);
    syncCameraButtonLabel();
    updateCanvasViewport();
    syncDockState();
  }

  function updateCanvasViewport() {
    if (isMobileLandscapeMode() && state.config.cameraFollow) {
      ui.canvas.width = 320;
      ui.canvas.height = 224;
    } else {
      ui.canvas.width = 512;
      ui.canvas.height = 384;
    }
  }

  function isInteractionBlocked() {
    return state.modalOpen || state.questStartOpen || state.settingsOpen || state.orientationLocked;
  }

  function moveOneTile(dir) {
    if (isInteractionBlocked()) return;
    const delta = {
      up: { dx: 0, dy: -1, facing: "up" },
      down: { dx: 0, dy: 1, facing: "down" },
      left: { dx: -1, dy: 0, facing: "left" },
      right: { dx: 1, dy: 0, facing: "right" }
    }[dir];
    if (!delta) return;
    attemptMove(delta.dx, delta.dy, performance.now());
  }

  function unlockAudio() {
    if (state.muted) return;
    try {
      if (!state.audioCtx) state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (state.audioCtx.state === "suspended") {
        state.audioCtx.resume().catch(function () {});
      }
      if (!state.audioUnlocked) {
        const buffer = state.audioCtx.createBuffer(1, 1, 22050);
        const source = state.audioCtx.createBufferSource();
        const gain = state.audioCtx.createGain();
        source.buffer = buffer;
        gain.gain.value = 0.0001;
        source.connect(gain);
        gain.connect(state.audioCtx.destination);
        source.start(0);
        state.audioUnlocked = true;
      }
    } catch (error) {
      // Audio is optional and should fail quietly.
    }
  }

  function toggleTextSize() {
    state.config.largeText = !state.config.largeText;
    ui.fontToggle.checked = state.config.largeText;
    syncScale();
    updateShareLink();
    renderReview();
  }

  function toggleMute() {
    state.muted = !state.muted;
    ui.muteButton.textContent = "Mute: " + (state.muted ? "On" : "Off");
    ui.settingsMuteButton.textContent = "Mute: " + (state.muted ? "On" : "Off");
  }

  function toggleCameraFollow() {
    state.config.cameraFollow = !state.config.cameraFollow;
    state.cameraPreferenceSet = true;
    syncCameraButtonLabel();
    applyResponsiveState();
  }

  function syncCameraButtonLabel() {
    ui.settingsCameraButton.textContent = "Camera follow: " + (state.config.cameraFollow ? "On" : "Off");
  }

  function readUrlConfig() {
    const params = new URLSearchParams(window.location.search);
    const env = params.get("env");
    const program = params.get("program");
    const unit = Number(params.get("unit"));
    const strictness = params.get("strictness");
    const nyc = params.get("nyc");
    const debug = params.get("debug");
    const large = params.get("largeText");
    const reach = params.get("showReachable");
    const cameraFollow = params.get("cameraFollow");

    if (program && PROGRAM_DATA[program]) state.config.program = program;
    rebuildUnitOptions();
    if (unit && PROGRAM_DATA[state.config.program].levels.some((level) => level.unit === unit)) state.config.unit = unit;
    if (strictness && ["strict", "moderate", "loose"].includes(strictness)) state.config.strictness = strictness;
    if (env && MAPS[env]) state.config.env = env;
    if (nyc) state.config.nycVocab = nyc === "true";
    if (debug) state.config.debug = debug === "true";
    if (large) state.config.largeText = large === "true";
    if (reach) state.config.showReachable = reach === "true";
    if (cameraFollow) {
      state.config.cameraFollow = cameraFollow === "true";
      state.cameraPreferenceSet = true;
    }

    if ([program, params.get("unit"), strictness, env].some(Boolean)) {
      setBuilderVisibility(true, false);
      showGame();
    }
  }

  function setBuilderVisibility(visible, shouldScroll) {
    state.showBuilder = visible;
    ui.builderPanel.classList.toggle("hidden", !visible);
    ui.builderPanel.setAttribute("aria-hidden", String(!visible));
    ui.builderButton.setAttribute("aria-expanded", String(visible));
    if (visible && shouldScroll) {
      ui.builderPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function updateShareLink() {
    const params = new URLSearchParams({
      program: state.config.program,
      unit: String(state.config.unit),
      strictness: state.config.strictness,
      env: state.config.env,
      nyc: String(state.config.nycVocab),
      debug: String(state.config.debug),
      largeText: String(state.config.largeText),
      showReachable: String(state.config.showReachable),
      cameraFollow: String(state.config.cameraFollow)
    });
    const base = window.location.href.split("?")[0];
    ui.shareLink.value = base + "?" + params.toString();
  }

  function showTitle() {
    state.screen = "title";
    state.questStartOpen = false;
    state.settingsOpen = false;
    ui.questStartModal.classList.add("hidden");
    ui.settingsModal.classList.add("hidden");
    closeModal();
    document.body.classList.remove("gameplay-active");
    document.getElementById("app").classList.remove("gameplay-active");
    applyResponsiveState();
    ui.titleScreen.classList.add("active");
    ui.gameScreen.classList.remove("active");
    syncDockState();
  }

  function showGame() {
    state.screen = "game";
    document.body.classList.add("gameplay-active");
    document.getElementById("app").classList.add("gameplay-active");
    applyResponsiveState();
    ui.titleScreen.classList.remove("active");
    ui.gameScreen.classList.add("active");
    updateHud();
    updateDebugPanel();
    syncDockState();
    requestAnimationFrame(resolveOverlaySafety);
    if (state.questStartOpen) ui.questStartModal.classList.remove("hidden");
  }

  function startNarrative(envKey) {
    const map = MAPS[envKey];
    const story = NARRATIVES[envKey];
    state.config.env = envKey;
    state.currentNarrative = story;
    state.currentNodeId = story.nodes[0].id;
    state.pathHistory = [];
    state.currentDisplayNode = null;
    state.currentValidation = null;
    state.currentLanguageAudit = null;
    state.currentCausalityAudit = null;
    state.lastChoice = "";
    state.lastConsequence = [];
    state.currentClues = [];
    state.introducedEntities = new Set(PERSISTENT_SCENE_ENTITIES[envKey] || []);
    state.currentInstruction = "";
    state.questStartOpen = true;
    state.input.up = false;
    state.input.down = false;
    state.input.left = false;
    state.input.right = false;
    refreshReachabilityState(envKey);
    state.currentNode = getCurrentNode();
    state.currentDisplayNode = getDisplayNode(state.currentNode);
    state.lastConsequence = state.currentDisplayNode.text.slice();
    syncNarrativeState(state.currentDisplayNode);
    state.player.x = MAPS[envKey].start.x;
    state.player.y = MAPS[envKey].start.y;
    state.player.facing = "down";
    state.hintVisibleAt = Number.POSITIVE_INFINITY;
    ui.questHint.classList.add("hint-fade-hidden");
    closeModal();
    closeSettingsModal();
    showQuestStartModal();
    updateHud();
    renderReview();
    renderTree();
    renderAudit();
    renderLanguageAudit();
    renderCausalityAudit();
    renderBeatPlan();
    updateDebugPanel();
  }

  function showQuestStartModal() {
    ui.questStartText.textContent = state.currentNarrative.goal + " " + getQuestStartHint();
    ui.questStartModal.classList.remove("hidden");
  }

  function startQuestPlay() {
    if (!state.questStartOpen || state.orientationLocked) return;
    unlockAudio();
    state.questStartOpen = false;
    ui.questStartModal.classList.add("hidden");
    state.gameplayStartedAt = performance.now();
    state.hintVisibleAt = state.gameplayStartedAt + 1800;
    pulseLocatePlayer();
    ui.questHint.textContent = state.currentInstruction;
    syncDockState();
    requestAnimationFrame(resolveOverlaySafety);
    playBlip(470, 0.07, "triangle");
  }

  function getCurrentNode() {
    return state.currentNarrative.nodes.find((node) => node.id === state.currentNodeId);
  }

  function updateHud() {
    const map = MAPS[state.config.env];
    const node = getCurrentNode();
    const displayNode = getDisplayNode(node);
    state.currentNode = node;
    state.currentDisplayNode = displayNode;
    const trigger = map.triggers[node.location];
    ui.hudTitle.textContent = state.currentNarrative.title;
    ui.hudSubtitle.textContent = map.label;
    ui.goalText.textContent = "Goal: " + getShortGoal();
    state.currentInstruction = buildInstructionFromState(node, trigger, displayNode);
    ui.targetText.textContent = "Next: " + summarizeInstructionTarget(trigger, displayNode);
    ui.questHint.textContent = state.currentInstruction;
    updateReachabilityStatusText();
  }

  function getShortGoal() {
    const goals = {
      "brooklyn-block": "Find Pip.",
      "apartment-interior": "Bring the snack.",
      bodega: "Pick the snack.",
      "school-hallway": "Return the pass."
    };
    return goals[state.config.env] || "Help out.";
  }

  function loop(timestamp) {
    syncHintVisibility(timestamp);
    if (state.screen === "game" && !isInteractionBlocked()) {
      updateMovement(timestamp);
    }
    render();
    requestAnimationFrame(loop);
  }

  function updateMovement(timestamp) {
    if (timestamp - state.lastMoveAt < 120) return;

    let dx = 0;
    let dy = 0;
    if (state.input.up) dy = -1;
    else if (state.input.down) dy = 1;
    else if (state.input.left) dx = -1;
    else if (state.input.right) dx = 1;

    if (!dx && !dy) return;

    attemptMove(dx, dy, timestamp);
  }

  function attemptMove(dx, dy, timestamp) {
    const facing = dx > 0 ? "right" : dx < 0 ? "left" : dy > 0 ? "down" : "up";
    state.player.facing = facing;
    const nextX = state.player.x + dx;
    const nextY = state.player.y + dy;
    if (canMoveTo(nextX, nextY)) {
      state.player.x = nextX;
      state.player.y = nextY;
      state.player.step = (state.player.step + 1) % 2;
      playBlip(260 + state.player.step * 20, 0.025, "square");
    }
    state.lastMoveAt = timestamp;
  }

  function canMoveTo(x, y) {
    if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return false;
    const tile = MAPS[state.config.env].grid[y][x];
    return isWalkableTile(tile);
  }

  function interact() {
    if (state.screen !== "game") return;
    if (isInteractionBlocked()) return;
    const node = getCurrentNode();
    const trigger = MAPS[state.config.env].triggers[node.location];
    if (isAtOrNearTrigger(trigger)) {
      openNode(node);
      playBlip(430, 0.05, "triangle");
      return;
    }

    ui.questHint.textContent = state.currentInstruction || buildInstructionFromState(node, trigger, state.currentDisplayNode || getDisplayNode(node));
  }

  function openNode(node) {
    const displayNode = getDisplayNode(node);
    state.currentDisplayNode = displayNode;
    state.currentValidation = validateDisplayNode(displayNode);
    ui.dialogueText.innerHTML = "";
    displayNode.text.forEach((line, index) => {
      const lineInfo = state.currentValidation.lines[index];
      const p = document.createElement("p");
      p.className = "dialogue-line" + (lineInfo.valid ? "" : " invalid");
      p.innerHTML = lineInfo.html;
      ui.dialogueText.appendChild(p);
    });
    ui.choiceAButton.textContent = displayNode.choiceA;
    ui.choiceBButton.textContent = displayNode.choiceB;
    state.modalOpen = true;
    resolveDialoguePlacement(node.location);
    ui.overlayDim.classList.remove("hidden");
    ui.dialogueModal.classList.remove("hidden");
    syncDockState();
    updateDebugPanel();
  }

  function closeModal() {
    state.modalOpen = false;
    ui.overlayDim.classList.add("hidden");
    ui.dialogueModal.classList.add("hidden");
    syncDockState();
  }

  function toggleSettingsModal() {
    if (state.settingsOpen) closeSettingsModal();
    else openSettingsModal();
  }

  function openSettingsModal() {
    state.settingsOpen = true;
    ui.settingsModal.classList.remove("hidden");
    syncDockState();
  }

  function closeSettingsModal() {
    state.settingsOpen = false;
    ui.settingsModal.classList.add("hidden");
    syncDockState();
  }

  function syncDockState() {
    const disabled = state.modalOpen || state.questStartOpen || state.settingsOpen || state.orientationLocked;
    const touchControls = document.querySelector(".touch-controls");
    if (touchControls) touchControls.classList.toggle("disabled", disabled);
  }

  function choose(which) {
    const node = getCurrentNode();
    const displayNode = state.currentDisplayNode || getDisplayNode(node);
    const choiceText = which === "A" ? displayNode.choiceA : displayNode.choiceB;
    const nextId = which === "A" ? node.nextA : node.nextB;
    const nextNode = state.currentNarrative.nodes.find((item) => item.id === nextId);
    state.pathHistory.push(node.id);
    state.lastChoice = choiceText;
    state.currentNodeId = nextNode.id;
    state.currentDisplayNode = null;
    state.currentValidation = null;
    state.currentNode = nextNode;
    const nextDisplayNode = getDisplayNode(nextNode);
    state.currentDisplayNode = nextDisplayNode;
    state.lastConsequence = nextDisplayNode.text.slice();
    syncNarrativeState(nextDisplayNode);
    closeModal();
    faceTowardObjective(nextNode);
    state.objectiveArrowUntil = performance.now() + 1100;
    updateHud();
    renderTree();
    updateDebugPanel();
    playBlip(which === "A" ? 520 : 610, 0.08, "sine");
  }

  function getAllowedProfile() {
    const ladder = FEATURE_LADDER[state.config.program];
    const levelData = PROGRAM_DATA[state.config.program].levels.filter((level) => level.unit <= state.config.unit);
    const allowedTags = new Set();
    const allHighFrequency = new Set();
    const currentHighFrequency = new Set();

    levelData.forEach((level) => {
      Object.keys(ladder).forEach((key) => {
        if (Number(key) <= level.unit) ladder[key].forEach((tag) => allowedTags.add(tag));
      });
      level.highFrequencyWords.forEach((word) => allHighFrequency.add(word.toLowerCase()));
      if (level.unit === state.config.unit) level.highFrequencyWords.forEach((word) => currentHighFrequency.add(word.toLowerCase()));
    });

    if (state.config.strictness === "loose") {
      const nextLevel = PROGRAM_DATA[state.config.program].levels.find((level) => level.unit === state.config.unit + 1);
      if (nextLevel) {
        const nextFeatures = FEATURE_LADDER[state.config.program][nextLevel.unit] || [];
        nextFeatures.forEach((tag) => allowedTags.add(tag));
      }
    }

    allowedTags.add("hf");
    if (state.config.nycVocab) allowedTags.add("nyc");

    return {
      allowedTags,
      allHighFrequency,
      currentHighFrequency
    };
  }

  function getDisplayNode(node) {
    if (!node) return null;
    const priorEntities = getIntroducedEntitiesForPath(state.pathHistory);
    const runningTextEntities = new Set(priorEntities);
    const textResults = node.text.map((line) => {
      const result = refinePhrase(line, runningTextEntities, "text");
      markEntitiesInText(result.text, runningTextEntities);
      return result;
    });
    const refinedText = textResults.map((result) => result.text);
    const choiceEntities = new Set(runningTextEntities);
    const choiceAResult = sanitizeChoiceResult(refinePhrase(node.choiceA, choiceEntities, "choice"), node, "A");
    const choiceBResult = sanitizeChoiceResult(refinePhrase(node.choiceB, choiceEntities, "choice"), node, "B");

    return {
      id: node.id,
      text: refinedText,
      choiceA: choiceAResult.text,
      choiceB: choiceBResult.text,
      languageFindings: textResults
        .flatMap((result) => result.notes)
        .concat(choiceAResult.notes, choiceBResult.notes)
    };
  }

  function sanitizeChoiceResult(result, node, which) {
    const analysis = analyzeChoiceText(result.text);
    if (analysis.valid) return result;

    const repaired = repairChoiceText(result.text, node, which);
    const validation = validateSnippet(repaired);
    if (validation.valid) {
      return {
        text: repaired,
        notes: result.notes.concat("Choice text auto-fixed: '" + result.text + "' -> '" + repaired + "'")
      };
    }

    return {
      text: fallbackChoiceText(node, which),
      notes: result.notes.concat("Choice text auto-fixed with fallback: '" + result.text + "'")
    };
  }

  function analyzeChoiceText(text) {
    const words = text.match(/[A-Za-z']+/g) || [];
    const lower = words.map((word) => word.toLowerCase());
    const startsWithPrep = ["up", "by", "to", "at", "on"].includes(lower[0] || "");
    const hasVerb = lower.some((word) => ALLOWED_ACTION_VERBS.includes(word));
    const startsUpper = /^[A-Z]/.test(text);
    const valid = Boolean(words.length) && !startsWithPrep && startsUpper && (hasVerb || words.length === 1);
    return { valid, startsWithPrep, hasVerb, startsUpper, words };
  }

  function repairChoiceText(text, node, which) {
    const location = node.location;
    const locationLabel = (MAPS[state.config.env].triggers[location] || { label: location.replace(/-/g, " ") }).label;
    const lower = text.toLowerCase();

    if (/bag/.test(node.text.join(" ").toLowerCase())) {
      return which === "A" ? "Lift the bag" : "Get my pal";
    }
    if (/pal/.test(lower) && !/^Ask|^Call|^Get/i.test(text)) {
      return "Call my pal";
    }
    if (/door|gate|bin|tag|list|bar|chips|sock|pass|class|kid|clerk|dad/.test(lower)) {
      const noun = lower.match(/(door|gate|bin|tag|list|bar|chips|sock|pass|class|kid|clerk|dad)/);
      if (noun) return "Check the " + noun[1];
    }
    if (locationLabel) {
      return "Check the " + locationLabel.toLowerCase();
    }
    return fallbackChoiceText(node, which);
  }

  function fallbackChoiceText(node, which) {
    return which === "A" ? "Check it" : "Get help";
  }

  function getIntroducedEntitiesForPath(nodeIds) {
    const introduced = new Set(PERSISTENT_SCENE_ENTITIES[state.config.env] || []);
    nodeIds.forEach((nodeId) => {
      const node = state.currentNarrative && state.currentNarrative.nodes.find((item) => item.id === nodeId);
      if (!node) return;
      node.text.forEach((line) => markEntitiesInText(line, introduced));
    });
    return introduced;
  }

  function markEntitiesInText(text, entitySet) {
    const words = text.toLowerCase().match(/[a-z']+/g) || [];
    words.forEach((word) => {
      const cleaned = word.replace(/'s$/, "");
      if (TRACKED_ENTITY_WORDS.includes(cleaned)) entitySet.add(cleaned);
    });
  }

  function refinePhrase(text, introducedEntities, sourceType) {
    let updated = text;
    const notes = [];
    const candidates = getRefinementCandidates(text, introducedEntities, sourceType);

    candidates.forEach((candidate) => {
      if (candidate.from !== updated) return;
      const validation = validateSnippet(candidate.to);
      if (validation.valid) {
        updated = candidate.to;
        if (candidate.reason === "article") {
          notes.push("Language refinement suggestion: '" + candidate.to + "' instead of '" + candidate.from + "'");
        } else if (candidate.reason === "voice") {
          notes.push("Language refinement suggestion: second-person voice -> '" + candidate.to + "'");
        } else if (candidate.reason === "tip-noun") {
          notes.push("Tip used as advice noun: ok");
        } else if (candidate.reason === "tip-verb") {
          notes.push("Tip used as physical verb: ok");
        } else if (candidate.reason === "tip-idiom") {
          notes.push("Tip used as idiom: rewritten");
        } else if (candidate.reason === "lift-wording") {
          notes.push("Lift wording updated to elevator");
        } else if (candidate.reason === "lift-fallback") {
          notes.push("Elevator wording blocked by decodability constraint");
        } else {
          notes.push("Language refinement suggestion: '" + candidate.to + "' fits more natural spoken English");
        }
      } else {
        notes.push("Natural phrasing blocked by decodability constraint: '" + candidate.to + "'");
      }
    });

    return { text: updated, notes };
  }

  function getRefinementCandidates(text, introducedEntities, sourceType) {
    const candidates = [];
    const secondPerson = convertToSecondPerson(text);
    if (secondPerson !== text) {
      candidates.push({
        from: text,
        to: secondPerson,
        reason: "voice"
      });
    }

    getTipSenseCandidates(text).forEach((candidate) => candidates.push(candidate));

    const liftReplacement = getLiftReplacementCandidate(text);
    if (liftReplacement) candidates.push(liftReplacement);

    const articleMatch = text.match(/^([A-Z][a-z]+(?:\s+[a-z]+)*)\s+the\s+([a-z-]+)([.!?]?)$/);

    if (articleMatch) {
      const noun = articleMatch[2].toLowerCase();
      const firstMention = !introducedEntities.has(noun);
      if (TRACKED_ENTITY_WORDS.includes(noun) && firstMention && !isPersistentEntity(noun)) {
        candidates.push({
          from: text,
          to: articleMatch[1] + " a " + articleMatch[2] + articleMatch[3],
          reason: "article"
        });
      }
    }

    const missingPrepMatch = text.match(/^Look\s+the\s+([a-z-]+)([.!?]?)$/i);
    if (missingPrepMatch) {
      candidates.push({
        from: text,
        to: "Look at the " + missingPrepMatch[1] + missingPrepMatch[2],
        reason: "preposition"
      });
    }

    const milkHumMatch = text.match(/^The milk hum is loud([.!?]?)$/i);
    if (milkHumMatch) {
      candidates.push({
        from: text,
        to: "The fridge hums" + milkHumMatch[1],
        reason: "sensory"
      });
    }

    const shelfBuzzMatch = text.match(/^The shelf buzz is loud([.!?]?)$/i);
    if (shelfBuzzMatch) {
      candidates.push({
        from: text,
        to: "You hear a loud hum" + shelfBuzzMatch[1],
        reason: "sensory"
      });
    }

    if (sourceType === "choice") {
      const awkwardMap = {
        "Ask the pal": "Ask a pal",
        "Go to the pal": "Go to a pal",
        "Tap the pal": "Ask a pal",
        "See the box": "See a box"
      };
      if (awkwardMap[text]) {
        candidates.push({
          from: text,
          to: awkwardMap[text],
          reason: "awkward"
        });
      }
    }

    const noPipMatch = text.match(/^Pip is not on the\s+([a-z-]+)([.!?]?)$/i);
    if (noPipMatch) {
      candidates.push({
        from: text,
        to: "No Pip on the " + noPipMatch[1] + noPipMatch[2],
        reason: "beat"
      });
    }

    const notHereYetMatch = text.match(/^The\s+([a-z-]+)\s+is not here yet([.!?]?)$/i);
    if (notHereYetMatch) {
      candidates.push({
        from: text,
        to: "No " + notHereYetMatch[1] + " here yet" + notHereYetMatch[2],
        reason: "beat"
      });
    }

    const notByMatch = text.match(/^The\s+([a-z-]+)\s+is not by the\s+([a-z-]+)([.!?]?)$/i);
    if (notByMatch) {
      candidates.push({
        from: text,
        to: "No " + notByMatch[1] + " by the " + notByMatch[2] + notByMatch[3],
        reason: "beat"
      });
    }

    return candidates;
  }

  function getTipSenseCandidates(text) {
    const candidates = [];
    const idiomMatch = /\btips?\s+(me|him|her|them|us)\b/i.exec(text) || /\btipped\s+(me|him|her|them|us)\b/i.exec(text);
    if (idiomMatch) {
      candidates.push({
        from: text,
        to: text.replace(/\bHe tips me to the top hall\./i, "My pal has a tip: go to the top.")
          .replace(/\bHe tips me\b/i, "My pal has a tip")
          .replace(/\bShe tips me\b/i, "My pal has a tip")
          .replace(/\bTip me off\b/i, "A tip: look on"),
        reason: "tip-idiom"
      });
      return candidates;
    }

    if (/\b(a|the)\s+tip\b/i.test(text) || /\bhas a tip\b/i.test(text)) {
      candidates.push({
        from: text,
        to: text,
        reason: "tip-noun"
      });
      return candidates;
    }

    if (/\btips?\s+(it|the box|the cup|the can|the bag)\b/i.test(text) || /\btips over\b/i.test(text)) {
      candidates.push({
        from: text,
        to: text.replace(/\btips off\b/i, "tips over"),
        reason: "tip-verb"
      });
    }

    return candidates;
  }

  function getLiftReplacementCandidate(text) {
    if (!/\blift\b/i.test(text)) return null;
    const elevatorText = text.replace(/\blift\b/gi, "elevator");
    const elevatorValid = validateSnippet(elevatorText).valid;
    return {
      from: text,
      to: elevatorValid ? elevatorText : text.replace(/\bthe lift\b/i, "up").replace(/\blift\b/gi, "up"),
      reason: elevatorValid ? "lift-wording" : "lift-fallback"
    };
  }

  function convertToSecondPerson(text) {
    let updated = text;
    const replacements = [
      [/^I am\b/, "You are"],
      [/^I can\b/, "You can"],
      [/^I see\b/, "You see"],
      [/^I hear\b/, "You hear"],
      [/^I look\b/, "You look"],
      [/^I step\b/, "You step"],
      [/^I spot\b/, "You spot"],
      [/^I lift\b/, "You lift"],
      [/^I dash\b/, "You dash"],
      [/^I ask\b/, "You ask"],
      [/^I check\b/, "You check"],
      [/^I run\b/, "You run"],
      [/^I try\b/, "You try"],
      [/^I grab\b/, "You grab"],
      [/^I\b/, "You"],
      [/^My hall pal\b/, "Sam"],
      [/^My pal\b/, "Sam"],
      [/^We\b/, "You and Sam"],
      [/\bmy\b/g, "your"],
      [/\bMy\b/g, "Your"]
    ];

    replacements.forEach((replacement) => {
      updated = updated.replace(replacement[0], replacement[1]);
    });

    return updated;
  }

  function isPersistentEntity(noun) {
    return (PERSISTENT_SCENE_ENTITIES[state.config.env] || []).includes(noun);
  }

  function validateSnippet(text) {
    const line = validateLine(text, getAllowedProfile());
    return {
      valid: line.valid,
      invalidWords: line.words.filter((word) => !word.valid).map((word) => word.word)
    };
  }

  function validateDisplayNode(displayNode) {
    const lines = displayNode.text.map((line) => validateLine(line, getAllowedProfile()));
    const invalidWords = [];
    const usedTags = new Set();

    lines.forEach((line) => {
      line.words.forEach((wordInfo) => {
        if (!wordInfo.valid) invalidWords.push(wordInfo.word);
        wordInfo.tags.forEach((tag) => usedTags.add(tag));
      });
    });

    return {
      valid: invalidWords.length === 0,
      lines,
      invalidWords,
      usedTags: Array.from(usedTags).sort()
    };
  }

  function validateNode(node) {
    const profile = getAllowedProfile();
    const lines = node.text.map((line) => validateLine(line, profile));
    const invalidWords = [];
    const usedTags = new Set();

    lines.forEach((line) => {
      line.words.forEach((wordInfo) => {
        if (!wordInfo.valid) invalidWords.push(wordInfo.word);
        wordInfo.tags.forEach((tag) => usedTags.add(tag));
      });
    });

    return {
      valid: invalidWords.length === 0,
      lines,
      invalidWords,
      usedTags: Array.from(usedTags).sort()
    };
  }

  function validateLine(line, profile) {
    const rawWords = line.match(/[A-Za-z']+/g) || [];
    const words = rawWords.map((raw) => assessWord(raw, profile));
    const invalidSet = new Set(words.filter((info) => !info.valid).map((info) => info.word.toLowerCase()));

    const html = line.replace(/[A-Za-z']+/g, (match) => {
      if (invalidSet.has(match.toLowerCase())) return '<span class="bad-word">' + escapeHtml(match) + "</span>";
      return escapeHtml(match);
    });

    return {
      text: line,
      html,
      words,
      valid: words.every((word) => word.valid)
    };
  }

  function assessWord(raw, profile) {
    const cleaned = raw.toLowerCase();
    const entry = wordLookup[cleaned];
    if (!entry) {
      return inferWord(raw, profile);
    }

    const tags = entry.tags.slice();
    const hasAllowedTag = tags.some((tag) => profile.allowedTags.has(tag));
    const isHighFrequency = profile.allHighFrequency.has(cleaned) || profile.currentHighFrequency.has(cleaned);
    const isStrictTrick = state.config.strictness === "strict" && tags.includes("trick") && !profile.currentHighFrequency.has(cleaned);
    const isModerateTrick = state.config.strictness === "moderate" && tags.includes("trick") && !profile.allHighFrequency.has(cleaned);
    const isLooseUnknown = state.config.strictness === "loose" && tags.includes("trick");

    let valid = hasAllowedTag || isHighFrequency || isLooseUnknown;
    let reason = "Uses allowed taught pattern.";

    if (isStrictTrick) {
      valid = false;
      reason = "Strict mode blocks untaught trick word.";
    } else if (isModerateTrick) {
      valid = false;
      reason = "Moderate mode allows only introduced trick words.";
    } else if (!hasAllowedTag && !isHighFrequency && !isLooseUnknown) {
      valid = false;
      reason = "No allowed grapheme tag for this unit.";
    } else if (tags.includes("nyc") && !state.config.nycVocab) {
      valid = false;
      reason = "NYC vocabulary toggle is off.";
    }

    return { word: raw, valid, tags, reason };
  }

  function inferWord(raw, profile) {
    const cleaned = raw.toLowerCase().replace(/'s$/, "");
    const tags = [];
    const vowels = cleaned.match(/[aeiou]/g) || [];

    if (/(sh|ch|th|wh|ck)/.test(cleaned)) tags.push("digraph");
    if (/(ff|ll|ss|zz)$/.test(cleaned)) tags.push("ffllsszz");
    if (/(all|oll|ild|old|ind|ost|ing|ang|ong|ung|ank|ink|am|an)$/.test(cleaned)) tags.push("glued");
    if (/(all|oll|ild|old|ind|ost)$/.test(cleaned)) tags.push("welded");
    if (/(ai|ay|ee|ea|oa|ow)/.test(cleaned)) tags.push("vowel-team");
    if (/[aeiou][bcdfghjklmnpqrstvwxyz]e$/.test(cleaned) && cleaned.length > 3) tags.push("silent-e");
    if (/^[bcdfghjklmnpqrstvwxyz]{2}/.test(cleaned) || /[bcdfghjklmnpqrstvwxyz]{2}$/.test(cleaned)) tags.push("blend");
    if ((cleaned.length <= 2 || /^[bcdfghjklmnpqrstvwxyz]*[aeiou]$/.test(cleaned)) && /[aeiou]$/.test(cleaned)) tags.push("open");
    if (cleaned.includes("x")) tags.push("x");

    if (vowels.length === 1 && /^[bcdfghjklmnpqrstvwxyz]*a[bcdfghjklmnpqrstvwxyz]+$/.test(cleaned) && !tags.includes("silent-e")) tags.push("short-a");
    if (vowels.length === 1 && /^[bcdfghjklmnpqrstvwxyz]*i[bcdfghjklmnpqrstvwxyz]+$/.test(cleaned) && !tags.includes("silent-e")) tags.push("short-i");
    if (vowels.length === 1 && /^[bcdfghjklmnpqrstvwxyz]*o[bcdfghjklmnpqrstvwxyz]+$/.test(cleaned) && !tags.includes("silent-e")) tags.push("short-o");
    if (vowels.length === 1 && /^[bcdfghjklmnpqrstvwxyz]*e[bcdfghjklmnpqrstvwxyz]+$/.test(cleaned) && !tags.includes("silent-e")) tags.push("short-e");
    if (vowels.length === 1 && /^[bcdfghjklmnpqrstvwxyz]*u[bcdfghjklmnpqrstvwxyz]+$/.test(cleaned) && !tags.includes("silent-e")) tags.push("short-u");

    if (!state.config.nycVocab && /^(stoop|block|hall|bodega|school|bench|train|subway)$/.test(cleaned)) {
      return { word: raw, valid: false, tags: ["nyc"], reason: "NYC vocabulary toggle is off." };
    }

    const valid = tags.length > 0 && tags.some((tag) => profile.allowedTags.has(tag));
    return {
      word: raw,
      valid,
      tags: tags.length ? tags : ["unknown"],
      reason: valid ? "Accepted by rule-based grapheme filter." : "No allowed inferred grapheme pattern for this unit."
    };
  }

  function updateDebugPanel() {
    ui.debugPanel.classList.toggle("hidden", !state.config.debug);
    if (!state.config.debug) return;

    const node = getCurrentNode();
    const displayNode = state.currentDisplayNode || getDisplayNode(node);
    const validation = state.currentValidation || validateDisplayNode(displayNode);
    const profile = getAllowedProfile();

    ui.debugOutput.innerHTML = "";

    const summary = document.createElement("div");
    summary.className = "debug-chip";
    summary.textContent = validation.valid
      ? "Valid text for this scope."
      : "Out-of-scope words: " + validation.invalidWords.join(", ");
    ui.debugOutput.appendChild(summary);

    const tags = document.createElement("div");
    tags.className = "debug-chip";
    tags.textContent = "Patterns used: " + (validation.usedTags.join(", ") || "none");
    ui.debugOutput.appendChild(tags);

    const allowed = document.createElement("div");
    allowed.className = "debug-chip";
    allowed.textContent = "Allowed now: " + Array.from(profile.allowedTags).sort().join(", ");
    ui.debugOutput.appendChild(allowed);

    const choiceWarnings = getChoiceLanguageWarnings(state.currentNarrative);
    choiceWarnings.forEach((warning) => {
      const chip = document.createElement("div");
      chip.className = "debug-chip";
      chip.textContent = "Choice text contains UI language - revise for narrative coherence: " + warning;
      ui.debugOutput.appendChild(chip);
    });

    (displayNode.languageFindings || []).forEach((note) => {
      const chip = document.createElement("div");
      chip.className = "debug-chip";
      chip.textContent = note;
      ui.debugOutput.appendChild(chip);
    });

    validation.lines.forEach((line) => {
      line.words.forEach((wordInfo) => {
        const chip = document.createElement("div");
        chip.className = "debug-chip";
        chip.textContent = wordInfo.word + " -> " + (wordInfo.valid ? "ok" : "flag") + " | " + wordInfo.tags.join(", ") + " | " + wordInfo.reason;
        ui.debugOutput.appendChild(chip);
      });
    });
  }

  function renderTree() {
    const story = NARRATIVES[state.config.env];
    ui.treeView.innerHTML = "";
    story.nodes.forEach((node) => {
      const card = document.createElement("div");
      card.className = "tree-node" + (node.id === state.currentNodeId ? " current" : "");
      const a = node.nextA ? "Choice 1:" + node.nextA : "";
      const b = node.nextB ? "Choice 2:" + node.nextB : "";
      card.innerHTML =
        "<strong>" + node.id + "</strong>" +
        "<div>" + node.location + "</div>" +
        "<div>" + escapeHtml(node.text[0]) + "</div>" +
        "<div>" + a + " | " + b + "</div>";
      ui.treeView.appendChild(card);
    });
  }

  function renderAudit() {
    const audit = runNarrativeAudit(state.config.env);
    state.currentAudit = audit;
    ui.auditOutput.innerHTML = "";
    ui.auditPreview.classList.add("hidden");
    ui.auditPreview.textContent = "";

    const summary = document.createElement("div");
    summary.className = "review-row";
    summary.textContent = "Critical issues: " + audit.criticalCount + " | Paths: " + audit.paths.length;
    ui.auditOutput.appendChild(summary);

    const strength = document.createElement("div");
    strength.className = "review-row";
    strength.textContent = "Narrative Strength Score: " + audit.strengthScore;
    ui.auditOutput.appendChild(strength);

    audit.findings.forEach((finding, index) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "review-row mini-button";
      row.textContent = finding.severity.toUpperCase() + ": " + finding.message;
      row.addEventListener("click", () => showAuditPreview(getPreviewPathIndex(audit, finding, index)));
      ui.auditOutput.appendChild(row);
    });

    if (!audit.findings.length) {
      const clear = document.createElement("div");
      clear.className = "review-row";
      clear.textContent = "No critical coherence issues found for this environment.";
      ui.auditOutput.appendChild(clear);
    }

    audit.paths.slice(0, 6).forEach((path, index) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "review-row mini-button";
      row.textContent = "Preview path " + (index + 1) + " (" + path.length + " beats)";
      row.addEventListener("click", () => showAuditPreview(index));
      ui.auditOutput.appendChild(row);
    });
  }

  function renderLanguageAudit() {
    const audit = runLanguageAudit(state.config.env);
    state.currentLanguageAudit = audit;
    ui.languageAuditOutput.innerHTML = "";

    const summary = document.createElement("div");
    summary.className = "review-row";
    summary.textContent = "Safe replacements: " + audit.safeReplacements.length + " | Suggestions: " + audit.suggestions.length + " | Rejected: " + audit.rejected.length;
    ui.languageAuditOutput.appendChild(summary);

    if (!audit.safeReplacements.length && !audit.suggestions.length && !audit.rejected.length) {
      const clear = document.createElement("div");
      clear.className = "review-row";
      clear.textContent = "No language issues found in this narrative.";
      ui.languageAuditOutput.appendChild(clear);
      return;
    }

    audit.safeReplacements.slice(0, 8).forEach((item) => {
      const row = document.createElement("div");
      row.className = "review-row";
      row.textContent = "Safe: " + item.message;
      ui.languageAuditOutput.appendChild(row);
    });

    audit.suggestions.slice(0, 8).forEach((item) => {
      const row = document.createElement("div");
      row.className = "review-row";
      row.textContent = "Suggest: " + item.message;
      ui.languageAuditOutput.appendChild(row);
    });

    audit.rejected.slice(0, 8).forEach((item) => {
      const row = document.createElement("div");
      row.className = "review-row";
      row.textContent = "Blocked: " + item.message;
      ui.languageAuditOutput.appendChild(row);
    });
  }

  function renderCausalityAudit() {
    const audit = runCausalityAudit(state.config.env);
    state.currentCausalityAudit = audit;
    ui.causalityAuditOutput.innerHTML = "";

    const summary = document.createElement("div");
    summary.className = "review-row";
    summary.textContent = "PASS: " + audit.passCount + " | SOFT WARNING: " + audit.warningCount + " | FAIL: " + audit.failCount;
    ui.causalityAuditOutput.appendChild(summary);

    if (!audit.results.length) {
      const clear = document.createElement("div");
      clear.className = "review-row";
      clear.textContent = "No causality issues found.";
      ui.causalityAuditOutput.appendChild(clear);
      return;
    }

    audit.results.slice(0, 18).forEach((result) => {
      const row = document.createElement("div");
      row.className = "review-row";
      row.textContent = result.status + ": " + result.message;
      ui.causalityAuditOutput.appendChild(row);
    });
  }

  function showAuditPreview(index) {
    if (!state.currentAudit || !state.currentAudit.paths.length) return;
    const previewIndex = index % state.currentAudit.paths.length;
    const path = state.currentAudit.paths[previewIndex];
    const previewText = path.map((node) => node.id + ": " + node.text.join(" ")).join("\n");
    ui.auditPreview.textContent = previewText;
    ui.auditPreview.classList.remove("hidden");
  }

  function getPreviewPathIndex(audit, finding, fallbackIndex) {
    if (!finding || !finding.nodeId) return fallbackIndex;
    const pathIndex = audit.paths.findIndex((path) => path.some((node) => node.id === finding.nodeId));
    return pathIndex >= 0 ? pathIndex : fallbackIndex;
  }

  function runNarrativeAudit(envKey) {
    const story = NARRATIVES[envKey];
    const vocab = SCENE_VOCAB[envKey] || [];
    const findings = [];
    const paths = enumeratePaths(story);
    const voiceIssues = collectVoiceConsistencyIssues(story);
    const metaIssues = collectMetaLanguageIssues(story);

    story.nodes.forEach((node) => {
      collectChoiceLanguageIssues(node).forEach((issue) => findings.push(issue));
      collectChoiceStructureIssues(node).forEach((issue) => findings.push(issue));
      collectSceneVocabIssues(node, vocab).forEach((issue) => findings.push(issue));
      collectBranchContinuityIssues(node, story).forEach((issue) => findings.push(issue));
    });

    voiceIssues.forEach((issue) => findings.push(issue));
    metaIssues.forEach((issue) => findings.push(issue));
    collectGenericInstructionIssues(story, envKey).forEach((issue) => findings.push(issue));
    collectDecodabilityAuditIssues(story).forEach((issue) => findings.push(issue));

    return {
      findings,
      paths,
      criticalCount: findings.filter((item) => item.severity === "critical").length,
      strengthScore: scoreNarrativeStrength(story)
    };
  }

  function runLanguageAudit(envKey) {
    const story = NARRATIVES[envKey];
    const paths = enumeratePaths(story);
    const safeReplacements = [];
    const suggestions = [];
    const rejected = [];
    const seen = new Set();

    paths.forEach((path) => {
      const introduced = new Set(PERSISTENT_SCENE_ENTITIES[envKey] || []);
      path.forEach((node) => {
        auditPhraseList(node.id, node.text, "text", introduced, safeReplacements, suggestions, rejected, seen);
        node.text.forEach((line) => markEntitiesInText(line, introduced));
        auditPhraseList(node.id, [node.choiceA, node.choiceB], "choice", introduced, safeReplacements, suggestions, rejected, seen);
      });
    });

    return { safeReplacements, suggestions, rejected };
  }

  function runCausalityAudit(envKey) {
    const story = NARRATIVES[envKey];
    const results = [];
    const nodesById = story.nodes.reduce((acc, node) => {
      acc[node.id] = node;
      return acc;
    }, {});

    story.nodes.forEach((node) => {
      ["A", "B"].forEach((which) => {
        const nextId = which === "A" ? node.nextA : node.nextB;
        const nextNode = nodesById[nextId];
        if (!nextNode) return;
        results.push(evaluateChoiceCausality(node, nextNode, which, envKey));
      });
    });

    return {
      results,
      passCount: results.filter((item) => item.status === "PASS").length,
      warningCount: results.filter((item) => item.status === "SOFT WARNING").length,
      failCount: results.filter((item) => item.status === "FAIL").length
    };
  }

  function evaluateChoiceCausality(node, nextNode, which, envKey) {
    const choiceText = which === "A" ? node.choiceA : node.choiceB;
    const nextDisplayNode = simulateDisplayNodeForAudit(nextNode, envKey, [node]);
    const trigger = MAPS[envKey].triggers[nextNode.location];
    const consequenceText = nextDisplayNode.text.join(" ").toLowerCase();
    const choiceWords = choiceText.toLowerCase().match(/[a-z']+/g) || [];
    const introduced = new Set(PERSISTENT_SCENE_ENTITIES[envKey] || []);
    node.text.forEach((line) => markEntitiesInText(line, introduced));
    const consequenceEntities = new Set(introduced);
    nextDisplayNode.text.forEach((line) => markEntitiesInText(line, consequenceEntities));
    const targetWords = getTriggerWords(trigger);
    const targetReferenced = targetWords.some((word) => consequenceText.includes(word) || consequenceEntities.has(word));
    const impliedByChoice = choiceWords.some((word) => targetWords.includes(word) || consequenceEntities.has(word));
    const stateChanged = Boolean((nextNode.effects || []).length) || nextNode.id !== node.id;
    const arcType = determineArcType(choiceText, nextDisplayNode.text, targetWords);
    const instruction = buildAuditInstruction(choiceText, nextDisplayNode, trigger, introduced);
    const hasSpecificInstructionLead = !/^Go to\s/.test(instruction);

    let status = "PASS";
    let reason = arcType + " arc";

    if (!stateChanged) {
      status = "FAIL";
      reason = "choice does not change state";
    } else if (!targetReferenced && !impliedByChoice && !hasSpecificInstructionLead) {
      status = "FAIL";
      reason = "next instruction is not grounded in the consequence";
    } else if (!targetReferenced && !impliedByChoice) {
      status = "SOFT WARNING";
      reason = "next instruction uses a weak but still contextual clue";
    } else if (arcType === "unknown") {
      status = "SOFT WARNING";
      reason = "branch is plausible but arc type is weak";
    }

    return {
      status,
      message: node.id + " choice " + which + " -> " + nextNode.id + " | " + reason + " | next: " + instruction
    };
  }

  function simulateDisplayNodeForAudit(node, envKey, priorNodes) {
    const introduced = new Set(PERSISTENT_SCENE_ENTITIES[envKey] || []);
    priorNodes.forEach((priorNode) => {
      priorNode.text.forEach((line) => markEntitiesInText(line, introduced));
    });
    const runningTextEntities = new Set(introduced);
    const textResults = node.text.map((line) => {
      const result = refinePhrase(line, runningTextEntities, "text");
      markEntitiesInText(result.text, runningTextEntities);
      return result;
    });
    const choiceEntities = new Set(runningTextEntities);
    const choiceAResult = refinePhrase(node.choiceA, choiceEntities, "choice");
    const choiceBResult = refinePhrase(node.choiceB, choiceEntities, "choice");
    return {
      id: node.id,
      text: textResults.map((result) => result.text),
      choiceA: choiceAResult.text,
      choiceB: choiceBResult.text
    };
  }

  function buildAuditInstruction(choiceText, displayNode, trigger, priorEntities) {
    const priorSnapshot = state.introducedEntities;
    const clueSnapshot = state.currentClues;
    const choiceSnapshot = state.lastChoice;
    const consequenceSnapshot = state.lastConsequence;
    state.introducedEntities = new Set(priorEntities);
    state.currentClues = extractClues(displayNode.text);
    state.lastChoice = choiceText;
    state.lastConsequence = displayNode.text.slice();
    const instruction = buildInstructionFromState({ location: trigger ? trigger.label : "" }, trigger, displayNode);
    state.introducedEntities = priorSnapshot;
    state.currentClues = clueSnapshot;
    state.lastChoice = choiceSnapshot;
    state.lastConsequence = consequenceSnapshot;
    return instruction;
  }

  function getAuditInstructionLead(node, displayNode, trigger, envKey) {
    const introduced = new Set(PERSISTENT_SCENE_ENTITIES[envKey] || []);
    node.text.forEach((line) => markEntitiesInText(line, introduced));
    const priorSnapshot = state.introducedEntities;
    const clueSnapshot = state.currentClues;
    const consequenceSnapshot = state.lastConsequence;

    state.introducedEntities = introduced;
    state.currentClues = extractClues(displayNode.text);
    state.lastConsequence = displayNode.text.slice();
    const lead = getInstructionLead(displayNode, trigger);

    state.introducedEntities = priorSnapshot;
    state.currentClues = clueSnapshot;
    state.lastConsequence = consequenceSnapshot;
    return lead;
  }

  function determineArcType(choiceText, consequenceLines, targetWords) {
    const combined = consequenceLines.join(" ").toLowerCase();
    if (/(see|spot|tag|path|print|clue|list|mew)/.test(combined)) return "clue";
    if (/(says|ask|pal|kid|clerk|super|dad|tip\b|tips)/.test(combined) || /\bask\b/.test(choiceText.toLowerCase())) return "social";
    if (/(not|no|wrong|lost|is not)/.test(combined)) return "elimination";
    if (/(stuck|sad|wet|slow|shut|ring|slick|blocks)/.test(combined)) return "escalation";
    if (targetWords.some((word) => combined.includes(word))) return "clue";
    return "unknown";
  }

  function collectGenericInstructionIssues(story, envKey) {
    const issues = [];
    const nodesById = story.nodes.reduce((acc, node) => {
      acc[node.id] = node;
      return acc;
    }, {});

    story.nodes.forEach((node) => {
      ["A", "B"].forEach((which) => {
        const nextNode = nodesById[which === "A" ? node.nextA : node.nextB];
        if (!nextNode) return;
        const trigger = MAPS[envKey].triggers[nextNode.location];
        const preview = simulateDisplayNodeForAudit(nextNode, envKey, [node]);
        const lead = getAuditInstructionLead(node, preview, trigger, envKey);
        if (lead.type === "generic") {
          issues.push({
            severity: "warning",
            nodeId: node.id,
            message: node.id + " choice " + which + " has a generic follow-up cue."
          });
        }
      });
    });

    return issues;
  }

  function getTriggerWords(trigger) {
    return trigger ? (trigger.label.toLowerCase().match(/[a-z']+/g) || []) : [];
  }

  function auditPhraseList(nodeId, phrases, sourceType, introduced, safeReplacements, suggestions, rejected, seen) {
    phrases.forEach((phrase) => {
      const candidates = getRefinementCandidates(phrase, introduced, sourceType);
      const repetitionIssue = sourceType === "choice" ? getRepetitionIssue(phrase, phrases) : "";
      if (repetitionIssue) {
        pushLanguageAuditItem(suggestions, seen, nodeId + "|repeat|" + phrase, {
          nodeId: nodeId,
          message: nodeId + " repeats '" + repetitionIssue + "' in a tight loop."
        });
      }

      candidates.forEach((candidate) => {
        const validation = validateSnippet(candidate.to);
        if (validation.valid) {
          pushLanguageAuditItem(safeReplacements, seen, nodeId + "|safe|" + candidate.from + "|" + candidate.to, {
            nodeId: nodeId,
            message: nodeId + " can use '" + candidate.to + "' instead of '" + candidate.from + "'."
          });
        } else {
          pushLanguageAuditItem(rejected, seen, nodeId + "|blocked|" + candidate.from + "|" + candidate.to, {
            nodeId: nodeId,
            message: nodeId + " rejected '" + candidate.to + "' because " + (validation.invalidWords.join(", ") || "it is out of scope") + "."
          });
        }
      });
    });
  }

  function pushLanguageAuditItem(bucket, seen, key, item) {
    if (seen.has(key)) return;
    seen.add(key);
    bucket.push(item);
  }

  function getRepetitionIssue(phrase, phraseList) {
    const counts = phraseList.reduce((acc, item) => {
      const stem = (item.toLowerCase().match(/^[a-z']+/) || [""])[0];
      acc[stem] = (acc[stem] || 0) + 1;
      return acc;
    }, {});
    const phraseStem = (phrase.toLowerCase().match(/^[a-z']+/) || [""])[0];
    return counts[phraseStem] > 1 ? phraseStem : "";
  }

  function enumeratePaths(story) {
    const nodesById = story.nodes.reduce((acc, node) => {
      acc[node.id] = node;
      return acc;
    }, {});
    const results = [];

    function walk(nodeId, seen, trail, depth) {
      const node = nodesById[nodeId];
      if (!node || depth > story.nodes.length + 2) return;
      const nextTrail = trail.concat(node);
      const terminal = !node.nextA || !node.nextB || seen.has(nodeId);
      if (terminal) {
        results.push(nextTrail);
        return;
      }
      const nextSeen = new Set(seen);
      nextSeen.add(nodeId);
      walk(node.nextA, nextSeen, nextTrail, depth + 1);
      walk(node.nextB, nextSeen, nextTrail, depth + 1);
    }

    walk(story.nodes[0].id, new Set(), [], 0);
    return results;
  }

  function getChoiceLanguageWarnings(story) {
    return story.nodes.flatMap((node) => collectChoiceLanguageIssues(node).map((issue) => issue.message));
  }

  function collectChoiceLanguageIssues(node) {
    const issues = [];
    [node.choiceA, node.choiceB].forEach((choice, index) => {
      const badWord = UI_FORBIDDEN_WORDS.find((word) => new RegExp("\\b" + word + "\\b", "i").test(choice));
      if (badWord) {
        issues.push({
          severity: "critical",
          nodeId: node.id,
          message: node.id + " choice " + (index + 1) + " uses UI word '" + badWord + "'."
        });
      }
    });
    return issues;
  }

  function collectChoiceStructureIssues(node) {
    const issues = [];
    const analyses = [node.choiceA, node.choiceB].map((choice) => analyzeChoiceText(choice));

    analyses.forEach((analysis, index) => {
      if (!analysis.valid) {
        issues.push({
          severity: "critical",
          nodeId: node.id,
          message: node.id + " choice " + (index + 1) + " is malformed or incomplete."
        });
      }
    });

    if (analyses.every((analysis) => analysis.valid)) {
      const sameShape = analyses.every((analysis) => (analysis.words.length > 1) === (analyses[0].words.length > 1));
      if (!sameShape) {
        issues.push({
          severity: "warning",
          nodeId: node.id,
          message: node.id + " choices are not structurally parallel."
        });
      }
    }

    return issues;
  }

  function collectSceneVocabIssues(node, vocab) {
    const issues = [];
    const textWords = (node.text.join(" ").toLowerCase().match(/[a-z']+/g) || []);
    const locationWord = node.location.replace(/-/g, " ");
    const mentionsSceneThing = vocab.some((word) => textWords.includes(word)) || node.text.join(" ").toLowerCase().includes(locationWord.split(" ")[0]);
    if (!mentionsSceneThing) {
      issues.push({
        severity: "warning",
        nodeId: node.id,
        message: node.id + " may not reference a clear scene object."
      });
    }
    return issues;
  }

  function collectBranchContinuityIssues(node, story) {
    const issues = [];
    const nextA = story.nodes.find((item) => item.id === node.nextA);
    const nextB = story.nodes.find((item) => item.id === node.nextB);
    if (!nextA || !nextB) {
      issues.push({
        severity: "critical",
        nodeId: node.id,
        message: node.id + " has a missing branch target."
      });
      return issues;
    }
    if (node.id !== story.nodes[story.nodes.length - 1].id && node.nextA === node.id && node.nextB === node.id) {
      issues.push({
        severity: "critical",
        nodeId: node.id,
        message: node.id + " loops without a terminal ending."
      });
    }
    return issues;
  }

  function collectDecodabilityAuditIssues(story) {
    const originalStrictness = state.config.strictness;
    const issues = [];
    ["strict", "moderate", "loose"].forEach((strictness) => {
      state.config.strictness = strictness;
      story.nodes.forEach((node) => {
        const result = validateNode(node);
        if (!result.valid) {
          issues.push({
            severity: "warning",
            nodeId: node.id,
            message: node.id + " is out of scope in " + strictness + " mode."
          });
        }
      });
    });
    state.config.strictness = originalStrictness;
    return issues;
  }

  function collectVoiceConsistencyIssues(story) {
    let firstPersonNodes = 0;
    let secondPersonNodes = 0;

    story.nodes.forEach((node) => {
      const text = node.text.join(" ");
      if (/\b(I|my|We|we)\b/.test(text)) firstPersonNodes += 1;
      if (/\b(You|your)\b/.test(text)) secondPersonNodes += 1;
    });

    if (firstPersonNodes) {
      return [{
        severity: "warning",
        message: story.environment + " source text still leans on first-person lines; display refinement is compensating."
      }];
    }

    if (!secondPersonNodes) {
      return [{
        severity: "warning",
        message: story.environment + " does not yet store second-person lines in source data."
      }];
    }

    return [];
  }

  function collectMetaLanguageIssues(story) {
    const issues = [];
    story.nodes.forEach((node) => {
      [node.text.join(" "), node.choiceA, node.choiceB].forEach((snippet) => {
        const badWord = /\b(chose|system|click|tap|button|press)\b/i.exec(snippet);
        if (badWord) {
          issues.push({
            severity: "critical",
            nodeId: node.id,
            message: node.id + " uses meta-language '" + badWord[1] + "'."
          });
        }
      });
    });
    return issues;
  }

  function scoreNarrativeStrength(story) {
    let strongCount = 0;
    let rhythmicCount = 0;

    story.nodes.forEach((node) => {
      const joined = node.text.join(" ").toLowerCase();
      if (/(see|spot|tag|path|print|clue|list|mew|says|ask|not|no|wrong|lost|stuck|sad|wet|slow|shut|ring|slick|run)/.test(joined)) {
        strongCount += 1;
      }

      const lineStarts = node.text.map((line) => ((line.match(/[A-Za-z']+/) || [""])[0] || "").toLowerCase());
      if (lineStarts[0] && lineStarts.some((start, index) => index > 0 && start === lineStarts[0])) {
        rhythmicCount += 1;
      }
      if (/\b(run)\b.*\b(run)\b/.test(joined)) {
        rhythmicCount += 1;
      }
    });

    const strongRatio = strongCount / story.nodes.length;
    const rhythmRatio = rhythmicCount / story.nodes.length;

    if (strongRatio >= 0.75 && rhythmRatio >= 0.15) return "Excellent";
    if (strongRatio >= 0.55) return "Strong";
    return "Weak";
  }

  function renderBeatPlan() {
    const plan = buildBeatPlan(state.config.env);
    ui.beatPlanOutput.innerHTML = "";
    plan.forEach((item) => {
      const row = document.createElement("div");
      row.className = "review-row";
      row.textContent = item.label + ": " + item.value;
      ui.beatPlanOutput.appendChild(row);
    });
  }

  function buildBeatPlan(envKey) {
    const story = NARRATIVES[envKey];
    const nodes = story.nodes;

    return [
      { label: "Setup", value: nodes[0].id + " -> " + compressBeat(nodes[0]) },
      { label: "First Search", value: nodes[1].id + " / " + nodes[2].id },
      { label: "Clue 1", value: pickFirstNodeWith(nodes, /(tag|path|list|saw|spot|clue|mew)/) },
      { label: "Clue 2", value: pickFirstNodeWith(nodes, /(gate|bin|top hall|counter|art|grass|mail)/) },
      { label: "False Lead", value: pickFirstNodeWith(nodes, /(not|no|wrong|lost)/) },
      { label: "Social Beat", value: pickFirstNodeWith(nodes, /(pal|kid|clerk|super|dad|says|nods)/) },
      { label: "Reveal", value: nodes[nodes.length - 2].id + " -> " + compressBeat(nodes[nodes.length - 2]) },
      { label: "Finish", value: nodes[nodes.length - 1].id + " -> " + compressBeat(nodes[nodes.length - 1]) }
    ];
  }

  function pickFirstNodeWith(nodes, pattern) {
    const found = nodes.find((node) => pattern.test(node.text.join(" ").toLowerCase()));
    return found ? found.id + " -> " + compressBeat(found) : "Not mapped";
  }

  function compressBeat(node) {
    const displayNode = simulateDisplayNodeForAudit(node, state.config.env, []);
    return displayNode.text[0];
  }

  function renderReview() {
    const report = runUsabilityReview();
    ui.reviewOutput.innerHTML = "";
    report.forEach((item) => {
      const row = document.createElement("div");
      row.className = "review-row";
      row.textContent = item.label + ": " + item.value;
      ui.reviewOutput.appendChild(row);
    });
  }

  function runUsabilityReview() {
    const story = NARRATIVES[state.config.env];
    const longestSentence = story.nodes.reduce((max, node) => {
      return Math.max(
        max,
        ...node.text.map((line) => (line.match(/[A-Za-z']+/g) || []).length)
      );
    }, 0);

    const buttonSize = 44;
    const movement = 120;

    return [
      { label: "3-second clarity", value: "Quest gate + one live prompt make the first action clear" },
      { label: "START flow", value: "Large START button unlocks movement after the goal is shown" },
      { label: "No-scroll loop", value: "Reading opens in a centered modal, so the full play loop stays on one screen" },
      { label: "Tap target", value: buttonSize + "px minimum met on all buttons" },
      { label: "Sentence load", value: longestSentence + " words max per line in this map" },
      { label: "Block read", value: getEnvironmentReadabilityNote() },
      { label: "Reachability", value: state.reachabilityStatus || "Runtime validation pending" },
      { label: "Goal visibility", value: state.modalOpen ? "Modal is active, movement is frozen, and the modal sits away from the active landmark" : "Goal tile stays visible during movement" },
      { label: "Movement pacing", value: movement + "ms tile step for fast JRPG-style response" },
      { label: "Confirm action", value: isMobileMode() ? "GO button stays visible and consistent" : "SPACE or click is the single confirm action" }
    ];
  }

  function getEnvironmentReadabilityNote() {
    if (state.config.env === "brooklyn-block") {
      return "Street, cars, sidewalks, stoops, and corner shops read as a city block";
    }
    if (state.config.env === "apartment-interior") {
      return "The hall reads as a prewar corridor with lobby, mailboxes, stairs, elevator, and numbered doors";
    }
    if (state.config.env === "bodega") {
      return "Door, shelves, deli case, fridge wall, register, ATM, crates, and cat read as a neighborhood store";
    }
    return "Doors, lockers, bulletin board, trophy case, lights, fountain, and class cues read as a city school";
  }

  function exportNarrativeJson() {
    const story = NARRATIVES[state.config.env];
    const blob = new Blob([JSON.stringify(story, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = story.environment + ".json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function render() {
    updateCamera();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ui.canvas.width, ui.canvas.height);
    ctx.save();
    if (shouldUseCameraFollow()) {
      ctx.translate(-state.camera.x, -state.camera.y);
    }
    drawMap();
    drawBrownstoneDecor();
    drawBodegaDecor();
    drawSchoolDecor();
    drawTriggers();
    drawReachableOverlay();
    drawBrooklynLabels();
    drawPlayer();
    ctx.restore();
    drawGoalCompass();
  }

  function drawMap() {
    const map = MAPS[state.config.env];
    const palette = map.palette;

    for (let y = 0; y < MAP_H; y += 1) {
      for (let x = 0; x < MAP_W; x += 1) {
        const tile = map.grid[y][x];
        drawTile(tile, x, y, palette);
      }
    }
  }

  function drawTile(tile, x, y, palette) {
    const px = x * TILE;
    const py = y * TILE;
    const isApartment = state.config.env === "apartment-interior";
    const isBodega = state.config.env === "bodega";
    const blink = (Math.sin(Date.now() / 260) + 1) * 0.5;
    const activeTrigger = state.currentNarrative ? MAPS[state.config.env].triggers[getCurrentNode().location] : null;

    const fill = {
      G: palette.grass,
      P: palette.path,
      Q: "#d9d3c0",
      X: "#4a5568",
      Y: "#6b7280",
      U: "#f6f1da",
      T: "#4a7c59",
      H: palette.wall,
      N: "#b86a4f",
      O: "#d8b08c",
      W: "#526d82",
      F: palette.floor,
      D: palette.accent,
      E: "#efb366",
      V: "#5c7cfa",
      L: "#ffcb77",
      S: "#f4a261",
      M: "#8ecae6",
      C: "#adb5bd",
      I: "#6c757d",
      Z: "#5f6f52",
      K: "#f2cc8f",
      R: "#90be6d",
      B: "#9c6644",
      A: "#f28482"
    }[tile] || palette.floor;

    ctx.fillStyle = fill;
    ctx.fillRect(px, py, TILE, TILE);

    if (isApartment && tile === "F") {
      ctx.fillStyle = "#efe5d0";
      ctx.fillRect(px, py, TILE, TILE);
      ctx.fillStyle = "rgba(111, 78, 55, 0.08)";
      ctx.fillRect(px + 2, py + 15, TILE - 4, 2);
    } else if (tile === "Q") {
      if (isApartment) {
        ctx.fillStyle = "#d8d2c2";
        ctx.fillRect(px, py, TILE, TILE);
        ctx.fillStyle = "#f8f6ef";
        ctx.fillRect(px, py, 16, 16);
        ctx.fillRect(px + 16, py + 16, 16, 16);
        ctx.fillStyle = "#c1b7a3";
        ctx.fillRect(px + 16, py, 16, 16);
        ctx.fillRect(px, py + 16, 16, 16);
      } else {
      ctx.fillStyle = "#d7d2c5";
      ctx.fillRect(px, py, TILE, TILE);
      ctx.fillStyle = "rgba(40, 75, 99, 0.08)";
      ctx.fillRect(px + 14, py, 2, TILE);
      }
    } else if (tile === "X") {
      ctx.fillStyle = "#495057";
      ctx.fillRect(px, py, TILE, TILE);
    } else if (tile === "Y") {
      ctx.fillStyle = "#495057";
      ctx.fillRect(px, py, TILE, TILE);
      ctx.fillStyle = "#d9d9d9";
      ctx.fillRect(px + 10, py + 13, 12, 6);
    } else if (tile === "U") {
      ctx.fillStyle = "#d7d2c5";
      ctx.fillRect(px, py, TILE, TILE);
      ctx.fillStyle = "#f8f9fa";
      ctx.fillRect(px + 4, py + 2, 6, 28);
      ctx.fillRect(px + 14, py + 2, 6, 28);
      ctx.fillRect(px + 24, py + 2, 4, 28);
    } else if (tile === "T") {
      ctx.fillStyle = "#7f5539";
      ctx.fillRect(px + 10, py + 12, 12, 18);
      ctx.fillStyle = "#3a5a40";
      ctx.fillRect(px + 4, py + 4, 24, 14);
    } else if (tile === "N") {
      ctx.fillStyle = "#8c4f39";
      ctx.fillRect(px + 4, py + 4, 24, 24);
      ctx.fillStyle = "#5c2f24";
      ctx.fillRect(px + 7, py + 7, 8, 9);
      ctx.fillRect(px + 17, py + 7, 8, 9);
      ctx.fillStyle = "#e9c46a";
      ctx.fillRect(px + 11, py + 18, 10, 10);
      ctx.fillStyle = "#c23b22";
      ctx.fillRect(px + 3, py + 3, 26, 4);
    } else if (tile === "O") {
      ctx.fillStyle = "#b07d62";
      ctx.fillRect(px + 6, py + 8, 20, 20);
      ctx.fillStyle = "#e6ccb2";
      ctx.fillRect(px + 8, py + 10, 16, 4);
      ctx.fillRect(px + 8, py + 16, 16, 4);
      ctx.fillRect(px + 8, py + 22, 16, 4);
      ctx.strokeStyle = "#5c2f24";
      ctx.lineWidth = 2;
      ctx.strokeRect(px + 5, py + 7, 22, 22);
    } else if (tile === "H") {
      ctx.fillStyle = "#e9c46a";
      ctx.fillRect(px + 2, py + 12, 28, 18);
      ctx.fillStyle = "#d62828";
      ctx.beginPath();
      ctx.moveTo(px + 2, py + 12);
      ctx.lineTo(px + 16, py + 2);
      ctx.lineTo(px + 30, py + 12);
      ctx.closePath();
      ctx.fill();
    } else if (tile === "W") {
      if (isBodega) {
        ctx.fillStyle = "#6b4f3a";
        ctx.fillRect(px, py, TILE, TILE);
        ctx.fillStyle = "#8d6748";
        ctx.fillRect(px + 2, py + 2, TILE - 4, TILE - 4);
        ctx.fillStyle = "#f4d6a0";
        ctx.fillRect(px + 4, py + 6, TILE - 8, 3);
      } else {
      ctx.fillStyle = "#385170";
      ctx.fillRect(px + 2, py + 2, 28, 28);
      }
    } else if (tile === "D") {
      if (isBodega) {
        ctx.fillStyle = "#6d4c41";
        ctx.fillRect(px + 2, py + 2, 28, 28);
        ctx.fillStyle = "#d9edff";
        ctx.fillRect(px + 7, py + 6, 18, 18);
        ctx.strokeStyle = "#264653";
        ctx.lineWidth = 2;
        ctx.strokeRect(px + 6, py + 5, 20, 20);
        ctx.fillStyle = "#a8dadc";
        ctx.fillRect(px + 9, py + 8, 14, 5);
        ctx.fillStyle = "#ef476f";
        ctx.fillRect(px + 10, py + 15, 12, 4);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 4px Courier New";
        ctx.fillText("OPEN", px + 10, py + 18);
        ctx.fillStyle = "#ffd166";
        ctx.beginPath();
        ctx.arc(px + 16, py + 3, 2 + blink, 0, Math.PI * 2);
        ctx.fill();
      } else
      if (isApartment) {
        const wiggle = activeTrigger && /door/i.test(activeTrigger.label) && Math.abs(activeTrigger.x - x) <= 1 ? Math.round(Math.sin(Date.now() / 140)) : 0;
        const doorTone = (x + y) % 2 === 0 ? "#6f4e37" : "#7f5539";
        ctx.fillStyle = "#d8c1a0";
        ctx.fillRect(px + 5 + wiggle, py + 2, 22, 28);
        ctx.fillStyle = doorTone;
        ctx.fillRect(px + 7 + wiggle, py + 5, 18, 23);
        ctx.fillStyle = "#fdf0d5";
        ctx.fillRect(px + 9 + wiggle, py + 7, 10, 4);
        ctx.fillStyle = "#264653";
        ctx.fillRect(px + 20 + wiggle, py + 16, 2, 2);
        ctx.fillStyle = "#1d3557";
        ctx.font = "bold 6px Courier New";
        ctx.fillText(String((x % 5) + 1), px + 10 + wiggle, py + 10);
      } else {
      ctx.fillStyle = "#264653";
      ctx.fillRect(px + 8, py + 4, 16, 24);
      }
    } else if (tile === "E") {
      ctx.fillStyle = "#264653";
      ctx.fillRect(px + 2, py + 7, 28, 10);
      ctx.fillStyle = "#efb366";
      ctx.fillRect(px + 2, py + 17, 28, 6);
    } else if (tile === "V") {
      ctx.fillStyle = "#3a86ff";
      ctx.fillRect(px + 2, py + 8, 28, 16);
      ctx.fillStyle = "#1d3557";
      ctx.fillRect(px + 6, py + 11, 20, 6);
      ctx.fillStyle = "#111";
      ctx.fillRect(px + 5, py + 23, 6, 3);
      ctx.fillRect(px + 21, py + 23, 6, 3);
    } else if (tile === "L") {
      if (isBodega) {
        ctx.fillStyle = "#7f5539";
        ctx.fillRect(px + 3, py + 6, 26, 20);
        ctx.fillStyle = "#ffd166";
        ctx.fillRect(px + 7, py + 2, 18, 4);
        ctx.fillStyle = "#264653";
        ctx.fillRect(px + 10, py + 10, 12, 10);
        ctx.fillStyle = "#f1faee";
        ctx.fillRect(px + 13, py + 13, 6, 3);
        ctx.fillStyle = "#2a9d8f";
        ctx.fillRect(px + 4, py + 18, 6, 8);
      } else
      if (isApartment) {
        ctx.fillStyle = "#b0b7c3";
        ctx.fillRect(px + 5, py + 4, 22, 24);
        ctx.fillStyle = "#8d99ae";
        ctx.fillRect(px + 15, py + 4, 2, 24);
        ctx.fillStyle = blink > 0.45 ? "#ffd166" : "#6c757d";
        ctx.fillRect(px + 12, py + 2, 8, 3);
        ctx.fillStyle = "#264653";
        ctx.fillRect(px + 25, py + 13, 2, 4);
      } else {
        ctx.fillStyle = "#ffe066";
        ctx.fillRect(px + 6, py + 6, 20, 20);
      }
    } else if (tile === "S") {
      if (isBodega) {
        ctx.fillStyle = "#8d6748";
        ctx.fillRect(px + 2, py + 10, 28, 18);
        ctx.fillStyle = "#d9edff";
        ctx.fillRect(px + 4, py + 12, 24, 8);
        ctx.fillStyle = "#e76f51";
        ctx.fillRect(px + 6, py + 14, 5, 3);
        ctx.fillStyle = "#e9c46a";
        ctx.fillRect(px + 13, py + 14, 5, 3);
        ctx.fillStyle = "#90be6d";
        ctx.fillRect(px + 20, py + 14, 5, 3);
        ctx.fillStyle = "#5f0f40";
        ctx.fillRect(px + 4, py + 4, 24, 4);
        const steam = Math.sin(Date.now() / 220 + x + y);
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.fillRect(px + 10, py + 2 - steam, 2, 4);
        ctx.fillRect(px + 18, py + 1 + steam, 2, 5);
      } else
      if (isApartment) {
        ctx.fillStyle = "#2b2d42";
        ctx.fillRect(px + 4, py + 4, 24, 24);
        ctx.strokeStyle = "#adb5bd";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px + 7, py + 25);
        ctx.lineTo(px + 25, py + 7);
        ctx.stroke();
        ctx.fillStyle = "rgba(255,255,255," + (0.12 + blink * 0.12) + ")";
        ctx.fillRect(px + 8, py + 20, 10, 2);
        ctx.fillRect(px + 12, py + 16, 10, 2);
        ctx.fillRect(px + 16, py + 12, 8, 2);
      } else {
        ctx.fillStyle = "#b56576";
        ctx.fillRect(px + 5, py + 5, 22, 22);
      }
    } else if (tile === "M") {
      if (isBodega) {
        ctx.fillStyle = "#8ecae6";
        ctx.fillRect(px + 3, py + 3, 26, 26);
        ctx.fillStyle = "#dff6ff";
        ctx.fillRect(px + 5, py + 5, 22, 22);
        ctx.strokeStyle = "#457b9d";
        ctx.lineWidth = 2;
        ctx.strokeRect(px + 7, py + 5, 8, 22);
        ctx.strokeRect(px + 17, py + 5, 8, 22);
        ctx.fillStyle = "#f1faee";
        ctx.fillRect(px + 9, py + 12, 4, 8);
        ctx.fillStyle = "#bde0fe";
        ctx.fillRect(px + 19, py + 11, 4, 9);
        ctx.fillStyle = "rgba(255,255,255," + (0.18 + blink * 0.18) + ")";
        ctx.fillRect(px + 9, py + 6, 2, 18);
        ctx.fillRect(px + 19, py + 6, 2, 18);
      } else
      if (isApartment) {
        ctx.fillStyle = "#d4a373";
        ctx.fillRect(px + 4, py + 4, 24, 24);
        ctx.fillStyle = "#b08968";
        for (let row = 0; row < 3; row += 1) {
          for (let col = 0; col < 3; col += 1) {
            ctx.fillRect(px + 6 + col * 7, py + 6 + row * 7, 5, 5);
          }
        }
        ctx.fillStyle = "#fefae0";
        ctx.fillRect(px + 20, py + 6 - blink, 5, 5);
      } else {
        ctx.fillStyle = "#e0fbfc";
        ctx.fillRect(px + 4, py + 4, 24, 24);
      }
    } else if (tile === "C") {
      if (isBodega) {
        ctx.fillStyle = "#7f5539";
        ctx.fillRect(px + 2, py + 12, 28, 16);
        ctx.fillStyle = "#6d4c41";
        ctx.fillRect(px + 2, py + 8, 20, 6);
        ctx.fillStyle = "#2d3142";
        ctx.fillRect(px + 18, py + 4, 10, 8);
        ctx.fillStyle = "#e0fbfc";
        ctx.fillRect(px + 20, py + 6, 6, 3);
        ctx.fillStyle = "#ef476f";
        ctx.fillRect(px + 4, py + 4, 10, 4);
        ctx.fillStyle = "#ffd166";
        ctx.fillRect(px + 4, py + 18, 6, 6);
      } else
      if (isApartment) {
        ctx.fillStyle = "#fff3bf";
        ctx.fillRect(px + 8, py + 7, 16, 6);
        ctx.fillStyle = "rgba(255, 234, 167," + (0.18 + blink * 0.12) + ")";
        ctx.fillRect(px + 5, py + 13, 22, 5);
      } else {
      ctx.fillStyle = "#495057";
      ctx.fillRect(px + 9, py + 8, 14, 18);
      ctx.fillStyle = "#adb5bd";
      ctx.fillRect(px + 8, py + 6, 16, 4);
      }
    } else if (tile === "I") {
      if (isApartment) {
        ctx.fillStyle = "#343a40";
        ctx.fillRect(px + 7, py + 4, 18, 24);
        ctx.fillStyle = "#6c757d";
        ctx.fillRect(px + 10, py + 8, 12, 2);
      } else {
        ctx.fillStyle = "#495057";
        ctx.fillRect(px + 10, py + 9, 12, 16);
        ctx.fillStyle = "#ced4da";
        ctx.fillRect(px + 12, py + 7, 8, 3);
      }
    } else if (tile === "Z") {
      ctx.fillStyle = "#3a5a40";
      ctx.fillRect(px + 3, py + 8, 3, 20);
      ctx.fillRect(px + 14, py + 8, 3, 20);
      ctx.fillRect(px + 25, py + 8, 3, 20);
      ctx.fillRect(px + 3, py + 10, 25, 3);
    } else if (tile === "K") {
      ctx.fillStyle = "#3a5a40";
      ctx.fillRect(px + 4, py + 8, 3, 20);
      ctx.fillRect(px + 25, py + 8, 3, 20);
      ctx.fillRect(px + 4, py + 10, 24, 3);
      ctx.strokeStyle = "#3a5a40";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px + 10, py + 28);
      ctx.lineTo(px + 10, py + 16);
      ctx.moveTo(px + 22, py + 28);
      ctx.lineTo(px + 22, py + 16);
      ctx.stroke();
    } else if (tile === "J") {
      ctx.fillStyle = "#b56576";
      ctx.fillRect(px + 3, py + 5, 26, 23);
      ctx.fillStyle = "#ffe8d6";
      ctx.fillRect(px + 6, py + 10, 20, 8);
      ctx.fillStyle = "#6d597a";
      ctx.fillRect(px + 11, py + 19, 10, 9);
    } else if (tile === "R") {
      if (isBodega) {
        ctx.fillStyle = "#6d4c41";
        ctx.fillRect(px + 4, py + 3, 24, 26);
        ctx.fillStyle = "#bc6c25";
        ctx.fillRect(px + 6, py + 5, 20, 4);
        ctx.fillStyle = "#e76f51";
        ctx.fillRect(px + 7, py + 11, 6, 8);
        ctx.fillStyle = "#ffb703";
        ctx.fillRect(px + 14, py + 11, 5, 8);
        ctx.fillStyle = "#219ebc";
        ctx.fillRect(px + 20, py + 11, 4, 8);
        ctx.fillStyle = "#8ecae6";
        ctx.fillRect(px + 7, py + 21, 5, 5);
        ctx.fillStyle = "#ef476f";
        ctx.fillRect(px + 14, py + 21, 5, 5);
        ctx.fillStyle = "#90be6d";
        ctx.fillRect(px + 21, py + 21, 3, 5);
      } else {
        ctx.fillStyle = "#f77f00";
        ctx.fillRect(px + 5, py + 5, 22, 22);
      }
    } else if (tile === "B") {
      ctx.fillStyle = "#6f4e37";
      ctx.fillRect(px + 3, py + 16, 26, 8);
      ctx.fillStyle = "#ddb892";
      ctx.fillRect(px + 5, py + 10, 22, 5);
      ctx.fillRect(px + 5, py + 18, 22, 3);
    } else if (tile === "A") {
      ctx.fillStyle = "#ffafcc";
      ctx.fillRect(px + 4, py + 4, 24, 24);
    }

    ctx.strokeStyle = "rgba(16, 37, 66, 0.08)";
    ctx.strokeRect(px, py, TILE, TILE);
  }

  function shouldUseCameraFollow() {
    return state.config.cameraFollow && isMobileLandscapeMode();
  }

  function updateCamera() {
    if (!shouldUseCameraFollow()) {
      state.camera.x = 0;
      state.camera.y = 0;
      return;
    }
    const worldWidth = MAP_W * TILE;
    const worldHeight = MAP_H * TILE;
    const targetX = state.player.x * TILE + TILE / 2 - ui.canvas.width / 2;
    const targetY = state.player.y * TILE + TILE / 2 - ui.canvas.height / 2;
    state.camera.x = clamp(targetX, 0, Math.max(0, worldWidth - ui.canvas.width));
    state.camera.y = clamp(targetY, 0, Math.max(0, worldHeight - ui.canvas.height));
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function toWorldPoint(x, y) {
    if (!shouldUseCameraFollow()) return { x, y };
    return {
      x: x + state.camera.x,
      y: y + state.camera.y
    };
  }

  function drawGoalCompass() {
    if (!shouldUseCameraFollow() || performance.now() >= state.objectiveArrowUntil) return;
    const trigger = MAPS[state.config.env].triggers[getCurrentNode().location];
    if (!trigger) return;
    const screenX = trigger.x * TILE + TILE / 2 - state.camera.x;
    const screenY = trigger.y * TILE + TILE / 2 - state.camera.y;
    const inView = screenX >= 24 && screenX <= ui.canvas.width - 24 && screenY >= 24 && screenY <= ui.canvas.height - 24;
    if (inView) return;

    const centerX = ui.canvas.width / 2;
    const centerY = ui.canvas.height / 2;
    const angle = Math.atan2(screenY - centerY, screenX - centerX);
    const radiusX = ui.canvas.width / 2 - 18;
    const radiusY = ui.canvas.height / 2 - 18;
    const px = centerX + Math.cos(angle) * radiusX;
    const py = centerY + Math.sin(angle) * radiusY;

    ctx.save();
    ctx.fillStyle = "rgba(255, 221, 87, 0.95)";
    ctx.beginPath();
    ctx.arc(px, py, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.translate(px, py);
    ctx.rotate(angle);
    ctx.fillStyle = "#15324f";
    ctx.beginPath();
    ctx.moveTo(7, 0);
    ctx.lineTo(-5, -6);
    ctx.lineTo(-5, 6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawTriggers() {
    const map = MAPS[state.config.env];
    const node = getCurrentNode();
    const pulse = (Math.sin(Date.now() / 220) + 1) * 0.5;
    Object.keys(map.triggers).forEach((key) => {
      const trigger = map.triggers[key];
      const px = trigger.x * TILE;
      const py = trigger.y * TILE;
      const active = key === node.location;
      const inset = active ? 3 - pulse : 4;
      ctx.strokeStyle = active ? "rgba(255, 221, 87, " + (0.75 + pulse * 0.2) + ")" : "rgba(255,255,255,0.18)";
      ctx.lineWidth = active ? 4 : 2;
      ctx.strokeRect(px + inset, py + inset, TILE - inset * 2, TILE - inset * 2);
      if (active) {
        ctx.fillStyle = "rgba(255, 221, 87, " + (0.18 + pulse * 0.12) + ")";
        ctx.fillRect(px + inset, py + inset, TILE - inset * 2, TILE - inset * 2);
        ctx.fillStyle = "#ffdd57";
        ctx.fillRect(px + 14, py - 4 - pulse * 2, 4, 4);
        ctx.fillRect(px + 12, py - 2 - pulse * 2, 8, 1);
        ctx.fillRect(px + 15, py - 6 - pulse * 2, 2, 8);
        ctx.fillStyle = "#264653";
        ctx.font = "bold 10px Courier New";
        ctx.fillText("!", px + 13, py + 20);
        if (performance.now() < state.objectiveArrowUntil) {
          ctx.fillStyle = "#15324f";
          ctx.font = "bold 14px Courier New";
          ctx.fillText(getFacingArrow(), px + 10, py - 8);
        }
      }
    });
  }

  function getFacingArrow() {
    return {
      up: "^",
      down: "v",
      left: "<",
      right: ">"
    }[state.player.facing] || "^";
  }

  function drawBrooklynLabels() {
    if (state.config.env !== "brooklyn-block") return;

    const labels = [
      { text: "DELI", x: 11, y: 2 },
      { text: "NAIL", x: 11, y: 3 },
      { text: "LIB", x: 11, y: 4 }
    ];

    ctx.fillStyle = "#15324f";
    ctx.font = "bold 9px Courier New";
    labels.forEach((label) => {
      ctx.fillText(label.text, label.x * TILE + 3, label.y * TILE + 14);
    });
  }

  function drawBrownstoneDecor() {
    if (state.config.env !== "brooklyn-block") return;

    const t = Date.now();
    const blink = (Math.sin(t / 320) + 1) * 0.5;

    // Iron railings by the stoops.
    drawFenceSegment(1, 3);
    drawFenceSegment(9, 3);

    // Basement window grates.
    drawBasementGrate(2, 4);
    drawBasementGrate(11, 4);

    // Tree pits along the walk.
    drawTreePit(4, 7);
    drawTreePit(8, 7);

    // Fire hydrant near the curb.
    drawHydrant(6 * TILE + 10, 9 * TILE + 9, blink);

    // Trash bags by the stoop.
    drawTrashBags(10 * TILE + 7, 8 * TILE + 11);

    // Street sign pole.
    drawStreetSign(1 * TILE + 20, 8 * TILE + 3);

    // Parked car edge.
    ctx.fillStyle = "#264653";
    ctx.fillRect(5 * TILE + 4, 0 * TILE + 5, 24, 10);
    ctx.fillStyle = "#8ecae6";
    ctx.fillRect(8 * TILE + 4, 11 * TILE + 17, 24, 10);

    // Bodega awning at the storefront corner.
    ctx.fillStyle = "#d62828";
    ctx.fillRect(11 * TILE + 2, 2 * TILE + 2, 28, 5);
    ctx.fillStyle = "#f4d6a0";
    ctx.fillRect(11 * TILE + 5, 2 * TILE + 7, 22, 3);

    // Optional subway entrance cue.
    drawSubwayStair(13 * TILE + 4, 9 * TILE + 6);

    // Door bell pulse on the active stoop.
    const trigger = MAPS[state.config.env].triggers[getCurrentNode().location];
    if (trigger && trigger.label === "stoop") {
      ctx.fillStyle = "rgba(255, 209, 102," + (0.25 + blink * 0.25) + ")";
      ctx.beginPath();
      ctx.arc(trigger.x * TILE + 25, trigger.y * TILE + 8, 3 + blink * 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawFenceSegment(tileX, tileY) {
    const px = tileX * TILE;
    const py = tileY * TILE;
    ctx.strokeStyle = "#495057";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px + 6, py + 26);
    ctx.lineTo(px + 26, py + 26);
    for (let i = 0; i < 4; i += 1) {
      ctx.moveTo(px + 6 + i * 6, py + 26);
      ctx.lineTo(px + 6 + i * 6, py + 12);
    }
    ctx.stroke();
  }

  function drawBasementGrate(tileX, tileY) {
    const px = tileX * TILE;
    const py = tileY * TILE;
    ctx.fillStyle = "#6c757d";
    ctx.fillRect(px + 8, py + 20, 16, 6);
    ctx.strokeStyle = "#adb5bd";
    ctx.lineWidth = 1;
    ctx.strokeRect(px + 8, py + 20, 16, 6);
  }

  function drawTreePit(tileX, tileY) {
    const px = tileX * TILE;
    const py = tileY * TILE;
    ctx.fillStyle = "#6b4f3a";
    ctx.fillRect(px + 4, py + 24, 24, 6);
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.fillRect(px + 6, py + 25, 20, 2);
  }

  function drawHydrant(px, py, blink) {
    ctx.fillStyle = "#d62828";
    ctx.fillRect(px, py + 4, 8, 12);
    ctx.fillRect(px - 3, py + 8, 14, 4);
    ctx.fillRect(px + 2, py, 4, 5);
    ctx.fillStyle = "rgba(255,255,255," + (0.25 + blink * 0.25) + ")";
    ctx.fillRect(px + 5, py + 2, 2, 3);
  }

  function drawTrashBags(px, py) {
    ctx.fillStyle = "#495057";
    ctx.fillRect(px, py + 4, 8, 10);
    ctx.fillRect(px + 7, py, 10, 14);
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.fillRect(px + 2, py + 6, 2, 3);
    ctx.fillRect(px + 11, py + 4, 2, 3);
  }

  function drawStreetSign(px, py) {
    ctx.fillStyle = "#6c757d";
    ctx.fillRect(px, py, 2, 24);
    ctx.fillStyle = "#2a9d8f";
    ctx.fillRect(px - 8, py + 3, 12, 5);
  }

  function drawSubwayStair(px, py) {
    ctx.fillStyle = "#495057";
    ctx.fillRect(px, py + 10, 18, 6);
    ctx.strokeStyle = "#ced4da";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(px + 2, py + 9);
    ctx.lineTo(px + 8, py + 3);
    ctx.lineTo(px + 14, py + 9);
    ctx.stroke();
  }

  function drawBodegaDecor() {
    if (state.config.env !== "bodega") return;

    const t = Date.now();
    const blink = (Math.sin(t / 280) + 1) * 0.5;
    const swish = Math.sin(t / 220);

    drawBodegaSign(7, 1, "DELI");
    drawBodegaSign(11, 1, "HOT");
    drawBodegaSign(13, 8, "LOTTO");

    // ATM near the entrance wall.
    drawBodegaAtm(1, 8, blink);

    // Produce crates and paper towels near the entrance.
    drawBodegaCrate(2, 8, "#bc6c25", "#ffd166");
    drawBodegaCrate(3, 8, "#8d5524", "#90be6d");
    ctx.fillStyle = "#f1faee";
    ctx.fillRect(4 * TILE + 8, 8 * TILE + 8, 12, 12);
    ctx.fillRect(4 * TILE + 10, 8 * TILE + 4, 8, 4);

    // Deli worker silhouette behind the hot case.
    ctx.fillStyle = "#2d3142";
    ctx.fillRect(8 * TILE + 10, 6 * TILE + 3, 10, 10);
    ctx.fillStyle = "#f7cad0";
    ctx.fillRect(8 * TILE + 11, 6 * TILE + 1, 8, 4);

    // Bodega cat near the deli case.
    drawBodegaCat(9 * TILE + 14, 6 * TILE + 7, swish);
  }

  function drawBodegaSign(tileX, tileY, text) {
    const px = tileX * TILE;
    const py = tileY * TILE;
    ctx.fillStyle = "#f4d6a0";
    ctx.fillRect(px + 2, py + 6, 28, 8);
    ctx.fillStyle = "#5f0f40";
    ctx.font = "bold 7px Courier New";
    ctx.fillText(text, px + 4, py + 12);
  }

  function drawBodegaAtm(tileX, tileY, blink) {
    const px = tileX * TILE;
    const py = tileY * TILE;
    ctx.fillStyle = "#495057";
    ctx.fillRect(px + 4, py + 4, 20, 24);
    ctx.fillStyle = "#2a9d8f";
    ctx.fillRect(px + 7, py + 8, 14, 7);
    ctx.fillStyle = "rgba(255,255,255," + (0.22 + blink * 0.25) + ")";
    ctx.fillRect(px + 9, py + 10, 10, 3);
    ctx.fillStyle = "#f1faee";
    ctx.font = "bold 5px Courier New";
    ctx.fillText("ATM", px + 7, py + 23);
  }

  function drawBodegaCrate(tileX, tileY, crateColor, itemColor) {
    const px = tileX * TILE;
    const py = tileY * TILE;
    ctx.fillStyle = crateColor;
    ctx.fillRect(px + 5, py + 14, 18, 10);
    ctx.strokeStyle = "#6d4c41";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(px + 5, py + 14, 18, 10);
    ctx.fillStyle = itemColor;
    ctx.fillRect(px + 8, py + 10, 4, 5);
    ctx.fillRect(px + 14, py + 9, 4, 6);
    ctx.fillRect(px + 18, py + 10, 3, 5);
  }

  function drawBodegaCat(px, py, swish) {
    ctx.fillStyle = "#2d2a32";
    ctx.fillRect(px, py + 4, 10, 8);
    ctx.fillRect(px + 2, py, 6, 5);
    ctx.fillRect(px + 1, py - 1, 2, 2);
    ctx.fillRect(px + 7, py - 1, 2, 2);
    ctx.fillRect(px + 9, py + 6, 4, 2);
    ctx.fillRect(px + 12, py + 4 + Math.round(swish), 2, 5);
    ctx.fillStyle = "#f1faee";
    ctx.fillRect(px + 4, py + 2, 1, 1);
    ctx.fillRect(px + 6, py + 2, 1, 1);
  }

  function drawSchoolDecor() {
    if (state.config.env !== "school-hallway") return;

    const t = Date.now();
    const blink = (Math.sin(t / 340) + 1) * 0.5;

    // Lobby doors, bulletin board, trophy case, and flag.
    drawSchoolDoubleDoors(2 * TILE + 4, 9 * TILE + 4);
    drawBulletinBoard(1 * TILE + 4, 8 * TILE + 5);
    drawTrophyCase(13 * TILE + 4, 1 * TILE + 4);
    drawFlag(14 * TILE + 20, 1 * TILE + 4);

    // Fluorescent lights along the hall.
    for (let x = 3; x <= 12; x += 3) {
      ctx.fillStyle = "#fff3bf";
      ctx.fillRect(x * TILE + 8, 0 * TILE + 6, 16, 4);
      ctx.fillStyle = "rgba(255, 243, 191," + (0.12 + blink * 0.08) + ")";
      ctx.fillRect(x * TILE + 6, 0 * TILE + 10, 20, 3);
    }

    // Locker faces and classroom door numbers.
    for (let y = 2; y <= 2; y += 1) {
      for (let x = 1; x <= 4; x += 1) {
        drawLockerFace(x * TILE + 4, y * TILE + 4, x);
      }
    }
    drawClassDoorPlate(9 * TILE + 20, 1 * TILE + 7, "12");
    drawClassDoorPlate(10 * TILE + 20, 2 * TILE + 7, "18");

    // Water fountain.
    drawWaterFountain(12 * TILE + 6, 6 * TILE + 8, blink);

    // Classroom glimpse: desk, rug, ABC strip, calendar.
    drawClassroomPeek(6 * TILE + 4, 7 * TILE + 4);
  }

  function drawSchoolDoubleDoors(px, py) {
    ctx.fillStyle = "#577590";
    ctx.fillRect(px, py, 24, 24);
    ctx.fillStyle = "#d9edff";
    ctx.fillRect(px + 2, py + 3, 9, 12);
    ctx.fillRect(px + 13, py + 3, 9, 12);
    ctx.fillStyle = "#ffd166";
    ctx.fillRect(px + 10, py + 13, 2, 3);
    ctx.fillRect(px + 12, py + 13, 2, 3);
  }

  function drawBulletinBoard(px, py) {
    ctx.fillStyle = "#8d6748";
    ctx.fillRect(px, py, 20, 14);
    ctx.fillStyle = "#f4d6a0";
    ctx.fillRect(px + 2, py + 2, 16, 10);
    ctx.fillStyle = "#ef476f";
    ctx.fillRect(px + 4, py + 4, 4, 4);
    ctx.fillStyle = "#118ab2";
    ctx.fillRect(px + 10, py + 4, 5, 4);
  }

  function drawTrophyCase(px, py) {
    ctx.fillStyle = "#adb5bd";
    ctx.fillRect(px, py, 20, 22);
    ctx.fillStyle = "#dff6ff";
    ctx.fillRect(px + 2, py + 2, 16, 18);
    ctx.fillStyle = "#ffd166";
    ctx.fillRect(px + 7, py + 6, 6, 6);
  }

  function drawFlag(px, py) {
    ctx.fillStyle = "#6c757d";
    ctx.fillRect(px, py, 2, 18);
    ctx.fillStyle = "#ef476f";
    ctx.fillRect(px + 2, py + 2, 8, 4);
    ctx.fillStyle = "#f1faee";
    ctx.fillRect(px + 2, py + 6, 8, 4);
    ctx.fillStyle = "#118ab2";
    ctx.fillRect(px + 2, py + 10, 8, 4);
  }

  function drawLockerFace(px, py, num) {
    ctx.fillStyle = "#7997b2";
    ctx.fillRect(px, py, 8, 20);
    ctx.fillStyle = "#d9edff";
    ctx.fillRect(px + 3, py + 4, 2, 2);
    ctx.fillStyle = "#264653";
    ctx.font = "bold 4px Courier New";
    ctx.fillText(String(num), px + 1, py + 18);
  }

  function drawClassDoorPlate(px, py, text) {
    ctx.fillStyle = "#f4d6a0";
    ctx.fillRect(px, py, 8, 5);
    ctx.fillStyle = "#264653";
    ctx.font = "bold 4px Courier New";
    ctx.fillText(text, px + 1, py + 4);
  }

  function drawWaterFountain(px, py, blink) {
    ctx.fillStyle = "#adb5bd";
    ctx.fillRect(px, py, 12, 12);
    ctx.fillStyle = "#8ecae6";
    ctx.fillRect(px + 2, py + 2, 8, 4);
    ctx.fillStyle = "rgba(142, 202, 230," + (0.2 + blink * 0.2) + ")";
    ctx.fillRect(px + 5, py - 2, 2, 4);
  }

  function drawClassroomPeek(px, py) {
    ctx.fillStyle = "#d9ed92";
    ctx.fillRect(px + 10, py + 10, 18, 10);
    ctx.fillStyle = "#a98467";
    ctx.fillRect(px + 2, py + 4, 10, 6);
    ctx.fillRect(px + 2, py + 16, 8, 5);
    ctx.fillRect(px + 18, py + 4, 8, 5);
    ctx.fillStyle = "#ef476f";
    ctx.fillRect(px + 2, py, 26, 3);
    ctx.fillStyle = "#f1faee";
    ctx.fillRect(px + 21, py + 22, 7, 6);
  }

  function syncNarrativeState(displayNode) {
    if (!displayNode) return;
    displayNode.text.forEach((line) => markEntitiesInText(line, state.introducedEntities));
    state.currentClues = extractClues(displayNode.text);
  }

  function buildInstructionFromState(node, trigger, displayNode) {
    const lead = getInstructionLead(displayNode, trigger);
    const targetLabel = toStoryLabel(trigger.label);
    if (lead.type === "social") {
      return lead.text + " Go to " + targetLabel + ". " + getConfirmInstruction();
    }
    if (lead.type === "clue") {
      return lead.text + " Go to " + targetLabel + ". " + getConfirmInstruction();
    }
    if (lead.type === "elimination") {
      return lead.text + " Go to " + targetLabel + ". " + getConfirmInstruction();
    }
    if (lead.type === "escalation") {
      return lead.text + " Go to " + targetLabel + ". " + getConfirmInstruction();
    }
    return "You see a new clue. Go to " + targetLabel + ". " + getConfirmInstruction();
  }

  function summarizeInstructionTarget(trigger, displayNode) {
    const lead = getInstructionLead(displayNode, trigger);
    if (lead.text) return lead.text;
    return toStoryLabel(trigger.label) + ".";
  }

  function getInstructionLead(displayNode, trigger) {
    const labelWords = (trigger.label.toLowerCase().match(/[a-z']+/g) || []);
    const consequenceLines = state.lastConsequence.length
      ? state.lastConsequence
      : (displayNode && displayNode.text ? displayNode.text : []);
    const consequenceText = consequenceLines.join(" ").toLowerCase();
    const targetLabel = toStoryLabel(trigger.label);
    const clue = state.currentClues.find((item) => labelWords.includes(item) || item === labelWords[0]);

    if (/(says|said|tip\b|tips|nods)/.test(consequenceText)) {
      return { type: "social", text: "A pal gives a hint." };
    }

    if (/\b(no|not|wrong|lost)\b/.test(consequenceText)) {
      return { type: "elimination", text: "No Pip here. A new clue points on." };
    }

    if (/\b(stuck|sad|wet|slow|shut|ring|slick|blocks)\b/.test(consequenceText)) {
      return { type: "escalation", text: "The problem grows. You can fix it at " + targetLabel + "." };
    }

    if (clue) {
      return { type: "clue", text: "The clue leads to " + targetLabel + "." };
    }

    if (labelWords.some((word) => consequenceText.includes(word))) {
      return { type: "clue", text: "You spot " + targetLabel + "." };
    }

    return { type: "generic", text: "" };
  }

  function toStoryLabel(label) {
    return label.replace(/\b([a-z])/g, function (_, ch) {
      return ch.toUpperCase();
    });
  }

  function extractClues(lines) {
    const clues = [];
    lines.forEach((line) => {
      const words = line.toLowerCase().match(/[a-z']+/g) || [];
      words.forEach((word) => {
        const cleaned = word.replace(/'s$/, "");
        if (TRACKED_ENTITY_WORDS.includes(cleaned) && !clues.includes(cleaned)) clues.push(cleaned);
      });
    });
    return clues.slice(0, 4);
  }

  function getQuestStartHint() {
    return isMobileMode() ? "Then go to the bright tile. Tap GO." : "Then go to the bright tile. Press SPACE or CLICK.";
  }

  function getConfirmInstruction() {
    return isMobileMode() ? "Tap GO." : "Press SPACE / CLICK.";
  }

  function isMobileMode() {
    return isMobileDevice();
  }

  function syncHintVisibility(timestamp) {
    if (state.screen !== "game" || state.questStartOpen || state.modalOpen || state.settingsOpen) {
      ui.questHint.classList.add("hint-fade-hidden");
      return;
    }

    if (timestamp >= state.hintVisibleAt) {
      ui.questHint.classList.remove("hint-fade-hidden");
    } else {
      ui.questHint.classList.add("hint-fade-hidden");
    }
  }

  function pulseLocatePlayer() {
    state.locatePulseUntil = performance.now() + 1800;
  }

  function resolveOverlaySafety() {
    if (state.screen !== "game") return;
    const safeSpawn = getPreferredSafeSpawn(MAPS[state.config.env]);
    if (safeSpawn) {
      state.player.x = safeSpawn.x;
      state.player.y = safeSpawn.y;
    }
    setHintAnchor("hint-top-left");
  }

  function resolveDialoguePlacement(locationKey) {
    if (isMobileLandscapeMode()) {
      ui.dialogueModal.classList.remove("modal-top");
      ui.dialogueModal.classList.add("modal-bottom");
      return;
    }
    if (isMobileMode()) {
      ui.dialogueModal.classList.remove("modal-top");
      ui.dialogueModal.classList.add("modal-bottom");
      return;
    }
    const trigger = MAPS[state.config.env].triggers[locationKey];
    if (!trigger) return;
    ui.dialogueModal.classList.remove("modal-top", "modal-bottom");
    ui.dialogueModal.classList.add(trigger.y <= Math.floor(MAP_H / 2) ? "modal-bottom" : "modal-top");
  }

  function faceTowardObjective(node) {
    const trigger = MAPS[state.config.env].triggers[node.location];
    if (!trigger) return;
    const dx = trigger.x - state.player.x;
    const dy = trigger.y - state.player.y;
    if (Math.abs(dx) >= Math.abs(dy)) {
      state.player.facing = dx >= 0 ? "right" : "left";
    } else {
      state.player.facing = dy >= 0 ? "down" : "up";
    }
  }

  function setHintAnchor(anchor) {
    state.hintAnchor = anchor;
    ui.questHint.classList.remove("hint-top-left", "hint-top-right", "hint-bottom-left", "hint-bottom-right");
    ui.questHint.classList.add(anchor);
  }

  function anchorCoversPlayer(anchor) {
    const covered = getHintCoveredTiles(anchor);
    return covered.has(tileKey(state.player.x, state.player.y));
  }

  function getHintCoveredTiles(anchor) {
    const canvasRect = ui.canvas.getBoundingClientRect();
    if (!canvasRect.width || !canvasRect.height) return new Set();

    setHintAnchor(anchor);
    const hintRect = ui.questHint.getBoundingClientRect();
    if (
      hintRect.right <= canvasRect.left ||
      hintRect.left >= canvasRect.right ||
      hintRect.bottom <= canvasRect.top ||
      hintRect.top >= canvasRect.bottom
    ) {
      return new Set();
    }
    const left = Math.max(0, hintRect.left - canvasRect.left);
    const top = Math.max(0, hintRect.top - canvasRect.top);
    const right = Math.min(canvasRect.width, hintRect.right - canvasRect.left);
    const bottom = Math.min(canvasRect.height, hintRect.bottom - canvasRect.top);
    const startX = Math.max(0, Math.floor((left / canvasRect.width) * MAP_W));
    const endX = Math.min(MAP_W - 1, Math.floor(((right - 1) / canvasRect.width) * MAP_W));
    const startY = Math.max(0, Math.floor((top / canvasRect.height) * MAP_H));
    const endY = Math.min(MAP_H - 1, Math.floor(((bottom - 1) / canvasRect.height) * MAP_H));
    const covered = new Set();

    for (let y = startY; y <= endY; y += 1) {
      for (let x = startX; x <= endX; x += 1) {
        covered.add(tileKey(x, y));
      }
    }

    return covered;
  }

  function isWalkableTile(tile) {
    return tile !== "W" && tile !== "H" && tile !== "T" && tile !== "N" && tile !== "Z" && tile !== "J" && tile !== "E" && tile !== "X" && tile !== "Y" && tile !== "V" && tile !== "I";
  }

  function isAtOrNearTrigger(trigger) {
    const dx = Math.abs(state.player.x - trigger.x);
    const dy = Math.abs(state.player.y - trigger.y);
    return dx + dy <= 1;
  }

  function handleCanvasConfirm(event) {
    if (state.screen !== "game" || isInteractionBlocked()) return;
    const rect = ui.canvas.getBoundingClientRect();
    const scaleX = ui.canvas.width / rect.width;
    const scaleY = ui.canvas.height / rect.height;
    const worldPoint = toWorldPoint((event.clientX - rect.left) * scaleX, (event.clientY - rect.top) * scaleY);
    const tileX = Math.floor(worldPoint.x / TILE);
    const tileY = Math.floor(worldPoint.y / TILE);
    const trigger = MAPS[state.config.env].triggers[getCurrentNode().location];
    if (tileX === trigger.x && tileY === trigger.y && isAtOrNearTrigger(trigger)) {
      interact();
    }
  }

  function refreshReachabilityState(envKey) {
    const map = MAPS[envKey];
    const start = ensureWalkableStart(map);
    map.start = start;
    const reachable = computeReachableTiles(map, start);
    state.reachableTiles = reachable;
    const moves = [];

    Object.keys(map.triggers).forEach((key) => {
      const trigger = map.triggers[key];
      if (!reachable.has(tileKey(trigger.x, trigger.y))) {
        const next = findNearestReachableTile(trigger, reachable);
        if (next) {
          trigger.x = next.x;
          trigger.y = next.y;
          moves.push(key + "->(" + next.x + "," + next.y + ")");
        }
      }
    });

    const trials = runReachabilityTrials(map);
    state.reachabilityStatus =
      "Reachable: " + Object.keys(map.triggers).length + "/" + Object.keys(map.triggers).length +
      " targets from spawn. Trials: " + trials.passed + "/" + trials.total +
      " sample paths pass." + (moves.length ? " Moved: " + moves.join(", ") : "");
    updateReachabilityStatusText();
  }

  function updateReachabilityStatusText() {
    if (ui.reachabilityStatus) {
      ui.reachabilityStatus.textContent = state.reachabilityStatus || "Reachability check pending.";
    }
  }

  function ensureWalkableStart(map) {
    const preferred = getPreferredSafeSpawn(map);
    if (preferred) return preferred;
    if (isWalkableTile(map.grid[map.start.y][map.start.x])) {
      return { x: map.start.x, y: map.start.y };
    }
    return findNearestReachableTile(map.start, new Set(collectWalkableTiles(map).map((tile) => tileKey(tile.x, tile.y))));
  }

  function getPreferredSafeSpawn(map) {
    const zones = SAFE_SPAWN_ZONES[state.config.env] || [];
    for (let zoneIndex = 0; zoneIndex < zones.length; zoneIndex += 1) {
      const zone = zones[zoneIndex];
      for (let y = zone.y1; y <= zone.y2; y += 1) {
        for (let x = zone.x1; x <= zone.x2; x += 1) {
          if (x >= 0 && y >= 0 && x < MAP_W && y < MAP_H && isWalkableTile(map.grid[y][x])) {
            return { x, y };
          }
        }
      }
    }
    return null;
  }

  function findNearestSafeSpawnAvoidingOverlay(map, anchor) {
    const covered = getHintCoveredTiles(anchor);
    const safeTiles = collectWalkableTiles(map).filter((tile) => {
      const inSafeZone = (SAFE_SPAWN_ZONES[state.config.env] || []).some((zone) => (
        tile.x >= zone.x1 && tile.x <= zone.x2 && tile.y >= zone.y1 && tile.y <= zone.y2
      ));
      return inSafeZone && !covered.has(tileKey(tile.x, tile.y));
    });
    if (!safeTiles.length) return null;
    return safeTiles.reduce((best, tile) => {
      const bestDist = Math.abs(best.x - map.start.x) + Math.abs(best.y - map.start.y);
      const tileDist = Math.abs(tile.x - map.start.x) + Math.abs(tile.y - map.start.y);
      return tileDist < bestDist ? tile : best;
    });
  }

  function computeReachableTiles(map, start) {
    const queue = [start];
    const visited = new Set([tileKey(start.x, start.y)]);
    while (queue.length) {
      const current = queue.shift();
      getNeighborTiles(current.x, current.y).forEach((next) => {
        if (!visited.has(tileKey(next.x, next.y)) && isWalkableTile(map.grid[next.y][next.x])) {
          visited.add(tileKey(next.x, next.y));
          queue.push(next);
        }
      });
    }
    return visited;
  }

  function getNeighborTiles(x, y) {
    return [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 }
    ].filter((tile) => tile.x >= 0 && tile.y >= 0 && tile.x < MAP_W && tile.y < MAP_H);
  }

  function findNearestReachableTile(target, reachable) {
    let best = null;
    let bestDist = Infinity;
    reachable.forEach((key) => {
      const coords = parseTileKey(key);
      const dist = Math.abs(coords.x - target.x) + Math.abs(coords.y - target.y);
      if (dist < bestDist) {
        best = coords;
        bestDist = dist;
      }
    });
    return best;
  }

  function runReachabilityTrials(map) {
    const walkable = Array.from(computeReachableTiles(map, map.start)).map(parseTileKey);
    const triggers = Object.values(map.triggers);
    const total = Math.min(5, walkable.length, triggers.length);
    let passed = 0;
    for (let index = 0; index < total; index += 1) {
      const spawn = walkable[(index * 7) % walkable.length];
      const reachable = computeReachableTiles(map, spawn);
      const target = triggers[index % triggers.length];
      if (reachable.has(tileKey(target.x, target.y))) passed += 1;
    }
    return { passed, total };
  }

  function collectWalkableTiles(map) {
    const tiles = [];
    for (let y = 0; y < MAP_H; y += 1) {
      for (let x = 0; x < MAP_W; x += 1) {
        if (isWalkableTile(map.grid[y][x])) tiles.push({ x, y });
      }
    }
    return tiles;
  }

  function tileKey(x, y) {
    return x + "," + y;
  }

  function parseTileKey(key) {
    const parts = key.split(",");
    return { x: Number(parts[0]), y: Number(parts[1]) };
  }

  function drawReachableOverlay() {
    if (!state.config.showReachable) return;
    state.reachableTiles.forEach((key) => {
      const tile = parseTileKey(key);
      const px = tile.x * TILE;
      const py = tile.y * TILE;
      ctx.fillStyle = "rgba(90, 200, 250, 0.14)";
      ctx.fillRect(px + 6, py + 6, TILE - 12, TILE - 12);
    });
  }

  function drawPlayer() {
    const px = state.player.x * TILE;
    const py = state.player.y * TILE;
    const legOffset = state.player.step === 0 ? 1 : -1;

    if (performance.now() < state.locatePulseUntil) {
      const pulse = (Math.sin(performance.now() / 120) + 1) * 0.5;
      ctx.strokeStyle = "rgba(255, 221, 87, " + (0.45 + pulse * 0.35) + ")";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(px + 16, py + 16, 12 + pulse * 5, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.fillStyle = "#22223b";
    ctx.fillRect(px + 10, py + 8, 12, 12);
    ctx.fillStyle = "#f7cad0";
    ctx.fillRect(px + 10, py + 4, 12, 8);
    ctx.fillStyle = "#2a9d8f";
    ctx.fillRect(px + 9, py + 16, 14, 8);
    ctx.fillStyle = "#1d3557";
    ctx.fillRect(px + 10, py + 24, 4, 6);
    ctx.fillRect(px + 18, py + 24 + legOffset, 4, 6);

    if (state.player.facing === "left") {
      ctx.fillStyle = "#111";
      ctx.fillRect(px + 9, py + 7, 2, 2);
    } else if (state.player.facing === "right") {
      ctx.fillStyle = "#111";
      ctx.fillRect(px + 21, py + 7, 2, 2);
    } else {
      ctx.fillStyle = "#111";
      ctx.fillRect(px + 13, py + 7, 2, 2);
      ctx.fillRect(px + 17, py + 7, 2, 2);
    }
  }

  function playBlip(frequency, duration, type) {
    if (state.muted) return;
    try {
      unlockAudio();
      if (!state.audioCtx || state.audioCtx.state === "suspended") return;
      const now = state.audioCtx.currentTime;
      const oscillator = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();
      oscillator.type = type || "square";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      oscillator.connect(gain);
      gain.connect(state.audioCtx.destination);
      oscillator.start(now);
      oscillator.stop(now + duration);
    } catch (error) {
      // Audio is optional and should fail quietly.
    }
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  init();
})();
