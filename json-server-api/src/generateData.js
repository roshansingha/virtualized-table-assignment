import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Seeded random number generator for reproducibility
class SeededRandom {
    constructor(seed) {
        this.seed = seed;
    }

    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    nextInt(min, max) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }

    choice(array) {
        return array[Math.floor(this.next() * array.length)];
    }
}

const locations = ['Konoha', 'Suna', 'Kiri', 'Iwa', 'Kumo'];
const healthStates = ['Healthy', 'Injured', 'Critical'];

const firstNames = [
    'Naruto', 'Sasuke', 'Sakura', 'Kakashi', 'Hinata', 'Shikamaru', 'Gaara', 'Rock', 'Neji', 'Tenten',
    'Ino', 'Choji', 'Kiba', 'Shino', 'Kurenai', 'Asuma', 'Jiraiya', 'Tsunade', 'Orochimaru', 'Itachi',
    'Kisame', 'Deidara', 'Sasori', 'Hidan', 'Kakuzu', 'Konan', 'Pain', 'Obito', 'Madara', 'Hashirama',
    'Tobirama', 'Hiruzen', 'Minato', 'Kushina', 'Yamato', 'Sai', 'Temari', 'Kankuro', 'Chiyo', 'Mei',
    'Ao', 'Chojuro', 'Darui', 'Killer', 'Raikage', 'Onoki', 'Kurotsuchi', 'Akatsuchi', 'Zabuza', 'Haku'
];

const lastNames = [
    'Uzumaki', 'Uchiha', 'Haruno', 'Hatake', 'Hyuga', 'Nara', 'Sabaku', 'Lee', 'Yamanaka', 'Akimichi',
    'Inuzuka', 'Aburame', 'Yuhi', 'Sarutobi', 'Senju', 'Namikaze', 'Terumi', 'Momochi', 'Yuki', 'Hoshigaki'
];

function generateEntities(count, seed = 42) {
    const rng = new SeededRandom(seed);
    const entities = [];
    const usedNames = new Set();

    for (let i = 0; i < count; i++) {
        let name;
        let attempts = 0;

        // Generate unique names
        do {
            const firstName = rng.choice(firstNames);
            const lastName = rng.choice(lastNames);
            name = `${firstName} ${lastName}`;
            attempts++;

            // If we can't find a unique name after 100 attempts, append a number
            if (attempts > 100) {
                name = `${name} ${i}`;
                break;
            }
        } while (usedNames.has(name));

        usedNames.add(name);

        entities.push({
            id: `entity-${i.toString().padStart(4, '0')}`,
            name,
            location: rng.choice(locations),
            health: rng.choice(healthStates),
            power: rng.nextInt(100, 10000),
        });
    }

    return entities;
}

// Generate 1000 entities
const entities = generateEntities(1000);

// Create db.json for json-server
const db = { entities };

// Ensure data directory exists
const dataDir = join(__dirname, '../data');
mkdirSync(dataDir, { recursive: true });

// Write to file
const outputPath = join(dataDir, 'db.json');
writeFileSync(outputPath, JSON.stringify(db, null, 2));

console.log(`✅ Generated ${entities.length} entities`);
console.log(`📁 Saved to: ${outputPath}`);
console.log(`🚀 Ready to start server!`);
