import "./App.scss";
import { useState, useMemo } from "react";
import { kaomojis } from "./data/kaomojis";
import { KaomojiCard } from "./components/KaomojiCard/KaomojiCard";

const THEME_BOXES = [
  {
    title: "happy as a lark on the farm",
    tags: [
      "happy",
      "smiling",
      "love",
      "cheer",
      "magic",
      "proud",
      "peaceful",
      "wink",
      "celebration",
      "content",
    ],
  },
  {
    title: "chaotically annoyed",
    tags: [
      "angry",
      "rage",
      "table-flip",
      "frustrated",
      "super-table-flip",
      "fight",
      "furious",
      "annoyed",
      "grumpy",
      "unamused",
      "chaotic-good",
      "disappointed",
    ],
  },
  {
    title: "feeling cute, might delete later idk",
    tags: [
      "cat",
      "dog",
      "bear",
      "animal",
      "bunny",
      "cute",
      "kawaii",
      "blush",
      "hug",
      "affection",
    ],
  },
  {
    title: "vibe with me, it'll be fun i promise",
    tags: [
      "shrug",
      "sweat",
      "shock",
      "crying",
      "sad",
      "dancing",
      "chill",
      "food",
      "eating",
      "cool",
      "lenny",
      "creepy",
      "panic",
      "stress",
      "stare",
      "suspicious",
      "shocked",
    ],
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  //getting all unique tags
  const allUniqueTags = useMemo(() => {
    const tags = kaomojis.flatMap((k) => k.tags);
    return Array.from(new Set(tags)).sort();
  }, []);

  const randomTags = useMemo(() => {
    const shuffledTags = [...allUniqueTags].sort(() => 0.5 - Math.random());

    return shuffledTags.slice(0, 14);
  }, [allUniqueTags]);

  //handle click on tag-button
  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      //if we click on already selected button, 'unclick' it.
      setSelectedTag(null);
    } else {
      //else: set as active, and clear search input
      setSelectedTag(tag);
      setSearchTerm("");
    }
  };

  //handle search input field
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedTag(null); // clear active tag if we start writing in input field
  };

  //this function shows WHAT boxes/cards that will be shown
  const renderContent = () => {
    // Scenario A: free text search in progress
    if (searchTerm) {
      const filtered = kaomojis.filter(
        (k) =>
          k.tags.some((t) =>
            t.toLocaleLowerCase().includes(searchTerm.toLowerCase())
          ) || k.character.includes(searchTerm)
      );

      return (
        <section className="kaomoji-box">
          <h2>Sökresultat: "{searchTerm}"</h2>
          <div className="kaomoji-grid">
            {filtered.map((k) => (
              <KaomojiCard key={k.id} kaomoji={k} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="empty-state">Hittade inget! (╥_╥)</p>
          )}
        </section>
      );
    }

    // Scenario B: a specific tag-button is pressed
    if (selectedTag) {
      const filtered = kaomojis.filter((k) => k.tags.includes(selectedTag));

      return (
        <section className="kaomoji-box">
          <h2>Tagg: #{selectedTag}</h2>
          <div className="kaomoji-grid">
            {filtered.map((k) => (
              <KaomojiCard key={k.id} kaomoji={k} />
            ))}
          </div>
        </section>
      );
    }

    // scenario C: Default! Show theme boxes
    return THEME_BOXES.map((box, index) => {
      //filter out the emojis with tags matching the boxes tags
      const boxKaomojis = kaomojis.filter((k) =>
        k.tags.some((tag) => box.tags.includes(tag))
      );

      //if box happen to be empty, dont show it
      if (boxKaomojis.length === 0) return null;

      return (
        <section key={index} className="kaomoji-box">
          <h2>{box.title}</h2>
          <div className="kaomoji-grid">
            {boxKaomojis.map((k) => (
              <KaomojiCard key={k.id} kaomoji={k} />
            ))}
          </div>
        </section>
      );
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <p className="logo">ಥ-ಥ</p>
        <h1>chaosmoji</h1>
        <p className="subtitle">annoy your friends</p>

        <input
          type="text"
          className="search-input"
          placeholder="⌕"
          value={searchTerm}
          onChange={handleSearch}
        ></input>

        <div className="tag-button-container">
          {randomTags.map((tag) => (
            <button
              key={tag}
              className={`tag-btn ${selectedTag === tag ? "active" : ""}`}
              onClick={() => handleTagClick(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      </header>
      <main className="content-area">{renderContent()}</main>
      <footer>
        <p className="chaos">{"(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧"}</p>
        <p className="staffan">staffan is a nerd and i love him</p>
      </footer>
    </div>
  );
}

export default App;
